import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <>
      <label htmlFor={props.input.id}></label>
      <input ref={ref} {...props.input} className={props.className} />
    </>
  );
});

export default Input;
