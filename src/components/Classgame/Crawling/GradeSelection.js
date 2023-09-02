import React, { useState } from "react";

import Swal from "sweetalert2";

import classes from "./HwpControl.module.css";

const GradeSelection = (props) => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [className, setClassName] = useState("");

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
    <div>
      {/* 학년 학급 미선택 시 */}
      {props.show ? (
        <div className={classes["m20"]}>
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

          {selectedGrade && (
            <>
              <div className={classes["m20"]}>
                <br />
                <label htmlFor="className" className={classes["fs14"]}>
                  학급명
                </label>
                <input
                  type="text"
                  id="className"
                  value={className}
                  onChange={handleClassNameChange}
                  className={classes["input"]}
                  style={{ marginLeft: "20px" }}
                />
                <span className={classes["fs12"]}>반</span>
              </div>
              <br />
              <button
                onClick={confirmClassName}
                className={classes["btn"]}
                style={{ width: "300px" }}
              >
                확인
              </button>
            </>
          )}
        </div>
      ) : (
        // 학년 학급 선택후
        <div>
          <span className={classes["fs14"]}>
            <span>{selectedGrade}</span>
            <span className={classes["m-l20"]}>{className}반</span>
          </span>
          <br />
          <button
            onClick={() => {
              setSelectedGrade("");
              setClassName("");
              props.confirmClassHandler("");
            }}
            className={classes["mini-btn"]}
          >
            학년반 변경
          </button>
        </div>
      )}
    </div>
  );
};

export default GradeSelection;
