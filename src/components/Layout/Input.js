import React, { useRef, useCallback, useState, useEffect } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const noteRef = useRef(null);
  const [value, setValue] = useState("");
  const [areaFix, setAreaFix] = useState("");

  useEffect(() => {
    setValue("");
  }, []);

  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue]);

  const maxRows = useCallback(() => {
    let limitRow = 25;
    if (props.fontSize === "40px") {
      limitRow = 9;
    } else if (props.fontSize === "50px") {
      limitRow = 8;
    } else if (props.fontSize === "60px") {
      limitRow = 7;
    } else if (props.fontSize === "70px") {
      limitRow = 6;
    } else if (props.fontSize === "80px") {
      limitRow = 5;
    }
    return +limitRow;
  }, []);

  const changeHandler = () => {
    setValue(noteRef.current.value);
  };

  useEffect(() => {
    if (props.showOn === true) {
      setAreaFix("1");
    } else if (props.showOn === false) {
      setAreaFix("0");
    } else {
      setAreaFix(props.showOn);
    }
  }, [props.showOn]);

  useEffect(() => {
    handleResizeHeight();
  }, [areaFix]);

  useEffect(() => {
    noteRef.current.style.height = props.startheight;
  }, [props.startheight]);

  //알림장용 로직..
  const rowAlert = () => {
    let limitRow = maxRows();
    let rows = noteRef.current.value.split("\n");
    let row_length = Math.ceil(
      (noteRef.current.clientWidth - 50) / (+props.fontSize.slice(0, 2) + 2)
    );
    let column_length = Math.ceil(
      (noteRef.current.clientHeight - 50) / (+props.fontSize.slice(0, 2) + 8)
    );
    // console.log(noteRef.current.value.length);
    // 칠판에 들어갈 전체 글자수. 가로 글자수 * 세로줄 글자수
    let maxLength = +Math.floor(row_length * column_length);

    // console.log(maxLength);
    //수정된 전체 줄수
    let fixed_rows = rows.length;

    //줄수 검증
    rows.forEach((text) => {
      let text_row = Math.floor(text.length / row_length);
      if (text_row > 1) {
        fixed_rows += text_row;
      }
    });

    //윈도우 세로에 들어갈 줄 엔터 과다
    if (fixed_rows > limitRow) {
      props.maxRowAlert("enter");
    } else if (noteRef.current.value.length > maxLength) {
      props.maxRowAlert("length");
    }
  };

  useEffect(() => {
    // console.log(props.fontSize);
    if (props.fontSize !== "" && props.fontSize !== undefined) {
      rowAlert();
    }
  }, [props.fontSize]);

  const handleResizeHeight = useCallback((e) => {
    if (noteRef === null || noteRef.current === null) {
      return;
    }

    if (props.alarm) {
      //스크롤을 가장 아래로 내리기..
      window.scrollTo(0, noteRef.current.scrollHeight);
      rowAlert();
      return;
    }
    noteRef.current.style.height = "10px";
    noteRef.current.style.height = noteRef.current.scrollHeight - 13 + "px";
  }, []);

  return (
    <>
      <label htmlFor={props.input.id}></label>
      {props.input.type === "textarea" ? (
        <textarea
          id={props.id}
          key={"textArea" + props.myKey}
          // key={"textArea" + props.myKey}
          ref={noteRef}
          {...props.input}
          className={classes[props.className]}
          onKeyDown={() => handleResizeHeight(this)}
          onKeyUp={() => handleResizeHeight(this)}
          onClick={() => handleResizeHeight(this)}
          value={value || ""}
          onInput={props.onInput}
          required={props.required ? true : false}
          onChange={changeHandler}
          placeholder={props.placeholder || ""}
        />
      ) : (
        <input
          key={props.myKey}
          id={props.input.id}
          type={props.input.type}
          required={props.required ? true : false}
          className={classes[props.className]}
          onInput={props.onInput}
          ref={noteRef}
          {...props.input}
          value={value || ""}
          onChange={changeHandler}
          placeholder={props.placeholder || ""}
        />
      )}
    </>
  );
});

export default Input;
