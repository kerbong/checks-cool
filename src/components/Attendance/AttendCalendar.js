import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Layout/Calendar.css";
import { ko } from "date-fns/esm/locale";

const AttendCalendar = (props) => {
  const [startDate, setStartDate] = useState(props.setStart || new Date());
  const [endDate, setEndDate] = useState(startDate);

  const isWeekday = (date) => {
    if (props.filterNone) return date;
    const day = date.getDay(date);
    return day !== 0 && day !== 6;
  };

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
      className="custom-input"
      onClick={onClick}
      ref={ref}
      title="날짜 선택하기"
    >
      {value}
    </button>
  ));

  const onChange = (dates) => {
    if (props.about === "attendance" || props.about === "todo") {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate(dates);
    }
    props.getDateValue(dates);
    if (props.about === "tableInput") {
      props.tableDateChangeHandler(dates);
    }
  };

  const onMonthChange = (month) => {
    props.getMonthValue(month);
  };

  useEffect(() => {
    if (props.about === "main") {
      setStartDate(props.setStart);
    } else if (props.about === "tableInput") {
      if (!props.setStart || typeof props.setStart !== "object") return;
      setStartDate(props.setStart);
    }
  }, [props.setStart]);

  const clickDateHandler = () => {
    if (!props.filterNone) return;
    //월화수목금 크기 일정하게
    let weekDayNames = document.querySelector(".react-datepicker__day-names");
    let weekDayName = document.querySelectorAll(".react-datepicker__day-name");
    if (!weekDayNames || !weekDayName) return;
    weekDayNames.style.width = "95%";
    weekDayName[0].style.width = "14%";
    weekDayName[6].style.width = "14%";
  };

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        filterDate={isWeekday}
        startDate={startDate}
        showMonthDropdown
        onMonthChange={onMonthChange}
        dateFormatCalendar="yyyy년 "
        endDate={
          (props.about === "attendance" || props.about === "todo") && endDate
        }
        selectsRange={
          (props.about === "attendance" || props.about === "todo") && true
        }
        disabledKeyboardNavigation
        highlightDates={props.highlight}
        customInput={<ExampleCustomInput onClick={clickDateHandler} />}
        fixedHeight={props.fixedHeight}
        inline={props.inline}
        locale={ko}
        dateFormat={
          props.showJustTime
            ? `aa h:mm`
            : !props.showTime
            ? `yy년 MMMM d일(eee)`
            : `yy년 MMMM d일(eee) aa h:mm`
        }
        showTimeSelectOnly={props.showJustTime}
        timeFormat="aa h:mm"
        timeInputLabel="입력/선택"
        showTimeInput={props.showTime}
        timeIntervals={10}
      />
    </>
  );
};

export default AttendCalendar;
