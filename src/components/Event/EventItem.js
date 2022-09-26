import React, { useState } from "react";
import Swal from "sweetalert2";
import classes from "./EventItem.module.css";
import Button from "../Layout/Button";
import AttendCalendar from "../Attendance/AttendCalendar";

const EventItem = (props) => {
  let item = props.item;
  let keyId = props.keyId;
  let text = props.text;
  let note = props.note;
  let shownId = props.shownId;
  let option = props.option;

  const [eventId, setEventId] = useState(keyId);

  const getDateHandler = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    let yyyymmdd_id = year + "-" + month + "-" + day + keyId.slice(10);
    console.log(yyyymmdd_id);
    setEventId(yyyymmdd_id);
  };

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

  const changeDateFormat = (yyyy_mm_dd) => {
    let slachDate = yyyy_mm_dd.slice(0, 10).replace(/-/g, "/");
    return slachDate;
  };

  const saveHandler = () => {
    if (eventId !== keyId) {
      const new_item = { ...item, id: eventId };
      console.log(new_item);
      props.saveFixedData(new_item);
    } else {
      props.saveFixedData(item);
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
          <div
            className={classes["date-area"]}
            style={{
              display: props.fixIsShown !== shownId && "none",
            }}
          >
            {" 날짜를 눌러서 복사하세요."}
            <AttendCalendar
              getDateValue={getDateHandler}
              setStart={new Date(changeDateFormat(keyId))}
            />
          </div>

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
              saveHandler();
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
          {/* 수정 / 저장버튼 */}
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
                : saveHandler
            }
          />
          {/* 삭제 / 취소버튼 */}

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
