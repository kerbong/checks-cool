import React, { useState } from "react";

import AttendCtxCalendar from "../Attendance/AttendCtxCalendar";
import Attendance from "../Attendance/Attendance";
import Student from "../Student/Student";
import AttendEachLists from "../Attendance/AttendEachLists";

const StudentCalendarLayout = (props) => {
  const [optionIsShown, setOptionShown] = useState(false);
  const [showEachStudent, setShowEachStudent] = useState(false);
  const [showStudentsList, setShowStudentsList] = useState(false);
  const [student, setStudent] = useState("");
  const [showCalendar, setShowCalendar] = useState(true);

  const showOptionHandler = (e) => {
    setStudent(e.target.innerText);
    setOptionShown(true);
  };

  const hideOptionHandler = () => {
    setOptionShown(false);
  };

  const setAllFalse = () => {
    setShowCalendar(false);
    setShowEachStudent(false);
    setShowStudentsList(false);
  };

  const showCalHandler = () => {
    setAllFalse();
    setShowCalendar(true);
  };
  const showEachStudentHandler = () => {
    setAllFalse();
    setShowEachStudent(true);
  };
  const showStudentsListHandler = () => {
    setAllFalse();
    setShowStudentsList(true);
  };

  return (
    <>
      {/* 출결 달력 에서 보여줄 버튼, 내용 */}
      {showCalendar && (
        <>
          <div id="title-div">
            <button id="title-btn">
              <i className="fa-regular fa-address-book"></i> 출석부
            </button>
            <button id="switch-btn" onClick={showStudentsListHandler}>
              <i className="fa-solid fa-list-ol"></i>
            </button>
            <button id="switch-btn" onClick={showEachStudentHandler}>
              <i className="fa-solid fa-user"></i>
            </button>
          </div>

          <AttendCtxCalendar
            Context={props.Context}
            selectOption={props.selectOption}
            about="attendance"
            students={props.students}
          />
        </>
      )}

      {/* 개별학생 출석부 에서 보여줄 버튼,내용 */}
      {showEachStudent && (
        <>
          <div id="title-div">
            <button id="title-btn">
              <i className="fa-regular fa-address-book"></i> 출석부
            </button>
            <button id="switch-btn" onClick={showStudentsListHandler}>
              <i className="fa-solid fa-list-ol"></i>
            </button>
            <button id="switch-btn" onClick={showCalHandler}>
              <i className="fa-regular fa-calendar-days"></i>
            </button>
          </div>

          <AttendEachLists />
        </>
      )}

      {/* 전체 학생명부 에서 보여줄 버튼,내용 */}
      {showStudentsList && (
        <>
          <div id="title-div">
            <button id="title-btn">
              <i className="fa-regular fa-address-book"></i> 출석부
            </button>
            <button id="switch-btn" onClick={showEachStudentHandler}>
              <i className="fa-solid fa-user"></i>
            </button>
            <button id="switch-btn" onClick={showCalHandler}>
              <i className="fa-regular fa-calendar-days"></i>
            </button>
          </div>
          <Student students={props.students} showOption={showOptionHandler} />
        </>
      )}

      {/* studentsList 학생명부에서 학생 클릭하면 출결옵션 화면 나오기 */}
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
    </>
  );
};

export default StudentCalendarLayout;
