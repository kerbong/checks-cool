import React from "react";
import classes from "./Doit.module.css";

const DoMyList = (props) => {
  return (
    <div>
      <div className={classes["list-my"]}>
        <h1>내가 작성한 건의/불편사항</h1>
        <li className={classes["li-my"]}>
          <h3> 작성날짜 </h3>
          <h3> 제목 : 내용 </h3>
          <h3> 상태 </h3>
        </li>
        {props.lists?.map((list) => (
          <li key={list.id} className={classes["li-my"]}>
            <span>{list.id.slice(2, 10)} </span>
            <span>
              {list.title} : {list.text}
            </span>
            <span>
              {list.result === "0"
                ? "대기중"
                : list.result === "1"
                ? "확인중"
                : list.result === "2"
                ? "개발중"
                : "해결"}
            </span>
          </li>
        ))}
        {props.lists?.length === 0 && "* 자료가 없습니다."}
      </div>
    </div>
  );
};

export default DoMyList;
