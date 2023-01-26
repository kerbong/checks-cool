import React, { useState, useEffect } from "react";

import AttendCtxCalendar from "../Attendance/AttendCtxCalendar";
import dayjs from "dayjs";
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
  const [nowStudents, setNowStudents] = useState([]);
  const [isSubject, setIsSubject] = useState(false);

  //학년도 설정함수
  const setYear = () => {
    let now = dayjs();
    let yearGroup = "";
    let now_month = now.format("MM");
    let now_year = now.format("YYYY");

    if (+now_month >= 3) {
      yearGroup = now_year;
    } else if (+now_month <= 1) {
      yearGroup = String(+now_year - 1);
    }
    return yearGroup;
  };

  useEffect(() => {
    //해당학년도에 전담여부 확인
    let data_year = setYear();
    let isSubject = props.isSubject?.filter(
      (yearData) => Object.keys(yearData)[0] === data_year
    )?.[0]?.[data_year];
    setIsSubject(isSubject);
  }, [props.isSubject]);

  useEffect(() => {
    let now_year = setYear();
    //현재학년도 자료만 입력가능하고,, 불러오기
    let now_students = props?.students?.filter(
      (yearStd) => String(Object.keys(yearStd)[0]) === now_year
    )?.[0]?.[now_year];

    setNowStudents(now_students);
  }, [props.students]);

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
            {!isSubject && (
              <button id="switch-btn" onClick={showStudentsListHandler}>
                <i className="fa-solid fa-list-ol"></i> 명렬표
              </button>
            )}

            <button id="switch-btn" onClick={showEachStudentHandler}>
              <i className="fa-solid fa-user"></i> 조회
            </button>
          </div>

          {/* 현재학년도 학생만 보내줌 */}
          <AttendCtxCalendar
            selectOption={props.selectOption}
            about="attendance"
            isSubject={isSubject}
            students={nowStudents}
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

            {!isSubject && (
              <button id="switch-btn" onClick={showStudentsListHandler}>
                <i className="fa-solid fa-list-ol"></i> 명렬표
              </button>
            )}

            <button id="switch-btn" onClick={showCalHandler}>
              <i className="fa-regular fa-calendar-days"></i> 출결달력
            </button>
          </div>

          {/* 전체 학년도 학생목록 */}
          <AttendEachLists
            userUid={props.userUid}
            isSubject={props.isSubject}
            students={props.students}
          />
        </>
      )}

      {/* 전체 학생명부 에서 보여줄 버튼,내용 */}
      {/* 전담교사는 반별 학생 명렬표로 기간동안 안나오는 걸 입력할 필요성이 낮으므로 제외 */}
      {showStudentsList && !isSubject && (
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
          <Student students={nowStudents} showOption={showOptionHandler} />
        </>
      )}

      {/* studentsList 학생명부에서 학생 클릭하면 출결옵션 화면 나오기 */}
      {optionIsShown && !isSubject && (
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
