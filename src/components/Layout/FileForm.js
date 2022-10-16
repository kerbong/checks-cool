import React, { useState } from "react";
import classes from "./FileForm.module.css";
import imageCompression from "browser-image-compression";

const FileForm = (props) => {
  const [attachedFile, setAttachedFile] = useState("");

  const onFileChange = async (e) => {
    const theFile = e.target.files[0];
    if (theFile) {
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        setAttachedFile(finishedEvent.currentTarget.result);
        props.attachedFileHandler(finishedEvent.currentTarget.result);
      };
      reader.readAsDataURL(theFile);
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
      >
        {!attachedFile ? "파일추가" : "초기화&파일추가"}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: "none" }}
        id="attachFile"
      />
    </>
  );
};

export default FileForm;
