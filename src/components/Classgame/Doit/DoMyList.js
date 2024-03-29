import React from "react";
import classes from "./Doit.module.css";

const DoMyList = (props) => {
  return (
    <div>
      <div className={classes["list-my"]}>
        <h1 style={{ fontSize: "1.8rem" }}>내가 작성한 건의/불편사항</h1>
        <li className={classes["li-my"]}>
          <h3> 작성날짜 </h3>
          <h3> 제목 : 내용 </h3>
          <h3> 상태 </h3>

          {props.lists?.map((list) => (
            <li key={list.id} className={classes["li"]}>
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
                  : list.result === "3"
                  ? "해결"
                  : "메일전송"}
              </span>
            </li>
          ))}
          {props.lists?.length === 0 && (
            <span style={{ gridColumn: "1/4" }}>* 자료가 없습니다.</span>
          )}
        </li>
      </div>
    </div>
  );
};

export default DoMyList;
