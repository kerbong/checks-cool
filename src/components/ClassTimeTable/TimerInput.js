import React, { useState } from "react";
import classes from "./SimpleTimer.module.css";

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
              placeholder="내용을 직접 입력해주세요."
            />
          </form>

          {/* 메모 보여주기 */}
          {props?.classMemo && (
            <div
              style={{ color: "gray" }}
              onClick={() => setShowMemo((prev) => !prev)}
            >
              * 메모 내용 확인{" "}
              {showMemo ? (
                <i className="fa-solid fa-chevron-up"></i>
              ) : (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </div>
          )}
          {showMemo && props?.classMemo && (
            <div
              className={classes["memo-show"]}
              dangerouslySetInnerHTML={{ __html: props?.classMemo }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerInput;
