import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <>
      <label htmlFor={props.input.id}></label>
      {props.input.type ? (
        <input
          type={props.input.type}
          required={props.required ? true : false}
          className={props.className}
          ref={ref}
          {...props.input}
        />
      ) : (
        <textarea
          ref={ref}
          {...props.input}
          className={props.className}
          onKeyDown={props.onKeyDown}
          onKeyUp={props.onKeyDown}
          required={props.required ? true : false}
        />
      )}
    </>
  );
});

export default Input;
