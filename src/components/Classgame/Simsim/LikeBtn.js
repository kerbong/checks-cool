import React, { useState } from "react";
import classes from "./LikeBtn.module.css";

const LikeBtn = (props) => {
  const [canClick, setCanClick] = useState(true);

  return (
    <button
      className={classes["like-btn"]}
      onClick={() => {
        if (!canClick) {
          return;
        }
        setCanClick(false);
        setTimeout(() => {
          setCanClick(true);
        }, "4000");

        props.changeLike();
      }}
    >
      {props?.like ? (
        <i className="fa-solid fa-heart"></i>
      ) : (
        <i className="fa-regular fa-heart"></i>
      )}
    </button>
  );
};

export default LikeBtn;
