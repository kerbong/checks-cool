import React, { useState, useEffect } from "react";
import classes from "./SimpleTimer.module.css";

import dayjs from "dayjs";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "fbase";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const EXAMPLES = [
  "화장실 다녀오기",
  "손씻기",
  "교과서 준비",
  "공책 준비",
  "필기도구 준비",
  "미술도구 준비",
  "운동화 준비",
  "물통 챙기기",
  "외투 챙기기",
  "1분 전 자리에 앉기",
  "자리 주변 정리하기",
];

const TimerInput = (props) => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [showMemo, setShowMemo] = useState(false);
  //제출 미제출 자료들
  const [checkLists, setCheckLists] = useState([]);

  const changeHandler = (e) => {
    const { value } = e.target;

    setValue(value);
  };

  const submitHandler = (e, add) => {
    if (!add) {
      e.preventDefault();
    }
    let new_todos = [...todos];

    let now_value = add ? e.target.innerText : value?.trim();
    // 이전까지의 내용에 같은게 없으면 추가
    if (new_todos.filter((todo) => todo === now_value)?.length === 0) {
      new_todos.push(now_value);
    }

    setTodos(new_todos);
    if (!add) {
      setValue("");
    }
  };

  const removeTodos = (e) => {
    const now_value = e.target.innerText;
    let new_todos = [...todos];

    // 이전까지의 내용에 같은게 없으면 추가
    new_todos = new_todos.filter((todo) => todo !== now_value);

    setTodos(new_todos);
  };

  //지난 7일 구하기..
  const last7days = (today, pastFuture) => {
    let now_date = dayjs(today);
    let new_7days = [];
    if (pastFuture === "past") {
      for (let i = 0; i < 8; i++) {
        new_7days.push(now_date.subtract(i, "d").format("YYYY-MM-DD"));
      }
    } else {
      for (let i = 0; i < 8; i++) {
        new_7days.push(now_date.add(i, "d").format("YYYY-MM-DD"));
      }
    }

    return new_7days;
  };

  //제출 미제출 자료들 받아와서.. 저장
  const getCheckListsFromDb = async () => {
    let checkListsRef = doc(dbService, "checkLists", props.userUid);
    setCheckLists([]);
    let checkListsSnap = await getDoc(checkListsRef);

    // onSnapshot(checkListsRef, (doc) => {
    const new_checkLists = [];

    let before7days = last7days(props?.todayYyyymmdd, "past");

    checkListsSnap?.data()?.checkLists_data?.forEach((data) => {
      //모든 데이터 저장용 자료로 만들기, 보고있는 날짜 기준으로 올해 자료만 뽑아주기

      if (before7days?.includes(data.id.slice(0, 10))) {
        new_checkLists.push(data);
      }
    });

    setCheckLists([...new_checkLists]);
    // });
  };

  useEffect(() => {
    //다음교시가 1교시 혹은 자료가 없는경우, 혹은 교시가 아닌경우
    // if (props.classTitle.includes("1교시") || !props.classTitle.includes("교시") || props.classTitle === "") {
    getCheckListsFromDb();
    // }
  }, [props.userUid]);

  return (
    <div>
      {/* 입력 또는 선택한 내용들 보여주기 */}
      <div className={classes["todos-div"]}>
        {todos?.map((todo, ind) => (
          <span key={ind}>
            <span
              className={classes["todo-item"]}
              onClick={removeTodos}
              title={"클릭하여 제거하기"}
            >
              {todo}
            </span>
            <span style={{ fontSize: "2rem" }}>{"/"}</span>
          </span>
        ))}
      </div>
      {/* 에시목록 및 직접입력 부분  */}
      <div className={classes["timerInput-div"]}>
        {/* 예시목록 */}
        <div style={{ width: "50%" }}>
          <div className={classes["examples"]}>
            {EXAMPLES?.map((exam, ind) => (
              <span
                key={ind}
                className={classes["todo-item"]}
                onClick={(e) => submitHandler(e, true)}
                style={{ fontSize: "1.25rem" }}
                title="클릭해서 저장하기"
              >
                {exam}
              </span>
            ))}
          </div>
        </div>

        {/* 직접입력부분 */}
        <div style={{ width: "50%" }}>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              value={value}
              className={classes["timer-input"]}
              onChange={changeHandler}
              placeholder="준비할 내용을 직접 입력해주세요."
            />
          </form>

          {/* 메모 보여주기 */}
          {props?.classMemo && (
            <div
              style={{ color: "gray" }}
              onClick={() => setShowMemo((prev) => !prev)}
            >
              * 메모 내용 확인 {showMemo ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          )}
          {/* 메모가 있으면.. 메모보여주기 */}
          {showMemo && props?.classMemo && (
            <div
              className={classes["memo-show"]}
              dangerouslySetInnerHTML={{ __html: props?.classMemo }}
            ></div>
          )}
          {/* 제출 / 미제출 학생 있어도 보여주기 */}

          {checkLists?.length > 0 && (
            <div className={classes["check-div"]}>
              {checkLists?.map(
                (event) =>
                  event.unSubmitStudents.length !== 0 && (
                    <li key={event.id} className={classes["check-li"]}>
                      <span className={classes["check-title"]}>
                        {/* 제출 제목 및 미제출자 수 */}
                        {event.title} ({event.unSubmitStudents.length}) 미제출
                      </span>
                      <span>
                        {" "}
                        {event.unSubmitStudents?.map((stu) => (
                          <span
                            key={stu.num + stu.name}
                            className={classes["check-std"]}
                          >
                            {/* 미제출자 이름 보여주기 */}
                            {`${stu.name}`}
                          </span>
                        )) || ""}
                      </span>
                    </li>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerInput;
