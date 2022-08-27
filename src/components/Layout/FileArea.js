import React, { useState } from "react";
import classes from "./FileArea.module.css";
import FileForm from "./FileForm";

const FileArea = (props) => {
  const [attachedFile, setAttachedFile] = useState("");

  return (
    <div className={classes.fileArea}>
      {props.about === "consulting" && (
        <FileForm
          attachedFileHandler={(url) => {
            props.attachedFileHandler(url);
            setAttachedFile(url);
          }}
        />
      )}
      {attachedFile && (
        <>
          <img
            src={attachedFile}
            width="60%"
            max-height="20vh"
            alt="filePreview"
          />
        </>
      )}
    </div>
  );
};

export default FileArea;
