import React, { useState, useCallback, useRef, useEffect } from "react";
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
  const [selectValue, setSelectValue] = useState(option);

  const noteRef = useRef(null);

  const getDateHandler = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    let yyyymmdd_id = year + "-" + month + "-" + day + keyId.slice(10);
    setEventId(yyyymmdd_id);
  };

  //사이즈조절
  const handleResizeHeight = useCallback(() => {
    if (noteRef === null || noteRef.current === null) {
      return;
    }

    noteRef.current.style.height = "10px";
    noteRef.current.style.height = noteRef.current.scrollHeight - 13 + "px";
  }, []);

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
    //날짜가 수정된 경우

    if (eventId.slice(0, 10) !== keyId.slice(0, 10)) {
      const new_item = { ...item, id: eventId };
      // console.log(new_item);
      // console.log(item);
      //새로운거 저장하기
      props.saveFixedData(new_item);
      //날짜는 그대로 내용만 변경된 경우
    } else {
      props.saveFixedData(item);
    }
  };

  const selectChangeHandler = (e) => {
    setSelectValue(e.target.value);
  };

  useEffect(() => {
    if (noteRef.current !== null) {
      noteRef.current.style.height = noteRef.current.scrollHeight - 20 + "px";
    }
  }, [props.fixIsShown]);

  return (
    <>
      <li
        key={keyId}
        id={keyId}
        className={`${classes["event-area"]}`}
        style={{
          backgroundColor: props.fixIsShown === shownId && "bisque",
        }}
      >
        {/* row 이름 + 버튼모음*/}
        <div
          id={`attendInfo-area${shownId}`}
          className={classes["attendInfo-area"]}
        >
          {/* 타이틀(이름) + 날짜 달력나오는거 column*/}
          <div className={`${classes["titleDate-area"]}`}>
            <h2 id={"eventName" + shownId}>{`😀 ${text}`}</h2>

            <div
              className={classes["date-area"]}
              style={{
                display: props.fixIsShown !== shownId && "none",
              }}
            >
              <div className={`${classes["datePick-area"]}`}>
                <i className="fa-solid fa-circle-arrow-right"></i>
                <AttendCalendar
                  getDateValue={getDateHandler}
                  setStart={new Date(changeDateFormat(keyId))}
                />
              </div>
              {props.about.slice(0, 4) !== "todo"
                ? "출결복사(날짜선택-저장)"
                : "일정복사(날짜선택-저장)"}
            </div>
            {/* 옵션 + 노트 부분 */}
            {props.about.slice(0, 4) !== "todo" && (
              <span
                id={`option-area${text.replace(/ /g, "")}`}
                className={classes["option-area"]}
                style={{
                  display: props.fixIsShown === shownId && "none",
                }}
              >
                {option.slice(1)} | {note && note}
              </span>
            )}
          </div>
          {/* 버튼모음 */}
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
              onclick={
                props.fixIsShown !== shownId
                  ? () => {
                      props.setFixIsShown(shownId);
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
              onclick={
                props.fixIsShown !== shownId
                  ? function () {
                      props.removeCheckSwal(item);
                    }
                  : function () {
                      props.setFixIsShown("0");
                      setSelectValue("");
                    }
              }
            />
          </div>
        </div>

        {props.about.slice(0, 4) === "todo" && (
          <span
            id={`option-area${text.replace(/ /g, "")}`}
            className={classes["option-area"]}
            style={{
              display: props.fixIsShown === shownId && "none",
              marginLeft: "20px",
            }}
          >
            {option.slice(1)} | {note && note}
          </span>
        )}

        {/* 수정중 일때만 보여주기 */}
        <div
          className={classes["optionNote-area"]}
          style={{
            display: props.fixIsShown !== shownId && "none",
          }}
        >
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
              id={`option-select${text.replace(/ /g, "")}`}
              required
              key={`option-select${keyId}`}
              defaultValue={selectValue}
              onChange={selectChangeHandler}
              style={{
                width: "30%",
              }}
            >
              <option value="" onChange={selectChangeHandler} disabled>
                -- 분류 --
              </option>
              {props.selectOption?.map((select_option) => (
                <option
                  value={select_option.value}
                  key={select_option.id}
                  onChange={selectChangeHandler}
                >
                  {select_option.class}
                </option>
              ))}
            </select>
            <textarea
              ref={noteRef}
              key={shownId}
              onKeyDown={() => handleResizeHeight(this)}
              onKeyUp={() => handleResizeHeight(this)}
              onClick={() => handleResizeHeight(this)}
              defaultValue={note || ""}
              id={`option-note${text.replace(/ /g, "")}`}
              className={classes["note-area"]}
              onInput={(e) => {
                handleOnInput(e, 40);
              }}
            />
          </form>
        </div>
      </li>
    </>
  );
};

export default EventItem;
