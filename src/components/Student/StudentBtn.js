import React, { useState } from "react";
import classes from "./StudentBtn.module.css";

const StudentBtn = (props) => {
  return (
    <>
      <button
        className={`${classes[props.className]} ${
          props.classAdd && "clicked"
        } ${!props.woman && classes["woman"]}`}
        key={`stdBtn-${props.num} ${props.name}`}
        id={`std-${props.num} ${props.name}`}
        onClick={(e) => {
          props.onShowOption(e);
        }}
        title={props?.title}
      >
        {props.num} {props.name}
      </button>
    </>
  );
};

export default StudentBtn;
