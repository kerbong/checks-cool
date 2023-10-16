import classes from "./Attendance.module.css";
import Modal from "../Layout/Modal";
import React, { useState, useEffect } from "react";
import AttendCalendar from "../Attendance/AttendCalendar";
import dayjs from "dayjs";
import AttendanceForm from "./AttendanceForm";
import holidays2023 from "holidays2023";

const Attendance = (props) => {
  const [attendDate, setAttendDate] = useState(new Date());
  const [showCal, setShowCal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));

  //달력에 휴일 그리기
  const drawHolidayOnCal = () => {
    if (!currentMonth) return;
    holidays2023?.forEach((holiday) => {
      if (holiday[0] === currentMonth) {
        let holiday_queryName = holiday[1].split("*");
        let holidayTag = document.querySelectorAll(holiday_queryName[0])[0];
        if (!holidayTag) return;
        // console.log(holidayTag.classList.contains("eventAdded"));
        if (holidayTag.classList.contains("eventAdded")) return;

        const btn = document.createElement("button");
        btn.className = `${classes.holidayData} eventBtn`;
        btn.innerText = holiday_queryName[1];
        holidayTag?.appendChild(btn);
        holidayTag.style.borderRadius = "5px";

        holidayTag.classList.add("eventAdded");
      }
    });
  };

  const getDateHandler = (date) => {
    setAttendDate(date);
  };

  //달력에서 받은 month로 currentMonth변경하기
  const getMonthHandler = (month) => {
    setCurrentMonth(dayjs(month).format("YYYY-MM"));
  };

  //휴일 달력에 그려주기!
  useEffect(() => {
    if (props.about !== "consulting") return;
    drawHolidayOnCal();
  }, [currentMonth, showCal]);

  // useEffect(() => {
  //   if (!showCal) {
  //     setDrawHolidayMonth("");
  //   }
  // }, [showCal]);

  useEffect(() => {
    if (props.about === "attendance") return;
    let weekDayNames = document.querySelector(".react-datepicker__day-names");
    let weekDayName = document.querySelectorAll(".react-datepicker__day-name");
    if (!weekDayNames || !weekDayName) return;
    weekDayNames.style.width = "95%";
    weekDayName[0].style.width = "14%";
    weekDayName[6].style.width = "14%";
  }, [showCal]);

  return (
    <Modal onClose={props.onClose} addStyle="attendHeight">
      <div className={classes["student"]}>
        <span> {props.who} </span>
        <span className={classes.closeBtn} onClick={props.onClose}>
          <i className="fa-regular fa-circle-xmark"></i>
        </span>
      </div>
      <div
        className={classes["date"]}
        onClick={() => setShowCal((prev) => !prev)}
      >
        {" "}
        <AttendCalendar
          filterNone={props.about === "consulting" && true}
          getDateValue={getDateHandler}
          about={props.about}
          isSubject={props.isSubject}
          getMonthValue={getMonthHandler}
        />
      </div>
      <div className={classes["datepick-explain"]}>
        {props.about === "attendance" && "*시작 날짜와 끝 날짜를 선택해주세요!"}
      </div>
      <div className={classes["form-section"]}>
        <AttendanceForm
          id={props.id}
          selectOption={props.selectOption}
          // 전담은 특정학급, 담임은 원래 학급으로 이미 학생명부 전달받음
          students={props.students}
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
