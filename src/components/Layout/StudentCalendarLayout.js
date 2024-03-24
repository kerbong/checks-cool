import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AttendCtxCalendar from "../Attendance/AttendCtxCalendar";
import dayjs from "dayjs";
import Attendance from "../Attendance/Attendance";
import Student from "../Student/Student";
import {
  FaCalendarDays,
  FaClipboardCheck,
  FaRegCalendarDays,
  FaRegComments,
  FaRegSquareCheck,
} from "react-icons/fa6";
// import ExampleModal from "../page/ExampleModal";
// import calendar from "../../assets/attend/calendar.gif";
// import list from "../../assets/attend/list.gif";
// import show from "../../assets/attend/show.gif";

const StudentCalendarLayout = (props) => {
  const [optionIsShown, setOptionShown] = useState(false);

  const [student, setStudent] = useState("");
  const [showCalendar, setShowCalendar] = useState(true);
  const [showExample, setShowExample] = useState(false);
  const [nowStudents, setNowStudents] = useState([]);
  const [isSubject, setIsSubject] = useState(false);

  let navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.doWhat === "addAttend" || state?.todo === "add") {
      // setShowCalendar(true);
    } else {
    }
  }, [state]);

  //학년도 설정함수
  const setYear = () => {
    return dayjs().format("MM-DD") <= "02-15"
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  useEffect(() => {
    //해당학년도에 전담여부 확인
    let data_year = setYear();

    let isSubject = props.isSubject?.filter(
      (yearData) => Object.keys(yearData)?.[0] === data_year
    )?.[0]?.[data_year];
    setIsSubject(isSubject);
  }, [props.isSubject]);

  useEffect(() => {
    let now_year = setYear();
    //현재학년도 자료만 입력가능하고,, 불러오기
    let now_students =
      props?.students?.filter(
        (yearStd) => String(Object.keys(yearStd)[0]) === now_year
      )?.[0]?.[now_year] || [];

    setNowStudents(now_students);
  }, [props.students]);

  const showOptionHandler = (e) => {
    setStudent(e.target.innerText);
    setOptionShown(true);
  };

  const hideOptionHandler = () => {
    setOptionShown(false);
  };

  const showCalHandler = () => {
    setShowCalendar(true);
  };

  const titleDivBtns = (
    <div id="title-div">
      <button id="title-btn" onClick={() => setShowExample(true)}>
        <FaRegCalendarDays /> 출결기록
      </button>

      <div
        style={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          width: "auto",
          justifyContent: "flex-end",
          lineHeight: "20px",
          fontSize: "0.9rem",
        }}
      >
        <span onClick={showCalHandler}>
          <FaCalendarDays id="switch-btn" /> 출결
          <br />
          기록
        </span>

        <span
          onClick={() => {
            navigate(`/consulting`, {
              state: { doWhat: "addConsult" },
            });
          }}
        >
          <FaRegComments id="switch-btn" />
          상담
          <br />
          관리
        </span>
        {/* 제출ox */}
        <span
          onClick={() => {
            navigate(`/checkListMemo`, {
              state: { about: "checkLists" },
            });
          }}
        >
          <FaRegSquareCheck id="switch-btn" />
          제출
          <br />
          ox
        </span>
        {/* 개별기록 */}
        <span
          onClick={() => {
            navigate(`/checkListMemo`, {
              state: { about: "listMemo" },
            });
          }}
        >
          <FaClipboardCheck id="switch-btn" /> 개별
          <br />
          기록
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* {showExample && (
        <ExampleModal
          onClose={() => setShowExample(false)}
          imgSrc={showCalendar ? calendar : show}
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
                {showStudentsList && "명렬표입력"} 예시 ===
              </p>
              <p style={{ margin: "15px" }}>
                * 화면 왼쪽 상단의 현재 페이지 타이틀을 클릭하시면 다시 보실 수
                있어요!
              </p>
            </>
          }
        />
      )} */}

      {titleDivBtns}

      {/* 출결 달력+명렬표 에서 보여줄 버튼, 내용 */}
      {/* {showCalendar && ( */}
      <>
        {props.students.length === 0 && (
          <>
            <div>학생 명단이 존재하지 않네요!</div>
            <div>메뉴의 곰돌이를 눌러서</div>
            <div>학생 명단을 먼저 입력해주세요!</div>
          </>
        )}

        {/* 현재학년도 학생만 보내줌 */}
        <AttendCtxCalendar
          selectOption={props.selectOption}
          about="attendance"
          isSubject={isSubject}
          students={nowStudents}
          userUid={props.userUid}
          addClicked={state?.todo === "add" ? true : false}
        />

        {!isSubject && (
          <>
            <br />

            <Student students={nowStudents} showOption={showOptionHandler} />

            <p>{"* 일정 기간 반복되는 출결은 학생 이름을 클릭하세요!"}</p>

            <p>
              * 문제가 지속되시면 kerbong@gmail.com으로 알려주세요. 최대한
              빠르게 해결해 드릴게요!
            </p>
          </>
        )}
      </>
      {/* )} */}

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
