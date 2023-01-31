import React, { useEffect, useState, useRef } from "react";
import CheckInput from "./CheckInput";
import ListMemoInput from "./ListMemoInput";
import Modal from "../Layout/Modal";
import dayjs from "dayjs";
import Button from "../Layout/Button";
import classes from "./CheckLists.module.css";
import Swal from "sweetalert2";

import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { utils, writeFile } from "xlsx";

const CheckLists = (props) => {
  const [addCheckItem, setAddCheckItem] = useState(false);
  const [addListMemo, setAddListMemo] = useState(false);
  const [checkLists, setCheckLists] = useState([]);
  const [nowOnCheckLists, setNowOnCheckLists] = useState([]);
  const [listMemo, setListMemo] = useState([]);
  const [nowOnListMemo, setNowOnListMemo] = useState([]);
  const [unSubmitStudents, setUnSubmitStudents] = useState([]);
  const [item, setItem] = useState([]);
  const [dataYears, setDataYears] = useState([]);
  //학년도별 학생 목록
  const [studentsYear, setStudentsYear] = useState([]);
  //선택한 학년도/학급의 최종 학생 목록
  const [students, setStudents] = useState([]);
  //선택된 셀렉트 밸류
  const [nowClassName, setNowClassName] = useState("");
  const [isSubject, setIsSubject] = useState(false);

  //인풋에 전달할 학생정보
  const [inputStudents, setInputStudents] = useState([]);

  const checkListsYear = useRef();
  const listMemoYear = useRef();
  const selectRef = useRef();

  const sortList = (list) => {
    const sorted_lists = list.sort(function (a, b) {
      let a_date = `${a.id}`;
      let b_date = `${b.id}`;
      return new Date(a_date) - new Date(b_date);
    });
    return sorted_lists.reverse();
  };

  //firestore에서 해당 이벤트 자료 받아오기
  const getDatasFromDb = () => {
    let docRef;
    if (props.about === "checkLists") {
      docRef = doc(dbService, "checkLists", props.userUid);

      onSnapshot(docRef, (doc) => {
        const new_checkLists = [];
        const years = [];
        doc?.data()?.checkLists_data?.forEach((data) => {
          let new_data = {};
          let data_month = data.id.slice(5, 7);
          let data_year = data.id.slice(0, 4);
          if (+data_month >= 3) {
            years.push(data_year);
            //자료에 년도를 yearGroup으로 추가
            new_data = { ...data, yearGroup: data_year };
          } else if (+data_month <= 1) {
            let fixed_year = String(+data_year - 1);
            years.push(fixed_year);
            new_data = { ...data, yearGroup: fixed_year };
          }
          new_checkLists.push(new_data);
        });
        //학년도 저장 및 체크리스트기록 저장
        if (years.length > 0) {
          setDataYears([...new Set(years)]);

          // 자료가 없으면 현재 학년도로 세팅
        } else {
          setDataYears([
            +dayjs().format("MM") <= 1
              ? String(+dayjs().format("YYYY") - 1)
              : dayjs().format("YYYY"),
          ]);
        }
        setCheckLists([...new_checkLists]);

        // //학년도별 학생명단 저장
        // setStudentsYear(doc?.data()?.students_year);
      });
    } else if (props.about === "listMemo") {
      docRef = doc(dbService, "listMemo", props.userUid);

      onSnapshot(docRef, (doc) => {
        const new_listMemo = [];
        const years = [];
        doc?.data()?.listMemo_data?.forEach((data) => {
          let new_data = {};
          let data_month = data.id.slice(5, 7);
          let data_year = data.id.slice(0, 4);
          if (+data_month >= 3) {
            years.push(data_year);
            //자료에 년도를 yearGroup으로 추가
            new_data = { ...data, yearGroup: data_year };
          } else if (+data_month <= 1) {
            let fixed_year = String(+data_year - 1);
            years.push(fixed_year);
            new_data = { ...data, yearGroup: fixed_year };
          }
          new_listMemo.push(new_data);
        });
        //학년도 저장 및 체크리스트기록 저장
        // setDataYears([...new Set(years)]);
        if (years.length > 0) {
          setDataYears([...new Set(years)]);

          // 자료가 없으면 현재 학년도로 세팅
        } else {
          setDataYears([
            +dayjs().format("MM") <= 1
              ? String(+dayjs().format("YYYY") - 1)
              : dayjs().format("YYYY"),
          ]);
        }
        setListMemo([...new_listMemo]);
      });
    }
  };

  useEffect(() => {
    getDatasFromDb();
  }, []);

  //처음 보여줄 학년도 설정(올해 자료있으면 보여줌)
  useEffect(() => {
    let new_date = new Date();
    //학년도 설정
    let new_year = new_date.getFullYear();
    if (new_date.getMonth() + 1 <= 1) {
      new_year -= 1;
    }
    //데이터 중에 현재 학년도와 같은 데이터가 있으면 바로 보여줌.
    let this_year_data = dataYears?.filter((year) => year === String(new_year));
    if (this_year_data?.length > 0) {
      searchYearHandler(this_year_data[0]);
      if (props.about === "checkLists") {
        checkListsYear.current.value = this_year_data[0];
      } else {
        listMemoYear.current.value = this_year_data[0];
      }
    }
  }, [dataYears]);

  const saveItemHandler = async (item) => {
    //자료 저장할 떄 실제로 실행되는 함수
    const dataSaved = async () => {
      Swal.fire({
        icon: "success",
        title: "자료가 저장되었어요.",
        text: "5초 후에 창이 사라집니다.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });

      // console.log(item);
      //checkList 일경우
      if (item.unSubmitStudents) {
        //checklists자료 받아오기
        const newCheckRef = doc(dbService, "checkLists", props.userUid);
        const checkListsSnap = await getDoc(newCheckRef);
        if (checkListsSnap.exists()) {
          //현재 저장되는 자료와 중복되는거 제외하고 거기에 새 자료 추가함
          let new_datas = [
            ...checkListsSnap
              .data()
              .checkLists_data.filter((checkList) => checkList.id !== item.id),
          ];
          new_datas.push(item);
          await setDoc(newCheckRef, {
            checkLists_data: new_datas,
          });
          // 전체 데이터도 추가하기
          setCheckLists((prev) => {
            //학년도 데이터 추가하기
            item = { ...item, yearGroup: checkListsYear.current.value };
            let new_datas = [...prev];
            let data_index = undefined;
            prev.forEach((data, index) => {
              if (data.id === item.id) {
                data_index = index;
              }
            });

            if (data_index === undefined) {
              new_datas.push(item);
            } else {
              new_datas[data_index] = item;
            }
            return new_datas;
          });
          //현재 보여주고 있는 학년도 자료에서 삭제하고 다시 추가
          setNowOnCheckLists((prev) => {
            //학년도 데이터 추가하기
            item = { ...item, yearGroup: checkListsYear.current.value };
            let new_datas = [...prev];
            let data_index = undefined;
            prev.forEach((data, index) => {
              if (data.id === item.id) {
                data_index = index;
              }
            });
            if (data_index === undefined) {
              new_datas.push(item);
            } else {
              new_datas[data_index] = item;
            }
            return new_datas;
          });
          //처음 자료를 저장하는 경우
        } else {
          // if (!isSubject) {
          await setDoc(
            newCheckRef,
            { checkLists_data: [item] }
            // { students_year: [{ [item.yearGroup]: props.students }] }
          );

          //학년도 데이터 추가하기

          setCheckLists([{ ...item, yearGroup: checkListsYear.current.value }]);
          setNowOnCheckLists([
            { ...item, yearGroup: checkListsYear.current.value },
          ]);
          // }
        }

        //listMemo일 경우
      } else {
        //checklists자료 받아오기
        const newListMemoRef = doc(dbService, "listMemo", props.userUid);
        const listMemoSnap = await getDoc(newListMemoRef);
        if (listMemoSnap.exists()) {
          //현재 저장되는 자료와 중복되는거 제외하고 거기에 새 자료 추가함
          let new_datas = [
            ...listMemoSnap
              .data()
              .listMemo_data.filter((memo) => memo.id !== item.id),
          ];
          new_datas.push(item);
          await setDoc(newListMemoRef, {
            listMemo_data: new_datas,
          });

          // 전체 데이터도 추가하기
          setListMemo((prev) => {
            //학년도 데이터 추가하기
            item = { ...item, yearGroup: listMemoYear.current.value };
            let new_datas = [...prev];
            let data_index = undefined;
            prev.forEach((data, index) => {
              if (data.id === item.id) {
                data_index = index;
              }
            });

            if (data_index === undefined) {
              new_datas.push(item);
            } else {
              new_datas[data_index] = item;
            }
            // console.log(new_datas);
            return new_datas;
          });
          //현재 보여주고 있는 학년도 자료에서 삭제하고 다시 추가
          setNowOnListMemo((prev) => {
            //학년도 데이터 추가하기
            item = { ...item, yearGroup: listMemoYear.current.value };
            let new_datas = [...prev];
            let data_index = undefined;
            prev.forEach((data, index) => {
              if (data.id === item.id) {
                data_index = index;
              }
            });
            if (data_index === undefined) {
              new_datas.push(item);
            } else {
              new_datas[data_index] = item;
            }
            // console.log(new_datas);
            return new_datas;
          });
        } else {
          await setDoc(newListMemoRef, { listMemo_data: [item] });
          setListMemo([{ ...item, yearGroup: listMemoYear.current.value }]);
          setNowOnListMemo([
            { ...item, yearGroup: listMemoYear.current.value },
          ]);
        }
      }
    }; // 자료 저장 실행 함수 끝

    let datas;
    if (item.unSubmitStudents) {
      datas = [...checkLists];
    } else {
      datas = [...listMemo];
    }
    //같은 이름의 체크리스트 있는지 확인하고, 저장 묻기
    let regex = / /gi;
    let same_checkTitle = datas.filter(
      (list) => list.title.replace(regex, "") === item.title.replace(regex, "")
    );

    //동일한 이름의 체크리스트가 있을 경우 묻기
    if (same_checkTitle.length > 0) {
      Swal.fire({
        title: "자료를 저장/수정할까요?",
        text: `"${item.title}"로 동일한 이름의 체크리스트가 이미 존재합니다.`,
        showDenyButton: true,
        confirmButtonText: "저장/수정",
        confirmButtonColor: "#db100cf2",
        denyButtonColor: "#85bd82",
        denyButtonText: `취소`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        //저장버튼 누르면
        if (result.isConfirmed) {
          dataSaved();
          //취소누르면 그냥 반환
        } else {
          return;
        }
      });
    } else {
      dataSaved();
    }
  };

  const removeData = async (item) => {
    //checkLists 에서 중복되는거 없애기(순서가 중요함..! firestore전에)
    let new_datas;
    if (item.unSubmitStudents) {
      new_datas = checkLists.filter((list) => list.id !== item.id);
      setCheckLists([...new_datas]);
      setNowOnCheckLists([
        ...nowOnCheckLists.filter((list) => list.id !== item.id),
      ]);
      await setDoc(doc(dbService, "checkLists", props.userUid), {
        checkLists_data: new_datas,
      });
      //listMemo 에서 중복되는거 없애기(순서가 중요함..! firestore전에)
    } else {
      new_datas = listMemo.filter((list) => list.id !== item.id);
      setListMemo([...new_datas]);
      setNowOnListMemo([
        ...nowOnListMemo.filter((list) => list.id !== item.id),
      ]);
      await setDoc(doc(dbService, "listMemo", props.userUid), {
        listMemo_data: new_datas,
      });
    }
  };

  const setItemNull = () => {
    setItem([]);
  };

  //학년도 셀렉트 실행 함수
  const searchYearHandler = (value) => {
    const year_group = value;

    //선택학 학년도에 전담이었는지 확인하기
    let isSubject;
    if (props.isSubject) {
      isSubject = props.isSubject?.filter(
        (yearData) => Object.keys(yearData)[0] === year_group
      )?.[0]?.[year_group];
    }

    setIsSubject(isSubject);

    if (props.about === "checkLists") {
      let list = [...checkLists]?.filter(
        (data) => data.yearGroup === year_group
      );
      //담임만 바로 보여줄 자료 세팅
      if (!isSubject) {
        setNowOnCheckLists(list);
      }
    } else {
      let list = [...listMemo]?.filter((data) => data.yearGroup === year_group);

      //담임만 바로 보여줄 자료 세팅
      if (!isSubject) {
        setNowOnListMemo(list);
      }
    }

    //학년도에 해당하는 학생 목록 설정하기
    let now_students = props.students?.filter(
      (yearStd) => Object.keys(yearStd)[0] === year_group
    )?.[0]?.[year_group];

    // console.log(now_students);
    //
    if (!isSubject) {
      setStudents(now_students);
      setStudentsYear(now_students);
    } else {
      setStudentsYear(now_students);
    }
  };

  //엑셀로 저장하기 함수
  const saveExcelHandler = () => {
    const book = utils.book_new();
    // console.log(listMemo);
    listMemo.forEach((memo) => {
      const new_datas = [];
      memo.data.forEach((stud) => {
        let data = [stud.num, stud.name, stud.memo];
        new_datas.push(data);
      });
      new_datas.unshift(["번호", "이름", "기록내용"]);
      //새로운 가상 엑셀파일 생성
      const listMemo_datas = utils.aoa_to_sheet(new_datas);
      //셀의 넓이 지정
      listMemo_datas["!cols"] = [{ wpx: 40 }, { wpx: 50 }, { wpx: 200 }];
      //시트에 작성한 데이터 넣기
      utils.book_append_sheet(book, listMemo_datas, `${memo.title}`);
    });

    writeFile(book, `개별기록(${listMemoYear.current.value}학년도).xlsx`);
  };

  //전담만 나오는, 학급 셀렉트 선택시 실행되는 함수
  const selectClassHandler = () => {
    let className = selectRef.current.value;
    setNowClassName(className);
  };

  //학급 선택하면 최종 학생명단 세팅
  useEffect(() => {
    if (isSubject) {
      setStudentsHandler();
    }
  }, [nowClassName]);

  const nowYear = () => {
    return +dayjs().format("MM") <= 1
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  //전담의 경우 학급 선택하면 최종 학생명단 세팅
  const setStudentsHandler = () => {
    // 학년도별 학생자료에서 키값이 현재세팅 학년도와 같은거 찾고, 그거 밸류들 중에 현재 세팅된 학급과 같은걸 최종 학생으로 설정
    let now_students = studentsYear?.filter(
      (cl) => Object.keys(cl)[0] === nowClassName
    )?.[0]?.[nowClassName];

    // 만약 학년도별 학생자료가 없으면, 아직 자료 입력 전이면 받아온 students에서 골라서 세팅
    setStudents(now_students);
    // console.log(now_students);

    //보여줄 자료 중에서도 clName이 현재 학급 밸류가 같은 자료만 보여주기

    let list;
    let data_about = props.about === "checkLists" ? checkLists : listMemo;
    let year_value =
      props.about === "checkLists"
        ? checkListsYear.current.value
        : listMemoYear.current.value;
    // 만약 전체 학급의 자료인 경우... 볼수만 있도록!
    if (nowClassName === "whole") {
      list = [...data_about]?.filter((data) => data.yearGroup === year_value);
      // 각반인 경우
    } else {
      list = [...data_about]?.filter(
        (data) => data.yearGroup === year_value && data.clName === nowClassName
      );
    }

    //보여줄 자료 세팅
    if (props.about === "checkLists") {
      setNowOnCheckLists(list);
    } else {
      setNowOnListMemo(list);
    }
  };

  //해당 학년도에 전담인 경우? 리스트의 요소를 선택했을 때 해당학년도의 학생명부를 불러와주는 로직
  const inputStudentsHandler = (item) => {
    let now_students = [];
    // console.log(isSubject);
    if (isSubject) {
      props.students?.forEach((yearStd) => {
        //해당학년도가 자료의 학년도와 일치하고
        if (Object.keys(yearStd)[0] === item.yearGroup) {
          yearStd?.[item.yearGroup]?.forEach((cl) => {
            //해당학년도의 학급의 정보가 같을 때
            if (Object.keys(cl)[0] === item.clName) {
              now_students = [...Object.values(cl)[0]];
            }
          });
        }
      });
      // console.log(now_students);
      setInputStudents(now_students);
    }
  };

  // console.log(props.students);
  // console.log(studentsYear);

  return (
    <>
      {props.about === "checkLists" && (
        <>
          {addCheckItem && (
            <Modal onClose={() => setAddCheckItem(false)}>
              <CheckInput
                // 전담이 아니면 년도별에 따라 받아온거 보냄
                students={!isSubject ? students : inputStudents}
                onClose={() => setAddCheckItem(false)}
                saveItemHandler={(item) => {
                  saveItemHandler(item);

                  setAddCheckItem(false);
                }}
                unSubmitStudents={
                  item.length !== 0
                    ? unSubmitStudents
                    : !isSubject
                    ? students
                    : inputStudents
                }
                item={item}
                removeData={removeData}
                setItemNull={setItemNull}
                isSubject={isSubject}
                clName={isSubject ? nowClassName : ""}
              />
            </Modal>
          )}

          <div className={classes["listMemoBtn-div"]}>
            {/* checkLists 학년도 설정 셀렉트태그 */}
            <select
              ref={checkListsYear}
              className={classes["searchYear-select"]}
              onChange={(e) => {
                searchYearHandler(e.target.value);
              }}
            >
              <option value="">--학년도--</option>

              {dataYears.map((year) => (
                <option value={year} key={year}>
                  {year}학년도
                </option>
              ))}
            </select>

            {/* 전담교사만 보이는 학급 셀렉트 */}

            {isSubject && (
              <select
                ref={selectRef}
                onChange={selectClassHandler}
                className={classes["class-select"]}
                value={nowClassName}
              >
                <option value="">-학급-</option>
                <option value="whole">전체</option>

                {studentsYear?.map((cl) => (
                  <option key={Object.keys(cl)[0]} value={Object.keys(cl)[0]}>
                    {Object.keys(cl)[0]}
                  </option>
                ))}
              </select>
            )}
            {/* <div className={classes["classSelect-div"]}></div> */}

            {/* 담임인 경우 현재 학년도 자료에만 추가 버튼이 보임 */}
            {!isSubject && checkListsYear?.current?.value === nowYear() && (
              <div>
                <Button
                  icon={<i className="fa-solid fa-plus"></i>}
                  id={"add-checkItemBtn"}
                  className={"check-memo-button"}
                  onclick={() => {
                    setUnSubmitStudents([]);
                    setAddCheckItem(true);
                  }}
                />
              </div>
            )}

            {/* 전담버전에서는 학급을 선택하거나 전체학급이 아닐경우에만 보임 */}
            {isSubject && nowClassName !== "" && nowClassName !== "whole" && (
              <div>
                <Button
                  icon={<i className="fa-solid fa-plus"></i>}
                  id={"add-checkItemBtn"}
                  className={"check-memo-button"}
                  onclick={() => {
                    let baseItem = {
                      yearGroup: checkListsYear.current.value,
                      clName: nowClassName,
                    };
                    inputStudentsHandler(baseItem);
                    setUnSubmitStudents([]);
                    setAddCheckItem(true);
                  }}
                />
              </div>
            )}
          </div>

          <div>
            {/* 제출 미제출 체크리스트들 보여주기 */}
            {nowOnCheckLists &&
              sortList(nowOnCheckLists)?.map((item) => (
                <li
                  key={item.id}
                  id={item.id}
                  className={classes.checkLi}
                  onClick={() => {
                    setUnSubmitStudents(item.unSubmitStudents);
                    setItem([]);
                    inputStudentsHandler(item);
                    setItem(item);
                    setAddCheckItem(true);
                  }}
                >
                  <span className={classes["listMemo-date"]}>
                    {" "}
                    {item.id.slice(0, 10)}
                  </span>
                  <h2 className={classes["listMemo-title"]}>{item.title}</h2>
                  <p className={classes.checkP}>
                    {item.unSubmitStudents.length !== 0
                      ? `미제출(${item.unSubmitStudents.length})`
                      : "😎 모두 제출했네요!"}
                  </p>
                  <div className={classes.unsubmitArea}>
                    {item.unSubmitStudents.map((stu) => (
                      <Button
                        key={item.id + stu.num}
                        name={stu.name}
                        id={item.title + stu.num}
                        className={"checkList-button"}
                      />
                    ))}
                  </div>
                </li>
              ))}
          </div>
        </>
      )}

      {props.about === "listMemo" && (
        <>
          {addListMemo && (
            <Modal
              addStyle={"addOverflow"}
              onClose={() => setAddListMemo(false)}
            >
              <ListMemoInput
                students={!isSubject ? students : inputStudents}
                onClose={() => setAddListMemo(false)}
                saveItemHandler={(item) => {
                  saveItemHandler(item);
                  setAddListMemo(false);
                }}
                item={item}
                removeData={removeData}
                setItemNull={setItemNull}
                isSubject={isSubject}
                clName={isSubject ? nowClassName : ""}
              />
            </Modal>
          )}

          {/* 학년도 / 학급셀렉트 버튼 */}

          <div className={classes["listMemoBtn-div"]}>
            <div className={classes["listMemoSelect-div"]}>
              <select
                className={classes["searchYear-select"]}
                ref={listMemoYear}
                name="searchYear-selcet"
                // defaultValue={""}
                onChange={(e) => searchYearHandler(e.target.value)}
              >
                <option value="">--학년도--</option>
                {dataYears.map((year) => (
                  <option value={year} key={year}>
                    {year}학년도
                  </option>
                ))}
              </select>

              {/* 전담교사만 보이는 학급 셀렉트 */}

              {isSubject ? (
                <select
                  ref={selectRef}
                  onChange={selectClassHandler}
                  className={classes["class-select"]}
                  value={nowClassName}
                >
                  <option value="">-학급-</option>
                  <option value="whole">전체</option>

                  {studentsYear?.map((cl) => (
                    <option key={Object.keys(cl)[0]} value={Object.keys(cl)[0]}>
                      {Object.keys(cl)[0]}
                    </option>
                  ))}
                </select>
              ) : (
                <div style={{ height: "50px" }}></div>
              )}
            </div>
            <div>
              {/* 담임인 경우 현재 학년도 자료에만 추가 버튼이 보임 */}
              {!isSubject && listMemoYear?.current?.value === nowYear() && (
                <div>
                  <Button
                    icon={<i className="fa-solid fa-plus"></i>}
                    id={"add-listMemoBtn"}
                    className={"check-memo-button"}
                    onclick={() => {
                      setItem([]);
                      setAddListMemo(true);
                    }}
                  />
                </div>
              )}
            </div>

            {/* 전담버전에서는 학급을 선택하거나 전체학급이 아닐경우에만 보임 */}
            {isSubject && nowClassName !== "" && nowClassName !== "whole" && (
              <div>
                <Button
                  icon={<i className="fa-solid fa-plus"></i>}
                  id={"add-listMemoBtn"}
                  className={"check-memo-button"}
                  onclick={() => {
                    let baseItem = {
                      yearGroup: listMemoYear.current.value,
                      clName: nowClassName,
                    };
                    inputStudentsHandler(baseItem);
                    setItem([]);
                    setAddListMemo(true);
                  }}
                />
              </div>
            )}

            <Button
              icon={<i className="fa-regular fa-floppy-disk"></i>}
              id={"save-listMemoBtn"}
              className={"check-memo-button"}
              onclick={saveExcelHandler}
            />
          </div>
          <div>
            {/* 명렬표에서 입력한 자료들도 보여주기 */}
            {nowOnListMemo &&
              sortList(nowOnListMemo).map((item) => (
                <li
                  key={item.id}
                  id={item.id}
                  className={classes.checkLi}
                  onClick={() => {
                    setItem([]);
                    inputStudentsHandler(item);
                    setItem(item);
                    setAddListMemo(true);
                  }}
                >
                  <span className={classes["listMemo-date"]}>
                    {" "}
                    {item.id.slice(0, 10)}
                  </span>
                  <h2
                    className={
                      isSubject
                        ? classes["listMemo-title-sub"]
                        : classes["listMemo-title"]
                    }
                  >
                    <div>{item?.clName || ""}</div>
                    <div>{item.title}</div>
                  </h2>
                  <p className={classes.checkP}>
                    {`미입력 (

                      ${
                        (!isSubject
                          ? students?.filter(
                              (stu) =>
                                !item?.data
                                  ?.map((data) => data.num)
                                  ?.includes(stu.num)
                            )
                          : studentsYear
                              ?.filter(
                                (cl) => Object.keys(cl)[0] === item.clName
                              )?.[0]
                              ?.[item.clName]?.filter(
                                (stu) =>
                                  !item?.data
                                    ?.map((data) => data.num)
                                    ?.includes(stu.num)
                              )
                        )?.length
                      } )
                    `}
                  </p>
                  <p className={classes.checkP}>
                    {/* 미입력 학생들 보여주기 */}
                    {(!isSubject
                      ? students?.filter(
                          (stu) =>
                            !item?.data
                              ?.map((data) => data.num)
                              ?.includes(stu.num)
                        )
                      : studentsYear
                          ?.filter(
                            (cl) => Object.keys(cl)[0] === item.clName
                          )?.[0]
                          ?.[item.clName]?.filter(
                            (stu) =>
                              !item?.data
                                ?.map((data) => data.num)
                                ?.includes(stu.num)
                          )
                    )?.map((data) => (
                      <Button
                        key={item.id + data.num}
                        id={item.id + data.num}
                        name={data.name}
                        className={"checkList-button"}
                      />
                    ))}
                  </p>
                </li>
              ))}
          </div>
        </>
      )}
      {
        <>
          {props.students?.length === 0 && (
            <>
              <h2>
                {" "}
                <p>학생명부를 먼저 입력해주세요!</p>
              </h2>
              <p>- 메뉴바의 곰돌이 클릭! 학생명단 클릭!</p>
            </>
          )}
          <p style={{ marginTop: "65px" }}>
            * 입력한 자료가 안 보이면 메뉴를 다시 클릭해주시거나 다시
            로그인해주세요!
          </p>

          <p>
            * 문제가 지속되시면 kerbong@gmail.com으로 알려주세요. 최대한 빠르게
            해결해 드릴게요!
          </p>
        </>
      }
    </>
  );
};

export default CheckLists;
