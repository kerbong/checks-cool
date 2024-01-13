import React, { useRef, useCallback, useState, useEffect } from "react";

import classes from "./EventInput.module.css";
import Button from "../Layout/Button";
import Student from "../Student/Student";
import Modal from "../Layout/Modal";
import Swal from "sweetalert2";
import AttendCalendar from "components/Attendance/AttendCalendar";
// import { scheduleJob } from "node-schedule";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

const EventInput = (props) => {
  const [student, setStudent] = useState("");
  const [showStudent, setShowStudent] = useState(false);
  const [reserveAlarm, setReserveAlarm] = useState(false);
  const [requestSubmit, setRequestSubmit] = useState(false);
  const [reportSubmit, setReportSubmit] = useState(false);
  const [optionsSet, setOptionsSet] = useState([]);
  const [todoDate, setTodoDate] = useState(new Date());
  const [showCal, setShowCal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));
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
      new_data_id =
        eventDay + student.split(" ")[0] + " " + getTime(new Date());

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
          html: "같은 날, 같은 학생의 출결자료가 있어요! <br/> ** 같은 학생의 출결자료를 추가하시려면 <br/> 1분 후에 다시 시도해주세요!",
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

    //todo 이고 기간설정이 가능한 경우에 시작날짜와 끝날짜가 다를 경우 해당 주중날짜를 모두 선택해서 props로 저장데이터 보내고 함수 끝냄

    if (Array.isArray(todoDate)) {
      function formatKoreanDate(dateString) {
        const date = dayjs(dateString, "YYYY-MM-DD");
        const formattedDate = date.format("YYYY년 M월 D일 dddd");
        return `Choose ${formattedDate}`;
      }

      let start;
      let end;
      [start, end] = todoDate;

      const startDate = dayjs(start);
      const endDate = dayjs(end);

      // Array to store all the valid dates (excluding weekends)
      const validDates = [];

      // Loop through the dates and add valid dates to the array
      let currentDate = startDate;
      while (
        currentDate.isBefore(endDate) ||
        currentDate.isSame(endDate, "day")
      ) {
        if (currentDate.day() !== 0 && currentDate.day() !== 6) {
          validDates.push(currentDate.format("YYYY-MM-DD"));
        }
        currentDate = currentDate.add(1, "day");
      }

      let new_datas = [];
      validDates.forEach((dates) => {
        new_data = {
          id: dates + todo_eventName,
          eventName: todo_eventName,
          option: document.getElementById("option-select").value,
          note: document.getElementById("option-note").value,
        };
        new_datas.push(new_data);
      });
      props.rangeTodoData(new_datas);
    } else {
      //EventLists saveFixedData함수에서 필요한 것만 보냄
      if (props.about !== "todo") {
        new_data = {
          eventDate: eventDate,
          num: student.split(" ")[0],
          name: student.split(" ")[1],
          id: new_data_id,
        };
        //같은 경우(todo에서 기존자료)
      } else {
        new_data = {
          eventDate: eventDate,
          eventName: todo_eventName,
          id: new_data_id,
        };
      }

      //출결에는 서류 제출부분 추가해서 보냄.
      if (props.about === "attendance") {
        new_data["request"] = requestSubmit;
        new_data["report"] = reportSubmit;
      }
      // if (props.about.slice(0, 4) === "todo") {
      //   showNotification(todo_eventName);
      // }
      props.saveNewData(new_data);
    }
  };

  //학생을 선택하면, 그 학생이 지금까지 썼던 출결관련 내용 간략하게 보여줌.
  useEffect(() => {
    if (props.about !== "attendance") return;
    if (!props.events || props.events?.length === 0 || student?.length === 0)
      return;

    // 출결에서만 나오는..거..!! 현재학생 정보만 거르고
    let now_studentEvents = props.events?.filter(
      (evt) => evt.name === student.split(" ")[1]
    );
    let new_optionsSet = [];
    now_studentEvents?.forEach((evt) => {
      new_optionsSet.push(evt.option);
    });
    setOptionsSet(new_optionsSet);
  }, [student]);

  const getDateHandler = (date) => {
    setTodoDate(date);
  };

  //달력에서 받은 month로 currentMonth변경하기
  const getMonthHandler = (month) => {
    setCurrentMonth(dayjs(month).format("YYYY-MM"));
  };

  //기간설정을 on off 하면 화면의 기존 height값에 달력만큼 더하고 뺌.
  useEffect(() => {
    //true가 되면, 즉, 켜지면 모달창에 최대 크기 더하기
    let modal = document.querySelector(".modal");
    if (showCal) {
      let origin = modal.clientHeight;
      let new_height = origin + 350 + "px";
      modal.style.height = new_height;

      //false 기간설정 off가 되면, 원래 크기로!
    } else {
      modal.style.height =
        document.querySelector(".eventOnDayList").clientHeight + 45 + "px";
    }
  }, [showCal]);

  return (
    <>
      <li
        className={classes["event-area"]}
        style={{
          backgroundColor: "#ffe9ed",
        }}
      >
        <div className={classes["attendInfo-area"]}>
          <div className={classes["attendInfo-student"]}>
            {props.about.slice(0, 4) !== "todo" ? (
              <>
                {/* 학생서류 제출했는지 체크하는 버튼 */}
                <Button
                  className={
                    requestSubmit ? "paperSub-btn-clicked" : "paperSub-btn"
                  }
                  onclick={(e) => {
                    e.preventDefault();
                    setRequestSubmit((prev) => !prev);
                  }}
                  title="신청서"
                  name={"신청서"}
                />
                <Button
                  className={
                    reportSubmit ? "paperSub-btn-clicked" : "paperSub-btn"
                  }
                  onclick={(e) => {
                    e.preventDefault();
                    setReportSubmit((prev) => !prev);
                  }}
                  title="보고서"
                  name={"보고서"}
                />
                {/* 학생 선택버튼 부분 */}
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
              </>
            ) : (
              <>
                <Button
                  className={showCal ? "paperSub-btn-clicked" : "paperSub-btn"}
                  onclick={() => setShowCal((prev) => !prev)}
                  name={"반복"}
                />

                <input
                  type="text"
                  placeholder="행사명"
                  id={"todo-eventName"}
                  className={classes["eventNameInput-area"]}
                  autoFocus
                  onInput={(e) => handleOnInput(e, 20)}
                />
              </>
            )}

            <div className={classes["button-area"]}>
              <Button
                className="small-student"
                name={
                  <span>
                    <i className="fa-regular fa-floppy-disk"></i>
                  </span>
                }
                id={`save-btn${props.id}`}
                onclick={() => {
                  //추가한 이벤트 저장하는 함수, 필요한 데이터를 모아서 상위 props에 이벤트 정보 전달함.
                  saveEvent();
                }}
              />
              <Button
                className="small-student"
                name={
                  <span>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                }
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
                {props.selectOption?.map((select_option) => (
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
              onInput={(e) => {
                props.about.slice(0, 4) === "todo"
                  ? handleOnInput(e, 60)
                  : handleOnInput(e, 40);
              }}
            />
          </form>
          {props.about === "attendance" && optionsSet?.length > 0 && (
            <>
              <span className={classes["optionsSet"]}>
                <span className={classes["optionsSet"]}>
                  * 저장된 출결정보:
                </span>
                {[...new Set(optionsSet)]?.map((option) => (
                  <span
                    key={`optionSet-${option}`}
                    className={classes["optionsSet"]}
                  >
                    🙂
                    {option?.slice(1)}{" "}
                    {optionsSet?.filter((op) => op === option).length}일
                  </span>
                ))}
              </span>
            </>
          )}

          {/* 메모- 일정 달력화면인 경우 */}
          {props.about?.slice(0, 4) === "todo" && (
            <>
              {/* 사용기한 날짜 선택 달력부분 */}

              <div
                className={classes["attendInfo-student"]}
                style={{ textAlign: "center" }}
              >
                {showCal && (
                  <AttendCalendar
                    filterNone={true}
                    setStart={new Date(changeYyyyMmDd(props.today))}
                    getDateValue={getDateHandler}
                    about={"todo"}
                    getMonthValue={getMonthHandler}
                  />
                )}
              </div>
            </>
          )}

          {props.about === "attendance" && optionsSet?.length === 0 && (
            <span className={classes["optionsSet"]}>
              * 저장된 출결 자료가 없어요!
            </span>
          )}
        </div>
      </li>
    </>
  );
};

export default EventInput;
