import React, { useState, useEffect } from "react";
import classes from "./SettingSeat.module.css";
import Swal from "sweetalert2";
import Button from "../../Layout/Button";

const SeatTable = (props) => {
  const [tableRow, setTableRow] = useState(props.rowColumn.split("-")[0]);
  const [tableColumn, setTableColumn] = useState(props.rowColumn.split("-")[1]);
  const [items, setItems] = useState();
  const [tempStudent, setTempStudent] = useState({});
  const [switchStudent, setSwitchStudent] = useState({});
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

    setEndNum(students[students.length - 1]?.num);
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
    if (Object.keys(tempStudent).length === 0 || tempStudent === undefined) {
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
    // e.preventDefault();
    let selectedStudent = {};
    let new_students = [...students];
    const getRandomNum = () => {
      //세팅한 숫자를 기준으로 랜덤값을 구해서 round 반올림
      return Math.round(
        Math.random() * (Number(endNum) - Number(startNum)) + Number(startNum)
      );
    };

    const removePickStudent = () => {
      let randNum = getRandomNum();
      new_students.forEach((stu, index) => {
        if (+stu.num === randNum) {
          selectedStudent = stu;
          new_students.splice(index, 1);
        }
      });
    };

    while (Object.keys(selectedStudent).length === 0) {
      removePickStudent();
    }

    selectedSwal(selectedStudent.num, selectedStudent.name);

    setStudents(new_students);
    setTempStudent({ ...selectedStudent });
  };

  //자리를 누르면 실행되는 함수
  const itemAddStudentHandler = (e) => {
    let existItems = document.querySelectorAll(".item");
    let notSelectedSeats = existItems.length;
    existItems.forEach((item) => {
      if (isNaN(+item.innerText)) {
        notSelectedSeats -= 1;
      }
    });

    setStudents((prev) => {
      let seatsOver = false;
      let new_students = [...prev];

      if (new_students.length > 0 || notSelectedSeats !== 0) {
        if (isNaN(+e.target.innerText)) {
          console.log("중복/방지");
          return [...prev];
        }
        //학생이름 넣어주기
        let existItems = document.querySelectorAll(".item");

        setTempStudent((temp) => {
          let student = { ...temp };
          existItems.forEach((item) => {
            //혹시 현재 뽑힌 학생이 다른 곳에 이름이 미리 들어가 있으면 번호로 다시 바꿈
            if (item.innerText === student.name) {
              item.innerText = item.getAttribute("id").slice(6);
            }
          });

          //임시 학생이 뽑혀있는 경우에만 해당 칸에 이름 넣기
          if (Object.keys(student).length !== 0) {
            e.target.innerText = student.name;
            e.target.style.backgroundColor = "#d4e8dcbd";
          }

          return { ...temp };
        });
        document.getElementById("randomPickBtn")?.focus();
      } else {
        let clickedName = e.target.innerText;
        let clickedItemId = e.target.getAttribute("id");

        // 선택된 학생이 없으면 선택하고
        setSwitchStudent((prev_stu) => {
          if (Object.keys(prev_stu).length === 0) {
            // e.target.classList.add("blinking");
            return { ...{ name: clickedName, id: clickedItemId } };

            //선택된 학생이 있으면 현재 학생과 스위치!
          } else {
            e.target.innerText = prev_stu.name;
            document.getElementById(prev_stu.id).innerText = clickedName;
            return { ...{} };
          }
        });
      }

      return [...prev];
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

  const selectedSwal = (num, name) => {
    Swal.fire({
      title: `${num}번 ${name}`,
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
  };

  //뽑기 버튼 누르면 실행되는 전체 흐름
  const randomPickHandler = (e) => {
    if (!selectSeatCheck()) {
      errorSwal(`뽑힌 "${tempStudent.name}" 학생의 자리를 선택해주세요!`);
      return false;
    }
    if (!randomIsPossible()) {
      setStartNum(students[0].num);
      setEndNum(students[0].num);
      errorSwal("범위의 모든 학생이 뽑혔어요! 범위를 새로 설정해주세요!");
      return false;
    }
    randomSeatHandler(e);
  };

  //알아서 뽑고 알아서 자리에 넣어주는 함수
  const pickAndSeatHandler = () => {
    const randomNum = (b) => {
      return Math.floor(Math.random() * Number(b));
    };

    //자리결정해서 이름 넣기 함수
    const seatHandler = (name) => {
      let existItems = document.querySelectorAll(".item");
      let leftSeats = [];
      //아직 학생 없는 숫자만 있는 자리들
      existItems.forEach((item) => {
        if (!isNaN(+item.innerText)) {
          leftSeats.push(item);
        }
      });
      //랜덤으로 하나 골라서 이름 넣기
      let randomSeat = leftSeats[randomNum(leftSeats.length)];
      randomSeat.innerText = name;
      randomSeat.style.backgroundColor = "#d4e8dcbd";
    };

    //뽑힌 모든 학생의 자리가 결정되었으면 새로 학생뽑고
    if (selectSeatCheck()) {
      //번호 범위에서 가능하지 않으면
      if (!randomIsPossible()) {
        setStartNum(students[0].num);
        setEndNum(students[0].num);
        errorSwal("범위의 모든 학생이 뽑혔어요! 범위를 새로 설정해주세요!");
        return false;
      }

      randomSeatHandler();
      setTempStudent((prev) => {
        seatHandler(prev.name);
        return { ...prev };
      });
    }
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
          <Button
            id="randomPickBtn"
            onclick={randomPickHandler}
            className={"settingSeat-btn"}
            name="뽑기"
          />
          <Button
            id="randomSeatBtn"
            onclick={pickAndSeatHandler}
            className={"settingSeat-btn"}
            name="알아서"
          />
        </div>
      )}

      <div className={classes["blackboard-area"]}>
        <span className={classes["blackboard"]}>칠 판</span>
      </div>
      <div className={classes[`items-container`]}>{items}</div>

      <p className={classes[`gameMenu`]}>
        * 뽑기버튼 👉 자리선택! / 알아서 버튼은 뽑기와 자리선택을 랜덤으로
        실행합니다!
      </p>
      <p className={classes[`gameMenu`]}>
        * 모든 학생이 뽑힌 후에 학생을 차례로 선택하면, 선택한 두 학생의 자리를
        바꿀 수 있습니다.
      </p>
    </>
  );
};

export default SeatTable;
