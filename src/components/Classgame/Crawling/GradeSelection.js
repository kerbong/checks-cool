import React, { useState } from "react";

const GradeSelection = (props) => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [className, setClassName] = useState("");

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
    setClassName("");
  };

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const confirmClassName = () => {
    props.confirmClassHandler(selectedGrade + className + "반");
  };

  return (
    <div>
      {/* 학년 학급 미선택 시 */}
      {props.show ? (
        <div>
          <label htmlFor="grade">학년</label>
          <select id="grade" value={selectedGrade} onChange={handleGradeChange}>
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
              <br />
              <label htmlFor="className">학급명</label>
              <input
                type="text"
                id="className"
                value={className}
                onChange={handleClassNameChange}
              />
              <span>반</span>
              <button onClick={confirmClassName}>확인</button>
            </>
          )}
        </div>
      ) : (
        // 학년 학급 선택후
        <div>
          <span>{selectedGrade}</span>
          <span>{className}반</span>
          <button
            onClick={() => {
              setSelectedGrade("");
              setClassName("");
              props.confirmClassHandler("");
            }}
          >
            다시선택
          </button>
        </div>
      )}
    </div>
  );
};

export default GradeSelection;
