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
      `글자수를 초과했어요! 내용을 줄여주세요.`,
      "warning"
    );
  }
};

const CategoryInput = (props) => {
  const [bgColor, setBgColor] = useState("#c0665b");
  const [fontColor, setFontColor] = useState("#F5F5F5");
  const [categoryName, setCategoryName] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (props.nowCategory) {
      setIsEdited(true);
      setBgColor(props.nowCategory.bgColor);
      setFontColor(props.nowCategory.fontColor);
      setCategoryName(props.nowCategory.name);
    }
  }, [props.nowCategory]);

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

  const saveCategoryHandler = () => {
    let new_item = {
      name: categoryName,
      bgColor: bgColor,
      fontColor: fontColor,
    };
    //수정일 경우.. beforeName추가함
    if (isEdited) {
      new_item.beforeName = props.nowCategory.name;
    }

    //만약 기존 자료 수정의 경우.. beforeName 존재함, 그럴 경우 기존의 데이터는 삭제하고
    let isExist = false;
    let beforeName = new_item.beforeName;
    let new_category = [];
    let newItem_index;
    if (beforeName) {
      props.category?.forEach((item, index) => {
        if (item.name !== beforeName) {
          new_category.push(item);
          if (item.name === new_item.name) {
            isExist = true;
          }
        } else {
          new_category.push(new_item);
          newItem_index = index;
        }
      });
    } else {
      props.category?.forEach((item) => {
        if (item.name === new_item.name) {
          isExist = true;
        } else {
          new_category.push(item);
        }
      });
      new_category.push(new_item);
      newItem_index = new_category.length - 1;
    }

    if (isExist) {
      Swal.fire(
        "이름 중복",
        `기존 자료에 동일한 이름의 태그가 존재합니다. 이름을 수정해주세요.`,
        "warning"
      );
      return;
    }

    setIsEdited(false);
    props.saveCategoryHandler(new_category, newItem_index);
    props.caInputClose();
  };

  return (
    <div className={classes["freeMemo-li"]}>
      <div style={{ width: "100%" }}>
        {!isEdited && (
          <button
            className={classes["exit-btn"]}
            onClick={() => {
              props.caInputClose();
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
        {!isEdited && <h2 className={classes["h2"]}>태그 추가</h2>}

        <h3>{!isEdited ? "태그 이름" : "태그 수정"}</h3>
        <div className={classes["h2"]}>
          <input
            id="title-input"
            className={classes["title-input"]}
            type="text"
            defaultValue={props.nowCategory?.name || ""}
            required
            onInput={(e) => handleOnInput(e, 20)}
            onChange={nameHandler}
            placeholder={"20자 내로 작성해주세요."}
          />
        </div>

        {/* 태그 배경색 컬러 */}
        <h3>태그 색상 선택</h3>
        <div style={{ margin: "-10px 0 10px 15px", fontSize: "16px" }}>
          {" "}
          * 흰색 배경은 피해주세요!
        </div>
        {/* 예시보여주는 div */}
        <div
          id="area1"
          className={classes["color-area"]}
          style={{ width: "98%" }}
        >
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

          {/* 태그 글자색 컬러 */}
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

      <button
        className={`${classes["color-area"]} ${classes["height"]}`}
        onClick={() => {
          saveCategoryHandler();
        }}
      >
        저장
      </button>

      {isEdited && (
        <>
          <button
            className={`${classes["color-area"]} ${classes["height"]}`}
            onClick={() => {
              props.caInputClose();
            }}
          >
            취소
          </button>
        </>
      )}
    </div>
  );
};

export default CategoryInput;
