import React, { useState } from "react";
import consultingOption from "../../consultingOption";
import ConsultContext from "../../store/consult-context";
import Attendance from "../Attendance/Attendance";
import Student from "../Student/Student";

import ConsultLists from "../Consult/ConsultLists";
import ExampleModal from "./ExampleModal";
import consultAdd from "../../assets/consult/consultAdd.gif";

const ConsultingPage = (props) => {
  const [optionIsShown, setOptionShown] = useState(false);
  const [student, setStudent] = useState("");
  const [showConsultList, setShowConsultList] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const showOptionHandler = (e) => {
    setStudent(e.target.innerText);
    setOptionShown(true);
  };

  const hideOptionHandler = () => {
    setOptionShown(false);
  };

  const showCalHandler = () => {
    setShowConsultList(!showConsultList);
  };

  return (
    <>
      {showExample && (
        <ExampleModal
          onClose={() => setShowExample(false)}
          imgSrc={consultAdd}
          text={
            <>
              <p
                style={{
                  fontSize: "1.3em",
                  textAlign: "center",
                  margin: "5px",
                }}
              >
                === 상담기록 예시 ===
              </p>
              <p style={{ margin: "15px" }}>
                * 화면 왼쪽 상단의 현재 페이지 타이틀을 클릭하시면 다시 보실 수
                있어요!
              </p>
            </>
          }
        />
      )}
      <div id="title-div">
        <button
          id="title-btn"
          className="consult"
          onClick={() => setShowExample(true)}
        >
          <i className="fa-regular fa-comments"></i> 금쪽상담소
        </button>

        <button id="switch-btn" onClick={showCalHandler}>
          {showConsultList ? (
            <>
              <i className="fa-solid fa-list-ol"></i> 쓰기
            </>
          ) : (
            <>
              <i className="fa-regular fa-rectangle-list"></i> 보기
            </>
          )}
        </button>
      </div>

      {optionIsShown && (
        //모달로 나오는 상담 입력화면
        <Attendance
          onClose={hideOptionHandler}
          who={student}
          date={new Date()}
          selectOption={consultingOption}
          Context={ConsultContext}
          about="consulting"
          userUid={props.userUid}
        />
      )}
      {props.students.length === 0 && (
        <>
          <div>학생 명단이 존재하지 않네요!</div>
          <div>메뉴의 곰돌이를 눌러서</div>
          <div>학생 명단을 먼저 입력해주세요!</div>
        </>
      )}
      {!showConsultList ? (
        //명렬표로 입력할 수 있도록 나오는 화면
        <Student students={props.students} showOption={showOptionHandler} />
      ) : (
        <>
          {/* 그동안의 기록들 볼 수 있는 화면 */}
          <ConsultLists
            context={ConsultContext}
            selectOption={consultingOption}
          />
        </>
      )}
    </>
  );
};

export default ConsultingPage;
