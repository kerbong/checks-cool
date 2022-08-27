import React from "react";

import classes from "./EventItem.module.css";
import Button from "../Layout/Button";

const EventItem = (props) => {
  let item = props.item;

  return (
    <>
      <li
        key={item.id}
        id={item.id}
        className={classes["event-area"]}
        style={{
          backgroundColor: props.fixIsShown === item.student_num && "bisque",
        }}
      >
        <div
          id={`attendInfo-area${item.student_num}`}
          className={classes["attendInfo-area"]}
        >
          <h2 id={"name" + item.student_num}>{item.student_name}</h2>
          <span
            id={`option-area${item.student_num}`}
            className={classes["option-area"]}
            style={{
              display: props.fixIsShown === item.student_num && "none",
            }}
          >
            {item.option.slice(1)} | {item.note && item.note}
          </span>
          <form
            id={`optionChange-area${item.student_num}`}
            className={classes["optionChange-area"]}
            style={{
              display: props.fixIsShown !== item.student_num && "none",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              props.saveFixedData(item);
            }}
          >
            <select
              name="option-selcet"
              id={`option-select${item.student_num}`}
              required
              defaultValue={item.option}
            >
              <option value="" disabled>
                -- 분류 --
              </option>
              {props.selectOption.map((select_option) => (
                <option value={select_option.value} key={select_option.id}>
                  {select_option.class}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="비고를 입력하세요."
              id={`option-note${item.student_num}`}
            />
          </form>
        </div>
        <div className={classes["button-area"]}>
          <Button
            className="small-student"
            name={props.fixIsShown !== item.student_num ? "수정" : "저장"}
            id={
              props.fixIsShown !== item.student_num
                ? `fix-btn${item.student_num}`
                : `save-btn${item.student_num}`
            }
            style={{ width: "30%", fontSize: "1.1em" }}
            onclick={
              props.fixIsShown !== item.student_num
                ? () => {
                    props.setFixIsShown(item.student_num);
                  }
                : () => {
                    //수정한 것 저장하는 함수
                    props.saveFixedData(item);
                  }
            }
          />
          <Button
            className="small-student"
            name={props.fixIsShown !== item.student_num ? "삭제" : "취소"}
            id={
              props.fixIsShown !== item.student_num
                ? `delete-btn${item.student_num}`
                : `cancle-btn${item.student_num}`
            }
            style={{ width: "30%", fontSize: "1.1em" }}
            onclick={
              props.fixIsShown !== item.student_num
                ? function () {
                    props.removeCheckSwal(item);
                  }
                : function () {
                    props.setFixIsShown("0");
                    console.log(item.option);
                  }
            }
          />
        </div>
      </li>
    </>
  );
};

export default EventItem;
