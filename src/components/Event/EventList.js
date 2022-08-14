import React from "react";

import classes from "./EventList.module.css";
import Button from "../Layout/Button";

const EventList = (props) => {
  return (
    <>
      {props.eventOnDay.map((item) => (
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
              {item.option.split("*d")[0]} |{" "}
              {item.option.split("*d")[1] && item.option.split("*d")[1]}
              {}
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
                name="attend-option"
                id={`option-select${item.student_num}`}
                required
              >
                <option value="">--출 결--</option>
                <option value="1현장체험">현장체험</option>
                <option value="2질병결석">질병결석</option>
                <option value="3가정학습">가정학습</option>
                <option value="4경조사">경조사</option>
                <option value="5기타결석">기타결석</option>
                <option value="6미인정">미인정</option>
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
              small="true"
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
              small="true"
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
                    }
              }
            />
          </div>
        </li>
      ))}
    </>
  );
};

export default EventList;
