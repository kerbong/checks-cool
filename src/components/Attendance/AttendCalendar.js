import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import "../Layout/Calendar.css";
import { ko } from "date-fns/esm/locale";

const AttendCalendar = (props) => {
  const [startDate, setStartDate] = useState(props.setStart || new Date());
  const [endDate, setEndDate] = useState(startDate);

  useEffect(() => {
    if (props.about === "main") {
      setStartDate(props.setStart);
    }
  }, [props.setStart]);

  const isWeekday = (date) => {
    const day = date.getDay(date);
    return day !== 0 && day !== 6;
  };

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const onChange = (dates) => {
    if (props.about === "attendance") {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate(dates);
    }
    props.getDateValue(dates);
  };

  const now_year = () => {
    //2월부터는 새로운 학년도로 인식
    return +dayjs().format("MM") <= 1
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        filterDate={isWeekday}
        startDate={startDate}
        minDate={props.isSubject ? new Date(now_year(), 2, 1) : false}
        maxDate={props.isSubject ? new Date(+now_year() + 1, 1, 14) : false}
        endDate={props.about === "attendance" && endDate}
        selectsRange={props.about === "attendance" && true}
        disabledKeyboardNavigation
        highlightDates={props.highlight}
        customInput={<ExampleCustomInput />}
        inline={props.inline}
        locale={ko}
        dateFormat="yy년 MMMM d일(eee)"
      />
    </>
  );
};

export default AttendCalendar;
