import React, { useState } from "react";

import EventItem from "./EventItem";
import Swal from "sweetalert2";
import EventInput from "./EventInput";
import classes from "./EventLists.module.css";

import attendanceOption from "../../attendanceOption";

const EventLists = (props) => {
  const [eventOnDay, setEventOnDay] = useState(props.eventOnDay);
  const [addEvent, setAddEvent] = useState(false);

  // let eventOnDay = props.eventOnDay;
  let fixIsShown = props.fixIsShown;

  //달력에서 자료 삭제 함수
  const removeCheckSwal = (data) => {
    Swal.fire({
      title: "자료를 지울까요?",
      text: `${data.option.split("*d")[2]} | ${data.student_name} | ${
        data.option.split("*d")[0]
      }`,
      showDenyButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "자료가 삭제되었어요.",
          text: "5초 후에 창이 사라집니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });

        props.removeData(data);
      }
    });
    document.querySelectorAll(`button[id='${data.id}']`)[0].remove();
  }; //달력에서 자료 삭제 함수 끝

  //이미 있던 이벤트 수정할 때 화면 수정하는 함수
  const updateEventOnScreen = (data) => {
    let option = document.querySelector(`#option-area${data.student_num}`);
    option.innerText = `${data.option.split("*d")[0]} | ${
      data.option.split("*d")[1]
    }`;
  };

  //없던 이벤트 새로 추가할 떄 화면 수정하는 함수
  const newEventOnScreen = (item) => {
    let new_eventOnDay = JSON.parse(JSON.stringify(eventOnDay));
    if (new_eventOnDay[0].id === undefined) {
      new_eventOnDay[0] = item;
    } else {
      new_eventOnDay.push(item);
    }

    //강제로 리 렌더링ㅜㅜ...해서 추가한 자료 보여줌
    setEventOnDay([...new_eventOnDay]);
  };

  //새로운/ 수정된 자료 저장함수
  const saveFixedData = (item) => {
    //출결 옵션 선택값
    const optionValue = document.querySelector(
      `#option-select${item.student_num}`
    ).value;
    //비고 입력값
    const noteValue = document.querySelector(
      `#option-note${item.student_num}`
    ).value;
    //출결 이벤트 날짜
    const eventDay = item.id.slice(0, 10);

    const fixed_data = {
      student_num: item.student_num,
      student_name: item.student_name,
      id: eventDay + item.student_num,
      option_id: optionValue.slice(0, 1),
      option: optionValue.slice(1) + "*d" + noteValue + "*d" + eventDay,
    };

    // console.log(fixed_data);

    //attendCtx와 eventByDays eventOnDay 를 수정하는 함수
    props.fixedEventHandler(fixed_data, item.eventDate);

    // setEventOnDay(eventOnDay.concat());

    Swal.fire({
      icon: "success",
      title: "자료가 저장되었어요.",
      text: "5초 후에 창이 사라집니다.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });

    let return_data = { ...fixed_data, eventDate: item.eventDate };

    //기존 데이터 수정할 떄 필요한 텍스트
    return return_data;
  };

  const closeHandler = () => {
    setAddEvent(false);
  };

  return (
    <div className="eventOnDayList">
      <h1 className={eventOnDay[0].eventDate}>
        {`${eventOnDay[0].eventDate.slice(
          6,
          -4
        )} (${eventOnDay[0].eventDate.slice(-3, -2)})`}
      </h1>
      {/* //addEvent false 상황이면 추가하기 버튼 */}
      <div className={classes["add-event-div"]}>
        <button
          className={classes["add-event-button"]}
          onClick={() => {
            setAddEvent(true);
          }}
        >
          추가하기
        </button>
      </div>
      <div className="event-input-div">
        {addEvent && (
          //addEvent 상황이면 인풋창 보여주고
          <EventInput
            closeHandler={closeHandler}
            selectOptions={attendanceOption}
            placeholder="비고를 입력하세요."
            saveNewData={(item) => {
              let data = saveFixedData(item);
              newEventOnScreen(data);
              setAddEvent(false);
            }}
          />
        )}
      </div>

      {eventOnDay[0].id === undefined ? (
        <div className={classes["no-events-div"]}>
          😕 등록된 이벤트가 없어요
        </div>
      ) : (
        eventOnDay.map((item) => (
          <EventItem
            key={item.id}
            item={item}
            selectOptions={attendanceOption}
            fixIsShown={fixIsShown}
            saveFixedData={(item) => {
              let data = saveFixedData(item);
              updateEventOnScreen(data);
            }}
            removeCheckSwal={removeCheckSwal}
            setFixIsShown={props.setFixIsShown}
          />
        ))
      )}
    </div> //리스트 전체를 감싸는 div 태그 끝
  );
};

export default EventLists;
