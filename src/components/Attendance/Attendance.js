import classes from "./Attendance.module.css";
import Modal from "../Layout/Modal";
import React, { useContext, useState, useRef, useCallback } from "react";
import AttendCalendar from "../Attendance/AttendCalendar";
import Input from "../Layout/Input";
import Swal from "sweetalert2";

const Attendance = (props) => {
  const anyContext = useContext(props.Context);
  const [inputIsShown, setInputIsShown] = useState(false);
  const [option, setOption] = useState("");
  const [attendDate, setAttendDate] = useState(new Date());

  const noteRef = useRef(null);

  const handleResizeHeight = useCallback(() => {
    if (noteRef === null || noteRef.current === null) {
      return;
    }
    noteRef.current.style.height = "10px";
    noteRef.current.style.height = noteRef.current.scrollHeight + "px";
  }, []);

  const getToday = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  };

  const getTime = (date) => {
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    return hours + ":" + minutes;
  };

  const checkSave = (text) => {
    Swal.fire({
      icon: "success",
      title: "저장되었어요!",
      text: text,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });
  };

  const checkDayOfWeek = () => {
    Swal.fire({
      icon: "error",
      title: "저장에 실패했어요!",
      html: "토 / 일요일은 저장이 불가능합니다. <br>날짜를 확인, 변경해주세요",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
    });
  };

  const showNote = (e) => {
    setOption(e.target.id + e.target.innerText);
    setInputIsShown(true);
  };

  const getDateHandler = (date) => {
    setAttendDate(date);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const inputValue = noteRef.current.value;
    const studentInfo = props.who.split(" ");

    const selectDate = getToday(attendDate);

    // 만약 주말(index 6 = 토, index 0 = 일)이면 저장안되도록!
    let dayOfWeek = attendDate.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      checkDayOfWeek();
      return;
    }

    let new_data_id = "";

    if (props.about === "consulting") {
      let selectDateTime = getTime(attendDate);
      //년월일시간+번호 를 식별id로 사용 나중에 지울떄(상담)
      new_data_id = selectDate + selectDateTime + studentInfo[0];
    } else if (props.about === "attendance") {
      //년월일+번호 를 식별id로 사용 나중에 지울떄(출결)
      new_data_id = selectDate + studentInfo[0];
    }

    const new_data = {
      student_num: studentInfo[0],
      student_name: studentInfo[1],
      id: new_data_id,
      option: option,
      note: inputValue,
    };

    console.log(new_data);
    anyContext.addData(new_data);

    //나중에 기간, 날짜도 추가하기
    checkSave(
      `${studentInfo[1]} 학생의 ${option.slice(
        1
      )} 관련 내용이 저장되었습니다. (5초 후 창이 자동으로 사라집니다.)`
    );

    setInputIsShown(false);
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes["student"]}>{props.who}</div>
      <div className={classes["date"]}>
        {" "}
        <AttendCalendar getDateValue={getDateHandler} />
      </div>
      <ul className={classes["ul"]}>
        {props.selectOption &&
          props.selectOption.map((select_option) => (
            <li
              className={
                select_option.value === option
                  ? classes["option-select"]
                  : classes["option"]
              }
              key={select_option.id}
              id={select_option.id}
              onClick={showNote}
            >
              {select_option.class}
            </li>
          ))}
      </ul>
      <div className={classes["form-section"]}>
        {inputIsShown && (
          <form
            id="area-form"
            className={classes.form}
            onSubmit={submitHandler}
          >
            <Input
              ref={noteRef}
              className={classes.input}
              label="inputData"
              input={{
                id: props.id,
                type: "text",
                placeholder: "비고를 입력하세요.",
                defaultValue: "",
                autoFocus: true,
              }}
              onKeyDown={() => handleResizeHeight(this)}
              onKeyUp={() => handleResizeHeight(this)}
            />
            <button className={classes.btn}>저장</button>
          </form>
        )}
        <button className={classes["btn"]} onClick={props.onClose}>
          닫기
        </button>
      </div>
    </Modal>
  );
};

export default Attendance;
