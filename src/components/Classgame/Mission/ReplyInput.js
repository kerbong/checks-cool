import React, { useRef } from "react";
import classes from "./Mission.module.css";
import Button from "../../../components/Layout/Button";

const ReplyInput = (props) => {
  const replyRef = useRef();
  return (
    <form
      className={classes["reply-form"]}
      onSubmit={(e) => {
        e.preventDefault();
        props.replyAddHandler(replyRef.current.value);
      }}
    >
      <input
        ref={replyRef}
        id="replyText-input"
        type="text"
        placeholder="댓글을 입력하세요."
        className={classes["reply-input"]}
        defaultValue={props.existText || ""}
      />
      {!props.editting && (
        <Button
          icon={<i className="fa-solid fa-circle-arrow-right"></i>}
          onclick={() => {
            let value = replyRef.current.value;
            if (value.trim() === "") {
              return false;
            }
            props.replyAddHandler(value);
          }}
          className={"replyAddBtn"}
        />
      )}
    </form>
  );
};

export default ReplyInput;
