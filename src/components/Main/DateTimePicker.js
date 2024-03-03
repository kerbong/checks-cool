import Button from "components/Layout/Button";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import classes from "./ClassItem.module.css";

function DateTimePicker(props) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (!props.startTime) return;
    setStartTime(props.startTime);
  }, [props.startTime]);
  useEffect(() => {
    if (!props.endTime) return;
    setEndTime(props.endTime);
  }, [props.endTime]);

  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 5) {
      const timeString = `${i.toString().padStart(2, "0")}:${j
        .toString()
        .padStart(2, "0")}`;
      times.push(timeString);
    }
  }

  const timeHandler = () => {
    if (startTime === endTime) {
      Swal.fire(
        "적용 실패!",
        "교시의 시작과 끝 시각이 같아요! 시작과 끝을 다르게 변경해주세요.",
        "warning"
      );
      return;
    } else if (startTime > endTime) {
      Swal.fire(
        "적용 실패!",
        "교시의 시작이 끝보다 과거여야(작아야) 합니다! 시작 혹은 끝을 다르게 변경해주세요.",
        "warning"
      );
      return;
    } else {
      props.timeHandler(startTime, endTime);
    }
  };

  useEffect(() => {
    if (props.startTime === startTime) return;

    if (startTime) {
      const [hours, minutes] = startTime.split(":");
      let date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setMinutes(date.getMinutes() + 40);
      const newEndTime = `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      setEndTime(newEndTime);
    }
  }, [startTime]);

  return (
    <div className={classes["time-div"]} style={{ marginLeft: "10px" }}>
      <label>
        시작 &nbsp;
        <select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        >
          {times.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>
      &nbsp;~&nbsp;
      <label>
        끝&nbsp;
        <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
          {times.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>
      <Button
        name={"적용"}
        className={"time-pm-button"}
        onclick={timeHandler}
      />
    </div>
  );
}

export default DateTimePicker;
