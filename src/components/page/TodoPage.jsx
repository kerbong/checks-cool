import React, { useState } from "react";
import AttendCalendar from "components/Attendance/AttendCalendar";
import Modal from "../Layout/Modal";
import TodoLists from "../Todo/TodoLists";
import { useEffect } from "react";
import selectOption from "../../todoOption";
import classes from "../Attendance/AttendCtxCalendar.module.css";
import TodoPublicSetting from "../Todo/TodoPublicSetting";

import publicSetting from "../../assets/todo/publicSetting.gif";

import { dbService } from "../../fbase";
import {
  collection,
  query,
  onSnapshot,
  where,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
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
  const [showPublicEvent, setShowPublicEvent] = useState(true);
  const [showExample, setShowExample] = useState(false);

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
    let remainEvents = document.querySelectorAll(".eventBtn");

    if (remainEvents.length !== 0) {
      remainEvents.forEach((btn) => {
        btn.remove();
      });
    }

    //이벤트가 있던 날짜의 배경색도 초기화
    let remainBgcolor = document.querySelectorAll(
      ".react-datepicker__day[style]"
    );

    if (remainBgcolor.length !== 0) {
      remainBgcolor.forEach((tag) => (tag.style.backgroundColor = ""));
    }

    //기존에 있던 events들도 다 지우기
    setEvents([]);

    // let eventSnapshot = null;
    let queryWhere;
    // console.log(showPublicEvent);

    if (showPublicEvent) {
      //이부분 수정하기(경기하남초622하남6 로컬스토리지에 저장.)
      //"경기하남초-6-22하남6"
      queryWhere = query(
        collection(dbService, "todo"),
        where("owner", "==", publicRoom)
      );
    } else {
      //이부분에서 왜 오류가 나는지 모르겄네... snapshot을 한 번 써서 그런가..
      queryWhere = query(
        collection(dbService, "todo"),
        //순서가 중요하구나 ㅠ ==쿼리만 쓰는게 좋고...
        where("owner", "==", "personal"),
        where("writtenId", "==", props.userUid)
      );
    }
    // console.log(queryWhere);

    onSnapshot(queryWhere, (snapShot) => {
      snapShot.docs.map((doc) => {
        const eventObj = {
          ...doc.data(),
          doc_id: doc.id,
        };
        return setEvents((prev) => {
          prev.forEach((prev_data, index) => {
            if (prev_data.id === eventObj.id) {
              prev.splice(index, 1);
            }
          });
          return [...prev, eventObj];
        });
      });
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
    return date.slice(0, 5) + fixedMonth;
  };

  const calEventDayToYMD = (eventTag) => {
    //이벤트 태그의 날짜 yyyy-mm-dd로 바꾸기
    let eventDayOrigin = eventTag.getAttribute("aria-label");
    let _year = eventDayOrigin.split(" ")[1].slice(0, 4);
    let _month = eventDayOrigin.split(" ")[2].slice(0, -1).padStart(2, "0");
    let _day = eventDayOrigin.split(" ")[3].slice(0, -1).padStart(2, "0");

    return _year + "-" + _month + "-" + _day;
  };

  //다음달 버튼 누를 떄 실행되는 함수 설정
  useEffect(() => {
    //처음 화면을 로딩했을 때 월 이동버튼에 state 변경기능 추가
    const moveMonth = document.querySelectorAll(
      ".react-datepicker__navigation"
    );

    moveMonth[0].addEventListener("click", () => {
      //이전 노드에서 가져와서 반영하니까.. 보정함
      let currentM = getCurrentMonth();
      let fixedM = fixCurrentMonth(currentM, -1);
      //state 설정
      setCurrentMonth(fixedM);
    });

    moveMonth[1].addEventListener("click", () => {
      // console.log("다음달 클릭");
      let currentM = getCurrentMonth();
      let fixedM = fixCurrentMonth(currentM, +1);
      setCurrentMonth(fixedM);
    });
  }, []);

  //달력에 클릭이벤트 추가(이벤트온데이) + 달력에 버튼 그려주기
  useEffect(() => {
    //현재 연월가져옴
    let currentM = getCurrentMonth();
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
          day.onclick = function () {
            //클릭한 날짜정보와 일치하는 보여줄 정보만 eventOnDay에 저장
            let day_date = day.getAttribute("aria-label");
            let yyyymmdd = calEventDayToYMD(day);
            //파라미터로 받은 events 배열에 요소가 존재하면, 즉 저장된 이벤트가 하나라도 있으면
            if (events.length !== 0) {
              // events는 [{할일},{할일}] events 자료에 지금 날짜와 같은 자료가 있는지 확인해서 새로운 배열에 넣기
              let new_eventOnDay = events.filter(
                (event) => event["id"].slice(0, 10) === yyyymmdd
              );
              // 만약 오늘 날짜에 해당하는 게 있으면
              if (new_eventOnDay.length > 0) {
                //중복되는 자료 있으면 제거
                let stringEventOnDay = new_eventOnDay.map((event) => {
                  event = { ...event, eventDate: day_date };
                  return JSON.stringify(event);
                });

                let fixed_eventOnDay = [...new Set(stringEventOnDay)].map(
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
    const eventDrawOnCalendar = (month) => {
      events.forEach(function (data) {
        // 2022-08-03
        const eventDate = data.id.slice(0, 10);

        //이벤트 달과 현재 달력의 달이 같으면
        if (eventDate.slice(0, 7) === month) {
          // 날짜를 day 변수로 저장 0+03
          const day = 0 + eventDate.slice(8);

          // 이벤트 날짜와 같은 날짜 클래스를 지닌 태그를 찾음
          const eventDayTag = document.querySelectorAll(
            `.react-datepicker__day--${day}`
          );

          //다음 달 날짜까지 두 개가 나올 수 있어서 각각을 forEach 반복함
          eventDayTag.forEach(function (eventTag) {
            //이벤트 태그의 날짜 yyyy-mm-dd로 바꾸기
            let ymd = calEventDayToYMD(eventTag);

            //기존에 이미 달력에 데이터로 그린 버튼(번호+이름) 있는지 확인
            let existedBtn = document.querySelectorAll(
              `button[id='${data.id}']`
            )[0];

            //만약 이벤트 태그의 번호와 anyContext의 개별 data의 이벤트 날짜가 같고, 이미 그려진 버튼이 없으면
            if (ymd === eventDate && !existedBtn) {
              //달력날짜에 (번호+이름)의 버튼 추가하기
              const btn = document.createElement("button");
              btn.className = `${classes.eventData} eventBtn`;
              btn.innerText = data.eventName;
              btn.id = data.id;
              eventTag.appendChild(btn);
              eventTag.style.backgroundColor = "#d38c85";
              eventTag.style.borderRadius = "5px";
            }
          }); //날짜가 events와 같은 태그에 할 일 forEach 함수 끝
        } //이벤트 달과 현재 달력의 달이 같을 떄 할일 함수 끝
      }); //events 의 개별 data 함수 끝
    };
    //이벤트를 화면에 그리기
    showAllDayEvents(events);
    eventDrawOnCalendar(currentMonth);
  }, [currentMonth, events]);

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
    // events 자료 가져와서 수정하기
    let new_events = JSON.parse(JSON.stringify(events));
    // console.log(new_events);

    //만약 events가 있었으면,
    if (new_events.length !== 0) {
      //학교 공용 이벤트 todo에서는 무조건 새롭게 저장함. 기존꺼 지우고.

      //기존 events에 있는 자료인 경우
      let event_index;
      const existedEvent = new_events.filter((event, index) => {
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
          // console.log(data);
          // console.log(existedEvent[0].doc_id);
          //events에서 id 속성이 같은거 찾고 그 doc_id를 넘겨서 update하기
          await setDoc(doc(dbService, "todo", existedEvent[0].doc_id), data);

          const event = { ...data, eventDate: eventDate };
          new_events[event_index] = event;
          // console.log("이벤트바이데이즈에서 일치하는 자료 찾아서 수정함!");
        } else if (fixOrDel === "del") {
          //splice(인덱스값을, 1이면 제거 0이면 추가)
          new_events.splice(event_index, 1);
          // console.log("이벤트바이데이즈에서 일치하는 자료 찾아서 제거함!");

          await deleteDoc(doc(dbService, "todo", existedEvent[0].doc_id));

          //업데이트 해줘야 eventOnDay 날짜 클릭하면 나오는 모달에서도 사라짐
          setEvents([...new_events]);

          const deleteBtnLi = () => {
            let btn = document.getElementById(data.id);
            if (btn) {
              btn.remove();
            }
          };
          //item에 있는 li태그 지우고, 캘린더에 있는 btn도 지우고..
          deleteBtnLi();
          deleteBtnLi();
        }

        //자료들이 있었는데 새로운 자료인 경우
      } else {
        //firestore에 추가!
        await addDoc(collection(dbService, "todo"), data);
        //events에도 추가!
        let event = { ...data, eventDate: eventDate };
        new_events.push(event);
      }

      // 이벤트 자료가 아예 없는 경우
    } else {
      // console.log("events에 처음 입력된 자료");

      //firestore에 추가!
      await addDoc(collection(dbService, "todo"), data);
      //events에도 추가!
      let event = { ...data, eventDate: eventDate };
      new_events.push(event);
    }

    return new_events;
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
        <button
          id="title-btn"
          className="todo"
          onClick={() => setShowExample(true)}
        >
          <i className="fa-regular fa-calendar-check"></i>{" "}
          {showPublicEvent ? "우리 달력" : "내 달력"}
        </button>
        <span>
          <span className="todo" onClick={() => setShowPublicSetting(true)}>
            <i className="fa-solid fa-gear"></i> 설정
          </span>
          <button
            id="switch-btn"
            onClick={() => {
              setShowPublicEvent((prev) => !prev);
            }}
          >
            {showPublicEvent ? (
              <>
                <i className="fa-solid fa-chalkboard-user"></i> 개인용
              </>
            ) : (
              <>
                <i className="fa-solid fa-school-flag"></i> 공용
              </>
            )}
          </button>
        </span>
      </div>
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

      {showPublicSetting && (
        <TodoPublicSetting
          publicRoom={publicRoom}
          setPublicRoom={(data) => setPublicRoom(data)}
          showPublicSetting={() => setShowPublicSetting(false)}
        />
      )}
      <AttendCalendar inline={"true"} getDateValue={getDateHandler} />
      {publicRoom.trim().length === 2 && (
        <p>
          * 처음 사용 시 '설정'에서 우리 달력으로 사용할 정보를 설정해주세요.
        </p>
      )}
      <p> * 이벤트가 안 보일 경우 공용/개인용 아이콘을 다시 클릭해주세요!</p>
      <p>
        * 문제가 지속되시면 kerbong@gmail.com으로 알려주세요. 최대한 빠르게
        해결해 드릴게요!
      </p>
    </>
  );
};

export default TodoPage;
