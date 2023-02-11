import React, { useRef, useCallback, useState } from "react";

import classes from "./EventInput.module.css";
import Button from "../Layout/Button";
import Student from "../Student/Student";
import Modal from "../Layout/Modal";
import Swal from "sweetalert2";
import { scheduleJob } from "node-schedule";
import dayjs from "dayjs";

const EventInput = (props) => {
  const [student, setStudent] = useState("");
  const [showStudent, setShowStudent] = useState(false);
  const [reserveAlarm, setReserveAlarm] = useState(false);

  const noteRef = useRef(null);

  //사이즈조절
  const handleResizeHeight = useCallback(() => {
    if (noteRef === null || noteRef.current === null) {
      return;
    }

    noteRef.current.style.height = "10px";
    noteRef.current.style.height = noteRef.current.scrollHeight - 13 + "px";
  }, []);

  //자료 최대글자수 제한 함수
  const handleOnInput = (e, maxlength) => {
    if (e.target.value.length > maxlength) {
      e.target.value = e.target.value.substr(0, maxlength);
      Swal.fire({
        icon: "error",
        title: "입력 불가",
        text: `글자수를 초과했어요! 내용을 ${maxlength}자 이내로 줄여주세요.`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
    }
  };

  const closeModalHandler = (e) => {
    setShowStudent(false);
    setStudent(e.target.innerText);
  };

  // const selectStudentHandler = (e) => {
  //   setStudent(e.target.innerText);
  // };

  const changeYyyyMmDd = (eventDayOrigin) => {
    let _year = eventDayOrigin.split(" ")[1].slice(0, 4);
    let _month = eventDayOrigin.split(" ")[2].slice(0, -1).padStart(2, "0");
    let _day = eventDayOrigin.split(" ")[3].slice(0, -1).padStart(2, "0");

    return _year + "-" + _month + "-" + _day;
  };

  const getTime = (date) => {
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    return hours + ":" + minutes;
  };

  //저장버튼
  const saveEvent = () => {
    let eventDate = document.querySelector("h1").getAttribute("class");

    let eventDay = changeYyyyMmDd(eventDate);

    let new_data;
    let todo_eventName;
    let new_data_id = "";

    if (props.about === "consulting") {
      let selectDateTime = getTime(new Date());
      //년월일시간+번호 를 식별id로 사용 나중에 지울떄(상담)
      new_data_id = eventDay + selectDateTime + student.split(" ")[0];
    } else if (props.about === "attendance") {
      //년월일+번호 를 식별id로 사용 나중에 지울떄(출결)
      new_data_id = eventDay + student.split(" ")[0];

      //같은날 같은학생의 출결이 있을경우 취소하기
      const existedEvent = document
        .querySelector(".eventOnDayList")
        .querySelectorAll("li");

      const existedSameEvent = [];
      existedEvent.forEach((event) => {
        if (event.getAttribute("id") === new_data_id) {
          existedSameEvent.push(event);
        }
      });

      if (existedSameEvent.length !== 0) {
        Swal.fire({
          icon: "error",
          title: "저장 실패",
          text: "같은 날, 같은 학생의 출결정보가 있어요!",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
        return;
      }
    } else {
      //년월일+행사명{/* 달라진거 고려하기.. todo에서도 쓸 수 있게 */}
      todo_eventName = document.querySelector("#todo-eventName").value;
      new_data_id = eventDay + todo_eventName;

      //같은날 같은이름의 행사가 있을경우 취소하기
      const existedEvent = document
        .querySelector(".eventOnDayList")
        .querySelectorAll("li");

      const existedSameEvent = [];
      existedEvent.forEach((event) => {
        if (event.getAttribute("id") === new_data_id) {
          existedSameEvent.push(event);
        }
      });

      if (existedSameEvent.length !== 0) {
        Swal.fire({
          icon: "error",
          title: "저장 실패",
          text: "같은 이름의 행사가 같은 날 존재해요!",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
        return;
      }
    }

    //EventLists saveFixedData함수에서 필요한 것만 보냄
    if (props.about !== "todo") {
      new_data = {
        eventDate: eventDate,
        num: student.split(" ")[0],
        name: student.split(" ")[1],
        id: new_data_id,
      };
    } else {
      new_data = {
        eventDate: eventDate,
        eventName: todo_eventName,
        id: new_data_id,
      };
    }
    // if (props.about.slice(0, 4) === "todo") {
    //   showNotification(todo_eventName);
    // }
    props.saveNewData(new_data);
  };

  const showNotification = (name) => {
    if (!Notification) {
      return;
    }

    // 만약 이미 유저가 푸시 알림을 허용해놓지 않았다면,
    if (Notification.permission !== "granted") {
      // Chrome - 유저에게 푸시 알림을 허용하겠냐고 물어보고, 허용하지 않으면 return!
      try {
        Notification.requestPermission().then((permission) => {
          if (permission !== "granted") return;
        });
      } catch (error) {
        // Safari - 유저에게 푸시 알림을 허용하겠냐고 물어보고, 허용하지 않으면 return!
        if (error instanceof TypeError) {
          Notification.requestPermission().then((permission) => {
            if (permission !== "granted") return;
          });
        } else {
          console.error(error);
        }
      }
    }

    if (Notification && Notification.permission === "granted") {
      const newOption = {
        badge: "../../assets/notification/logo128.png",
        icon: "../../assets/notification/logo512.png",
        body: "일정이 내일 진행됩니다. 내용을 확인해주세요.",
      };

      let eventDay;
      if (props.about.slice(0, 4) === "todo") {
        let eventDate = document.querySelector("h1").getAttribute("class");
        // 하루 전으로 만들기
        eventDay = dayjs(changeYyyyMmDd(eventDate) + " 08:40")
          .subtract(+props.when, "day")
          .format("YYYY-MM-DD HH:mm");
        console.log(eventDay);
      }
      const date = new Date(eventDay);

      scheduleJob(date, () => {
        // notificationRef에 Notification을 넣어준다. 이 친구는 이렇게 할당만해도 바로 실행된다.
        const n = new Notification(name, newOption);
        n.onclick = (event) => {
          event.preventDefault(); // prevent the browser from focusing the Notification's tab
          window.open("bit.ly/첵스쿨", "_blank");
        };
      });
    }
  };

  return (
    <>
      <li
        className={classes["event-area"]}
        style={{
          backgroundColor: "bisque",
        }}
      >
        <div className={classes["attendInfo-area"]}>
          <div className={classes["attendInfo-student"]}>
            {props.about.slice(0, 4) !== "todo" ? (
              <Button
                className="choose-studentBtn"
                name={student || "학생선택"}
                onclick={function () {
                  if (
                    props.students === undefined ||
                    props.students?.length === 0
                  ) {
                    Swal.fire({
                      icon: "error",
                      title: "선택 불가",
                      text: "메뉴의 곰돌이를 눌러서 먼저 학생명단을 입력해주세요.",
                      confirmButtonText: "확인",
                      confirmButtonColor: "#85bd82",
                      timer: 5000,
                    });
                  } else {
                    setShowStudent(!showStudent);
                  }
                }}
              />
            ) : (
              <input
                type="text"
                placeholder="행사명"
                id={"todo-eventName"}
                className={classes["eventNameInput-area"]}
                autoFocus
                onInput={(e) => handleOnInput(e, 20)}
              />
            )}

            <div className={classes["button-area"]}>
              <Button
                className="small-student"
                name={<i className="fa-regular fa-floppy-disk"></i>}
                id={`save-btn${props.id}`}
                onclick={() => {
                  //추가한 이벤트 저장하는 함수, 필요한 데이터를 모아서 상위 props에 이벤트 정보 전달함.
                  saveEvent();
                }}
              />
              <Button
                className="small-student"
                name={<i className="fa-solid fa-xmark"></i>}
                id={`cancle-btn${props.id}`}
                onclick={function () {
                  props.closeHandler();
                }}
              />
            </div>

            {showStudent && (
              <Modal onClose={closeModalHandler}>
                <Student
                  students={props.students}
                  showOption={closeModalHandler}
                  isSubject={props.isSubject}
                />
              </Modal>
            )}
          </div>

          <form
            className={classes["optionChange-area"]}
            onSubmit={(e) => {
              e.preventDefault();
              saveEvent();
            }}
          >
            {/* 알람설정 버튼 */}
            {/* {props.about.slice(0, 4) === "todo" && (
              <span
                className={classes["todo-alarm-span"]}
                onClick={() => {
                  setReserveAlarm((prev) => !prev);
                }}
              >
                {reserveAlarm ? (
                  <i class="fa-solid fa-bell"></i>
                ) : (
                  <i class="fa-regular fa-bell"></i>
                )}
              </span>
            )} */}

            {/* 분류 고르는 셀렉트 태그 */}
            {props.selectOption && (
              <select
                name="attend-option"
                id={
                  student
                    ? `option-select${student.split(" ")[0]}`
                    : "option-select"
                }
                defaultValue={props.dafaultValue}
                required
              >
                <option value="">-- 분류 --</option>
                {props.selectOption.map((select_option) => (
                  <option value={select_option.value} key={select_option.id}>
                    {select_option.class}
                  </option>
                ))}
              </select>
            )}

            <textarea
              ref={noteRef}
              type="text"
              onKeyDown={() => handleResizeHeight(this)}
              onKeyUp={() => handleResizeHeight(this)}
              onClick={() => handleResizeHeight(this)}
              placeholder={props.placeholder}
              id={
                student ? `option-note${student.split(" ")[0]}` : "option-note"
              }
              className={classes["note-area"]}
              onInput={(e) => handleOnInput(e, 30)}
            />
          </form>
        </div>
      </li>
    </>
  );
};

export default EventInput;
