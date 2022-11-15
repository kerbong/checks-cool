import React from "react";
import classes from "./Simsim.module.css";
import LikeBtn from "./LikeBtn";

const SimsimContent = (props) => {
  return (
    <div>
      {" "}
      {/* 이미지가 없는 글만 있는 자료의 경우 이미지 대신 insteadText(최대 100자)를 메인에 넣어줌 */}
      <div className={classes["image-div"]}>
        {props.nowOnSimsim?.image === "" ? (
          <div className={classes["insteadText-div"]}>
            {props.nowOnSimsim?.insteadText}
          </div>
        ) : (
          // 이미지있을 경우 넣어줌
          <img
            alt=""
            src={props.nowOnSimsim?.image}
            className={classes["previewImg"]}
          />
        )}
      </div>
      <div className={classes["user-like-div"]}>
        {/* 글쓴이 프로필이미지 */}
        <div className={classes["userImage-div"]}>
          <img className={classes["userImage-img"]} alt="" src={props.image} />
        </div>
        {/* 글쓴이정보 */}
        <div className={classes["user-div"]}>
          <div className={classes["nickName-div"]}>
            {props.nowOnSimsim?.nickName}
          </div>
          <div className={classes["stateMessage-div"]}>
            {props.nowOnSimsim?.stateMessage}
          </div>
        </div>
        {/* 좋아요 버튼 */}
        <div className={classes["like-div"]}>
          <LikeBtn
            like={props.like}
            changeLike={() => props.changeLikeHandler()}
          />
          <div>{props.nowOnSimsim?.like?.length}</div>
        </div>
      </div>
      {/* 설명텍스트란 최대 30자 */}
      <div className={classes["text-div"]}>
        <span className={classes["text-span"]}>
          {props.nowOnSimsim?.descText}
        </span>
      </div>
    </div>
  );
};

export default SimsimContent;
