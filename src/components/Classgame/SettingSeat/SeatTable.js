import React, { useState, useEffect } from "react";
import classes from "./SettingSeat.module.css";
import Swal from "sweetalert2";

const SeatTable = (props) => {
  const [tableRow, setTableRow] = useState(props.rowColumn.split("-")[0]);
  const [tableColumn, setTableColumn] = useState(props.rowColumn.split("-")[1]);
  const [items, setItems] = useState();
  const [tempStudent, setTempStudent] = useState({});
  const [students, setStudents] = useState(props.students);
  const [startNum, setStartNum] = useState(1);
  const [endNum, setEndNum] = useState(startNum);

  useEffect(() => {
    //   가로의 칸 column 과 세로의 줄 row를 곱하고 그 개수만큼 item을 만들어서 칸을 만들어줌.
    let itemsNumArray = [...Array(+tableRow * +tableColumn)].map(
      (v, i) => i + 1
    );
    setItems(
      itemsNumArray.map((item) => (
        <div
          key={`table-${item}`}
          className={`${classes["item"]} item`}
          id={`table-${item}`}
          onClick={itemAddStudentHandler}
        >
          {" "}
          {item}{" "}
        </div>
      ))
    );
    document.documentElement.style.setProperty("--columns", tableColumn);
    document.documentElement.style.setProperty("--rows", tableRow);
  }, []);

  //뽑기함수 실행전, 가능한지 확인하는 함수
  const randomIsPossible = () => {
    let isPossible = true;
    let new_students = [...students];
    let studentsRangeArray = [...Array(+endNum)].map((v, i) => {
      if (i >= +startNum - 1) {
        i += 1;
      } else {
        return false;
      }
      return i;
    });

    let existNone = true;

    studentsRangeArray.forEach((num) => {
      let exist = new_students.filter((stu) => +stu.num === num);
      if (exist.length !== 0) {
        existNone = false;
      }
    });

    if (existNone) {
      isPossible = false;
    }

    return isPossible;
  };

  //뽑힌 학생 자리 배치 했는지 확인
  const selectSeatCheck = () => {
    if (Object.keys(tempStudent).length === 0) {
      return true;
    }
    let new_students = [...students];
    let existItems = document.querySelectorAll(".item");
    let selectedSeats = 0;
    existItems.forEach((item) => {
      if (isNaN(+item.innerText)) {
        selectedSeats += 1;
      }
    });

    if (selectedSeats + new_students.length === props.students.length) {
      return true;
    }
  };

  //뽑기 함수, 뽑힌 학생을 뽑아서 temp에 저장함
  const randomSeatHandler = (e) => {
    e.preventDefault();
    let selectedStudent = {};
    let new_students = [...students];
    const getRandomNum = () => {
      //세팅한 숫자를 기준으로 랜덤값을 구해서 round 반올림
      return Math.round(
        Math.random() * (Number(endNum) - Number(startNum)) + Number(startNum)
      );
    };

    const removePickStudent = () => {
      new_students.forEach((stu, index) => {
        if (stu.num === String(getRandomNum())) {
          selectedStudent = stu;
          new_students.splice(index, 1);
        }
      });
    };

    while (Object.keys(selectedStudent).length === 0) {
      removePickStudent();
    }

    Swal.fire({
      title: `${selectedStudent.name}`,
      width: 600,
      padding: "3em",
      color: "#312b76",
      background: "#fff url(/images/trees.png)",
      backdrop: `
      #00087ba1
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
      timer: 5000,
    });

    setStudents(new_students);
    setTempStudent({ ...selectedStudent });
  };

  //자리를 누르면 학생이름 넣어주기
  const itemAddStudentHandler = (e) => {
    if (isNaN(+e.target.innerText)) {
      return false;
    }

    let existItems = document.querySelectorAll(".item");

    setTempStudent((prev) => {
      let student = { ...prev };
      existItems.forEach((item) => {
        //혹시 현재 뽑힌 학생이 다른 곳에 이름이 미리 들어가 있으면 번호로 다시 바꿈
        if (item.innerText === student.name) {
          item.innerText = item.getAttribute("id").slice(6);
        }
      });

      e.target.innerText = student.name;
      return { ...prev };
    });
  };

  const errorSwal = (text) => {
    Swal.fire({
      icon: "error",
      title: "뽑기 실패",
      text: text,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });
  };

  return (
    <>
      <div>
        {students.length > 0 ? (
          <>
            남은학생 ({students.length})
            <div className={classes["remain-student-div"]}>
              {students.map((stu) => (
                <span key={stu.name} className={classes["remain-student"]}>
                  {stu.num}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className={classes["remain-student-div"]}>
            자리뽑기가 끝났어요!
          </div>
        )}
      </div>

      {students.length > 0 && (
        <div className={classes["remain-student-div"]}>
          <input
            id={"startNum-input"}
            className={classes["num-input"]}
            type="number"
            min={students.length > 0 && students[0].num}
            max={students.length > 0 && students[students.length - 1].num}
            value={startNum}
            onChange={(e) => {
              setStartNum(e.target.value);
              setEndNum(e.target.value);
            }}
          />
          <span>~</span>
          <input
            className={classes["num-input"]}
            id="endNum"
            type="number"
            min="1"
            value={endNum}
            onChange={(e) => {
              setEndNum(e.target.value);
            }}
            max={students.length > 0 && students[students.length - 1].num}
          />
          <button
            onClick={(e) => {
              if (!selectSeatCheck()) {
                errorSwal(
                  "새로운 학생을 뽑기 전에, 뽑힌 학생의 자리를 선택해주세요!"
                );
                return false;
              }
              if (!randomIsPossible()) {
                errorSwal("모든 학생이 뽑혔어요! 번호를 새로 설정해주세요!");
                return false;
              }
              randomSeatHandler(e);
            }}
          >
            뽑기
          </button>
        </div>
      )}

      <div className={classes["blackboard-area"]}>
        <span className={classes["blackboard"]}>칠 판</span>
      </div>
      <div className={classes[`items-container`]}>{items}</div>
    </>
  );
};

export default SeatTable;
