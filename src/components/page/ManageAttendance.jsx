import React, { useState, useEffect } from "react";
import ManageEach from "./ManageEach";
import dayjs from "dayjs";
import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router";
import classes from "./ManageEach.module.css";
import Button from "components/Layout/Button";
import { utils, writeFile } from "xlsx";
import Swal from "sweetalert2";

const ManageAttendance = (props) => {
  const [onStudent, setOnStudent] = useState("");
  const [clName, setClName] = useState("");
  const [attends, setAttends] = useState([]);
  const [onAttends, setOnAttends] = useState([]);
  const [showOnAttends, setShowOnAttends] = useState([]);
  const [onAttendsOption, setOnAttendsOption] = useState([]);
  const [showAttendOption, setShowAttendOption] = useState("");
  const [showAttendMonth, setShowAttendMonth] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteChecked, setDeleteChecked] = useState([]);
  const [uploadDatas, setUploadDatas] = useState({});
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
    setDeleteChecked([]);
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

  const upload_data = async (fixed_data) => {
    let attendRef = doc(dbService, "attend", props.userUid);
    await setDoc(attendRef, fixed_data);
  };

  useEffect(() => {
    if (Object.keys(uploadDatas)?.length === 0) return;
    upload_data(uploadDatas);
  }, [uploadDatas]);

  //삭제함수
  const deleteHandler = async (allOrChecked) => {
    if (allOrChecked !== "all" && deleteChecked?.length === 0) return;
    if (onAttends?.length === 0) return;

    let new_attends = [...attends];
    // 삭제하는 실제함수
    const deleteAttend = async (allOrChecked) => {
      // 전체 정보 받아오고, deleteChecked 있는거 제외해서 자료로 만들고 firebase저장 및 attends 상태에 저장.
      if (allOrChecked === "all") {
        new_attends = new_attends?.filter(
          (attend) => attend.name !== onStudent.split(" ")[1]
        );
        // 만약 특정 선택된 것들만 제거일 경우...
      } else {
        // deleteChecked에는 id만 저장되어 있음.
        new_attends = new_attends?.filter(
          (attend) => !deleteChecked.includes(attend.id)
        );
      }

      //  ===============오류.. 삭제안됨;;ㅠㅠ ======
      // let attendRef = doc(dbService, "attend", props.userUid);
      // if (nowIsSubject) {
      //   // 먼저.. clname이 같은거만 추려내기
      //   new_attends = new_attends?.filter((atd) => atd.clName === clName);
      //   console.log(new_attends);

      //   //현재 학급자료만 제거하고 추가해주기
      //   let new_clAttends = [];
      //   onSnapshot(attendRef, (doc) => {
      //     let dbDatas = doc.data()?.attend_data;
      //     new_clAttends = dbDatas?.filter((cl) => {
      //       let data_clName = Object.keys(cl)?.[0];
      //       let new_cl;
      //       if (data_clName !== clName) {
      //         new_cl = cl;
      //         //현재학급명 찾고
      //       } else {
      //         console.log(new_attends);
      //         new_cl = {
      //           [clName]: [...new_attends],
      //         };
      //       }
      //       console.log(new_cl);
      //       return new_cl;
      //     });

      //     const fixed_data = { attend_data: new_clAttends };
      //     console.log(fixed_data);
      //     setUploadDatas(fixed_data);
      //   });
      // } else {
      //   const fixed_data = { attend_data: new_attends };
      //   console.log(fixed_data);
      //   setUploadDatas(fixed_data);
      // }

      //담임이면 바로 firestore에 업로드 가능해서, 전담만 추가 조절
      const fixed_data = { attend_data: new_attends };
      console.log(fixed_data);
      setUploadDatas(fixed_data);

      // 상태 함수도.. 수정해줘야함..! setShowOnAttends랑 setOnAttends에는 onAttends에서 deletedChecked 제외한거 넣어주고,
    };

    //전체삭제인 경우
    if (allOrChecked === "all") {
      Swal.fire({
        icon: "warning",
        title: "전체 삭제할까요?",
        text: `${
          onStudent.split(" ")[1]
        } 학생의 출결 기록을 모두 삭제할까요? 삭제 후에는 기록을 복구할 수 없습니다. 신중히 선택해주세요!`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        denyButtonText: "취소",
        showDenyButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Swal.fire("개발중", "기능 개발중입니다...", "info");
          setShowDelete(false);
          await deleteAttend("all");
        } else {
          return;
        }
      });
      //선택삭제인 경우
    } else {
      Swal.fire({
        icon: "warning",
        title: "선택 삭제할까요?",
        text: `${
          onStudent.split(" ")[1]
        } 학생의 선택된 출결 기록을 삭제할까요? 삭제 후에는 기록을 복구할 수 없습니다. 신중히 선택해주세요!`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        denyButtonText: "취소",
        showDenyButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Swal.fire("개발중", "기능 개발중입니다...", "info");
          setShowDelete(false);
          setDeleteChecked([]);
          await deleteAttend("checked");
        } else {
          return;
        }
      });
    }
  };

  //각 listMemo클릭하면 저장해두는 함수
  const deleteCheckedHandler = (atd) => {
    if (!showDelete) return;
    //기존에 존재하면 isExist true, 없었으면 false

    let isExist =
      deleteChecked?.filter((checked) => checked === atd.id)?.length > 0
        ? true
        : false;
    let new_data = [...deleteChecked];
    //같은게 있으면 제거해주고
    if (isExist) {
      new_data = new_data?.filter((checked) => checked !== atd.id);
      //새로운 거면 추가해주기
    } else {
      new_data?.push(atd.id);
    }
    setDeleteChecked(new_data);
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

              {/* 삭제버튼 모음.. 현재학생의 출결정보가 있을 때만 보여줌. */}
              {onAttends?.length > 0 && !nowIsSubject && (
                <li
                  className={classes["bottom-content-li"]}
                  style={{ minWidth: "100px" }}
                >
                  {/* <div className={classes["fs-9"]}>
                  * 수정은 생기부 페이지를 활용해주세요.
                </div> */}
                  {/* <hr className={classes["margin-15"]} /> */}

                  <div className={classes["flex-d-column"]}>
                    {/* 전체삭제버튼 */}
                    <Button
                      id={"attend-delete"}
                      className={"sortBtn"}
                      name={!showDelete ? "전체삭제" : "확인"}
                      onclick={() => {
                        !showDelete
                          ? deleteHandler("all")
                          : deleteHandler("checked");
                      }}
                    />
                    {/* 삭제버튼 */}
                    <Button
                      id={"attend-delete"}
                      className={"sortBtn"}
                      name={showDelete ? "취소" : "선택삭제"}
                      onclick={() => {
                        // Swal.fire("개발중", "기능 개발중입니다...", "info");
                        //현재 삭제 가능인테 취소 누른거면.. 다시 비워둠.
                        if (showDelete) {
                          setDeleteChecked([]);
                          setShowDelete(false);
                        } else {
                          setShowDelete(true);
                        }
                      }}
                    />
                  </div>
                </li>
              )}
            </div>

            <div className={classes["btns-div"]} style={{ flexWrap: "wrap" }}>
              {/* 개별 출결기록 */}
              {showOnAttends?.map((attend) => (
                <li
                  key={`${attend.id}${clName ? clName : ""}`}
                  id={attend.id}
                  className={`${classes["bottom-content-li"]} ${
                    deleteChecked?.filter((checked) => checked === attend.id)
                      ?.length > 0
                      ? classes["list-clicked"]
                      : ""
                  }`}
                  onClick={() => {
                    deleteCheckedHandler(attend);
                  }}
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
              style={{ alignItems: "center" }}
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
