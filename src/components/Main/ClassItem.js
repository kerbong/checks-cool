import React, { useEffect, useState } from "react";
import Input from "../Layout/Input";
import classes from "./ClassItem.module.css";
import dayjs from "dayjs";

const ClassItem = (props) => {
  return (
    <>
      <li className={classes["li-section"]} key={props.myKey}>
        <div className={classes["title-section"]}>
          <div>{props.classNum}</div>
          {/* 시간표시 09:00~09:40 */}
          <div className={classes["fs-09"]}>
            <div>
              {props?.classStart
                ? `${dayjs(props?.classStart).format("HH:mm")}`
                : ""}
            </div>
            <div>
              {props?.classStart
                ? ` ~ ${dayjs(props?.classStart)
                    .add(40, "minute")
                    .format("HH:mm")}`
                : ""}
            </div>
          </div>
        </div>
        <div className={classes["class-section"]}>
          <Input
            input={{
              id: `classSubject-${props.classNum}`,
            }}
            key={"classNameInput"}
            myKey={`classSubject-${props.classNum}`}
            className={"class-subject"}
            defaultValue={props.subject}
          />
        </div>

        <div className={classes["classNote-section"]}>
          <Input
            key={"memoInput"}
            id={`classMemo-${props.classNum}`}
            myKey={`classMemo-${props.classNum}`}
            className={`class-memo`}
            label="inputData"
            input={{
              type: "textarea",
            }}
            defaultValue={props.memo}
          />
        </div>
      </li>
    </>
  );
};

export default ClassItem;
