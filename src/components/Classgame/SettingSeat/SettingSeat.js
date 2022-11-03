import React, { useEffect, useState } from "react";
import classes from "./SettingSeat.module.css";
import RowColumn from "./RowColumn";
import SeatTable from "./SeatTable";
import ContentToWidth from "../ContentToWidth";

const SettingSeat = (props) => {
  const [showTable, setShowTable] = useState(false);
  const [rowColumn, setRowColumn] = useState("");
  const [randomSeat, setRandomSeat] = useState(false);
  const [students, setStudents] = useState();

  useEffect(() => {
    setStudents(props.students);
  }, [props.students]);

  const saveHandler = (e) => {
    e.preventDefault();
    let inputValue = document.querySelector("#title-input").value;
    if (inputValue.trim().length > 0) {
      console.log(inputValue);
    }
  };

  return (
    <>
      <div className={classes["contentChangeBtn-div"]}>
        {showTable && (
          <button
            onClick={() => {
              setRandomSeat(true);
            }}
          >
            <i className="fa-solid fa-shuffle"></i>
          </button>
        )}
        <ContentToWidth />
      </div>

      {!showTable ? (
        <RowColumn
          setRowColumn={(col, row) => {
            setShowTable(true);
            setRowColumn(`${row}-${col}`);
          }}
        />
      ) : (
        <>
          <div className={classes["title-div"]}>
            <form onSubmit={saveHandler}>
              <input id="title-input" type="text" placeholder="제목" />
            </form>
            <button onClick={saveHandler}>저장</button>
          </div>

          {randomSeat && <></>}

          <SeatTable rowColumn={rowColumn} students={students} />
        </>
      )}
    </>
  );
};

export default SettingSeat;
