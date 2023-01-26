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
          } else if (+data_month <= 2) {
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
            +dayjs().format("MM") <= 2
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
          } else if (+data_month <= 2) {
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
            +dayjs().format("MM") <= 2
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
    if (new_date.getMonth() + 1 <= 2) {
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
          // setCheckLists([item]);
          // setNowOnCheckLists([item]);
          // } else {
          // await setDoc(
          //   newCheckRef,
          //   { checkLists_data: [item] },
          // {
          //   students_year: [
          //     { [item.yearGroup]: props.students[item.clName] },
          //   ],
          // }
          // );
          setCheckLists([item]);
          setNowOnCheckLists([item]);
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
          setNowOnListMemo((prev) => {
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
        } else {
          await setDoc(newListMemoRef, { listMemo_data: [item] });
          setListMemo([...item]);
          setNowOnListMemo([...item]);
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
    let isSubject = props.isSubject?.filter(
      (yearData) => Object.keys(yearData)[0] === year_group
    )?.[0]?.[year_group];
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
      setNowOnListMemo(list);
    }

    //학년도에 해당하는 학생 목록 설정하기
    let now_students = props.students?.filter(
      (yearStd) => Object.keys(yearStd)[0] === year_group
    )?.[0]?.[year_group];

    //
    if (!isSubject) {
      setStudents(now_students);
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
      listMemo_datas["!cols"] = [{ wpx: 40 }, { wpx: 150 }];
      //시트에 작성한 데이터 넣기
      utils.book_append_sheet(book, listMemo_datas, `${memo.title}`);
    });

    writeFile(book, `개별기록(${listMemoYear.current.value}학년도).xlsx`);
  };

  //전담만 나오는, 학급 셀렉트 선택시 실행되는 함수
  const selectClassHandler = () => {
    let className = selectRef.current.value;
    // console.log(className);
    setNowClassName(className);
  };

  const nowYear = () => {
    return +dayjs().format("MM") <= 2
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

    //보여줄 자료 중에서도 clName이 현재 학급 밸류가 같은 자료만 보여주기

    let list;
    // 만약 전체 학급의 자료인 경우... 볼수만 있도록!
    if (nowClassName === "whole") {
      list = [...checkLists]?.filter(
        (data) => data.yearGroup === checkListsYear.current.value
      );
      // 각반인 경우
    } else {
      list = [...checkLists]?.filter(
        (data) =>
          data.yearGroup === checkListsYear.current.value &&
          data.clName === nowClassName
      );
    }

    //보여줄 자료 세팅
    setNowOnCheckLists(list);
  };

  //학급 선택하면 최종 학생명단 세팅
  useEffect(() => {
    if (props.isSubject) {
      setStudentsHandler();
    }
  }, [nowClassName]);

  //해당 학년도에 전담인 경우? 리스트의 요소를 선택했을 때 해당학년도의 학생명부를 불러와주는 로직
  const inputStudentsHandler = (item) => {
    if (isSubject) {
      let now_students = [];
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
      setInputStudents(now_students);
    }
  };

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
                isSubject={props.isSubject}
                clName={props.isSubject ? nowClassName : ""}
              />
            </Modal>
          )}

          {/* checkLists 학년도 설정 셀렉트태그 */}
          <select
            className={classes["searchYear-select"]}
            name="searchYear-select"
            ref={checkListsYear}
            // defaultValue={""}
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
              <option value="">--학급--</option>
              <option value="whole">전체학급</option>

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
                name={"추가"}
                id={"add-checkItemBtn"}
                className={"add-event-button"}
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
                name={"추가"}
                id={"add-checkItemBtn"}
                className={"add-event-button"}
                onclick={() => {
                  setUnSubmitStudents([]);
                  setAddCheckItem(true);
                }}
              />
            </div>
          )}

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
                students={props.students}
                onClose={() => setAddListMemo(false)}
                saveItemHandler={(item) => {
                  saveItemHandler(item);
                  setAddListMemo(false);
                }}
                item={item}
                removeData={removeData}
                setItemNull={setItemNull}
              />
            </Modal>
          )}

          <div className={classes["listMemoBtn-div"]}>
            <select
              className={classes["listMemo-select"]}
              ref={listMemoYear}
              name="searchYear-selcet"
              defaultValue={""}
              onChange={(e) => searchYearHandler(e.target.value)}
            >
              <option value="">--학년도--</option>
              {dataYears.map((year) => (
                <option value={year} key={year}>
                  {year}학년도
                </option>
              ))}
            </select>
            <Button
              name={"추가"}
              id={"add-listMemoBtn"}
              className={"add-event-button"}
              onclick={() => {
                setItem([]);
                setAddListMemo(true);
              }}
            />
            <Button
              name={"엑셀저장"}
              id={"save-listMemoBtn"}
              className={"add-event-button"}
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
                    setItem(item);
                    setAddListMemo(true);
                  }}
                >
                  <span className={classes["listMemo-date"]}>
                    {" "}
                    {item.id.slice(0, 10)}
                  </span>
                  <h2 className={classes["listMemo-title"]}>{item.title}</h2>
                  <p className={classes.checkP}>
                    {"미입력 ("}
                    {
                      props.students.filter(
                        (stu) =>
                          !item.data.map((data) => data.num).includes(stu.num)
                      ).length
                    }
                    {")"}
                  </p>
                  <p className={classes.checkP}>
                    {/* 미입력 학생들 보여주기 */}
                    {props.students

                      .filter(
                        (stu) =>
                          !item.data.map((data) => data.num).includes(stu.num)
                      )
                      .map((data) => (
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
