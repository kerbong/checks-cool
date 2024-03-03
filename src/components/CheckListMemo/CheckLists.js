import React, { useEffect, useState, useRef } from "react";
import CheckInput from "./CheckInput";
import ListMemoInput from "./ListMemoInput";
import Modal from "../Layout/Modal";
import dayjs from "dayjs";
import Button from "../Layout/Button";
import classes from "./CheckLists.module.css";
import Swal from "sweetalert2";
import ScoreGradeInput from "./ScoreGradeInput";
import { useNavigate } from "react-router-dom";

import { FaRankingStar } from "react-icons/fa6";
import { BsPersonFillCheck } from "react-icons/bs";
import { BsPersonCheck } from "react-icons/bs";

import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
// import { utils, writeFile } from "xlsx";

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
  const [dataDone, setDataDone] = useState(false);

  //인풋에 전달할 학생정보
  const [inputStudents, setInputStudents] = useState([]);
  //성적 단계 설정, 모달 보여주기
  const [showScoreGrade, setShowScoreGrade] = useState(false);
  const [scoreGrade, setScoreGrade] = useState([]);
  const [goneStudents, setGoneStudents] = useState([]);
  const [exceptGone, setExceptGone] = useState(true);

  const checkListsYear = useRef();
  const listMemoYear = useRef();
  const selectRef = useRef();

  const navigate = useNavigate();

  //전학생 목록 받아옴
  const getGoneStdFromDb = async () => {
    let goneStdRef = doc(dbService, "goneStd", props.userUid);
    const goneStdSnap = await getDoc(goneStdRef);

    //id가 이번학년도 인 자료만 저장해둠.
    onSnapshot(goneStdRef, (doc) => {
      if (goneStdSnap.exists()) {
        let new_goneStd = [];

        new_goneStd = doc.data()?.goneStd_data?.[nowYear()];

        setGoneStudents(new_goneStd);
      }
    });
  };

  useEffect(() => {
    getGoneStdFromDb();
  }, []);

  //브라우저에 저장된 평가기록단계가 있으면 불러오고 없으면 기본 4단계로 세팅함.
  useEffect(() => {
    const storedInputValues = localStorage.getItem("scoreGrade");
    if (!storedInputValues) {
      localStorage.setItem(
        "scoreGrade",
        JSON.stringify(["매우잘함", "잘함", "보통", "노력요함"])
      );
      setScoreGrade(["매우잘함", "잘함", "보통", "노력요함"]);
    } else {
      setScoreGrade(JSON.parse(storedInputValues));
    }
  }, []);

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
          setCheckLists(new_checkLists);
          setDataDone(true);
        }
        //학년도 저장 및 체크리스트기록 저장
        if (years.length > 0) {
          //학년도 자료가 있지만 현재 학년도는 없으면..? 추가해주기
          let new_years = [...new Set(years)];

          if (new_years.filter((y) => y === nowYear())?.length === 0) {
            new_years.push(nowYear());
          }
          setDataYears(new_years);

          // 자료가 없으면 현재 학년도로 세팅
        } else {
          setDataYears([
            dayjs().format("MM-DD") <= "02-15"
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
          setListMemo(new_listMemo);
          setDataDone(true);
        }
        //학년도 저장 및 체크리스트기록 저장
        if (years.length > 0) {
          //학년도 자료가 있지만 현재 학년도는 없으면..? 추가해주기
          let new_years = [...new Set(years)];

          if (new_years.filter((y) => y === nowYear())?.length === 0) {
            new_years.push(nowYear());
          }
          setDataYears(new_years);

          // 자료가 없으면 현재 학년도로 세팅
        } else {
          setDataYears([
            dayjs().format("MM-DD") <= "02-15"
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
    //학년도 설정
    let new_year = nowYear();
    //데이터 중에 현재 학년도와 같은 데이터가 있으면 바로 보여줌. 없으면 있는 데이터 중에 가장 최신꺼 보여줌.
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

  /** 학년도를 반환하는 함수 */
  const returnDate = () => {
    const now_date = document.querySelector(".custom-input").innerText;

    const year = now_date.split(" ")[0].replace("년", "");
    const month = String(now_date.split(" ")[1].replace("월", "")).padStart(
      2,
      "0"
    );
    const day = String(now_date.split(" ")[2]?.split("일")?.[0]).padStart(
      2,
      "0"
    );

    if (month + "-" + day < "02-16") {
      return "20" + String(parseInt(year) - 1).padStart(2, "0");
    } else {
      return "20" + year;
    }
  };

  const saveItemHandler = async (new_item, auto) => {
    //자료 저장할 떄 실제로 실행되는 함수
    const screen_nowYear = returnDate();

    const dataSaved = async (newOrSame) => {
      const saveLogic = async () => {
        //checkList 일경우
        let upload_item;
        if (new_item.unSubmitStudents) {
          if (auto) {
            setUnSubmitStudents(new_item.unSubmitStudents);
          }
          //기존자료가 있으면?!
          if (datas?.length > 0) {
            // if (checkLists?.length > 0) {
            upload_item = {
              ...new_item,
              yearGroup: screen_nowYear,
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

            // 만약 자동저장일 경우, 모달창이 띄워져 있는데 setItem해줘야.. 미제출 학생 목록이 저장된 데이터로 바뀜.

            if (auto) {
              setItem(upload_item);
            } else {
              setItem([]);
            }

            //3.17에러.. id가 null이거나 'null'인 자료 제외함
            new_datas = new_datas.filter(
              (data) => data.id !== null && data.id !== "null"
            );

            await setDoc(firestoreRef, {
              checkLists_data: [...new_datas],
            });

            //전담은.. clname 고려해서 보여주기

            // 전담이면.. 학급의 자료만 보여주기!
            let showCheckLists = !isSubject
              ? [...new_datas]?.filter(
                  (data) => data.yearGroup === checkListsYear?.current?.value
                )
              : [...new_datas]?.filter(
                  (data) =>
                    data.yearGroup === checkListsYear?.current?.value &&
                    data.clName === nowClassName
                );

            setNowOnCheckLists(sortList(showCheckLists));

            //처음 자료를 저장하는 경우
          } else {
            let new_checkItem = {
              ...new_item,
              yearGroup: screen_nowYear,
            };
            // 만약 자동저장일 경우, 모달창이 띄워져 있는데 setItem해줘야.. 미제출 학생 목록이 저장된 데이터로 바뀜.

            if (auto) {
              setItem(new_checkItem);
            } else {
              setItem([]);
            }
            //학년도 데이터 추가하기

            await setDoc(firestoreRef, {
              checkLists_data: [new_checkItem],
            });

            if (screen_nowYear === checkListsYear?.current?.value) {
              setNowOnCheckLists(sortList([new_checkItem]));
            }
            // }
          }

          //listMemo일 경우
        } else {
          //기존자료가 있으면?!
          if (datas?.length > 0) {
            upload_item = {
              ...new_item,
              yearGroup: screen_nowYear,
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

            // 전담이면.. 학급의 자료만 보여주기!
            let showListMemo = !isSubject
              ? [...new_datas]?.filter(
                  (data) => data.yearGroup === listMemoYear.current.value
                )
              : [...new_datas]?.filter(
                  (data) =>
                    data.yearGroup === listMemoYear.current.value &&
                    data.clName === nowClassName
                );

            setNowOnListMemo(sortList(showListMemo));

            //처음 자료를 저장하는 경우
          } else {
            await setDoc(firestoreRef, {
              listMemo_data: [{ ...new_item, yearGroup: screen_nowYear }],
            });

            if (screen_nowYear === listMemoYear.current.value) {
              setNowOnListMemo(
                sortList([{ ...new_item, yearGroup: screen_nowYear }])
              );
            }

            // }
          }
        }
      };

      //동일한 이름의 자료가 이미 있는, 새로운 저장이면 팝업 띄우기
      if (newOrSame === "sameTitle" && !auto) {
        Swal.fire({
          icon: "success",
          title: "저장성공(동일한 제목)",
          html: "기존 자료에 동일한 제목의 자료가 존재합니다. <br/> 날짜로 자료를 구분해주시거나 제목을 수정해주세요.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
        });
        saveLogic();
      }

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

      setNowOnCheckLists(
        sortList([...nowOnCheckLists?.filter((list) => list.id !== item.id)])
      );
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
      setNowOnListMemo(
        sortList([...nowOnListMemo?.filter((list) => list.id !== item.id)])
      );
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
        setNowOnCheckLists(sortList(list));
      }
    } else {
      let list = [...listMemo]?.filter((data) => data.yearGroup === year_group);

      //담임만 바로 보여줄 자료 세팅
      if (!isSubject) {
        setNowOnListMemo(sortList(list));
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
    return dayjs().format("MM-DD") <= "02-15"
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  const nowJanFeb = () => {
    return dayjs().format("MM-DD") <= "02-15" ? true : false;
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
      setNowOnCheckLists(sortList(list));
    } else {
      setNowOnListMemo(sortList(list));
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
      // //전학생 제외 설정인 경우, 전학생 제외하기
      // if (exceptGone) {
      //   now_students = exceptGoneStds(true, now_students);
      // }
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
      ? except_gone_stds(students)?.filter((stu) => filterQuery(stu))
      : except_gone_stds(inputStudents)?.filter((stu) => filterQuery(stu));
  };

  //전달받은 state에서 add일경우, 추가 버튼 누른 상태로 만들어주기
  useEffect(() => {
    if (!props.addClicked) return;
    if (!dataDone) return;

    if (props.about === "checkLists") {
      setAddCheckItem(true);
    } else {
      setAddListMemo(true);
    }
  }, [dataDone]);

  useEffect(() => {
    setNowClassName("");

    if (dataYears?.length > 0) {
      searchYearHandler(dataYears[dataYears?.length - 1]);
    }
  }, [props.about]);

  /** 학생목록을 전학생 보여주기 여부에 따라 바꿔주는 함수, 매개변수에 학생목록 넣어주기 */
  const except_gone_stds = (stds) => {
    let unsubStu = stds;
    if (exceptGone) {
      let goneStds = !isSubject
        ? goneStudents
        : goneStudents?.filter((std) => std.clName === nowClassName);
      unsubStu = unsubStu?.filter((stu) => {
        return !goneStds?.some(
          (g_stu) => +g_stu.num === +stu.num && g_stu.name === stu.name
        );
      });
    }
    return unsubStu;
  };

  return (
    <>
      {props.about === "checkLists" && (
        <>
          {addCheckItem && (
            <Modal
              onClose={() => {
                localStorage.setItem("itemId", "null");
                setAddCheckItem(false);
                setItem([]);
              }}
            >
              <CheckInput
                goneStudents={goneStudents}
                exceptGone={exceptGone}
                // 전담이 아니면 년도별에 따라 받아온거 보냄
                students={
                  !isSubject
                    ? except_gone_stds(students)
                    : except_gone_stds(inputStudents)
                }
                onClose={() => {
                  localStorage.setItem("itemId", "null");
                  setAddCheckItem(false);
                  setItem([]);
                }}
                saveItemHandler={(item, auto) => {
                  saveItemHandler(item, auto);
                  if (!auto) {
                    setAddCheckItem(false);
                  }
                }}
                unSubmitStudents={
                  item.length !== 0
                    ? except_gone_stds(unSubmitStudents)
                    : !isSubject
                    ? except_gone_stds(students)
                    : except_gone_stds(inputStudents)
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
              id="checkListsYear"
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
              <div className={classes["h3"]}>
                <Button
                  icon={<i className="fa-solid fa-plus"></i>}
                  id={"add-checkItemBtn"}
                  className={"check-memo-button"}
                  onclick={() => {
                    //학생 정보 없으면... 실행 불가! 학생정보 입력화면으로 보냄.

                    if (!students || students?.length === 0) {
                      Swal.fire({
                        icon: "error",
                        title: "학생 정보 없음",
                        text: "이번학년도 학생 정보가 없어요! [확인] 버튼을 눌러서 학생명부를 입력해주세요.",
                        confirmButtonText: "확인",
                        confirmButtonColor: "#85bd82",
                        showDenyButton: false,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          navigate(`/student-manage`);
                        }
                      });
                    } else {
                      setUnSubmitStudents([]);
                      setAddCheckItem(true);
                    }
                  }}
                />
                {/* 전학생제외 */}
                <Button
                  icon={exceptGone ? <BsPersonCheck /> : <BsPersonFillCheck />}
                  id={"add-checkItemBtn"}
                  className={"check-memo-button"}
                  onclick={() => {
                    if (goneStudents?.length === 0) {
                      Swal.fire({
                        title: "전출학생 정보 없음",
                        icon: "info",
                        html: "이 기능을 사용하시려면 먼저 전출학생을 등록해주세요.<br/><br/> * [메인화면] - [학생명부] - 화면하단 [전출학생 관리]",
                        confirmButtonText: "확인",
                      });
                    } else {
                      setExceptGone((prev) => !prev);
                    }
                  }}
                  title={
                    exceptGone ? "전학생 포함해서 보기" : "전학생 숨기고 보기"
                  }
                />
              </div>
            )}

            {/* 전담버전에서는 학급을 선택하거나 전체학급이 아닐경우에만 보임 */}
            {isSubject && nowClassName !== "" && nowClassName !== "whole" && (
              <div className={classes["h3"]}>
                <Button
                  icon={<i className="fa-solid fa-plus"></i>}
                  id={"add-checkItemBtn"}
                  className={"check-memo-button"}
                  onclick={() => {
                    let baseItem = {
                      yearGroup: checkListsYear.current.value,
                      clName: nowClassName,
                    };

                    if (!students || students?.length === 0) {
                      Swal.fire({
                        icon: "error",
                        title: "학생 정보 없음",
                        text: "이번학년도 학생 정보가 없어요! [확인] 버튼을 눌러서 학생명부를 입력해주세요.",
                        confirmButtonText: "확인",
                        confirmButtonColor: "#85bd82",
                        showDenyButton: false,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          navigate(`/student-manage`);
                        }
                      });
                    } else {
                      inputStudentsHandler(baseItem);
                      setUnSubmitStudents([]);
                      setAddCheckItem(true);
                    }
                  }}
                />

                {/* 전학생제외 */}
                <Button
                  icon={
                    exceptGone ? (
                      <i className="fa-solid fa-user"></i>
                    ) : (
                      <i className="fa-regular fa-user"></i>
                    )
                  }
                  id={"add-checkItemBtn"}
                  className={"check-memo-button"}
                  onclick={() => {
                    setExceptGone((prev) => !prev);
                  }}
                  title={exceptGone ? "전학생보기" : "전학생숨기기"}
                />
              </div>
            )}
          </div>

          <div className={classes["flex-wrap"]}>
            {/* 제출 미제출 체크리스트들 보여주기 */}
            {nowOnCheckLists &&
              nowOnCheckLists?.map((item) => (
                <li
                  key={item.id + item.title}
                  id={item.id}
                  className={classes.checkLi}
                  onClick={() => {
                    // setUnSubmitStudents(item.unSubmitStudents);
                    setUnSubmitStudents(
                      except_gone_stds(item.unSubmitStudents)
                    );
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
                      ? `미제출(${
                          except_gone_stds(item.unSubmitStudents)?.length
                        })`
                      : "😎 모두 제출했네요!"}
                  </p>
                  <div className={classes.unsubmitArea}>
                    {except_gone_stds(item.unSubmitStudents)?.map((stu) => (
                      <span key={item.id + stu.num}>
                        <Button
                          name={stu.name}
                          id={item.title + stu.num}
                          className={
                            stu?.woman
                              ? "checkList-button"
                              : "checkList-button-man"
                          }
                        />
                      </span>
                    ))}
                  </div>
                </li>
              ))}
          </div>
        </>
      )}

      {props.about === "listMemo" && (
        <>
          {/* 리스트 메모 추가 모달 화면 */}
          {addListMemo && (
            <Modal
              addStyle={"addOverflow"}
              onClose={() => {
                localStorage.setItem("itemId", "null");
                setAddListMemo(false);
              }}
            >
              <ListMemoInput
                goneStudents={goneStudents}
                exceptGone={exceptGone}
                hasNoInputStd={listMemoShowStdOnList(item, "not")?.map(
                  (data) => ({
                    name: data.name,
                    num: data.num,
                    woman: data.woman,
                  })
                )}
                scoreGrade={scoreGrade}
                students={
                  !isSubject
                    ? except_gone_stds(students)
                    : except_gone_stds(inputStudents)
                }
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

          {/* 성적 단계 세팅 화면 */}
          {showScoreGrade && (
            <Modal
              addStyle={"addOverflow"}
              onClose={() => {
                setShowScoreGrade(false);
              }}
            >
              <ScoreGradeInput
                scoreGradeValue={(v) => setScoreGrade(v)}
                closeHandler={() => setShowScoreGrade(false)}
                title={"평가 단계"}
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
                <div className={classes["h3"]}>
                  <Button
                    icon={<i className="fa-solid fa-plus"></i>}
                    id={"add-listMemoBtn"}
                    className={"check-memo-button"}
                    onclick={() => {
                      if (!students || students?.length === 0) {
                        Swal.fire({
                          icon: "error",
                          title: "학생 정보 없음",
                          text: "이번학년도 학생 정보가 없어요! [확인] 버튼을 눌러서 학생명부를 입력해주세요.",
                          confirmButtonText: "확인",
                          confirmButtonColor: "#85bd82",
                          showDenyButton: false,
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            navigate(`/student-manage`);
                          }
                        });
                      } else {
                        setItem([]);
                        setAddListMemo(true);
                      }
                    }}
                  />
                  {/* 전학생제외 */}
                  <Button
                    icon={
                      exceptGone ? <BsPersonCheck /> : <BsPersonFillCheck />
                    }
                    id={"add-checkItemBtn"}
                    className={"check-memo-button"}
                    onclick={() => {
                      setExceptGone((prev) => !prev);
                    }}
                    title={
                      exceptGone ? "전학생 포함해서 보기" : "전학생 숨기고 보기"
                    }
                  />
                </div>
              )}
            </div>

            {/* 전담버전에서는 학급을 선택하거나 전체학급이 아닐경우에만 보임 */}
            {isSubject && nowClassName !== "" && nowClassName !== "whole" && (
              <div className={classes["h3"]}>
                <Button
                  icon={<i className="fa-solid fa-plus"></i>}
                  id={"add-listMemoBtn"}
                  className={"check-memo-button"}
                  onclick={() => {
                    let baseItem = {
                      yearGroup: listMemoYear.current.value,
                      clName: nowClassName,
                    };

                    if (!students || students?.length === 0) {
                      Swal.fire({
                        icon: "error",
                        title: "학생 정보 없음",
                        text: "이번학년도 학생 정보가 없어요! [확인] 버튼을 눌러서 학생명부를 입력해주세요.",
                        confirmButtonText: "확인",
                        confirmButtonColor: "#85bd82",
                        showDenyButton: false,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          navigate(`/student-manage`);
                        }
                      });
                    } else {
                      inputStudentsHandler(baseItem);
                      setItem([]);
                      setAddListMemo(true);
                    }
                  }}
                />

                {/* 전학생제외 */}
                <Button
                  icon={exceptGone ? <BsPersonCheck /> : <BsPersonFillCheck />}
                  id={"add-checkItemBtn"}
                  className={"check-memo-button"}
                  onclick={() => {
                    setExceptGone((prev) => !prev);
                  }}
                  title={
                    exceptGone ? "전학생 포함해서 보기" : "전학생 숨기고 보기"
                  }
                />
              </div>
            )}

            {/* 성적 단계 설정하는 버튼 */}
            <Button
              icon={<FaRankingStar />}
              id={"save-listMemoBtn"}
              className={"check-memo-button"}
              onclick={() => setShowScoreGrade(true)}
              title={"평가단계 설정하기"}
            />

            {/* 엑셀저장버튼 */}
            {/* <Button
              icon={<i className="fa-regular fa-floppy-disk"></i>}
              id={"save-listMemoBtn"}
              className={"check-memo-button"}
              onclick={saveExcelHandler}
            /> */}
          </div>
          <div className={classes["flex-wrap"]}>
            {/* 명렬표에서 입력한 자료들도 보여주기 */}
            {nowOnListMemo &&
              nowOnListMemo?.map((item) => (
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
              "* 2월 16일부터 새로운 학년도로 인식되고 자료 입력이 가능합니다!"}
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
