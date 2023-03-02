import React, { useState } from "react";
import classes from "./AttendanceOption.module.css";

const AttendanceOption = (props) => {
  const [option, setOption] = useState("");

  const showNote = (e) => {
    setOption(e.target.id + e.target.innerText);
    props.showNote(e.target.id + e.target.innerText);
  };
  return (
    <ul className={classes["ul"]}>
      {props.selectOption &&
        props.selectOption?.map((select_option) => (
          <li
            className={
              select_option.value === option
                ? classes["option-select"]
                : classes["option"]
            }
            key={select_option.id}
            id={select_option.id}
            onClick={showNote}
          >
            {select_option.class}
          </li>
        ))}
    </ul>
  );
};

export default AttendanceOption;
