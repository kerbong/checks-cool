import React from "react";
import classes from "./Doit.module.css";

const DoingList = (props) => {
  return (
    <div className={classes["list"]}>
      <h1>해결 중인 요청들🛠️</h1>

      <li className={classes["li"]}>
        <h3> (닉네임) 제목 : 내용 </h3>
        <h3> 해결상태 </h3>
      </li>
      {props.lists?.map((list) => (
        <li key={list.id + list.title} className={classes["li"]}>
          <span>
            ({list.nickName}) {list.title} : {list.text}
          </span>
          <span>
            {list.result === "0"
              ? "대기중"
              : list.result === "1"
              ? "확인중"
              : list.result === "2"
              ? "개발중"
              : list.result === "3"
              ? "해결"
              : "메일전송"}
          </span>
        </li>
      ))}
      {props.lists?.length === 0 &&
        "* 최근 2달 내에 건의/불편사항 자료가 없습니다."}
    </div>
  );
};

export default DoingList;
