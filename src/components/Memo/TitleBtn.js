import React from "react";
import classes from "./Memo.module.css";

const TitleBtn = (props) => {
  return (
    <span
      className={classes["memo-headerBtn"]}
      onClick={() => {
        props.setShowWhatMemo();
      }}
    >
      {props.icon}
      <span
        className={classes["headerBtn-text"]}
        dangerouslySetInnerHTML={{ __html: props.menu_name.split("<br/>")[0] }}
      ></span>
    </span>
  );
};

export default TitleBtn;
