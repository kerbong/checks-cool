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
import mainImg from "../../assets/notice/alarmpage.png";
import dayjs from "dayjs";
import AttendCalendar from "components/Attendance/AttendCalendar";

const update_title = `에러수정 + 알림장추가`;

const update_text = `시간표 부분 에러가 수정되었습니다!!  <br/> 또 알림장 기능이 추가되었습니다!!🎆<br/> <b>[잼잼] - [알림장]</b> 으로 들어가셔서 사용이 가능합니다. <br/> 추후 기능을 조금 더 추가할 예정입니다. <br/> 출석부분도 명렬표와 달력이 한 화면에 나오도록 구성되었고 <br/> 메뉴에 현재 위치한 페이지가 표시됩니다! <br/> 추후, 메뉴부분 정리가 있을 예정입니다. (업데이트 시 다시 안내드리겠습니다!!) <br/> 학기초 바쁜 와중에 불편드려 죄송합니다😭 <br/> 그럼에도 <b>많은 사용과 홍보, 의견 감사합니다!</b>🤩`;
// "* 아, 이거 있으면 좋겠다! 하는 기능이 있으신가요? 내년에 사용해보고 싶은 기능을 추천해주세요! 가장 많은 추천을 받은 아이디어를 선정하여 추가할 계획입니다! '잼잼'-'이거해요' 에 적어주세요~ ";
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
  "5교시",
  "6교시",
  "방과후",
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

  //업데이트 내용 보여주기 로컬스토리지에서 showNotice를 스트링으로 저장해서 확인 후에 이전에 봤으면 안보여주기
  const [showNotice, setShowNotice] = useState(
    localStorage.getItem("showNotice") === "mainUpdate0305" ? false : true
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
      if (future7days?.includes(data.id.slice(0, 10))) {
        const new_data = { ...data, public: true };
        new_schedule.push(new_data);
      }
    });

    // onSnapshot(personalRef, (doc) => {
    personalSnap?.data()?.todo_data?.forEach((data) => {
      if (future7days?.includes(data.id.slice(0, 10))) {
        const new_data = { ...data, public: false };
        new_schedule.push(new_data);
      }
    });
    // });

    setSchedule(
      new_schedule.sort((a, b) =>
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
    setClassLists([]);
    //입력한 개별날짜 시간표들
    setClassTable([]);
    // 시작 시간 모음
    setClassStart([]);

    let clNum = [];

    // let new_classLists = [];
    let new_todayClassTable = {
      id: "",
      classMemo: CLASSLISTS?.map((cl) => {
        return { memo: "", classNum: cl, subject: "" };
      }),
    };

    const now_doc = await getDoc(classTableRef);
    if (now_doc.exists()) {
      //오늘 요일설정
      let today_weekday = new Date(todayYyyymmdd).getDay();
      //기초 시간표 내용 넣기
      if (today_weekday > 0 && today_weekday < 6) {
        setClassBasic(now_doc.data()?.[WEEKDAYS[today_weekday]]);
      } else {
        return;
      }

      //교시별 시작시간 세팅하기
      if (now_doc?.data()?.classStart) {
        setClassStart([...now_doc?.data()?.classStart]);
      }

      //오늘 시간표 기초 데이터 만들기

      if (now_doc?.data()?.classTime) {
        let cltime = now_doc?.data()?.classTime;
        new_todayClassTable = {
          id: "",
          classMemo: cltime?.map((cl) => {
            return { memo: "", classNum: cl, subject: "" };
          }),
        };
        setClassLists(cltime);
      } else {
        setClassLists(CLASSLISTS);
      }

      // 저장된 각 날짜의 시간표 데이터가 있으면
      if (now_doc?.data()?.datas) {
        setClassTable([...now_doc?.data()?.datas]);

        let todayClass = now_doc
          ?.data()
          ?.datas?.filter((data) => data.id === todayYyyymmdd);
        //오늘자료가 있는 경우 넣어주기
        if (todayClass.length !== 0) {
          setTodayClassTable({ ...todayClass[0] });
          return;
          // console.log(todayClass[0]);
          //오늘 자료는 없는 경우.. 혹시 저장된 과목이 있으면 그건 넣어줌!
        } else {
          // 혹시 기초시간표에 해당 요일의 과목이 저장되어 있으면
          let today_subject = now_doc.data()?.[WEEKDAYS[today_weekday]] || [];
          if (today_subject.length !== 0) {
            new_todayClassTable.classMemo = new_todayClassTable.classMemo.map(
              (cl, index) => {
                return { ...cl, subject: today_subject[index] };
              }
            );
          }
          setTodayClassTable({ ...new_todayClassTable });
          return;
        }
      }
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
    getScheduleFromDb();
    getClassTableFromDb();
    getCheckListsFromDb();
    getListMemoFromDb();
  }, [todayYyyymmdd, props.isSubject]);

  useEffect(() => {
    getTodoListsFromDb();
  }, []);

  //시간표 저장 함수
  const saveClassMemoHandler = async (classMemo) => {
    let new_classMemo = {
      id: todayYyyymmdd,
      classMemo: [],
    };

    //각각의 인덱스를 기준으로 각교시 과목 이름과 메모를 저장함.
    classLists.forEach((item, index) => {
      let subject = document.querySelector(`#classSubject-${item}`);
      let memo = document.querySelector(`#classMemo-${item}`);

      new_classMemo["classMemo"].push({
        classNum: item,
        subject: subject.value.trim(),
        memo: memo.value.trim(),
      });
    });
    //데이터는 new_classMemo라는 객체에 저장
    // console.log(new_classMemo);

    Swal.fire({
      icon: "success",
      title: "자료가 저장되었어요.",
      text: "5초 후에 창이 사라집니다.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });

    // console.log(classTable);

    //최신 .. 클래스 테이블 전체 자료 가져오고
    const new_classTable = [...classTable];
    if (new_classTable.length !== 0) {
      new_classTable.forEach((data, index) => {
        // console.log(data.id);
        // console.log(new_classMemo.id);
        if (data.id === new_classMemo.id) {
          // console.log("날짜가 같은 자료");
          new_classTable.splice(index, 1);
        }
      });
    }

    new_classTable.push(new_classMemo);

    const new_classData = { datas: new_classTable };

    // console.log(new_classTable);
    // console.log(new_classData);

    const classMemoRef = doc(dbService, "classTable", props.userUid);
    const now_doc = await getDoc(classMemoRef);
    if (now_doc.exists()) {
      await updateDoc(classMemoRef, new_classData);
    } else {
      await setDoc(classMemoRef, new_classData);
    }
  };

  //날짜를 변경하고 나면 시간표 내용이 있는지 확인하고, 없으면 dom에서 직접 바꿔주기??
  useEffect(() => {
    // 주말이 아닐 때만 실행함.
    if (titleDate.slice(-2, -1) === "토" || titleDate.slice(-2, -1) === "일") {
      return;
    }
    console.log(todayClassTable);
    let time = setTimeout(() => {
      todayClassTable?.classMemo?.forEach((item, index) => {
        let textareaTag = document.getElementById(`classMemo-${item.classNum}`);
        console.log(textareaTag);
        textareaTag.style.height = textareaTag.scrollHeight - 20 + "px";
      });
    }, 100);

    return () => clearTimeout(time);
  }, [todayClassTable]);

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
            localStorage.setItem("showNotice", "mainUpdate0305");
            setShowNotice(false);
          }}
          imgSrc={mainImg}
          text={
            <>
              <h1
                style={{
                  margin: "10px 0 25px 0",
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
          >
            {/* {titleDate} */}
            {/* 오늘 날짜 보여주는 부분 날짜 클릭하면 달력도 나옴 */}
            <span className={classes["hide-cal"]}>
              <AttendCalendar
                getDateValue={calDateHandler}
                about="main"
                setStart={new Date(todayYyyymmdd)}
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
                  <ul className={classes["ul-section"]}>
                    {classLists?.map((classNum, index) => (
                      <ClassItem
                        key={`item${classNum}`}
                        myKey={`class${classNum}`}
                        classNum={classNum}
                        classStart={classStart?.[index]}
                        subject={
                          todayClassTable?.classMemo?.[index]?.subject || ""
                        }
                        memo={todayClassTable?.classMemo?.[index]?.memo || ""}
                      />
                    ))}
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
                      onclick={saveClassMemoHandler}
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
                    {event.eventName}({event.option.slice(1)}) / D-
                    {dayjs(event.id.slice(0, 10)).diff(
                      todayYyyymmdd,
                      "day"
                    )} / {event.note ? ` ${event.note}` : ""}
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
            onClick={() => navigate(`/memo`, { state: "checkLists" })}
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
            onClick={() => navigate(`/memo`, { state: "listMemo" })}
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
