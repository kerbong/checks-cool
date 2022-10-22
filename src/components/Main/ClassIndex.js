import React, { useEffect, useState } from "react";
import Input from "../Layout/Input";
import classes from "./ClassIndex.module.css";

import Button from "../Layout/Button";

const ClassIndex = (props) => {
  const classNum = [1, 2, 3, 4, 5, 6];
  const [classMemo, setClassMemo] = useState(props.todayClass);
  // const [className, setClassName] = useState("");

  useEffect(() => {
    setClassMemo(props.todayClass);
  }, [props.todayClass]);

  const classNameValue = (num) => {
    let classNameV = "";
    if (classMemo.classMemo.length !== 0) {
      console.log(classMemo);
      classNameV = classMemo.classMemo[num - 1]["className"];
    }
    return classNameV;
  };

  const saveClassTable = () => {
    let new_classMemo = {
      id: props.todayYyyymmdd,
      classMemo: [],
    };

    //textarea 인풋창 모두 모음. 6개.
    let classInputAll = document.querySelectorAll(".class-memo");

    //각각의 인덱스를 기준으로 각교시 과목 이름과 메모를 저장함.
    classInputAll.forEach((textarea, index) => {
      let className = document.querySelector(
        `#classSubject-${classNum[index]}`
      );

      new_classMemo["classMemo"].push({
        classNum: classNum[index],
        className: className.value.trim(),
        memo: textarea.value.trim(),
      });
    });
    //데이터는 new_classMemo라는 객체에 저장
    // console.log(new_classMemo);
    props.setClassMemoHandler(new_classMemo);
  };
  return (
    <div key={props.todayYyyymmdd}>
      <ul className={classes["ul-section"]}>
        {classMemo.classMemo
          ? classNum.map((num) => (
              <li className={classes["li-section"]} key={num}>
                <div className={classes["class-section"]}>
                  {num}교시
                  <Input
                    input={{
                      id: `classSubject-${num}`,
                    }}
                    myKey={`classSubject-${num}`}
                    className={"class-subject"}
                    defaultValue={classMemo.classMemo[num - 1] || ""}
                  />
                </div>

                <Input
                  id={`classMemo-${num}`}
                  myKey={"textArea" + num}
                  className={`class-memo`}
                  label="inputData"
                  input={{
                    type: "textarea",
                  }}
                  defaultValue={
                    classMemo.classMemo.length !== 0
                      ? classMemo.classMemo[num - 1]["memo"]
                      : ""
                  }
                />
              </li>
            ))
          : "안돼"}
      </ul>
      <Button name={"저장"} onclick={() => saveClassTable()} />
    </div>
  );
};

export default ClassIndex;
