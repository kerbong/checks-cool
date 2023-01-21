import React, { useState } from "react";

import AttendCtxCalendar from "../Attendance/AttendCtxCalendar";
import Attendance from "../Attendance/Attendance";
import Student from "../Student/Student";
import AttendEachLists from "../Attendance/AttendEachLists";
import ExampleModal from "../page/ExampleModal";
import calendar from "../../assets/attend/calendar.gif";
import list from "../../assets/attend/list.gif";
import show from "../../assets/attend/show.gif";

const StudentCalendarLayout = (props) => {
  const [optionIsShown, setOptionShown] = useState(false);
  const [showEachStudent, setShowEachStudent] = useState(false);
  const [showStudentsList, setShowStudentsList] = useState(false);
  const [student, setStudent] = useState("");
  const [showCalendar, setShowCalendar] = useState(true);
  const [showExample, setShowExample] = useState(false);

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
      {showExample && (
        <ExampleModal
          onClose={() => setShowExample(false)}
          imgSrc={showCalendar ? calendar : showStudentsList ? list : show}
          text={
            <>
              <p
                style={{
                  fontSize: "1.3em",
                  textAlign: "center",
                  margin: "5px",
                }}
              >
                === {showCalendar && "출결달력"}{" "}
                {showStudentsList && "명렬표입력"}{" "}
                {showEachStudent && "모아보기"} 예시 ===
              </p>
              <p style={{ margin: "15px" }}>
                * 화면 왼쪽 상단의 현재 페이지 타이틀을 클릭하시면 다시 보실 수
                있어요!
              </p>
            </>
          }
        />
      )}
      {/* 출결 달력 에서 보여줄 버튼, 내용 */}
      {showCalendar && (
        <>
          <div id="title-div">
            <button id="title-btn" onClick={() => setShowExample(true)}>
              <i className="fa-regular fa-address-book"></i> 다왔니?
            </button>
            {!props.isSubject && (
              <button id="switch-btn" onClick={showStudentsListHandler}>
                <i className="fa-solid fa-list-ol"></i> 명렬표
              </button>
            )}

            <button id="switch-btn" onClick={showEachStudentHandler}>
              <i className="fa-solid fa-user"></i> 조회
            </button>
          </div>

          <AttendCtxCalendar
            selectOption={props.selectOption}
            about="attendance"
            isSubject={props.isSubject}
            students={props.students}
            userUid={props.userUid}
          />
        </>
      )}

      {/* 개별학생 출석부 에서 보여줄 버튼,내용 */}
      {showEachStudent && (
        <>
          <div id="title-div">
            <button id="title-btn" onClick={() => setShowExample(true)}>
              <i className="fa-regular fa-address-book"></i> 모아보기
            </button>
            {!props.isSubject && (
              <button id="switch-btn" onClick={showStudentsListHandler}>
                <i className="fa-solid fa-list-ol"></i> 명렬표
              </button>
            )}

            <button id="switch-btn" onClick={showCalHandler}>
              <i className="fa-regular fa-calendar-days"></i> 출결달력
            </button>
          </div>

          <AttendEachLists
            userUid={props.userUid}
            isSubject={props.isSubject}
            students={props.students}
          />
        </>
      )}

      {/* 전체 학생명부 에서 보여줄 버튼,내용 */}
      {/* 전담교사는 반별 학생 명렬표로 기간동안 안나오는 걸 입력할 필요성이 낮으므로 제외 */}
      {showStudentsList && !props.isSubject && (
        <>
          <div id="title-div">
            <button id="title-btn" onClick={() => setShowExample(true)}>
              <i className="fa-regular fa-address-book"></i> 안온사람?
            </button>
            <button id="switch-btn" onClick={showCalHandler}>
              <i className="fa-regular fa-calendar-days"></i> 출결달력
            </button>
            <button id="switch-btn" onClick={showEachStudentHandler}>
              <i className="fa-solid fa-user"></i> 조회
            </button>
          </div>
          {props.students.length === 0 && (
            <>
              <div>학생 명단이 존재하지 않네요!</div>
              <div>메뉴의 곰돌이를 눌러서</div>
              <div>학생 명단을 먼저 입력해주세요!</div>
            </>
          )}
          <Student students={props.students} showOption={showOptionHandler} />
        </>
      )}

      {/* studentsList 학생명부에서 학생 클릭하면 출결옵션 화면 나오기 */}
      {optionIsShown && !props.isSubject && (
        <Attendance
          onClose={hideOptionHandler}
          who={student}
          date={new Date()}
          selectOption={props.selectOption}
          userUid={props.userUid}
          about="attendance"
        />
      )}
    </>
  );
};

export default StudentCalendarLayout;
