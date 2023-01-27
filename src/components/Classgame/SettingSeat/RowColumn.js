import React, { useState, useEffect } from "react";
import classes from "./SettingSeat.module.css";
import Input from "../../Layout/Input";
import Swal from "sweetalert2";
import Button from "../../Layout/Button";

const RowColumn = (props) => {
  const [showRowColumn, setShowRowColumn] = useState(false);
  const [nowClassName, setNowClassName] = useState("");

  useEffect(() => {
    // 전담일 경우
    if (Object.keys(props.students?.[0])?.length === 1) {
      setShowRowColumn(false);
    } else {
      setShowRowColumn(true);
      setNowClassName("");
    }
  }, [props.students]);

  const submitHandler = (e) => {
    e.preventDefault();
    let row = document.querySelector("#row-input").value;
    let column = document.querySelector("#column-input").value;
    let students_num =
      nowClassName === ""
        ? props.students?.length
        : props.students?.filter(
            (cl) => Object.keys(cl)[0] === nowClassName
          )?.[0]?.[nowClassName]?.length;

    //전체 학생수보다 자리가 적을경우 취소
    if (+row * +column < students_num) {
      Swal.fire({
        icon: "error",
        title: "자리부족",
        text: `학생수(${students_num}명) 보다 자리수(${
          +row * +column
        }자리) 가 적어요!`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return false;
    }

    if (row.trim().length !== 0 && column.trim().length !== 0) {
      setShowRowColumn(false);
      props.setRowColumn(row, column, nowClassName);
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

  const selectClassHandler = (e) => {
    let clName = e.target.value;
    setNowClassName(clName);
    if (clName !== "") {
      setShowRowColumn(true);
    }
  };

  return (
    <>
      {/* x마크 버튼. 뒤로가기 */}
      <button
        className={classes["seatsAdd-btn"]}
        onClick={() => {
          props.addNewCancel();
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      {/* 전담일 경우 학급 선택 */}
      {!showRowColumn && (
        <div>
          <select
            onChange={selectClassHandler}
            className={classes["class-select"]}
            value={nowClassName}
          >
            <option value="">--학급--</option>
            {Object.keys(props.students?.[0])?.length === 1 &&
              props.students?.map((cl) => (
                <option key={Object.keys(cl)[0]} value={Object.keys(cl)[0]}>
                  {Object.keys(cl)[0]}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* 가로칸과 세로줄 세팅하기 */}
      {showRowColumn && (
        <form onSubmit={submitHandler}>
          <div className={classes["input-div"]}>
            <span style={{ marginTop: "-60px" }}>
              <span className={classes["input-span"]}>가로</span>
              <Input
                input={{
                  id: "row-input",
                  type: "number",
                  min: "1",
                  step: "1",
                  max: "30",
                }}
                className={"rowcolumn-input"}
                required={true}
              />
              <span className={classes["input-span"]}>(칸)</span>
            </span>

            <span className={classes["input-span"]}> X </span>
            <span>
              <span className={classes["input-span"]}>세로</span>
              <Input
                input={{
                  id: "column-input",
                  type: "number",
                  min: "1",
                  step: "1",
                  max: "30",
                }}
                className={"rowcolumn-input"}
                required={true}
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
      )}
    </>
  );
};

export default RowColumn;
