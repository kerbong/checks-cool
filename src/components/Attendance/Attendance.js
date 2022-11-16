import classes from "./Attendance.module.css";
import Modal from "../Layout/Modal";
import React, { useState } from "react";
import AttendCalendar from "../Attendance/AttendCalendar";

import AttendanceForm from "./AttendanceForm";

const Attendance = (props) => {
  const [attendDate, setAttendDate] = useState(new Date());

  const getDateHandler = (date) => {
    setAttendDate(date);
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes["student"]}>
        <span> {props.who} </span>
        <span className={classes.closeBtn} onClick={props.onClose}>
          <i className="fa-regular fa-circle-xmark"></i>
        </span>
      </div>
      <div className={classes["date"]}>
        {" "}
        <AttendCalendar getDateValue={getDateHandler} about={props.about} />
      </div>
      <div className={classes["datepick-explain"]}>
        {props.about === "attendance" && "*시작 날짜와 끝 날짜를 선택해주세요!"}
      </div>
      <div className={classes["form-section"]}>
        <AttendanceForm
          id={props.id}
          selectOption={props.selectOption}
          attendDate={attendDate}
          about={props.about}
          addData={(data) => props.addData(data)}
          userUid={props.userUid}
          who={props.who}
          onClose={props.onClose}
        />
      </div>
    </Modal>
  );
};

export default Attendance;
