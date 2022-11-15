import React, { useState } from "react";
import classes from "./FileForm.module.css";
import imageCompression from "browser-image-compression";

const FileForm = (props) => {
  const [attachedFile, setAttachedFile] = useState("");

  const compress = async (image) => {
    try {
      const options = {
        maxSizeMb: 1,
        maxWidthOrHeight: 900,
      };
      return await imageCompression(image, options);
    } catch (e) {
      console.log(e);
    }
  };

  const onFileChange = async (e) => {
    const theFile = e.target.files[0];
    if (theFile) {
      const compressedImage = await compress(theFile);
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        setAttachedFile(finishedEvent.currentTarget.result);
        props.attachedFileHandler(finishedEvent.currentTarget.result);
      };
      reader.readAsDataURL(compressedImage);
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
