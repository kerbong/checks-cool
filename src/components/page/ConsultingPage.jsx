import React, { useState, useContext } from "react";
import consultingOption from "../../consultingOption";
import ConsultContext from "../../store/consult-context";
import Attendance from "../Attendance/Attendance";
import Student from "../Student/Student";

const ConsultingPage = (props) => {
  const [optionIsShown, setOptionShown] = useState(false);
  const [student, setStudent] = useState("");
  const [showConsultList, setShowConsultList] = useState(false);
  const anyContext = useContext(ConsultContext);

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
      <button id="switch-btn" onClick={showCalHandler}>
        {showConsultList ? "학생명부" : "상담목록"}
      </button>
      {optionIsShown && (
        <Attendance
          onClose={hideOptionHandler}
          who={student}
          date={new Date()}
          selectOption={consultingOption}
          Context={ConsultContext}
          about="consulting"
        />
      )}
      {!showConsultList ? (
        <Student students={props.students} showOption={showOptionHandler} />
      ) : (
        <>
          {anyContext &&
            // <ConsultLists/>}
            " 아직 빈공간"}
        </>
      )}
    </>
  );
};

export default ConsultingPage;
