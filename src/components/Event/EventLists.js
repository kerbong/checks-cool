import React, { useState } from "react";

import EventItem from "./EventItem";
import Swal from "sweetalert2";
import EventInput from "./EventInput";
import classes from "./EventLists.module.css";
import Button from "../Layout/Button";

const EventLists = (props) => {
  const [eventOnDay, setEventOnDay] = useState(props.eventOnDay);
  const [addEvent, setAddEvent] = useState(false);

  // let eventOnDay = props.eventOnDay;
  let fixIsShown = props.fixIsShown;

  //달력에서 자료 삭제 함수
  const removeCheckSwal = (data) => {
    Swal.fire({
      title: "자료를 지울까요?",
      text: `${data.id.slice(0, 10)} | ${data.name} | ${data.option.slice(1)}`,
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
        document.querySelectorAll(`button[id='${data.id}']`)[0].remove();

        const new_eventOnDay = eventOnDay.filter(
          (event) => event.id !== data.id
        );

        if (new_eventOnDay.length === 0) {
          new_eventOnDay.push({ eventDate: data.eventDate });
        }
        //모달화면에서 학생 출결정보 사라짐
        setEventOnDay([...new_eventOnDay]);
      }
    });
  }; //달력에서 자료 삭제 함수 끝

  //이미 있던 이벤트 수정할 때 화면 수정하는 함수
  const updateEventOnScreen = (data) => {
    let option = document.querySelector(`#option-area${data.name}`);
    option.innerText = `${data.option.slice(1)} | ${data.note}`;
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

  //옵션 선택했는지 확인하기(저장가능여부 확인)
  const enoughData = (item) => {
    const notEnough = () => {
      Swal.fire({
        icon: "error",
        title: "정보가 부족해요!",
        text: "이름과 옵션선택은 필수 요소입니다.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
    };
    //새로 추가하기 옵션 셀렉트
    let new_option = document.querySelector(`#option-select${item.num}`);
    //새로추가하기인데 옵션 선택안해서 빈칸이면
    if (new_option) {
      if (new_option.value === "") {
        notEnough();
        return false;
      }

      if (!item.num || !item.name) {
        notEnough();
        return false;
      } else {
        return true;
      }
      //기존자료인데
    } else {
      let new_option = document.querySelector(`#option-select${item.name}`);
      let new_note = document.querySelector(`#option-note${item.name}`);

      //옵션과 노트값이 기존과 같으면
      if (new_option.value === item.option && new_note === item.note) {
        notEnough();
        return false;
      } else {
        return true;
      }
    }
  };

  //새로운/ 수정된 자료 저장함수
  const saveFixedData = (item) => {
    let exist_option = document.querySelector(`#option-select${item.name}`);
    let optionValue;
    let noteValue;

    //새로운 출결 이벤트일경우
    if (!exist_option) {
      optionValue = document.querySelector(`#option-select${item.num}`).value;
      noteValue = document.querySelector(`#option-note${item.num}`).value;

      //기존 출결 이벤트의 경우
    } else {
      //출결 옵션 선택값
      optionValue = document.querySelector(`#option-select${item.name}`).value;

      //비고 입력값
      noteValue = document.querySelector(`#option-note${item.name}`).value;
    }

    //출결 이벤트 날짜

    const fixed_data = {
      num: item.num,
      name: item.name,
      id: item.id,
      option: optionValue,
      note: noteValue,
    };

    // console.log(fixed_data);

    //attendCtx와 events eventOnDay 를 수정하는 함수
    props.fixedEventHandler(fixed_data, item.eventDate);

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
          name={"추가"}
          id={"add-checkItemBtn"}
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
            closeHandler={closeHandler}
            selectOption={props.selectOption}
            placeholder="비고를 입력하세요."
            about={props.about}
            saveNewData={(item) => {
              let getEnoughData = enoughData(item);
              if (getEnoughData) {
                let data = saveFixedData(item);
                newEventOnScreen(data);
                setAddEvent(false);
              }
            }}
            students={props.students}
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
            shownId={event.num}
            text={event.name}
            note={event.note}
            option={event.option}
            selectOption={props.selectOption}
            fixIsShown={fixIsShown}
            saveFixedData={(item) => {
              if (event.id !== item.id) {
                saveFixedData(item);
              } else {
                let getEnoughData = enoughData(item);
                if (getEnoughData) {
                  let data = saveFixedData(item);

                  updateEventOnScreen(data);
                }
              }
            }}
            about={props.about}
            removeCheckSwal={removeCheckSwal}
            setFixIsShown={(id) => {
              props.setFixIsShown(id);
              setAddEvent(false);
            }}
          />
        ))
      )}
    </div> //리스트 전체를 감싸는 div 태그 끝
  );
};

export default EventLists;
