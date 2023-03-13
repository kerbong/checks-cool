import React, { useState } from "react";
import classes from "./StudentBtn.module.css";

const StudentBtn = (props) => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <button
        className={`${classes[props.className]} ${
          clicked ? classes["clicked"] : classes["none"]
        }`}
        onClick={(e) => {
          props.onShowOption(e);
          setClicked((prev) => !prev);
        }}
      >
        {props.num} {props.name}
      </button>
    </>
  );
};

export default StudentBtn;
