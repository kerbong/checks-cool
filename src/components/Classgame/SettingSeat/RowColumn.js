import React from "react";
import classes from "./SettingSeat.module.css";
import Input from "../../Layout/Input";
import Swal from "sweetalert2";

const RowColumn = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    let row = document.querySelector("#row-input").value;
    let column = document.querySelector("#column-input").value;
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
      <form onSubmit={submitHandler}>
        <div className={classes["input-div"]}>
          <span>
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

          <button value="설정저장" onClick={submitHandler}>
            설정저장{" "}
          </button>
        </div>
      </form>
    </>
  );
};

export default RowColumn;
