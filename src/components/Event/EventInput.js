import React, { useState } from "react";

import classes from "./EventInput.module.css";
import Button from "../Layout/Button";
import students from "../../studentInfo";
import Student from "../Student/Student";
import Modal from "../Layout/Modal";

const EventInput = (props) => {
  const [student, setStudent] = useState("");
  const [showStudent, setShowStudent] = useState(false);

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

  const saveEvent = () => {
    let eventDate = document.querySelector("h1").getAttribute("class");

    let eventDay = changeYyyyMmDd(eventDate);

    //EventLists saveFixedData함수에서 필요한 것만 보냄
    let new_data = {
      eventDate: eventDate,
      student_num: student.split(" ")[0],
      student_name: student.split(" ")[1],
      id: eventDay + student.split(" ")[0],
    };

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
            <Button
              className={classes["choose-studentBtn"]}
              small="true"
              name={"학생선택"}
              onclick={function () {
                setShowStudent(!showStudent);
              }}
            />
            {student && (
              <span className={classes["selected-student"]}>{student}</span>
            )}
            {showStudent && (
              <Modal onClose={closeModalHandler}>
                <Student students={students} showOption={closeModalHandler} />
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
            {props.selectOptions && (
              <select
                name="attend-option"
                id={
                  student
                    ? `option-select${student.split(" ")[0]}`
                    : "option-select"
                }
                required
              >
                <option value="">--출 결--</option>
                {props.selectOptions.map((option) => (
                  <option value={option.value} key={option.id}>
                    {option.class}
                  </option>
                ))}
              </select>
            )}

            <input
              type="text"
              placeholder={props.placeholder}
              id={
                student ? `option-note${student.split(" ")[0]}` : "option-note"
              }
            />
          </form>
        </div>
        <div className={classes["button-area"]}>
          <Button
            small="true"
            name="저장"
            id={`save-btn${props.student_num}`}
            class={{ width: "30%", fontSize: "1.1em" }}
            onclick={() => {
              //추가한 이벤트 저장하는 함수, 필요한 데이터를 모아서 상위 props에 이벤트 정보 전달함.
              saveEvent();
            }}
          />
          <Button
            small="true"
            name={"취소"}
            id={`cancle-btn${props.student_num}`}
            style={{ width: "30%", fontSize: "1.1em" }}
            onclick={function () {
              props.closeHandler();
            }}
          />
        </div>
      </li>
    </>
  );
};

export default EventInput;
