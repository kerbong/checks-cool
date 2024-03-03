import { useState, useEffect, useRef } from "react";
import AttendCalendar from "../Attendance/AttendCalendar";
import Modal from "../Layout/Modal";
import holidays2023 from "holidays2023";
import EventLists from "../Event/EventLists";
import classes from "./AttendCtxCalendar.module.css";
import dayjs from "dayjs";

import { dbService, storageService } from "../../fbase";
import { onSnapshot, setDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";

const thisMonth = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (1 + today.getMonth())).slice(-2);
  return `${year}-${month}`;
};

const AttendCtxCalendar = (props) => {
  const [currentMonth, setCurrentMonth] = useState(thisMonth);
  const [eventsDone, setEventsDone] = useState(false);
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
  const getAttendsFromDb = async () => {
    //db에서 attend DB가져오고 작성자가 현재 유저와 동일한지 확인하고 events에 추가하기

    let attendRef = doc(dbService, "attend", props.userUid);
    // console.log(queryWhere);

    onSnapshot(attendRef, (doc) => {
      // setEvents([]);
      //기존에 있던 events들도 다 지우기

      setEvents([]);
      setWholeEvents([]);

      //올해 전담이면
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
        setEventsDone(true);
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
    //wholeEvents에서 해당하는 학급 찾아서 events에 저장
    [...wholeEvents].forEach((cl) => {
      if (Object.keys(cl)[0] === nowClassName) {
        // removeScreenEvents();
        setEvents(Object.values(cl)[0]);
      }
    });

    //만약 해당 반에 아직 데이터가 없으면 events빈배열로 설정 및 리무브 스크린 이벤트함수 실행
    const existSelectClData = [...wholeEvents]?.filter(
      (cl) => Object.keys(cl)[0] === nowClassName
    );
    if (existSelectClData.length === 0) {
      // removeScreenEvents();

      setEvents([]);
    }

    props.students?.forEach((cl) => {
      if (Object.keys(cl)[0] === nowClassName) {
        setNowClStudents(Object.values(cl)[0]);
      }
    });

    // --학급-- 을 누르면 학생을 초기화
    if (nowClassName === "") {
      setNowClStudents([]);
    }
  };

  //db에서 자료 받아오기 useEffect
  // useEffect(() => {
  //   // removeScreenEvents();
  // }, [currentMonth]);

  //셀렉트 태그에서 값을 선택하면 해당 반의 자료만 화면에 보여주도록 events 상태 set하기
  useEffect(() => {
    // console.log(nowClassName);
    selectEvents();
  }, [nowClassName]);

  useEffect(() => {
    //db에서 학년 자료 가져오기, showPublicEvent를 의존성으로 넣어두면 알아서 바뀔 때마다 실행됨. 이게 state의 변경상태에 따라 무언가를 실행하도록 하는 베스트인듯
    getAttendsFromDb();
  }, [props.isSubject]);

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

  useEffect(() => {
    //현재 연월가져옴
    let currentM = getCurrentMonth();
    //state로 설정함
    setCurrentMonth(currentM);

    function dayOutClick(day) {
      let currentM = getCurrentMonth();
      let move_to = 1;
      if (day.getAttribute("aria-label").split(" ")[3].slice(0, -1) > 20) {
        move_to = -1;
      }
      let fixedM = fixCurrentMonth(currentM, move_to);
      //state 설정
      setCurrentMonth(fixedM);
    }

    function dayOnClick(day) {
      //클릭한 날짜정보와 일치하는 보여줄 정보만 저장
      let day_date = day.getAttribute("aria-label");
      let yyyymmdd = calEventDayToYMD(day);

      if (events.length !== 0) {
        // 기존 코드, eventByDays 자료에 지금 날짜와 같은 자료가 있는지 확인해서 새로운 배열에 넣기
        // console.log(yyyymmdd.split("-")[2]);
        let new_eventOnDay = events?.filter(
          (event) => event?.id?.slice(5, 10) === yyyymmdd?.slice(5, 10)
        );
        //만약 오늘 날짜에 해당하는 게 있으면
        if (new_eventOnDay.length > 0) {
          //중복되는 자료 있으면 제거
          let stringEventOnDay = new_eventOnDay?.map((event) => {
            event = { ...event, eventDate: day_date };
            return JSON.stringify(event);
          });

          let fixed_eventOnDay = [...new Set(stringEventOnDay)]?.map((event) =>
            JSON.parse(event)
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
    }

    //모든 날짜에 이벤트 보여주는 클릭 이벤트리스너 등록 useEffect밖으로 나가면.. 무한로딩;;
    const showAllDayEvents = (events) => {
      let mondayToFridays = document.querySelectorAll(
        '.react-datepicker__day[aria-disabled="false"]'
      );

      mondayToFridays.forEach((day) => {
        //만약 다음달의 날짜인 경우 currentMonth state를 변경시켜서 useEffect를 실행해줌.(다음달 클릭했을 때 실행하는 것처럼)
        if (day.getAttribute("class").includes("--outside-month")) {
          day.onclick = () => dayOutClick(day);
          //해당 월의 일반적인 주중 날짜를 클릭하면..
        } else {
          day.onclick = () => dayOnClick(day);
        }
        setEventOnDay([]);
      });
    };

    //캘린더에 그려진 모든 필요없는 버튼들 지우고 ( 숫자만 남기고.. ) 새롭게 휴일과 이벤트 그려주기
    const eventDrawOnCalendar = () => {
      //먼저 그려져있던 버튼들 모두 삭제하기
      const all_day = document.querySelectorAll(".react-datepicker__day");
      // console.log(all_day);
      all_day?.forEach((dayTag) => {
        //현재 선택된 날짜들이 아니면 모두 색깔 원래대로..
        if (!dayTag.getAttribute("aria-selected")) {
          dayTag.style.backgroundColor = "inherit";
        }
        // while (dayTag.hasChildNodes()) {
        while (dayTag?.children?.length > 0) {
          dayTag?.firstElementChild?.remove();
        }
        // }

        // 그냥 무조건 버튼 삭제하기!
      });

      // console.log(drawHolidays);
      // console.log(holidays2023);
      //휴일 그려주기
      holidays2023?.forEach((holiday) => {
        if (holiday[0] === currentMonth) {
          let holiday_queryName = holiday[1].split("*");
          let holidayTag = document.querySelectorAll(holiday_queryName[0])[0];
          if (!holidayTag) return;

          const btn = document.createElement("button");
          btn.className = `${classes.holidayData} eventBtn`;
          btn.innerText = holiday_queryName[1];
          holidayTag.appendChild(btn);
          holidayTag.style.borderRadius = "10px";
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
          let yyyy_mm_dd = calEventDayToYMD(eventTag);

          // console.log(yyyy_mm_dd);
          // console.log(eventDate);
          //만약 이벤트 태그의 번호와 anyContext의 개별 data의 이벤트 날짜가 같으면 그리기
          // if (yyyy_mm_dd === eventDate && !existedBtn) {
          if (yyyy_mm_dd === eventDate) {
            //달력날짜에 (번호+이름)의 버튼 추가하기
            const btn = document.createElement("button");

            btn.className = `${classes.eventData} eventBtn`;
            btn.innerText = data.name;
            btn.id = data.id;
            //출결옵션용 span태그 만들어서 내용넣고 1200px 넘어가면 보이도록 css classes 설정
            let optionSpan = document.createElement("span");
            optionSpan.className = `${classes.showOptionCal}`;
            optionSpan.innerText = ` | ${data.option.slice(1)}`;
            btn.appendChild(optionSpan);

            //서류 냈는지.. 옵션 있으면 체크버튼 추가가
            if (data?.paper) {
              let checkedI = document.createElement("i");
              checkedI.className = "fa-solid fa-circle-check";
              btn.appendChild(checkedI);
            }

            //2024업데이트 버전.. 신청서 보고서 옵션 있으면 체크버튼 추가
            if (data?.request) {
              let checkedBtn = document.createElement("button");
              checkedBtn.className = `${classes.paperOn}`;
              checkedBtn.innerText = "신";
              btn.appendChild(checkedBtn);
            }

            if (data?.report) {
              let reportBtn = document.createElement("button");
              reportBtn.className = `${classes.paperOn}`;
              reportBtn.innerText = "보";
              btn.appendChild(reportBtn);
            }

            if (yyyy_mm_dd.slice(0, 7) === currentMonth) {
              eventTag.style.backgroundColor = "#d38c85";
            } else {
              eventTag.style.backgroundColor = "#d38c852e";
              btn.style.backgroundColor = "#56423c91";
            }
            eventTag.appendChild(btn);

            eventTag.style.borderRadius = "5px";
          }
        }); //날짜가 anyContext와 같은 태그에 할 일 forEach 함수 끝
      });
    }; // eventDrawOnCalendar 함수 끝

    showAllDayEvents(events);
    eventDrawOnCalendar();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", dayOutClick);
      document.removeEventListener("click", dayOnClick);
    };
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

  //달력에서 받은 month로 currentMonth변경하기
  const getMonthHandler = (month) => {
    setCurrentMonth(month);
  };

  //달력에서 받은 month로 currentMonth변경하기
  const getYearHandler = (year) => {
    setCurrentMonth(dayjs(year).format("YYYY-MM"));
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
    let before_events = JSON.parse(JSON.stringify(events));
    let new_events = before_events?.map((evt) => {
      delete evt.eventDate;
      return { ...evt };
    });

    //현재학급의 events가 있고
    if (new_events.length !== 0) {
      let event_index;
      const existedEvent = new_events?.filter((event, index) => {
        if (event.id === data.id) {
          // console.log(event_index);
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
          // console.log(data);
          // new_events[event_index] = data;
          new_events.splice(event_index, 1, data);
          // new_events.push(data);
          // console.log(new_events);
          let new_data = [...new_events];
          if (!props.isSubject) {
            const fixed_data = { attend_data: new_data };

            await setDoc(attendTodoRef, fixed_data);
          } else {
            let new_wholeEvents = [];
            new_wholeEvents = [
              ...wholeEvents?.map((cl) => {
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
            await setDoc(attendTodoRef, new_data);
          } else {
            let new_wholeEvents = [...wholeEvents]?.filter(
              (cl) => Object.keys(cl)[0] !== nowClassName
            );
            if (new_events.length !== 0) {
              new_wholeEvents.push({ [nowClassName]: new_events });
            }
            setWholeEvents(new_wholeEvents);
            await setDoc(attendTodoRef, { attend_data: new_wholeEvents });
          }

          //혹시 storage에 저장된 해당날짜의 데이터 있으면 그것도 삭제하기
          try {
            let folder = `${props.userUid}/attend/${data.id}`;
            const listRef = ref(storageService, folder);

            listAll(listRef).then((res) => {
              res.items.forEach(async (itemRef) => {
                await deleteObject(
                  ref(storageService, itemRef["_location"]["path"])
                );
              });
            });
          } catch (error) {
            console.log(error);
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
          let new_wholeEvents = [...wholeEvents]?.filter(
            (cl) => Object.keys(cl)[0] !== nowClassName
          );
          new_wholeEvents.push({ [nowClassName]: new_data });
          fixed_data = { attend_data: new_wholeEvents };
          // console.log();
          setWholeEvents(new_wholeEvents);
        }
        await setDoc(attendTodoRef, fixed_data);
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
          // console.log(new_wholeEvents);
          //아예 자료가 없는 경우
        } else {
          new_data = {
            attend_data: [{ [nowClassName]: [...new_events] }],
          };
          setWholeEvents([{ [nowClassName]: [...new_events] }]);
        }
      }
      await setDoc(attendTodoRef, new_data);
    }
    setEvents([...new_events]);
    if (props.isSubject) {
      selectClassHandler();
    }
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

  // //메인화면에서 바로 추가 단축키로 온 경우
  useEffect(() => {
    if (!props.addClicked) return;
    if (!eventsDone) return;

    let day = document.getElementsByClassName(
      "react-datepicker__day--today"
    )?.[0];

    //오늘날짜 클릭해줌
    day.click();
  }, [eventsDone]);

  return (
    <>
      {dayEventIsShown && (
        <Modal
          onClose={dayEventHideHandler}
          addStyle={fixIsShown !== "0" ? "showCopyCal" : null}
        >
          <EventLists
            events={events}
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
            addClicked={props.addClicked || false}
          />
        </Modal>
      )}

      {/* 전담교사만 보이는 학급 셀렉트 */}

      {props.isSubject && (
        <>
          <div className={classes["classSelect-div"]}>
            <h2 className={classes["classSelect-title"]}>출결 달력</h2>
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
          </div>
          {selectRef?.current?.value === "" && "* 학급을 먼저 선택해주세요."}
        </>
      )}

      <AttendCalendar
        inline={"true"}
        getDateValue={getDateHandler}
        isSubject={true}
        getMonthValue={getMonthHandler}
        getYearValue={getYearHandler}
      />
    </>
  );
};

export default AttendCtxCalendar;
