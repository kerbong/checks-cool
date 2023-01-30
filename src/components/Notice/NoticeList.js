import React from "react";
import classes from "../Notice/NoticeList.module.css";

const NoticeList = (props) => {
  return (
    <div>
      <ul className={classes["notice-ul"]}>
        {props?.noticeDatas.map((notice) => (
          <li key={notice.id} id={notice.id} className={classes["notice-li"]}>
            <span
              className={classes["notice-title"]}
              dangerouslySetInnerHTML={{ __html: notice.title }}
            ></span>

            <hr style={{ margin: "15px" }} />
            <span
              className={classes["notice-text"]}
              dangerouslySetInnerHTML={{ __html: notice.text }}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeList;
