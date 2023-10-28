import React, { useRef } from "react";
import Button from "../Layout/Button";
import classes from "../page/ClassTableBasic.module.css";

const TimeTable = (props) => {
  const selectRef = useRef();

  const submitHandler = (e, pm, minute) => {
    e.preventDefault();
    props.classStartHandler(selectRef.current.value, pm, minute);
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
        <form onSubmit={submitHandler} className={classes["select-p-m"]}>
          <select ref={selectRef} className={classes["select"]}>
            <option defaultChecked value={"all"}>
              전체
            </option>

            {props?.classTime?.map((cl, index) => (
              <option key={`option-${cl}`} value={index}>
                {cl}
              </option>
            ))}
          </select>
          <Button
            name={"+5분"}
            className={"time-pm-button"}
            onclick={(e) => {
              submitHandler(e, "plus", 5);
            }}
          />
          <Button
            name={"-5분"}
            className={"time-pm-button"}
            onclick={(e) => {
              submitHandler(e, "minus", 5);
            }}
          />
        </form>
      </div>
    </>
  );
};

export default TimeTable;
