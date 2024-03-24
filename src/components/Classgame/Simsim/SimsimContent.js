import React from "react";
import classes from "./Simsim.module.css";
import LikeBtn from "./LikeBtn";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const SimsimContent = (props) => {
  return (
    <div>
      {" "}
      {/* 이미지가 없는 글만 있는 자료의 경우 이미지 대신 insteadText(최대 100자)를 메인에 넣어줌 */}
      <div className={classes["image-div"]}>
        <div onClick={() => props.prev()} title="이전">
          <FaChevronLeft className={classes["image-prev"]} />
        </div>

        {props.nowOnRecommend && props.nowOnRecommend?.image === "" && (
          <div className={classes["insteadText-div"]}>
            {props.nowOnRecommend?.insteadText}
          </div>
        )}
        {props.nowOnRecommend && props.nowOnRecommend?.image !== "" && (
          // 이미지있을 경우 넣어줌
          <img
            alt=""
            src={props.nowOnRecommend?.image}
            className={classes["previewImg"]}
          />
        )}

        {/* 아직 자료가 없을 경우 */}
        {!props.nowOnRecommend && (
          <>
            아직 이번달 자료가 없어요! <br /> <br /> 글을 작성해주세요!
          </>
        )}

        <div onClick={() => props.next()} title="다음">
          <FaChevronRight className={classes["image-next"]} />
        </div>
      </div>
      <div className={classes["user-like-div"]}>
        {/* 글쓴이 프로필이미지 */}
        <div className={classes["userImage-div"]}>
          <img className={classes["userImage-img"]} alt="" src={props.image} />
        </div>
        {/* 글쓴이정보 */}
        <div
          className={classes["user-div"]}
          style={{ width: "calc(100% - 80px)" }}
        >
          <div className={classes["nickName-div"]}>
            {props.nowOnRecommend?.nickName}
            {!props.nowOnRecommend && "저기요!"}
          </div>
          <div className={classes["stateMessage-div"]} style={{ width: "75%" }}>
            {props.nowOnRecommend?.stateMessage}
            {!props.nowOnRecommend && "거기 누구 계신가요??"}
          </div>
        </div>
        {/* 좋아요 버튼 */}
        <div className={classes["like-div"]}>
          <LikeBtn
            like={props.nowOnRecommend && props.like}
            changeLike={() => props.nowOnRecommend && props.changeLikeHandler()}
          />
          <div>{props.nowOnRecommend?.like?.length}</div>
        </div>
      </div>
      {/* 설명텍스트란 최대 30자 */}
      <div className={classes["text-div"]}>
        <span className={classes["text-span"]}>
          {props.nowOnRecommend?.descText}
        </span>
      </div>
    </div>
  );
};

export default SimsimContent;
