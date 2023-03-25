import CheckLists from "components/CheckListMemo/CheckLists";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CheckListMemo = (props) => {
  const [showExample, setShowExample] = useState(false);
  const [showWhat, setShowWhat] = useState("");

  let navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    setShowWhat(state?.about);
  }, [state]);

  return (
    <div>
      <div id="title-div">
        <button id="title-btn" onClick={() => setShowExample(true)}>
          <i className="fa-regular fa-address-book"></i> 생기부
        </button>

        <div id="title-func-btns">
          <span
            id="switch-btn"
            onClick={() => {
              navigate(`/attendance`, {
                state: { doWhat: "addAttend" },
              });
            }}
          >
            <i className="fa-regular fa-calendar-days"></i> 출결
            <br />
            기록
          </span>

          <span
            id="switch-btn"
            onClick={() => {
              navigate(`/attendance`, {
                state: { doWhat: "showAttend" },
              });
            }}
          >
            <i className="fa-solid fa-user"></i> 출결
            <br />
            조회
          </span>

          <span
            id="switch-btn"
            onClick={() => {
              navigate(`/consulting`, {
                state: { doWhat: "addConsult" },
              });
            }}
          >
            <i className="fa-regular fa-comments"></i> 상담
            <br />
            관리
          </span>
          {/* 제출ox */}
          <span id="switch-btn" onClick={() => setShowWhat("checkLists")}>
            <i className="fa-regular fa-square-check"></i> 제출
            <br />
            ox
          </span>
          {/* 개별기록 */}
          <span id="switch-btn" onClick={() => setShowWhat("listMemo")}>
            <i className="fa-solid fa-clipboard-check"></i> 개별
            <br />
            기록
          </span>
        </div>
      </div>

      {showWhat !== "" && (
        <CheckLists
          students={props.students}
          userUid={props.userUid}
          about={showWhat}
          isSubject={props.isSubject}
        />
      )}
    </div>
  );
};

export default CheckListMemo;
