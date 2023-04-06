import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import classes from "./Memo.module.css";
import AttendCalendar from "../Attendance/AttendCalendar";
import dayjs from "dayjs";
import holidays2023 from "holidays2023";

const BudgetListInput = (props) => {
  const [attendDate, setAttendDate] = useState(
    new Date(props.date || dayjs().format("YYYY") + "-12-01")
  );
  const [nameValue, setNameValue] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [showCal, setShowCal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));

  const getDateHandler = (date) => {
    setAttendDate(date);
  };

  const nameRef = useRef();
  const noteRef = useRef();
  const amountRef = useRef();

  const getYyyymmdd = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  };

  const numberComma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const saveBudgetHandler = (e) => {
    e.preventDefault();
    let nameValue = nameRef.current.value;
    let noteValue = noteRef.current.value;
    let amountValue = amountRef.current.value;

    //입력되지 않은 값 확인
    if (nameValue.trim() === "" || amountValue.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "저장실패",
        text: "[ 예산명 / 총 예산 ] 중 입력되지 않은 값을 확인해주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
      });
      return;
    }

    const new_budget = {
      budget_name: nameValue,
      totalAmount: +amountValue,
      until: getYyyymmdd(attendDate),
      note: noteValue,
      useLists: [],
    };

    Swal.fire({
      icon: "question",
      title: `${props.edit ? "예산 수정" : "새예산 등록"}`,
      text: `[  ${new_budget.budget_name} / ${
        new_budget.until
      }까지 사용 /  ${numberComma(
        new_budget.totalAmount
      )}원 ] 의 예산을 저장할까요?`,
      showDenyButton: true,
      confirmButtonText: "저장",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      //저장버튼 누르면
      if (result.isConfirmed) {
        // Swal.fire({
        //   icon: "success",
        //   title: "자료가 저장되었어요.",
        //   text: "5초 후에 창이 사라집니다.",
        //   confirmButtonText: "확인",
        //   confirmButtonColor: "#85bd82",
        //   timer: 5000,
        // });
        props.saveBudgetHandler(new_budget);
        //취소누르면 그냥 반환
      } else {
        return;
      }
    });
  };

  //변경되는 값 설정하는 함수
  const valueHandler = (e, what) => {
    let value = e.target.value;
    if (what === "amount") {
      setAmountValue(value);
    } else if (what === "name") {
      setNameValue(value);
    } else if (what === "note") {
      setNoteValue(value);
    }
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
    <>
      <button className={classes["budget-save"]} onClick={saveBudgetHandler}>
        <i className="fa-regular fa-floppy-disk"></i>
      </button>
      <br />

      <div style={{ width: "100%" }}>
        <h1 style={{ fontSize: "1.8rem" }}>
          {props.edit ? `${props.title} 수정` : "새로운 예산 등록"}
        </h1>
        <div className={classes["flex-center"]}>
          <li
            className={classes["budgetList-li"]}
            style={{ maxWidth: "800px", width: "95%" }}
          >
            <div className={classes["budgetList-newdiv"]}>
              <span className={classes["budgetList-desc"]}>
                {/* 에산명 적는 부분 */}
                <input
                  type="text"
                  ref={nameRef}
                  placeholder="예산명"
                  className={classes["newBudget-title"]}
                  onChange={(e) => valueHandler(e, "name")}
                  defaultValue={props.title || nameValue}
                />

                {/* 사용기한 날짜 선택 달력부분 */}
                <div
                  className={classes["newBudget-date"]}
                  onClick={() => setShowCal((prev) => !prev)}
                >
                  사용기한{" "}
                  <AttendCalendar
                    filterNone={true}
                    getDateValue={getDateHandler}
                    about={props.about}
                    setStart={
                      new Date(props.date || dayjs().format("YYYY") + "-12-01")
                    }
                    getMonthValue={getMonthHandler}
                  />
                </div>
              </span>

              <hr style={{ margin: "15px", width: "95%" }} />

              <div className={classes["budgetList-desc"]}>
                {/* 비고 */}
                <input
                  ref={noteRef}
                  type="text"
                  placeholder="예산목록, 기억할 점 등"
                  className={classes["newBudget-note"]}
                  onChange={(e) => valueHandler(e, "note")}
                  defaultValue={props.note || noteValue}
                />
                {/* 총액 */}{" "}
                <input
                  ref={amountRef}
                  type="number"
                  style={{ width: "30%" }}
                  placeholder="총 예산"
                  className={classes["newBudget-amount"]}
                  onChange={(e) => valueHandler(e, "amount")}
                  defaultValue={props.amount || amountValue}
                />
                원
              </div>
            </div>
          </li>
        </div>
      </div>
    </>
  );
};

export default BudgetListInput;
