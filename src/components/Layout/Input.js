import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <>
      <label htmlFor={props.input.id}></label>
      {props.input.type === "textarea" ? (
        <textarea
          style={props.style}
          ref={ref}
          {...props.input}
          className={props.className}
          onKeyDown={props.onKeyDown}
          onKeyUp={props.onKeyDown}
          onInput={props.onInput}
          required={props.required ? true : false}
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
