import React, { useEffect, useState } from "react";

import classes from "./EventLists.module.css";
import Button from "../Layout/Button";
import EventList from "./EventList";
import Swal from "sweetalert2";

const EventLists = (props) => {
  const [eventOnDay, setEventOnDay] = useState(props.eventOnDay);
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

    //만약 해당날짜에 모든 출결정보가 사라지면 이벤트 리스너 제거하기
    // let noEventOnDay = document.querySelectorAll(
    //   `div[aria-label="${data["eventDate"]}"]`
    // )[0];
    // if (noEventOnDay.childNodes.length === 1) {
    //   noEventOnDay.removeEventListener("click", showEvents);
    // }
  }; //달력에서 자료 삭제 함수 끝

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

    //modal에 보이는 출결 옵션부분 자료만 잠깐 수정해주기
    let option = document.querySelector(`#option-area${item.student_num}`);
    option.innerText = `${optionValue.slice(1)} | ${noteValue}`;

    props.fixedEventHandler(fixed_data, item.eventDate);
    // console.log(eventOnDay);
    // console.log(props.eventOnDay);

    setEventOnDay(props.eventOnDay);
  };

  return (
    <div>
      <h1 className={eventOnDay[0].eventDate}>
        {`${eventOnDay[0].eventDate.slice(
          6,
          -4
        )} (${eventOnDay[0].eventDate.slice(-3, -2)})`}
      </h1>
      {eventOnDay[0].id === undefined ? (
        <>
          <div>등록된 이벤트가 없어요!</div>
        </>
      ) : (
        <>
          <EventList
            eventOnDay={eventOnDay}
            fixIsShown={props.fixIsShown}
            saveFixedData={saveFixedData}
            removeCheckSwal={removeCheckSwal}
          />
          {eventOnDay.map((item) => (
            <li
              key={item.id}
              id={item.id}
              className={classes["event-area"]}
              style={{
                backgroundColor: fixIsShown === item.student_num && "bisque",
              }}
            >
              <div
                id={`attendInfo-area${item.student_num}`}
                className={classes["attendInfo-area"]}
              >
                <h2 id={"name" + item.student_num}>{item.student_name}</h2>
                <span
                  id={`option-area${item.student_num}`}
                  className={classes["option-area"]}
                  style={{
                    display: fixIsShown === item.student_num && "none",
                  }}
                >
                  {item.option.split("*d")[0]} |{" "}
                  {item.option.split("*d")[1] && item.option.split("*d")[1]}
                  {}
                </span>
                <form
                  id={`optionChange-area${item.student_num}`}
                  className={classes["optionChange-area"]}
                  style={{
                    display: fixIsShown !== item.student_num && "none",
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveFixedData(item);
                  }}
                >
                  <select
                    name="attend-option"
                    id={`option-select${item.student_num}`}
                    required
                  >
                    <option value="">--출 결--</option>
                    <option value="1현장체험">현장체험</option>
                    <option value="2질병결석">질병결석</option>
                    <option value="3가정학습">가정학습</option>
                    <option value="4경조사">경조사</option>
                    <option value="5기타결석">기타결석</option>
                    <option value="6미인정">미인정</option>
                  </select>
                  <input
                    type="text"
                    placeholder="비고를 입력하세요."
                    id={`option-note${item.student_num}`}
                  />
                </form>
              </div>
              <div className={classes["button-area"]}>
                <Button
                  small="true"
                  name={fixIsShown !== item.student_num ? "수정" : "저장"}
                  id={
                    fixIsShown !== item.student_num
                      ? `fix-btn${item.student_num}`
                      : `save-btn${item.student_num}`
                  }
                  style={{ width: "30%", fontSize: "1.1em" }}
                  onclick={
                    fixIsShown !== item.student_num
                      ? () => {
                          props.setFixIsShown(item.student_num);
                        }
                      : () => {
                          //수정한 것 저장하는 함수
                          saveFixedData(item);
                        }
                  }
                />
                <Button
                  small="true"
                  name={fixIsShown !== item.student_num ? "삭제" : "취소"}
                  id={
                    fixIsShown !== item.student_num
                      ? `delete-btn${item.student_num}`
                      : `cancle-btn${item.student_num}`
                  }
                  style={{ width: "30%", fontSize: "1.1em" }}
                  onclick={
                    fixIsShown !== item.student_num
                      ? function () {
                          removeCheckSwal(item);
                        }
                      : function () {
                          props.setFixIsShown("0");
                        }
                  }
                />
              </div>
            </li>
          ))}
        </>
      )}
    </div>
  );
};

export default EventLists;
