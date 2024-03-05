import React, { useState } from "react";
import classes from "./FileForm.module.css";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";

const FileForm = (props) => {
  const [attachedFile, setAttachedFile] = useState(props.src || "");

  const compress = async (file) => {
    try {
      const maxSizeMb = 5; // 허용할 최대 파일 크기 (5MB)
      const allowedFileTypes = [
        "application/pdf",
        "application/x-hwp",
        "application/vnd.ms-excel", // XLS 파일 허용
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX 파일 허용
      ]; // 허용할 파일 형식

      if (
        file.size <= maxSizeMb * 1024 * 1024 &&
        allowedFileTypes.includes(file.type)
      ) {
        // 5MB 이하의 PDF나 HWP 파일은 그대로 반환
        return file;
      } else {
        // 이미지 파일인 경우에만 압축 수행
        const options = {
          maxSizeMb: 2,
          maxWidthOrHeight: 1920,
        };
        return await imageCompression(file, options);
      }
    } catch (e) {
      console.log(e);
      Swal.fire(
        "업로드 실패",
        "업로드에 문제가 생겼습니다. 파일의 크기가 5Mb 이상이거나 처리 과정에 문제가 생길 수 있습니다. 이미지 파일로 업로드 하시면 편리합니다.",
        "warning"
      );
    }
  };

  const onFileChange = async (e) => {
    const theFile = e.target.files[0];
    if (theFile) {
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        setAttachedFile(finishedEvent.currentTarget.result);
        props.attachedFileHandler(finishedEvent.currentTarget.result);
      };
      // 이미지 파일인 경우에만 compress 함수를 사용
      if (theFile.type.startsWith("image/")) {
        const compressedImage = await compress(theFile);
        reader.readAsDataURL(compressedImage);
      } else {
        // PDF나 HWP 파일은 바로 읽음
        reader.readAsDataURL(theFile);
      }
    }
  };

  const onClearAttachedFile = () => setAttachedFile("");

  return (
    <>
      <label
        id="attachedFile"
        htmlFor="attachFile"
        className={classes.fileUploadBtn}
        onClick={() => {
          if (attachedFile) {
            onClearAttachedFile();
          }
        }}
        style={props.about === "padIt" ? { backgroundColor: "#687f7f" } : {}}
      >
        {props.about === "meetSum" && (
          <>{!attachedFile ? "파일 추가" : "초기화 & 파일 변경"}</>
        )}
        {props.about !== "meetSum" && (
          <>{!attachedFile ? "이미지 추가" : "초기화 & 이미지 변경"}</>
        )}
      </label>
      <input
        type="file"
        accept=".pdf,.hwp,.xls,.xlsx,image/*"
        onChange={onFileChange}
        style={{ display: "none" }}
        id="attachFile"
      />
    </>
  );
};

export default FileForm;
