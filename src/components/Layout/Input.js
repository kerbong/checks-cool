import React, { useRef, useCallback, useState, useEffect } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const [value, setValue] = useState(props.defaultValue || "");
  const noteRef = useRef(null);

  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue]);

  const handleResizeHeight = useCallback(() => {
    if (noteRef === null || noteRef.current === null) {
      return;
    }

    noteRef.current.style.height = "10px";
    noteRef.current.style.height = noteRef.current.scrollHeight - 13 + "px";
  }, []);
  const changeHandler = () => {
    setValue(noteRef.current.value);
  };

  return (
    <>
      <label htmlFor={props.input.id}></label>
      {props.input.type === "textarea" ? (
        <textarea
          id={props.id}
          key={"textArea" + props.myKey}
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
