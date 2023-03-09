import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import classes from "./FreeMemo.module.css";
import Button from "components/Layout/Button";

//자료 최대글자수 제한 함수
const handleOnInput = (e, maxlength) => {
  if (e.target.value.length > maxlength) {
    e.target.value = e.target.value.substr(0, maxlength);
    Swal.fire(
      "입력 불가",
      `글자수를 초과했어요! 내용을 ${maxlength}자 이내로 줄여주세요.`,
      "warning"
    );
  }
};

const CategoryInput = (props) => {
  const [bgColor, setBgColor] = useState("#c0665b");
  const [fontColor, setFontColor] = useState("#F5F5F5");
  const [categoryName, setCategoryName] = useState("");

  const bgColorChange = (e) => {
    setBgColor(e.target.value);
  };

  useEffect(() => {
    document.getElementById("area1").style.backgroundColor = bgColor;
  }, [bgColor]);

  const fontColorChange = (e) => {
    setFontColor(e.target.value);
  };

  useEffect(() => {
    document.getElementById("area1").style.color = fontColor;
  }, [fontColor]);

  const nameHandler = (e) => {
    setCategoryName(e.target.value);
  };

  return (
    <>
      <div>
        <div>
          <button
            className={classes["exit-btn"]}
            onClick={() => {
              props.caInputClose();
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          {/* 카테고리 배경색 컬러 */}
          <h2>카테고리 색상 선택</h2>
          {/* 예시보여주는 div */}
          <div id="area1" className={classes["color-area"]}>
            {categoryName}
          </div>
          <div className={classes["color-inputs"]}>
            <div>
              <span className={classes["color-span"]}>배경색</span>
              <input
                id="color"
                className={classes["color-input"]}
                type="color"
                value={bgColor || ""}
                onChange={bgColorChange}
              />
            </div>

            {/* 카테고리 글자색 컬러 */}
            <div>
              <span className={classes["color-span"]}>글자색</span>
              <input
                id="color2"
                className={classes["color-input"]}
                type="color"
                value={fontColor || ""}
                onChange={fontColorChange}
              />
            </div>
          </div>
        </div>
        <br />
        <h2>카테고리 이름</h2>
        <input
          id="title-input"
          className={classes["title-input"]}
          type="text"
          required
          onInput={(e) => handleOnInput(e, 15)}
          onChange={nameHandler}
          placeholder={"15자 내로 작성해주세요."}
        />
      </div>
      <br />
      <button
        className={`${classes["color-area"]} ${classes["height"]}`}
        onclick={() => {}}
      >
        저장
      </button>
    </>
  );
};

export default CategoryInput;
