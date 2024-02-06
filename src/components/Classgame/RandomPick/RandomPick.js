import React, { useState, useEffect } from "react";
import classes from "./RandomPick.module.css";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import StudentBtn from "components/Student/StudentBtn";
import RandomPickPlay from "./RandomPickPlay";

const RandomPick = (props) => {
  const [init, setInit] = useState("");
  const [pickedStudents, setPickedStudents] = useState([]);
  const [nowStudents, setNowStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [nowClassName, setNowClassName] = useState("");
  const [isSubject, setIsSubject] = useState(false);
  const [stdPickDone, setStdPickDone] = useState(false);
  const [pickOptionDone, setPickOptionDone] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [prizes, setPrizes] = useState([]);

  //학년도 설정함수
  const setYear = () => {
    return dayjs().format("MM-DD") <= "02-15"
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

  const changePickedStudents = (pickOrCancle, studentInfo) => {
    let new_pickedStudents;
    let existedPicked =
      pickedStudents?.filter((stu) => +stu.num === +studentInfo.num).length !==
      0;
    //선택에서 학생을 눌렀는데, 이미 선택된 사람에 있으면
    if (existedPicked && pickOrCancle === "pick") {
      Swal.fire(
        "이미 선택됨",
        `${studentInfo.name} 학생이 이미 선택되었어요! 선택된 학생 목록에서 학생 이름을 클릭하면, 제외가 가능합니다.`,
        "info"
      );
      return;
      // 선택된 사람에 있는데 취소인 경우 제외
    } else if (existedPicked && pickOrCancle === "cancle") {
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
  const addItemHandler = (e, addMore, prz) => {
    e.preventDefault();
    let new_prizes = [...prizes];
    if (addMore === "add") {
      if (new_prizes?.length === pickedStudents?.length) {
        Swal.fire(
          "추가실패",
          "뽑기 품목의 개수가 선택된 학생 수를 초과할 수 없어요!",
          "warning"
        );
        return;
      }
      if (prz) {
        new_prizes.push(prz);
      } else {
        new_prizes.push(inputValue);
      }
    } else if (addMore === "del") {
      //뒤에서 부터 찾아서 제거하기.. 이래야 순서가 안바뀜
      function findLastIndex(array, predicate) {
        for (let i = array.length - 1; i >= 0; i--) {
          if (predicate(array[i])) {
            return i;
          }
        }
        return -1;
      }

      const index = findLastIndex(new_prizes, (p) => p === prz);

      new_prizes.splice(index, 1);
    } else {
      if (inputValue === "") return;
      new_prizes.push(inputValue);
    }

    setPrizes(new_prizes);
    setInputValue("");
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

    if (+pickedStudents?.length > prizes.length) {
      Swal.fire({
        title: "뽑기 품목 부족",
        text: "뽑기 품목이 선택된 학생 수보다 적습니다. 그래도 진행할까요?",
        confirmButtonText: "진행",
        showDenyButton: true,
        denyButtonText: "취소",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          setPickOptionDone(true);
        } else {
          return;
        }
      });
    } else {
      setPickOptionDone(true);
    }
  };

  //선택된 학생 보여주는 html
  const showPickedStd = (canClick) => {
    return (
      <div
        className={classes["stdsDiv"]}
        style={canClick ? {} : { padding: "15px" }}
      >
        {" "}
        <h2 className={canClick ? classes["fs15"] : {}}>
          선택된 학생({pickedStudents?.length})
        </h2>
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
                  let studentInfo = {
                    num: +stu.num,
                    name: stu.name,
                    woman: stu?.woman,
                  };
                  changePickedStudents("cancle", studentInfo);
                }}
                title={`"${stu.name}" 선택 취소하기`}
              />
            ))}
        </div>
      </div>
    );
  };

  /** 그룹 선택 버튼 함수 */
  const pickedStdBtnsHandler = (num) => {
    // 전체선택이면
    if (num === 0) {
      let new_pickedStds = nowStudents
        ?.map((stu) => {
          return { num: +stu.num, name: stu.name, woman: stu?.woman || false };
        })
        ?.sort((a, b) => a.num - b.num);
      setPickedStudents(new_pickedStds);
      //남학생 전체
    } else if (num === 1) {
      let new_pickedStds = [];
      nowStudents?.forEach((stu) => {
        if (stu.woman) return;
        new_pickedStds.push({
          num: +stu.num,
          name: stu.name,
          woman: stu?.woman,
        });
      });
      setPickedStudents(new_pickedStds?.sort((a, b) => a.num - b.num));
      //여학생 전체
    } else if (num === 2) {
      let new_pickedStds = [];
      nowStudents?.forEach((stu) => {
        if (!stu.woman) return;
        new_pickedStds.push({
          num: +stu.num,
          name: stu.name,
          woman: stu?.woman,
        });
      });
      setPickedStudents(new_pickedStds?.sort((a, b) => a.num - b.num));
      // 모두 선택 해제
    } else if (num === 3) {
      setPickedStudents([]);
    }
  };

  /** 학생 선택할 때 편하게 도울 버튼들. 전체 선택, 전체 취소, 남학생모두, 여학생모두 */
  const showPickGroupBtns = () => {
    let groups = ["전체 ", "남학생 ", "여학생 ", "전체취소 "];
    // let groups_btns = [<i className="fa-solid fa-down-long"></i>, "남학생 전체", "여학생 전체", "전체취소"];
    return (
      <>
        {groups?.map((gr, ind) => (
          <button
            key={ind}
            className={classes["prize-btn"]}
            style={{
              backgroundColor: "#617B80",
              color: "whitesmoke",
              cursor: "pointer",
            }}
            onClick={() => pickedStdBtnsHandler(ind)}
          >
            {gr}
            {ind < 3 && <i className="fa-solid fa-play fa-rotate-90"></i>}
            {ind === 3 && <i className="fa-solid fa-eject"></i>}
          </button>
        ))}
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
    } else if (init === "something") {
      setStdPickDone(true);
    } else {
      setStdPickDone(true);
      setPickOptionDone(true);
    }
  };

  /** 뽑기 품목 리스트를 보여주는 함수 */
  const showPrizesLists = () => {
    const uniquePrizes = [...new Set(prizes)];
    const prizeCounts = prizes.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    return uniquePrizes?.map((prize, p_index) => (
      <button key={p_index} id={p_index} className={classes["prize-btn"]}>
        {`${prize}(${prizeCounts[prize]})`}
        {/* 개수 추가하는 버튼 */}
        <span
          onClick={(e) => addItemHandler(e, "add", prize)}
          className={classes["addBtn"]}
        >
          +
        </span>
        {/* 개수 제거하는 버튼 */}
        <span
          onClick={(e) => addItemHandler(e, "del", prize)}
          className={classes["delBtn"]}
        >
          -
        </span>
      </button>
    ));
  };

  return (
    <>
      {/* 학생 선택 전에.. 큰 틀에서 보여줄 부분 */}
      {init === "" && (
        <div className={classes["ways-div2"]}>
          {/* 품목 뽑기 */}
          <div
            onClick={() => setInit("something")}
            className={classes["way-div"]}
          >
            <span className={classes["way-name"]}>
              <i
                className="fa-solid fa-shuffle"
                style={{ marginRight: "10px" }}
              ></i>
              {"품목 뽑기"}
            </span>
            <p>
              * 학생목록과 품목을 설정하고 뽑아요! <br /> (1인 1역, 일반적인
              뽑기 등에 활용이 가능해요.){" "}
            </p>
          </div>
          {/* 기존 자료 */}
          <div
            onClick={() => {
              setInit("order");
            }}
            className={classes["way-div"]}
          >
            <span className={classes["way-name"]}>
              <i
                className="fa-solid fa-arrow-down-1-9"
                style={{ marginRight: "10px" }}
              ></i>
              {"순서 뽑기"}
            </span>
            <p>
              * 학생목록을 설정하고 순서를 정해요!
              <br /> (줄서기, 발표 순서 등에 활용이 가능해요.){" "}
            </p>
          </div>
        </div>
      )}

      <div className={classes["flex-col-center"]}>
        {/* 공통부분, 학생 선택하기 */}
        {init !== "" && !stdPickDone && (
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
                      <option
                        key={Object.keys(cl)[0]}
                        value={Object.keys(cl)[0]}
                      >
                        {Object.keys(cl)[0]}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div className={classes["stdsDiv"]}>
              <h2 className={classes["fs15"]}>
                학생 목록({nowStudents?.length})
              </h2>
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
                        let studentInfo = {
                          num: +stu.num,
                          name: stu.name,
                          woman: stu?.woman,
                        };
                        changePickedStudents("pick", studentInfo);
                      }}
                      title={`"${stu.name}" 선택하기`}
                    />
                  ))}
              </div>
            </div>
            {/* 모두 선텍 / 남학생선택 / 여학생 선택 / 모두 취소 버튼 */}
            {showPickGroupBtns()}

            {/* 선택된 학생 보여주기 */}
            {showPickedStd(true)}

            {/* 설정완료 버튼 */}
            <button
              className={classes["optionDone-btn"]}
              onClick={stdPickDoneHandler}
            >
              학생선택 완료
            </button>
            {/* 뒤로가기 버튼 */}
            <button
              className={classes["optionDone-btn"]}
              onClick={() => setInit("")}
            >
              뒤로가기
            </button>
          </div>
        )}

        {/* 학생 선택이 끝나고 품목 설정하는 부분 */}
        {init === "something" && stdPickDone && !pickOptionDone && (
          <>
            {/* 선택된 학생 보여주기 */}
            <div style={{ marginTop: "-50px" }}>{showPickedStd(false)}</div>

            {/* 당첨 학생수와 당첨 목록 가로 flex로 */}
            <div
              className={classes["flex-col-center"]}
              style={{ width: "95%" }}
            >
              <h1 className={classes["fs15-w60"]}>
                뽑기 품목 ({prizes?.length})
              </h1>
              {/* 당첨 목록 보여주기 */}
              <div>
                {/* <div className={classes["div"]}> */}
                {showPrizesLists()}
              </div>
              <p>* 아이템 클릭하면 삭제</p>
            </div>
            {/* 당첨 목록 입력하기 */}
            <div
              className={classes["flex-col-center"]}
              style={{ width: "95%" }}
            >
              <h1 className={classes["fs15-w60"]}>뽑기 품목 추가</h1>
              <form onSubmit={(e) => addItemHandler(e, "add")}>
                {/* 새로운 아이템 입력 인풋창 */}
                <input
                  type="text"
                  onChange={itemHandler}
                  value={inputValue}
                  placeholder="품목 입력 후 엔터!"
                  className={classes["input"]}
                  style={{ width: "80%", maxWidth: "400px" }}
                />
              </form>
            </div>

            <button
              onClick={pickOptionHandler}
              className={classes["optionDone-btn"]}
            >
              설정완료
            </button>
          </>
        )}

        {/* 학생 선택, 품목 설정도 끝나면 보여줄 부분 */}
        {init !== "" && stdPickDone && pickOptionDone && (
          <>
            <div style={{ marginTop: "-50px" }}>
              {/* 선택된 학생 보여주기 */}
              {showPickedStd(false)}
            </div>
            {/* 나머지 뽑기 부분 */}
            <RandomPickPlay
              users={pickedStudents}
              prizes={prizes}
              backToBasic={() => {
                if (isSubject) {
                  setNowStudents([]);
                  setNowClassName("");
                }
                setPickedStudents([]);
                setStdPickDone(false);
                setPickOptionDone(false);
                setPrizes([]);
                setInit("");
              }}
              init={init}
            />
          </>
        )}
      </div>
    </>
  );
};

export default RandomPick;
