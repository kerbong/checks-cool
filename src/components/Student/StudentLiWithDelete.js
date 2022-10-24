import React from "react";
import Button from "../Layout/Button";
import classes from "./StudentLiWithDelete.module.css";
import Swal from "sweetalert2";

const StudentLiWithDelete = (props) => {
  const deleteConfirmHandler = (student) => {
    props.deleteStudentHandler(props.student);
  };

  const studentFixHandler = () => {
    props.studentFixHandler({
      num: props.student.num,
      name: props.student.name,
    });
  };

  return (
    <li
      key={props.myKey}
      id={props.student.num}
      className={classes.inputStudentLi}
    >
      <span className={classes.studentNumName} onClick={studentFixHandler}>
        {props.student.num + " " + props.student.name}
      </span>
      <Button
        className="student-remove"
        name={<i className="fa-solid fa-minus"></i>}
        onclick={() => {
          deleteConfirmHandler(props.student);
        }}
      />
    </li>
  );
};

export default StudentLiWithDelete;
