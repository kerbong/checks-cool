import React from "react";
import classes from "./Doit.module.css";

const DoingList = (props) => {
  return (
    <div className={classes["list"]}>
      <h1 style={{ fontSize: "1.8rem" }}>해결 중인 요청들 🛠️</h1>
      <h4>* 최근 두 달 요청한 불편, 건의 사항들 입니다.</h4>
      {/* <hr style={{ margin: "15px" }} /> */}
      <li className={classes["li-title"]} style={{ margin: "-25px 0" }}>
        <h3> (닉네임) 제목 - 내용 </h3>
        <h3> 상태 </h3>
      </li>
      <hr style={{ margin: "15px" }} />
      {props.lists?.map((list) => (
        <li key={list.id + list.title} className={classes["li"]}>
          <span>
            ({list.nickName}) {list.title}
            <br />
            <span>- {list.text}</span>
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
