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

  const changeHandler = (e) => {
    setValue(noteRef.current.value);
    if (props.getValue) {
      props.getValueHandler(e);
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

  const handleResizeHeight = (e) => {
    if (noteRef === null || noteRef.current === null) {
      return;
    }

    if (props.alarm) return;
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
