import React, { useRef, useCallback } from "react";

const Input = React.forwardRef((props, ref) => {
  const noteRef = useRef(null);
  const handleResizeHeight = useCallback(() => {
    if (noteRef === null || noteRef.current === null) {
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
          ref={noteRef}
          {...props.input}
          className={props.className}
          onKeyDown={() => handleResizeHeight(this)}
          onKeyUp={() => handleResizeHeight(this)}
          onClick={() => handleResizeHeight(this)}
          onInput={props.onInput}
          required={props.required ? true : false}
          defaultValue={props.defaultValue}
        />
      ) : (
        <input
          type={props.input.type}
          required={props.required ? true : false}
          className={props.className}
          onInput={props.onInput}
          ref={ref}
          {...props.input}
        />
      )}
    </>
  );
});

export default Input;
