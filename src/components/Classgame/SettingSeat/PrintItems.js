import React, { useEffect } from "react";
import classes from "./SettingSeat.module.css";

const PrintItems = React.forwardRef((props, ref) => {
  useEffect(() => {
    let allDiv = document.getElementById(
      props.title?.length > 0 ? `items-${props.title}-div` : "items-div"
    );

    allDiv.style.setProperty("--columns", props.tableColumn);

    allDiv.style.setProperty("--rows", props.tableRow);
  }, []);

  return (
    <div ref={ref} className={classes[`items-all`]}>
      {/* 있으면 제목 적어주기 */}

      <div className={classes["print-title"]}>{props?.title}</div>

      {props.seeFromBack && (
        <div className={classes["blackboard-area"]}>
          <span className={classes["blackboard"]}>칠 판</span>
        </div>
      )}
      <div
        className={classes[`items-container`]}
        id={`${
          props.title?.length > 0 ? `items-${props.title}-div` : "items-div"
        }`}
      >
        {props.items}
      </div>

      {/* 교사용으로 앞에서 볼때면 칠판이 앞에 */}
      {!props.seeFromBack && (
        <div className={classes["blackboard-area"]}>
          <span className={classes["blackboard"]}>칠 판</span>
        </div>
      )}
    </div>
  );
});

export default PrintItems;
