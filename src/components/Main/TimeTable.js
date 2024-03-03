import React, { useState, useEffect } from "react";
import Button from "../Layout/Button";
import classes from "../page/ClassTableBasic.module.css";
import DateTimePicker from "./DateTimePicker";
import dayjs from "dayjs";

const TimeTable = (props) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [classIndex, setClassIndex] = useState("");

  const timeHandler = (sTime, eTime) => {
    props.timeHandler(classIndex, sTime, eTime);
  };

  useEffect(() => {
    if (classIndex === "") return;

    const seTime = props.classStart?.[classIndex]?.split(",");
    setStartTime(dayjs(seTime?.[0]).format("HH:mm"));
    setEndTime(
      seTime?.[1]
        ? dayjs(seTime?.[1]).format("HH:mm")
        : dayjs(seTime?.[0]).add(40, "minute").format("HH:mm")
    );
  }, [classIndex]);

  const classIndexHandler = (e) => {
    setClassIndex(e.target.value);
  };

  return (
    <>
      {/* 교시 추가 삭제부분 */}
      <div className={classes["select-p-m"]}>
        <Button
          name={"마지막 교시 삭제"}
          className={"reset-cl-button"}
          onclick={() => {
            props.delAddClassTimeHandler("del");
          }}
        />
        <Button
          name={"마지막 교시 추가"}
          className={"reset-cl-button"}
          onclick={() => {
            props.delAddClassTimeHandler("add");
          }}
        />
      </div>

      {/* 전체 초기화 및 시간설정부분 */}
      <div className={classes["select-p-m"]}>
        <Button
          name={"전체 초기화"}
          className={"reset-cl-button"}
          onclick={() => props.returnBaseHandler()}
        />
        <div className={classes["select-p-m"]}>
          <select onChange={classIndexHandler} className={classes["select"]}>
            {props?.classTime?.map((cl, index) => (
              <option key={`option-${index}`} value={index}>
                {cl}
              </option>
            ))}
          </select>
          <DateTimePicker
            timeHandler={timeHandler}
            startTime={startTime}
            endTime={endTime}
          />
        </div>
      </div>
    </>
  );
};

export default TimeTable;
