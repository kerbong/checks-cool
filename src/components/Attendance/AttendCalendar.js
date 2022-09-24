import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../Layout/Calendar.css";
import { ko } from "date-fns/esm/locale";

const AttendCalendar = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);

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

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        filterDate={isWeekday}
        startDate={startDate}
        endDate={props.about === "attendance" && endDate}
        selectsRange={props.about === "attendance" && true}
        disabledKeyboardNavigation
        highlightDates={props.highlight}
        customInput={<ExampleCustomInput />}
        inline={props.inline}
        locale={ko}
        dateFormat="yyyy년 MMMM d일"
      />
    </>
  );
};

export default AttendCalendar;
