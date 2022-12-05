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
      Swal.fire({
        icon: "error",
        title: "작성 불가",
        text: "제목과 내용을 모두 입력해주세요!",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        showDenyButton: false,
        timer: 5000,
      });
      return false;
    }

    props.missionAddHandler(titleValue, textValue);
  };

  //자료 최대글자수 제한 함수
  const handleOnInput = (e, maxlength) => {
    if (e.target.value.length > maxlength) {
      e.target.value = e.target.value.substr(0, maxlength);
      Swal.fire({
        icon: "error",
        title: "입력 불가",
        text: `글자수를 초과했어요! 내용을 ${maxlength}자 이내로 줄여주세요.`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
    }
  };

  return (
    <>
      <form className={classes["reply-form"]} onSubmit={submitHandler}>
        <div className={classes["missionInput-div"]}>
          <div className={classes["inputGroup-div"]}>
            <span>제목</span>
            <input
              ref={titleRef}
              id="missionTitle-input"
              type="text"
              placeholder="하고 싶은 것"
              className={classes["replyTitle-input"]}
              onInput={(e) => handleOnInput(e, 20)}
            />
          </div>
          <div className={classes["inputGroup-div"]}>
            <span>내용</span>
            <input
              ref={textRef}
              id="missionText-input"
              type="text"
              placeholder="오늘 아침에 하고 싶은.."
              className={classes["replyText-input"]}
              onInput={(e) => handleOnInput(e, 50)}
            />
          </div>
        </div>

        <Button
          icon={<i className="fa-solid fa-circle-arrow-right"></i>}
          onclick={submitHandler}
          className={"replyAddBtn"}
        />
      </form>
      <span>*아침미션 옆 화살표로 규칙을 확인해보세요!</span>
    </>
  );
};

export default MissionInput;
