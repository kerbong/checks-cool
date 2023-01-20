import { useState, useEffect, useRef } from "react";
import AttendCalendar from "../Attendance/AttendCalendar";
import Modal from "../Layout/Modal";

import EventLists from "../Event/EventLists";
import classes from "./AttendCtxCalendar.module.css";

import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, updateDoc } from "firebase/firestore";

const thisMonth = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (1 + today.getMonth())).slice(-2);
  return `${year}-${month}`;
};

const AttendCtxCalendar = (props) => {
  const [currentMonth, setCurrentMonth] = useState(thisMonth);
  const [dayEventIsShown, setDayEventIsShown] = useState(false);
  const [fixIsShown, setFixIsShown] = useState("0");
  //전담용 전체 이벤트
  const [wholeEvents, setWholeEvents] = useState([]);
  //선택된 셀렉트 밸류
  const [nowClassName, setNowClassName] = useState("");
  //전체 받아온 이벤트 저장하기
  const [events, setEvents] = useState([]);
  const [eventOnDay, setEventOnDay] = useState([]);
  const [nowClStudents, setNowClStudents] = useState([]);

  const selectRef = useRef();

  //기존 화면의 이벤트들 지우기
  const removeScreenEvents = () => {
    //기존에 있던 화면에 그려진 이벤트들 지워주기
    document.querySelectorAll(".eventBtn").forEach((btn) => {
      btn.remove();
    });
    //이벤트가 있던 날짜의 배경색도 초기화
    document
      .querySelectorAll(".react-datepicker__day[style]")
      .forEach((tag) => (tag.style.backgroundColor = ""));
  };

  //firestore에서 해당 이벤트 자료 받아오기
  const getAttendsFromDb = () => {
    //db에서 attend DB가져오고 작성자가 현재 유저와 동일한지 확인하고 events에 추가하기

    let attendRef = doc(dbService, "attend", props.userUid);
    // console.log(queryWhere);

    onSnapshot(attendRef, (doc) => {
      // setEvents([]);
      //기존에 있던 events들도 다 지우기
      setEvents([]);
      setWholeEvents([]);

      if (props.isSubject) {
        if (doc.exists()) {
          let wholeE = doc?.data()?.attend_data;
          setWholeEvents([...wholeE]);
        }
        // if (nowClassName === "") {
        //   setNowClassName(Object.keys(props.students[0])[0]);
        // }
        // console.log(nowClassName);
      } else {
        const new_attends = [];
        doc?.data()?.attend_data?.forEach((data) => {
          // if (data.id.slice(0, 7) === currentMonth.slice(0, 7)) {
          new_attends.push(data);
          // }
        });
        setEvents([...new_attends]);
      }
    });
  };

  //학급 선택시 실행되는 함수
  const selectClassHandler = () => {
    let className = selectRef.current.value;
    // console.log(className);
    setNowClassName(className);
  };

  //선택된 학급이 바뀌면 event만 찾아서 등록하고 학생도 바꿔주기
  const selectEvents = () => {
    //만약 해당 반에 아직 데이터가 없으면 events빈배열로 설정 및 리무브 스크린 이벤트함수 실행
    const existSelectClData = [...wholeEvents].filter(
      (cl) => Object.keys(cl)[0] === nowClassName
    );
    if (existSelectClData.length === 0) {
      removeScreenEvents();

      setEvents([]);
    }

    //wholeEvents에서 해당하는 학급 찾아서 events에 저장
    [...wholeEvents].forEach((cl) => {
      if (Object.keys(cl)[0] === nowClassName) {
        removeScreenEvents();

        setEvents(Object.values(cl)[0]);
      }
    });
    props.students?.forEach((cl) => {
      if (Object.keys(cl)[0] === nowClassName) {
        setNowClStudents(Object.values(cl)[0]);
      }
    });
  };

  //db에서 자료 받아오기 useEffect
  useEffect(() => {
    removeScreenEvents();
  }, [currentMonth]);

  //셀렉트 태그에서 값을 선택하면 해당 반의 자료만 화면에 보여주도록 events 상태 set하기
  useEffect(() => {
    // console.log(nowClassName);
    selectEvents();
  }, [nowClassName]);

  useEffect(() => {
    //db에서 학년 자료 가져오기, showPublicEvent를 의존성으로 넣어두면 알아서 바뀔 때마다 실행됨. 이게 state의 변경상태에 따라 무언가를 실행하도록 하는 베스트인듯
    getAttendsFromDb();
  }, []);

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
    let _year = eventDayOrigin.split(" ")[1].slice(0, 4);
    let _month = eventDayOrigin.split(" ")[2].slice(0, -1).padStart(2, "0");
    let _day = eventDayOrigin.split(" ")[3].slice(0, -1).padStart(2, "0");

    return _year + "-" + _month + "-" + _day;
  };

  useEffect(() => {
    //처음 화면을 로딩했을 때 월 이동버튼에 state 변경기능 추가
    const moveMonth = document.querySelectorAll(
      ".react-datepicker__navigation"
    );

    moveMonth[0].addEventListener("click", () => {
      // console.log("이전달 클릭");
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

  useEffect(() => {
    //현재 연월가져옴
    let currentM = getCurrentMonth();
    //state로 설정함
    setCurrentMonth(currentM);

    //모든 날짜에 이벤트 보여주는 클릭 이벤트리스너 등록 useEffect밖으로 나가면.. 무한로딩;;
    const showAllDayEvents = (events) => {
      let mondayToFridays = document.querySelectorAll(
        '.react-datepicker__day[aria-disabled="false"]'
      );

      mondayToFridays.forEach((day) => {
        //만약 다음달의 날짜인 경우 currentMonth state를 변경시켜서 useEffect를 실행해줌.(다음달 클릭했을 때 실행하는 것처럼)
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
            //클릭한 날짜정보와 일치하는 보여줄 정보만 저장
            let day_date = day.getAttribute("aria-label");
            let yyyymmdd = calEventDayToYMD(day);

            if (events.length !== 0) {
              // 기존 코드, eventByDays 자료에 지금 날짜와 같은 자료가 있는지 확인해서 새로운 배열에 넣기
              // console.log(yyyymmdd.split("-")[2]);
              let new_eventOnDay = events.filter(
                (event) => event.id.slice(8, 10) === yyyymmdd.split("-")[2]
              );
              //만약 오늘 날짜에 해당하는 게 있으면
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

    //캘린더에 이벤트 보여주기
    const eventDrawOnCalendar = () => {
      events.forEach(function (data) {
        //새로 업데이트한 로직(년 월 일 데이터에 따로 저장)
        const day = "0" + data.id.slice(8, 10);

        // // 2022-08-03
        const eventDate = data.id.slice(0, 10);

        // //이벤트 달과 현재 달력의 달이 같으면
        // if (eventDate.slice(0, 7) === month) {

        //   // 날짜를 day 변수로 저장 0+03
        //   const day = 0 + eventDate.slice(8);

        // 이벤트 날짜와 같은 날짜 클래스를 지닌 태그를 찾음
        const eventDayTag = document.querySelectorAll(
          `.react-datepicker__day--${day}`
        );

        //다음 달 날짜까지 두 개가 나올 수 있어서 각각을 forEach 반복함
        eventDayTag.forEach(function (eventTag) {
          //이벤트 태그의 날짜 yyyy-mm-dd로 바꾸기
          let yyyy_mm_dd = calEventDayToYMD(eventTag);

          //기존에 이미 달력에 데이터로 그린 버튼(번호+이름) 있는지 확인
          let existedBtn = document.querySelectorAll(
            `button[id='${data.id}']`
          )[0];

          //만약 이벤트 태그의 번호와 anyContext의 개별 data의 이벤트 날짜가 같고, 이미 그려진 버튼이 없으면
          if (yyyy_mm_dd === eventDate && !existedBtn) {
            //달력날짜에 (번호+이름)의 버튼 추가하기
            const btn = document.createElement("button");
            btn.className = `${classes.eventData} eventBtn`;
            btn.innerText = data.student_num + data.student_name;
            btn.id = data.id;
            eventTag.appendChild(btn);
            eventTag.style.backgroundColor = "#d38c85";
            eventTag.style.borderRadius = "5px";
          }
        }); //날짜가 anyContext와 같은 태그에 할 일 forEach 함수 끝
      });
    }; // eventDrawOnCalendar 함수 끝

    showAllDayEvents(events);
    eventDrawOnCalendar();
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
    const attendTodoRef = doc(dbService, "attend", props.userUid);
    // events 자료 가져와서 수정하기
    console.log(events);
    let before_events = JSON.parse(JSON.stringify(events));
    let new_events = before_events.map((evt) => {
      delete evt.eventDate;
      return { ...evt };
    });
    console.log(new_events);

    //현재학급의 events가 있고
    if (new_events.length !== 0) {
      let event_index;
      const existedEvent = new_events.filter((event, index) => {
        if (event.id === data.id) {
          console.log(event_index);
          //events에서 인덱스 저장해두기
          event_index = index;
        }
        return event.id === data.id;
      });

      // let doc_id;
      //기존 자료인 경우
      if (existedEvent.length > 0) {
        if (fixOrDel === "fix") {
          // console.log(event_index);
          console.log(data);
          // new_events[event_index] = data;
          new_events.splice(event_index, 1, data);
          // new_events.push(data);
          console.log(new_events);
          let new_data = [...new_events];
          if (!props.isSubject) {
            const fixed_data = { attend_data: new_data };

            await setDoc(attendTodoRef, fixed_data);
            // await setDoc(attendTodoRef, fixed_data).then(() => {
            //   const event = { ...data, eventDate: eventDate };
            //   new_events[new_events.length - 1] = event;
            // });

            // const event = { ...data, eventDate: eventDate };
            // new_events[event_index] = event;
          } else {
            let new_wholeEvents = [];
            new_wholeEvents = [
              ...wholeEvents.map((cl) => {
                if (Object.keys(cl)[0] === nowClassName) {
                  //반이름이 같으면 수정한 데이터 넣고
                  return { [nowClassName]: new_data };
                } else {
                  return cl;
                }
              }),
            ];
            setWholeEvents(new_wholeEvents);
            await updateDoc(attendTodoRef, { attend_data: new_wholeEvents });
          }

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
          const new_data = { attend_data: new_events };

          if (!props.isSubject) {
            await updateDoc(attendTodoRef, new_data);
          } else {
            let new_wholeEvents = [...wholeEvents].filter(
              (cl) => Object.keys(cl)[0] !== nowClassName
            );
            if (new_events.length !== 0) {
              new_wholeEvents.push({ [nowClassName]: new_events });
            }
            setWholeEvents(new_wholeEvents);
            await updateDoc(attendTodoRef, { attend_data: new_wholeEvents });
          }
          // console.log("이벤트바이데이즈에서 일치하는 자료 찾아서 제거함!");
        }

        // console.log(data);

        //자료들이 있었는데 새로운 자료인 경우
      } else {
        //firestore에 추가!
        new_events.push(data);
        let new_data = JSON.parse(JSON.stringify(new_events));
        let fixed_data;
        if (!props.isSubject) {
          fixed_data = { attend_data: new_data };

          //events에도 추가!
          // console.log(data);
        } else {
          //현재 반을 제외한 전체 반 자료에 현재반 자료를 더하기
          let new_wholeEvents = [...wholeEvents].filter(
            (cl) => Object.keys(cl)[0] !== nowClassName
          );
          new_wholeEvents.push({ [nowClassName]: new_data });
          fixed_data = { attend_data: new_wholeEvents };
          // console.log();
          setWholeEvents(new_wholeEvents);
        }
        await updateDoc(attendTodoRef, fixed_data);
        // await updateDoc(attendTodoRef, fixed_data).then(() => {
        //   let event = { ...data, eventDate: eventDate };
        //   new_events.push(event);
        // });
        // let event = { ...data, eventDate: eventDate };
        // new_events.push(event);
      }

      // 이벤트 자료가 아예 없는 경우
    } else {
      new_events = [];
      new_events.push(data);
      // console.log("events에 처음 입력된 자료");
      // console.log(data);
      //firestore에 추가!
      let new_data;
      if (!props.isSubject) {
        new_data = { attend_data: [...new_events] };
      } else {
        // 다른반의 자료는 있는 경우
        if (wholeEvents?.length > 0) {
          let new_wholeEvents = [...wholeEvents];

          new_wholeEvents.push({ [nowClassName]: [...new_events] });
          new_data = { attend_data: new_wholeEvents };
          setWholeEvents(new_wholeEvents);
          console.log(new_wholeEvents);
          //아예 자료가 없는 경우
        } else {
          new_data = {
            attend_data: [{ [nowClassName]: [...new_events] }],
          };
          setWholeEvents([{ [nowClassName]: [...new_events] }]);
        }
      }
      await setDoc(attendTodoRef, new_data);
      // await setDoc(attendTodoRef, new_data).then(() => {
      //   let event = { ...data, eventDate: eventDate };
      //   new_events.push(event);
      // });
      //events에도 추가!
      // let event = { ...data, eventDate: eventDate };
      // new_events.push(event);
    }
    setEvents([...new_events]);
    selectClassHandler();
    // getAttendsFromDb();

    // return new_events;
  };

  //EventLists에서 호출하는 수정버튼 함수,
  const fixedEventHandler = (fixed_data, eventDate) => {
    setFixIsShown("0");
    fixEvents(fixed_data, eventDate, "fix");
  }; // 수정버튼 함수 끝

  //EventLists에서 보낸 자료 삭제 요청 함수
  const removeEventHandler = (data) => {
    fixEvents(data, data.eventDate, "del");
  };

  return (
    <>
      {dayEventIsShown && (
        <Modal
          onClose={dayEventHideHandler}
          addStyle={fixIsShown !== "0" ? "showCopyCal" : null}
        >
          <EventLists
            eventOnDay={eventOnDay}
            fixIsShown={fixIsShown}
            fixedEventHandler={fixedEventHandler}
            setFixIsShown={setFixIsShown}
            removeData={removeEventHandler}
            selectOption={props.selectOption}
            about={props.about}
            dayEventHideHandler={dayEventHideHandler}
            students={!props.isSubject ? props.students : nowClStudents}
            userUid={props.userUid}
            isSubject={props.isSubject}
          />
        </Modal>
      )}

      {/* 전담교사만 보이는 학급 셀렉트 */}

      {props.isSubject && (
        <div className={classes["classSelect-div"]}>
          <select
            ref={selectRef}
            onChange={selectClassHandler}
            className={classes["class-select"]}
            value={nowClassName}
          >
            <option value="">--학급--</option>
            {props.students?.map((cl) => (
              <option key={Object.keys(cl)} value={Object.keys(cl)}>
                {Object.keys(cl)}
              </option>
            ))}
          </select>
          {selectRef?.current?.value === "" && "* 학급을 먼저 선택해주세요."}
        </div>
      )}

      <AttendCalendar inline={"true"} getDateValue={getDateHandler} />

      {!props.isSubject && (
        <p>
          {"* 일정 기간 반복되는 출결은 명렬표 화면을 활용하시면 편리해요!"}
        </p>
      )}

      <p>
        * 문제가 지속되시면 kerbong@gmail.com으로 알려주세요. 최대한 빠르게
        해결해 드릴게요!
      </p>
    </>
  );
};

export default AttendCtxCalendar;
