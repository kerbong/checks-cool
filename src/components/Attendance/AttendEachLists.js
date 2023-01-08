import React, { useState, useEffect, useRef } from "react";
import classes from "./AttendEachLists.module.css";
import Button from "../Layout/Button";

import { dbService } from "../../fbase";
import { onSnapshot, doc } from "firebase/firestore";

const AttendEachLists = (props) => {
  const [studentAttendList, setStudentAttendList] = useState([]);
  const [studentLists, setStudentLists] = useState([]);
  const [attendLists, setAttendLists] = useState([]);
  const [yearAttendLists, setYearAttendLists] = useState([]);

  const [showPastFirst, setShowPastFirst] = useState(true);
  const [showAttendOption, setShowAttendOption] = useState("");
  const [studentOn, setStudentOn] = useState("none");
  const [dataYears, setDataYears] = useState([]);

  const studentSelectRef = useRef();

  const getAttendListsFromDb = () => {
    let attendRef = doc(dbService, "attend", props.userUid);

    onSnapshot(attendRef, (doc) => {
      setAttendLists([]);
      const new_attends = [];
      const years = [];
      doc?.data()?.attend_data?.forEach((data) => {
        //22.3.1~23.2.28까지 년도로 묶음
        let data_year = data.id.slice(0, 4);
        let data_month = data.id.slice(5, 7);
        let new_data = {};
        if (+data_month >= 3) {
          years.push(data_year);
          //자료에 년도를 yearGroup으로 추가해둠
          new_data = { ...data, yearGroup: data_year };
        } else if (+data_month <= 2) {
          let fixed_year = String(+data_year - 1);
          years.push(fixed_year);
          new_data = { ...data, yearGroup: fixed_year };
        }
        new_attends.push(new_data);
      });
      //학년도를 저장해둠.
      setDataYears([...new Set(years)]);
      setAttendLists([...new_attends]);
    });
  };

  useEffect(() => {
    getAttendListsFromDb();
  }, []);

  const sortList = (list, upOrDown) => {
    const sorted_lists = list.sort(function (a, b) {
      let a_date = `${a.id.slice(0, 10)}`;
      let b_date = `${b.id.slice(0, 10)}`;
      return new Date(a_date) - new Date(b_date);
    });

    if (upOrDown === "up") {
      sorted_lists.reverse();
    }
    return sorted_lists;
  };

  const studentAttendListHandler = (e) => {
    const student = e.target.value;
    setStudentOn(student);
    if (student === "전체학생") {
      setStudentAttendList(yearAttendLists);
    } else {
      const list = yearAttendLists.filter(
        (data) => data.student_name === student
      );
      setStudentAttendList(list);
    }
    //출결옵션부분도 초기화
    setShowAttendOption("");
  };

  //년도를 기준으로 출결기록 세팅하기(셀렉트 옵션 선택시 실행되는 함수)
  const setYearGroupHandler = (e) => {
    const year_group = e.target.value;
    const list = attendLists.filter((data) => data.yearGroup === year_group);
    setYearAttendLists(list);

    //선택된 학생(셀렉트 태그) 초기화
    studentSelectRef.current.value = "";
    //출결옵션부분과 학생 리스트도 초기화
    setShowAttendOption("");
    setStudentAttendList([]);

    let studentsOnDatas = list.map((data) => data.student_name);
    setStudentLists([...new Set(studentsOnDatas)]);
  };

  const timeSortedHandler = (upOrDown, tOrF) => {
    setStudentAttendList((prev) => sortList(prev, upOrDown));
    setShowPastFirst(tOrF);
  };

  const yearMonthDay = (yyyymmdd) => {
    const year = yyyymmdd.split("-")[0];
    const month = yyyymmdd.split("-")[1].replace(/(^0+)/, "");
    const day = yyyymmdd.split("-")[2].replace(/(^0+)/, "");
    return year + "년 " + month + "월 " + day + "일  ";
  };

  return (
    <>
      <div className={classes["select-area"]}>
        <div className={classes["select-div"]}>
          {/* 년도 선택하는 부분 */}
          <select
            name="year-selcet"
            className={classes[`student-select`]}
            required
            defaultValue={""}
            onChange={setYearGroupHandler}
          >
            <option value="" defaultChecked>
              -- 학년도 --
            </option>

            {dataYears?.map((year) => (
              <option value={year} key={year}>
                {year}학년도
              </option>
            ))}
          </select>

          {/* 학생 선택하는 부분 */}
          <select
            name="student-selcet"
            ref={studentSelectRef}
            id="student-selcet"
            className={classes[`student-select`]}
            required
            defaultValue={""}
            onChange={studentAttendListHandler}
          >
            <option value="" defaultChecked>
              -- 학생 --
            </option>
            {yearAttendLists.length > 0 && (
              <option value={"전체학생"} key={"전체학생"}>
                {"전체학생"}
              </option>
            )}

            {studentLists?.map((student) => (
              <option value={student} key={student}>
                {student}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 정렬하는 부분 */}
      <div className={classes["sortBtnArea"]}>
        {showPastFirst ? (
          <Button
            id={"current"}
            className={"sortBtn"}
            name={"최신순"}
            onclick={() => {
              timeSortedHandler("up", false);
            }}
          />
        ) : (
          <Button
            id={"past"}
            className={"sortBtn"}
            name={"과거순"}
            onclick={() => {
              timeSortedHandler("down", true);
            }}
          />
        )}

        {/* 해당학생의 전체 출결자료 보여주기 */}
        {studentOn !== "none" && (
          <Button
            key={`whole${studentOn}`}
            id={`whole${studentOn}`}
            className={showAttendOption === "" ? "sortBtn-clicked" : "sortBtn"}
            name={`전체(${studentAttendList.length})`}
            onclick={() => {
              setShowAttendOption("");
            }}
          />
        )}

        {/* 현재 화면에 보여지는 리스트에서 출결 옵션만 뽑고 중복제거해서 버튼으로 보여주기 */}
        {[...new Set(studentAttendList.map((data) => data.option))].map(
          (option) => (
            <Button
              key={option}
              id={option}
              className={
                showAttendOption === option ? "sortBtn-clicked" : "sortBtn"
              }
              name={`${option.slice(1)} (${
                studentAttendList.filter((data) => data.option === option)
                  .length
              })`}
              onclick={() => {
                setShowAttendOption(option);
              }}
            />
          )
        )}
      </div>

      {studentAttendList.length > 0 && (
        <ul className={classes.ul}>
          {showAttendOption === ""
            ? studentAttendList.map((data) => (
                <div key={data.id}>
                  <li className={classes.li}>
                    <p>
                      📅 {yearMonthDay(data.id.slice(0, 10))}
                      {` | ${data.student_name}`}
                    </p>
                    <p>
                      <span>{` ${data.option.slice(1)}`}</span>{" "}
                      <span>{` | ${data.note || "-"}`}</span>
                    </p>
                  </li>
                  <hr />
                </div>
              ))
            : // showAttendOption 클릭한 출결옵션과 같은지 확인하고 보여주기
              studentAttendList
                .filter((data) => data.option === showAttendOption)
                .map((data) => (
                  <div key={data.id}>
                    <li className={classes.li}>
                      <p>
                        📅 {yearMonthDay(data.id.slice(0, 10))}
                        {` | ${data.student_name}`}
                      </p>
                      <p>
                        <span>{` ${data.option.slice(1)}`}</span>{" "}
                        <span>{` | ${data.note || "-"}`}</span>
                      </p>
                    </li>
                    <hr />
                  </div>
                ))}
          <span>
            *학생별 출결 확인탭 입니다. <br />
            내용의 수정 변경은 달력, 명렬표를 활용해주세요.
          </span>
        </ul>
      )}
    </>
  );
};

export default AttendEachLists;
