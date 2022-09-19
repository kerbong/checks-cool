import React from "react";
import Swal from "sweetalert2";
import classes from "./EventItem.module.css";
import Button from "../Layout/Button";

const EventItem = (props) => {
  let item = props.item;
  let keyId = props.keyId;
  let text = props.text;
  let note = props.note;
  let shownId = props.shownId;
  let option = props.option;

  const handleOnInput = (e, maxlength) => {
    if (e.target.value.length > maxlength) {
      e.target.value = e.target.value.substr(0, maxlength);
      Swal.fire({
        icon: "error",
        title: "입력 불가",
        text: "입력한 내용을 줄여주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
    }
  };

  return (
    <>
      <li
        key={keyId}
        id={keyId}
        className={classes["event-area"]}
        style={{
          backgroundColor: props.fixIsShown === shownId && "bisque",
        }}
      >
        <div
          id={`attendInfo-area${shownId}`}
          className={classes["attendInfo-area"]}
        >
          <h2 id={"eventName" + shownId}>😀 {text}</h2>
          <span
            id={`option-area${shownId}`}
            className={classes["option-area"]}
            style={{
              display: props.fixIsShown === shownId && "none",
            }}
          >
            {option} | {note && note}
          </span>
          <form
            id={`optionChange-area${shownId}`}
            className={classes["optionChange-area"]}
            style={{
              display: props.fixIsShown !== shownId && "none",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              props.saveFixedData(item);
            }}
          >
            <select
              name="option-selcet"
              id={`option-select${shownId}`}
              required
              defaultValue={option}
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
              placeholder="메모 / 비고 입력란"
              id={`option-note${shownId}`}
              defaultValue={note}
              className={classes["note-area"]}
              onInput={(e) => handleOnInput(e, 30)}
            />
          </form>
        </div>
        <div className={classes["button-area"]}>
          <Button
            className="small-student"
            name={
              props.fixIsShown !== shownId ? (
                <i className="fa-solid fa-pencil"></i>
              ) : (
                <i className="fa-regular fa-floppy-disk"></i>
              )
            }
            id={
              props.fixIsShown !== shownId
                ? `fix-btn${shownId}`
                : `save-btn${shownId}`
            }
            style={{ width: "30%", fontSize: "1.1em" }}
            onclick={
              props.fixIsShown !== shownId
                ? () => {
                    // props.setDefaultOptionValue(option);
                    props.setFixIsShown(shownId);
                    // console.log(option);
                  }
                : () => {
                    //수정한 것 저장하는 함수
                    props.saveFixedData(item);
                  }
            }
          />
          <Button
            className="small-student"
            name={
              props.fixIsShown !== shownId ? (
                <i className="fa-regular fa-trash-can"></i>
              ) : (
                <i className="fa-solid fa-xmark"></i>
              )
            }
            id={
              props.fixIsShown !== shownId
                ? `delete-btn${shownId}`
                : `cancle-btn${shownId}`
            }
            style={{ width: "30%", fontSize: "1.1em" }}
            onclick={
              props.fixIsShown !== shownId
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
    </>
  );
};

export default EventItem;
