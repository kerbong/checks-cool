import React, { useState, useEffect } from "react";
import ManageEach from "./ManageEach";
import dayjs from "dayjs";
import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router";
import classes from "./ManageEach.module.css";
import Button from "components/Layout/Button";
import { utils, writeFile } from "xlsx";

const ManageAttendance = (props) => {
  const [onStudent, setOnStudent] = useState("");
  const [clName, setClName] = useState("");
  const [attends, setAttends] = useState([]);
  const [onAttends, setOnAttends] = useState([]);
  const [showOnAttends, setShowOnAttends] = useState([]);
  const [onAttendsOption, setOnAttendsOption] = useState([]);
  const [showAttendOption, setShowAttendOption] = useState("");
  const [showAttendMonth, setShowAttendMonth] = useState("");

  const { state } = useLocation();

  const nowYear = (dataId) => {
    let data_id = dataId ? dataId : new Date();
    return +dayjs(data_id).format("MM") <= 2
      ? String(+dayjs(data_id).format("YYYY") - 1)
      : dayjs(data_id).format("YYYY");
  };

  //해당학년도의 전담여부 확인해서 설정하는 함수
  const changeSubjectHandler = (data_year) => {
    let isSubject;
    if (props.isSubject) {
      isSubject = props.isSubject?.filter(
        (yearData) => Object.keys(yearData)[0] === data_year
      )?.[0]?.[data_year];
    }
    return isSubject;
  };

  const nowIsSubject = changeSubjectHandler(nowYear());

  //firestore에서 checkLists와 listMemo 둘다 받아서 저장해두기
  const getDatasFromDb = async () => {
    //checkLists 부분, 올해 자료만 저장하기
    setAttends([]);
    let attendRef = doc(dbService, "attend", props.userUid);
    const attendSnap = await getDoc(attendRef);

    //id가 이번학년도 인 자료만 저장해둠.
    onSnapshot(attendRef, (doc) => {
      if (attendSnap.exists()) {
        let new_attend = [];

        //담임이면
        if (!nowIsSubject) {
          new_attend = doc
            .data()
            ?.attend_data?.filter(
              (data) => nowYear(data.id.slice(0, 10)) === nowYear()
            );

          //전담이면
        } else {
          //풀어서 데이터 넣어주기
          doc.data()?.attend_data?.forEach((clData) => {
            Object.values(clData)?.[0]?.forEach((attend) => {
              // 학급명 추가한 후에 하나씩 넣기
              attend.clName = Object.keys(clData)?.[0];
              new_attend.push(attend);
            });
          });
        }

        setAttends([
          ...new_attend.sort((a, b) => a.id.slice(0, 10) > b.id.slice(0, 10)),
        ]);
      }
    });
  };

  useEffect(() => {
    getDatasFromDb();
  }, []);

  //선택된 학생에 따라 정보를 필터해서 보여줌.
  useEffect(() => {
    const optionSaveHandler = (datas) => {
      //총 정리한 부분에서 option만 따옴
      let new_datasOption = datas?.map((data) => data.option.slice(1));
      setOnAttendsOption(new_datasOption);
    };

    let new_onAttends = [];

    if (onStudent !== "") {
      //담임이면
      if (!nowIsSubject) {
        new_onAttends =
          attends
            ?.filter((attend) => attend.name === onStudent.split(" ")[1])
            ?.sort((a, b) =>
              a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1
            ) || [];
        //전담이면
      } else {
        new_onAttends =
          attends
            ?.filter(
              (attend) =>
                attend.name === onStudent.split(" ")[1] &&
                attend.clName === clName
            )
            ?.sort((a, b) =>
              a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1
            ) || [];
      }

      // 선택된 학생이 없을 경우
    } else {
      //담임이면
      if (!nowIsSubject) {
        new_onAttends = [...attends].sort((a, b) =>
          a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1
        );

        //전담이면
      } else {
        new_onAttends =
          attends
            ?.filter((attend) => attend.clName === clName)
            ?.sort((a, b) =>
              a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1
            ) || [];
      }
    }
    setOnAttends(new_onAttends);
    setShowOnAttends(new_onAttends);
    optionSaveHandler(new_onAttends);
  }, [onStudent, attends, clName]);

  useEffect(() => {
    setShowAttendMonth("");
    setShowAttendOption("");
  }, [clName]);

  useEffect(() => {
    //받아온 정보 { student: 학생번호 이름 , clName: 전담이면 반이름}
    let new_onStudent = state?.student;
    let new_clName = state?.clName;
    if (new_onStudent !== "") {
      setOnStudent(new_onStudent);
    }

    if (new_clName !== "") {
      setClName(new_clName);
    }
  }, [state]);

  //선택된 학생 정보  번호 한칸띄우고 이름
  const selectStudentHandler = (studentNumName) => {
    setOnStudent(studentNumName);
  };

  //출결 옵션을 선택하면.. 보여주는 걸 바꿔주기
  useEffect(() => {
    //전체보여주는 거면.. 그냥 모두
    if (showAttendOption === "") {
      setShowOnAttends(onAttends);
    } else {
      //월별 자료와 독립적으로 세팅되어야 해서..
      setShowAttendMonth("");
      let new_showOnAttends = onAttends?.filter(
        (attend) => attend.option.slice(1) === showAttendOption
      );
      setShowOnAttends(new_showOnAttends);
    }
  }, [showAttendOption]);

  //달을 선택하면.. 보여주는 걸 바꿔주기
  useEffect(() => {
    //전체보여주는 거면.. 그냥 모두
    if (showAttendMonth === "") {
      setShowOnAttends(onAttends);
    } else {
      //요약 자료와 독립적으로 세팅되어야 해서..
      setShowAttendOption("");
      let new_showOnAttends = onAttends?.filter(
        (attend) => +attend.id.slice(5, 7) === showAttendMonth
      );
      setShowOnAttends(new_showOnAttends);
    }
  }, [showAttendMonth]);

  //선택되어 있는 학급 (전담의 경우)
  const nowClassNameHandler = (classname) => {
    setClName(classname);
  };

  //엑셀로 저장하기 함수
  const saveExcelHandler = () => {
    const new_datas = [];
    attends?.forEach((atd) => {
      let data = [
        +atd.num,
        atd.name,
        atd.option.slice(1),
        `${atd.id.slice(5, 7)}월`,
        `${atd.id.slice(8, 10)}일`,
        atd.note,
      ];
      if (nowIsSubject) {
        data.unshift(atd.clName);
      }
      new_datas.push(data);
    });

    if (!nowIsSubject) {
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
    if (nowIsSubject) {
      attend_datas["!cols"].unshift({ wpx: 30 });
    }

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, attend_datas, "출결기록");

    writeFile(
      book,
      `${nowYear()}학년도 출결기록(${dayjs().format("YYYY-MM-DD")}).xlsx`
    );
  };

  return (
    <div>
      {/* 학생 보여주는 부분 */}
      <ManageEach
        students={props.students}
        userUid={props.userUid}
        isSubject={props.isSubject}
        selectStudentHandler={selectStudentHandler}
        clName={clName}
        passStudent={onStudent}
        nowClassNameHandler={nowClassNameHandler}
      />

      {/* 학생 출결부분 보여주기 */}
      <ul className={`${classes["bottom-content-ul"]} ${classes["flex-wrap"]}`}>
        {/* 학생이 선택되었으면 */}
        {onStudent && (
          <div>
            <div className={classes["flex-wrap"]}>
              {/* 전체 출결 확인 출결옵션별 횟수 기록 */}
              <li
                className={classes["bottom-content-li"]}
                style={{ minWidth: "200px" }}
              >
                {onStudent} | 출결 요약
                <hr className={classes["margin-15"]} />
                {onAttends?.length === 0 ? (
                  <div
                    className={`${classes["fs-13"]} ${classes["margin-15"]}`}
                  >
                    개근입니다!
                  </div>
                ) : (
                  <div>
                    {/* 전체 버튼 */}
                    <Button
                      key={`whole`}
                      id={`whole`}
                      className={
                        showAttendOption === "" ? "sortBtn-clicked" : "sortBtn"
                      }
                      name={`전체(${onAttendsOption?.length})`}
                      onclick={() => {
                        setShowAttendOption("");
                      }}
                    />
                    {/* 옵션별 버튼 */}
                    {[...new Set(onAttendsOption)]?.map((option) => (
                      <Button
                        key={option}
                        id={option}
                        className={
                          showAttendOption === option
                            ? "sortBtn-clicked"
                            : "sortBtn"
                        }
                        name={`${option} (${
                          onAttendsOption?.filter((op) => op === option).length
                        })`}
                        onclick={() => {
                          setShowAttendOption(option);
                        }}
                      />
                    ))}
                  </div>
                )}
              </li>
            </div>

            <div className={classes["btns-div"]} style={{ flexWrap: "wrap" }}>
              {/* 개별 출결기록 */}
              {showOnAttends?.map((attend) => (
                <li
                  key={attend.id}
                  id={attend.id}
                  className={classes["bottom-content-li"]}
                  style={{ width: "260px", padding: "25px" }}
                >
                  {/* 출결의 id(yyyy-mm-dd)보여줌 */}
                  <div className={classes["flex-ml-10"]}>
                    {attend.id.slice(0, 10)}
                  </div>
                  {/* 출결옵션 */}
                  <div className={classes["fs-13"]}>
                    {attend.option.slice(1)} | {attend.note || "-"}
                  </div>
                  {/* 메모한 내용 */}

                  <div className={classes["fs-13"]}></div>
                </li>
              ))}
            </div>
            {/* 자료 없음 표시 */}
            {onAttends?.length === 0 && (
              <li className={classes["bottom-content-li"]}>
                * 학생의 출결기록이 없어요!
              </li>
            )}
          </div>
        )}

        {/* 학생이 선택되지 않으면.. 전체 정보를 보여주고 월별 정렬 등.. 버튼으로 보여주기 */}
        {onStudent === "" && (
          <div>
            {/* 정렬하는 버튼들... 전체랑.. 월별, 옵션별 보여주기 */}
            <div
              className={classes["flex-wrap"]}
              style={{ alignItems: "flex-end" }}
            >
              {/* 전체 출결 확인 출결옵션별 횟수 기록 */}
              <li
                className={classes["bottom-content-li"]}
                style={{ minWidth: "350px" }}
              >
                <div className={classes["flex-center-ml-10"]}>
                  <span className={classes["fs-13-bold"]}>
                    {clName ? `${clName} | 출결 요약` : "우리반 출결 요약"}
                  </span>
                  &nbsp;&nbsp;
                  {/* 엑셀다운 버튼 */}
                  <button
                    className={classes["search-btns"]}
                    onClick={saveExcelHandler}
                  >
                    <i className="fa-solid fa-download"></i> 엑셀저장
                  </button>
                </div>

                <hr className={classes["margin-15"]} />
                {onAttends?.length === 0 ? (
                  <div
                    className={`${classes["fs-13"]} ${classes["margin-15"]}`}
                  >
                    * 학급의 출결 자료가 없어요!
                  </div>
                ) : (
                  <div>
                    <div>
                      {/* 전체 버튼 */}
                      <Button
                        id={`whole`}
                        className={
                          showAttendOption === ""
                            ? "sortBtn-clicked"
                            : "sortBtn"
                        }
                        name={`전체(${onAttendsOption?.length})`}
                        onclick={() => {
                          setShowAttendOption("");
                        }}
                      />
                      {/* 옵션별 버튼 */}
                      {[...new Set(onAttendsOption)]?.map((option) => (
                        <Button
                          key={option}
                          id={option}
                          className={
                            showAttendOption === option
                              ? "sortBtn-clicked"
                              : "sortBtn"
                          }
                          name={`${option} (${
                            onAttendsOption?.filter((op) => op === option)
                              .length
                          })`}
                          onclick={() => {
                            setShowAttendOption(option);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </li>
              {/* 월별 데이터 보여주기 버튼 */}
              {onAttends?.length !== 0 && (
                <li className={classes["bottom-content-li"]}>
                  월별로 보기
                  <hr className={classes["margin-15"]} />
                  {/* 전체 월 버튼 */}
                  <Button
                    id={`모든 달`}
                    className={
                      showAttendMonth === "" ? "sortBtn-clicked" : "sortBtn"
                    }
                    name={`모든 달`}
                    onclick={() => {
                      setShowAttendMonth("");
                    }}
                  />
                  {/* 자료가 있는 달만 보여줌 */}
                  {/* 전담용은 clname으로 한번 거르고 */}
                  {(nowIsSubject
                    ? [
                        ...new Set(
                          attends
                            ?.filter((attend) => attend?.clName === clName)
                            ?.map((atd) => +atd.id.slice(5, 7))
                        ),
                      ]
                    : [...new Set(attends?.map((atd) => +atd.id.slice(5, 7)))]
                  )?.map((month) => (
                    <>
                      {/* 월별 버튼 */}
                      <Button
                        key={`${month}월`}
                        id={`${month}월`}
                        className={
                          showAttendMonth === month
                            ? "sortBtn-clicked"
                            : "sortBtn"
                        }
                        name={`${month}월`}
                        onclick={() => {
                          setShowAttendMonth(month);
                        }}
                      />
                    </>
                  ))}
                </li>
              )}
            </div>
            <div className={classes["btns-div"]} style={{ flexWrap: "wrap" }}>
              {/* 개별 출결기록 */}
              {showOnAttends?.map((attend) => (
                <li
                  key={attend.id}
                  id={attend.id}
                  className={classes["bottom-content-li"]}
                  style={{ width: "260px", padding: "25px" }}
                >
                  {/* 출결의 id(yyyy-mm-dd)보여줌 */}
                  <div className={classes["flex-ml-10"]}>
                    {attend.id.slice(0, 10)} 🙂 {attend.name}
                  </div>
                  {/* 출결옵션 */}
                  <div className={classes["fs-13"]}>
                    {attend.option.slice(1)} | {attend.note || "-"}
                  </div>
                  {/* 메모한 내용 */}

                  <div className={classes["fs-13"]}></div>
                </li>
              ))}
            </div>
            {/* 자료 없음 표시 */}
            {onAttends?.length === 0 && (
              <li className={classes["bottom-content-li"]}>
                * 학생의 출결기록이 없어요!
              </li>
            )}
          </div>
        )}
      </ul>
    </div>
  );
};

export default ManageAttendance;
