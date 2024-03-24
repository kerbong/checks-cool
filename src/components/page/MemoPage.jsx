import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import MemoTodayTodo from "../Memo/MemoTodayTodo";
import ExampleModal from "./ExampleModal";
import TitleBtn from "../Memo/TitleBtn";
import BudgetManage from "../Memo/BudgetManage";

import FreeMemo from "components/Memo/FreeMemo";
import {
  FaClipboardList,
  FaMoneyCheckDollar,
  FaRegCalendarCheck,
  FaRegFolderOpen,
} from "react-icons/fa6";

const SHOW_WHAT = ["budgetManage", "todoList", "todayTodo", "freeMemo"];
const MENU_NAME = {
  budgetManage: "예산<br/>관리",
  todoList: "일정<br/>관리",
  todayTodo: "할일<br/>메모",
  freeMemo: "메모<br/>폴더",
};
const ICONS = {
  budgetManage: <FaMoneyCheckDollar />,
  todoList: <FaRegCalendarCheck />,
  todayTodo: <FaClipboardList />,
  freeMemo: <FaRegFolderOpen />,
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

  useEffect(() => {
    if (props.isClub === "" || props.isClub === "main") return;
    //동아리 버전 사용에서는.. 초기화면으로 보내기!
    navigate("/");
  }, [props.isClub]);

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
