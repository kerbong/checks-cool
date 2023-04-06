import React, { useRef, useCallback, useState, useEffect } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const noteRef = useRef(null);
  const [value, setValue] = useState("");
  const [areaFix, setAreaFix] = useState("");

  useEffect(() => {
    setValue("");
  }, []);

  // useEffect(
  //   (e) => {

  //   },
  //   [value]
  // );

  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue]);

  const maxRowsLength = () => {
    let limitRow;
    if (props.fontSize === "40px") {
      limitRow = "10-900";
    } else if (props.fontSize === "50px") {
      limitRow = "9-310";
    } else if (props.fontSize === "60px") {
      limitRow = "8-190";
    } else if (props.fontSize === "70px") {
      limitRow = "7-150";
    } else if (props.fontSize === "80px") {
      limitRow = "6-120";
    }
    if (/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)) {
      limitRow = "25-400";
    }

    return limitRow;
  };

  const changeHandler = (e) => {
    setValue(noteRef.current.value);
    if (props.getValue) {
      props.getValueHandler(noteRef.current.value, e.target);
    }
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
    // 이 설정 안해두면.. 모든 input도 css상관없이 작아짐;;
    if (props.input.type === "textarea") {
      handleResizeHeight();
    }
  }, [areaFix]);

  useEffect(() => {
    noteRef.current.style.height = props.startheight;
  }, [props.startheight]);

  //알림장용 로직..
  const rowAlert = () => {
    let limitRow = maxRowsLength()?.split("-")?.[0];
    let limitLength = maxRowsLength()?.split("-")?.[1];
    let rows = noteRef.current.value.split("\n");
    let row_length = Math.ceil(
      (noteRef.current.clientWidth - 50) / (+props.fontSize.slice(0, 2) + 2)
    );

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
    if (+fixed_rows > +limitRow) {
      props.maxRowAlert("enter");
    } else if (noteRef.current.value.length > +limitLength) {
      props.maxRowAlert("length");
    }
  };

  useEffect(() => {
    // console.log(props.fontSize);
    if (props.fontSize !== "" && props.fontSize !== undefined) {
      rowAlert();
    }
  }, [props.fontSize]);

  const handleResizeHeight = (e) => {
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
  };

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
