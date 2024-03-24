import React, { useState, useEffect } from "react";
import Modal from "../Layout/Modal";
import classes from "./ExampleModal.module.css";
import { FaRegCircleXmark } from "react-icons/fa6";

const ExampleModal = (props) => {
  const [isChecked, setIsChecked] = useState("");

  /** 메인 노티스 창 닫고, 로컬스토리지에 오늘 날짜 넣어두기, */
  useEffect(() => {
    if (isChecked === "") return;
    props.handleCheckboxChange(isChecked);
  }, [isChecked]);

  return (
    <Modal onClose={props.onClose} addStyle={props.addStyle}>
      <span onClick={props.onClose}>
        <FaRegCircleXmark className={classes.xmark} />
      </span>
      <div>{props.title}</div>
      <hr style={{ margin: "20px 15px" }} />

      <div className={classes["img-div"]}>
        {props.imgSrc && (
          <img src={props.imgSrc} className={classes.img} alt="exampleGif" />
        )}
      </div>
      <div>{props.text}</div>
      <div>{props.bottomText}</div>

      {props.closeToday && (
        <div className={classes["close-div"]}>
          <hr className={classes["close-hr"]} />
          <div className={classes["closeInput-div"]}>
            <label
              htmlFor="noShowToday"
              className={classes["close-today"]}
              onClick={() => setIsChecked("today")}
            >
              <input
                type="checkbox"
                id="noShowToday"
                checked={false}
                onChange={() => setIsChecked("today")}
                style={{ cursor: "pointer" }}
              />
              &nbsp;오늘 그만보기
            </label>
            <label
              htmlFor="noShowWeek"
              className={classes["close-today"]}
              onClick={() => setIsChecked("week")}
            >
              <input
                type="checkbox"
                id="noShowWeek"
                checked={false}
                onChange={() => setIsChecked("week")}
                style={{ cursor: "pointer" }}
              />
              &nbsp;5일 그만보기
            </label>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ExampleModal;
