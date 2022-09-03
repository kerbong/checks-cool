import React, { useState } from "react";

import TodoItem from "./TodoItem";
import Swal from "sweetalert2";
import TodoInput from "./TodoInput";
import classes from "./TodoLists.module.css";

const TodoLists = (props) => {
  const [eventOnDay, setEventOnDay] = useState(props.eventOnDay);
  const [addEvent, setAddEvent] = useState(false);

  // let eventOnDay = props.eventOnDay;
  let fixIsShown = props.fixIsShown;

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
      {/* <div className="event-input-div">
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
              />
            )}
          </div> */}

      {eventOnDay[0].id === undefined ? (
        <div className={classes["no-events-div"]}>
          😕 등록된 이벤트가 없어요
        </div>
      ) : (
        eventOnDay.map((event) => (
          //   <EventItem
          //     key={item.id}
          //     item={item}
          //     selectOption={props.selectOption}
          //     fixIsShown={fixIsShown}
          //     saveFixedData={(item) => {
          //       let getEnoughData = enoughData(item);
          //       if (getEnoughData) {
          //         let data = saveFixedData(item);
          //         updateEventOnScreen(data);
          //       }
          //     }}
          //     removeCheckSwal={removeCheckSwal}
          //     setFixIsShown={props.setFixIsShown}
          //   />
          <li>
            {event.note} {event.eventName}
          </li>
        ))
      )}
    </div> //리스트 전체를 감싸는 div 태그 끝
  );
};

export default TodoLists;
