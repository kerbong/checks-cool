import CheckLists from "components/Memo/CheckLists";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import MemoTodayTodo from "../Memo/MemoTodayTodo";
import ExampleModal from "./ExampleModal";
import TitleBtn from "../Memo/TitleBtn";
import BudgetManage from "../Memo/BudgetManage";

import submitMemo from "../../assets/memo/submitMemo.gif";
import todayTodo from "../../assets/memo/todayTodo.gif";
import listMemo from "../../assets/memo/listMemo.gif";

const SHOW_WHAT = ["checkLists", "listMemo", "todayTodo", "budgetManage"];
const MENU_NAME = {
  checkLists: "제출<br/>ox",
  listMemo: "개별<br/>기록",
  todayTodo: "할일<br/>목록",
  budgetManage: "예산<br/>관리",
};
const ICONS = [
  <i className="fa-regular fa-square-check"></i>,
  <i className="fa-solid fa-clipboard-check"></i>,
  <i className="fa-solid fa-clipboard-list"></i>,
  <i className="fa-solid fa-money-check-dollar"></i>,
];

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

  const memoTitle = (showWhat) => {
    return MENU_NAME[showWhat];
  };

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
              : showWhatMemo === SHOW_WHAT[2]
              ? todayTodo
              : ""
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
                === {memoTitle(showWhatMemo)?.replace("<br/>", "") || ""} 예시
                ===
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
            <i className="fa-regular fa-square-check"></i>{" "}
            {memoTitle(showWhatMemo)?.replace("<br/>", "") || ""}
          </>
        </button>
        <div
          style={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            width: "190px",
            justifyContent: "flex-end",
            lineHeight: "20px",
            fontSize: "0.9rem",
          }}
        >
          {/* 메뉴 선택하는 버튼들 */}
          {SHOW_WHAT.map((what, index) => (
            <TitleBtn
              setShowWhatMemo={() => {
                setShowWhatMemo(what);
              }}
              key={what}
              icon={ICONS[index]}
              what={what}
              menu_name={MENU_NAME[what]}
            />
          ))}
        </div>
      </div>

      {showWhatMemo === SHOW_WHAT[0] && (
        <CheckLists
          students={props.students}
          userUid={props.userUid}
          about="checkLists"
          isSubject={props.isSubject}
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
          isSubject={props.isSubject}
        />
      )}
      {showWhatMemo === SHOW_WHAT[3] && (
        <BudgetManage userUid={props.userUid} />
      )}
    </>
  );
};

export default MemoPage;
