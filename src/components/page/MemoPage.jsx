import CheckLists from "components/Memo/CheckLists";
import React, { useState } from "react";
import classes from "../Memo/CheckLists.module.css";

import MemoTodayTodo from "../Memo/MemoTodayTodo";

const MemoPage = (props) => {
  const [showMemos, setShowMemos] = useState(true);
  const [showChecklists, setshowChecklists] = useState(false);
  const [showAchives, setShowAchives] = useState(false);
  return (
    <>
      <div id="title-div">
        <button id="title-btn" className="todo">
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
            <span className={classes["headerBtn-text"]}> 제출목록</span>
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
            <span className={classes["headerBtn-text"]}> 명렬표기록</span>
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
