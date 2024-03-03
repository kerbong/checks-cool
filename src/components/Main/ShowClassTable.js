import React, { useState, useEffect } from "react";
import classes from "./ClassItem.module.css";
import AttendCalendar from "components/Attendance/AttendCalendar";

import Swal from "sweetalert2";
import dayjs from "dayjs";

//오늘 날짜 yyyy-mm-dd로 만들기
const getDateHandler = (date, titleOrQuery) => {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  if (titleOrQuery === "title") {
    let weekd = date.getDay();
    let weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    return `${year}년 ${month}월 ${day}일(${weekDays[weekd]})`;
  } else {
    return year + "-" + month + "-" + day;
  }
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const STARTBASE = [
  "2022-01-13 08:20",
  "2022-01-13 09:00",
  "2022-01-13 09:50",
  "2022-01-13 10:40",
  "2022-01-13 11:30",
  "2022-01-13 12:10",
  "2022-01-13 13:10",
  "2022-01-13 14:00",
  "2022-01-13 14:50",
  "2022-01-13 15:40",
];

const CLASSLISTS = [
  "아침",
  "1교시",
  "2교시",
  "3교시",
  "4교시",
  "점심",
  "5교시",
  "6교시",
  "방과후",
  "준비물",
];

/** html제외한 텍스트만 반환해서 보여주기 */
const parsingHtml = (origin) => {
  let new_text = "";
  if (origin) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(origin, "text/html");
    new_text = dom?.body?.textContent;
  }
  return new_text;
};

const ShowClassTable = (props) => {
  const [todayYyyymmdd, setTodayYyyymmdd] = useState(
    getDateHandler(new Date())
  );

  const [todayClassTable, setTodayClassTable] = useState({});

  //   const [classTable, setClassTable] = useState([]);
  const [classBasic, setClassBasic] = useState([]);

  const calDateHandler = (date) => {
    setTodayYyyymmdd(dayjs(date).format("YYYY-MM-DD"));
    // setTitleDate(dayjs(date).format(`YYYY년 MM월 DD일(${weekDays[weekd]})`));
  };

  useEffect(() => {
    let new_todayClassTable = {
      id: "",
      classMemo: props.classLists?.map((cl) => {
        return { memo: "", classNum: cl, subject: "" };
      }),
    };
    setTodayClassTable(new_todayClassTable);
  }, [props.classLists]);

  useEffect(() => {
    let todayClass = props.classTable?.filter(
      (data) => data.id === todayYyyymmdd
    )?.[0];

    let today_weekday = new Date(todayYyyymmdd).getDay();
    //기초 시간표 내용 넣기
    if (today_weekday > 0 && today_weekday < 6) {
      let newClassBasic = props.classBasicAll?.[WEEKDAYS[today_weekday]];
      setClassBasic(newClassBasic);
    }

    if (todayClass) {
      let new_classMemo = todayClass?.classMemo?.map((cl, index) => {
        return { ...cl, classNum: props.classLists[index] };
      });
      todayClass.classMemo = new_classMemo;

      setTodayClassTable(todayClass);
    } else {
      let new_todayClassTable = {
        id: "",
        classMemo: props.classLists?.map((cl) => {
          return { memo: "", classNum: cl, subject: "" };
        }),
      };
      setTodayClassTable(new_todayClassTable);
    }
  }, [todayYyyymmdd]);

  /** 두번째 수업 등록 핸들러.. */
  const selectToHandler = (ind, clName) => {
    let new_selectedClass;

    if (!clName) {
      let clNum = props.classLists[ind];
      new_selectedClass = {
        id: todayYyyymmdd,
        classTime: clNum,
        classIndex: ind,
        subject: document
          .getElementById(`classSubject-${clNum}`)
          ?.innerText?.trim(),
        memo:
          todayClassTable?.classMemo?.[ind]?.memo !== ""
            ? todayClassTable?.classMemo?.[ind]?.memo
            : props.classFromSchedule?.[ind]?.includes("@")
            ? props.classFromSchedule?.[ind]?.split("@")?.[2]
            : "",
      };
    } else {
      new_selectedClass = {
        id: todayYyyymmdd,
        classTime: clName,
        classIndex: ind,
        subject: document
          .getElementById(`classSubject-${clName}`)
          ?.innerText?.trim(),
        memo: props.classFromSchedule?.[ind]?.includes("@")
          ? props.classFromSchedule?.[ind]?.split("@")?.[2]
          : "",
      };
    }

    props.classChHandler(new_selectedClass);
  };

  return (
    <div>
      {/* 달력부분 */}
      <div className={classes["cal"]}>
        <span id="todayYYYYMMDD">
          {/* {titleDate} */}
          {/* 오늘 날짜 보여주는 부분 날짜 클릭하면 달력도 나옴 */}
          <span className={classes["hide-cal"]}>
            <AttendCalendar
              getDateValue={calDateHandler}
              about="main"
              setStart={new Date(todayYyyymmdd)}
              getMonthValue={() => {}}
              getYearValue={() => {}}
            />
          </span>
        </span>
      </div>

      {/* 메인화면에 있는 시간표를 보여주기, 클릭하면, 선택하기 */}
      <div>
        <ul className={`${classes["ul-section"]}`}>
          {/* todayClassTable로 렌더링 */}
          {todayClassTable?.classMemo?.map((clInfo, index) => {
            // 만약..기초시간표 변경으로.. 해당 교시가 사라졌다면.. 보여주지 않기
            if (
              props.classLists[index] === undefined ||
              props.classLists[index] === null
            )
              return null;

            // [ {index: ,time: , subject: } ]

            return (
              <div key={index}>
                <hr style={{ width: "100%", margin: "10px 0" }} />
                <li
                  className={classes["li-section"]}
                  title="해당 수업 선택하기"
                  style={{ cursor: "pointer" }}
                  onClick={() => selectToHandler(index)}
                >
                  {/* 교시 시간 */}
                  <div className={classes["title-section"]}>
                    {/* 교시이름 - 1교시 2교시... */}
                    <div className={classes["title-bold"]}>
                      {props.classLists[index]}
                    </div>
                  </div>{" "}
                  -{/* 과목명 - 내용 */}
                  <div
                    className={classes["class-section"]}
                    id={`classSubject-${props.classLists[index]}`}
                  >
                    {/* 과목명 */}{" "}
                    {clInfo?.subject !== ""
                      ? clInfo?.subject
                      : props.classFromSchedule?.[index]?.includes("@")
                      ? props.classFromSchedule?.[index]?.split("@")?.[0]
                      : classBasic?.[index] || ""}
                  </div>
                  {/* 내용 */}
                  <div
                    className={classes["classNote-section"]}
                    id={`classMemo-${props.classLists[index]}`}
                  >
                    {parsingHtml(
                      clInfo?.memo !== ""
                        ? clInfo?.memo
                        : props.classFromSchedule?.[index]?.includes("@")
                        ? props.classFromSchedule?.[index]?.split("@")?.[2]
                        : ""
                    )}
                  </div>
                </li>
              </div>
            );
          })}

          {/* 만약.. 해당 날짜의 자료는 5교시가 최대인데, 기초시간표에 6교시를 추가하면.. classLists로 해당 부분만 렌더링*/}
          {todayClassTable?.classMemo?.length < props.classLists.length &&
            props.classLists?.map((clName, index) => {
              // 만약.. 기존 자료에도 인덱스가 있으면
              if (todayClassTable?.classMemo?.[index]) return null;

              return (
                <div key={clName}>
                  <li
                    className={classes["li-section"]}
                    title="해당 수업 선택하기"
                    style={{ cursor: "pointer" }}
                    onClick={() => selectToHandler(index, clName)}
                  ></li>
                  {/* 교시 시간 */}
                  <div className={classes["title-section"]}>
                    {/* 교시이름 - 1교시 2교시... */}
                    <div className={classes["title-bold"]}>{clName}</div>
                  </div>
                  -{/* 과목명 - 내용 */}
                  <div
                    className={classes["class-section"]}
                    id={`classSubject-${clName}`}
                    style={{ width: "80%" }}
                  >
                    {/* 과목명 */}

                    {classBasic?.[index] || ""}
                  </div>
                  {/* 내용 */}
                  <div
                    className={classes["classNote-section"]}
                    id={`classMemo-${clName}`}
                  >
                    {parsingHtml(
                      props.classFromSchedule?.[index]?.includes("@")
                        ? props.classFromSchedule?.[index]?.split("@")?.[2]
                        : ""
                    )}
                  </div>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ShowClassTable;
