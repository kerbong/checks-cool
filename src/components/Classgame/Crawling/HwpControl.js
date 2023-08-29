import React, { useState, useEffect } from "react";
import { dbService, storageService } from "../../../fbase";
import { ref, uploadBytes, getBlob, getDownloadURL } from "firebase/storage";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import saveAs from "file-saver";

const HwpControl = (props) => {
  const [file, setFile] = useState(null);
  const [uploadDone, setUploadDone] = useState(false);
  const [templateData, setTemplateData] = useState([
    {
      name: "홍길동",
      date: "2023년 7월 10일",
    },
  ]);

  useEffect(() => {
    if (file) return;
    // 화면 로딩 시에 파일 다운로드
    downloadFile();
  }, [uploadDone]);

  // useEffect(() => {
  //   if (!file) return;
  //   // 화면 로딩 시에 파일 다운로드
  // }, [file]);

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
    const output = await makeFileAdapted(data);
    const fileURL = URL.createObjectURL(output);
    const printWindow = window.open(fileURL);
    printWindow.onload = function () {
      printWindow.print();
      URL.revokeObjectURL(fileURL);
    };
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
    </div>
  );
};

export default HwpControl;
