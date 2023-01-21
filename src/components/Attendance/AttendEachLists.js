import React, { useState, useEffect, useRef } from "react";
import classes from "./AttendEachLists.module.css";
import Button from "../Layout/Button";
import { utils, writeFile } from "xlsx";
import { dbService } from "../../fbase";
import { onSnapshot, doc } from "firebase/firestore";
import dayjs from "dayjs";

const AttendEachLists = (props) => {
  const [studentAttendList, setStudentAttendList] = useState([]);
  const [studentLists, setStudentLists] = useState([]);
  const [attendLists, setAttendLists] = useState([]);
  const [yearAttendLists, setYearAttendLists] = useState([]);

  const [showPastFirst, setShowPastFirst] = useState(true);
  const [showAttendOption, setShowAttendOption] = useState("");
  const [studentOn, setStudentOn] = useState("none");
  const [dataYears, setDataYears] = useState([]);
  //선택된 학급 이름
  const [nowClassName, setNowClassName] = useState("");

  const studentSelectRef = useRef();
  const selectClassRef = useRef();

  const getAttendListsFromDb = () => {
    let attendRef = doc(dbService, "attend", props.userUid);

    onSnapshot(attendRef, (doc) => {
      setAttendLists([]);
      let new_attends = [];
      const years = [];

      const addYearData = (data, cl) => {
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

        //전담일경우 학급도 데이터에 추가하기
        if (props.isSubject) {
          new_data = { ...new_data, clName: Object.keys(cl)[0] };
        }
        // console.log(new_attends);
        new_attends.push(new_data);
      };

      if (!props.isSubject) {
        doc?.data()?.attend_data?.forEach((data) => {
          addYearData(data, "none");
        });

        // 전담용 로직
      } else {
        doc?.data()?.attend_data?.forEach((cl) => {
          //학급[1반] 의 []배열 요소인 학생 출결자료를 수정
          cl[Object.keys(cl)[0]].forEach((data) => {
            addYearData(data, cl);
          });
        });
      }
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

    if (!props.isSubject) {
      let studentsOnDatas = list.map((data) => data.student_name);
      setStudentLists([...new Set(studentsOnDatas)]);
    }
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

  //학급 선택시 studentAttendList에 넣는 함수
  const selectClassHandler = () => {
    let className = selectClassRef.current.value;
    // console.log(className);
    setNowClassName(className);
  };

  useEffect(() => {
    if (yearAttendLists.length > 0) {
      if (nowClassName === "전체학급") {
        setStudentAttendList([...yearAttendLists]);
        //학생 선택하는 셀렉트 태그를 위한 값 설정
        let studentsOnDatas = yearAttendLists.map((data) => data.student_name);
        setStudentLists([...new Set(studentsOnDatas)]);

        //특정학급 선택하면
      } else if (nowClassName) {
        let new_attends = yearAttendLists.filter(
          (data) => data.clName === nowClassName
        );
        setStudentAttendList(new_attends);
        //학생 선택하는 셀렉트 태그를 위한 값 설정
        let studentsOnDatas = new_attends.map((data) => data.student_name);
        setStudentLists([...new Set(studentsOnDatas)]);
      }
    }
  }, [nowClassName]);

  //엑셀로 저장하기 함수
  const saveExcelHandler = () => {
    const new_datas = [];
    yearAttendLists.forEach((atd) => {
      let data = [
        +atd.student_num,
        atd.student_name,
        atd.option.slice(1),
        `${atd.id.slice(5, 7)}월`,
        `${atd.id.slice(8, 10)}일`,
        atd.note,
      ];
      if (props.isSubject) {
        data.unshift(atd.clName);
      }
      new_datas.push(data);
    });

    if (!props.isSubject) {
      new_datas.unshift([
        "번호",
        "이름",
        "출결옵션",
        "날짜(월)",
        "날짜(일)",
        "비고",
      ]);
    } else {
      new_datas.unshift([
        "반",
        "번호",
        "이름",
        "출결옵션",
        "날짜(월)",
        "날짜(일)",
        "비고",
      ]);
    }
    //새로운 가상 엑셀파일 생성
    const book = utils.book_new();
    const attend_datas = utils.aoa_to_sheet(new_datas);
    //셀의 넓이 지정
    attend_datas["!cols"] = [
      { wpx: 30 },
      { wpx: 60 },
      { wpx: 60 },
      { wpx: 40 },
      { wpx: 40 },
      { wpx: 100 },
    ];
    if (props.isSubject) {
      attend_datas["!cols"].unshift({ wpx: 30 });
    }

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, attend_datas, "출결기록");

    writeFile(
      book,
      `${
        document.getElementById("year-select").value
      }학년도 출결기록(${dayjs().format("YYYY-MM-DD")}).xlsx`
    );
  };

  return (
    <>
      <div className={classes["select-area"]}>
        <div className={classes["select-div"]}>
          {/* 년도 선택하는 부분 */}
          <select
            id="year-select"
            name="year-select"
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

          {/* 학급 선택부분 - 전담교사만 보임 */}
          {props.isSubject && (
            <select
              ref={selectClassRef}
              onChange={selectClassHandler}
              className={classes[`student-select`]}
              value={nowClassName}
            >
              <option value="">--학급--</option>
              {yearAttendLists.length > 0 && (
                <option value={"전체학급"} key={"전체학급"}>
                  {"전체학급"}
                </option>
              )}
              {props.students?.map((cl) => (
                <option key={Object.keys(cl)} value={Object.keys(cl)}>
                  {Object.keys(cl)}
                </option>
              ))}
            </select>
          )}

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
            {yearAttendLists.length > 0 && !props.isSubject && (
              <option value={"전체학생"} key={"전체학생"}>
                {"전체학생"}
              </option>
            )}

            {/* 전담이 아닐경우 학생 보여주기 */}
            {!props.isSubject &&
              studentLists?.map((student) => (
                <option value={student} key={student}>
                  {student}
                </option>
              ))}

            {/* 전담일 경우 학급이 선택되면 */}
            {nowClassName !== "" &&
              studentLists?.map((student) => {
                if (nowClassName !== "전체학급") {
                }
                return (
                  <option value={student} key={student}>
                    {student}
                  </option>
                );
              })}
          </select>

          {/* 년도를 선택해야 저장이 가능한 엑셀저장버튼 보임 */}
          {yearAttendLists.length > 0 && (
            <Button
              id={"saveExcel"}
              className={"sortBtn"}
              name={"엑셀저장"}
              onclick={saveExcelHandler}
            />
          )}
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
            ? // {/* 전체학생 보여주는 로직 */}
              studentAttendList.map((data) => (
                <div key={data.id}>
                  <li className={classes.li}>
                    <p className={classes.p}>
                      📅
                      {yearMonthDay(data.id.slice(0, 10))}
                      {` | ${
                        props.isSubject === false ? "" : data.clName + " - "
                      } ${data.student_name}`}
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
                      <p className={classes.p}>
                        📅
                        {yearMonthDay(data.id.slice(0, 10))}
                        {` | ${
                          props.isSubject === false ? "" : data.clName + " - "
                        }  ${data.student_name}`}
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
