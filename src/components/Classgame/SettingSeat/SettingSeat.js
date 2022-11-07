import React, { useEffect, useState } from "react";
import classes from "./SettingSeat.module.css";
import RowColumn from "./RowColumn";
import SeatTable from "./SeatTable";
import ContentToWidth from "../ContentToWidth";
import Button from "../../Layout/Button";

const SettingSeat = (props) => {
  const [showTable, setShowTable] = useState(false);
  const [addNew, setAddNew] = useState(true);
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
      {/* <Button name={"추가하기"} />
      <Button name={"기존자료"} onclick={() => setShowTable(true)} /> */}

      {/* {!addNew &&
        !showTable ? (
        // 저장된 자료를 불러와서 리스트로 보여주기
      ) : (
        //저장된 자료를 보여주는 방법.
        //rowColumn저장하고 seatStudents만 저장해서 불러오면 될듯.
        <SeatTable
          rowColumn={"6-4"}
          students={[]}
          seatStudents={students.map((stu) => stu.name)}
        />
      )} */}

      {addNew && !showTable ? (
        <RowColumn
          setRowColumn={(col, row) => {
            setShowTable(true);
            setRowColumn(`${row}-${col}`);
          }}
        />
      ) : (
        <>
          <div className={classes["title-div"]}>
            {/* <form onSubmit={saveHandler}>
              <input id="title-input" type="text" placeholder="제목" />
            </form>
            <button onClick={saveHandler}>저장</button> */}
          </div>

          {randomSeat && <></>}

          <SeatTable
            rowColumn={rowColumn}
            students={students}
            userUid={props.userUid}
          />

          <p className={classes[`gameMenu`]}>
            * 저장 후 불러오는 기능을 개발 중입니다.(저장한 자료는 추후
            사용가능합니다.) 당분간은 스크린샷을 활용해주세요..!
          </p>
        </>
      )}
    </>
  );
};

export default SettingSeat;
