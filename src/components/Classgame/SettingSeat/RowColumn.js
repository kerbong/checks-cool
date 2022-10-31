import React from "react";
import classes from "./SettingSeat.module.css";
import Input from "../../Layout/Input";

const RowColumn = () => {
  const submitHandler = () => {};

  return (
    <>
      <form onClick={submitHandler}>
        <div className={classes["input-div"]}>
          <Input
            input={{ id: "row-input" }}
            className={"rowcolumn-input"}
            type="number"
            min="1"
            step="1"
            max="8"
          />
          <Input
            input={{ id: "column-input" }}
            className={"rowcolumn-input"}
            type="number"
            min="1"
            step="1"
            max="8"
          />
          <button value="설정저장">설정저장 </button>
        </div>
      </form>
    </>
  );
};

export default RowColumn;
