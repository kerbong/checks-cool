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
  const getDatasFromDb = async () => {
    if (props.about === "checkLists") {
      setCheckLists([]);
      let docRef = doc(dbService, "checkLists", props.userUid);
      const docSnap = await getDoc(docRef);
      // const new_checkLists = [];
      // const years = [];
      onSnapshot(docRef, (doc) => {
        const new_checkLists = [];
        const years = [];
        if (docSnap.exists()) {
          doc.data()?.checkLists_data?.forEach((data) => {
            years.push(data.yearGroup);
            // 3.17에러.. 만약 id가 null인 경우가 있으면..
            //혹시나.. id가 null같은게 들어가 있으면 현재 시간으로 찍어줌..!
            if (data.id === null || data.id === "null") {
              data.id = dayjs().format("YYYY-MM-DD HH:mm:ss");
            }
            new_checkLists.push(data);
          });
          setCheckLists([...new_checkLists]);
        }
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
      });

      //listMemo 인 경우
    } else if (props.about === "listMemo") {
      setListMemo([]);
      let docRef = doc(dbService, "listMemo", props.userUid);
      const docSnap = await getDoc(docRef);
      // const new_checkLists = [];
      // const years = [];
      onSnapshot(docRef, (doc) => {
        const new_listMemo = [];
        const years = [];
        if (docSnap.exists()) {
          doc.data()?.listMemo_data?.forEach((data) => {
            years.push(data.yearGroup);
            // 3.17에러.. 만약 id가 null인 경우가 있으면..
            //혹시나.. id가 null같은게 들어가 있으면 현재 시간으로 찍어줌..!
            if (data.id === null || data.id === "null") {
              data.id = dayjs().format("YYYY-MM-DD HH:mm:ss");
            }
            new_listMemo.push(data);
          });
          setListMemo([...new_listMemo]);
        }
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
      });
    }
  };

  useEffect(() => {
    getDatasFromDb();
  }, [props.about]);

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

  const saveItemHandler = async (new_item, auto) => {
    //자료 저장할 떄 실제로 실행되는 함수

    const dataSaved = async (newOrSame) => {
      //동일한 이름의 자료가 이미 있는, 새로운 저장이면 팝업 띄우기
      if (newOrSame === "sameTitle" && !auto) {
        Swal.fire({
          icon: "warning",
          title: "동일한 제목 존재",
          text: "기존 자료에 동일한 제목의 자료가 존재합니다. 계속 저장 하시겠어요?",
          confirmButtonText: "확인",
          showDenyButton: true,
          denyButtonText: "취소",
          confirmButtonColor: "#85bd82",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            saveLogic();
          }

          if (result.isDenied) return;
        });
      }

      const saveLogic = async () => {
        //checkList 일경우
        let upload_item;
        if (new_item.unSubmitStudents) {
          //기존자료가 있으면?!
          if (datas?.length > 0) {
            // if (checkLists?.length > 0) {
            upload_item = {
              ...new_item,
              yearGroup: checkListsYear.current.value,
            };
            let new_datas = [...datas];
            let data_index = undefined;
            new_datas.forEach((data, index) => {
              if (data.id === upload_item.id) {
                data_index = index;
              }
            });
            //기존에 없던자료
            if (data_index === undefined) {
              new_datas.push(upload_item);
              //기존에 있던자료
            } else {
              //로직이 모두 진행되고 나면 혹시 기존데이터에서 날짜가 바뀐 경우
              if (new_item?.new_id) {
                upload_item = { ...upload_item, id: new_item.new_id };
                delete upload_item.new_id;
              }
              new_datas[data_index] = upload_item;
            }

            //3.17에러.. id가 null이거나 'null'인 자료 제외함
            new_datas = new_datas.filter(
              (data) => data.id !== null && data.id !== "null"
            );

            await setDoc(firestoreRef, {
              checkLists_data: [...new_datas],
            });
            // setCheckLists([...new_datas]);
            setNowOnCheckLists([...new_datas]);

            // let now_datas = [...nowOnCheckLists];
            // let now_data_index = undefined;
            // now_datas.forEach((data, index) => {
            //   if (data.id === new_item.id) {
            //     now_data_index = index;
            //   }
            // });
            // if (now_data_index === undefined) {
            //   now_datas.push(upload_item);
            // } else {
            //           //로직이 모두 진행되고 나면 혹시 기존데이터에서 날짜가 바뀐 경우
            //   if (new_item?.new_id) {
            //     upload_item = {...upload_item, id: new_item.new_id}
            //     delete upload_item.new_id
            //   }
            //   new_datas[data_index] = upload_item;
            //   now_datas[now_data_index] = new_item;
            // }

            // setNowOnCheckLists([...now_datas]);

            //처음 자료를 저장하는 경우
          } else {
            //학년도 데이터 추가하기

            await setDoc(firestoreRef, {
              checkLists_data: [
                { ...new_item, yearGroup: checkListsYear.current.value },
              ],
            });

            setNowOnCheckLists([
              { ...new_item, yearGroup: checkListsYear.current.value },
            ]);
            // }
          }

          //listMemo일 경우
        } else {
          //기존자료가 있으면?!
          if (datas?.length > 0) {
            upload_item = {
              ...new_item,
              yearGroup: listMemoYear.current.value,
            };
            let new_datas = [...datas];
            let data_index = undefined;
            new_datas.forEach((data, index) => {
              if (data.id === upload_item.id) {
                data_index = index;
              }
            });
            //기존에 없던자료
            if (data_index === undefined) {
              new_datas.push(upload_item);
              //기존에 있던자료
            } else {
              //로직이 모두 진행되고 나면 혹시 기존데이터에서 날짜가 바뀐 경우
              if (new_item?.new_id) {
                upload_item = { ...upload_item, id: new_item.new_id };
                delete upload_item.new_id;
              }
              new_datas[data_index] = upload_item;
            }

            //3.17에러.. id가 null이거나 'null'인 자료 제외함
            new_datas = new_datas.filter(
              (data) => data.id !== null && data.id !== "null"
            );

            await setDoc(firestoreRef, {
              listMemo_data: [...new_datas],
            });

            setNowOnListMemo([...new_datas]);

            // let now_datas = [...nowOnListMemo];
            // let now_data_index = undefined;
            // now_datas.forEach((data, index) => {
            //   if (data.id === new_item.id) {
            //     now_data_index = index;
            //   }
            // });
            // if (now_data_index === undefined) {
            //   now_datas.push(new_item);
            // } else {
            //   now_datas[now_data_index] = new_item;
            // }

            // setNowOnListMemo([...now_datas]);

            //처음 자료를 저장하는 경우
          } else {
            await setDoc(firestoreRef, {
              listMemo_data: [
                { ...new_item, yearGroup: listMemoYear.current.value },
              ],
            });

            setNowOnListMemo([
              { ...new_item, yearGroup: listMemoYear.current.value },
            ]);
            // }
          }
        }
      };

      //새로운 자료면 저장하기
      if (newOrSame === "new" || auto) {
        saveLogic();
      }
    }; // 자료 저장 실행 함수 끝

    //firebase에 있는 저장된 데이터
    let datas = [];
    let firestoreRef;
    if (new_item.unSubmitStudents) {
      //checklists자료 받아오기
      firestoreRef = doc(dbService, "checkLists", props.userUid);
      const checkListsSnap = await getDoc(firestoreRef);
      datas = checkListsSnap?.data()?.checkLists_data;
    } else {
      //listMemo자료 받아오기
      firestoreRef = doc(dbService, "listMemo", props.userUid);
      const listMemoSnap = await getDoc(firestoreRef);
      datas = listMemoSnap?.data()?.listMemo_data;
    }

    //같은 이름의 체크리스트 있는지 확인하고, 저장 묻기 (id까지 같으면.. 기존자료 수정임)
    let regex = / /gi;
    let same_checkTitle = datas?.filter(
      (list) =>
        list.title.replace(regex, "") === new_item.title.replace(regex, "") &&
        list.id !== new_item.id
    );

    //기존에 있던 자료
    let isExist = datas?.filter(
      (list) =>
        list.title.replace(regex, "") === new_item.title.replace(regex, "") &&
        list.id === new_item.id
    );

    //동일한 이름의 체크리스트가 있는데.. 기존자료가 아니면 묻기
    if (same_checkTitle?.length > 0 && isExist?.length === 0) {
      dataSaved("sameTitle");
    } else {
      dataSaved("new");
    }
  };

  const removeData = async (item) => {
    //checkLists 에서 중복되는거 없애기(순서가 중요함..! firestore전에)
    let new_datas;
    if (item.unSubmitStudents) {
      let newCheckRef = doc(dbService, "checkLists", props.userUid);
      const checkListsSnap = await getDoc(newCheckRef);
      const checkListsData = checkListsSnap?.data()?.checkLists_data;

      new_datas = checkListsData?.filter((list) => list.id !== item.id);
      // setCheckLists([...new_datas]);
      setNowOnCheckLists([
        ...nowOnCheckLists?.filter((list) => list.id !== item.id),
      ]);
      await setDoc(doc(dbService, "checkLists", props.userUid), {
        checkLists_data: new_datas,
      });
      //listMemo 에서 중복되는거 없애기(순서가 중요함..! firestore전에)
    } else {
      let listMemoRef = doc(dbService, "listMemo", props.userUid);
      const listMemoSnap = await getDoc(listMemoRef);
      const listMemoData = listMemoSnap?.data()?.listMemo_data;
      new_datas = listMemoData?.filter((list) => list.id !== item.id);
      // setListMemo([...new_datas]);
      setNowOnListMemo([
        ...nowOnListMemo?.filter((list) => list.id !== item.id),
      ]);
      await setDoc(listMemoRef, {
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
    // listmemo가 없으면 저장하지 않기
    if (listMemo.length === 0) {
      return;
    }

    // console.log(listMemo);
    const new_datas = [];
    listMemo.forEach((memo) => {
      memo.data.forEach((stud) => {
        let data = [+stud.num, stud.name, memo.title, stud.memo];
        if (props.isSubject) {
          data.unshift(memo.clName);
        }
        new_datas.push(data);
      });
    });
    if (props.isSubject) {
      new_datas.unshift(["반", "번호", "이름", "개별기록 제목", "기록내용"]);
    } else {
      new_datas.unshift(["번호", "이름", "개별기록 제목", "기록내용"]);
    }
    //새로운 가상 엑셀파일 생성
    const book = utils.book_new();
    const listMemo_datas = utils.aoa_to_sheet(new_datas);
    //셀의 넓이 지정
    listMemo_datas["!cols"] = [
      { wpx: 40 },
      { wpx: 50 },
      { wpx: 100 },
      { wpx: 300 },
    ];
    if (props.isSubject) {
      listMemo_datas["!cols"].unshift({ wpx: 40 });
    }
    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, listMemo_datas, "개별기록");

    writeFile(
      book,
      `${listMemoYear.current.value}학년도 개별기록(${dayjs().format(
        "YYYY-MM-DD"
      )}).xlsx`
    );
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
    return +dayjs().format("MM") <= 2
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  const nowJanFeb = () => {
    return +dayjs().format("MM") <= 2 ? true : false;
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

  //입력 혹은 미입력 학생 보여주는 필터함수
  const listMemoShowStdOnList = (item, isOrNot) => {
    const filterQuery = (std) => {
      let filterQuery;
      if (isOrNot === "is") {
        filterQuery = item?.data?.map((data) => +data.num)?.includes(+std.num);
      } else {
        filterQuery = !item?.data?.map((data) => +data.num)?.includes(+std.num);
      }
      return filterQuery;
    };

    return !isSubject
      ? students?.filter((stu) => filterQuery(stu))
      : studentsYear
          ?.filter((cl) => Object.keys(cl)[0] === item.clName)?.[0]
          ?.[item.clName]?.filter((stu) => filterQuery(stu));
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
                onClose={() => {
                  localStorage.setItem("itemId", "null");
                  setAddCheckItem(false);
                }}
                saveItemHandler={(item, auto) => {
                  saveItemHandler(item, auto);
                  if (!auto) {
                    setAddCheckItem(false);
                  }
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

              {dataYears?.map((year) => (
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

          <div className={classes["flex-wrap"]}>
            {/* 제출 미제출 체크리스트들 보여주기 */}
            {nowOnCheckLists &&
              sortList(nowOnCheckLists)?.map((item) => (
                <li
                  key={item.id + item.title}
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
                  <hr style={{ margin: "10px" }} />
                  <p className={classes.checkP}>
                    {item.unSubmitStudents.length !== 0
                      ? `미제출(${item.unSubmitStudents.length})`
                      : "😎 모두 제출했네요!"}
                  </p>
                  <div className={classes.unsubmitArea}>
                    {item.unSubmitStudents?.map((stu) => (
                      <Button
                        key={item.id + stu.num}
                        name={stu.name}
                        id={item.title + stu.num}
                        className={
                          stu?.woman
                            ? "checkList-button"
                            : "checkList-button-man"
                        }
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
              onClose={() => {
                localStorage.setItem("itemId", "null");
                setAddListMemo(false);
              }}
            >
              <ListMemoInput
                hasNoInputStd={listMemoShowStdOnList(item, "not")?.map(
                  (data) => ({
                    name: data.name,
                    num: data.num,
                    woman: data.woman,
                  })
                )}
                students={!isSubject ? students : inputStudents}
                onClose={() => setAddListMemo(false)}
                saveItemHandler={(item, auto) => {
                  saveItemHandler(item, auto);
                  if (!auto) {
                    setAddListMemo(false);
                  }
                }}
                nowOnListMemo={nowOnListMemo}
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
                {dataYears?.map((year) => (
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
          <div className={classes["flex-wrap"]}>
            {/* 명렬표에서 입력한 자료들도 보여주기 */}
            {nowOnListMemo &&
              sortList(nowOnListMemo)?.map((item) => (
                <li
                  key={item.id + item.title}
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
                  <hr style={{ margin: "10px" }} />
                  {listMemoShowStdOnList(item, "not")?.length !== 0 ? (
                    <>
                      {/* 미입력 보여주기 */}
                      <p className={classes.checkP}>
                        {`미입력 (

                      ${listMemoShowStdOnList(item, "not")?.length} )
                    `}
                      </p>
                      <p className={classes.checkP}>
                        {/* 미입력 학생들 보여주기 */}
                        {listMemoShowStdOnList(item, "not")?.map((data) => (
                          <Button
                            key={item.id + data.num}
                            id={item.id + data.num}
                            name={data.name}
                            className={
                              data.woman
                                ? "checkList-button"
                                : "checkList-button-man"
                            }
                          />
                        ))}
                      </p>
                    </>
                  ) : (
                    <p className={classes.checkP}>모두 입력되었어요! 🙂</p>
                  )}
                  {/* 미입력이 0, 즉 다 입력하면 입력도 보여줄 필요가 없음..! */}
                  {listMemoShowStdOnList(item, "not")?.length !== 0 && (
                    <>
                      <p className={classes.checkP}>
                        {`입력 (

                      ${listMemoShowStdOnList(item, "is")?.length} )
                    `}
                      </p>
                      <p className={classes.checkP}>
                        {listMemoShowStdOnList(item, "is")?.map((data) => (
                          <Button
                            key={item.id + data.num}
                            id={item.id + data.num}
                            name={data.name}
                            className={
                              data.woman
                                ? "checkList-button"
                                : "checkList-button-man"
                            }
                          />
                        ))}
                      </p>
                    </>
                  )}
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

          <p style={{ marginTop: "80px" }}>
            {nowJanFeb() &&
              "* 2월에 새로 가입하신 경우, 다음학년도 학생명부는 입력이 되었으나 아직 다음학년도 3월이 되지 않아서 자료 저장이 불가능합니다. (예- 아직 2022학년도인데, 2022학년도 학생정보는 없음.)"}
          </p>
          <p>
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
