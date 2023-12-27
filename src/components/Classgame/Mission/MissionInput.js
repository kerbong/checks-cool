import React, { useRef, useEffect, useState } from "react";
import classes from "./Mission.module.css";
import Button from "../../../components/Layout/Button";
import Swal from "sweetalert2";

const EXAM_TEXTS = [
  "최근 말썽인.. 너를 떠올리며,",
  "컨디션은 어떠세요?",
  "공유하고 싶은 아침의 사소한 행복이 있나요?",
  "믹스커피 딱 2잔만,",
  "우아하게 밥먹기",
  "우아하게 커피 내리고 시작하기",
  "선생님의 오늘을 응원합니다.",
  "거창할 거 없이, 소소하게-",
  "원피스를 찾을테다.",
  "어떤 상황에서도 당당하게!",
  "어떤 상황에서도 즐겁게~",
  "어떤 상황에서도 행복하게~",
  "칼퇴!!!!!!!",
  "조퇴!!!!!!!",
  "이것만은 오늘 꼭! 처리하고 말테다.",
  "넷플릭스 OOO시리즈를 기다리며",
  "OOO 본방사수하기",
  "오늘 가장 하기싫은 수업이 있을 때, 나만의 팁?",
  "쉬는 시간마다 스트레칭?!",
  "쉬는 시간에 미루지 않고 화장실 가기",
  "흐린눈과 더불어 눈감고 명상하기",
  "목이 건조하지 않게 물 많이 마시기",
  "등하교 할 때 계단으로...",
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
