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
  const [paperSubmit, setPaperSubmit] = useState(item?.paper || false);
  const [requestSubmit, setRequestSubmit] = useState(item?.request || false);
  const [reportSubmit, setReportSubmit] = useState(item?.report || false);

  const noteRef = useRef(null);
  const eventNameRef = useRef(null);
  const optionRef = useRef(null);

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
    let new_item = { ...item };
    if (props.about === "attendance") {
      if (item?.paper === undefined) {
        new_item["request"] = requestSubmit;
        new_item["report"] = reportSubmit;
      } else {
        new_item["paper"] = paperSubmit;
      }
    }
    // console.log(optionRef.current.value);
    if (props.about.slice(0, 4) === "todo") {
      new_item["eventName"] = eventNameRef.current.value;
      new_item["option"] = optionRef.current.value;
      new_item["note"] = noteRef.current.value;
    }

    //날짜가 수정된 경우
    if (eventId.slice(0, 10) !== keyId.slice(0, 10)) {
      new_item["id"] = eventId;
      // console.log(new_item);
      // console.log(item);
      if (props.about === "attendance") {
        new_item["beforeId"] = keyId;
      }
      //새로운거 저장하기
      props.saveFixedData(new_item);
      //날짜는 그대로 내용만 변경된 경우
    } else {
      props.saveFixedData(new_item);
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

  /** note가 있으면.. 보여주는데, a링크할 게 있으면 a태그 넣어주기 */
  const noteHandler = (note) => {
    if (!note) return;

    let replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 =
      /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = note.replace(
      replacePattern1,
      '<a href="$1" target="_blank">$1</a>'
    );

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(
      replacePattern2,
      '$1<a href="http://$2" target="_blank">$2</a>'
    );

    //Change email addresses to mailto:: links.
    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    replacedText = replacedText.replace(
      replacePattern3,
      '<a href="mailto:$1">$1</a>'
    );

    return <span dangerouslySetInnerHTML={{ __html: replacedText }} />;
  };

  return (
    <>
      <li
        key={keyId}
        id={keyId}
        className={`${classes["event-area"]}`}
        style={{
          backgroundColor: props.fixIsShown === shownId && "#ffe9ed",
        }}
      >
        {/* row 이름 + 버튼모음*/}
        <div
          id={`attendInfo-area${shownId}`}
          className={classes["attendInfo-area"]}
        >
          {/* 타이틀(이름) + 날짜 달력나오는거 column*/}
          <div className={`${classes["titleDate-area"]}`}>
            <h2
              id={"eventName" + shownId}
              className={classes["title-h2"]}
              style={{
                display:
                  props.about.slice(0, 4) === "todo" &&
                  props.fixIsShown === shownId &&
                  "none",
              }}
            >
              {`😀 ${text} ${props?.setNum ? `(${props.setNum})` : ""}`}
              {/* 학생서류 제출했는지 체크하는 버튼 */}
              {props.about === "attendance" && (
                <>
                  {/* 현재 수정상태가 아닐때는 true인 자료들만 체크표시 보여주고 */}
                  {props.fixIsShown !== shownId && paperSubmit && (
                    <Button
                      className={"paperSub-btn-s-clicked"}
                      icon={
                        <span>
                          <i className="fa-solid fa-circle-check"></i>
                        </span>
                      }
                    />
                  )}
                  {props.fixIsShown !== shownId &&
                    item?.paper === undefined && (
                      <>
                        <Button
                          className={
                            requestSubmit
                              ? "reqRepSub-btn-s-clicked"
                              : "reqRepSub-btn-s"
                          }
                          name={"신"}
                          style={{ marginLeft: "10px", cursor: "auto" }}
                        />
                        <Button
                          className={
                            reportSubmit
                              ? "reqRepSub-btn-s-clicked"
                              : "reqRepSub-btn-s"
                          }
                          style={{ cursor: "auto" }}
                          name={"보"}
                        />
                      </>
                    )}

                  {/*  수정상태에서는 다 보여줌 paper 속성있는, 2023버전이면 체크표시 보여주고 */}
                  {props.fixIsShown === shownId &&
                    item?.paper !== undefined && (
                      <Button
                        className={
                          paperSubmit ? "paperSub-btn-clicked" : "paperSub-btn"
                        }
                        onclick={() => {
                          if (props.fixIsShown !== shownId) return;
                          setPaperSubmit((prev) => !prev);
                        }}
                        name={"서류"}
                        icon={
                          <span>
                            <i className="fa-solid fa-circle-check"></i>
                          </span>
                        }
                      />
                    )}

                  {/*  수정상태에서는 다 보여줌 paper 속성없는, 2024 이후 버전이면 */}
                  {props.fixIsShown === shownId &&
                    item?.paper === undefined && (
                      <>
                        <Button
                          className={
                            requestSubmit
                              ? "paperSub-btn-clicked"
                              : "paperSub-btn"
                          }
                          onclick={() => {
                            if (props.fixIsShown !== shownId) return;
                            setRequestSubmit((prev) => !prev);
                          }}
                          style={{ width: "auto", letterSpacing: "-1px" }}
                          name={"신청서"}
                        />
                        <Button
                          className={
                            reportSubmit
                              ? "paperSub-btn-clicked"
                              : "paperSub-btn"
                          }
                          onclick={() => {
                            if (props.fixIsShown !== shownId) return;
                            setReportSubmit((prev) => !prev);
                          }}
                          style={{ width: "auto", letterSpacing: "-1px" }}
                          name={"보고서"}
                        />
                      </>
                    )}
                </>
              )}
            </h2>
            {/* 할 일에서 수정중 일 때 보일 input 태그 */}
            {props.about.slice(0, 4) === "todo" &&
              props.fixIsShown === shownId && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    type="text"
                    placeholder="행사명"
                    id={"todo-eventName"}
                    className={classes["eventNameInput-area"]}
                    autoFocus
                    ref={eventNameRef}
                    defaultValue={text}
                    onInput={(e) => handleOnInput(e, 20)}
                  />
                </div>
              )}
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
                  getMonthValue={() => {}}
                  getYearValue={() => {}}
                />
              </div>
              {props.about.slice(0, 4) !== "todo"
                ? "출결복사(날짜선택-저장)"
                : "일정복사(날짜선택-저장)"}
            </div>
            {/* 옵션 + 노트 부분 */}
            {props.about.slice(0, 4) !== "todo" && (
              <span
                id={`option-area${keyId}`}
                className={classes["option-area"]}
                style={{
                  display: props.fixIsShown === shownId && "none",
                }}
              >
                {option.slice(1)} | {noteHandler(note)}
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
                  <span>
                    <i className="fa-solid fa-pencil"></i>
                  </span>
                ) : (
                  <span>
                    <i className="fa-regular fa-floppy-disk"></i>
                  </span>
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
                  <span>
                    <i className="fa-regular fa-trash-can"></i>
                  </span>
                ) : (
                  <span>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
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
                      // 신청서,보고서, 서류부분.. 초기화
                      setPaperSubmit(item?.paper || false);
                      setRequestSubmit(item?.request || false);
                      setReportSubmit(item?.report || false);
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
            {option.slice(1)} | {noteHandler(note)}
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
              id={`option-select${
                props.about.slice(0, 4) === "todo"
                  ? text.replace(/ /g, "")
                  : keyId
              }`}
              required
              key={`option-select${keyId}`}
              defaultValue={selectValue}
              onChange={selectChangeHandler}
              ref={optionRef}
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
              id={`option-note${
                props.about.slice(0, 4) === "todo"
                  ? text.replace(/ /g, "")
                  : keyId
              }`}
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
