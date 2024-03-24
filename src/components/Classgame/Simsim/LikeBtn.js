import React, { useEffect, useState } from "react";
import classes from "./LikeBtn.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

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
      {like ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default LikeBtn;
