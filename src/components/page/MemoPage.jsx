import CheckLists from "components/Memo/CheckLists";
import React, { useState } from "react";
import classes from "../Memo/CheckLists.module.css";

import MemoTodo from "../Memo/MemoTodo";

const MemoPage = (props) => {
  const [showMemos, setShowMemos] = useState(false);
  const [showChecklists, setshowChecklists] = useState(true);
  const [showAchives, setShowAchives] = useState(false);
  return (
    <>
      <div id="title-div">
        <button id="title-btn" className="todo">
          <i className="fa-regular fa-note-sticky"></i>
          {showMemos && " 오늘할일"}
          {showChecklists && " 체크리스트"}
          {showAchives && " 메모장"}
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
            <i className="fa-solid fa-list-check"></i>
          </span>
          <span
            className={classes["memo-headerBtn"]}
            onClick={() => {
              setShowMemos(false);
              setshowChecklists(true);
              setShowAchives(false);
            }}
          >
            <i className="fa-solid fa-check"></i>
          </span>
          <span
            className={classes["memo-headerBtn"]}
            onClick={() => {
              setShowMemos(false);
              setshowChecklists(false);
              setShowAchives(true);
            }}
          >
            <i className="fa-regular fa-note-sticky"></i>
          </span>
        </div>
      </div>

      {showChecklists && (
        <CheckLists students={props.students} userUid={props.userUid} />
      )}
      {showMemos && <MemoTodo userUid={props.userUid} />}
      {showAchives && "추후 업데이트 예정입니다"}
    </>
  );
};

export default MemoPage;
