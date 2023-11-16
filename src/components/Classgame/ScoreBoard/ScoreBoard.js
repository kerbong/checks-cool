import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import classes from "./ScoreBoard.module.css";

const WAYS = [
  {
    name: "점수추가",
    desc: "* 활동을 하며 점수를 1점씩 추가하는 방식",
    id: "addScore",
  },
  {
    name: "타이머",
    desc: "* 정해진 시간 안에 활동을 진행하는 방식",
    id: "timer",
  },
  {
    name: "스톱워치",
    desc: "* 활동을 끝내는 데에 걸리는 시간을 측정하는 방식",
    id: "stopWatch",
  },
];

const ScoreBoard = () => {
  const [scoreWay, setScoreWay] = useState("");
  const [datas, setDatas] = useState([]);
  const [settingDone, setSettingDone] = useState(false);
  const [inputValue, setInputValue] = useState("");

  /** 모둠 이름 추가하는 함수 */
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  /**  모둠이름 추가 함수*/
  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValue?.trim()?.length === 0) return;

    let new_datas = [...datas];

    if (new_datas.filter((dt) => dt.name === inputValue)?.length > 0) {
      Swal.fire(
        "이름 중복",
        "이미 입력한 모둠의 이름과 같아요! 이름이 겹치지 않도록 변경해주세요!",
        "warning"
      );
      return;
    }
    new_datas.push({ name: inputValue, scores: [] });
    setDatas(new_datas);
    setInputValue("");
  };

  const delDatas = (data) => {
    let new_datas = [...datas];
    new_datas = new_datas.filter((dt) => dt.name !== data.name);
    setDatas(new_datas);
  };

  return (
    <>
      <h1>* 개발중 입니다... </h1>
      <div>모둠대결!</div>
      {/* 점수 측정방식 선택하기 */}
      {scoreWay === "" && (
        <div className={classes["ways-div"]}>
          {WAYS?.map((way, ind) => (
            <div
              key={ind}
              onClick={() => setScoreWay(way.id)}
              className={classes["way-div"]}
            >
              <span className={classes["way-name"]}>{way.name}</span>
              <span className={classes["way-desc"]}>{way.desc}</span>
            </div>
          ))}
        </div>
      )}

      {/* 모둠 이름, 수 설정하기 */}
      {scoreWay !== "" && !settingDone && (
        <>
          {/* 모둠 추가하기 */}
          <form onSubmit={submitHandler}>
            <input type="text" value={inputValue} onChange={handleChange} />
          </form>

          {/* 입력된 모둠들 보여주기 */}
          {datas?.length > 0 && (
            <div>
              {datas?.map((data, ind) => (
                <span
                  className={classes["data-name"]}
                  key={ind}
                  onClick={() => delDatas(data)}
                  title={"클릭해서 제거하기"}
                >
                  {data.name}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ScoreBoard;
