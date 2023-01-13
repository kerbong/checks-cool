import React, { useState, useEffect } from "react";
import ExampleModal from "./ExampleModal";
import classes from "./ClassTableBasic.module.css";
import Button from "../Layout/Button";
import Swal from "sweetalert2";
import { dbService } from "../../fbase";

import { doc, updateDoc, onSnapshot } from "firebase/firestore";

const ClassTableBasic = (props) => {
  const [showExample, setShowExample] = useState(false);
  const [items, setItems] = useState(false);
  const [classBasic, setClassBasic] = useState([]);

  const WEEKDAYS = ["월", "화", "수", "목", "금"];
  const CLASSTIME = ["아침", "1", "2", "3", "4", "5", "6", "방과후"];
  const itemsNumArray = [...Array(40).keys()].map((i) => i);

  //시간표의 인풋창들 만들기, 저장된 기존 기초시간표 자료가 있으면 재랜더링해서 값 넣어주기.
  useEffect(() => {
    setItems(
      itemsNumArray.map((item, index) => (
        <div className={classes["input-div"]} key={`table-${item}`}>
          <input
            className={classes["input"]}
            type="text"
            id={`table-${item}`}
            placeholder={""}
            defaultValue={classBasic[index]}
          />
        </div>
      ))
    );
  }, [classBasic]);

  //기존에 저장했던 기초시간표 불러와서 넣어주기
  useEffect(() => {
    let classTableRef = doc(dbService, "classTable", props.userUid);

    setClassBasic([]);

    onSnapshot(classTableRef, (doc) => {
      let new_classBasic = [];
      CLASSTIME.forEach((cl_title, cl_index) => {
        WEEKDAYS.forEach((wd) => {
          new_classBasic.push(doc.data()[wd][cl_index]);
        });
      });
      setClassBasic([...new_classBasic]);
    });
    // console.log(new_classBasic);
  }, []);

  const saveClassBasicHandler = async () => {
    let 월 = [];
    let 화 = [];
    let 수 = [];
    let 목 = [];
    let 금 = [];
    //빈칸을 기준으로 과목을 요일별로 저장함.
    const classBasicRef = doc(dbService, "classTable", props.userUid);

    itemsNumArray.forEach(async (item) => {
      // 월요일 자료
      if (+item % 5 === 0) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        월.push(subject);

        await updateDoc(classBasicRef, { 월: [...월] });
      }

      // 화요일 자료
      if (+item % 5 === 1) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        화.push(subject);
        await updateDoc(classBasicRef, { 화: [...화] });
      }

      // 수요일 자료
      if (+item % 5 === 2) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        수.push(subject);
        await updateDoc(classBasicRef, { 수: [...수] });
      }

      // 목요일 자료
      if (+item % 5 === 3) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        목.push(subject);
        await updateDoc(classBasicRef, { 목: [...목] });
      }

      // 금요일 자료
      if (+item % 5 === 4) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        금.push(subject);
        await updateDoc(classBasicRef, { 금: [...금] });
      }
    });

    Swal.fire({
      icon: "success",
      title: "저장 완료",
      text: "기초시간표가 저장되었습니다. 5초 후에 창이 사라집니다.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });
  };

  return (
    <>
      {showExample && (
        <ExampleModal
          onClose={() => setShowExample(false)}
          imgSrc={""}
          text={
            <>
              <p
                style={{
                  fontSize: "1.3em",
                  textAlign: "center",
                  margin: "5px",
                }}
              >
                === 기초시간표기록 예시 ===
              </p>
              <p style={{ margin: "15px" }}>
                * 화면 왼쪽 상단의 현재 페이지 타이틀을 클릭하시면 다시 보실 수
                있어요!
              </p>
            </>
          }
        />
      )}
      <div id="title-div">
        <button
          id="title-btn"
          className="consult"
          onClick={() => setShowExample(true)}
        >
          <i className="fa-solid fa-table"></i> 기초시간표
        </button>
      </div>
      <div className={classes["title-class-container"]}>
        <div className={classes["title-class"]}></div>
        <div className={classes["title-weekday"]}>
          {WEEKDAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
      <div className={classes["title-class-container"]}>
        <div className={classes["title-class"]}>
          {CLASSTIME.map((ct) => (
            <span key={ct}>{ct}</span>
          ))}
        </div>
        <div className={classes["container"]}>{items}</div>
      </div>
      <Button
        name={"시간표 저장"}
        className={"show-basicClass-button"}
        onclick={saveClassBasicHandler}
      />
      <div>1교시 시작</div>
    </>
  );
};

export default ClassTableBasic;
