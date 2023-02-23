import React, { useState } from "react";
import classes from "./FileArea.module.css";
import FileForm from "./FileForm";

const FileArea = (props) => {
  const [attachedFile, setAttachedFile] = useState(props.file || "");

  return (
    <div className={classes.fileArea}>
      {attachedFile && (
        <>
          <img
            src={attachedFile}
            className={classes.previewImg}
            alt="filePreview"
          />
        </>
      )}
      {props.about !== "attendance" && (
        <FileForm
          attachedFileHandler={(url) => {
            props.attachedFileHandler(url);
            setAttachedFile(url);
          }}
        />
      )}
    </div>
  );
};

export default FileArea;
