import React, { useState, useEffect } from "react";
import classes from "./RandomPick.module.css";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import StudentBtn from "components/Student/StudentBtn";
import RandomPickPlay from "./RandomPickPlay";

const RandomPick = (props) => {
  const [pickedStudents, setPickedStudents] = useState([]);
  const [nowStudents, setNowStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [nowClassName, setNowClassName] = useState("");
  const [isSubject, setIsSubject] = useState(false);
  const [stdPickDone, setStdPickDone] = useState(false);
  const [pickOptionDone, setPickOptionDone] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [stdNumValue, setStdNumValue] = useState(1);
  const [prizes, setPrizes] = useState([]);

  //학년도 설정함수
  const setYear = () => {
    return +dayjs().format("MM") <= 1
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  const nowStudentHandler = () => {
    let now_year = setYear();
    //현재학년도 자료만 입력가능하고,, 불러오기
    let now_students = props?.students?.filter(
      (yearStd) => Object.keys(yearStd)[0] === now_year
    )?.[0]?.[now_year];

    // 전담일 경우
    if (Object.keys(now_students?.[0])?.length === 1) {
      setIsSubject(true);
      setStudents(now_students);
    } else {
      setStudents(now_students);
      setNowStudents(now_students);
    }
  };

  useEffect(() => {
    nowStudentHandler();
  }, [props.students]);

  const changePickedStudents = (studentInfo) => {
    let new_pickedStudents;
    let existedPicked =
      pickedStudents?.filter((stu) => +stu.num === +studentInfo.num).length !==
      0;
    //선택된 사람에 있으면 제거
    if (existedPicked) {
      new_pickedStudents = pickedStudents?.filter(
        (stu) => +stu.num !== +studentInfo.num
      );

      //선택된 사람에 없으면 추가
    } else {
      new_pickedStudents = pickedStudents.concat(studentInfo);
    }
    //이름만 모아두고
    let new_pickedStudentsNames = new_pickedStudents?.map((std) => std.name);
    //성별정보 없을 수 있어서.. 성별 있는걸로 다시 만들어주고
    new_pickedStudents = nowStudents?.filter((std) =>
      new_pickedStudentsNames?.includes(std.name)
    );
    //번호순으로 정렬하기
    new_pickedStudents.sort((a, b) => a.num - b.num);

    setPickedStudents([...new_pickedStudents]);
  };

  //학급명 바뀌면 현재 학생 세팅함.
  useEffect(() => {
    if (nowClassName === "") return;
    let new_nowStudents = students?.filter(
      (cl) => Object.keys(cl)[0] === nowClassName
    )?.[0]?.[nowClassName];
    setNowStudents(new_nowStudents);
  }, [nowClassName]);

  //학급명 셀렉트 태그에서 옵션 선택하면...
  const selectClassHandler = (e) => {
    let clName = e.target.value;
    setNowClassName(clName);
  };

  //당첨목록 인풋창 체인지 핸들러
  const itemHandler = (e) => {
    let value = e.target.value;
    setInputValue(value);
  };

  //당첨목록에 추가하기
  const addItemHandler = (e) => {
    e.preventDefault();
    let new_prizes = [...prizes];
    new_prizes.push(inputValue);
    console.log(new_prizes);
    setPrizes(new_prizes);
    setInputValue("");
  };

  //당첨목록에서 삭제하기
  const prizeDeleteHandler = (e) => {
    let targetIndex = e.target.id;
    let new_prizes = [...prizes];
    new_prizes = new_prizes.filter((prz, index) => +index !== +targetIndex);
    setPrizes(new_prizes);
  };

  //당첨학생수 설정함수
  const pickStdNumHandler = (e) => {
    let value = e.target.value;
    setStdNumValue(+value);
  };

  //뽑기 설정 끝, 뽑기화면 보여주기
  const pickOptionHandler = () => {
    if (prizes?.length === 0) {
      Swal.fire(
        "목록 없음",
        "당첨 목록이 없습니다. 목록을 추가해주세요.",
        "warning"
      );
      return false;
    }

    if (+stdNumValue > pickedStudents.length) {
      Swal.fire(
        "당첨 학생수 초과",
        "당첨 학생수가 선택된 학생수 보다 많습니다! 당첨 학생수를 수정해주세요.",
        "warning"
      );
      return false;
    }

    setPickOptionDone(true);
  };

  //선택된 학생 보여주는 html
  const showPickedStd = (canClick) => {
    return (
      <>
        {" "}
        <h2 className={canClick && classes["fs15"]}>선택된 학생</h2>
        <div className={classes.div}>
          {pickedStudents &&
            pickedStudents?.map((stu) => (
              <StudentBtn
                className={"checklist-student"}
                name={stu.name}
                key={stu.num}
                woman={stu.woman}
                num={stu.num}
                onShowOption={() => {
                  if (!canClick) return;
                  let studentInfo = { num: +stu.num, name: stu.name };
                  changePickedStudents(studentInfo);
                }}
              />
            ))}
        </div>
      </>
    );
  };

  //학생 선택완료 함수
  const stdPickDoneHandler = () => {
    if (pickedStudents.length === 0) {
      Swal.fire(
        "선택된 학생 없음",
        "선택된 학생이 없어서 다음 단계로 넘어갈 수 없습니다! 먼저 전체학생에서 뽑기에 참가할 학생 이름을 클릭해주세요!",
        "warning"
      );
      return false;
    } else {
      setStdPickDone(true);
    }
  };

  return (
    <div className={classes["flex-col-center"]}>
      {!stdPickDone && (
        <div style={{ marginTop: "-50px" }}>
          {/* 전담이고 학급 선택해서 nowStudents 세팅하기 전이면, 학급 선택하는 셀렉트 먼저 보여주기 */}
          {isSubject && nowStudents?.length === 0 && (
            <div>
              <select
                onChange={selectClassHandler}
                className={classes["class-select"]}
                value={nowClassName}
              >
                <option value="">--학급--</option>
                {Object.keys(students?.[0])?.length === 1 &&
                  students?.map((cl) => (
                    <option key={Object.keys(cl)[0]} value={Object.keys(cl)[0]}>
                      {Object.keys(cl)[0]}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <h2 className={classes["fs15"]}>전체학생</h2>
          <div className={classes.div}>
            {nowStudents &&
              nowStudents?.map((stu) => (
                <StudentBtn
                  className={"checklist-student"}
                  name={stu.name}
                  key={stu.num}
                  woman={stu.woman}
                  num={stu.num}
                  onShowOption={() => {
                    let studentInfo = { num: +stu.num, name: stu.name };
                    changePickedStudents(studentInfo);
                  }}
                />
              ))}
          </div>
          {/* 선택된 학생 보여주기 */}
          {showPickedStd(true)}

          {/* 설정완료 버튼 */}
          <button onClick={stdPickDoneHandler}>학생선택 완료</button>
        </div>
      )}

      {/* 학생 선택이 끝나고 옵션 설정하는 부분 */}
      {stdPickDone && !pickOptionDone && (
        <>
          {/* 선택된 학생 보여주기 */}
          <div style={{ marginTop: "-50px" }}>{showPickedStd(false)}</div>

          {/* 당첨 학생수와 당첨 목록 가로 flex로 */}
          <div className={classes["flex"]}>
            <h1 className={classes["fs15-w40"]}>당첨 학생수</h1>
            <h1 className={classes["fs15-w60"]}>당첨 목록</h1>
          </div>
          {/* 뽑힐 학생수 */}
          <div className={classes["flex"]}>
            <div
              className={classes["flex-col-center"]}
              style={{ width: "40%", maxWidth: "350px" }}
            >
              <input
                type="number"
                min="1"
                max={pickedStudents?.length}
                onChange={pickStdNumHandler}
                value={stdNumValue}
                className={classes["num-input"]}
              />
            </div>
            <div
              className={classes["flex-col-center"]}
              style={{ width: "60%" }}
            >
              {/* 당첨 목록 보여주기 */}
              <div>
                {/* <div className={classes["div"]}> */}
                {prizes?.map((prize, p_index) => (
                  <button
                    key={prize}
                    onClick={(e) => prizeDeleteHandler(e)}
                    id={p_index}
                    className={classes["prize-btn"]}
                  >
                    {prize}
                  </button>
                ))}
              </div>
              <p>* 아이템 클릭하면 삭제</p>
              <form onSubmit={addItemHandler}>
                {/* 새로운 아이템 입력 인풋창 */}
                <input
                  type="text"
                  onChange={itemHandler}
                  value={inputValue}
                  placeholder="입력 후 엔터"
                  className={classes["input"]}
                  style={{ width: "55%" }}
                />
                <button onClick={addItemHandler} className={classes["addBtn"]}>
                  +
                </button>
              </form>
            </div>
          </div>

          <button
            onClick={pickOptionHandler}
            className={classes["optionDone-btn"]}
          >
            설정완료
          </button>
        </>
      )}
      {stdPickDone && pickOptionDone && (
        <>
          <div style={{ marginTop: "-50px" }}>
            {/* 선택된 학생 보여주기 */}
            {showPickedStd(false)}
          </div>
          {/* 나머지 뽑기 부분 */}
          <RandomPickPlay
            users={pickedStudents}
            prizes={prizes}
            pickStdNum={stdNumValue}
          />
        </>
      )}
    </div>
  );
};

export default RandomPick;
