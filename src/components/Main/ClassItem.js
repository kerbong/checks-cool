import React, { useEffect, useState } from "react";
import Input from "../Layout/Input";
import classes from "./ClassItem.module.css";

const ClassItem = (props) => {
  return (
    <>
      <li className={classes["li-section"]} key={props.myKey}>
        <div className={classes["class-section"]}>
          {props.classNum}교시
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
