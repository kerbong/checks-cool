import React, { useState, useEffect } from "react";
import FileArea from "../../Layout/FileArea";
import classes from "./SimsimAdd.module.css";
import Input from "../../Layout/Input";
import Swal from "sweetalert2";
import Button from "../../Layout/Button";

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

const SimsimAdd = (props) => {
  const [attachedFile, setAttachedFile] = useState("");
  const [addImage, setAddImage] = useState(true);
  const [randomNum, setRandomNum] = useState(true);

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * EXAM_TEXTS.length));
  }, []);

  const errorSwal = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });
  };

  //자료 최대글자수 제한 함수
  const handleOnInput = (e, maxlength) => {
    if (e.target.value.length > maxlength) {
      e.target.value = e.target.value.substr(0, maxlength);
      errorSwal(
        "입력 불가",
        `글자수를 초과했어요! 내용을 ${maxlength}자 이내로 줄여주세요.`
      );
    }
  };

  //저장하면...
  const submitHandler = (e) => {
    e.preventDefault();
    //메인내용 확인
    let mainTextImg;
    if (addImage) {
      mainTextImg = attachedFile;
    } else {
      mainTextImg = document.getElementById("insteadText-input").value;
    }

    if (mainTextImg.trim().length === 0) {
      errorSwal("저장 실패", "메인 텍스트/이미지를 등록해주세요!");
      return;
    }

    //추가 설명 내용 확인
    let descText = document.getElementById("descText-input").value;
    if (descText.trim().length === 0) {
      errorSwal("저장 실패", "추가 설명을 등록해주세요!");
      return;
    }

    props.addSimsimHandler(attachedFile);
  };

  return (
    <>
      <p className={classes["title-p"]}> {EXAM_TEXTS[randomNum]}😄 </p>
      <form>
        <div className={classes["image-div"]}>
          <div className={classes["imageTitle-div"]}>
            <p className={classes["title-p"]}> 메인 </p>
            <button
              className={classes["ImgTextChange-btn"]}
              onClick={(e) => {
                e.preventDefault();
                setAddImage((prev) => !prev);
                setAttachedFile("");
              }}
            >
              <span className={classes["addImage-span"]}>
                {addImage ? "toText" : "toImage"}
              </span>

              <i className="fa-solid fa-arrows-rotate"></i>
            </button>
          </div>
          <div>
            {addImage ? (
              <FileArea
                about={props.about}
                attachedFileHandler={(file) => {
                  setAttachedFile(file);
                }}
              />
            ) : (
              <Input
                id={`insteadText-input`}
                myKey={"insteadText-input"}
                className={`simsim-Text`}
                label="insteadText"
                input={{
                  type: "textarea",
                }}
                onInput={(e) => handleOnInput(e, 100)}
                required
                placeholder="100자 이내로 작성해주세요."
              />
            )}
          </div>
        </div>

        <div className={classes["descText-div"]}>
          <p className={classes["title-p"]}> 추가설명 </p>
          <Input
            input={{ id: "descText-input" }}
            className={"simsim-Text"}
            type="text"
            required
            onInput={(e) => handleOnInput(e, 30)}
            placeholder={"30자 이내로 작성해주세요."}
          />
        </div>
        <div className={classes["saveSimsim-div"]}>
          <Button
            className={"saveSimsim-btn"}
            onclick={submitHandler}
            icon={<>저장</>}
          />
        </div>
      </form>
    </>
  );
};

export default SimsimAdd;
