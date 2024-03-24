import React, { useEffect, useState } from "react";

import EventItem from "./EventItem";
import Swal from "sweetalert2";
import EventInput from "./EventInput";
import classes from "./EventLists.module.css";
import Button from "../Layout/Button";

import dayjs from "dayjs";
import { FaRegCircleXmark } from "react-icons/fa6";

const EventLists = (props) => {
  const [eventOnDay, setEventOnDay] = useState(props.eventOnDay);
  const [addEvent, setAddEvent] = useState(false);

  // let eventOnDay = props.eventOnDay;
  let fixIsShown = props.fixIsShown;

  const nowYear = (date) => {
    let data_id = date?.length > 0 ? date : new Date();
    return dayjs(data_id).format("MM-DD") <= "02-15"
      ? String(+dayjs(data_id).format("YYYY") - 1)
      : dayjs(data_id).format("YYYY");
  };

  //달력에서 자료 삭제 함수
  const removeCheckSwal = (data) => {
    const option_note = document.getElementById(
      `option-area${data.id}`
    )?.innerText;

    Swal.fire({
      title: "자료를 지울까요?",
      text: `${data.id.slice(0, 10)} | ${data.name} | ${option_note}`,
      showDenyButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        props.removeData(data);
        document.querySelectorAll(`button[id='${data.id}']`)[0].remove();

        const new_eventOnDay = eventOnDay?.filter(
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
    let option = document.getElementById(`option-area${data.id}`);
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
    let new_option = document.getElementById(`option-select${item.num}`);
    //새로추가하기인데 옵션 선택안해서 빈칸이면
    if (new_option) {
      if (new_option.value === "") {
        notEnough();
        return false;
      }

      if (!item.id || !item.name) {
        notEnough();
        return false;
      } else {
        // 하루에 똑같은 학생의 데이터는 3개 까지 가능!
        let todayEventData = [];

        //날짜랑 학생번호까지만 저장해두기
        document.querySelectorAll("h2")?.forEach((evt) => {
          if (!evt?.id?.includes("eventName")) return;
          todayEventData.push(evt?.id?.split(" ")[0]);
        });

        if (
          findRepeatedElements(todayEventData) &&
          findRepeatedElements(todayEventData)?.slice(9) ===
            item?.id?.split(" ")?.[0]
        ) {
          Swal.fire(
            "저장 실패",
            "출결자료는 학생당 하루에 3개 까지만 저장할 수 있습니다.",
            "error"
          );
          return false;
        } else {
          return true;
        }
      }
      //기존자료인데
    } else {
      let new_option = document.getElementById(`option-select${item.id}`);
      let new_note = document.getElementById(`option-note${item.id}`);

      //옵션과 노트값이 기존과 같으면
      if (new_option.value === item.option && new_note === item.note) {
        notEnough();
        return false;
      } else {
        return true;
      }
    }
  };

  const findRepeatedElements = (arr) => {
    const countMap = {};

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];

      if (countMap[element]) {
        countMap[element]++;
      } else {
        countMap[element] = 1;
      }

      if (countMap[element] >= 3) {
        return element;
      }
    }

    return null;
  };

  //새로운/ 수정된 자료 저장함수
  const saveFixedData = (item) => {
    let new_option = document.getElementById(`option-select${item.num}`);
    let optionValue;
    let noteValue;
    //새로운 출결 이벤트일경우
    if (new_option) {
      optionValue = document.getElementById(`option-select${item.num}`).value;
      noteValue = document.getElementById(`option-note${item.num}`).value;

      //기존 출결 이벤트의 경우
    } else {
      //출결 옵션 선택값
      // console.log(item);
      optionValue =
        document.getElementById(`option-select${item.id}`)?.value ||
        document.getElementById(`option-select${item.beforeId}`)?.value;
      //비고 입력값, undefined가 가능해서.. "" 넣어줘야함.
      noteValue =
        document.getElementById(`option-note${item.id}`)?.value ||
        document.getElementById(`option-note${item.beforeId}`)?.value ||
        "";
    }

    //출결 이벤트 날짜

    const fixed_data = {
      num: +item.num,
      name: item.name,
      id: item.id,
      option: optionValue,
      note: noteValue,
    };

    if (item.clName) {
      fixed_data.clName = item.clName;
    }

    if (item?.paper !== undefined) {
      fixed_data.paper = item.paper;
    }
    if (item?.request !== undefined) {
      fixed_data.request = item.request;
    }
    if (item?.report !== undefined) {
      fixed_data.report = item.report;
    }

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

  //메인화면에서 바로 추가하는 기능 사용할 경우(출결)
  useEffect(() => {
    if (!props?.addClicked) return;

    setAddEvent(true);
    props?.setFixIsShown("0");
  }, [props?.addClicked]);

  const yymmddToYyyyMmDd = (eventDayOrigin) => {
    let startSplit = 1;

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

  return (
    <div className="eventOnDayList">
      <p
        className={classes["closeBtn"]}
        onClick={() => {
          props.dayEventHideHandler();
        }}
      >
        <FaRegCircleXmark />
      </p>
      <h1 className={eventOnDay[0].eventDate}>
        {`${eventOnDay[0].eventDate.slice(
          6,
          -4
        )} (${eventOnDay[0].eventDate.slice(-3, -2)})`}
      </h1>
      {/* //addEvent false 상황이고 출결인데 현재 학년도에 해당하면 추가하기 버튼 */}
      {!addEvent && (
        <div className={classes["add-event-div"]}>
          <Button
            name={"추가"}
            id={"add-checkItemBtn"}
            className={"add-event-button"}
            onclick={() => {
              if (
                props.about === "attendance" &&
                nowYear(yymmddToYyyyMmDd(eventOnDay[0].eventDate)) !== nowYear()
              ) {
                Swal.fire(
                  "자료 추가 불가",
                  "현재 학년도의 출결 사항만 입력이 가능해요! 다른 학년도의 출결 사항은 수정/삭제만 가능합니다.",
                  "warning"
                );
                return;
              }
              setAddEvent(true);
              props.setFixIsShown("0");
            }}
          />
        </div>
      )}
      <div className={classes["event-input-div"]}>
        {addEvent && (
          //addEvent 상황이면 인풋창 보여주고
          <EventInput
            events={props.about === "attendance" && props.events}
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
        eventOnDay?.map((event) => (
          <EventItem
            item={event}
            key={event.id}
            keyId={event.id}
            shownId={event.id}
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
