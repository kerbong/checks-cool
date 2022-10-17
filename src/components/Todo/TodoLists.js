import React, { useState } from "react";

import Swal from "sweetalert2";
import Button from "../Layout/Button";
import classes from "./TodoLists.module.css";
import EventItem from "../Event/EventItem";
import EventInput from "../Event/EventInput";

const TodoLists = (props) => {
  const [eventOnDay, setEventOnDay] = useState(props.eventOnDay);
  const [addEvent, setAddEvent] = useState(false);
  // const [defaultOptionValue, setDefaultOptionValue] = useState("");
  // let eventOnDay = props.eventOnDay;
  let fixIsShown = props.fixIsShown;

  //옵션 선택했는지 확인하기(저장가능여부 확인)
  const enoughData = (item) => {
    //출결 옵션 선택값, note 부분은 입력 필수아님
    let optionValue;

    //행사명
    let eventName;
    //새로 추가하거나 바로 입력한 자료인 경우
    if (item["doc_id"] === undefined) {
      eventName = document.querySelector("#todo-eventName");
      let option = document.querySelector(`#option-select`);
      // console.log(eventName);
      // console.log(option);
      //새로운 자료(input)인 경우 있음
      if (option !== null || eventName !== null) {
        eventName = eventName.value;
        optionValue = option.value;
      } else {
        // console.log(item);
        eventName = item.eventName;
        optionValue = document.querySelector(
          `#option-select${eventName.replace(/ /g, "")}`
        ).value;
      }
      //업로드 되어있던 자료인 경우
    } else {
      eventName = item.eventName;
      optionValue = document.querySelector(
        `#option-select${eventName.replace(/ /g, "")}`
      ).value;
    }

    //빈 공용 자료에는 저장 불가
    if (props.about === "todo--") {
      Swal.fire({
        icon: "error",
        title: "자료저장이 불가능합니다.",
        text: "먼저 '설정'을 눌러 공용방을 개설/ 입장하세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return false;
    } else if (item.id && eventName && optionValue) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "정보가 부족해요!",
        text: "이름과 옵션선택은 필수 요소입니다.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return false;
    }
  };

  //새로운/ 수정된 자료 저장함수
  const saveFixedData = (item) => {
    let eventName;
    let optionValue;
    let noteValue;
    //새로운 이벤트일 경우 name없음.
    if (!item.eventName) {
      eventName = document.querySelector(`#todo-eventName`).value;
      optionValue = document.querySelector("#option-select").value;
      noteValue = document.querySelector("#option-note").value;
      //기존 이벤트인 경우
    } else {
      eventName = item.eventName;
      optionValue = document.querySelector(
        `#option-select${eventName.replace(/ /g, "")}`
      ).value;
      noteValue = document.querySelector(
        `#option-note${eventName.replace(/ /g, "")}`
      ).value;
    }

    //todo 이벤트 자료형식
    const fixed_data = {
      id: item.id,
      eventName: eventName,
      option: optionValue,
      note: noteValue,
      owner: props.about.slice(4),
      writtenId: props.userUid,
    };

    // console.log(item.eventDate);
    //events eventOnDay 를 수정하는 함수
    // console.log(fixed_data);
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

    //TodoPage에서 events 상태를 업데이트 해줘야 리렌더링이 되어 화면에 이벤트 보임!
    // props.setEventsHandler(return_data);
    //기존 데이터 수정할 떄 필요한 텍스트
    return return_data;
  };

  const closeHandler = () => {
    setAddEvent(false);
  };

  //이미 있던 이벤트 수정할 때 화면 수정하는 함수
  const updateEventOnScreen = (data) => {
    // console.log(data.id);
    let option = document.querySelector(
      `#option-area${data.eventName.replace(/ /g, "")}`
    );
    option.innerText = `${data.option.slice(1)} | ${data.note}`;
  };

  //없던 이벤트 새로 추가할 떄 화면 수정하는 함수
  const newEventOnScreen = (item) => {
    let new_eventOnDay = JSON.parse(JSON.stringify(eventOnDay));
    if (new_eventOnDay[0].id === undefined) {
      new_eventOnDay[0] = item;
      // console.log("없던날짜에 추가");
    } else {
      new_eventOnDay.push(item);
      // console.log("있는날짜에 추가");
    }
    //강제로 리 렌더링ㅜㅜ...해서 추가한 자료 보여줌
    setEventOnDay([...new_eventOnDay]);
  };

  //달력에서 자료 삭제 함수
  const removeCheckSwal = (data) => {
    Swal.fire({
      title: "기존자료를 지울까요?",
      text: `${data.id.slice(0, 10)} | ${data.eventName} | ${data.option.slice(
        1
      )}`,
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
        //자료 복제하고 기존 자료도 남겨둘 경우
      }
    });
    document.querySelectorAll(`button[id='${data.id}']`)[0].remove();
  }; //달력에서 자료 삭제 함수 끝

  return (
    <div className="eventOnDayList">
      <p
        className={classes["closeBtn"]}
        onClick={() => {
          props.dayEventHideHandler();
        }}
      >
        <i className="fa-regular fa-circle-xmark"></i>
      </p>
      <h1 className={eventOnDay[0].eventDate}>
        {`${eventOnDay[0].eventDate.slice(
          6,
          -4
        )} (${eventOnDay[0].eventDate.slice(-3, -2)})`}
      </h1>
      {/* //addEvent false 상황이면 추가하기 버튼 */}
      <div className={classes["add-event-div"]}>
        <Button
          name={"추가하기"}
          className={"add-event-button"}
          onclick={() => {
            setAddEvent(true);
            props.setFixIsShown("0");
          }}
        />
      </div>
      <div className="event-input-div">
        {addEvent && (
          //addEvent 상황이면 인풋창 보여주고
          <EventInput
            id={props.id}
            closeHandler={closeHandler}
            selectOption={props.selectOption}
            placeholder="내용을 입력해주세요."
            about={props.about}
            // dafaultValue={defaultOptionValue}
            saveNewData={(item) => {
              let getEnoughData = enoughData(item);
              if (getEnoughData) {
                let data = saveFixedData(item);
                newEventOnScreen(data);
                setAddEvent(false);
              }
            }}
          />
        )}
      </div>

      {eventOnDay[0].id === undefined ? (
        <div className={classes["no-events-div"]}>
          😕 등록된 이벤트가 없어요
        </div>
      ) : (
        eventOnDay.map((event) => (
          <EventItem
            item={event}
            key={event.id}
            keyId={event.id}
            shownId={event.id}
            text={event.eventName}
            note={event.note}
            option={event.option}
            about={props.about}
            selectOption={props.selectOption}
            fixIsShown={fixIsShown}
            saveFixedData={(item) => {
              let getEnoughData = enoughData(item);
              if (getEnoughData) {
                let data = saveFixedData(item);
                if (event.id === data.id) {
                  updateEventOnScreen(data);
                }
              }
            }}
            removeCheckSwal={removeCheckSwal}
            setFixIsShown={(id) => {
              props.setFixIsShown(id);
              setAddEvent(false);
            }}
            newEventOnScreen={newEventOnScreen}
          />
        ))
      )}
    </div> //리스트 전체를 감싸는 div 태그 끝
  );
};

export default TodoLists;
