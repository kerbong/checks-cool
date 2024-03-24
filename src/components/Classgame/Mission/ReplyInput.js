import React, { useRef, useState } from "react";
import classes from "./Mission.module.css";
import Button from "../../../components/Layout/Button";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaPenToSquare, FaRegCircleXmark, FaTrash } from "react-icons/fa6";

const ReplyInput = (props) => {
  const [isEditting, setIsEditting] = useState(false);
  const replyRef = useRef();

  return (
    <>
      {props.isBase && (
        <form
          className={classes["reply-form"]}
          onSubmit={(e) => {
            e.preventDefault();
            let value = replyRef.current.value;
            if (value.trim() === "") {
              return false;
            }
            props.replyAddHandler(value, "add", props.reply);
          }}
        >
          <input
            ref={replyRef}
            id="replyText-input"
            type="text"
            placeholder="댓글을 입력하세요."
            className={classes["reply-input"]}
            defaultValue={props?.reply?.text || ""}
          />

          <Button
            icon={<FaArrowAltCircleRight />}
            onclick={() => {
              let value = replyRef.current.value;
              if (value.trim() === "") {
                return false;
              }
              props.replyAddHandler(value, "add", props.reply);
            }}
            className={"replyAddBtn"}
          />
        </form>
      )}
      {!props.isBase && (
        <>
          {!isEditting ? (
            <div className={classes["flex-between"]}>
              <div>
                <span className={classes["reply-nickName"]}>
                  {props.reply.nickName}
                </span>
                <span className={classes["reply-text"]}>
                  {props.reply.text}
                </span>
              </div>
              {/* 내가 작성한 댓글이면 수정, 삭제버튼 보이기 */}
              {props.reply.writtenId === props.userUid && (
                <div className={classes["replyBtn-div"]}>
                  <Button
                    className="missionEditBtn"
                    onclick={() => {
                      setIsEditting(true);
                    }}
                    icon={<FaPenToSquare />}
                  />
                  <Button
                    className="missionEditBtn"
                    onclick={() => {
                      //삭제버튼 기능
                      props.replyAddHandler("none", "delete", props.reply);
                    }}
                    icon={<FaTrash />}
                  />
                </div>
              )}
            </div>
          ) : (
            <form
              className={classes["reply-form"]}
              onSubmit={(e) => {
                e.preventDefault();
                let value = replyRef.current.value;
                if (value.trim() === "") {
                  return false;
                }
                props.replyAddHandler(value, "update", props.reply);
              }}
            >
              <input
                ref={replyRef}
                id="replyText-input"
                type="text"
                placeholder="댓글을 입력하세요."
                className={classes["reply-input"]}
                defaultValue={props.reply.text || ""}
              />

              <>
                {/* 내가 작성한 댓글이면 수정, 삭제버튼 보이기 */}
                {props.reply.writtenId === props.userUid && (
                  <div className={classes["replyBtn-div"]}>
                    <Button
                      className="missionEditBtn"
                      onclick={(e) => {
                        e.preventDefault();
                        //저장하고 수정화면끝
                        let value = replyRef.current.value;
                        if (value === "") return;

                        props.replyAddHandler(value, "update", props.reply);
                        setIsEditting(false);
                      }}
                      icon={<FaArrowAltCircleRight />}
                    />
                    <Button
                      className="missionEditBtn"
                      onclick={(e) => {
                        e.preventDefault();
                        //취소버튼 기능
                        setIsEditting(false);
                      }}
                      icon={<FaRegCircleXmark />}
                    />
                  </div>
                )}
              </>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default ReplyInput;
