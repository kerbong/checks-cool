import React, { useState, useEffect } from "react";

import { dbService, storageService } from "../../../fbase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import Swal from "sweetalert2";
import { saveSvgAsPng } from "save-svg-as-png";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import saveAs from "file-saver";
import { QRCodeSVG } from "qrcode.react";

import SettingAttendCheck from "./SettingAttendCheck";
import classes from "./HwpControl.module.css";

const FOR_WHAT = ["attendAddForm", "attendReportForm", "absenceForm"];

const HwpControl = (props) => {
  const [atAddFile, setAtAddFile] = useState(null);
  const [atReportFile, setAtReportFile] = useState(null);
  const [absenceFile, setAbsenceFile] = useState(null);

  const [uploadDone, setUploadDone] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [dataExisted, setDataExisted] = useState(false);
  const [schoolClass, setSchoolClass] = useState(false);

  const [templateData, setTemplateData] = useState([
    {
      name: "홍길동",
      date: "2023년 7월 10일",
    },
  ]);

  useEffect(() => {
    if (!atAddFile) {
      downloadFile(FOR_WHAT[0]);
    }
    if (!atReportFile) {
      downloadFile(FOR_WHAT[1]);
    }
    if (!absenceFile) {
      downloadFile(FOR_WHAT[2]);
    }
    // 화면 로딩 시, 파일 업로드 시 파일 다운로드
  }, [uploadDone]);

  //교외현장체험학습 데이터가 있었는지 확인하기
  const dataExist = async () => {
    const atCheckListRef = doc(dbService, "attendCheck", "teacherLists");
    const atCheckList_doc = await getDoc(atCheckListRef);

    let existTeacher = false;
    let title = "";
    atCheckList_doc?.data()?.lists?.forEach((teacherData) => {
      if (teacherData?.includes(props.userUid)) {
        existTeacher = true;
        title = teacherData;
      }
    });

    // 이미 저장된 게 있으면,
    if (existTeacher) {
      setSchoolClass(title);
      setDataExisted(true);
      setShowQrCode(true);
    }
  };

  useEffect(() => {
    dataExist();
  }, []);

  // Firebase Storage에 파일 업로드
  const uploadFile = async (file, forWhat) => {
    await uploadBytes(
      ref(storageService, `${props.userUid}/attendCheck/${forWhat}.docx`),
      file
    ).then(() => {
      setUploadDone(true);
    });
  };

  const handleFileChange = async (event, forWhat) => {
    const selectedFile = event.target.files[0];
    if (selectedFile !== undefined) {
      let reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const fileData = new Uint8Array(finishedEvent.currentTarget.result);
        uploadFile(fileData, forWhat);
      };
      //이게 중요함! readAsDataURL로 하면 오류남.
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const downloadFile = async (forWhat) => {
    try {
      const fileRef = ref(
        storageService,
        `${props.userUid}/attendCheck/${forWhat}.docx`
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

      // 파일 내부에 있는 {학생이름} 과 같은 태그의 key값 (학생이름) 들을 모으는 과정
      const reader = new FileReader(newFile);

      reader.onerror = function (event) {
        console.error("파일 읽기 오류:", event.target.error);
      };

      reader.onloadend = function (event) {
        const content = event.target.result;
        console.log(content);
        // content를 사용하여 docxtemplater 작업 수행
        const zip = new PizZip(content);
        let keys = [];

        const options = {
          // This is how docxtemplater is configured by default
          parser: function (tag) {
            // 선생님들이 만든 키 값만 저장하기..!!
            keys.push(tag);
            console.log(tag);
          },
        };

        new Docxtemplater(zip, options);

        // 작업 완료 후에 keys 배열을 확인
        // console.log(keys);
      };

      reader.readAsArrayBuffer(newFile);

      if (forWhat === FOR_WHAT[0]) {
        setAtAddFile(newFile);
      } else if (forWhat === FOR_WHAT[1]) {
        setAtReportFile(newFile);
      } else if (forWhat === FOR_WHAT[2]) {
        setAbsenceFile(newFile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /** 데이터를 파일의 {} 부분에 자동으로 넣는 함수 */
  const makeFileAdapted = async (data, whatFile) => {
    let file =
      whatFile === FOR_WHAT[0]
        ? atAddFile
        : whatFile === FOR_WHAT[1]
        ? atReportFile
        : absenceFile;
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
        const doc = new Docxtemplater(zip);

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

  /** 저장하는 함수인데, 두번째 인자로 FOR_WHAT에 있는 문자열 보내주기  */
  const saveFile = async (user_data, forWhat) => {
    await makeFileAdapted(user_data, forWhat).then((output) => {
      //개별 현장체험학습 파일 저장.이름 바꿔야함
      saveAs(
        output,
        `현장체험학습(${user_data.datename + " " + user_data.name}).docx`
      );
    });
  };

  /** 인쇄하는 함수인데, 두번째 인자로 FOR_WHAT에 있는 문자열 보내주기  */
  const printFile = async (data, forWhat) => {
    try {
      const output = await makeFileAdapted(data, forWhat);
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
          }, 2000); // 인쇄가 시작되기 전에 충분한 시간을 기다립니다.
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  const saveAttendCheck = async (title, students, possibleDate) => {
    const atCheckListRef = doc(dbService, "attendCheck", "teacherLists");

    // 교사들 목록에 추가하기
    // onSnapshot(atCheckListRef, (doc)=>{
    //   if (doc.exists()) {

    //   }
    // })
    const atCheckList_doc = await getDoc(atCheckListRef);
    let new_teacherLists = [];

    new_teacherLists = atCheckList_doc?.data()?.lists;

    new_teacherLists.push(props.userUid + "*" + title);

    if (atCheckList_doc.exists()) {
      await updateDoc(atCheckListRef, {
        lists: new_teacherLists,
      });
    } else {
      await setDoc(atCheckListRef, {
        lists: new_teacherLists,
      });
    }

    // 받아온 타이틀에 학생들 이름 섞어서 데이터 만들고 저장하기
    try {
      students?.forEach(async (std) => {
        const now_doc_title = title + "*" + std.name;
        const atCheckRef = doc(dbService, "attendCheck", now_doc_title);
        const ref_doc = await getDoc(atCheckRef);
        if (!ref_doc.exists()) {
          await setDoc(atCheckRef, {
            info: { num: +std.num, woman: std.woman },
            possibleDate: +possibleDate,
            parents: [],
          });
        }
      });

      // qr코드 보여주기
      setSchoolClass(title);
      setShowQrCode(true);
    } catch (error) {
      console.log(error);
      Swal.fire(
        "저장 오류",
        "저장 과정에 오류가 생겼어요. 오류가 지속되면 개발자 메일로 알려주세요. kerbong@gmail.com",
        "error"
      );
    }
  };

  const downloadQR = () => {
    const svgElement = document.getElementById("scQr");

    if (svgElement) {
      Swal.fire(
        "qr저장중..",
        "5초 이내에 저장이 완료됩니다. 잠시 기다려 주세요.",
        "info"
      );
      saveSvgAsPng(svgElement, "(학부모용)현장체험학습 가입 qr코드.png", {
        scale: 3,
      });
    }
  };

  return (
    <div>
      <h1>교외현장체험학습 신청 기능 개발중🔥🔥(얼마나 걸릴지는..😣)</h1>

      <label>
        <input type="file" accept=".docx" onChange={handleFileChange} />
      </label>

      {/* 현재 존재하는 체험학습 신청 리스트  */}
      {/* <div>
        {templateData?.map((temp_data, index) => (
          <div key={index}>
            <p>이름 : {temp_data.name}</p>
            <p>날짜 : {temp_data.date}</p>
            <button onClick={() => saveFile(temp_data)}>파일저장</button>
            <button onClick={() => printFile(temp_data)}>인쇄</button>
          </div>
        ))}
      </div> */}

      <SettingAttendCheck
        students={props.students}
        isSubject={props.isSubject}
        doneHandler={(dataTitle, studentsInfo, possibleDate) =>
          saveAttendCheck(dataTitle, studentsInfo, possibleDate)
        }
        dataExisted={dataExisted}
        dataEditHandler={() => {
          setDataExisted(false);
          setShowQrCode(false);
        }}
      />

      {/* qr코드 보여주기 */}
      {showQrCode && (
        <div className={classes["flex-col-center"]}>
          <QRCodeSVG
            value={`${schoolClass}`}
            size={`200px`}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            id="scQr"
            includeMargin={true}
            onClick={downloadQR}
          />
          <p>
            <span>🏫 </span>
            <span>{schoolClass?.split("*")[2]}</span>{" "}
            <span>{schoolClass?.split("*")[3]}</span>
          </p>
          <p>
            <a
              onClick={downloadQR}
              className={classes["download-link"]}
              title="QR코드 다운로드"
            >
              {" "}
              🙂 (학부모용) 현장체험학습 가입 Qr코드{" "}
              <i className="fa-solid fa-download"></i>
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default HwpControl;
