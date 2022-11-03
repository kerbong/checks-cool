import React from "react";
import classes from "./SettingSeat.module.css";
import Input from "../../Layout/Input";

const RowColumn = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    let row = document.querySelector("#row-input").value;
    let column = document.querySelector("#column-input").value;
    props.setRowColumn(row, column);
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
