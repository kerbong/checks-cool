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
    let limitRow = 9;
    if (props.fontSize === "50px") {
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

  useEffect(() => {}, [props.fontSizePx]);

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

  const changeHandler = () => {
    setValue(noteRef.current.value);
  };

  useEffect(() => {
    if (noteRef.current !== null) {
      if (props.placeholder || props.defaultValue) {
        noteRef.current.style.height = noteRef.current.scrollHeight - 13 + "px";
      }
    }
  }, [areaFix]);

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
    noteRef.current.style.height = props.startheight;
  }, [props.startheight]);

  const rowAlert = () => {
    let limitRow = maxRows();
    let rows = noteRef.current.value.split("\n");
    //윈도우 세로에 들어갈 줄 엔터 과다
    if (rows.length > limitRow) {
      props.maxRowAlert("enter");
    }
    // 윈도우 가로에 들어갈 글자수 과다
    if (
      noteRef.current.clientWidth / +props.fontSize.slice(0, 2) <
      rows[rows.length - 1].length
    ) {
      props.maxRowAlert("width");
    }
  };

  useEffect(() => {
    if (props.fontSize !== "" && props.fontSize !== undefined) {
      rowAlert();
    }
  }, [props.fontSize]);

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
