import React, { useEffect, useState, useCallback } from "react";
import Button from "../Layout/Button";
import { dbService } from "../../fbase";
import { utils, writeFile } from "xlsx";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import classes from "./MainPage.module.css";
import ClassItem from "../Main/ClassItem";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ExampleModal from "./ExampleModal";
import byExcel from "../../assets/student/teacher-excel.gif";

import mainImg from "../../assets/notice/1221.jpg";

import dayjs from "dayjs";
import AttendCalendar from "components/Attendance/AttendCalendar";
import donationImg from "../../assets/notice/donation.png";
import Modal from "components/Layout/Modal";
import MainShortCut from "components/Main/MainShortCut";

dayjs.locale("ko");

const deploy_title = `앱 정비 시간!`;
const deploy_text = `매일 저녁 11:00 ~ 12:30 에는 오류 수정 및 앱 개선 작업이 이루어 집니다!<br/>
사이트 사용 시 저장된 데이터에 문제가 생길 수 있으니, <br/>꼭!!! 사용을 피해주세요. <br/><br/>
** 첵스-쿨은 선생님들의 학급일지 데이터 관리에  도움을 드리고 싶어요! <br/> <b>불편한 점, 개선할 점</b>을 알려주세요! <br/><br/> 
 `;

const monthEnd_title = `월말엔, 자료다운!`;
const monthEnd_text = `월말입니다! 선생님들의 소중한 정보를 다운로드 해주세요!<br/>
(** 학기말이라면.. 꼭이요..!!!! )
메인화면의 '💾 데이터 저장'을 활용해주세요!!<br/><br/>
** 선생님들의 모든 학교 데이터를 <br/> 엑셀파일 하나로 만들어 편하게 보관하실 수 있습니다! <br/><br/> 
** 첵스쿨 사용에 만족하신다면 <br/> <b>첵스쿨 활용팁, 후기를 👉</b> <u>[교사랑] - [추천해요]에 공유</u>해주세요!
 `;

const update_title = `🎁크리스마스 & 연말 커피쿠폰 이벤트! (~ 24/1/5) 🎇`;

const update_text = ` <br/> 
=== 첵스쿨의 온전한 서비스 첫해, 2023년 정산 ===<br/>
하루 평균 이용자 수 <b>170명</b> 내외<br/> 
하루 최대(월말) 이용자 수 <b>310명</b> 내외<br/>
올 한해 [이거해요] 요청 및 반영사항 <b>116개</b><br/>
총 후원 금액 12만원<br/>
혼자 운영하는 미흡한 서비스 임에도 많은 사용과 격려, 참여해 주셔서 감사합니다.☺️  <br/>
이에 보답하고자... 이벤트를 준비했습니다!<br/><br/>
🎁크리스마스 & 연말 커피쿠폰 이벤트!!🎇 <br/>  
올 한해, 첵스쿨을 아껴주신 선생님들께 첵스쿨이 보답합니다.<br/> 
<b> [교사랑] - [추천해요] 에 후기를 올려주세요! (~ 24/1/5) </b> 
(후기나 관련 의견이 부족하면...생각했던 쿠폰 개수가 소진될 때까지 진행합니다! 얼른 쓰세요!🥲)

<br/> <br/> 
1.<br/> 
<b>자주쓰는 기능, 활용 Tip, 좋았던 점, 바라는 점 등 사용의 전반적인 경험</b>을 기록해주세요! 사용후기 중에 랜덤으로 <b>5분</b>에게 쿠폰을 보내드립니다! <br/><br/>

2. <br/>
<b>야너두?? 같은 학교에서 2명 이상</b> 쓰신다면?! kerbong@gmail.com으로  <br/>
학교이름 + 사용하시는 선생님들의 이메일 주소를 보내주세요! 두 분의 사용 데이터가 가장 많은, <b>2개의 학교</b>를 선정하여 모든 선생님들께 쿠폰을 보내드립니다! <br/><br/>

3. <br/>
첵스쿨 최상위 랭커!!!🥇🥈🥉 <br/> 
<b> 12월 22일(금) 기준으로 가장 많은 데이터</b>를 자랑하는 선생님 <b>3분</b>을 선정하여 쿠폰을 보내드립니다!<br/><br/>

** <br/>
<b> [교사랑] - [패드잇]
비밀글 기능이 추가</b>되었습니다! 비밀글로 설정하면, 선생님과 본인만 내용을 확인할 수 있습니다~ <br/> 
아울러, <b>패드잇 접속 오류문제가 수정</b>되었습니다. <br/><br/>

**<br/> 학기말 분반프로그램(https://bit.ly/분반해요) <br/> 타임캡슐 (https://bit.ly/두근두근타임캡슐) 도 많관부!🫡 <br/><br/>

<b>어디서든 눈부신, 모든 선생님들의 학기말을 응원합니다.🔥🔥</b><br/><br/> 

* 일상의 변화, 교사의 성장 파트너 | 첵스-쿨<br/><br/>

`;

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

const STARTBASE = [
  "2022-01-13 08:20",
  "2022-01-13 09:00",
  "2022-01-13 09:50",
  "2022-01-13 10:40",
  "2022-01-13 11:30",
  "2022-01-13 12:10",
  "2022-01-13 13:10",
  "2022-01-13 14:00",
  "2022-01-13 14:50",
  "2022-01-13 15:40",
];

const MainPage = (props) => {
  const [shortCutKey, setShortCutKey] = useState(
    localStorage.getItem("shortCutKey")
      ? JSON.parse(localStorage.getItem("shortCutKey"))
      : ["c", "w", "r"]
  );
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
  const [classStart, setClassStart] = useState(STARTBASE);
  const [nowYearStd, setNowYearStd] = useState([]);
  // const [subjectYear, setSubjectYear] = useState(false);
  const [isSubject, setIsSubject] = useState(false);
  const [classLists, setClassLists] = useState(CLASSLISTS);
  const [isLgWidth, setIsLgWidth] = useState(false);
  const [gridFr3or4, setGridFr3or4] = useState("");
  const [scaleValue, setScaleValue] = useState(document.body.style.zoom || 1);
  const [classFromSchedule, setClassFromSchedule] = useState([]);
  const [getAllDataDone, setGetAllDataDone] = useState(false);
  const [makeShortCut, setMakeShortCut] = useState(false);

  // 올해자료들 모아두기 위한 상태들
  const [nowYearAttends, setNowYearAttends] = useState([]);
  const [nowYearCheckLists, setNowYearCheckLists] = useState([]);
  const [nowYearClassTable, setNowYearClassTable] = useState([]);
  const [nowYearListMemo, setNowYearListMemo] = useState([]);
  const [nowYearTodoLists, setNowYearTodoLists] = useState([]);
  const [nowYearSchedule, setNowYearSchedule] = useState([]);
  const [nowYearAlarm, setNowYearAlarm] = useState([]);
  const [nowYearBudgets, setNowYearBudgets] = useState([]);
  const [nowYearConsult, setNowYearConsult] = useState([]);
  const [nowYearFreeMemo, setNowYearFreeMemo] = useState([]);
  const [nowYearSeats, setNowYearSeats] = useState([]);
  const [nowYearStudentsInfo, setNowYearStudentsInfo] = useState([]);

  //업데이트 내용 보여주기 로컬스토리지에서 showNotice를 스트링으로 저장해서 확인 후에 이전에 봤으면 안보여주기
  const [showNotice, setShowNotice] = useState(false);
  const [showMonthEnd, setShowMonthEnd] = useState(false);
  const [showDeployNotice, setShowDeployNotice] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("showNotice") <= "20240105") {
      setShowNotice(true);
    }
    if (
      +dayjs().format("DD") > 23 &&
      localStorage.getItem("showMonthEnd") !== dayjs().format("YYYYMM")
    ) {
      setShowMonthEnd(true);
    }

    if (+dayjs().format("H") > 21 || +dayjs().format("H") === 0) {
      setShowDeployNotice(true);
    }
  }, []);

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

  //올해 자료인지 판단하는 함수
  const isWithinSchoolYear = (date) => {
    const schoolYearStart = dayjs(nowYear() + "-03-01");
    const schoolYearEnd = schoolYearStart.add(1, "year").subtract(1, "day");

    const inputDate = dayjs(date);

    return (
      inputDate.isAfter(schoolYearStart) && inputDate.isBefore(schoolYearEnd)
    );
  };

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
    //올해 학년도 범위 설정
    let new_nowYearAttends = [];

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
          //모든 데이터 저장용 자료로 만들기, 보고있는 날짜 기준으로 올해 자료만 뽑아주기
          if (isWithinSchoolYear(atd?.id?.slice(0, 10))) {
            new_nowYearAttends.push({ ...atd, cl: Object.keys(cl)[0] });
          }
          // console.log(atd);
          if (atd?.id?.slice(0, 10) === todayYyyymmdd) {
            new_data.push({ ...atd, cl: Object.keys(cl)[0] });
          }
        });
        new_attends.push(...new_data);
      });
      // 담임이면
    } else {
      // doc?.data()?.attend_data?.forEach((data) => {
      attendSnap?.data()?.attend_data?.forEach((data) => {
        //모든 데이터 저장용 자료로 만들기, 보고있는 날짜 기준으로 올해 자료만 뽑아주기
        if (isWithinSchoolYear(data?.id?.slice(0, 10))) {
          new_nowYearAttends.push(data);
        }

        if (data?.id?.slice(0, 10) === todayYyyymmdd) {
          new_attends.push(data);
        }
      });
    }
    //데이터용 올해자료 저장
    setNowYearAttends(new_nowYearAttends);
    setAttendEvents([...new_attends]);
    // });
  };

  //firestore에서 공용/개인 스케쥴 자료 받아오기
  const getScheduleFromDb = async () => {
    setSchedule([]);

    let new_nowYearSchedule = [];

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

    fixed_events?.forEach((data) => {
      //모든 데이터 저장용 자료로 만들기, 보고있는 날짜 기준으로 올해 자료만 뽑아주기
      if (isWithinSchoolYear(data?.id?.slice(0, 10))) {
        new_nowYearSchedule.push(data);
      }
    });

    setNowYearSchedule(new_nowYearSchedule);

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

    let new_nowYearTodoLists = [];

    if (memoSnap.exists()) {
      // onSnapshot(memoRef, (doc) => {
      memoSnap?.data()?.memoTodo?.forEach((data) => {
        //오늘 할일, 메모는 id가 날짜가 아님..
        new_nowYearTodoLists.push(data);

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
      setNowYearTodoLists(new_nowYearTodoLists);
    }
  };

  //firestore에서 제출(냄 안냄) 받아오기
  const getCheckListsFromDb = async () => {
    let checkListsRef = doc(dbService, "checkLists", props.userUid);
    setCheckLists([]);
    let checkListsSnap = await getDoc(checkListsRef);

    let new_nowYearCheckLists = [];
    // onSnapshot(checkListsRef, (doc) => {
    const new_checkLists = [];

    let before7days = last7days(todayYyyymmdd, "past");

    checkListsSnap?.data()?.checkLists_data?.forEach((data) => {
      //모든 데이터 저장용 자료로 만들기, 보고있는 날짜 기준으로 올해 자료만 뽑아주기
      if (isWithinSchoolYear(data?.id?.slice(0, 10))) {
        new_nowYearCheckLists.push(data);
      }

      if (before7days?.includes(data.id.slice(0, 10))) {
        new_checkLists.push(data);
      }
    });
    setNowYearCheckLists(new_nowYearCheckLists);
    setCheckLists([...new_checkLists]);
    // });
  };

  //firestore에서 개별 명렬표 기록 받아오기
  const getListMemoFromDb = async () => {
    let listMemoRef = doc(dbService, "listMemo", props.userUid);
    let listMemoSnap = await getDoc(listMemoRef);

    let new_nowYearListMemo = [];
    setListMemo([]);
    // onSnapshot(listMemoRef, (doc) => {
    const new_listMemo = [];
    let before7days = last7days(todayYyyymmdd, "past");
    listMemoSnap?.data()?.listMemo_data?.forEach((data) => {
      //모든 데이터 저장용 자료로 만들기, 보고있는 날짜 기준으로 올해 자료만 뽑아주기
      if (isWithinSchoolYear(data?.id?.slice(0, 10))) {
        new_nowYearListMemo.push(data);
      }
      if (before7days?.includes(data.id.slice(0, 10))) {
        new_listMemo.push(data);
      }
    });
    setNowYearListMemo(new_nowYearListMemo);
    setListMemo([...new_listMemo]);
    // });
  };

  //firestore에서 오늘 시간표 관련 자료들 받아오기
  const getClassTableFromDb = async () => {
    let classTableRef = doc(dbService, "classTable", props.userUid);
    setTodayClassTable({});

    let new_nowYearClassTable = [];

    //입력한 개별날짜 시간표들
    // setClassTable([]);
    // 시작 시간 모음

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

        all_classTable?.forEach((data) => {
          if (isWithinSchoolYear(data?.id?.slice(0, 10))) {
            new_nowYearClassTable.push(data);
          }
        });

        setNowYearClassTable(new_nowYearClassTable);

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
    // console.log("와이");
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

    let isPageMoved = false;

    //각각의 인덱스를 기준으로 각교시 과목 이름과 메모를 저장함.
    //시간표 정보가 저장되어 있으면.. 최신으로 사용함.
    let recent_classLists = [...classLists];
    if (now_doc?.data()?.classTime?.length > 0) {
      recent_classLists = now_doc.data().classTime;
    }
    recent_classLists.forEach((item, index) => {
      let subject = document.querySelector(`#classSubject-${item}`);
      let memo = document.querySelector(`#classMemo-${item}`);

      if (!subject || !memo) {
        isPageMoved = true;
      }

      new_classMemo["classMemo"].push({
        subject: subject.value.trim(),
        // memo: memo.value.trim(),
        memo: memo.innerHTML,
      });
    });

    //페이지 이동시 끝내기
    if (isPageMoved) return;

    //수업 시간표용으로 만들어서 저장해두기...
    let cttRef = doc(dbService, "classTimeTable", props.userUid);
    let cttDoc = await getDoc(cttRef);
    let new_cttDoc = [];
    if (cttDoc.exists()) {
      new_cttDoc = cttDoc
        ?.data()
        ?.datas?.filter((data) => data.id !== new_classMemo.id);
      new_cttDoc.push(new_classMemo);
    } else {
      new_cttDoc = [new_classMemo];
    }

    let new_classStart = classStart.filter(
      (c, ind) => ind < classLists?.length
    );

    await setDoc(cttRef, {
      datas: new_cttDoc,
      classStart: new_classStart,
      classTitles: classLists,
    });

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

  const getAlarmFromDb = async () => {
    let alarmRef = doc(dbService, "alarm", props.userUid);
    let alarmSnap = await getDoc(alarmRef);

    let new_nowYearAlarm = [];

    if (alarmSnap.exists()) {
      alarmSnap?.data()?.alarm_data?.forEach((data) => {
        if (isWithinSchoolYear(data?.id?.slice(0, 10))) {
          new_nowYearAlarm.push(data);
        }
      });
    }

    setNowYearAlarm(new_nowYearAlarm);
  };

  const getBudgetsFromDb = async () => {
    let budgetsRef = doc(dbService, "budgets", props.userUid);
    let budgetsSnap = await getDoc(budgetsRef);

    let new_nowYearBudgets = [];

    if (budgetsSnap.exists()) {
      budgetsSnap?.data()?.budgets_data?.forEach((data) => {
        if (data?.until?.slice(0, 4) === todayYyyymmdd.slice(0, 4)) {
          new_nowYearBudgets.push(data);
        }
      });
    }

    setNowYearBudgets(new_nowYearBudgets);
  };

  const getConsultFromDb = async () => {
    let consultRef = doc(dbService, "consult", props.userUid);
    let consultSnap = await getDoc(consultRef);

    let new_nowYearConsult = [];

    if (consultSnap.exists()) {
      consultSnap?.data()?.consult_data?.forEach((data) => {
        if (isWithinSchoolYear(data?.id?.slice(0, 10))) {
          new_nowYearConsult.push(data);
        }
      });
    }

    setNowYearConsult(new_nowYearConsult);
  };

  const getFreeMemoFromDb = async () => {
    let freeMemoRef = doc(dbService, "freeMemo", props.userUid);
    let freeMemoSnap = await getDoc(freeMemoRef);

    let new_nowYearFreeMemo = [];

    if (freeMemoSnap.exists()) {
      freeMemoSnap?.data()?.freeMemo?.forEach((data) => {
        //23년 4월 10일 이전 저장자료는 id가 없음 ㅠㅠ
        if (!data.id || isWithinSchoolYear(data?.id)) {
          new_nowYearFreeMemo.push(data);
        }
      });
    }
    setNowYearFreeMemo(new_nowYearFreeMemo);
  };

  const getSeatsFromDb = async () => {
    let seatsRef = doc(dbService, "seats", props.userUid);
    let seatsSnap = await getDoc(seatsRef);

    let new_nowYearSeats = [];

    if (seatsSnap.exists()) {
      seatsSnap?.data()?.seats_data?.forEach((data) => {
        if (isWithinSchoolYear(data?.saveDate?.slice(0, 10))) {
          new_nowYearSeats.push(data);
        }
      });
    }
    setNowYearSeats(new_nowYearSeats);
  };

  const getStudentsInfoFromDb = async () => {
    let studentsInfoRef = doc(dbService, "studentsInfo", props.userUid);
    let studentsInfoSnap = await getDoc(studentsInfoRef);

    if (studentsInfoSnap.exists()) {
      setNowYearStudentsInfo(studentsInfoSnap?.data()?.info_datas);
    }
    //이게 데이터 받기 마지막이라 다 받고, 받아왔다는 상태 세팅하기!
    setGetAllDataDone(true);
  };

  //모든 데이터 받아오는 함수, 없던 데이터들 받아오기
  const getAllDataHandler = () => {
    // if (isSubject) return;
    getAlarmFromDb();
    getBudgetsFromDb();
    getConsultFromDb();
    getFreeMemoFromDb();
    getSeatsFromDb();
    // 마지막 학생정보 받아오면서 데이터 다 받아왔다는 상태도 세팅
    getStudentsInfoFromDb();
  };

  //모든 데이터 저장함수..!! 담임은 파일 하나, 전담은 반별파일만들어야 할듯
  const allDataExcelSaveHandler = () => {
    //새로운 가상 엑셀파일 생성 담임은 하나, 전담은 반별로
    localStorage.setItem("showMonthEnd", dayjs().format("YYYYMM"));
    //========= 담임용 데이터 만들기 =========
    function removeLeadingZeros(str) {
      return str.replace(/^0+/, "");
    }
    // if (!isSubject) {
    let book = utils.book_new();
    // ==========출결저장=========
    const new_attends_datas = [];
    nowYearAttends?.forEach((attend) => {
      // 번호 이름 년 월 일 옵션 노트 순으로
      let data = [
        +attend.num,
        attend.name,
        +attend.id.slice(0, 4),
        +removeLeadingZeros(attend.id.slice(5, 7)),
        +removeLeadingZeros(attend.id.slice(8, 10)),
        attend.paper ? "제출" : "미제출",
        attend.option.slice(1),
        attend?.note,
      ];
      if (isSubject) {
        data.unshift(attend.cl);
      }

      new_attends_datas.push(data);
    });

    let attend_title = [
      "번호",
      "이름",
      "년",
      "월",
      "일",
      "서류제출",
      "출결옵션",
      "메모내용",
    ];
    if (isSubject) {
      attend_title.unshift("반");
    }
    new_attends_datas.unshift(attend_title);

    const attends_datas = utils.aoa_to_sheet(new_attends_datas);
    //셀의 넓이 지정
    attends_datas["!cols"] = [
      { wpx: 30 },
      { wpx: 50 },
      { wpx: 40 },
      { wpx: 25 },
      { wpx: 25 },
      { wpx: 60 },
      { wpx: 60 },
      { wpx: 150 },
    ];
    if (isSubject) {
      attends_datas["!cols"].unshift({ wpx: 50 });
    }

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, attends_datas, "출결");

    // ==========상담 저장=========
    const new_consult_datas = [];

    nowYearConsult?.forEach((consult) => {
      // 번호 이름 년 월 일 옵션 노트 첨부파일 순으로
      let data = [
        +consult.num,
        consult.name,
        +consult.id.slice(0, 4),
        +removeLeadingZeros(consult.id.slice(5, 7)),
        +removeLeadingZeros(consult.id.slice(8, 10)),
        consult.option.slice(1),
        consult?.note,
        consult?.attachedFileUrl,
      ];
      if (isSubject) {
        data.unshift(consult.clName);
      }

      new_consult_datas.push(data);
    });

    let consult_title = [
      "번호",
      "이름",
      "년",
      "월",
      "일",
      "상담옵션",
      "메모내용",
      "첨부파일",
    ];
    if (isSubject) {
      consult_title.unshift("반");
    }

    new_consult_datas.unshift(consult_title);

    const consult_datas = utils.aoa_to_sheet(new_consult_datas);
    //셀의 넓이 지정
    consult_datas["!cols"] = [
      { wpx: 30 },
      { wpx: 50 },
      { wpx: 40 },
      { wpx: 25 },
      { wpx: 25 },
      { wpx: 60 },
      { wpx: 500 },
      { wpx: 120 },
    ];
    if (isSubject) {
      consult_datas["!cols"].unshift({ wpx: 50 });
    }

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, consult_datas, "상담");

    // ==========제출 미제출 저장=========

    const new_checkLists_datas = [];
    const new_listMemo_datas = [];
    // 학생 이름을 세로에 쭉 써주고, 오른쪽으로 체크리스트 값들을 넣어주기
    let checkLists_datas;
    let listMemo_datas;

    if (!isSubject) {
      let check_data_title = ["번호", "이름"];
      let check_data_id = ["", "날짜"];
      let check_data_cols = [];
      //제출 미제출 제목, id, 간격 써주기
      nowYearCheckLists?.forEach((check) => {
        check_data_id.push(check.id.slice(0, 10));
        check_data_title.push(check.title);
        check_data_cols.push({ wpx: 70 });
      });

      // ==========개별기록 저장=========

      const new_listMemo_datas = [];
      // 학생 이름을 세로에 쭉 써주고, 오른쪽으로 체크리스트 값들을 넣어주기
      let listMemo_data_title = ["번호", "이름"];
      let listMemo_data_id = ["", "날짜"];
      let listMemo_data_cols = [];

      //개별기록 제목, id, 간격 써주기
      nowYearListMemo?.forEach((list) => {
        listMemo_data_id.push(list.id.slice(0, 10));
        listMemo_data_title.push(list.title);
        listMemo_data_cols.push({ wpx: 100 });
      });

      nowYearStd?.forEach((std) => {
        //제출 미제출 데이터 만들기
        let check_data = [+std.num, std.name];
        nowYearCheckLists?.forEach((check) => {
          if (
            check.unSubmitStudents?.filter(
              (unSubStd) => unSubStd.name === std.name
            )?.length > 0
          ) {
            check_data.push("X");
          } else {
            check_data.push("O");
          }
        });
        new_checkLists_datas.push(check_data);

        //개별기록 데이터 만들기
        let listMemo_data = [+std.num, std.name];
        nowYearListMemo?.forEach((list) => {
          listMemo_data.push(
            list.data?.filter((data_std) => data_std.name === std.name)[0]?.memo
          );
        });
        new_listMemo_datas.push(listMemo_data);
      });

      new_checkLists_datas.unshift(check_data_title);
      new_checkLists_datas.unshift(check_data_id);

      checkLists_datas = utils.aoa_to_sheet(new_checkLists_datas);
      //셀의 넓이 지정
      checkLists_datas["!cols"] = [
        { wpx: 30 }, //번호
        { wpx: 50 }, // 이름
        ...check_data_cols,
      ];

      new_listMemo_datas.unshift(listMemo_data_title);
      new_listMemo_datas.unshift(listMemo_data_id);

      listMemo_datas = utils.aoa_to_sheet(new_listMemo_datas);
      //셀의 넓이 지정
      listMemo_datas["!cols"] = [
        { wpx: 30 }, //번호
        { wpx: 50 }, // 이름
        ...listMemo_data_cols,
      ];
    } else {
      //아우 헷갈려, 먼저 말로 쓴 후에 코드 쓰자.
      //먼저 반별로 title 한줄, id한줄, 간격 한줄 넣어주고,
      //학급의 학생들배열로 forEach돌려서 이름한줄 추가하면서 체크리스트 자료중에 현재 학급 이름과 같고 미제출학생에 현재 학생이름과 같은 자료가 있으면 o,없으면 x 넣어주기
      //학급의 데이터 돌리기 다끝나면 전체 new_checkLists_datas에 다 넣어주기

      //반별로 작업하기
      nowYearStd?.forEach((clObj) => {
        let check_data_title = ["반", "번호", "이름"];
        let check_data_id = ["", "", "날짜"];
        let check_data_cols = [{ wpx: 50 }, { wpx: 30 }, { wpx: 50 }];
        let check_data_all = [];

        let listMemo_data_title = ["반", "번호", "이름"];
        let listMemo_data_id = ["", "", "날짜"];
        let listMemo_data_cols = [{ wpx: 50 }, { wpx: 30 }, { wpx: 50 }];
        let listMemo_data_all = [];

        //타이틀 id 간격자료 추가해주기
        nowYearCheckLists?.forEach((check) => {
          if (check?.clName !== Object.keys(clObj)[0]) return;
          //자료가 현재 학급 이름과 같은 자료면 학생 개별로 그려줌
          check_data_id.push(check.id.slice(0, 10));
          check_data_title.push(check.title);
          check_data_cols.push({ wpx: 70 });
        });

        //타이틀 id 간격자료 추가해주기
        nowYearListMemo?.forEach((list) => {
          if (list?.clName !== Object.keys(clObj)[0]) return;
          //자료가 현재 학급 이름과 같은 자료면 학생 개별로 그려줌
          listMemo_data_id.push(list.id.slice(0, 10));
          listMemo_data_title.push(list.title);
          listMemo_data_cols.push({ wpx: 70 });
        });

        clObj[Object.keys(clObj)[0]]?.forEach((std) => {
          let check_data = [];
          check_data.push(Object.keys(clObj)[0]);
          check_data.push(+std.num, std.name);
          let listMemo_data = [];
          listMemo_data.push(Object.keys(clObj)[0]);
          listMemo_data.push(+std.num, std.name);
          nowYearCheckLists?.forEach((check) => {
            if (check?.clName !== Object.keys(clObj)[0]) return;
            //제출 자료의ㅡ 학급이름과 미제출학생이름이 같으면
            if (
              check.unSubmitStudents?.filter(
                (unSubStd) => unSubStd.name === std.name
              )?.length > 0
            ) {
              check_data.push("X");
            } else {
              check_data.push("O");
            }
          });
          check_data_all.push(check_data);

          nowYearListMemo?.forEach((list) => {
            if (list?.clName !== Object.keys(clObj)[0]) return;
            listMemo_data.push(
              list.data?.filter((data_std) => data_std.name === std.name)[0]
                ?.memo
            );
          });
          listMemo_data_all.push(listMemo_data);
        });

        new_checkLists_datas.push(
          check_data_id,
          check_data_title,
          ...check_data_all
        );

        new_checkLists_datas.push([]);
        new_checkLists_datas.push([]);
        new_checkLists_datas.push([]);

        checkLists_datas = utils.aoa_to_sheet(new_checkLists_datas);
        //셀의 넓이 지정
        checkLists_datas["!cols"] = [...check_data_cols];

        new_listMemo_datas.push(
          listMemo_data_id,
          listMemo_data_title,
          ...listMemo_data_all
        );

        new_listMemo_datas.push([]);
        new_listMemo_datas.push([]);
        new_listMemo_datas.push([]);

        listMemo_datas = utils.aoa_to_sheet(new_listMemo_datas);
        //셀의 넓이 지정
        listMemo_datas["!cols"] = [...listMemo_data_cols];
      });
    }

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, checkLists_datas, "제출");

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, listMemo_datas, "개별기록");

    /////////전담용 여기까지 완료////////////

    // ==========일정 (스케쥴) 저장=========
    const new_schedule_datas = [];
    nowYearSchedule
      ?.sort((a, b) => (a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1))
      ?.forEach((schd, index) => {
        let data = [
          +index + 1,
          +schd.id.slice(0, 4),
          +removeLeadingZeros(schd.id.slice(5, 7)),
          +removeLeadingZeros(schd.id.slice(8, 10)),
          schd.option.slice(1),
          schd.eventName,
          schd.set ? schd.set + "(" + schd?.setNum + ")" : "",
          schd.note,
        ];

        new_schedule_datas.push(data);
      });

    new_schedule_datas.unshift([
      "순",
      "년",
      "월",
      "일",
      "분류",
      "행사명",
      "반복일정(회차)",
      "메모 내용",
    ]);

    const schedule_datas = utils.aoa_to_sheet(new_schedule_datas);
    //셀의 넓이 지정
    schedule_datas["!cols"] = [
      { wpx: 30 },
      { wpx: 50 },
      { wpx: 40 },
      { wpx: 40 },
      { wpx: 80 },
      { wpx: 130 },
      { wpx: 120 },
      { wpx: 250 },
    ];

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, schedule_datas, "일정");

    // ============시간표는..
    //   id : ,  classMemo : [{classNum  memo  subject }]
    //세로축에는 1~8교시? 기초시간표의 classTime을 활용하는데 이미 classLists에 저장되어 있음.

    // 가로축의 명칭에는 날짜 써주고

    /** html요소가 담긴 시간표 내용에서 텍스트만 추출하는 함수 */
    const removeTagsAndExtractText = (memo) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(memo, "text/html");
      const textNodes = doc.evaluate(
        "//text()[normalize-space()]",
        doc,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );

      let extractedText = "";
      for (let i = 0; i < textNodes.snapshotLength; i++) {
        const textNode = textNodes.snapshotItem(i);
        // Check if the node contains only text content
        if (textNode.parentNode && textNode.parentNode.nodeName !== "STYLE") {
          extractedText += textNode.textContent.trim();
        }
      }

      // console.log(extractedText.trim());
      return extractedText.trim();
    };

    // ========== 시간표 저장=========
    const new_classTable_datas = [];

    //년 월 + 일로 두칸으로 바꿔서 넣어주기. 검색하기 쉽도록..
    nowYearClassTable?.forEach((clTable) => {
      new_classTable_datas.push([
        "",
        clTable.id.slice(2, 4) +
          "년" +
          removeLeadingZeros(clTable.id.slice(5, 7)) +
          "월" +
          removeLeadingZeros(clTable.id.slice(8, 10)) +
          "일",
      ]);
      new_classTable_datas.push(["교시", "과목", "수업메모"]);
      classLists?.forEach((clTime, time_index) => {
        clTable.classMemo.forEach((memo, memo_index) => {
          if (time_index !== memo_index) return;
          new_classTable_datas.push([
            clTime,
            memo.subject,
            removeTagsAndExtractText(memo.memo),
          ]);
        });
      });
      //날짜 별 구분을 위한 두줄 띄기
      new_classTable_datas.push([]);
      new_classTable_datas.push([]);
    });

    const class_table_datas = utils.aoa_to_sheet(new_classTable_datas);
    //셀의 넓이 지정
    class_table_datas["!cols"] = [{ wpx: 60 }, { wpx: 100 }, { wpx: 700 }];

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, class_table_datas, "시간표");

    // ========== 예산 내용 저장=========
    const new_budgets_datas = [];
    nowYearBudgets?.forEach((budget, index) => {
      let data = [
        +index + 1,
        budget.budget_name,
        budget.until,
        "",
        "",
        +budget.totalAmount,
        "",
        budget.note,
      ];

      new_budgets_datas.push([
        "예산순",
        "예산명",
        "사용기한",
        "",
        "",
        "예산총액",
        "",
        "메모",
      ]);
      new_budgets_datas.push(data);

      //예산과 품목 구분을 위한 한 줄 넣어주기
      new_budgets_datas.push([]);
      new_budgets_datas.push([
        "품목순",
        "품목명",
        "사용날짜",
        "개별금액",
        "개수",
        "총금액",
        "사이트",
        "메모",
      ]);
      budget?.useLists?.forEach((list, list_index) => {
        new_budgets_datas.push([
          +list_index + 1,
          list.title,
          list.date.slice(0, 10),
          +list.each,
          +list.count,
          +list.amount,
          list.site,
          list.note,
        ]);
      });

      //예산 구분을 위한 세 줄 넣어주기
      new_budgets_datas.push([]);
      new_budgets_datas.push([]);
      new_budgets_datas.push([
        "######################################################  구 분 선  ######################################################################",
      ]);
      new_budgets_datas.push([]);
      new_budgets_datas.push([]);
    });

    const budgets_datas = utils.aoa_to_sheet(new_budgets_datas);
    //셀의 넓이 지정
    budgets_datas["!cols"] = [
      { wpx: 50 }, //순
      { wpx: 140 }, //품목명
      { wpx: 80 }, //사용날짜
      { wpx: 80 }, //개별금액
      { wpx: 50 }, //개수
      { wpx: 90 }, //총금액
      { wpx: 130 }, //사이트
      { wpx: 300 }, //메모
    ];

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, budgets_datas, "예산");

    // ==========메모(오늘 할일) 저장=========
    const new_memo_datas = [];
    nowYearTodoLists?.forEach((todoList, index) => {
      let data = [
        +index + 1,
        todoList.emg === true ? "중요" : "",
        todoList.checked === true ? "완료" : "진행중",
        todoList.text,
      ];

      new_memo_datas.push(data);
    });

    new_memo_datas.unshift(["순", "중요표시", "완료", "할 일 내용"]);

    const todoList_datas = utils.aoa_to_sheet(new_memo_datas);
    //셀의 넓이 지정
    todoList_datas["!cols"] = [
      { wpx: 30 },
      { wpx: 50 },
      { wpx: 50 },
      { wpx: 750 },
    ];

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, todoList_datas, "오늘 할일");

    // ==========알림장 내용 저장=========
    const new_alarm_datas = [];
    nowYearAlarm?.forEach((alarm, index) => {
      let data = [+index + 1, alarm.id, alarm.text];

      new_alarm_datas.push(data);
    });

    new_alarm_datas.unshift(["순", "날짜", "알림장 내용"]);

    const alarm_datas = utils.aoa_to_sheet(new_alarm_datas);
    //셀의 넓이 지정
    alarm_datas["!cols"] = [{ wpx: 30 }, { wpx: 80 }, { wpx: 850 }];

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, alarm_datas, "알림장");

    // ========== 자유 메모 (메모폴더) 내용 저장=========
    const new_freeMemo_datas = [];
    nowYearFreeMemo?.forEach((freeMemo, index) => {
      let data = [
        +index + 1,
        freeMemo.category.join(", "),
        freeMemo.title,
        freeMemo.text,
      ];

      new_freeMemo_datas.push(data);
    });

    new_freeMemo_datas.unshift(["순", "분류(카테고리)", "제목", "메모 내용"]);

    const freeMemo_datas = utils.aoa_to_sheet(new_freeMemo_datas);
    //셀의 넓이 지정
    freeMemo_datas["!cols"] = [
      { wpx: 30 },
      { wpx: 150 },
      { wpx: 120 },
      { wpx: 400 },
    ];

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, freeMemo_datas, "메모폴더");

    // ==========학생정보 저장=========

    const new_studentsInfo_datas = [];
    // 학생 이름을 세로에 쭉 써주고,
    let studentsInfo_data_title = [
      "번호",
      "이름",
      "월",
      "일",
      "학생연락처",
      "모성명",
      "모연락처",
      "부성명",
      "부연락처",
      "형제자매",
      "기타",
    ];
    if (isSubject) {
      studentsInfo_data_title.unshift("반");
    }

    new_studentsInfo_datas.push(studentsInfo_data_title);

    nowYearStudentsInfo?.forEach((stdData) => {
      let info_data = [
        stdData.num,
        stdData.name,
        stdData.month,
        stdData.day,
        stdData.studTel,
        stdData.mom,
        stdData.momTel,
        stdData.dad,
        stdData.dadTel,
        stdData.bns,
        stdData.etc,
      ];
      if (isSubject) {
        info_data.unshift(stdData.clName);
      }
      new_studentsInfo_datas.push(info_data);
    });

    const studentsInfo_datas = utils.aoa_to_sheet(new_studentsInfo_datas);
    //셀의 넓이 지정
    studentsInfo_datas["!cols"] = [
      { wpx: 30 },
      { wpx: 50 },
      { wpx: 30 },
      { wpx: 30 },
      { wpx: 120 },
      { wpx: 50 },
      { wpx: 120 },
      { wpx: 50 },
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 120 },
    ];
    if (isSubject) {
      studentsInfo_datas["!cols"].unshift({ wpx: 60 });
    }

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, studentsInfo_datas, "학생정보");

    let fileName;
    if (!isSubject) {
      fileName = `${nowYear()}학년도 학급 기록(by첵스쿨)(${dayjs().format(
        "YYYY-MM-DD"
      )}저장).xlsx`;
    } else {
      fileName = `${nowYear()}학년도 전담(전체학급) 기록(by첵스쿨)(${dayjs().format(
        "YYYY-MM-DD"
      )}저장).xlsx`;
    }
    // 최종 파일 만들기
    writeFile(book, fileName);
  };

  //단축키 작동하는 부분
  useEffect(() => {
    let year = todayYyyymmdd.slice(0, 4);
    let month = todayYyyymmdd.slice(5, 7);

    if (+month <= 1) {
      year = String(+year - 1);
    }

    let isSubject = false;
    props.isSubject?.forEach((yearData) => {
      if (Object.keys(yearData)?.[0] === year) {
        isSubject = yearData[year];
      }
    });

    const handleKeyDown = (event) => {
      //전담은 작동안함..
      if (isSubject) return;

      //브라우저가 event.key를 허용하지 않으면 작동하지 않음
      if (!event.key) {
        Swal.fire(
          "단축키 작동 에러",
          "해당 브라우저에서는 단축키가 작동하지 않습니다. 브라우저의 최신 버전으로 업데이트를 진행해주세요.",
          "warning"
        );
        return;
      }

      const { target } = event;

      //현재 커서 위치가 시간표 과목입력 부분에 있으면 작동안함
      if (target?.id?.includes("classSubject") === true) return;

      //현재 커서 위치가 시간표 내용입력 부분에 있으면 작동안함
      if (target?.getAttribute("contentEditable") === "true") return;

      //현재 커서 위치가 단축키 설정화면의 입력창에 있는경우 실행하지 않음
      if (target?.className?.includes("MainShortCut") === true) return;

      // 출결 추가 눌린 상태로 이동
      if (event.key.toLowerCase() === shortCutKey[0]) {
        navigate(`/attendance`, {
          state: { todo: "add" },
        });
      } else if (event.key.toLowerCase() === shortCutKey[1]) {
        navigate(`/checkListMemo`, {
          state: { about: "checkLists", todo: "add" },
        });
      } else if (event.key.toLowerCase() === shortCutKey[2]) {
        navigate(`/checkListMemo`, {
          state: { about: "listMemo", todo: "add" },
        });
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortCutKey]);

  // 실직적으로 화면 그리기... 휴 어렵다.

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

      {/* //10시 ~ 1시까지 보여줄 업데이트 팝업창 */}
      {showDeployNotice && (
        <ExampleModal
          onClose={() => {
            setShowDeployNotice(false);
          }}
          title={
            <h1
              style={{
                margin: "10px 0 25px 0",
                display: "flex",
                justifyContent: "center",
              }}
              dangerouslySetInnerHTML={{ __html: deploy_title }}
            ></h1>
          }
          text={
            <>
              <p
                className={`${classes.p} ${classes.top}`}
                dangerouslySetInnerHTML={{ __html: deploy_text }}
              ></p>
            </>
          }
        />
      )}

      {/* 매달 말 나오느느 팝업창 */}
      {/* //update 업데이트 시 보여줄 팝업창 */}
      {showMonthEnd && (
        <ExampleModal
          onClose={() => {
            setShowMonthEnd(false);
          }}
          title={
            <h1
              style={{
                margin: "10px 0 25px 0",
                display: "flex",
                justifyContent: "center",
              }}
              dangerouslySetInnerHTML={{ __html: monthEnd_title }}
            ></h1>
          }
          text={
            <>
              <p
                className={`${classes.p} ${classes.top}`}
                dangerouslySetInnerHTML={{ __html: monthEnd_text }}
              ></p>
            </>
          }
        />
      )}

      {/* //update 업데이트 시 보여줄 팝업창 */}
      {showNotice && (
        <ExampleModal
          onClose={() => {
            localStorage.setItem("showNotice", dayjs().format("YYYYMMDD"));
            setShowNotice(false);
          }}
          imgSrc={mainImg}
          title={
            <h1
              style={{
                margin: "10px 0 25px 0",
                display: "flex",
                justifyContent: "center",
              }}
              dangerouslySetInnerHTML={{ __html: update_title }}
            ></h1>
          }
          text={
            <>
              <p
                className={`${classes.p} ${classes.top}`}
                dangerouslySetInnerHTML={{ __html: update_text }}
              ></p>
            </>
          }
        />
      )}

      {/* 단축키 설정 모달창 */}
      {makeShortCut && (
        <>
          <Modal onClose={() => setMakeShortCut(false)} addStyle={"shortcut"}>
            <MainShortCut
              shortCutKey={shortCutKey}
              closeModal={() => setMakeShortCut(false)}
              saveShortCut={(keys) => {
                setShortCutKey(keys);
              }}
            />
          </Modal>
        </>
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
                name={" 시간표"}
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
              {!isSubject && (
                <Button
                  name={" 단축키"}
                  onclick={() => setMakeShortCut(true)}
                  className={`main-studentPage`}
                  icon={<i className="fa-solid fa-gear"></i>}
                />
              )}
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

                      // [ {index: ,time: , subject: } ]

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
                          {/* 제출 제목 및 미제출자 수 */}
                          {event.title} ({event.unSubmitStudents.length})
                        </span>
                        <span className={classes["mainCheckLists-students"]}>
                          {" "}
                          {event.unSubmitStudents?.map((stu) => (
                            <span
                              key={stu.num + stu.name}
                              className={classes["mainCheckLists-student"]}
                            >
                              {/* 미제출자 이름 보여주기 */}
                              {`${stu.name}`}
                            </span>
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
                {!isSubject &&
                  listMemo?.map((event) => {
                    return (
                      event.data.length !== nowYearStd?.length && (
                        <li
                          key={event.id}
                          className={classes["mainCheckLists-li"]}
                        >
                          <span>
                            {event.title} / 미입력 (
                            {
                              nowYearStd
                                ?.filter(
                                  (clObj) =>
                                    Object.keys(clObj)?.[0] === event.clName
                                )?.[0]
                                ?.[event.clName]?.filter(
                                  (stu) =>
                                    !event.data
                                      ?.map((data) => +data.num)
                                      .includes(+stu.num)
                                ).length
                            }
                            )
                          </span>
                          {/* 개별기록 미작성자 이름 */}
                          <span className={classes["mainCheckLists-students"]}>
                            {" "}
                            {nowYearStd?.map((std) => {
                              if (
                                event?.data?.filter(
                                  (data) => data.name === std.name
                                ).length > 0
                              )
                                return null;
                              return (
                                <span
                                  key={std.num + std.name}
                                  className={classes["mainCheckLists-student"]}
                                >
                                  {/* 미제출자 이름 보여주기 */}
                                  {`${std.name}`}
                                </span>
                              );
                            })}
                          </span>
                        </li>
                      )
                    );
                  })}

                {isSubject &&
                  listMemo?.map((event) => {
                    let nowClassStd = nowYearStd?.filter(
                      (clObj) => Object.keys(clObj)?.[0] === event.clName
                    )?.[0]?.[event.clName];
                    return (
                      event.data.length !== nowClassStd?.length && (
                        <li
                          key={event.id}
                          className={classes["mainCheckLists-li"]}
                        >
                          <span>
                            <span className={classes["mr-underline"]}>
                              {event.clName}
                            </span>
                            {event.title} / 미입력 (
                            {
                              nowClassStd?.filter(
                                (stu) =>
                                  !event.data
                                    ?.map((data) => +data.num)
                                    .includes(+stu.num)
                              ).length
                            }
                            )
                          </span>
                          {/* 개별기록 미작성자 이름 */}
                          <span className={classes["mainCheckLists-students"]}>
                            {" "}
                            {nowClassStd?.map((std) => {
                              if (
                                event?.data?.filter(
                                  (data) => data.name === std.name
                                ).length > 0
                              )
                                return null;
                              return (
                                <span
                                  key={std.num + std.name}
                                  className={classes["mainCheckLists-student"]}
                                >
                                  {/* 미제출자 이름 보여주기 */}
                                  {`${std.name}`}
                                </span>
                              );
                            })}
                          </span>
                        </li>
                      )
                    );
                  })}
              </>
            )}
          </div>

          <div>
            {/* 상담 부분 */}
            <div
              className={classes["event-div"]}
              onClick={() => navigate(`/consulting`)}
            >
              <div className={classes["event-title"]}>📒 상담</div>
              <hr className={classes["main-hr"]} />
              <p>* 상담화면으로 이동</p>
            </div>

            {/* 모든 데이티 다운받기 부분 */}
            <div className={classes["event-div"]}>
              <div className={classes["event-title"]}>
                💾 데이터 저장 | 후원
              </div>
              <hr className={classes["main-hr"]} />
              <p>* 다운 버튼을 누르시면, 저장 버튼이 생성됩니다.</p>
              <div
                className={classes["event-title"]}
                style={{ justifyContent: "space-evenly" }}
              >
                <div>
                  {!getAllDataDone && (
                    <Button
                      name=" 다운"
                      style={{ minWidth: "85px" }}
                      icon={<i className="fa-solid fa-download"></i>}
                      className={"show-basicClass-button"}
                      onclick={getAllDataHandler}
                    />
                  )}
                  {/* 모든자료 불러오고 나면 보이는 저장버튼 */}
                  {getAllDataDone && (
                    <Button
                      name=" 저장"
                      style={{ minWidth: "85px" }}
                      icon={<i className="fa-regular fa-floppy-disk"></i>}
                      className={"show-basicClass-button"}
                      onclick={allDataExcelSaveHandler}
                    />
                  )}
                </div>

                <div>
                  <img
                    src={donationImg}
                    className={classes.img}
                    alt="donationImg"
                  />
                </div>
              </div>
            </div>
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
