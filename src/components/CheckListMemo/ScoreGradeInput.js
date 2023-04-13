import React, { useState, useEffect } from "react";
import classes from "./ListMemoInput.module.css";

import Swal from "sweetalert2";

const ScoreGradeInput = (props) => {
  const [inputCount, setInputCount] = useState(4);
  const [inputValues, setInputValues] = useState([
    "매우잘함",
    "잘함",
    "보통",
    "노력요함",
  ]);

  function addInput() {
    if (inputCount < 10) {
      setInputCount(inputCount + 1);
      setInputValues([...inputValues, ""]);
    }
  }

  function removeInput() {
    if (inputCount > 1) {
      setInputCount(inputCount - 1);
      setInputValues(inputValues.slice(0, -1));
    }
  }

  function handleInputChange(event, index) {
    const { value } = event.target;
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  }

  function handleSave() {
    if (inputValues?.filter((val) => val.trim() === "")?.length > 0) {
      Swal.fire(
        "저장 실패",
        "비어있는 칸이 없도록 평가단계를 입력하시거나 입력창을 삭제해주세요.",
        "warning"
      );
      return;
    }
    localStorage.setItem("scoreGrade", JSON.stringify(inputValues));
    props.scoreGradeValue(inputValues);
    props.closeHandler();
  }

  const inputFields = [];

  useEffect(() => {
    const storedInputValues = localStorage.getItem("scoreGrade");
    if (storedInputValues) {
      setInputValues(JSON.parse(storedInputValues));
      setInputCount(JSON.parse(storedInputValues).length);
    }
  }, []);

  //인풋창 만들기
  for (let i = 0; i < inputCount; i++) {
    inputFields.push(
      <input
        key={i}
        type="text"
        value={inputValues[i]}
        onChange={(event) => handleInputChange(event, i)}
        className={classes["grade-input"]}
      />
    );
  }

  return (
    <div>
      <span
        className={classes.closeBtn}
        onClick={props.closeHandler}
        style={{ width: "4%" }}
      >
        <i className="fa-regular fa-circle-xmark"></i>
      </span>
      <div className={classes["grade-section"]}>
        <h2>평가 단계 설정하기</h2>
        <div>
          *설정하신 평가단계를 개별기록에서 활용하실 수 있어요!
          <br />
          *평가 단계는 접속한 브라우저, 기기에만 저장됩니다. 다른 브라우저,
          기기로 접속하신 경우 다시 입력, 저장해주세요.
        </div>
        <div className={classes["btns-div"]}>
          <div>
            <button onClick={addInput} className={classes["scoreBtn"]}>
              +
            </button>
            <button onClick={removeInput} className={classes["scoreBtn"]}>
              -
            </button>
          </div>
          <button onClick={handleSave} className={classes["scoreBtn"]}>
            Save
          </button>
        </div>
      </div>
      <div className={classes["inputs-div"]}>{inputFields}</div>
    </div>
  );
};

export default ScoreGradeInput;
