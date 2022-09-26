import React, { useState, useEffect } from "react";
import classes from "./AttendEachLists.module.css";
import Button from "../Layout/Button";

import { dbService } from "../../fbase";
import { collection, query, onSnapshot, where } from "firebase/firestore";

const AttendEachLists = (props) => {
  const [studentAttendList, setStudentAttendList] = useState([]);
  const [showPastFirst, setShowPastFirst] = useState(true);
  const [showAttendOption, setShowAttendOption] = useState("");
  const [attendLists, setAttendLists] = useState([]);
  const [studentOn, setStudentOn] = useState("none");

  const getAttendListsFromDb = () => {
    let queryWhere = query(
      collection(dbService, "attend"),
      where("writtenId", "==", props.userUid)
    );
    // console.log(queryWhere);

    onSnapshot(queryWhere, (snapShot) => {
      snapShot.docs.map((doc) => {
        const eventObj = {
          ...doc.data(),
          doc_id: doc.id,
        };
        return setAttendLists((prev) => {
          prev.forEach((prev_data, index) => {
            if (prev_data.id === eventObj.id) {
              prev.splice(index, 1);
            }
          });

          return [...prev, eventObj];
        });
      });
    });
  };

  useEffect(() => {
    getAttendListsFromDb();
  }, []);

  let studentsOnDatas = attendLists.map((data) => data.student_name);
  let studentsLists = [...new Set(studentsOnDatas)];

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
      setStudentAttendList(attendLists);
    } else {
      const list = attendLists.filter((data) => data.student_name === student);
      setStudentAttendList(list);
    }
    //출결옵션부분도 초기화
    setShowAttendOption("");
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
        <select
          name="student-selcet"
          className={classes[`student-select`]}
          required
          defaultValue={""}
          onChange={studentAttendListHandler}
        >
          <option value="" disabled>
            -- 학생 --
          </option>
          <option value={"전체학생"} key={"전체학생"}>
            {"전체학생"}
          </option>
          {studentsLists.map((student) => (
            <option value={student} key={student}>
              {student}
            </option>
          ))}
        </select>
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
