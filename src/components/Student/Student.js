import React, { useState } from "react";
import classes from "./Student.module.css";

import StudentBtn from "./StudentBtn";

const Student = (props) => {
  return (
    <div className={classes.div}>
      {props.students &&
        props.students?.map((stu) => (
          // <Button name={stu.num + stu.name} small={true} key={stu.num} />
          <StudentBtn
            className={
              !props.manageEach ? "button-student" : "button-student-manageEach"
            }
            manageEach={props.manageEach}
            name={stu.name}
            key={stu.num}
            num={stu.num}
            onShowOption={(e) => {
              props.showOption(e);
              e.target += "add";
            }}
          />
        ))}
    </div>
  );
};

export default Student;
