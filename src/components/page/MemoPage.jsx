import CheckLists from "components/Memo/CheckLists";
import React, { useState, useEffect } from "react";
import classes from "../Memo/CheckLists.module.css";
import { useLocation } from "react-router";
import MemoTodayTodo from "../Memo/MemoTodayTodo";
import ExampleModal from "./ExampleModal";

import submitMemo from "../../assets/memo/submitMemo.gif";
import todayTodo from "../../assets/memo/todayTodo.gif";
import listMemo from "../../assets/memo/listMemo.gif";

const SHOW_WHAT = ["checkLists", "listMemo", "todayTodo"];

const MemoPage = (props) => {
  const { state } = useLocation();
  const [showWhatMemo, setShowWhatMemo] = useState("");
  // const [showMemos, setShowMemos] = useState(
  //   state === "checkLists" || state === "listMemo" ? false : true
  // );
  // const [showChecklists, setshowChecklists] = useState(
  //   state === "checkLists" ? true : false
  // );
  // const [showAchives, setShowAchives] = useState(
  //   state === "listMemo" ? true : false
  // );
  const [showExample, setShowExample] = useState(false);

  useEffect(() => {
    if (state === "checkLists") {
      setShowWhatMemo("checkLists");
    } else if (state === "listMemo") {
      setShowWhatMemo("listMemo");
    } else {
      setShowWhatMemo("todayTodo");
    }
  }, [state]);

  const exampleHandler = () => {
    setShowExample(true);
  };

  const memoTitle =
    showWhatMemo === SHOW_WHAT[0]
      ? "제출ox"
      : showWhatMemo === SHOW_WHAT[1]
      ? "개별기록"
      : "할 일 메모";

  return (
    <>
      {showExample && (
        <ExampleModal
          onClose={() => setShowExample(false)}
          imgSrc={
            showWhatMemo === SHOW_WHAT[0]
              ? submitMemo
              : showWhatMemo === SHOW_WHAT[1]
              ? listMemo
              : todayTodo
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
                === {memoTitle} 예시 ===
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
        <button id="title-btn" className="title-memo" onClick={exampleHandler}>
          <>
            <i className="fa-regular fa-square-check"></i> {memoTitle}
          </>
        </button>
        <div style={{ height: "70px", display: "flex", alignItems: "center" }}>
          <span
            className={classes["memo-headerBtn"]}
            onClick={() => {
              setShowWhatMemo(SHOW_WHAT[2]);
            }}
          >
            <i className="fa-regular fa-square-check"></i>
            <span className={classes["headerBtn-text"]}> 할일</span>
          </span>
          <span
            className={classes["memo-headerBtn"]}
            onClick={() => {
              setShowWhatMemo(SHOW_WHAT[0]);
            }}
          >
            <i className="fa-solid fa-clipboard-check"></i>
            <span className={classes["headerBtn-text"]}> 제출ox</span>
          </span>
          <span
            className={classes["memo-headerBtn"]}
            onClick={() => {
              setShowWhatMemo(SHOW_WHAT[1]);
            }}
          >
            <i className="fa-solid fa-clipboard-list"></i>
            <span className={classes["headerBtn-text"]}> 개별기록</span>
          </span>
        </div>
      </div>

      {showWhatMemo === SHOW_WHAT[0] && (
        <CheckLists
          students={props.students}
          userUid={props.userUid}
          about="checkLists"
        />
      )}
      {showWhatMemo === SHOW_WHAT[2] && (
        <MemoTodayTodo userUid={props.userUid} />
      )}
      {showWhatMemo === SHOW_WHAT[1] && (
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
