import React, { useState, useEffect } from "react";
import classes from "./Alarm.module.css";
import AttendCalendar from "../../Attendance/AttendCalendar";
import dayjs from "dayjs";
import Input from "components/Layout/Input";

const getDateHandler = (date, titleOrQuery) => {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  if (titleOrQuery === "title") {
    let weekd = date.getDay();
    let weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    return `${year}년 ${month}월 ${day}일(${weekDays[weekd]})`;
  } else {
    return year + "-" + month + "-" + day;
  }
};

const Alarm = (props) => {
  const [todayYyyymmdd, setTodayYyyymmdd] = useState(
    getDateHandler(new Date())
  );
  const [titleDate, setTitleDate] = useState(
    getDateHandler(new Date(), "title")
  );

  const calDateHandler = (date) => {
    let weekd = dayjs(date).format("d");
    let weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    setTodayYyyymmdd(dayjs(date).format("YYYY-MM-DD"));
    setTitleDate(dayjs(date).format(`YYYY년 MM월 DD일(${weekDays[weekd]})`));
  };

  return (
    <div>
      {/* 잼잼 첫 화면으로 넘어가는 x 버튼 div */}
      <div>
        <button
          className={classes["exit-btn"]}
          onClick={() => {
            props.alarmClose();
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {/* 알림장 전체 div */}
      <div className={classes["alarm-all"]}>
        {/* 날짜 화면 보여주기 */}
        <div className={classes["date"]}>
          {/* 오늘 날짜 보여주는 부분 날짜 클릭하면 달력도 나옴 */}
          <span
            className={
              getDateHandler(new Date(), "title") === titleDate
                ? classes["events-today"]
                : ""
            }
          >
            {/* {titleDate} */}
            {/* 오늘 날짜 보여주는 부분 날짜 클릭하면 달력도 나옴 */}
            <span className={classes["hide-cal"]}>
              <AttendCalendar
                getDateValue={calDateHandler}
                about="main"
                setStart={new Date(todayYyyymmdd)}
              />
            </span>
          </span>
        </div>

        {/* 칠판, 칠판 설정 부분 */}
        <div className={classes["board-all"]}>
          {/* 칠판 */}
          <div>
            <Input
              id={`board-input`}
              myKey={"board-input"}
              className={"board-input"}
              label="board-input"
              input={{
                type: "textarea",
              }}
              defaultValue={""}
            />
          </div>
          {/* 칠판 설정 */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Alarm;
