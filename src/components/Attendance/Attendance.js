import classes from "./Attendance.module.css";
import Modal from "../Layout/Modal";
import React, { useContext, useState, useRef } from "react";
import AttendContext from "../../store/attend-context";
import AttendCalendar from "../Attendance/AttendCalendar";
import Input from "../Layout/Input";
import Swal from "sweetalert2";

const ATTENDANCE_OPTION = [
  { class: "현장체험", id: "1" },
  { class: "질병결석", id: "2" },
  { class: "가정학습", id: "3" },
  { class: "경조사", id: "4" },
  { class: "기타결석", id: "5" },
  { class: "미인정", id: "6" },
];

const Attendance = (props) => {
  const attendCtx = useContext(AttendContext);
  const [inputIsShown, setInputIsShown] = useState(false);
  const [attendOption, setAttendOption] = useState("");
  const [attendDate, setAttendDate] = useState(new Date());

  const noteRef = useRef();

  const getToday = (date) => {
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  };

  const checkSave = (text) => {
    Swal.fire({
      icon: "success",
      title: text,
      text: "5초 후에 창이 사라집니다.",
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
    setAttendOption(e.target.id + e.target.innerText);
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

    const new_data = {
      student_num: studentInfo[0],
      student_name: studentInfo[1],
      //년월일+번호 를 식별id로 사용 나중에 지울떄
      id: selectDate + studentInfo[0],
      option_id: attendOption.slice(0, 1),
      option: attendOption.slice(1) + "*d" + inputValue + "*d" + selectDate,
    };

    // console.log(new_data);
    attendCtx.addData(new_data);

    //나중에 기간, 날짜도 추가하기
    checkSave(`${studentInfo[1]} | ${attendOption.slice(1)} | ${inputValue}`);

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
        {ATTENDANCE_OPTION &&
          ATTENDANCE_OPTION.map((option) => (
            <li
              className={
                option.class === attendOption.slice(1)
                  ? classes["attend-option-select"]
                  : classes["attend-option"]
              }
              key={option.id}
              id={option.id}
              onClick={showNote}
            >
              {option.class}
            </li>
          ))}
      </ul>
      <div className={classes["form-section"]}>
        {inputIsShown && (
          <form
            id="attend-form"
            className={classes.form}
            onSubmit={submitHandler}
          >
            <Input
              ref={noteRef}
              className={classes.input}
              label="attendData"
              input={{
                id: props.id,
                type: "text",
                placeholder: "비고를 입력하세요.",
                defaultValue: "",
                autoFocus: true,
              }}
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
