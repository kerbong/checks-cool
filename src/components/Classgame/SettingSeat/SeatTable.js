import React, { useState, useEffect } from "react";
import classes from "./SettingSeat.module.css";
import Swal from "sweetalert2";
import Button from "../../Layout/Button";
import { dbService } from "../../../fbase";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

const getDateHandler = (date) => {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
};

// const imageUrls = ["", "", "", "", "", "", ""];

const SeatTable = (props) => {
  const [tableRow, setTableRow] = useState(props.rowColumn.split("-")[0]);
  const [tableColumn, setTableColumn] = useState(props.rowColumn.split("-")[1]);
  const [items, setItems] = useState();
  const [tempStudent, setTempStudent] = useState({});
  const [tempBeforeName, setTempBeforeName] = useState("");
  const [switchStudent, setSwitchStudent] = useState({});
  const [students, setStudents] = useState(props.students || []);
  const [startNum, setStartNum] = useState(1);
  const [endNum, setEndNum] = useState(startNum);
  const [isNewPair, setIsNewPair] = useState(false);
  const [seatLists, setSeatLists] = useState(null);
  const [pairStudents, setPairStudents] = useState([]);

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
          id={
            props.title?.length > 0
              ? `table-${props.title}-${item}`
              : `table-${item}`
          }
          onClick={(e) => itemAddStudentHandler(e)}
        >
          {" "}
          {props.seatStudents?.length > 0
            ? props.seatStudents[+item - 1]
            : item}{" "}
        </div>
      ))
    );
    document
      .getElementById(props.title || "newSeats")
      .style.setProperty("--columns", tableColumn);
    document
      .getElementById(props.title || "newSeats")
      .style.setProperty("--rows", tableRow);

    setEndNum(students[students.length - 1]?.num);
  }, []);

  useEffect(() => {
    let new_students = [...students];

    //doc_id없는, 새로운 자리 데이터 추가할 때만 중복되는거 살펴봄.
    if (!props.doc_id) {
      if (seatLists?.length > 0) {
        seatLists?.forEach((list) => {
          list.students.forEach((stu_name, list_index) => {
            //학생들 중에 먼저 현재 학생 찾고
            let nowStudent = new_students.filter(
              (student) => student.name === stu_name
            )[0];

            //만약 빈칸(숫자)으로 저장되었을 경우
            if (nowStudent === undefined) return;
            //현재 학생에 pair키가 없으면 키,값을 배열로 만들어두고
            if (!nowStudent?.hasOwnProperty("pair")) {
              nowStudent["pair"] = [];
            }
            //짝수면 다음학생 인덱스로 가져와서 짝에 추가하기
            if (list_index % 2 === 0) {
              //현재학생의 속성 pair, 했던 짝에 추가하기
              nowStudent["pair"].push(list.students[list_index + 1]);
            } else {
              //홀수면 이전학생 인덱스로 가져와서 짝에 추가하기
              nowStudent["pair"].push(list.students[list_index - 1]);
            }
            nowStudent["pair"] = [...new Set(nowStudent["pair"])];
            // console.log(nowStudent);
            //새로운 학생 목록에 추가하기
          });
          setPairStudents([...new_students]);
        });
      } else {
        setPairStudents([...new_students]);
      }
    }
  }, [seatLists]);

  const getSeatsFromDb = () => {
    let thisYear = String(new Date().getFullYear());
    let queryWhere = query(
      collection(dbService, "seats"),
      where("writtenId", "==", props.userUid)
    );

    onSnapshot(queryWhere, (snapShot) => {
      setSeatLists([]);
      snapShot.docs.map((doc) => {
        let itemObj = {
          ...doc.data(),
          doc_id: doc.id,
        };

        if (doc.data().saveDate.slice(0, 4) !== thisYear) {
          return false;
        }

        return setSeatLists((prev) => [...prev, itemObj]);
      });
    });
  };

  useEffect(() => {
    getSeatsFromDb();
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
  const randomSeatHandler = () => {
    let selectedStudent = {};
    let pair_students = [...pairStudents];
    let new_students = [...students];

    //세팅한 숫자를 기준으로 랜덤값을 구해서 round 반올림
    const getRandomNum = () => {
      const mathRandomNum = () => {
        return Math.round(
          Math.random() * (Number(endNum) - Number(startNum)) + Number(startNum)
        );
      };
      let randomOn = true;
      let randNum;
      //만약 애초에 없는 번호일 경우 다시 뽑기
      while (randomOn) {
        randNum = mathRandomNum();
        if (new_students.filter((stu) => +stu.num === randNum).length > 0) {
          randomOn = false;
        }
      }
      return randNum;
    };

    const removePickStudent = () => {
      // console.log(pairStudents);
      const getRandStudent = () => {
        let randNum = getRandomNum();
        // console.log(randNum);
        selectedStudent = pair_students.filter(
          (stu) => +stu.num === randNum
        )[0];
      };

      // console.log(selectedStudent);
      getRandStudent();
      // console.log(selectedStudent);

      //짝이 중복되는걸 방지하는 설정이고 이전에 뽑혔던 학생과 짝을 했던 경우
      while (isNewPair && selectedStudent?.pair?.includes(tempBeforeName)) {
        //다시뽑기..
        getRandStudent();
        //만약 남는 자리가 한자리라 무조건 중복되는 학생만 가능할 경우... 그냥 끝내기!
        if (new_students.length === 1) break;
      }

      setTempBeforeName(selectedStudent.name);

      //학생목록에서 뽑힌 학생 제거하기
      new_students.forEach((stu, index) => {
        if (stu.num === selectedStudent.num) {
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
  const itemAddStudentHandler = (event) => {
    let clickedSeat = event.target;
    // let existItems = document.querySelectorAll(".item");
    let existItems = clickedSeat.parentNode.childNodes;
    let notSelectedSeats = existItems.length;
    existItems.forEach((item) => {
      if (isNaN(+item.innerText)) {
        notSelectedSeats -= 1;
      }
    });

    setStudents((prev) => {
      let new_students = [...prev];

      // console.log(new_students);

      //기존자료를 수정하는 거거나 안뽑힌 학생이 없으면 자리 교체실행
      if (props.title?.length > 0 || new_students.length === 0) {
        console.log(clickedSeat.innerText);
        let clickedName = clickedSeat.innerText;
        let clickedItemId = clickedSeat.getAttribute("id");

        // 선택된 학생이 없으면 선택하고
        setSwitchStudent((prev_stu) => {
          if (Object.keys(prev_stu).length === 0) {
            //선택한 학생을 노란색으로 표시하기
            clickedSeat.style.backgroundColor = "#ebee3fbd";
            return { ...{ name: clickedName, id: clickedItemId } };
            //선택된 학생이 있으면 현재 학생과 스위치!
          } else {
            clickedSeat.innerText = prev_stu.name;
            document.getElementById(prev_stu.id).innerText = clickedName;
            document.getElementById(prev_stu.id).style.backgroundColor =
              "#d4e8dcbd";
            clickedSeat.style.backgroundColor = "#d4e8dcbd";
            return { ...{} };
          }
        });
        //아직 자리배치가 안된 학생이 남아있고 번호만 있는 자리가 있으면
      } else {
        if (isNaN(+clickedSeat.innerText)) {
          return [...prev];
        }
        //학생이름 넣어주기
        let existItems = document.querySelectorAll(".item");

        setTempStudent((temp) => {
          let student = { ...temp };
          existItems.forEach((item) => {
            //혹시 현재 뽑힌 학생이 다른 곳에 이름이 미리 들어가 있으면 번호로 다시 바꿈
            if (item.innerText === student.name) {
              item.style.backgroundColor = "#ffffff";
              item.innerText = item.getAttribute("id").slice(6);
            }
          });

          //임시 학생이 뽑혀있는 경우에만 해당 칸에 이름 넣기
          if (Object.keys(student).length !== 0) {
            clickedSeat.innerText = student.name;
            clickedSeat.style.backgroundColor = "#d4e8dcbd";
          }

          return { ...temp };
        });
        document.getElementById("randomPickBtn")?.focus();
      }

      // if (new_students.length > 0 || notSelectedSeats !== 0) {

      // } else {

      // }

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
    // Math.random() *
    let backdropUrl = process.env.PUBLIC_URL + "/미니언즈박수.gif";

    Swal.fire({
      title: `${num}번 ${name}`,
      width: 600,
      padding: "3em",
      color: "#312b76",
      background: `#fff url(/images/trees.png)`,
      backdrop: `
        #00087ba1
            url(${backdropUrl})
            left top
            no-repeat
          `,
      timer: 5000,
    });
  };

  //뽑기 버튼 누르면 실행되는 전체 흐름
  const randomPickHandler = () => {
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
    randomSeatHandler();
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

  const saveSeatsHandler = async () => {
    let items_students = [];
    document
      .getElementById(
        props.title?.length > 0 ? `items-${props.title}-div` : "items-div"
      )
      .childNodes.forEach((item) => items_students.push(item.innerText));
    // console.log(items_students);
    // console.log(props.rowColumn);
    const title = document.getElementById(
      !props.title ? "title-input" : `title-input${props.title}`
    );
    if (title.value.trim().length === 0) {
      Swal.fire({
        icon: "error",
        title: "저장실패",
        text: `제목을 입력해주세요.`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return;
    }

    const data = {
      students: items_students,
      title: title.value,
      rowColumn: props.rowColumn,
      writtenId: props.userUid,
      saveDate: getDateHandler(new Date()),
    };

    Swal.fire({
      icon: "success",
      title: "저장완료",
      text: `${title.value} 자리표가 저장되었어요.`,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });

    //기존자료면 업데이트
    if (props.doc_id) {
      const existRef = doc(dbService, "seats", props.doc_id);
      await updateDoc(existRef, data);

      //새로운 자료면 새롭게
    } else {
      const newRef = doc(collection(dbService, "seats"));
      await setDoc(newRef, data);
    }
  };

  //자리표 데이터 삭제 함수
  const delteSeatsHandler = () => {
    const deleteDocHandler = async () => {
      await deleteDoc(doc(dbService, "seats", props.doc_id));
    };

    Swal.fire({
      icon: "question",
      title: "삭제할까요?",
      text: `저장된 자리표 데이터를 삭제할까요?.`,
      showDenyButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "삭제완료",
          text: "자료가 삭제되었습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
        deleteDocHandler();
      }
    });
  };

  return (
    <div id={props.title || "newSeats"}>
      {students.length === 0 && (
        <div>
          <input
            className={classes["title-input"]}
            id={`title-input${props.title || ""}`}
            type="text"
            placeholder="제목"
            defaultValue={props.title || ""}
          />
          <Button
            name={"저장"}
            onclick={saveSeatsHandler}
            className={"settingSeat-btn"}
          />
          <Button
            name={"삭제"}
            onclick={() => delteSeatsHandler()}
            className={"settingSeat-btn"}
          />
        </div>
      )}

      {!props.doc_id && (
        <button
          className={classes["seatsAdd-btn"]}
          onClick={() => {
            props.addNewCancel();
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}

      <div className={classes["mt--20"]}>
        {students.length > 0 ? (
          <>
            남은학생 ({students.length})
            <div className={classes["remain-student-div"]}>
              {students.map((stu) => (
                <span
                  key={stu.name}
                  className={classes["remain-student"]}
                  onClick={() => {
                    let new_students = [...students];
                    setStudents([
                      ...new_students.filter(
                        (student) => student.num !== stu.num
                      ),
                    ]);
                    setTempStudent(stu);
                  }}
                >
                  {stu.num}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className={classes["remain-student-div"]}>
            {props.title ? "" : "자리뽑기가 끝났어요!"}
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

      {students.length > 0 && (
        <div className={classes["temp-name"]}>
          <div>
            <Button
              id="newPairBtn"
              onclick={() => {
                setIsNewPair((prev) => !prev);
              }}
              className={"settingSeat-btn"}
              name={isNewPair ? "to인생은랜덤" : "to새로운짝"}
            />
          </div>
          <div>
            <span>✋ </span>
            {tempStudent.name}
          </div>
        </div>
      )}

      <div className={classes["blackboard-area"]}>
        <span className={classes["blackboard"]}>칠 판</span>
      </div>
      <div
        className={classes[`items-container`]}
        id={props.title?.length > 0 ? `items-${props.title}-div` : "items-div"}
      >
        {items}
      </div>
    </div>
  );
};

export default SeatTable;
