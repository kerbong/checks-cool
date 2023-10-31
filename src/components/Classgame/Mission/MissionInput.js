import React, { useRef, useEffect, useState } from "react";
import classes from "./Mission.module.css";
import Button from "../../../components/Layout/Button";
import Swal from "sweetalert2";

const EXAM_TEXTS = [
  "오늘 따라 말썽인 친구가 있나요?",
  "컨디션은 어떠세요?",
  "교실과 화장실의 거리는 얼마나 되시나요?",
  "점심시간은 충분하신가요?",
  "아침은 드셨나요? 드셨다면 메뉴는? / 먹고싶었던 메뉴는?",
  "오늘 급식표는 확인하셨나요?",
  "오늘 가장 힘든 수업은?",
  "오늘 가장 기대되는 수업은?",
  "오늘 가장 하기싫은 수업은?",
  "학교에서 심심할 때는 무얼하시나요?",
  "오늘 저녁 메뉴는 정하셨나요?",
  "이번 쉬는시간에는 무얼하셨어요?",
  "신발 사이즈가 어떻게 되세요?",
  "몇교시가 가장 좋으세요?",
  "몇교시가 가장 싫으세요?",
  "아침시간에는 무얼하세요?",
  "출근 후 루틴이 있으신가요?",
  "출근 길은 괜찮으셨나요?",
  "최근 꽂혀있는 음악은?",
  "쉬는시간에 음악 틀어주시나요?",
  "퇴근하고 싶다는 생각이 간절한 때는?",
  "손이 크신 편인가요?",
  "손금 잘 보시나요?",
  "지갑을 들고다니시나요?",
  "자주 사용하는 카드는?",
];

const MissionInput = (props) => {
  const [randomNum, setRandomNum] = useState(true);

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * EXAM_TEXTS.length));
  }, []);

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
              placeholder=""
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
              placeholder={EXAM_TEXTS[randomNum]}
              className={classes["replyText-input"]}
              onInput={(e) => handleOnInput(e, 50)}
            />
          </div>
        </div>

        <Button
          name=" 작성"
          icon={<i className="fa-solid fa-circle-arrow-right"></i>}
          onclick={submitHandler}
          className={"replyAddBtn"}
        />
      </form>
    </>
  );
};

export default MissionInput;
