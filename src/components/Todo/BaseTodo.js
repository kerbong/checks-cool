import AttendCalendar from "components/Attendance/AttendCalendar";
import Input from "components/Layout/Input";
import Button from "components/Layout/Button";
import React, { useState, useRef, useEffect } from "react";
import classes from "./BaseTodo.module.css";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const BaseTodo = (props) => {
  const [eventDates, setEventDates] = useState([]);
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");

  const selectRef = useRef();
  const selectOptionRef = useRef();

  const getDateHandler = (date) => {
    //날짜 모음에서 존재하는지 확인해서 같으면 제외함.
    let new_date = dayjs(date).format("YYYY-MM-DD");
    let new_eventDates = [...eventDates];
    let isExist = new_eventDates?.filter((event) => event === new_date);
    //새로운 날짜면... 추가하고
    if (isExist.length === 0) {
      new_eventDates.push(new_date);
      //기존 날짜면... 제외하고
    } else {
      new_eventDates = new_eventDates?.filter((ev) => ev !== new_date);
    }
    //날짜 순으로 정렬
    new_eventDates = new_eventDates.sort((a, b) => new Date(a) - new Date(b));
    setEventDates([...new_eventDates]);
  };

  //저장하는 함수
  const saveHandler = () => {
    //타이틀이 없으면 저장되지 않음
    if (!title) {
      Swal.fire("저장 불가", "행사명을 입력했는지 확인해주세요!", "error");
      return;
    }
    const perPub = selectRef.current.value;
    const option = selectOptionRef.current.value;

    //날짜를 기준으로 중복 돌리기..
    let new_datas = [];
    eventDates?.forEach((evt) => {
      const new_data = {
        eventName: title?.trim(),
        id: evt + title?.trim(),
        note: memo?.trim() || "",
        option: option,
        set: title?.trim(),
      };
      new_datas.push(new_data);
    });

    props.saveSetEventsHandler(new_datas, perPub);
  };

  useEffect(() => {
    if (props.showPublicEvent === false) {
      selectRef.current.value = "personal";
    } else if (props.showPublicEvent === true) {
      selectRef.current.value = "public";
    }
  }, [props.showPublicEvent]);

  return (
    <div>
      {/* 공용) 개인) 선택 탭, 행사명 인풋, x 마크(닫기)  */}
      <div className={classes["flex-margin-15"]}>
        {/* 공용/개인 선택탭 */}
        <select className={classes["select"]} ref={selectRef}>
          <option value="personal">개인</option>
          <option value="public">공용</option>
        </select>

        {/* 행사명 입력 인풋 */}
        <input
          type="text"
          placeholder="행사명"
          id={"title-input"}
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          className={classes["title-input"]}
        />
      </div>

      {/* 달력.. 여러 날짜 클릭 가능 + 클릭한 날짜와 총 날짜 수 보여주기 */}
      <div className={classes["calendar"]}>
        <AttendCalendar
          getDateValue={getDateHandler}
          setStart={new Date()}
          getMonthValue={() => {}}
          highlight={eventDates.map((evt) => new Date(evt))}
          inline={true}
          fixedHeight={true}
        />
        {/* flex속성으로.. span각자에 width px 넣어주고, flex wrap으로  */}
        <div className={classes["flex-margin-15-center"]}>
          총 {eventDates.length}회차
        </div>
        <div className={classes["flex-wrap"]}>
          {eventDates?.map((evt, index) => (
            <span key={evt} className={classes["margin-2-15"]}>
              {index + 1}회차 | {dayjs(evt).format("YY년 M월 D일(ddd)")}
            </span>
          ))}
        </div>

        {/* 분류와 메모 입력하는 부분 */}
        <div className={classes["flex-margin-15"]}>
          {/* 분류 선택탭 */}
          <select className={classes["select-80"]} ref={selectOptionRef}>
            {props.selectOption?.map((select_option, index) => (
              <option
                value={select_option.value}
                key={select_option.id}
                defaultChecked={index === 0 ? true : false}
              >
                {select_option.class}
              </option>
            ))}
          </select>
          {/* 메모 내용 탭 */}
          <input
            type="text"
            placeholder="(예시) 2교시-체육관"
            id={"memo-input"}
            value={memo || ""}
            onChange={(e) => setMemo(e.target.value)}
            className={classes["memo-input"]}
          />
        </div>
        <div className={classes["flex-margin-15"]}>
          <Button
            name="취소"
            onclick={() => props.closeHandler()}
            className={"events-save"}
          />
          <Button
            name="저장"
            onclick={() => saveHandler()}
            className={"events-save"}
          />
        </div>
        <p>
          * 메모에 해당교시-내용 으로 입력하시면 일정 날짜 시간표(메인화면)의
          해당교시에 행사명이 '과목'칸에 내용이 '메모'칸에 자동 입력됩니다.(해당
          날짜에 기존에 저장된 시간표 내용이 없는 경우)
        </p>
        <p>* 해당교시 명칭이 기초시간표의 교시명과 정확히 일치해야 합니다.</p>
      </div>
      <p>* 개발중입니다...</p>
    </div>
  );
};

export default BaseTodo;
