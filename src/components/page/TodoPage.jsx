import React, { useState } from "react";
import AttendCalendar from "components/Attendance/AttendCalendar";
import Modal from "../Layout/Modal";
import TodoLists from "../Todo/TodoLists";
import { useEffect } from "react";
import selectOption from "../../todoOption";
import classes from "../Attendance/AttendCtxCalendar.module.css";
import TodoPublicSetting from "../Todo/TodoPublicSetting";
import BaseTodo from "components/Todo/BaseTodo";
import publicSetting from "../../assets/todo/publicSetting.gif";
import MeetingSummary from "../Todo/MeetingSummary";
import Swal from "sweetalert2";
import holidays2023 from "holidays2023";

import { useNavigate } from "react-router-dom";

import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import ExampleModal from "./ExampleModal";

const thisMonth = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (1 + today.getMonth())).slice(-2);
  return `${year}-${month}`;
};

const TodoPage = (props) => {
  const [dayEventIsShown, setDayEventIsShown] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(thisMonth);
  const [fixIsShown, setFixIsShown] = useState("0");
  //전체 받아온 이벤트 저장하기
  const [events, setEvents] = useState([]);
  const [eventOnDay, setEventOnDay] = useState([]);
  //개인용, 공용 전환
  const [showPublicEvent, setShowPublicEvent] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [showBaseTodo, setShowBaseTodo] = useState(false);
  const [showCal, setShowCal] = useState(false);

  let navigate = useNavigate();

  //처음 접속한 유저가 null 되지 않도록 세팅
  let roomInfo = localStorage.getItem("todoPublicRoom");
  if (roomInfo === null) {
    roomInfo = "--";
  }

  const [publicRoom, setPublicRoom] = useState(roomInfo);
  const [showPublicSetting, setShowPublicSetting] = useState(false);

  //firestore에서 해당 이벤트 자료 받아오기
  const getToDosFromDb = () => {
    //기존에 있던 화면에 그려진 이벤트들 지워주기
    // let remainEvents = document.querySelectorAll(".eventBtn");

    // if (remainEvents.length !== 0) {
    //   remainEvents.forEach((btn) => {
    //     btn.remove();
    //   });
    // }

    // //이벤트가 있던 날짜의 배경색도 초기화
    // let remainBgcolor = document.querySelectorAll(
    //   ".react-datepicker__day[style]"
    // );

    // if (remainBgcolor.length !== 0) {
    //   remainBgcolor.forEach((tag) => (tag.style.backgroundColor = ""));
    // }

    //기존에 있던 events들도 다 지우기

    // let eventSnapshot = null;
    let todoRef;
    // console.log(showPublicEvent);

    if (showPublicEvent) {
      //"경기초-6-2022"예시
      //공용 자료는 공용문서전체 이름으로 문서id 저장
      todoRef = doc(dbService, "todo", publicRoom);
    } else {
      //유저 개인 자료는 자기 uid로 문서id 저장
      todoRef = doc(dbService, "todo", props.userUid);
    }

    onSnapshot(todoRef, (doc) => {
      setEvents([]);
      const new_events = [];
      doc?.data()?.todo_data?.forEach((data) => {
        // console.log(data);
        new_events.push(data);
      });

      //혹시 set등록된 자료면.. 회차를 정보에 넣어주기!
      let events_sets = [];
      let events_sets_all = [];
      new_events
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
      let setFixed_events = [];
      noneSet_events = new_events?.filter((evt) => !evt.set);
      //예를 들어 얼티미트 가 set에 포함된 자료에는 다 번호를 매김.

      events_sets.forEach((setName) => {
        let num = 1;
        new_events.forEach((evt) => {
          if (evt?.set === setName) {
            evt.setNum = `${num}/${
              events_sets_all?.filter((evtName) => evtName === evt.set)?.length
            }`;
            num += 1;
            set_events.push(evt);
          }
        });
      });

      setFixed_events = [...set_events, ...noneSet_events];
      // 이벤트의.. 메모에서 교시 순으로 정렬하기! (교시순으로 먼저 버튼 만들어 두면.. 어차피 날짜는 상관없음)
      setFixed_events = setFixed_events.sort((a, b) =>
        a.note?.split("교시")?.[0] > b.note?.split("교시")?.[0] ? 1 : -1
      );

      setEvents([...setFixed_events]);
    });
  };

  //db에서 자료 받아오기 useEffect
  useEffect(() => {
    //db에서 학년 자료 가져오기, showPublicEvent를 의존성으로 넣어두면 알아서 바뀔 때마다 실행됨. 이게 state의 변경상태에 따라 무언가를 실행하도록 하는 베스트인듯
    getToDosFromDb();
  }, [showPublicEvent, publicRoom]);

  const getCurrentMonth = () => {
    const currentM = document
      .querySelector(".react-datepicker__month")
      .getAttribute("aria-label")
      .slice(7);
    return currentM;
  };

  const fixCurrentMonth = (date, num) => {
    let fixedMonth = String(Number(date.slice(-2)) + num).padStart(2, "0");
    let new_year, new_month;
    if (fixedMonth === "00") {
      new_year = +date.slice(0, 4) - 1;
      new_month = "12";
    } else if (fixedMonth === "13") {
      new_year = +date.slice(0, 4) + 1;
      new_month = "01";
    } else {
      new_year = date.slice(0, 4);
      new_month = fixedMonth;
    }

    return new_year + "-" + new_month;
  };

  const calEventDayToYMD = (eventTag) => {
    //이벤트 태그의 날짜 yyyy-mm-dd로 바꾸기
    let eventDayOrigin = eventTag.getAttribute("aria-label");
    let startSplit = 1;
    if (eventDayOrigin.includes("Not available")) {
      startSplit = 2;
    }
    let _year = eventDayOrigin.split(" ")[startSplit].slice(0, 4);
    let _month = eventDayOrigin
      .split(" ")
      [startSplit + 1].slice(0, -1)
      .padStart(2, "0");
    let _day = eventDayOrigin
      .split(" ")
      [startSplit + 2].slice(0, -1)
      .padStart(2, "0");

    return _year + "-" + _month + "-" + _day;
  };

  //달력에 클릭이벤트 추가(이벤트온데이) + 달력에 버튼 그려주기
  useEffect(() => {
    //현재 연월가져옴
    // console.log(currentMonth);
    let currentM = getCurrentMonth();
    // console.log(currentM);
    //state로 설정함
    setCurrentMonth(currentM);

    //달력 클릭하면 이벤트 창 보여주기
    const showAllDayEvents = (events) => {
      let mondayToFridays = document.querySelectorAll(
        '.react-datepicker__day[aria-disabled="false"]'
      );

      //주중의 모든 날짜들 개별적으로 함수 실행
      mondayToFridays.forEach((day) => {
        //만약 다음달의 날짜(음영처리) 클릭하면 currentMonth state를 변경시켜서 이벤트 나오도록..!
        if (day.getAttribute("class").includes("--outside-month")) {
          day.onclick = function () {
            let currentM = getCurrentMonth();
            let move_to = 1;
            if (
              day.getAttribute("aria-label").split(" ")[3].slice(0, -1) > 20
            ) {
              move_to = -1;
            }
            let fixedM = fixCurrentMonth(currentM, move_to);
            //state 설정
            setCurrentMonth(fixedM);
          };
          //해당 월의 일반적인 주중 날짜를 클릭하면..
        } else {
          day.onclick = function dayOnClick() {
            //클릭한 날짜정보와 일치하는 보여줄 정보만 eventOnDay에 저장
            let day_date = day.getAttribute("aria-label");
            let yyyymmdd = calEventDayToYMD(day);
            //파라미터로 받은 events 배열에 요소가 존재하면, 즉 저장된 이벤트가 하나라도 있으면
            if (events.length !== 0) {
              // events는 [{할일},{할일}] events 자료에 지금 날짜와 같은 자료가 있는지 확인해서 새로운 배열에 넣기
              let new_eventOnDay = events?.filter(
                // (event) => event?.id?.slice(8, 10) === yyyymmdd.split("-")[2]
                (event) => event?.id?.slice(5, 10) === yyyymmdd?.slice(5, 10)
              );
              // 만약 오늘 날짜에 해당하는 게 있으면
              if (new_eventOnDay.length > 0) {
                //중복되는 자료 있으면 제거
                let stringEventOnDay = new_eventOnDay?.map((event) => {
                  event = { ...event, eventDate: day_date };
                  return JSON.stringify(event);
                });

                let fixed_eventOnDay = [...new Set(stringEventOnDay)]?.map(
                  (event) => JSON.parse(event)
                );

                setEventOnDay(() => fixed_eventOnDay);
                //만약 오늘 날짜에 해당하는 자료가 없으면
              } else {
                setEventOnDay(() => [{ eventDate: day_date }]);
              }
            } else {
              setEventOnDay(() => [{ eventDate: day_date }]);
            }
            setDayEventIsShown(true);
          };
        }
        setEventOnDay([]);
      });
    };

    //이벤트 요약해서 캘린더에 보여주기
    const eventDrawOnCalendar = () => {
      //먼저 그려져있던 버튼들 모두 삭제하기
      const all_day = document.querySelectorAll(".react-datepicker__day");
      // console.log(all_day);
      all_day?.forEach((dayTag) => {
        //바뀌기 전 노드 기준인가...;;;
        //현재 선택된 날짜들이 아니면 모두 색깔 원래대로..
        // dayTag.style.backgroundColor = "inherit";
        if (dayTag.getAttribute("aria-selected") === "true") {
          dayTag.style.backgroundColor = "rgb(211, 140, 133)";
        }
        // dayTag.style.backgroundColor = "inherit";
        // while (dayTag.hasChildNodes()) {
        while (dayTag?.children?.length > 0) {
          dayTag?.firstElementChild?.remove();
        }
        // }

        // 그냥 무조건 버튼 삭제하기!
      });
      //휴일 그려주기
      holidays2023?.forEach((holiday) => {
        if (holiday[0] === currentMonth) {
          let holiday_queryName = holiday[1].split("*");
          let holidayTag = document.querySelectorAll(holiday_queryName[0])[0];
          if (!holidayTag) return;
          // console.log(holidayTag.classList.contains("eventAdded"));

          const btn = document.createElement("button");
          btn.className = `${classes.holidayData} eventBtn`;
          btn.innerText = holiday_queryName[1];
          holidayTag?.appendChild(btn);
          holidayTag.style.borderRadius = "5px";
        }
      });

      events?.forEach(function (data) {
        //새로 업데이트한 로직(년 월 일 데이터에 따로 저장)
        const day = "0" + data?.id?.slice(8, 10);

        // // 2022-08-03
        const eventDate = data?.id?.slice(0, 10);
        // 이벤트 날짜와 같은 날짜 클래스를 지닌 태그를 찾음
        const eventDayTag = document.querySelectorAll(
          `.react-datepicker__day--${day}`
        );

        //다음 달 날짜까지 두 개가 나올 수 있어서 각각을 forEach 반복함
        eventDayTag.forEach(function (eventTag) {
          //이벤트 태그의 날짜 yyyy-mm-dd로 바꾸기
          let ymd = calEventDayToYMD(eventTag);

          //기존에 이미 달력에 데이터로 그린 버튼(번호+이름) 있는지 확인
          // let existedBtn = document.querySelectorAll(
          //   `button[id='${data.id}']`
          // )[0];

          //만약 이벤트 태그의 번호와 anyContext의 개별 data의 이벤트 날짜가 같고, 이미 그려진 버튼이 없으면
          // if (ymd === eventDate && !existedBtn) {
          if (ymd === eventDate) {
            //달력날짜에 (번호+이름)의 버튼 추가하기
            const btn = document.createElement("button");
            //옵션에 따라서 배경 색을 다르게 보여줌
            btn.className = `${classes.eventData} ${
              data.option.slice(0, 1) === "1"
                ? classes.op1
                : data.option.slice(0, 1) === "2"
                ? classes.op2
                : classes.op3
            } eventBtn`;
            //setNum이 있으면 그것까지 보여주기
            let setNum = data.setNum ? `(${data.setNum})` : "";
            btn.innerText = data.eventName + setNum;
            btn.id = data.id;

            if (ymd.slice(0, 7) === currentMonth) {
              eventTag.style.backgroundColor = "#d38c85";
            } else {
              eventTag.style.backgroundColor = "#d38c852e";
              btn.style.backgroundColor = "#56423c91";
            }

            eventTag.appendChild(btn);

            eventTag.style.borderRadius = "5px";
          }
        }); //날짜가 events와 같은 태그에 할 일 forEach 함수 끝
      }); //events 의 개별 data 함수 끝
    };
    //이벤트를 화면에 그리기
    showAllDayEvents(events);
    eventDrawOnCalendar();
  }, [currentMonth, events, showPublicEvent]);

  //달력에서 받은 date 형식을 바꾸기
  const getDateHandler = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let selectDay = year + "-" + month + "-" + day;
    return selectDay;
    //selectDay랑 저장된 이벤트랑 일치하는 지 확인하기
  };

  //달력에서 모달 밖 클릭하면 함수
  const dayEventHideHandler = () => {
    setDayEventIsShown(false);
    setFixIsShown("0");
  };

  //firestore와 events 자료 추가 혹은 삭제 함수
  const fixEvents = async (data, eventDate, fixOrDel) => {
    let todoRef;
    if (showPublicEvent) {
      todoRef = doc(dbService, "todo", publicRoom);
    } else {
      todoRef = doc(dbService, "todo", props.userUid);
    }

    // events 자료 가져와서 수정하기
    // let new_events = JSON.parse(JSON.stringify(events));
    let now_data = await getDoc(todoRef);
    let new_events = now_data.data()?.todo_data || [];
    //만약 events가 있었으면,
    if (new_events?.length !== 0) {
      //학교 공용 이벤트 todo에서는 무조건 새롭게 저장함. 기존꺼 지우고.

      //기존 events에 있는 자료인 경우
      let event_index;
      const existedEvent = new_events?.filter((event, index) => {
        if (event.id === data.id) {
          //events에서 인덱스 저장해두기
          event_index = index;
        }
        return event.id === data.id;
      });

      //자료들이 있었고 기존 자료인 경우
      if (existedEvent.length > 0) {
        // console.log("기존에 events에 있던 자료");
        if (fixOrDel === "fix") {
          let fixed_event = { ...data, eventDate: eventDate };

          new_events.splice(event_index, 1);

          new_events.push(fixed_event);

          delete new_events[new_events.length - 1].eventDate;
          const fixed_data = { todo_data: new_events };
          await setDoc(todoRef, fixed_data);

          // console.log("이벤트바이데이즈에서 일치하는 자료 찾아서 수정함!");
        } else if (fixOrDel === "del") {
          //혹시 해당 날짜에 지금 이벤트가 마지막 남은 이벤트인 경우 달력에 이벤트 있음을 표시하는 백그라운드 컬러 삭제
          let modalChildLength = document?.getElementById(data.id)
            ?.parentElement?.childNodes?.length;
          //li태그가 하나 있으면 5, 즉 마지막이면
          if (modalChildLength === 5) {
            document.querySelector(
              ".react-datepicker__day--selected"
            ).style.backgroundColor = "";
          }

          //splice(인덱스값을, 1이면 제거 0이면 추가)
          new_events.splice(event_index, 1);

          // setEvents([...new_events]);
          // console.log("이벤트바이데이즈에서 일치하는 자료 찾아서 제거함!");
          const new_data = { todo_data: new_events };
          await setDoc(todoRef, new_data);

          const deleteBtnLi = () => {
            let btn = document.getElementById(data.id);
            if (btn) {
              btn.remove();
            }
          };
          // 띄워진 모달에 있는 데이터 삭제
          deleteBtnLi();
          // deleteBtnLi();
        }

        //자료들이 있었는데 새로운 자료인 경우
      } else {
        //firestore에 추가!
        new_events.push(data);
        let new_data = [...new_events];
        const fixed_data = { todo_data: new_data };
        await setDoc(todoRef, fixed_data).then(() => {
          //events에도 추가!
          // console.log(data);
          let event = { ...data, eventDate: eventDate };
          new_events.push(event);
          // setEvents([...new_events]);
        });
      }

      // 이벤트 자료가 아예 없는 경우
    } else {
      // console.log("events에 처음 입력된 자료");

      //firestore에 추가!
      const new_data = { todo_data: [data] };
      await setDoc(todoRef, new_data);
      //events에도 추가!
      let event = { ...data, eventDate: eventDate };
      new_events.push(event);
      // setEvents([...new_events]);
    }
  };

  //EventLists에서 호출하는 event 수정버튼 함수,
  const fixedEventHandler = (fixed_data, eventDate) => {
    setFixIsShown("0");
    fixEvents(fixed_data, eventDate, "fix");
  };

  //EventLists에서 보낸 event 자료 삭제 요청 함수
  const removeEventHandler = (data) => {
    fixEvents(data, data.eventDate, "del");
  };

  //달력에서 받은 month로 currentMonth변경하기
  const getMonthHandler = (month) => {
    setCurrentMonth(month);
  };

  //여러 행사 한 번에 입력툴 저장함수
  const saveSetEventsHandler = async (datas, perPub) => {
    let todoRef;

    if (perPub === "personal") {
      //유저 개인 자료는 자기 uid로 문서id 저장
      todoRef = doc(dbService, "todo", props.userUid);
    } else if (perPub === "public") {
      //"경기초-6-2022"예시
      //공용 자료는 공용문서전체 이름으로 문서id 저장
      todoRef = doc(dbService, "todo", publicRoom);
    }

    //전해진 datas의 날짜만 모아둠
    let datas_dates = datas?.map((data) => data.id);

    let isExist = [];

    const db_doc = await getDoc(todoRef);
    let db_datas = db_doc?.data()?.todo_data || [];
    let db_events = [];
    db_datas?.forEach((data) => {
      // console.log(data);
      //중복되는건 isExist에 넣고
      if (datas_dates?.includes(data.id)) {
        isExist.push(data);
        //중복되지 않는건 db_events에 넣고
      } else {
        db_events.push(data);
      }
    });

    //본격적으로 중복되는 행사 (isExist) 제거하고 저장하는 함수
    const saveEventsDb = async () => {
      let new_datas = [...db_events, ...datas];
      const fixed_data = { todo_data: new_datas };
      await setDoc(todoRef, fixed_data);
      successSwal();
    };

    //저장되면 보여줄 swal
    const successSwal = () => {
      Swal.fire({
        icon: "success",
        title: "저장 완료",
        text: `${datas[0].eventName} 행사가 저장되었습니다.`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        showDenyButton: false,
        timer: 3000,
      });
    };

    // 저장하는 세트 일정이 공용 개별일정인지 확인하고. 해당 자료 snapshot한거랑 비교해서, id가 같은거 있으면 덮어쓰기, 아니면 저장하기.
    if (isExist.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "중복자료 덮어쓰기",
        text: `같은 날짜에 같은 이름을 가진 행사가 존재합니다. 덮어쓰시겠어요? ${isExist.map(
          (item) => item?.id?.slice(0, 10) + " | " + item?.id?.slice(10)
        )} `,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        showDenyButton: true,
        denyButtonText: "취소",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          saveEventsDb();
          setShowBaseTodo(false);
        } else {
          return;
        }
      });

      // 중복되는 일정이 없을 경우 바로 저장하기
    } else {
      saveEventsDb();
      setShowBaseTodo(false);
    }
  };

  useEffect(() => {
    let weekDayNames = document.querySelector(".react-datepicker__day-names");
    let weekDayName = document.querySelectorAll(".react-datepicker__day-name");
    if (!weekDayNames || !weekDayName) return;
    weekDayNames.style.width = "95%";
    weekDayName[0].style.width = "14%";
    weekDayName[6].style.width = "14%";
  }, [showCal]);

  return (
    <>
      {showExample && (
        <ExampleModal
          onClose={() => setShowExample(false)}
          imgSrc={publicSetting}
          text={
            <>
              <p
                style={{
                  fontSize: "1.3em",
                  textAlign: "center",
                  margin: "5px",
                }}
              >
                === 공용설정 예시 ===
              </p>
              <p style={{ margin: "15px" }}>
                * 화면 왼쪽 상단의 현재 페이지 타이틀을 클릭하시면 다시 보실 수
                있어요!
              </p>
            </>
          }
        />
      )}
      <div id="title-div">
        {/* 화면 좌측 상단 타이틀 나오는 부분 */}
        <button id="title-btn" onClick={() => setShowExample(true)}>
          <>
            <i className="fa-regular fa-calendar-check"></i>{" "}
            {showPublicEvent ? "공용달력" : "개인달력"}
          </>
        </button>

        <div
          style={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            width: "auto",
            justifyContent: "flex-end",
            lineHeight: "20px",
            fontSize: "0.9rem",
          }}
        >
          {/* 메뉴 선택하는 버튼들 */}
          <span
            className={classes["memo-headerBtn"]}
            onClick={() => {
              navigate(`/memo`, {
                state: "budgetManage",
              });
            }}
          >
            <i className="fa-solid fa-money-check-dollar"></i> 예산
          </span>
          <span
            className={classes["memo-headerBtn"]}
            onClick={() => {
              navigate(`/todo`);
            }}
          >
            <i className="fa-regular fa-calendar-check"></i> 일정
          </span>
          <span
            className={classes["memo-headerBtn"]}
            onClick={() => {
              navigate(`/memo`, {
                state: "todayTodo",
              });
            }}
          >
            <i className="fa-solid fa-clipboard-check"></i> 할일
          </span>
          <span
            className={classes["memo-headerBtn"]}
            onClick={() => {
              navigate(`/memo`, {
                state: "freeMemo",
              });
            }}
          >
            <i className="fa-regular fa-folder-open"></i> 메모
          </span>
        </div>
      </div>

      {/* 페이지의 일정부분 관련 버튼 및 설명 */}

      <div className={classes["todo-option"]}>
        <div
          className={classes["todo-option"]}
          style={{ justifyContent: "flex-start" }}
        >
          {/* 설정, 공용or개인용 버튼 부분 */}
          <span id="switch-btn" onClick={() => setShowPublicSetting(true)}>
            <i className="fa-solid fa-gear"></i> 설정
          </span>

          {/* 한번에 일정 입력하기 부분 */}
          <span id="switch-btn" onClick={() => setShowBaseTodo(true)}>
            <i className="fa-regular fa-window-restore"></i> 반복
          </span>

          <span
            id="switch-btn"
            onClick={() => {
              setShowPublicEvent((prev) => !prev);
            }}
          >
            {showPublicEvent ? (
              <>
                <i className="fa-solid fa-chalkboard-user"></i> 개인
              </>
            ) : (
              <>
                <i className="fa-solid fa-school-flag"></i> 공용
              </>
            )}
          </span>
        </div>
        {/* 일정 색깔 표시 알림 */}

        <div className={classes["todo-option"]}>
          <div className={classes["todo-option-expl"]}>
            <span
              className={`${classes["todoOption"]} ${classes["op1"]}`}
            ></span>
            외부강사
          </div>
          <div className={classes["todo-option-expl"]}>
            <span
              className={`${classes["todoOption"]} ${classes["op2"]}`}
            ></span>
            자체행사
          </div>
          <div className={classes["todo-option-expl"]}>
            <span
              className={`${classes["todoOption"]} ${classes["op3"]}`}
            ></span>
            교사일정
          </div>
        </div>
      </div>

      {/* 일정등록 누르면 나오는 모달 */}
      {showBaseTodo && (
        <Modal onClose={() => setShowBaseTodo(false)}>
          <BaseTodo
            closeHandler={() => setShowBaseTodo(false)}
            userUid={props.userUid}
            showPublicEvent={showPublicEvent}
            selectOption={selectOption}
            saveSetEventsHandler={saveSetEventsHandler}
          />
        </Modal>
      )}

      {/* 달력날짜 누르면 나오는 모달 */}
      {dayEventIsShown && (
        <Modal onClose={dayEventHideHandler}>
          <TodoLists
            eventOnDay={eventOnDay}
            fixIsShown={fixIsShown}
            fixedEventHandler={fixedEventHandler}
            setFixIsShown={setFixIsShown}
            removeData={removeEventHandler}
            selectOption={selectOption}
            dayEventHideHandler={dayEventHideHandler}
            about={showPublicEvent ? `todo${publicRoom}` : "todopersonal"}
            userUid={props.userUid}
          />
        </Modal>
      )}

      {/* 설정 누르면 나오는 세팅 모달 */}
      {showPublicSetting && (
        <TodoPublicSetting
          publicRoom={publicRoom}
          setPublicRoom={(data) => setPublicRoom(data)}
          showPublicSetting={() => setShowPublicSetting(false)}
        />
      )}
      {/* 달력부분 */}
      <div onClick={() => setShowCal((prev) => !prev)}>
        <AttendCalendar
          filterNone={true}
          inline={"true"}
          getDateValue={getDateHandler}
          getMonthValue={getMonthHandler}
        />
      </div>
      <br />

      {/* 회의록부분 */}
      <MeetingSummary
        showPublicEvent={showPublicEvent}
        currentMonth={currentMonth}
        userUid={props.userUid}
      />
      <br />
      {publicRoom.trim().length === 2 && (
        <p>
          * 처음 사용 시 '설정'에서 우리 달력으로 사용할 정보를 설정해주세요.
        </p>
      )}
      <p onClick={() => setShowExplain((prev) => !prev)}>
        🤔 문제가 있으신가요?{" "}
        {showExplain ? (
          <i className="fa-solid fa-chevron-up"></i>
        ) : (
          <i className="fa-solid fa-chevron-down"></i>
        )}
      </p>
      {showExplain && (
        <>
          <p className={classes["todoExplain-p"]}>
            {" "}
            * 이벤트가 안 보일 경우 공용/개인용 아이콘을 다시
            클릭해주세요!(안정적 이용을 위해 첫 페이지 진입 시 3~5초
            기다려주세요.)
          </p>
          <p className={classes["todoExplain-p"]}>
            {" "}
            * 다음달, 이전달 클릭을 빠르게 반복하면 데이터 로딩에 실패할 수
            있습니다.
          </p>

          <p className={classes["todoExplain-p"]}>
            {" "}
            * 현재 달력에 보이는 달에 입력된 회의록 내용만 보여줍니다.(개인,
            공용도 구분)
          </p>
          <p className={classes["todoExplain-p"]}>
            {" "}
            * 공용 회의록에 기록하시면 공용방에 입장해있는 선생님들이 모두 보고,
            기록하실 수 있습니다.
          </p>
          <p className={classes["todoExplain-p"]}>
            {" "}
            * 회의 자료가 해당 학년도(현재 달력의 월을 기준으로 2월~ 다음년도
            1월까지)에 하나라도 있는 경우 엑셀저장" 버튼이 보입니다.
          </p>
          <p className={classes["todoExplain-p"]}>
            {" "}
            * 엑셀로 저장하면 해당 학년도(현재 달력의 월을 기준으로 2월~
            다음년도 1월까지)의 데이터가 저장됩니다.
          </p>
          <p className={classes["todoExplain-p"]}>
            * 문제가 지속되시면 kerbong@gmail.com으로 알려주세요. 최대한 빠르게
            해결해 드릴게요!
          </p>
        </>
      )}
    </>
  );
};

export default TodoPage;
