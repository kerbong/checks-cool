import React, { useContext, useState } from "react";
import AttendContext from "../../store/attend-context";
import classes from "./AttendEachLists.module.css";
import Button from "../Layout/Button";

const AttendEachLists = () => {
  const [studentAttendList, setStudentAttendList] = useState([]);
  const [showPastFirst, setShowPastFirst] = useState(true);
  const [showAttendOption, setShowAttendOption] = useState("");

  const anyContext = useContext(AttendContext);

  let studentsOnDatas = anyContext.datas.map((data) => data.student_name);
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
    const list = anyContext.datas.filter(
      (data) => data.student_name === student
    );
    setStudentAttendList(list);
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

        {/* 현재 화면에 보여지는 리스트에서 출결 옵션만 뽑고 중복제거해서 버튼으로 보여주기 */}
        {[...new Set(studentAttendList.map((data) => data.option))].map(
          (option) => (
            <Button
              key={option}
              id={option}
              className={"sortBtn"}
              name={option.slice(1)}
              onclick={() => {
                setShowAttendOption(option);
              }}
            />
          )
        )}
      </div>

      {studentAttendList && (
        <ul className={classes.ul}>
          {showAttendOption === ""
            ? studentAttendList.map((data) => (
                <>
                  <li className={classes.li} key={data.id}>
                    <p>
                      {yearMonthDay(data.id.slice(0, 10))}
                      <span>{` | ${data.option.slice(1)}`}</span>{" "}
                      <span>{` | ${data.note || "-"}`}</span>
                    </p>
                  </li>
                  <hr />
                </>
              ))
            : // showAttendOption 클릭한 출결옵션과 같은지 확인하고 보여주기
              studentAttendList
                .filter((data) => data.option === showAttendOption)
                .map((data) => (
                  <>
                    <li className={classes.li} key={data.id}>
                      <p>
                        {yearMonthDay(data.id.slice(0, 10))}
                        <span>{`  ${data.option.slice(1)}`}</span>{" "}
                        <span>{` | ${data.note || "-"}`}</span>
                      </p>
                    </li>
                    <hr />
                  </>
                ))}
          <span>
            *학생별 출결 확인탭 입니다. 내용의 수정 변경은 달력, 명렬표를
            활용해주세요.
          </span>
        </ul>
      )}
    </>
  );
};

export default AttendEachLists;
