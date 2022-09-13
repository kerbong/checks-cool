import React from "react";
import classes from "./Student.module.css";

import StudentBtn from "./StudentBtn";

const Student = (props) => {
  return (
    <div className={classes.div}>
      {props.students &&
        props.students.map((stu) => (
          // <Button name={stu.num + stu.name} small={true} key={stu.num} />
          <StudentBtn
            className={"button-student"}
            name={stu.name}
            key={stu.num}
            num={stu.num}
            onShowOption={props.showOption}
          />
        ))}
    </div>
  );
};

export default Student;
