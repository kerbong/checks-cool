import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import classes from "./Memo.module.css";
import AttendCalendar from "../Attendance/AttendCalendar";
import dayjs from "dayjs";
import holidays2023 from "holidays2023";
import { FaRegFloppyDisk, FaXmark } from "react-icons/fa6";

const BudgetInput = (props) => {
  const [attendDate, setAttendDate] = useState(new Date());
  const [budget, setBudget] = useState(props?.budget || {});
  const [showCal, setShowCal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));

  useEffect(() => {
    if (Object.keys(budget).length > 0) {
      titleRef.current.value = budget.title;
      noteRef.current.value = budget.note;
      eachRef.current.value = budget.each;
      countRef.current.value = budget.count;
      amountRef.current.value = budget.amount;
      siteRef.current.value = budget.site;
    }
  }, [budget]);

  const getDateHandler = (date) => {
    setAttendDate(date);
  };

  const getYyyymmdd = (date) => {
    return dayjs(date).format("YYYY-MM-DD HH:mm");
  };

  const titleRef = useRef();
  const siteRef = useRef();
  const noteRef = useRef();
  const eachRef = useRef();
  const countRef = useRef();
  const amountRef = useRef();

  const numberComma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const saveBudgetHandler = (e) => {
    e.preventDefault();
    let titleValue = titleRef.current.value;
    let noteValue = noteRef.current.value;
    let eachValue = eachRef.current.value;
    let countValue = countRef.current.value;
    let amountValue = amountRef.current.value;
    let siteValue = siteRef.current.value;

    //입력되지 않은 값 확인
    if (
      titleValue.trim() === "" ||
      eachValue.trim() === "" ||
      countValue.trim() === "" ||
      amountValue.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "저장실패",
        text: "[ 품목명 / 개당가격 / 개수 / 총금액 ] 중 입력되지 않은 값을 확인해주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
      });
      return;
    }

    const budgetItem = {
      date: getYyyymmdd(attendDate),
      site: siteValue,
      title: titleValue,
      each: +eachValue,
      count: +countValue,
      amount: +amountValue,
      note: noteValue,
    };

    //바로저장!
    props.saveBudgetHandler(budgetItem);

    Swal.fire({
      icon: "success",
      title: "저장 완료!",
      text: "3초 후에 창이 사라집니다.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 3000,
    }).then(() => {
      //입력창 모두 빈칸으로 만들어주기
      if (titleRef?.current) titleRef.current.value = "";
      if (noteRef?.current) noteRef.current.value = "";
      if (eachRef?.current) eachRef.current.value = "";
      if (countRef?.current) countRef.current.value = "1";
      if (amountRef?.current) amountRef.current.value = "";
      if (siteRef?.current) siteRef.current.value = "";
      //다시 품목명에 포커스 !
      if (titleRef?.current) titleRef.current.focus();
    });

    //묻고 저장!
    // Swal.fire({
    //   icon: "question",
    //   title: props.about !== "edit" ? "새품목 확인" : "수정내용 확인",
    //   text: `[  ${budgetItem.title} / ${budgetItem.site} / ${numberComma(
    //     budgetItem.each
    //   )}원 / ${numberComma(budgetItem.count)}개 / 총 ${numberComma(
    //     budgetItem.amount
    //   )}원 ] 의 품목을 저장할까요?`,
    //   showDenyButton: true,
    //   confirmButtonText: "저장",
    //   confirmButtonColor: "#db100cf2",
    //   denyButtonColor: "#85bd82",
    //   denyButtonText: `취소`,
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   //저장버튼 누르면
    //   if (result.isConfirmed) {
    //     // Swal.fire({
    //     //   icon: "success",
    //     //   title: "자료가 저장되었어요.",
    //     //   text: "5초 후에 창이 사라집니다.",
    //     //   confirmButtonText: "확인",
    //     //   confirmButtonColor: "#85bd82",
    //     //   timer: 5000,
    //     // });
    //     props.saveBudgetHandler(budgetItem);
    //     //취소누르면 그냥 반환
    //   } else {
    //     return;
    //   }
    // });
  };

  const totalAmountHandler = () => {
    //개당 가격이나 개 수정하면 총 금액 자동으로 계산되도록
    amountRef.current.value = +(eachRef.current.value * countRef.current.value);
  };

  //달력에서 받은 month로 currentMonth변경하기
  const getMonthHandler = (month) => {
    setCurrentMonth(dayjs(month).format("YYYY-MM"));
  };

  //휴일 달력에 그려주기!
  useEffect(() => {
    if (!currentMonth) return;
    holidays2023?.forEach((holiday) => {
      if (holiday[0] === currentMonth) {
        let holiday_queryName = holiday[1].split("*");
        let holidayTag = document.querySelectorAll(holiday_queryName[0])[0];
        if (!holidayTag) return;
        // console.log(holidayTag.classList.contains("eventAdded"));
        if (holidayTag.classList.contains("eventAdded")) return;

        const btn = document.createElement("button");
        btn.className = `${classes.holidayData} eventBtn`;
        btn.innerText = holiday_queryName[1];
        holidayTag?.appendChild(btn);
        holidayTag.style.borderRadius = "5px";

        holidayTag.classList.add("eventAdded");
      }
    });
  }, [currentMonth, showCal]);

  useEffect(() => {
    let weekDayNames = document.querySelector(".react-datepicker__day-names");
    let weekDayName = document.querySelectorAll(".react-datepicker__day-name");
    if (!weekDayNames || !weekDayName) return;
    weekDayNames.style.width = "95%";
    weekDayName[0].style.width = "14%";
    weekDayName[6].style.width = "14%";
  }, [showCal]);

  return (
    <div className={classes["flex-center"]}>
      {/* 자료 추가인 경우에만 저장버튼 보여주기 */}
      {props.about !== "edit" && props.about !== "copy" && (
        <button
          className={classes["budgetList-save"]}
          onClick={saveBudgetHandler}
        >
          <FaRegFloppyDisk />
        </button>
      )}
      <li
        className={classes["budgetList-li"]}
        style={{ maxWidth: "800px", width: "95%" }}
      >
        <span className={classes["flex-space-center-95"]}>
          {/* 날짜 선택 달력부분 */}
          <div
            className={classes["newBudget-date"]}
            onClick={() => setShowCal((prev) => !prev)}
          >
            <AttendCalendar
              filterNone={true}
              getDateValue={getDateHandler}
              about={props.about}
              setStart={
                (props.about === "edit" || props.about === "copy") &&
                new Date(budget.date)
              }
              getMonthValue={getMonthHandler}
              getYearValue={getMonthHandler}
            />
          </div>
          {/* 품목명 적는 부분 */}
          <input
            ref={titleRef}
            type="text"
            placeholder="품목명"
            className={classes["newBudget-title"]}
            autoFocus
          />
        </span>

        <hr style={{ margin: "15px" }} />
        <span className={classes["budgetList-title"]}>
          {/* 개당, 개수, 총금액 부분 */}
          <div className={classes["flex-space-center-95"]}>
            {/* 개당가격 */}
            <input
              ref={eachRef}
              type="number"
              placeholder="개당"
              className={classes["newBudget-each"]}
              onChange={totalAmountHandler}
            />
            원{/* 개당얼마 */}
            <input
              ref={countRef}
              type="number"
              placeholder="개수"
              defaultValue={1}
              min={1}
              max={1000}
              step={1}
              className={classes["newBudget-count"]}
              onChange={totalAmountHandler}
            />
            개{/* 총액 */}{" "}
            <input
              ref={amountRef}
              type="number"
              placeholder="총금액"
              className={classes["newBudget-amount"]}
            />
            원
          </div>
          {/* 사이트 + 예산출처 노트 부분 */}
          <div className={classes["flex-space-center-95"]}>
            {/* 사이트 */}
            <input
              ref={siteRef}
              type="text"
              placeholder="사이트"
              className={classes["newBudget-site"]}
            />
            {/* 비고 */}
            <input
              ref={noteRef}
              type="text"
              placeholder="예산출처, 기억할 점 등"
              className={classes["newBudget-note"]}
            />
          </div>

          {/* 자료 복사 수정인 경우 저장/취소버튼 보여주기 */}
          {(props.about === "edit" || props.about === "copy") && (
            <div className={classes["budgetEdit-btns"]}>
              * 저장버튼을 누르시면 자료가{" "}
              {props.about === "edit" ? "수정" : "복사"}됩니다.
              &nbsp;&nbsp;&nbsp;
              {/* 저장버튼 */}
              <button
                className={classes["budgetEdit-save"]}
                onClick={saveBudgetHandler}
              >
                <FaRegFloppyDisk />
              </button>
              {/* 취소버튼 */}
              <button
                className={classes["budgetEdit-cancle"]}
                onClick={() => props.cancleHandler()}
              >
                <FaXmark />
              </button>
            </div>
          )}
        </span>
      </li>
    </div>
  );
};

export default BudgetInput;
