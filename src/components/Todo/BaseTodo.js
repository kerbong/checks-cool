import AttendCalendar from "components/Attendance/AttendCalendar";
import Input from "components/Layout/Input";
import React, { useState, useRef, useEffect } from "react";
import classes from "./BaseTodo.module.css";
import dayjs from "dayjs";

const BaseTodo = (props) => {
  const [eventDates, setEventDates] = useState([]);

  const getDateHandler = (date) => {
    //날짜 모음에서 존재하는지 확인해서 같으면 제외함.
    let new_date = dayjs(date).format("YYYY-MM-DD");
    let new_eventDates = [...eventDates];
    let isExist = new_eventDates?.filter((event) => event === new_date);
    //새로운 날짜면... 추가하고
    if (isExist.length === 0) {
      new_eventDates.push(new_date);
      //기존 날짜면... 제외하고
    } else {
      new_eventDates = new_eventDates?.filter((ev) => ev !== new_date);
    }
    setEventDates([...new_eventDates]);
  };

  return (
    <div>
      {/* 공용) 개인) 선택 탭, 행사명 인풋, x 마크(닫기)  */}
      <div>
        <select>
          <span
            className={classes[""]}
            onClick={() => {
              localStorage.setItem("itemId", "null");
              props.onClose();
              props.setItemNull();
            }}
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </span>
        </select>
        <input />
      </div>

      {/* 달력.. 여러 날짜 클릭 가능 + 클릭한 날짜와 총 날짜 수 보여주기 */}
      <div>
        <AttendCalendar
          getDateValue={getDateHandler}
          setStart={new Date()}
          getMonthValue={() => {}}
          highlight={eventDates}
          inline={true}
          fixedHeight={true}
        />
        {/* flex속성으로.. span각자에 width px 넣어주고, flex wrap으로  */}
        <div className={classes[""]}>
          {eventDates?.map((evt) => (
            <span className={classes[""]}>
              {dayjs(evt).format("YY년 M월 D일(ddd)")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BaseTodo;
