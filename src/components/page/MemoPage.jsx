import CheckLists from "components/Memo/CheckLists";
import React, { useState } from "react";
import classes from "../Memo/CheckLists.module.css";
import { useLocation } from "react-router";
import MemoTodayTodo from "../Memo/MemoTodayTodo";
import ExampleModal from "./ExampleModal";

import submitMemo from "../../assets/memo/submitMemo.gif";
import todayTodo from "../../assets/memo/todayTodo.gif";
import listMemo from "../../assets/memo/listMemo.gif";

const MemoPage = (props) => {
  const { state } = useLocation();
  const [showMemos, setShowMemos] = useState(
    state === "checkLists" || state === "listMemo" ? false : true
  );
  const [showChecklists, setshowChecklists] = useState(
    state === "checkLists" ? true : false
  );
  const [showAchives, setShowAchives] = useState(
    state === "listMemo" ? true : false
  );
  const [showExample, setShowExample] = useState(false);

  const exampleHandler = () => {
    setShowExample(true);
  };

  return (
    <>
      {showExample && (
        <ExampleModal
          onClose={() => setShowExample(false)}
          imgSrc={
            showChecklists ? submitMemo : showMemos ? todayTodo : listMemo
          }
          text={
            <>
              <p
                style={{
                  fontSize: "1.3em",
                  textAlign: "center",
                  margin: "5px",
                }}
              >
                === {showMemos && "할 일 메모"} {showChecklists && "제출ox"}{" "}
                {showAchives && "개별기록 "} 예시 ===
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
        <button id="title-btn" className="memo" onClick={exampleHandler}>
          <i className="fa-regular fa-note-sticky"></i>
          {showMemos && (
            <>
              {">"}
              <i className="fa-regular fa-square-check"></i> 할거보소
            </>
          )}
          {showChecklists && (
            <>
              {">"}
              <i className="fa-solid fa-clipboard-check"></i> 냄/안냄
            </>
          )}
          {showAchives && (
            <>
              {">"}
              <i className="fa-solid fa-clipboard-list"></i> 개별기록
            </>
          )}
        </button>
        <div style={{ height: "70px", display: "flex", alignItems: "center" }}>
          <span
            className={classes["memo-headerBtn"]}
            onClick={() => {
              setShowMemos(true);
              setshowChecklists(false);
              setShowAchives(false);
            }}
          >
            <i className="fa-regular fa-square-check"></i>
            <span className={classes["headerBtn-text"]}> 할일</span>
          </span>
          <span
            className={classes["memo-headerBtn"]}
            onClick={() => {
              setShowMemos(false);
              setshowChecklists(true);
              setShowAchives(false);
            }}
          >
            <i className="fa-solid fa-clipboard-check"></i>
            <span className={classes["headerBtn-text"]}> 제출ox</span>
          </span>
          <span
            className={classes["memo-headerBtn"]}
            onClick={() => {
              setShowMemos(false);
              setshowChecklists(false);
              setShowAchives(true);
            }}
          >
            <i className="fa-solid fa-clipboard-list"></i>
            <span className={classes["headerBtn-text"]}> 개별기록</span>
          </span>
        </div>
      </div>

      {showChecklists && (
        <CheckLists
          students={props.students}
          userUid={props.userUid}
          about="checkLists"
        />
      )}
      {showMemos && <MemoTodayTodo userUid={props.userUid} />}
      {showAchives && (
        <CheckLists
          students={props.students}
          userUid={props.userUid}
          about="listMemo"
        />
      )}
    </>
  );
};

export default MemoPage;
