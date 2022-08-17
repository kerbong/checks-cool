import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <>
      <label htmlFor={props.input.id}></label>
      <textarea
        ref={ref}
        {...props.input}
        className={props.className}
        onKeyDown={props.onKeyDown}
        onKeyUp={props.onKeyDown}
      />
    </>
  );
});

export default Input;
