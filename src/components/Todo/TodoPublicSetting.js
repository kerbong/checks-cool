import React from "react";
import Modal from "../Layout/Modal";
import TodoPublicInput from "./TodoPublicInput";
import classes from "./TodoPublicInput.module.css";
import { FaRegCircleXmark } from "react-icons/fa6";

const TodoPublicSetting = (props) => {
  return (
    <>
      <Modal onClose={props.showPublicSetting}>
        {props.publicRoom ? (
          <>
            <span
              className={classes.closeBtn}
              onClick={props.showPublicSetting}
            >
              <FaRegCircleXmark />
            </span>
            <h2 className={classes["header-area"]}>현재 접속된 공용정보</h2>
            <p className={classes["existed-area"]}>
              <span className={classes["span"]}>
                학교명 : {props.publicRoom.split("-")[0]}
              </span>

              <span className={classes["span"]}>
                학년 : {props.publicRoom.split("-")[1]}
              </span>

              <span className={classes["span"]}>
                비밀번호 : {props.publicRoom.split("-")[2]}
              </span>
            </p>
            <span className={classes["existed-area"]}>
              *입력한 정보를 잊지않도록 주의해주세요!
            </span>
          </>
        ) : (
          <h2 className={classes["header-area"]}>저장된 자료가 없어요.</h2>
        )}
        <hr />
        <TodoPublicInput setPublicRoom={(data) => props.setPublicRoom(data)} />
      </Modal>
    </>
  );
};

export default TodoPublicSetting;
