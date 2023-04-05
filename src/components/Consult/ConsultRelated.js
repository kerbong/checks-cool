import React, { useRef, useState, useEffect } from "react";
import Modal from "components/Layout/Modal";
import Student from "components/Student/Student";
import classes from "../Attendance/AttendanceForm.module.css";
import Button from "components/Layout/Button";

const ConsultRelated = (props) => {
  console.log(props.students);

  return (
    <Modal onClose={props.closeModalHandler}>
      {/* 관련학생 이름들 보여주기 */}
      {props.who}
      <h2 className={classes.btnArea}>
        관련학생 등록
        <div>
          <Button
            name="취소"
            className="student-add"
            style={{ width: "50px", backgroundColor: "#ff6600a6" }}
            onclick={() => {
              props.closeModalHandler();
            }}
          />
          <Button
            name="확인"
            style={{ width: "50px", backgroundColor: "#ff6600a6" }}
            className="student-add"
            onclick={props.confirmBtnHandler}
          />
        </div>
      </h2>
      {props.relatedStudent?.length > 0 && (
        <div className={classes["relStdShowDiv"]}>
          {props.relatedStudent?.map((std) => (
            <span key={std} className={classes["margin-5"]}>
              {std}
            </span>
          ))}
        </div>
      )}
      <Student
        students={props.students}
        showOption={props.studentClickHandler}
        isSubject={props.isSubject}
      />
    </Modal>
  );
};

export default ConsultRelated;
