import React from "react";
import Button from "../Layout/Button";
import classes from "./StudentLiWithDelete.module.css";
import Swal from "sweetalert2";

const StudentLiWithDelete = (props) => {
  //학생 삭제버튼 누르면 실행되는 함수
  const deleteConfirmHandler = (student) => {
    Swal.fire({
      icon: "question",
      title: "삭제할까요?",
      text: `"${student.name}" 학생정보를 삭제할까요?.`,
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
          title: "삭제완료",
          text: `"${student.name}" 학생정보가 삭제되었습니다.`,
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 4000,
        });
        props.deleteStudentHandler(props.student);
      }
    });
  };

  //번호와 이름을 누르면 수정 or 성별 변경 가능
  const studentFixHandler = () => {
    let woman = props.student.woman || false;
    //수정하는 기능
    props.studentFixHandler({
      num: props.student.num,
      name: props.student.name,
      woman: !woman,
    });
  };

  return (
    <li
      key={props.myKey}
      id={props.student.num}
      className={classes.inputStudentLi}
    >
      <span
        className={`${classes.studentNumName}${
          props.student.woman ? ` ${classes.womanBg}` : " "
        }`}
        onClick={studentFixHandler}
      >
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
