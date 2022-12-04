import React, { useRef } from "react";
import classes from "./Mission.module.css";
import Button from "../../../components/Layout/Button";
import Swal from "sweetalert2";

const MissionInput = (props) => {
  const titleRef = useRef();
  const textRef = useRef();

  //미션 추가 핸들러
  const submitHandler = (e) => {
    e.preventDefault();
    let titleValue = titleRef.current.value;
    let textValue = textRef.current.value;
    //빈칸이면 저장 불가
    if (titleValue.trim() === "" || textValue.trim() === "") {
      return false;
    }

    props.missionAddHandler(titleValue, textValue);
  };

  return (
    <>
      <form className={classes["reply-form"]} onSubmit={submitHandler}>
        <div className={classes["missionInput-div"]}>
          <input
            ref={titleRef}
            id="missionTitle-input"
            type="text"
            placeholder="미션 제목(이거!)"
            className={classes["reply-input"]}
          />
          <input
            ref={textRef}
            id="missionText-input"
            type="text"
            placeholder="미션 내용(이걸 해보는 게 어떨까?)"
            className={classes["reply-input"]}
          />
        </div>

        <Button
          icon={<i className="fa-solid fa-circle-arrow-right"></i>}
          onclick={submitHandler}
          className={"replyAddBtn"}
        />
      </form>
      <span>* 수정, 삭제가 불가능해요! (내일은 새롭게 저장 가능)</span>
    </>
  );
};

export default MissionInput;
