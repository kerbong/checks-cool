import React from "react";
import Button from "../Layout/Button";
import classes from "./StudentLiWithDelete.module.css";
import Swal from "sweetalert2";

const StudentLiWithDelete = (props) => {
  const deleteConfirmHandler = (student) => {
    Swal.fire({
      title: "학생을 지울까요?",
      text: `${student.num} 번 ${student.name} 학생. \n\n 지우면 등록된 자료들도 삭제됩니다. 
               `,
      showDenyButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "자료가 삭제되었어요.",
          text: "5초 후에 창이 사라집니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
        props.deleteStudentHandler(props.student.num);
      }
    });
  };
  return (
    <li
      key={props.student.num}
      id={props.student.num}
      className={classes.inputStudentLi}
    >
      <span className={classes.studentNumName}>
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
