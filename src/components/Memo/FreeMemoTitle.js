import React, { useState, useEffect } from "react";
import classes from "./FreeMemo.module.css";

import Swal from "sweetalert2";

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

const FreeMemoTitle = ({ edited, itemTitle, titleChangeHandler }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (itemTitle) {
      setTitle(itemTitle);
      console.log(itemTitle);
    }
  }, [itemTitle]);

  const titleHandler = (e) => {
    setTitle(e.target.value);
    titleChangeHandler(e.target.value);
  };

  return edited ? (
    <>
      <span>제목</span>
      <input
        id="title-input"
        className={classes["title-input"]}
        type="text"
        required
        value={title}
        onInput={(e) => handleOnInput(e, 30)}
        onChange={titleHandler}
        placeholder={"30자 내로 작성해주세요."}
      />
    </>
  ) : (
    <h3 style={{ margin: 0 }}>{title}</h3>
  );
};

export default FreeMemoTitle;
