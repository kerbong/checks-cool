import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import classes from "./CheckLists.module.css";
import AttendCalendar from "../Attendance/AttendCalendar";
import dayjs from "dayjs";

const BudgetListInput = (props) => {
  const [attendDate, setAttendDate] = useState(new Date());

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
      title: "새예산 저장",
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
        Swal.fire({
          icon: "success",
          title: "자료가 저장되었어요.",
          text: "5초 후에 창이 사라집니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
        props.saveBudgetHandler(new_budget);
        //취소누르면 그냥 반환
      } else {
        return;
      }
    });
  };

  return (
    <>
      <button className={classes["budget-save"]} onClick={saveBudgetHandler}>
        <i className="fa-regular fa-floppy-disk"></i>
      </button>
      <h1>새로운 예산 등록</h1>
      <li className={classes["budgetList-li"]}>
        <div className={classes["budgetList-newdiv"]}>
          <span className={classes["budgetList-desc"]}>
            {/* 에산명 적는 부분 */}
            <input
              type="text"
              ref={nameRef}
              placeholder="예산명"
              className={classes["newBudget-title"]}
            />

            {/* 사용기한 날짜 선택 달력부분 */}
            <div className={classes["newBudget-date"]}>
              사용기한{" "}
              <AttendCalendar
                getDateValue={getDateHandler}
                about={props.about}
                setStart={new Date(dayjs().format("YYYY") + "-12-01")}
              />
            </div>
          </span>

          <hr style={{ margin: "15px", width: "90vw" }} />

          <div className={classes["budgetList-desc"]}>
            {/* 비고 */}
            <input
              ref={noteRef}
              type="text"
              placeholder="예산목록, 기억할 점 등"
              className={classes["newBudget-note"]}
            />
            {/* 총액 */}{" "}
            <input
              ref={amountRef}
              type="number"
              style={{ width: "30%" }}
              placeholder="총 예산"
              className={classes["newBudget-amount"]}
            />
            원
          </div>
        </div>
      </li>
    </>
  );
};

export default BudgetListInput;
