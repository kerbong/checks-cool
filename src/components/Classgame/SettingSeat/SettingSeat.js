import React, { useEffect, useState } from "react";
import classes from "./SettingSeat.module.css";
import RowColumn from "./RowColumn";
import SeatTable from "./SeatTable";
import SeatLists from "./SeatLists";
import Button from "../../Layout/Button";

const SettingSeat = (props) => {
  const [init, setInit] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [addNew, setAddNew] = useState();
  const [rowColumn, setRowColumn] = useState("");
  const [randomSeat, setRandomSeat] = useState(false);
  const [students, setStudents] = useState();

  useEffect(() => {
    setStudents(props.students);
  }, [props.students]);

  return (
    <>
      {init && (
        <>
          <div className={classes["input-div"]}>
            <Button
              name={"추가하기"}
              className={"settingSeat"}
              onclick={() => {
                setAddNew(true);
                setShowTable(false);
                setInit(false);
              }}
            />
            <Button
              name={"기존자료"}
              className={"settingSeat"}
              onclick={() => {
                setAddNew(false);
                setShowTable(true);
                setInit(false);
              }}
            />
          </div>
        </>
      )}

      {!addNew && showTable && (
        // 저장된 자료를 불러와서 리스트로 보여주기
        //firebase에서 자료 가져오고 그거 state에 저장해두고 그거 li태그에 감싸서 보여주기
        <SeatLists userUid={props.userUid} />
      )}

      {addNew && !showTable && (
        <RowColumn
          setRowColumn={(col, row) => {
            setShowTable(true);
            setRowColumn(`${row}-${col}`);
          }}
        />
      )}

      {addNew && showTable && (
        <>
          <div className={classes["title-div"]}></div>

          <SeatTable
            rowColumn={rowColumn}
            students={students}
            userUid={props.userUid}
          />
          <p className={classes[`gameMenu`]}>
            * 뽑기버튼 or 번호클릭 👉 자리선택
          </p>
          <p className={classes[`gameMenu`]}>
            * 알아서 버튼은 학생, 자리를 모두 랜덤으로 선택!
          </p>
          <p className={classes[`gameMenu`]}>
            * 모든 학생이 뽑힌 후에 학생을 차례로 선택하면, 선택한 두 학생의
            자리를 바꿀 수 있습니다.
          </p>
        </>
      )}
    </>
  );
};

export default SettingSeat;
