import React, { useState } from "react";

import Swal from "sweetalert2";

import classes from "./HwpControl.module.css";

const GradeSelection = (props) => {
  const [selectedGrade, setSelectedGrade] = useState(props.selectedGrade || "");
  const [className, setClassName] = useState(props.className || "");

  const handleGradeChange = (event) => {
    let value = event.target.value;
    if (value?.includes("*")) {
      Swal.fire("입력 불가", "학급명에 *를 넣을 수 없습니다.", "warning");
    } else {
      setSelectedGrade(value);
      setClassName("");
    }
  };

  const handleClassNameChange = (event) => {
    let value = event.target.value;
    if (value?.includes("*")) {
      Swal.fire("입력 불가", "학급명에 *를 넣을 수 없습니다.", "warning");
    } else {
      setClassName(value);
    }
  };

  const confirmClassName = () => {
    props.confirmClassHandler(selectedGrade + className + "반");
  };

  return (
    <>
      {/* 학년 학급 미선택 시 */}
      {props.show ? (
        <div className={classes["card"]}>
          <div className={classes["flex-row-center"]}>
            <div style={{ marginRight: "30px" }}>
              <label htmlFor="grade" className={classes["fs14"]}>
                학년
              </label>
              <select
                id="grade"
                value={selectedGrade}
                onChange={handleGradeChange}
                className={classes["grade-select"]}
              >
                <option value="">-- 선택 --</option>
                <option value="1학년">1학년</option>
                <option value="2학년">2학년</option>
                <option value="3학년">3학년</option>
                <option value="4학년">4학년</option>
                <option value="5학년">5학년</option>
                <option value="6학년">6학년</option>
              </select>
            </div>

            <div>
              <label htmlFor="className" className={classes["fs14"]}>
                학급명
              </label>
              <input
                type="text"
                id="className"
                value={className}
                onChange={handleClassNameChange}
                className={classes["input"]}
                style={{ margin: "0 10px 0  20px" }}
              />
              <span className={classes["fs12"]}>반</span>
            </div>
          </div>

          {selectedGrade && className?.length !== 0 && (
            <button
              onClick={confirmClassName}
              className={classes["btn"]}
              style={{ width: "300px" }}
            >
              확인
            </button>
          )}
        </div>
      ) : (
        // 학년 학급 선택후 학년 반 보여주기
        <div className={classes["card"]}>
          <div>
            <span>
              <span className={classes["fs14"]}> {selectedGrade}</span>
              <span className={`${classes["m-l20"]} ${classes["fs14"]}`}>
                {className}반
              </span>
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedGrade("");
              setClassName("");
              props.confirmClassHandler("");
            }}
            className={classes["btn"]}
            style={{ width: "300px" }}
          >
            학년반 변경
          </button>
        </div>
      )}
    </>
  );
};

export default GradeSelection;
