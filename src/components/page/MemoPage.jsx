import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import MemoTodayTodo from "../Memo/MemoTodayTodo";
import ExampleModal from "./ExampleModal";
import TitleBtn from "../Memo/TitleBtn";
import BudgetManage from "../Memo/BudgetManage";

import FreeMemo from "components/Memo/FreeMemo";

const SHOW_WHAT = ["budgetManage", "todoList", "todayTodo", "freeMemo"];
const MENU_NAME = {
  budgetManage: "예산<br/>관리",
  todoList: "일정<br/>관리",
  todayTodo: "할일<br/>메모",
  freeMemo: "메모<br/>폴더",
};
const ICONS = {
  budgetManage: (
    <i
      className="fa-solid fa-money-check-dollar"
      style={{ fontSize: "1em" }}
    ></i>
  ),
  todoList: (
    <i className="fa-regular fa-calendar-check" style={{ fontSize: "1em" }}></i>
  ),
  todayTodo: (
    <i className="fa-solid fa-clipboard-list" style={{ fontSize: "1em" }}></i>
  ),
  freeMemo: (
    <i className="fa-regular fa-folder-open" style={{ fontSize: "1em" }}></i>
  ),
};

const MemoPage = (props) => {
  const { state } = useLocation();
  const [showWhatMemo, setShowWhatMemo] = useState("todayTodo");

  let navigate = useNavigate();
  useEffect(() => {
    if (state === null) return;
    setShowWhatMemo(state);
  }, [state]);

  const memoTitle = (showWhat) => {
    return MENU_NAME[showWhat];
  };

  return (
    <>
      <div id="title-div">
        <button id="title-btn">
          <>
            {ICONS[showWhatMemo]}&nbsp;
            {memoTitle(showWhatMemo)?.replace("<br/>", "") || ""}
          </>
        </button>
        <div id="title-func-btns">
          {/* 메뉴 선택하는 버튼들 */}
          {SHOW_WHAT?.map((what, index) => (
            <TitleBtn
              setShowWhatMemo={() => {
                setShowWhatMemo(what);
                if (what === "todoList") {
                  navigate(`/todo`);
                }
              }}
              key={what}
              icon={ICONS[what]}
              what={what}
              menu_name={MENU_NAME[what]}
            />
          ))}
        </div>
      </div>

      {showWhatMemo === SHOW_WHAT[0] && (
        <BudgetManage userUid={props.userUid} />
      )}

      {showWhatMemo === SHOW_WHAT[1] && ""}

      {showWhatMemo === SHOW_WHAT[2] && (
        <MemoTodayTodo userUid={props.userUid} />
      )}
      {showWhatMemo === SHOW_WHAT[3] && <FreeMemo userUid={props.userUid} />}
    </>
  );
};

export default MemoPage;
