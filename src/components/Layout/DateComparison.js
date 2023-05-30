import React from "react";
import dayjs from "dayjs";

const DateComparison = ({ date }) => {
  const currentDate = dayjs();
  const targetDate = dayjs(date);

  const diffInDays = currentDate.diff(targetDate, "day");
  const diffInMonths = currentDate.diff(targetDate, "month");

  let displayText = "";

  if (diffInDays < 0) {
    displayText = "미래??";
  } else if (diffInDays < 1) {
    displayText = "오늘";
  } else if (diffInDays === 1) {
    displayText = "어제";
  } else if (diffInMonths < 1) {
    displayText = `${diffInDays}일 전`;
  } else {
    displayText = `${diffInMonths}달 전`;
  }

  return displayText;
};

export default DateComparison;
