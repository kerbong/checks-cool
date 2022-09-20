import React, { useState } from "react";
import consultingOption from "../../consultingOption";
import ConsultContext from "../../store/consult-context";
import Attendance from "../Attendance/Attendance";
import Student from "../Student/Student";

import ConsultLists from "../Consult/ConsultLists";

const ConsultingPage = (props) => {
  const [optionIsShown, setOptionShown] = useState(false);
  const [student, setStudent] = useState("");
  const [showConsultList, setShowConsultList] = useState(false);

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
      <div id="title-div">
        <button id="title-btn" className="consult">
          <i className="fa-regular fa-comments"></i> 상담기록
        </button>

        <button id="switch-btn" onClick={showCalHandler}>
          {showConsultList ? (
            <i className="fa-solid fa-list-ol"></i>
          ) : (
            <i className="fa-regular fa-rectangle-list"></i>
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
