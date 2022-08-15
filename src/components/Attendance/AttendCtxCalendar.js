import { useState, useContext, useEffect } from "react";
import AttendContext from "../../store/attend-context";
import AttendCalendar from "../Attendance/AttendCalendar";
import Modal from "../Layout/Modal";

import EventLists from "../Event/EventLists";
import classes from "./AttendCtxCalendar.module.css";

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
  //날짜별로 이벤트를 모아둔 변수
  const [eventByDays, setEventByDays] = useState([]);
  //보여줄 이벤트만 있는 날짜 변수
  const [eventOnDay, setEventOnDay] = useState([]);
  //   const [clickedDay, setClickedDay] = useState("");

  const attendCtx = useContext(AttendContext);

  //   let eventOnDay = [];
  //   let highlight = [];
  //   highlight.push(dayjs("2022-08-03").format("ddd MMM D YYYY HH:mm:ss"));

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

  useEffect(() => {
    //현재 연월가져옴
    let currentM = getCurrentMonth();
    //state로 설정함
    setCurrentMonth(currentM);

    //모든 날짜에 이벤트 보여주는 클릭 이벤트리스너 등록 useEffect밖으로 나가면.. 무한로딩;;
    const showAllDayEvents = (eventByDays) => {
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
        } else {
          day.onclick = function () {
            //클릭한 날짜정보와 일치하는 보여줄 정보만 저장
            let day_date = day.getAttribute("aria-label");
            if (eventByDays.length !== 0) {
              // 기존 코드, eventByDays 자료에 지금 날짜와 같은 자료가 있는지 확인해서 새로운 배열에 넣기
              let new_eventOnDay = eventByDays.filter(
                (day) => day[0]["eventDate"] === day_date
              )[0];
              //만약 오늘 날짜에 해당하는 게 있으면
              if (new_eventOnDay) {
                //중복되는 자료 있으면 제거
                let stringEventOnDay = new_eventOnDay.map((event) =>
                  JSON.stringify(event)
                );

                let fixed_eventOnDay = [...new Set(stringEventOnDay)].map(
                  (event) => JSON.parse(event)
                );
                setEventOnDay(fixed_eventOnDay);
                //만약 오늘 날짜에 해당하는 자료가 없으면
              } else {
                setEventOnDay([{ eventDate: day_date }]);
              }
            } else {
              setEventOnDay([{ eventDate: day_date }]);
            }

            setDayEventIsShown(true);
          };
        }
        setEventOnDay([]);
      });
    };

    //캘린더에 이벤트 보여주기
    const eventDrawOnCalendar = (month) => {
      // console.log("이벤트를 캘린더에 그리기! 전달받은 달" + month);
      //
      if (attendCtx) {
        //깊은 복사로 eventByDays 복사해두기, 185번줄 아래로 넣을 경우 eventByDays가 빈 배열인 데 거기에 계속 추가해서 문제...
        let new_eventByDays = JSON.parse(JSON.stringify(eventByDays));

        // console.log(attendCtx);
        attendCtx.datas.forEach(function (data) {
          // console.log(data);

          //날짜별로 배열을 만들어서 데이터를 넣기
          //   attendCtxDatasHandler(data);

          // 2022-08-03
          const eventDate = data.option.split("*d")[2];

          //이벤트 달과 현재 달력의 달이 같으면
          if (eventDate.slice(0, 7) === month) {
            // 날짜를 day 변수로 저장
            const day = 0 + eventDate.slice(8);

            //여기에서 오류가 생김. 해당 요소를 찾는데 바뀌기 전에 찾았었음. useEffect 의존배열에 attendctx넣어서 해결?

            // 이벤트 날짜와 같은 날짜 클래스를 지닌 태그를 찾음
            const eventDayTag = document.querySelectorAll(
              `.react-datepicker__day--${day}`
            );

            //다음 달 날짜까지 두 개가 나올 수 있어서 각각을 forEach 반복함
            eventDayTag.forEach(function (eventTag) {
              //이벤트 태그의 날짜 yyyy-mm-dd로 바꾸기
              let eventDayOrigin = eventTag.getAttribute("aria-label");
              let _year = eventDayOrigin.split(" ")[1].slice(0, 4);
              let _month = eventDayOrigin
                .split(" ")[2]
                .slice(0, -1)
                .padStart(2, "0");
              let _day = eventDayOrigin
                .split(" ")[3]
                .slice(0, -1)
                .padStart(2, "0");

              let yyyy_mm_dd = _year + "-" + _month + "-" + _day;

              //기존에 이미 달력에 데이터로 그린 버튼(번호+이름) 있는지 확인
              let existedBtn = document.querySelectorAll(
                `button[id='${data.id}']`
              )[0];

              //만약 이벤트 태그의 번호와 attendctx의 개별 data의 이벤트 날짜가 같고, 이미 그려진 버튼이 없으면
              if (yyyy_mm_dd === eventDate && !existedBtn) {
                //달력날짜에 (번호+이름)의 버튼 추가하기
                const btn = document.createElement("button");
                btn.className = classes.eventData;
                btn.innerText = data.student_num + data.student_name;
                btn.id = data.id;
                eventTag.appendChild(btn);
                eventTag.style.backgroundColor = "#d38c85";
                eventTag.style.borderRadius = "5px";

                //attendCtx.datas의 개별 data를 eventByDays 배열에 추가
                const eventByDaysAddData = () => {
                  // console.log(new_eventByDays);
                  // 기존 데이터가 있으면
                  if (new_eventByDays.length !== 0) {
                    new_eventByDays.forEach(function (day, index) {
                      let new_event = {
                        //2022년 8월 3일 형식추가
                        eventDate: eventDayOrigin,
                        ...data,
                      };
                      //기존 데이터에 동일한 날짜가 있으면 + //데이터 중복 저장 방지
                      if (day[0]["eventDate"] === eventDayOrigin) {
                        let fixedDay = day.filter(
                          (event) => event.id !== data.id
                        );

                        if (fixedDay.length !== 0) {
                          new_eventByDays[index].push(new_event);
                        }

                        //기존 데이터에 동일한 날짜가 없으면
                      } else {
                        new_eventByDays.push([new_event]);
                      }
                    });
                  } else {
                    new_eventByDays.push([
                      {
                        //2022년 8월 3일 형식추가
                        eventDate: eventDayOrigin,
                        ...data,
                      },
                    ]);
                  }
                  setEventByDays(new_eventByDays);
                }; //eventByDays에 데이터 추가 함수 끝
                eventByDaysAddData();
              }
            }); //날짜가 attendCtx와 같은 태그에 할 일 forEach 함수 끝
          } //이벤트 달과 현재 달력의 달이 같을 떄 할일 함수 끝
        }); //attendCtx.datas 의 개별 data 함수 끝
      }
    }; // eventDrawOnCalendar 함수 끝

    eventDrawOnCalendar(currentMonth);

    showAllDayEvents(eventByDays);

    //react에서 추천해주는 데로 집어넣었음 잘 작동하는데 자료를 삭제할 경우 다시 렌더링 되어서.. 버튼이 두개씩 입력됨(버튼 입력될 때 확인하고 만들기)
  }, [currentMonth, attendCtx, eventByDays]);
  // }, [currentMonth]);

  //useEffect 여러 번 사용할 수 있네???
  useEffect(() => {
    //처음 화면을 로딩했을 때 월 이동버튼에 state 변경기능 추가
    // if (monthMoved === 0) {
    const moveMonth = document.querySelectorAll(
      ".react-datepicker__navigation"
    );

    moveMonth[0].addEventListener("click", () => {
      console.log("이전달 클릭");
      //이전 노드에서 가져와서 반영하니까.. 보정함
      let currentM = getCurrentMonth();
      let fixedM = fixCurrentMonth(currentM, -1);
      //state 설정
      setCurrentMonth(fixedM);
      // state를 추가함
      // setMonthMoved(monthMoved + 1);
    });

    moveMonth[1].addEventListener("click", () => {
      console.log("다음달 클릭");
      let currentM = getCurrentMonth();
      let fixedM = fixCurrentMonth(currentM, +1);
      setCurrentMonth(fixedM);
      // setMonthMoved(monthMoved + 1);
    });
    // }
  }, []);

  //달력에서 받은 date 형식을 바꾸기
  const getDateHandler = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let selectDay = year + "-" + month + "-" + day;

    //달력에서 날짜를 클릭하면 해당 날짜와 관련된 데이터 보여주기
    if (attendCtx.lenth > 0) {
      const eventOnDay = attendCtx.datas.map(
        (data) => data.option.split("*d")[2] === selectDay
      );
      console.log(eventOnDay);
    }
  };

  //달력에서 모달 밖 클릭하면 함수
  const dayEventHideHandler = () => {
    setDayEventIsShown(false);
    setFixIsShown("0");
  };

  const fixEventByDays = (data, eventDate, fixOrDel) => {
    // eventByDays 자료 가져와서 수정하기
    let new_eventByDays = JSON.parse(JSON.stringify(eventByDays));

    new_eventByDays.forEach((day, index1) => {
      day.forEach((event, index2) => {
        if (event.id === data.id) {
          if (fixOrDel === "fix") {
            event = { ...data, eventDate: eventDate };
            new_eventByDays[index1][index2] = event;
            //   console.log(new_eventByDays[index1][index2]);
            // console.log("이벤트바이데이즈에서 일치하는 자료 찾아서 수정함!");
          } else if (fixOrDel === "del") {
            new_eventByDays[index1].splice(index2, 1);
            // console.log("이벤트바이데이즈에서 일치하는 자료 찾아서 제거함!");

            //해당날짜에 이벤트가 하나도 없을 경우 날짜 자체를 없애기
            if (new_eventByDays[index1].length === 0) {
              new_eventByDays.splice(index1, 1);
            }
          }
        }
      });
    });

    return new_eventByDays;
  };

  //EventLists에서 호출하는 수정버튼 함수,
  const fixedEventHandler = (fixed_data, eventDate) => {
    attendCtx.addData(fixed_data);
    setFixIsShown("0");

    let new_eventByDays = fixEventByDays(fixed_data, eventDate, "fix");

    let new_eventOnDay = new_eventByDays.filter(
      (day) => day[0]["eventDate"] === eventDate
    )[0];

    // console.log(new_eventOnDay);
    //이부분 프롭스로 넘겨받으면 함수에서 문제가 생길 수 있음.
    setEventByDays(new_eventByDays);
    setEventOnDay(new_eventOnDay);

    let selectedDay = document.querySelectorAll(
      `.react-datepicker__day[aria-label="${eventDate}"]`
    )[0];

    selectedDay.onclick = function () {
      //클릭한 날짜정보와 일치하는 보여줄 정보만 저장
      setEventOnDay(new_eventOnDay);
      setDayEventIsShown(true);
    };
  }; // 수정버튼 함수 끝

  //EventLists에서 보낸 자료 삭제 요청 함수
  const removeEventHandler = (data) => {
    //여기에 실제 attendCtx에서 지우는 거 호출
    attendCtx.removeData(data.id);

    let new_eventByDays = fixEventByDays(data, data.eventDate, "del");

    setEventByDays(new_eventByDays);
    console.log(new_eventByDays);

    //화면에서 지워줌
    document.getElementById(data.id).remove();

    //해당 날짜의 이벤트 리스너 새로 등록하기
    let new_eventOnDay = new_eventByDays.filter(
      (day) => day[0]["eventDate"] === data.eventDate
    )[0];

    let selectedDay = document.querySelectorAll(
      `.react-datepicker__day[aria-label="${data.eventDate}"]`
    )[0];

    selectedDay.onclick = function () {
      //클릭한 날짜정보와 일치하는 보여줄 정보만 저장
      setEventOnDay(new_eventOnDay);
      setDayEventIsShown(true);
    };
  };

  return (
    <>
      {dayEventIsShown && (
        <Modal onClose={dayEventHideHandler}>
          <EventLists
            eventOnDay={eventOnDay}
            fixIsShown={fixIsShown}
            fixedEventHandler={fixedEventHandler}
            setFixIsShown={setFixIsShown}
            removeData={removeEventHandler}
          />
        </Modal>
      )}
      <AttendCalendar inline={"true"} getDateValue={getDateHandler} />
    </>
  );
};

export default AttendCtxCalendar;
