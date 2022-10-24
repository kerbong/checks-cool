import React, { useRef, useCallback, useState } from "react";

import classes from "./EventInput.module.css";
import Button from "../Layout/Button";
import Student from "../Student/Student";
import Modal from "../Layout/Modal";
import Swal from "sweetalert2";

const EventInput = (props) => {
  const [student, setStudent] = useState("");
  const [showStudent, setShowStudent] = useState(false);

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
        text: "입력한 내용을 줄여주세요.",
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
    } else {
      //년월일+행사명{/* 달라진거 고려하기.. todo에서도 쓸 수 있게 */}
      todo_eventName = document.querySelector("#todo-eventName").value;
      new_data_id = eventDay + todo_eventName;
    }

    //EventLists saveFixedData함수에서 필요한 것만 보냄
    if (props.about !== "todo") {
      new_data = {
        eventDate: eventDate,
        student_num: student.split(" ")[0],
        student_name: student.split(" ")[1],
        id: new_data_id,
      };
    } else {
      new_data = {
        eventDate: eventDate,
        eventName: todo_eventName,
        id: new_data_id,
      };
    }

    props.saveNewData(new_data);
  };

  return (
    <>
      <li
        className={classes["event-area"]}
        style={{
          backgroundColor: "bisque",
        }}
      >
        <div className={classes["attendInfo-area"]}>
          <div className={classes["attendInfo-student"]}>
            {props.about.slice(0, 4) !== "todo" ? (
              <Button
                className="choose-studentBtn"
                name={"학생선택"}
                onclick={function () {
                  if (props.students.length !== 0) {
                    setShowStudent(!showStudent);
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "선택 불가",
                      text: "메뉴의 곰돌이를 눌러서 먼저 학생명단을 입력해주세요.",
                      confirmButtonText: "확인",
                      confirmButtonColor: "#85bd82",
                      timer: 5000,
                    });
                  }
                }}
              />
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
                name={<i className="fa-regular fa-floppy-disk"></i>}
                id={`save-btn${props.id}`}
                onclick={() => {
                  //추가한 이벤트 저장하는 함수, 필요한 데이터를 모아서 상위 props에 이벤트 정보 전달함.
                  saveEvent();
                }}
              />
              <Button
                className="small-student"
                name={<i className="fa-solid fa-xmark"></i>}
                id={`cancle-btn${props.id}`}
                onclick={function () {
                  props.closeHandler();
                }}
              />
            </div>

            {student && (
              <span className={classes["selected-student"]}>{student}</span>
            )}
            {showStudent && (
              <Modal onClose={closeModalHandler}>
                <Student
                  students={props.students}
                  showOption={closeModalHandler}
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
                {props.selectOption.map((select_option) => (
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
              onInput={(e) => handleOnInput(e, 30)}
            />
          </form>
        </div>
      </li>
    </>
  );
};

export default EventInput;
