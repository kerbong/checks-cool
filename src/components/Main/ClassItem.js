import React, { useEffect, useState } from "react";
import Input from "../Layout/Input";
import classes from "./ClassItem.module.css";
import dayjs from "dayjs";
import NotionClone from "components/Classgame/Crawling/NotionClone";

const ClassItem = (props) => {
  const [memoDefValue, setMemoDefValue] = useState("");

  useEffect(() => {
    if (props.memo) {
      setMemoDefValue(props.memo);
    } else {
      setMemoDefValue("");
    }
  }, [props.memo]);
  return (
    <>
      <li className={classes["li-section"]} key={props.myKey}>
        <div className={classes["title-section"]}>
          {/* 교시이름 - 1교시 2교시... */}
          <div className={classes["title-bold"]}>{props.classNum}</div>
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
            showOn={true}
            startheight={"25px"}
            key={`classSubject-${props.classNum}`}
            myKey={`classSubject-${props.classNum}`}
            className={"class-subject"}
            defaultValue={props.subject || ""}
          />
        </div>

        <div className={classes["classNote-section"]}>
          <NotionClone
            id={`classMemo-${props.classNum}`}
            myKey={`classMemo-${props.classNum}`}
            className={"class-memo"}
            defaultValue={memoDefValue}
          />
          {/* <Input
            key={`classMemo-${props.classNum}`}
            id={`classMemo-${props.classNum}`}
            myKey={`classMemo-${props.classNum}`}
            className={`class-memo`}
            label="inputData"
            input={{
              type: "textarea",
            }}
            defaultValue={memoDefValue}
          /> */}
        </div>
      </li>
    </>
  );
};

export default ClassItem;
