import React, { useEffect, useState, useCallback } from "react";
import Button from "../Layout/Button";
import { dbService } from "../../fbase";

import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import classes from "./MainPage.module.css";
import ClassItem from "../Main/ClassItem";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ExampleModal from "./ExampleModal";
import byExcel from "../../assets/student/teacher-excel.gif";
import mainImg from "../../assets/notice/0327.jpg";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import AttendCalendar from "components/Attendance/AttendCalendar";
// import consultingOption from "consultingOption";
dayjs.locale("ko");

const update_title = `메뉴수정 / 자리뽑기Update `;

const update_text = `불편을 우려하여.. 최대한 빠르게 메뉴 재구성을 진행했습니다!! <br/><br/> 
1.<br/><b>📙생기부📙</b> 탭은 기존의 <br/> <b>[출석] [상담] [개별기록] [제출] </b>기능 이 들어가 있습니다. <u>학생과 관련된 정보를 입력</u>하는 곳입니다! <br/><br/> 
<b>🧭조회🧭</b> 탭 에서는 기존의<br/> <b>[학생정보] [출결] [상담] [제출] [개별기록]  을 조회</b> 하실 수 있습니다. <u>학생과 관련된 정보를 개별, 학급별 조회</u>하는 곳입니다! +++ 개별기록 조회에서 숫자로만 이루어진 데이터를 두 개 이상 선택하면.. <b>멋진 차트가 자동으로 딱!!! 평가 입력에 활용</b>해보세요~ <br/><br/>
<b>📝메모📝</b> 탭 에서는 기존의<br/> <b>[예산] [일정달력] [할일] [메모폴더]  </b>를 사용하실 수 있습니다. <u>업무나 개인일정과 관련된 정보 등을 기록</u>하는 곳입니다! <br/><br/> 
기존의 잼잼에 있던, 다양한 기능들도, <b>교사만 👉 [교사랑]</b> /  <b>학생과 함께 👉 [제자랑]</b> 로 나누어 담았습니다! 메뉴를 누르셔서 직접 탐색해보세요~!! <br/><br/>2.<br/> We-T 메뉴와 제자랑 메뉴의 이름<br/>(두~세글자)을 추천해주세요!!!<br/><br/>* 최대한, 빠르게 개발하고 수정하느라.. 모든 테스트를 거치지 못했습니다ㅠㅠ 기존 기능이기에.. 잘 작동할 것이라 생각하고, 저도 주중에 테스트 해보겠습니다! <br/><br/> 
3.<br/><b> 원하는 학생을 먼저 배치해두고 랜덤처럼 뽑는</b>, 비밀기능이 추가되었습니다!!<br/> 자세한 기능설명은 <b>[제자랑] - [자리뽑기] - 추가하기에서 '사용방법'</b>을 확인해주세요! <br/><br/>

<br/>불편에도 항상 <b>응원해주시고 의견주시고 묵묵히 함께해주시는, 모든 선생님들께 진심으로 감사드립니다!!!</b>🤩 `;

//오늘 날짜 yyyy-mm-dd로 만들기
const getDateHandler = (date, titleOrQuery) => {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  if (titleOrQuery === "title") {
    let weekd = date.getDay();
    let weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    return `${year}년 ${month}월 ${day}일(${weekDays[weekd]})`;
  } else {
    return year + "-" + month + "-" + day;
  }
};

const CLASSLISTS = [
  "아침",
  "1교시",
  "2교시",
  "3교시",
  "4교시",
  "점심",
  "5교시",
  "6교시",
  "방과후",
  "준비물",
];

const MainPage = (props) => {
  const [attendEvents, setAttendEvents] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [toDoLists, setToDoLists] = useState([]);
  const [classTable, setClassTable] = useState([]);
  const [checkLists, setCheckLists] = useState([]);
  const [listMemo, setListMemo] = useState([]);
  const [classBasic, setClassBasic] = useState([]);
  const [todayYyyymmdd, setTodayYyyymmdd] = useState(
    getDateHandler(new Date())
  );
  const [titleDate, setTitleDate] = useState(
    getDateHandler(new Date(), "title")
  );
  const [todayClassTable, setTodayClassTable] = useState({
    id: "",
    classMemo: [],
  });
  const [hideClassTable, setHideClassTable] = useState(true);
  const [classStart, setClassStart] = useState([]);
  const [nowYearStd, setNowYearStd] = useState([]);
  // const [subjectYear, setSubjectYear] = useState(false);
  const [isSubject, setIsSubject] = useState(false);
  const [classLists, setClassLists] = useState(CLASSLISTS);
  const [isLgWidth, setIsLgWidth] = useState(false);
  const [gridFr3or4, setGridFr3or4] = useState("");
  const [scaleValue, setScaleValue] = useState(document.body.style.zoom || 1);
  const [classFromSchedule, setClassFromSchedule] = useState([]);

  //업데이트 내용 보여주기 로컬스토리지에서 showNotice를 스트링으로 저장해서 확인 후에 이전에 봤으면 안보여주기
  const [showNotice, setShowNotice] = useState(
    localStorage.getItem("showNotice") === "20230327" ? false : true
  );

  //화면 사이즈가 변경되면.. 시간표의 기본 세팅을 열림으로 바꿔주기.
  const resizeHandler = useCallback(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1400) {
        setIsLgWidth(true);
        setHideClassTable(false);
        setGridFr3or4("3fr");
      } else if (window.innerWidth > 1000) {
        setIsLgWidth(true);
        setHideClassTable(false);
        setGridFr3or4("4fr");
      } else {
        setGridFr3or4("");
        setIsLgWidth(false);
      }
    });
  }, []);

  // 다른 메뉴에서 처음 진입할 때도.. 시간표 보여주기!
  useEffect(() => {
    if (window.innerWidth > 1400) {
      setIsLgWidth(true);
      setHideClassTable(false);
      setGridFr3or4("3fr");
    } else if (window.innerWidth > 1000) {
      setIsLgWidth(true);
      setHideClassTable(false);
      setGridFr3or4("4fr");
    } else {
      setGridFr3or4("");
      setIsLgWidth(false);
    }
  }, []);

  // 윈도우 창의 크기에 따라 시간표 보여주기 기능 true로 바꾸기
  useEffect(() => {
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const nowYear = () => {
    //해당학년도에 전담여부 확인
    let year = todayYyyymmdd.slice(0, 4);
    let month = todayYyyymmdd.slice(5, 7);

    if (+month <= 2) {
      year = String(+year - 1);
    }
    return year;
  };

  useEffect(() => {
    let new_nowYearStd = props.students?.filter(
      (yearStd) => Object.keys(yearStd)[0] === nowYear()
    )?.[0]?.[nowYear()];
    setNowYearStd(new_nowYearStd);
  }, [props.students]);

  // 기초시간표 자료 받아올 때 classLists 이름이 있으면 세팅해서 불러오도록...? 기초시간표에 교시 쪽에 input 넣어주고 기본 값으로 교시 넣어주기. 수정 저장 가능.

  const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

  let navigate = useNavigate();

  let roomInfo = localStorage.getItem("todoPublicRoom");
  if (roomInfo === null) {
    roomInfo = "--";
  }

  const moveDateHandler = (tomoOrYester) => {
    let now = new Date(todayYyyymmdd);
    let tOrY;
    if (tomoOrYester === "tomorrow") {
      tOrY = new Date(now.setDate(now.getDate() + 1));
    } else if (tomoOrYester === "yesterday") {
      tOrY = new Date(now.setDate(now.getDate() - 1));
    }
    setTodayYyyymmdd(getDateHandler(tOrY, "query"));
    setTitleDate(getDateHandler(tOrY, "title"));
  };

  //지난 7일 구하기..
  const last7days = (today, pastFuture) => {
    let now_date = dayjs(today);
    let new_7days = [];
    if (pastFuture === "past") {
      for (let i = 0; i < 8; i++) {
        new_7days.push(now_date.subtract(i, "d").format("YYYY-MM-DD"));
      }
    } else {
      for (let i = 0; i < 8; i++) {
        new_7days.push(now_date.add(i, "d").format("YYYY-MM-DD"));
      }
    }

    return new_7days;
  };

  const calDateHandler = (date) => {
    let weekd = dayjs(date).format("d");
    let weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    setTodayYyyymmdd(dayjs(date).format("YYYY-MM-DD"));
    setTitleDate(dayjs(date).format(`YYYY년 MM월 DD일(${weekDays[weekd]})`));
  };

  //firestore에서 오늘 attend관련 자료들 받아오기
  const getAttendsFromDb = async (isSubject) => {
    setAttendEvents([]);

    // let attendRef = query(doc(dbService, "attend", props.userUid));
    let attendRef = doc(dbService, "attend", props.userUid);
    // onSnapshot(attendRef, (doc) => {
    let attendSnap = await getDoc(attendRef);
    let new_attends = [];
    if (isSubject) {
      // doc?.data()?.attend_data?.forEach((cl) => {
      attendSnap?.data()?.attend_data?.forEach((cl) => {
        let attends = [];
        // new_attends.push(...Object.values(cl));
        Object.values(cl).forEach((atd) => {
          attends.push(...atd);
        });
        let new_data = [];
        attends?.forEach((atd) => {
          // console.log(atd);
          if (atd?.id?.slice(0, 10) === todayYyyymmdd) {
            new_data.push({ ...atd, cl: Object.keys(cl)[0] });
          }
        });
        new_attends.push(...new_data);
      });
    } else {
      // doc?.data()?.attend_data?.forEach((data) => {
      attendSnap?.data()?.attend_data?.forEach((data) => {
        if (data?.id?.slice(0, 10) === todayYyyymmdd) {
          new_attends.push(data);
        }
      });
    }
    // console.log(new_attends);
    setAttendEvents([...new_attends]);
    // });
  };

  //firestore에서 공용/개인 스케쥴 자료 받아오기
  const getScheduleFromDb = async () => {
    setSchedule([]);

    let publicRef = doc(dbService, "todo", roomInfo);
    let publicSnap = await getDoc(publicRef);
    let personalRef = doc(dbService, "todo", props.userUid);
    let personalSnap = await getDoc(personalRef);

    const new_schedule = [];
    let future7days = last7days(todayYyyymmdd, "future");

    publicSnap?.data()?.todo_data?.forEach((data) => {
      const new_data = { ...data, public: true };
      new_schedule.push(new_data);
    });

    // onSnapshot(personalRef, (doc) => {
    personalSnap?.data()?.todo_data?.forEach((data) => {
      const new_data = { ...data, public: false };
      new_schedule.push(new_data);
    });
    // });

    //혹시 set등록된 자료면.. 회차를 정보에 넣어주기!
    let events_sets = [];
    let events_sets_all = [];
    new_schedule
      ?.sort(
        (a, b) => new Date(a.id.slice(0, 10)) - new Date(b.id.slice(0, 10))
      )
      ?.forEach((evt) => {
        if (evt.set) {
          events_sets_all.push(evt.set);
        }
      });
    if (events_sets_all.length > 0) {
      events_sets = [...new Set(events_sets_all)];
    }

    let set_events = [];
    let noneSet_events = [];
    let fixed_events = [];
    let setFixed_events = [];
    noneSet_events = new_schedule?.filter((evt) => !evt.set);
    //예를 들어 얼티미트 가 set에 포함된 자료에는 다 번호를 매김.
    events_sets?.forEach((setName) => {
      let num = 1;
      new_schedule?.forEach((evt) => {
        if (evt?.set === setName) {
          evt.setNum = num;
          num += 1;
          set_events.push(evt);
        }
      });
    });

    fixed_events = [...set_events, ...noneSet_events];

    setFixed_events = fixed_events?.filter((data) =>
      future7days?.includes(data.id.slice(0, 10))
    );

    // 시간표
    let new_classFromSchedule = [...classLists.map((cl) => "")];
    // 시간표에 보여줄.. 오늘 일정 중에 교시 데이터가 있으면 보여주기 위한 자료
    setFixed_events
      ?.filter((evt) => evt.id.slice(0, 10) === todayYyyymmdd)
      ?.forEach((today_evt) => {
        // console.log(today_evt);
        classLists?.forEach((cl, index) => {
          // 만약 교시를 분별하는 @가 포함되어 있으면.. setNum도 있으면 함께 넣어주기 (저장된 교시명과 일정에 note에 저장한 교시명이 일치하는지 확인하기!!!!)
          if (cl === today_evt.note?.split("@")?.[0]) {
            new_classFromSchedule[index] = `${today_evt.eventName}@${
              today_evt.note
            }${
              today_evt?.setNum
                ? `(${today_evt.setNum}/${
                    events_sets_all?.filter(
                      (evtName) => evtName === today_evt.set
                    )?.length
                  })`
                : ""
            }`;
            // console.log(new_classFromSchedule[index]);
          }
        });
      });

    //일정에 있는 자료 중 과목과 내용 정보 저장해두기
    setClassFromSchedule(new_classFromSchedule);

    setSchedule(
      setFixed_events.sort((a, b) =>
        dayjs(a.id.slice(0, 10)).diff(dayjs(b.id.slice(0, 10)), "day")
      )
    );
  };

  //firestore에서 오늘 할일 관련 자료들 받아오기
  const getTodoListsFromDb = async () => {
    let memoRef = doc(dbService, "memo", props.userUid);
    let memoSnap = await getDoc(memoRef);

    if (memoSnap.exists()) {
      // onSnapshot(memoRef, (doc) => {
      memoSnap?.data()?.memoTodo?.forEach((data) => {
        if (data.checked === false) {
          setToDoLists((prev) => {
            prev.forEach((prev_data, index) => {
              if (prev_data.id === data.id) {
                prev.splice(index, 1);
              }
            });
            return [...prev, data];
          });
        }
      });
      // });
    }
  };

  //firestore에서 제출(냄 안냄) 받아오기
  const getCheckListsFromDb = async () => {
    let checkListsRef = doc(dbService, "checkLists", props.userUid);
    setCheckLists([]);
    let checkListsSnap = await getDoc(checkListsRef);

    // onSnapshot(checkListsRef, (doc) => {
    const new_checkLists = [];

    let before7days = last7days(todayYyyymmdd, "past");

    checkListsSnap?.data()?.checkLists_data?.forEach((data) => {
      if (before7days?.includes(data.id.slice(0, 10))) {
        new_checkLists.push(data);
      }
    });
    setCheckLists([...new_checkLists]);
    // });
  };

  //firestore에서 개별 명렬표 기록 받아오기
  const getListMemoFromDb = async () => {
    let listMemoRef = doc(dbService, "listMemo", props.userUid);
    let listMemoSnap = await getDoc(listMemoRef);

    setListMemo([]);
    // onSnapshot(listMemoRef, (doc) => {
    const new_listMemo = [];
    let before7days = last7days(todayYyyymmdd, "past");
    listMemoSnap?.data()?.listMemo_data?.forEach((data) => {
      if (before7days?.includes(data.id.slice(0, 10))) {
        new_listMemo.push(data);
      }
    });
    setListMemo([...new_listMemo]);
    // });
  };

  //firestore에서 오늘 시간표 관련 자료들 받아오기
  const getClassTableFromDb = async () => {
    let classTableRef = doc(dbService, "classTable", props.userUid);
    setTodayClassTable({});

    //입력한 개별날짜 시간표들
    // setClassTable([]);
    // 시작 시간 모음
    setClassStart([]);

    let new_todayClassTable = {
      id: "",
      classMemo: CLASSLISTS?.map((cl) => {
        return { memo: "", classNum: cl, subject: "" };
      }),
    };

    let class_basic = [];
    let cltime = [];
    const now_doc = await getDoc(classTableRef);
    if (now_doc.exists()) {
      //오늘 요일설정
      let today_weekday = new Date(todayYyyymmdd).getDay();
      //기초 시간표 내용 넣기
      if (today_weekday > 0 && today_weekday < 6) {
        class_basic = now_doc.data()?.[WEEKDAYS[today_weekday]];
      }
      setClassBasic(class_basic);

      //교시별 시작시간 세팅하기
      if (now_doc?.data()?.classStart) {
        setClassStart([...now_doc?.data()?.classStart]);
      }

      //오늘 시간표 기초 데이터(교시명) 만들기
      if (now_doc?.data()?.classTime) {
        cltime = now_doc?.data()?.classTime;
        new_todayClassTable = {
          id: "",
          classMemo: cltime?.map((cl) => {
            return { memo: "", classNum: cl, subject: "" };
          }),
        };
      } else {
        cltime = CLASSLISTS;
      }
      setClassLists(cltime);

      // 저장된 각 날짜의 시간표 데이터가 있으면
      if (now_doc?.data()?.datas) {
        let all_classTable = now_doc?.data()?.datas;
        setClassTable([...all_classTable]);

        let todayClass = all_classTable?.filter(
          (data) => data.id === todayYyyymmdd
        );
        //오늘자료가 있는 경우 넣어주기
        if (todayClass.length !== 0) {
          //기초시간표에서 교시명을 바꾼 경우.. 바꿔서 데이터에 저장해주기..!!
          let new_classMemo = todayClass[0]?.classMemo?.map((cl, index) => {
            return { ...cl, classNum: cltime[index] };
          });
          todayClass[0].classMemo = new_classMemo;

          setTodayClassTable({ ...todayClass[0] });
          return;
          // console.log(todayClass[0]);
          //오늘 자료는 없는 경우.. 혹시 저장된 과목이 있으면 그건 넣어줌!
        } else {
          setTodayClassTable(new_todayClassTable);
        }
        // 저장된 시간표 데이터가 없으면
      } else {
        setTodayClassTable(new_todayClassTable);
      }
      // 아예 새롭게 처음이면
    } else {
      setTodayClassTable(new_todayClassTable);
      setClassLists(CLASSLISTS);
    }
  };

  //db에서 자료 받아오기 useEffect
  useEffect(() => {
    //해당학년도에 전담여부 확인
    let year = todayYyyymmdd.slice(0, 4);
    let month = todayYyyymmdd.slice(5, 7);

    if (+month <= 1) {
      year = String(+year - 1);
    }

    let isSubject = false;
    props.isSubject?.forEach((yearData) => {
      if (Object.keys(yearData)?.[0] === year) {
        setIsSubject(yearData[year]);
        isSubject = yearData[year];
      }
    });

    getAttendsFromDb(isSubject);
    getClassTableFromDb();
    getScheduleFromDb();
    getCheckListsFromDb();
    getListMemoFromDb();
  }, [todayYyyymmdd, props.isSubject]);

  useEffect(() => {
    getTodoListsFromDb();
  }, []);

  //시간표 저장 함수
  const saveClassMemoHandler = async (auto) => {
    //오늘 날짜 데이터를 받을 때... 상태를 쓰면 최신을 쓰지 못할 수 있음(setTImeout때문...)
    //년 월 일
    let nowDate = document.getElementById("todayYYYYMMDD")?.innerText;
    //다른 페이지로 이동해서 혹시 안보이면 사라지도록.. 왜 useEffect return이 작동을 안하지...
    if (document.getElementById("todayYYYYMMDD") === null) return;

    let year = "20" + nowDate.split("년")[0];
    let month = nowDate.split("월")[0].split(" ")[1];
    let day = nowDate.split("일")[0].split(" ")[2];

    let todayYYYYMMDD = dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");

    let new_classMemo = {
      id: todayYYYYMMDD,
      classMemo: [],
    };

    const classMemoRef = doc(dbService, "classTable", props.userUid);
    const now_doc = await getDoc(classMemoRef);

    //각각의 인덱스를 기준으로 각교시 과목 이름과 메모를 저장함.
    //시간표 정보가 저장되어 있으면.. 최신으로 사용함.
    let recent_classLists = [...classLists];
    if (now_doc?.data()?.classTime?.length > 0) {
      recent_classLists = now_doc.data().classTime;
    }
    recent_classLists.forEach((item, index) => {
      let subject = document.querySelector(`#classSubject-${item}`);
      let memo = document.querySelector(`#classMemo-${item}`);

      new_classMemo["classMemo"].push({
        subject: subject.value.trim(),
        memo: memo.value.trim(),
      });
    });

    // console.log(new_classMemo);

    //다르지 않아! 기본세팅
    let isDiff = false;

    let new_classTable = [];

    //상태인 classTable을 사용할 경우... setTImeout으로 자동저장될 때 최신값을 가져오지 못해서.. (키를 누를 당시의 값을 기준으로 함.) 데이터베이스에 있는 최신 정보를 받아오도록.. 해야 할듯. (읽기 횟수가 늘어나기는 하겠지만..)

    let datas = now_doc?.data()?.datas;

    datas?.forEach((item) => {
      if (item.id === new_classMemo.id) {
        //혹시 내용이 다르면 저장할 수 있도록 세팅
        item.classMemo.forEach((cl, index) => {
          if (cl?.memo !== new_classMemo?.["classMemo"]?.[index]?.memo) {
            isDiff = true;
          }
          if (cl?.subject !== new_classMemo?.["classMemo"]?.[index]?.subject) {
            isDiff = true;
          }
        });
        // 혹시 기초시간표 변경으로 새로운 교시가 추가될 경우..
        if (new_classMemo?.["classMemo"]?.length > item?.classMemo?.length) {
          isDiff = true;
        }

        //현재 시간표를 제외한 나머지를 푸시해두고
      } else {
        new_classTable.push(item);
      }
    });

    if (datas?.length > 0) {
      //기존 데이터가 있는데 현재 저장하고 있는 날짜의 자료가 없으면
      if (datas?.filter((data) => data.id === new_classMemo.id).length === 0) {
        isDiff = true;
      }
      //혹시 기존 데이터가 없으면 무조건 저장가능하도록
    } else {
      isDiff = true;
    }

    new_classTable.push(new_classMemo);

    // 동일하면(다르지 않으면) 저장하지 않음
    if (!isDiff) {
      // console.log("동일함");
      return;
    }

    if (!auto) {
      Swal.fire({
        icon: "success",
        title: "저장 완료",
        text: "시간표 과목, 활동 정보가 저장되었습니다.(5초 후에 창이 사라집니다.)",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
    }

    const new_classData = { datas: new_classTable };

    // console.log("수정 저장됨");
    setClassTable(new_classTable);

    if (now_doc.exists()) {
      await updateDoc(classMemoRef, new_classData);
    } else {
      await setDoc(classMemoRef, new_classData);
    }
  };

  //날짜를 변경하고 나면 시간표 내용이 있는지 확인하고, 없으면 dom에서 직접 바꿔주기??
  useEffect(() => {
    // 주말이 아닐 때만 실행함.
    if (titleDate.slice(-2, -1) === "토" || titleDate.slice(-2, -1) === "일")
      return;

    //시간표 보여주기 상태일때만 실행
    if (hideClassTable) return;

    let time = setTimeout(() => {
      classLists?.forEach((item) => {
        let textareaTag = document.getElementById(`classMemo-${item}`);
        if (!textareaTag) return;
        textareaTag.style.height = textareaTag.scrollHeight - 20 + "px";
      });
    }, 100);

    return () => clearTimeout(time);
  }, [todayClassTable, hideClassTable]);

  //할일 목록 중요한 거 부터 보여주는 sort 함수
  const sortEmg = (todo_list) => {
    let sorted_lists = todo_list.sort(function (a, b) {
      let a_emg = a.emg || false;
      let b_emg = b.emg || false;
      return b_emg - a_emg;
    });
    return sorted_lists;
  };

  //시간표 css 바꿔주는 함수
  const tableCssHandler = () => {
    if (gridFr3or4 === "4fr") {
      setGridFr3or4("3fr");
    } else {
      setGridFr3or4("4fr");
    }
  };

  //글자크기 핸들러 함수
  const fontSizeHandler = (isPlus) => {
    let new_scaleValue = scaleValue;
    if (isPlus) {
      new_scaleValue *= 1.2;
      if (new_scaleValue > 1) {
        new_scaleValue = 1;
      }
    } else {
      new_scaleValue /= 1.2;
      if (new_scaleValue < 0.55) {
        new_scaleValue = 0.555;
      }
    }
    if (new_scaleValue === scaleValue) {
      return;
    }
    setScaleValue(new_scaleValue);
  };

  useEffect(() => {
    document.body.style.zoom = scaleValue;
  }, [scaleValue]);

  //시간표 반응 없는 10초마다 저장시키기
  useEffect(() => {
    let ulTextareas = document.querySelector(".ul-textareas");
    let timer;
    const checkInput = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // console.log("자동저장");
        saveClassMemoHandler(true);
      }, 10000);
    };
    ulTextareas?.addEventListener("keydown", checkInput);
    return () => clearTimeout(timer);
  }, [hideClassTable]);

  //오늘 일정 중에...외부강사, 자체행사에 특정 교시가 적혀 있으면.. 그 교시를 classTable에 넣어줌
  // (고민해봐야겠다... 그럼 일정을 엄청 잘 바꿔줘야 하는데...좋긴 한데.. 흠...)
  useEffect(() => {
    // 오늘데이터만 뽑아냄.
    // let today_schedule = schedule?.filter((sc)=> sc.id.slice(0, 10) === todayYyyymmdd)
    // today_schedule?.forEach((data)=> data.note)
  }, [schedule]);

  return (
    <div className={classes["whole-div"]}>
      {props.showMainExample && (
        <ExampleModal
          onClose={() => props.setShowMainExample()}
          imgSrc={byExcel}
          text={
            <>
              <p
                style={{
                  fontSize: "1.3em",
                  textAlign: "center",
                  margin: "5px",
                }}
              >
                === 처음 학생등록 예시 ===
              </p>
              <p style={{ margin: "15px" }}>
                * 화면 왼쪽 상단의 현재 페이지 타이틀을 클릭하시면 각 화면의
                예시를 보실 수 있어요!
              </p>
            </>
          }
        />
      )}

      {/* //update 업데이트 시 보여줄 팝업창 */}
      {showNotice && (
        <ExampleModal
          onClose={() => {
            localStorage.setItem("showNotice", "20230327");
            setShowNotice(false);
          }}
          imgSrc={mainImg}
          text={
            <>
              <h1
                style={{
                  margin: "10px 0 25px 0",
                  display: "flex",
                  justifyContent: "center",
                }}
                dangerouslySetInnerHTML={{ __html: update_title }}
              ></h1>
              <hr style={{ margin: "20px 15px" }} />
              <p
                className={`${classes.p} ${classes.top}`}
                dangerouslySetInnerHTML={{ __html: update_text }}
              ></p>
            </>
          }
          bottomText={
            <>
              <p className={classes.p}>
                * 화면 우측 상단의 <i className="fa-solid fa-user"></i> -
                "공지사항"에 들어오시면 내용을 다시 보실 수 있어요.
              </p>
            </>
          }
        />
      )}

      <div className={`${classes["events"]} events`}>
        <div className={classes["events-dateArea"]}>
          <span
            className={classes["events-dateMove"]}
            onClick={() => moveDateHandler("yesterday")}
          >
            <i
              className={
                !isLgWidth
                  ? "fa-solid fa-chevron-left fa-lg"
                  : "fa-solid fa-chevron-left fa-2xl"
              }
            ></i>
          </span>
          <span
            className={
              getDateHandler(new Date(), "title") === titleDate
                ? classes["events-today"]
                : ""
            }
            id="todayYYYYMMDD"
          >
            {/* {titleDate} */}
            {/* 오늘 날짜 보여주는 부분 날짜 클릭하면 달력도 나옴 */}
            <span className={classes["hide-cal"]}>
              <AttendCalendar
                getDateValue={calDateHandler}
                about="main"
                setStart={new Date(todayYyyymmdd)}
                getMonthValue={() => {}}
              />
            </span>
          </span>
          <span
            className={classes["events-dateMove"]}
            onClick={() => moveDateHandler("tomorrow")}
          >
            <i
              className={
                !isLgWidth
                  ? "fa-solid fa-chevron-right fa-lg"
                  : "fa-solid fa-chevron-right fa-2xl"
              }
            ></i>
          </span>
        </div>

        <div id="title-div">
          <Button
            name={" 오늘로"}
            onclick={() => {
              setTodayYyyymmdd(getDateHandler(new Date()));
              setTitleDate(getDateHandler(new Date(), "title"));
            }}
            className="main-studentPage"
            icon={<i className="fa-solid fa-reply"></i>}
          />
          <Button
            name={" 학생명부"}
            path={"student-manage"}
            className={
              props.students.length !== 0
                ? `main-studentPage`
                : `main-noStudentPage`
            }
            icon={<i className="fa-solid fa-user-plus"></i>}
          />
          {isLgWidth && (
            <>
              <Button
                name={gridFr3or4 === "3fr" ? " 시간표확대" : " 시간표축소"}
                onclick={tableCssHandler}
                className={`main-studentPage`}
                icon={
                  gridFr3or4 === "3fr" ? (
                    <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                  ) : (
                    <i className="fa-solid fa-down-left-and-up-right-to-center"></i>
                  )
                }
              />
            </>
          )}
          {!/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent) && (
            <>
              <Button
                onclick={() => fontSizeHandler(true)}
                className={`main-studentPage`}
                icon={<i className="fa-solid fa-magnifying-glass-plus"></i>}
              />
              <Button
                onclick={() => fontSizeHandler(false)}
                className={`main-studentPage`}
                icon={<i className="fa-solid fa-magnifying-glass-minus"></i>}
              />
            </>
          )}
        </div>

        {/* 각각의 기능을 전체로 묶어서 그리드 해줄... div */}
        <div
          className={`${classes["event-all"]} ${
            gridFr3or4 === "4fr"
              ? classes["event-all-4fr"]
              : gridFr3or4 === "3fr"
              ? classes["event-all-3fr"]
              : ""
          }`}
        >
          {/* 시간표 */}
          <div
            className={`${classes["event-div"]} ${classes["class-table"]} ${
              gridFr3or4 === "3fr"
                ? classes["class-table-3fr"]
                : classes["class-table-4fr"]
            }`}
          >
            <div
              className={classes["event-title"]}
              onClick={() => setHideClassTable((prev) => !prev)}
            >
              🕘 시간표
              <span className={classes["event-title-dropdown"]}>
                {" "}
                {hideClassTable ? (
                  <i className="fa-solid fa-chevron-down"></i>
                ) : (
                  <i className="fa-solid fa-chevron-up"></i>
                )}{" "}
              </span>
            </div>
            <hr className={classes["main-hr"]} />

            <div
              className={
                hideClassTable
                  ? classes["eventContent-hide"]
                  : classes["eventContent-show"]
              }
            >
              {titleDate.slice(-2, -1) !== "토" &&
              titleDate.slice(-2, -1) !== "일" ? (
                <>
                  * 수정, 변경 10초 후 자동저장
                  <ul className={`${classes["ul-section"]} ul-textareas`}>
                    {/* todayClassTable로 렌더링 */}
                    {todayClassTable?.classMemo?.map((clInfo, index) => {
                      // 만약..기초시간표 변경으로.. 해당 교시가 사라졌다면.. 보여주지 않기
                      if (
                        classLists[index] === undefined ||
                        classLists[index] === null
                      )
                        return null;

                      return (
                        <ClassItem
                          key={`item${classLists[index]}`}
                          myKey={`class${classLists[index]}`}
                          classNum={classLists[index]}
                          classStart={classStart?.[index]}
                          subject={
                            // 우선순위 1.해당날짜의 저장한 자료 2.일정자료 3.기초시간표
                            clInfo?.subject !== ""
                              ? clInfo?.subject
                              : classFromSchedule?.[index]?.includes("@")
                              ? classFromSchedule?.[index]?.split("@")?.[0]
                              : classBasic?.[index] || ""
                          }
                          memo={
                            clInfo?.memo !== ""
                              ? clInfo?.memo
                              : classFromSchedule?.[index]?.includes("@")
                              ? classFromSchedule?.[index]?.split("@")?.[2]
                              : ""
                          }
                        />
                      );
                    })}

                    {/* 만약.. 해당 날짜의 자료는 5교시가 최대인데, 기초시간표에 6교시를 추가하면.. classLists로 해당 부분만 렌더링*/}
                    {todayClassTable?.classMemo?.length < classLists.length &&
                      classLists?.map((clName, index) => {
                        // 만약.. 기존 자료에도 인덱스가 있으면
                        if (todayClassTable?.classMemo?.[index]) return null;

                        return (
                          <ClassItem
                            key={`item${clName}`}
                            myKey={`class${clName}`}
                            classNum={clName}
                            classStart={classStart?.[index]}
                            subject={classBasic?.[index] || ""}
                            memo={""}
                          />
                        );
                      })}
                  </ul>
                  <div className={classes["eventSave-div"]}>
                    <Button
                      name={"기초시간표"}
                      className={"show-basicClass-button"}
                      onclick={() => navigate(`/classTable`)}
                    />
                    <Button
                      name={"저장"}
                      className={"save-classItem-button"}
                      onclick={() => saveClassMemoHandler(false)}
                    />
                  </div>
                </>
              ) : (
                "주말에는 푹 쉬세요❤"
              )}
            </div>
          </div>

          {/* 할일 목록 */}
          <div
            className={classes["event-div"]}
            onClick={() => navigate(`/memo`)}
          >
            <div className={classes["event-title"]}>📝 할 일</div>
            <hr className={classes["main-hr"]} />
            {toDoLists.length === 0 ? (
              <li className={classes["main-li"]}>할 일 없음</li>
            ) : (
              sortEmg(toDoLists)?.map((event) => (
                <li key={event.id} className={classes["main-li"]}>
                  {event?.emg && (
                    <span className={"todoapp__mainpage-emergency"}>
                      <i className="fa-solid fa-circle-exclamation"></i>
                    </span>
                  )}
                  <span>{event.text}</span>
                </li>
              ))
            )}
          </div>

          {/* 공용 개별일정 */}
          <div
            className={classes["event-div"]}
            onClick={() => navigate(`/todo`)}
          >
            <div className={classes["event-title"]}>📆 일정</div>
            <hr className={classes["main-hr"]} />
            {schedule.length === 0 ? (
              <li className={classes["main-li"]}>* 다가오는 7일 일정 없음</li>
            ) : (
              schedule?.map((event) => (
                <li key={event.id} className={classes["main-li"]}>
                  <span
                    className={
                      event.id.slice(0, 10) === todayYyyymmdd
                        ? classes["mr-underline"]
                        : ""
                    }
                  >
                    {event.public ? "공용) " : "개인) "}
                    {event.eventName}
                    {event.setNum && ` ${event.setNum}회차`}(
                    {event.option.slice(1)}) /{" "}
                    {dayjs(event.id.slice(0, 10)).format("M월 D일(ddd)")} /{" "}
                    {/* / D-
                    {dayjs(event.id.slice(0, 10)).diff(
                      todayYyyymmdd,
                      "day"
                    )}  */}
                    {event.note ? ` ${event.note}` : ""}
                  </span>
                  <span> </span>
                </li>
              ))
            )}
          </div>

          {/* 출결목록 */}
          <div
            className={classes["event-div"]}
            onClick={() => navigate(`/attendance`)}
          >
            <div className={classes["event-title"]}>
              😉 출결 {attendEvents.length || ""}
            </div>
            <hr className={classes["main-hr"]} />
            {props.students.length === 0 && (
              <li className={classes["main-li"]}>* 학생명부를 입력해주세요!</li>
            )}
            {props.students.length !== 0 && attendEvents.length === 0 ? (
              <li className={classes["main-li"]}>모두 출석!</li>
            ) : (
              attendEvents?.map((event) => (
                <li
                  key={
                    !isSubject
                      ? event.id + event.num
                      : event.cl + event.id + event.num
                  }
                  className={classes["main-li"]}
                >
                  {isSubject && (
                    <span className={classes["mr-underline"]}>{event.cl}</span>
                  )}
                  {event.num}번 - {event.name} / {event.option.slice(1)} /{" "}
                  {event.note || ""}
                </li>
              ))
            )}
          </div>

          {/* 제출 냄안냄 checklist 목록 */}
          <div
            className={classes["event-div"]}
            onClick={() =>
              navigate(`/checkListMemo`, {
                state: { about: "checkLists" },
              })
            }
          >
            <div className={classes["event-title"]}>👉 미제출</div>
            <hr className={classes["main-hr"]} />
            {checkLists.length === 0 ? (
              <li className={classes["main-li"]}> * 최근 7일 자료 없음</li>
            ) : (
              <>
                {checkLists?.map(
                  (event) =>
                    event.unSubmitStudents.length !== 0 && (
                      <li
                        key={event.id}
                        className={classes["mainCheckLists-li"]}
                      >
                        <span>
                          {isSubject && (
                            <span className={classes["mr-underline"]}>
                              {event.clName}
                            </span>
                          )}
                          {event.title} ({event.unSubmitStudents.length})
                        </span>
                        <span className={classes["mainCheckLists-students"]}>
                          {" "}
                          {event.unSubmitStudents?.map((stu) => (
                            <span
                              key={stu.num + stu.name}
                              className={classes["mainCheckLists-student"]}
                            >{`${stu.name}`}</span>
                          )) || ""}
                        </span>
                      </li>
                    )
                )}
              </>
            )}
          </div>

          {/* 개별기록 listmemo 목록 */}
          <div
            className={classes["event-div"]}
            onClick={() =>
              navigate(`/checkListMemo`, {
                state: { about: "listMemo" },
              })
            }
          >
            <div className={classes["event-title"]}>📑 개별기록</div>
            <hr className={classes["main-hr"]} />
            {listMemo.length === 0 ? (
              <li className={classes["main-li"]}> * 최근 7일 자료 없음</li>
            ) : (
              <>
                {listMemo?.map(
                  (event) =>
                    event.data.length !== nowYearStd?.length && (
                      <li
                        key={event.id}
                        className={classes["mainCheckLists-li"]}
                      >
                        <span>
                          {isSubject && (
                            <span className={classes["mr-underline"]}>
                              {event.clName}
                            </span>
                          )}
                          {event.title} / 미입력 (
                          {
                            nowYearStd?.filter(
                              (stu) =>
                                !event.data
                                  ?.map((data) => +data.num)
                                  .includes(+stu.num)
                            ).length
                          }
                          )
                        </span>
                      </li>
                    )
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <p className={classes.p}>* 처음오시면 먼저 학생명부를 입력해주세요!</p>
      <p className={classes.p}>
        * 메뉴의 곰돌이를 누르면 현재 화면으로 오실 수 있어요!
      </p>
    </div>
  );
};

export default MainPage;
