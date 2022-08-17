import React, { useState } from "react";

import AttendCtxCalendar from "../Attendance/AttendCtxCalendar";
import Attendance from "../Attendance/Attendance";
import Student from "../Student/Student";

const StudentCalendarLayout = (props) => {
  const [optionIsShown, setOptionShown] = useState(false);
  const [student, setStudent] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const showOptionHandler = (e) => {
    setStudent(e.target.innerText);
    setOptionShown(true);
  };

  const hideOptionHandler = () => {
    setOptionShown(false);
  };

  const showCalHandler = () => {
    setShowCalendar(!showCalendar);
  };
  return (
    <>
      <button id="switch-btn" onClick={showCalHandler}>
        {showCalendar ? "학생명부" : "달력보기"}
      </button>
      {optionIsShown && (
        <Attendance
          onClose={hideOptionHandler}
          who={student}
          date={new Date()}
          selectOption={props.selectOption}
          Context={props.Context}
          about="attendance"
        />
      )}
      {!showCalendar ? (
        <Student students={props.students} showOption={showOptionHandler} />
      ) : (
        <>
          {/* <AttendCalendar inline={"true"} getDateValue={getAttendDates} /> */}
          <AttendCtxCalendar
            Context={props.Context}
            selectOption={props.selectOption}
            about="attendance"
          />
        </>
      )}
    </>
  );
};

export default StudentCalendarLayout;
