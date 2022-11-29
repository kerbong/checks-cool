import React from "react";
import classes from "./SettingSeat.module.css";
import Input from "../../Layout/Input";
import Swal from "sweetalert2";
import Button from "../../Layout/Button";

const RowColumn = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    let row = document.querySelector("#row-input").value;
    let column = document.querySelector("#column-input").value;

    //전체 학생수보다 자리가 적을경우 취소
    if (+row * +column < props.studentsNum) {
      Swal.fire({
        icon: "error",
        title: "자리부족",
        text: `학생수(${props.studentsNum}명) 보다 자리수(${
          +row * +column
        }자리) 가 적어요!`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return false;
    }

    if (row.trim().length !== 0 && column.trim().length !== 0) {
      props.setRowColumn(row, column);
    } else {
      Swal.fire({
        icon: "error",
        title: "확인필요",
        text: "가로(칸)과 세로(줄)을 모두 입력해주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
    }
  };

  return (
    <>
      <button
        className={classes["seatsAdd-btn"]}
        onClick={() => {
          props.addNewCancel();
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <form onSubmit={submitHandler}>
        <div className={classes["input-div"]}>
          <span style={{ marginTop: "-60px" }}>
            <span className={classes["input-span"]}>가로</span>
            <Input
              input={{ id: "row-input" }}
              className={"rowcolumn-input"}
              type="number"
              min="1"
              step="1"
              max="8"
              required
            />
            <span className={classes["input-span"]}>(칸)</span>
          </span>

          <span className={classes["input-span"]}> X </span>
          <span>
            <span className={classes["input-span"]}>세로</span>
            <Input
              input={{ id: "column-input" }}
              className={"rowcolumn-input"}
              type="number"
              min="1"
              step="1"
              max="8"
              required
            />
            <span className={classes["input-span"]}>(줄)</span>
          </span>

          <Button
            name="설정저장"
            onclick={submitHandler}
            className={"settingSeat"}
          />
        </div>
      </form>
    </>
  );
};

export default RowColumn;
