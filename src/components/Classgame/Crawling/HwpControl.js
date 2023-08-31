import React, { useState, useEffect } from "react";
import { dbService, storageService } from "../../../fbase";
import { ref, uploadBytes, getBlob, getDownloadURL } from "firebase/storage";

import Swal from "sweetalert2";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import saveAs from "file-saver";

const HwpControl = (props) => {
  const [file, setFile] = useState(null);
  const [uploadDone, setUploadDone] = useState(false);
  const [scLoSelect, setScLoSelect] = useState("");
  const [scName, setScName] = useState("");
  const [scResult, setScResult] = useState([]);
  const [school, setSchool] = useState("");
  const [templateData, setTemplateData] = useState([
    {
      name: "홍길동",
      date: "2023년 7월 10일",
    },
  ]);

  // 학교명 입력하면면 api로 받아오기
  const findSchool = (e) => {
    e.preventDefault();
    if (scName === "") return;
    let filter = "&SCHUL_NM=" + scName + "초등학교";
    getSchoolDatas(filter);
  };

  useEffect(() => {
    if (file) return;
    // 화면 로딩 시에 파일 다운로드
    downloadFile();
  }, [uploadDone]);

  useEffect(() => {
    if (school === "") return;
    // 화면 로딩 시에 파일 다운로드
    console.log(school);
  }, [school]);

  // 학교정보 api 다운로드
  const getSchoolDatas = (filter) => {
    let baseUrl =
      "https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=1000&SCHUL_KND_SC_NM=초등학교";
    let key = "&KEY=" + process.env.REACT_APP_NEIS_OPEN_API;

    const fetchData = async () => {
      const res = await fetch(baseUrl + key + filter);
      const result = res.json();
      return result;
    };

    fetchData().then((res) => {
      if (res?.schoolInfo) {
        setScResult(res?.schoolInfo?.[1]?.row);
        console.log(res?.schoolInfo?.[1]?.row);
      } else {
        Swal.fire("검색오류", "학교명을 확인해주세요", "info");
        setScResult([]);
      }
    });
  };

  // Firebase Storage에 파일 업로드
  const uploadFile = async (file) => {
    await uploadBytes(
      ref(storageService, `${props.userUid}/attendCheck/attendForm.docx`),
      file
    ).then(() => {
      setUploadDone(true);
    });
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile !== undefined) {
      let reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const fileData = new Uint8Array(finishedEvent.currentTarget.result);
        uploadFile(fileData);
      };
      //이게 중요함! readAsDataURL로 하면 오류남.
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const downloadFile = async () => {
    try {
      const fileRef = ref(
        storageService,
        `${props.userUid}/attendCheck/attendForm.docx`
      );

      const url = await getDownloadURL(fileRef);
      if (!url) return;

      const response = await fetch(url);
      const content = await response.arrayBuffer();

      // Blob 객체 생성
      const blob = new Blob([content]);

      // File 객체 생성
      const newFile = new File([blob], "attendForm.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      setFile(newFile);
    } catch (error) {
      console.log(error);
    }
  };

  const makeFileAdapted = async (data) => {
    const reader = new FileReader(file);

    const outputPromise = new Promise((resolve, reject) => {
      reader.onerror = function (event) {
        console.error("파일 읽기 오류:", event.target.error);
        reject(event.target.error);
      };

      reader.onloadend = function (event) {
        const content = event.target.result;
        console.log(content);
        // content를 사용하여 docxtemplater 작업 수행
        const zip = new PizZip(content);
        const doc = new Docxtemplater().loadZip(zip);

        doc.setData(data);
        console.log(doc);

        try {
          doc.render(data);
        } catch (error) {
          // 오류 처리
          console.log(error);
          reject(error);
        }

        const output = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        console.log(output);
        resolve(output);
      };
      reader.readAsArrayBuffer(file);
    });

    try {
      const output = await outputPromise;
      return output;
    } catch (error) {
      // 다운로드 오류 처리
      console.error(error);
      return null;
    }
  };

  const saveFile = async (user_data) => {
    await makeFileAdapted(user_data).then((output) => {
      //개별 현장체험학습 파일 저장.이름 바꿔야함
      saveAs(
        output,
        `현장체험학습(${user_data.datename + " " + user_data.name}).docx`
      );
    });
  };

  const printFile = async (data) => {
    try {
      const output = await makeFileAdapted(data);
      const fileURL = URL.createObjectURL(output);

      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = fileURL;

      document.body.appendChild(iframe);

      iframe.onload = function () {
        if (!iframe.contentWindow || !iframe.contentWindow.print) {
          // 프린트 기능이 지원되지 않는 경우
          console.log("프린트를 지원하지 않습니다.");
          Swal.fire(
            "인쇄 실패",
            "인쇄를 지원하지 않는 브라우저 환경입니다.",
            "error"
          );
          // 여기에서 프린트 연결 방법을 안내하는 UI를 표시할 수 있습니다.
        } else {
          // 프린트 기능이 지원되는 경우
          setTimeout(function () {
            iframe.contentWindow.print();
            URL.revokeObjectURL(fileURL);
            document.body.removeChild(iframe);
          }, 1500); // 인쇄가 시작되기 전에 충분한 시간을 기다립니다.
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label>
        <input type="file" accept=".docx" onChange={handleFileChange} />
      </label>
      {templateData?.map((temp_data, index) => (
        <div key={index}>
          <p>이름 : {temp_data.name}</p>
          <p>날짜 : {temp_data.date}</p>
          <button onClick={() => saveFile(temp_data)}>파일저장</button>
          <button onClick={() => printFile(temp_data)}>인쇄</button>
        </div>
      ))}

      {/* 학교찾기 */}
      <form onSubmit={(e) => findSchool(e)}>
        <input
          type="text"
          placeholder="학교명 입력(초등학교 제외 / 가나초의 경우 가나)"
          onChange={(e) => setScName(e.target.value)}
          value={scName}
        />{" "}
        <span>초등학교</span>
        <button onClick={findSchool}>검색</button>
      </form>

      {/* 찾으면 학교보여주기 */}
      <ul>
        {scResult?.map((sc, index) => (
          <li
            key={index}
            onClick={() => {
              let name =
                sc.JU_ORG_NM?.split("교육지원청")?.[0] + "*" + sc.SCHUL_NM;
              setSchool(name);
            }}
          >
            위치 : {sc.ORG_RDNMA}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HwpControl;
