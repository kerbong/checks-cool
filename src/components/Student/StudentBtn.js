import React, { useState } from "react";
import classes from "./StudentBtn.module.css";

const StudentBtn = (props) => {
  return (
    <>
      <button
        className={`${classes[props.className]} `}
        id={`std-${props.num} ${props.name}`}
        onClick={(e) => {
          props.onShowOption(e);
        }}
      >
        {props.num} {props.name}
      </button>
    </>
  );
};

export default StudentBtn;
