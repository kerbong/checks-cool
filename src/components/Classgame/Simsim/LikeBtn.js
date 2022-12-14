import React, { useEffect, useState } from "react";
import classes from "./LikeBtn.module.css";

const LikeBtn = (props) => {
  const [canClick, setCanClick] = useState(true);
  const [like, setLike] = useState(props.like || false);

  useEffect(() => {
    setLike(props.like);
  }, [props?.like]);

  return (
    <button
      className={classes["like-btn"]}
      onClick={() => {
        if (!props.likeNonClick) {
          if (!canClick) {
            return;
          }
          setCanClick(false);
          setTimeout(() => {
            setCanClick(true);
          }, "4000");

          props.changeLike();
        }
      }}
    >
      {like ? (
        <i className="fa-solid fa-heart"></i>
      ) : (
        <i className="fa-regular fa-heart"></i>
      )}
    </button>
  );
};

export default LikeBtn;
