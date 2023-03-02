import React, { useState, useEffect } from "react";
import ExampleModal from "./ExampleModal";
import classes from "./ClassTableBasic.module.css";
import Button from "../Layout/Button";
import Swal from "sweetalert2";
import TimeTable from "../Main/TimeTable";
import { dbService } from "../../fbase";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import dayjs from "dayjs";
const STARTBASE = [
  "2022-01-13 08:20",
  "2022-01-13 09:00",
  "2022-01-13 09:50",
  "2022-01-13 10:40",
  "2022-01-13 11:30",
  "2022-01-13 13:10",
  "2022-01-13 14:00",
  "2022-01-13 14:50",
];
const CLASSTIME = [
  "아침",
  "1교시",
  "2교시",
  "3교시",
  "4교시",
  "5교시",
  "6교시",
  "방과후",
];

const ClassTableBasic = (props) => {
  const [showExample, setShowExample] = useState(false);
  const [items, setItems] = useState(false);
  const [classBasic, setClassBasic] = useState([]);
  const [classStart, setClassStart] = useState([]);
  const [classTime, setClassTime] = useState(CLASSTIME);

  const WEEKDAYS = ["월", "화", "수", "목", "금"];

  const itemsNumArray = [...Array(40).keys()]?.map((i) => i);

  //시간표의 인풋창들 만들기, 저장된 기존 기초시간표 자료가 있으면 재랜더링해서 값 넣어주기.
  useEffect(() => {
    setItems(
      itemsNumArray?.map((item, index) => (
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

  //기존에 저장했던 기초시간표, 시작시각 불러와서 넣어주기
  useEffect(() => {
    const getClassTable = async () => {
      let classTableRef = doc(dbService, "classTable", props.userUid);

      const now_doc = await getDoc(classTableRef);

      if (now_doc?.data()?.classStart) {
        let new_classBasic = [];
        CLASSTIME.forEach((cl_title, cl_index) => {
          WEEKDAYS.forEach((wd) => {
            new_classBasic.push(now_doc.data()?.[wd]?.[cl_index]);
          });
        });
        setClassBasic([...new_classBasic]);
        setClassStart([...now_doc.data()?.classStart]);
      } else {
        setClassBasic([]);
        setClassStart([...STARTBASE]);
      }

      if (now_doc?.data()?.classTime) {
        setClassTime(now_doc?.data()?.classTime);
      }
    };

    setClassBasic([]);

    getClassTable();
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

    itemsNumArray.forEach((item) => {
      // 월요일 자료
      if (+item % 5 === 0) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        월.push(subject);

        // await updateDoc(classBasicRef, { 월: [...월] });
      }

      // 화요일 자료
      if (+item % 5 === 1) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        화.push(subject);
        // await updateDoc(classBasicRef, { 화: [...화] });
      }

      // 수요일 자료
      if (+item % 5 === 2) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        수.push(subject);
        // await updateDoc(classBasicRef, { 수: [...수] });
      }

      // 목요일 자료
      if (+item % 5 === 3) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        목.push(subject);
        // await updateDoc(classBasicRef, { 목: [...목] });
      }

      // 금요일 자료
      if (+item % 5 === 4) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        금.push(subject);
        // await updateDoc(classBasicRef, { 금: [...금] });
      }
    });

    // 교시 이름 설정하기
    let new_classTime = [];
    CLASSTIME.forEach((cl, index) => {
      let clt_name = document.querySelectorAll(
        `input[id="classTime-${index}"]`
      )[0].value;
      new_classTime.push(clt_name);
    });

    const now_doc = await getDoc(classBasicRef);
    if (now_doc.exists()) {
      await updateDoc(classBasicRef, {
        월: [...월],
        화: [...화],
        수: [...수],
        목: [...목],
        금: [...금],
        classStart: [...classStart],
        classTime: [...new_classTime],
      });
    } else {
      await setDoc(classBasicRef, {
        월: [...월],
        화: [...화],
        수: [...수],
        목: [...목],
        금: [...금],
        classStart: [...classStart],
        classTime: [...new_classTime],
      });
    }

    Swal.fire({
      icon: "success",
      title: "저장 완료",
      text: "기초시간표가 저장되었습니다. 5초 후에 창이 사라집니다.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });
  };

  //시간표 시간 수정하는 함수
  const classStartHandler = (what, plusMinus, minute) => {
    let new_classStart = [];
    classStart.forEach((cl, index) => {
      //모두 변경이 아니고, what과 인덱스가 다르면 변경하지 않음
      if (what !== "all" && +what !== index) {
        new_classStart.push(cl);
        return;
      }
      //더할까 뺄까?
      if (plusMinus === "plus") {
        new_classStart.push(
          dayjs(cl).add(+minute, "minute").format("YYYY-MM-DD HH:mm")
        );
      } else {
        new_classStart.push(
          dayjs(cl).subtract(+minute, "minute").format("YYYY-MM-DD HH:mm")
        );
      }
    });
    setClassStart([...new_classStart]);
  };

  //초기화 함수
  const returnBaseHandler = () => {
    Swal.fire({
      icon: "info",
      title: "초기화 할까요?",
      text: "시간표 전체와 교시별 시간을 모두 초기화 할까요? (초기화 후 저장해주세요.)",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: true,
      denyButtonText: "취소",
      timer: 5000,
    }).then((result) => {
      if (result.isConfirmed) {
        //시간초기화
        setClassStart([...STARTBASE]);
        //교시별 과목 초기화
        setClassBasic([]);
        //교시 이름 초기화
        setClassTime(CLASSTIME);
      }
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
        {/* 화면 좌상단 타이틀 */}
        <button
          id="title-btn"
          className="consult"
          onClick={() => setShowExample(true)}
        >
          <i className="fa-solid fa-table"></i> 기초시간표
        </button>
      </div>

      <div className={classes["title-class-container"]}>
        {/* 월화수목금 표시 */}
        <div className={classes["title-class"]}></div>
        <div className={classes["title-weekday"]}>
          {WEEKDAYS?.map((day) => (
            <span key={day} style={{ fontWeight: "bold" }}>
              {day}
            </span>
          ))}
        </div>
      </div>

      <div className={classes["title-class-container"]}>
        {/* 아침~ 6교시, 방과후 표시 */}
        <div className={classes["title-class"]}>
          {classTime?.map((ct, index) => (
            <div key={ct} className={classes["title-class-div"]}>
              {/* 1교시 */}
              <div style={{ fontWeight: "bold" }}>
                <input
                  className={classes["time-input"]}
                  type="text"
                  id={`classTime-${index}`}
                  placeholder={""}
                  defaultValue={ct}
                />
              </div>
              <div className={classes["timeRanges"]}>
                {/* 시간표시 09:00~09:40 */}
                <div className={classes["timeRange"]}>{`${dayjs(
                  classStart[index]
                ).format("HH:mm")} `}</div>
                <div className={classes["timeRange"]}>{` ~ ${dayjs(
                  classStart[index]
                )
                  .add(40, "minute")
                  .format("HH:mm")}`}</div>
              </div>
            </div>
          ))}
        </div>
        {/* 인풋창, 40개 */}
        <div className={classes["container"]}>{items}</div>
      </div>
      <div className={classes["select-p-m"]}>
        <Button
          name={"저장"}
          className={"save-classTable-button"}
          onclick={saveClassBasicHandler}
        />
      </div>

      <TimeTable
        classStartHandler={classStartHandler}
        classTime={classTime}
        returnBaseHandler={returnBaseHandler}
      />
    </>
  );
};

export default ClassTableBasic;
