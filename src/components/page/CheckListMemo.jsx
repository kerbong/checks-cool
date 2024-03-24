import CheckLists from "components/CheckListMemo/CheckLists";
import React, { useState, useEffect } from "react";
import {
  FaCalendarDays,
  FaClipboardCheck,
  FaRegComments,
  FaRegSquareCheck,
} from "react-icons/fa6";
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
          {showWhat === "checkLists" ? (
            <>
              <FaRegSquareCheck /> 제출ox
            </>
          ) : (
            <>
              <FaClipboardCheck /> 개별기록
            </>
          )}
        </button>

        <div id="title-func-btns">
          <span
            onClick={() => {
              navigate(`/attendance`, {
                state: { doWhat: "addAttend" },
              });
            }}
          >
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
          <span onClick={() => setShowWhat("checkLists")}>
            <FaRegSquareCheck id="switch-btn" />
            제출
            <br />
            ox
          </span>
          {/* 개별기록 */}
          <span onClick={() => setShowWhat("listMemo")}>
            <FaClipboardCheck id="switch-btn" /> 개별
            <br />
            기록
          </span>
        </div>
      </div>
      {/* <hr style={{ margin: "10px" }} /> */}
      {showWhat !== "" && (
        <CheckLists
          students={props.students}
          userUid={props.userUid}
          about={showWhat}
          isSubject={props.isSubject}
          addClicked={state?.todo === "add" ? true : false}
        />
      )}
    </div>
  );
};

export default CheckListMemo;
