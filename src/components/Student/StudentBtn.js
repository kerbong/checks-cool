import React from "react";
import classes from "./StudentBtn.module.css";

const StudentBtn = (props) => {
  return (
    <>
      <button
        className={classes["button-student"]}
        onClick={props.onShowOption}
      >
        {props.num} {props.name}
      </button>
    </>
  );
};

export default StudentBtn;
