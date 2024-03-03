import React, { useState } from "react";
import classes from "./FileArea.module.css";
import FileForm from "./FileForm";

const FileArea = (props) => {
  const [attachedFile, setAttachedFile] = useState(props.file || "");
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    setImgError(true);
  };

  return (
    <div className={classes.fileArea}>
      {/* {attachedFile && showImgOrLink()} */}
      {attachedFile && !imgError ? (
        <img src={attachedFile} alt="filePreview" onError={handleError} />
      ) : (
        attachedFile && (
          <a
            href={attachedFile}
            target="_blank"
            rel="noopener noreferrer"
            className={classes["a"]}
          >
            파일 다운받기
          </a>
        )
      )}
      {props.about !== "attendance" && (
        <FileForm
          attachedFileHandler={(url) => {
            props.attachedFileHandler(url);
            setAttachedFile(url);
          }}
          src={attachedFile}
          about={props.about}
        />
      )}
    </div>
  );
};

export default FileArea;
