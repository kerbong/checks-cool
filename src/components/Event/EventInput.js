import React, { useRef, useCallback, useState, useEffect } from "react";

import classes from "./EventInput.module.css";
import Button from "../Layout/Button";
import Student from "../Student/Student";
import Modal from "../Layout/Modal";
import Swal from "sweetalert2";
import { scheduleJob } from "node-schedule";
import dayjs from "dayjs";

const EventInput = (props) => {
  const [student, setStudent] = useState("");
  const [showStudent, setShowStudent] = useState(false);
  const [reserveAlarm, setReserveAlarm] = useState(false);
  const [paperSubmit, setPaperSubmit] = useState(false);
  const [optionsSet, setOptionsSet] = useState([]);

  const noteRef = useRef(null);

  //사이즈조절
  const handleResizeHeight = useCallback(() => {
    if (noteRef === null || noteRef.current === null) {
      return;
    }

    noteRef.current.style.height = "10px";
    noteRef.current.style.height = noteRef.current.scrollHeight - 13 + "px";
  }, []);

  //자료 최대글자수 제한 함수
  const handleOnInput = (e, maxlength) => {
    if (e.target.value.length > maxlength) {
      e.target.value = e.target.value.substr(0, maxlength);
      Swal.fire({
        icon: "error",
        title: "입력 불가",
        text: `글자수를 초과했어요! 내용을 ${maxlength}자 이내로 줄여주세요.`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
    }
  };

  const closeModalHandler = (e) => {
    setShowStudent(false);
    setStudent(e.target.innerText);
  };

  // const selectStudentHandler = (e) => {
  //   setStudent(e.target.innerText);
  // };

  const changeYyyyMmDd = (eventDayOrigin) => {
    let _year = eventDayOrigin.split(" ")[1].slice(0, 4);
    let _month = eventDayOrigin.split(" ")[2].slice(0, -1).padStart(2, "0");
    let _day = eventDayOrigin.split(" ")[3].slice(0, -1).padStart(2, "0");

    return _year + "-" + _month + "-" + _day;
  };

  const getTime = (date) => {
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    return hours + ":" + minutes;
  };

  //저장버튼
  const saveEvent = () => {
    let eventDate = document.querySelector("h1").getAttribute("class");

    let eventDay = changeYyyyMmDd(eventDate);

    let new_data;
    let todo_eventName;
    let new_data_id = "";

    if (props.about === "consulting") {
      let selectDateTime = getTime(new Date());
      //년월일시간+번호 를 식별id로 사용 나중에 지울떄(상담)
      new_data_id = eventDay + selectDateTime + student.split(" ")[0];
    } else if (props.about === "attendance") {
      //년월일+번호 를 식별id로 사용 나중에 지울떄(출결)
      new_data_id = eventDay + student.split(" ")[0];

      //같은날 같은학생의 출결이 있을경우 취소하기
      const existedEvent = document
        .querySelector(".eventOnDayList")
        .querySelectorAll("li");

      const existedSameEvent = [];
      existedEvent.forEach((event) => {
        if (event.getAttribute("id") === new_data_id) {
          existedSameEvent.push(event);
        }
      });

      if (existedSameEvent.length !== 0) {
        Swal.fire({
          icon: "error",
          title: "저장 실패",
          text: "같은 날, 같은 학생의 출결정보가 있어요!",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
        return;
      }
    } else {
      //년월일+행사명{/* 달라진거 고려하기.. todo에서도 쓸 수 있게 */}
      todo_eventName = document.querySelector("#todo-eventName").value;
      new_data_id = eventDay + todo_eventName;

      //같은날 같은이름의 행사가 있을경우 취소하기
      const existedEvent = document
        .querySelector(".eventOnDayList")
        .querySelectorAll("li");

      const existedSameEvent = [];
      existedEvent.forEach((event) => {
        if (event.getAttribute("id") === new_data_id) {
          existedSameEvent.push(event);
        }
      });

      if (existedSameEvent.length !== 0) {
        Swal.fire({
          icon: "error",
          title: "저장 실패",
          text: "같은 이름의 행사가 같은 날 존재해요!",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
        return;
      }
    }

    //EventLists saveFixedData함수에서 필요한 것만 보냄
    if (props.about !== "todo") {
      new_data = {
        eventDate: eventDate,
        num: student.split(" ")[0],
        name: student.split(" ")[1],
        id: new_data_id,
      };
    } else {
      new_data = {
        eventDate: eventDate,
        eventName: todo_eventName,
        id: new_data_id,
      };
    }
    //출결에는 서류 제출부분 추가해서 보냄.
    if (props.about === "attendance") {
      new_data["paper"] = paperSubmit;
    }
    // if (props.about.slice(0, 4) === "todo") {
    //   showNotification(todo_eventName);
    // }
    props.saveNewData(new_data);
  };

  //학생을 선택하면, 그 학생이 지금까지 썼던 출결관련 내용 간략하게 보여줌.
  useEffect(() => {
    if (props.about !== "attendance") return;
    if (!props.events || props.events?.length === 0 || student?.length === 0)
      return;

    // 출결에서만 나오는..거..!! 현재학생 정보만 거르고
    let now_studentEvents = props.events?.filter(
      (evt) => evt.name === student.split(" ")[1]
    );
    let new_optionsSet = [];
    now_studentEvents?.forEach((evt) => {
      new_optionsSet.push(evt.option);
    });
    setOptionsSet(new_optionsSet);
  }, [student]);

  return (
    <>
      <li
        className={classes["event-area"]}
        style={{
          backgroundColor: "#ffe9ed",
        }}
      >
        <div className={classes["attendInfo-area"]}>
          <div className={classes["attendInfo-student"]}>
            {props.about.slice(0, 4) !== "todo" ? (
              <>
                {/* 학생서류 제출했는지 체크하는 버튼 */}
                <Button
                  className={
                    paperSubmit ? "paperSub-btn-clicked" : "paperSub-btn"
                  }
                  onclick={() => {
                    setPaperSubmit((prev) => !prev);
                  }}
                  name={"서류"}
                  icon={
                    <span>
                      <i className="fa-solid fa-circle-check"></i>
                    </span>
                  }
                />
                {/* 학생 선택버튼 부분 */}
                <Button
                  className="choose-studentBtn"
                  name={student || "학생선택"}
                  onclick={function () {
                    if (
                      props.students === undefined ||
                      props.students?.length === 0
                    ) {
                      Swal.fire({
                        icon: "error",
                        title: "선택 불가",
                        text: "메뉴의 곰돌이를 눌러서 먼저 학생명단을 입력해주세요.",
                        confirmButtonText: "확인",
                        confirmButtonColor: "#85bd82",
                        timer: 5000,
                      });
                    } else {
                      setShowStudent(!showStudent);
                    }
                  }}
                />
              </>
            ) : (
              <input
                type="text"
                placeholder="행사명"
                id={"todo-eventName"}
                className={classes["eventNameInput-area"]}
                autoFocus
                onInput={(e) => handleOnInput(e, 20)}
              />
            )}

            <div className={classes["button-area"]}>
              <Button
                className="small-student"
                name={
                  <span>
                    <i className="fa-regular fa-floppy-disk"></i>
                  </span>
                }
                id={`save-btn${props.id}`}
                onclick={() => {
                  //추가한 이벤트 저장하는 함수, 필요한 데이터를 모아서 상위 props에 이벤트 정보 전달함.
                  saveEvent();
                }}
              />
              <Button
                className="small-student"
                name={
                  <span>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                }
                id={`cancle-btn${props.id}`}
                onclick={function () {
                  props.closeHandler();
                }}
              />
            </div>

            {showStudent && (
              <Modal onClose={closeModalHandler}>
                <Student
                  students={props.students}
                  showOption={closeModalHandler}
                  isSubject={props.isSubject}
                />
              </Modal>
            )}
          </div>

          <form
            className={classes["optionChange-area"]}
            onSubmit={(e) => {
              e.preventDefault();
              saveEvent();
            }}
          >
            {/* 알람설정 버튼 */}
            {/* {props.about.slice(0, 4) === "todo" && (
              <span
                className={classes["todo-alarm-span"]}
                onClick={() => {
                  setReserveAlarm((prev) => !prev);
                }}
              >
                {reserveAlarm ? (
                  <i class="fa-solid fa-bell"></i>
                ) : (
                  <i class="fa-regular fa-bell"></i>
                )}
              </span>
            )} */}

            {/* 분류 고르는 셀렉트 태그 */}
            {props.selectOption && (
              <select
                name="attend-option"
                id={
                  student
                    ? `option-select${student.split(" ")[0]}`
                    : "option-select"
                }
                defaultValue={props.dafaultValue}
                required
              >
                <option value="">-- 분류 --</option>
                {props.selectOption?.map((select_option) => (
                  <option value={select_option.value} key={select_option.id}>
                    {select_option.class}
                  </option>
                ))}
              </select>
            )}

            <textarea
              ref={noteRef}
              type="text"
              onKeyDown={() => handleResizeHeight(this)}
              onKeyUp={() => handleResizeHeight(this)}
              onClick={() => handleResizeHeight(this)}
              placeholder={props.placeholder}
              id={
                student ? `option-note${student.split(" ")[0]}` : "option-note"
              }
              className={classes["note-area"]}
              onInput={(e) => {
                props.about.slice(0, 4) === "todo"
                  ? handleOnInput(e, 60)
                  : handleOnInput(e, 40);
              }}
            />
          </form>
          {optionsSet?.length > 0 && (
            <>
              <span className={classes["optionsSet"]}>
                {[...new Set(optionsSet)]?.map((option) => (
                  <span
                    key={`optionSet-${option}`}
                    className={classes["optionsSet"]}
                  >
                    {option?.slice(1)}{" "}
                    {optionsSet?.filter((op) => op === option).length}회
                  </span>
                ))}
              </span>
            </>
          )}
        </div>
      </li>
    </>
  );
};

export default EventInput;
