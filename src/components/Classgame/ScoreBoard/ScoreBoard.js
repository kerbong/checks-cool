import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import classes from "./ScoreBoard.module.css";
import DynamicGrid from "./DynamicGrid";
import SimpleTimer from "components/ClassTimeTable/SimpleTimer";
import StopWatch from "components/ClassTimeTable/StopWatch";

const WAYS = [
  {
    name: (
      <>
        <i
          className="fa-solid fa-square-poll-vertical"
          style={{ marginRight: "10px" }}
        ></i>{" "}
        점수추가
      </>
    ),
    desc: "* 활동을 하며 점수를 1점씩 추가하는 방식",
    id: "addScore",
  },
  {
    name: (
      <>
        <i
          className="fa-solid fa-hourglass-start"
          style={{ marginRight: "10px" }}
        ></i>{" "}
        타이머
      </>
    ),
    desc: "* 정해진 시간 안에 활동을 진행하고 점수를 1점씩 추가하는 방식",
    id: "timer",
  },
  {
    name: (
      <>
        <i
          className="fa-solid fa-stopwatch"
          style={{ marginRight: "10px" }}
        ></i>{" "}
        스톱워치
      </>
    ),
    desc: "* 활동을 끝내는 데에 걸리는 시간을 측정하는 방식",
    id: "stopWatch",
  },
];

const DATAS = [
  { name: "1모둠", scores: [] },
  { name: "2모둠", scores: [] },
  { name: "3모둠", scores: [] },
  { name: "4모둠", scores: [] },
  { name: "5모둠", scores: [] },
  { name: "6모둠", scores: [] },
];

const ScoreBoard = () => {
  const [scoreWay, setScoreWay] = useState("");
  const [datas, setDatas] = useState(DATAS);
  const [exDatas, setExDatas] = useState();
  const [settingDone, setSettingDone] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [nowData, setNowData] = useState({});
  const [nowScore, setNowScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [nowRank, setNowRank] = useState({});

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

  /** 이전 혹은 다음으로 이동하는 함수 */
  const moveTo = (bn) => {
    if (bn === "before") {
      if (scoreWay !== "") {
        setScoreWay("");
      } else {
        setSettingDone(false);
      }
    } else if (bn === "next") {
      setSettingDone(true);
      //local에 저장해두기
      localStorage.setItem("scoreBoard", JSON.stringify(datas));
    }
    return;
  };

  useEffect(() => {
    let local_datas = JSON.parse(localStorage.getItem("scoreBoard"));
    if (!local_datas) return;
    setDatas(local_datas);
  }, []);

  useEffect(() => {
    if (
      datas?.reduce((max, current) => {
        return current.scores.length > max ? current.scores.length : max;
      }, 0) !== 0
    ) {
      showRank();
    }
  }, [datas]);

  /** 랭킹 보여주는 함수! */
  const showRank = (finished) => {
    function sumScores(arr) {
      return arr.reduce((total, current) => total + current, 0);
    }

    const sortedDatas_ex = [...exDatas].sort(
      (a, b) => sumScores(b.scores) - sumScores(a.scores)
    );

    const sortedDatas = [...datas].sort(
      (a, b) => sumScores(b.scores) - sumScores(a.scores)
    );

    // 스톱워치면... 순서를 거꾸로!! 조금 걸릴수록 1등!
    if (scoreWay === "stopWatch") {
      sortedDatas_ex.reverse();
      sortedDatas.reverse();
    }

    //현재 랭킹 저장해두기 (각 모둠 위에 표시하기!)
    let new_rank = {};
    let lastScore = null;
    let lastRank = 1;
    let rank = 1;

    sortedDatas?.forEach((dt, ind) => {
      let currentScore = sumScores(dt.scores);
      if (dt.scores?.length === 0) {
        // 점수가 없는 경우
        new_rank[dt.name] = sortedDatas.length; // 순위를 뒤로 미룸
      } else {
        // 점수가 있는 경우
        if (currentScore !== lastScore) {
          lastRank = rank;
        }
        new_rank[dt.name] = lastRank;
        lastScore = currentScore;
        rank += 1;
      }
    });
    setNowRank(new_rank);

    // 1등 =>  이전  현재

    // 그냥 중간에 보여주는 함수면
    if (!finished) {
      Swal.fire({
        title: "현재 순위!",
        html: `<div class=${classes["grid-container"]}>
        ${sortedDatas
          ?.map(
            (dt, index) => `
          <div class=${classes["rank-row"]} style="${
              +index >= 3 ? "margin-left: 28px" : ""
            }">
          ${
            index < 3
              ? "<i class='fa-solid fa-crown fa-sm' style={{ color: '#414141', marginRight: '5px' }}></i>"
              : ""
          }  ${index + 1} 등 <span class=${classes["rank-item"]}>${
              sortedDatas_ex?.[index].name
            }</span> => <span class=${classes["rank-item"]}>${dt.name}</span>
          </div>
        `
          )
          .join("")}
      </div>`,
      });
      //   끝내기 눌러서 나오는 모달!
    } else {
      Swal.fire({
        title: "최종 순위!",
        html: `<div class=${classes["grid-container"]}>
            ${sortedDatas
              ?.map(
                (dt, index) => `
              <div class=${classes["rank-row"]} style="${
                  +index >= 3 ? "margin-left: 28px" : ""
                }">
              ${
                index < 3
                  ? "<i class='fa-solid fa-crown fa-sm' style={{ color: '#414141', marginRight: '5px' }}></i>"
                  : ""
              } ${index + 1} 등 <span class=${
                  classes["rank-item"]
                } style="font-size: ${
                  index === 0 ? "35px" : index < 3 ? "30px" : "25px"
                };"
                }>${dt.name}</span>
              </div>
            `
              )
              .join("")}
          </div>`,
        icon: "success",
      });
    }
  };

  /** 점수추가하기 저장버튼 눌렀을 때, nowScore를 nowData 모둠에 추가함 */
  const addScoreHandler = () => {
    let new_datas = [...datas];
    setExDatas(datas);
    let new_data = { ...nowData };
    if (new_data.scores?.length > 0) {
      new_data.scores.push(nowScore);
    } else {
      new_data.scores = [nowScore];
    }

    new_datas = new_datas?.map((dt) => {
      let new_dt = dt;
      if (dt.name === new_data.name) {
        new_dt = new_data;
      }
      return new_dt;
    });
    // console.log(new_datas);
    setDatas(new_datas);
    setNowData({});
    setNowScore(0);
  };

  /** 세팅던 상태에서 모둠을 클릭하면 보일 함수 */
  const showWayRecord = () => {
    // 스코어 방식 확인하고 그거에 따라 보여줄거 넣기
    let returnHtml = (
      <div className={classes["flex-column-center"]}>
        <div
          className={classes["flex-20vh-center"]}
          style={scoreWay !== "addScore" ? { height: "290px" } : {}}
        >
          {/* 점수 더하고 빼는 부분, 스톱워치에서는 안보여줌 */}
          {scoreWay !== "stopWatch" && (
            <div
              className={classes["flex-20vh-center"]}
              style={scoreWay !== "addScore" ? { width: "350px" } : {}}
            >
              <span
                className={classes["addScoreBtn"]}
                onClick={() => setNowScore((prev) => +(prev - 1))}
                title="1점 빼기"
              >
                -
              </span>
              <span style={{ fontSize: "60px" }}>{nowScore} 점</span>
              <span
                className={classes["addScoreBtn"]}
                onClick={() => setNowScore((prev) => +(prev + 1))}
                title="1점 추가하기"
              >
                +
              </span>
            </div>
          )}

          {/* //   타이머, 스톱워치 설정인 경우, 타이머 보여주기 */}
          {scoreWay === "timer" && (
            <SimpleTimer remainTime={120} justTimer={true} />
          )}
          {scoreWay === "stopWatch" && (
            // <SimpleTimer remainTime={120} justTimer={true} />
            <StopWatch
              timeHandler={stopWatchTimeHandler}
              runningHandler={(tf) => setIsRunning(tf)}
            />
          )}
        </div>
        {scoreWay === "stopWatch" &&
          nowScore !== 0 &&
          !isRunning &&
          "* 일시정지한 시간을 저장해주세요!"}

        {scoreWay === "stopWatch" &&
          nowScore !== 0 &&
          isRunning &&
          "* 자료를 저장하시려면 '멈춤' => '기록저장'을 눌러주세요!"}
        <br />
        <br />
        <button
          className={classes["scoreSaveBtn"]}
          onClick={addScoreHandler}
          title={
            scoreWay !== "stopWatch"
              ? "현재 설정된 점수를 저장합니다."
              : "화면에 보이는 일시정지한 시간을 저장합니다!"
          }
        >
          {scoreWay === "stopWatch" && "기록"}저장
        </button>
      </div>
    );

    return returnHtml;
  };

  /** 스톱워치에서 일시정지하면 받아오는 시간을 time 상태에 저장함 */
  const stopWatchTimeHandler = (time) => {
    if (time === 0) return;
    setNowScore(+time);
  };

  return (
    <>
      <div id="title-div">
        <button id="title-btn">
          <i className="fa-solid fa-medal" style={{ fontSize: "1em" }}></i>{" "}
          모둠대결! (개발중)
        </button>
      </div>
      {/* 점수 측정방식 선택하기 */}
      {scoreWay === "" && settingDone && (
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
      {scoreWay === "" && !settingDone && (
        <>
          {/* 모둠 추가하기 */}
          <form onSubmit={submitHandler} className={classes["data-div"]}>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="추가할 모둠 이름"
              className={classes["input"]}
            />
          </form>
        </>
      )}

      {/* 입력된 모둠들 보여주기 */}
      {!(settingDone && scoreWay === "") && (
        <div className={classes["data-div"]}>
          {datas?.map((data, ind) => (
            <span
              className={`${classes["data-name"]} ${
                nowData.name === data.name ? classes["group-clicked"] : ""
              }`}
              style={{
                width: `calc(90vw / ${datas?.length} - 10px)`,
                position: "relative",
              }}
              key={ind}
              onClick={() => (!settingDone ? delDatas(data) : setNowData(data))}
              title={
                !settingDone ? "클릭해서 제거하기" : "클릭해서 점수 기록하기"
              }
            >
              {/* 등수 보여주는 부분 */}
              {Object.values(nowRank)?.length > 0 && (
                <button
                  className={classes["rank-btn"]}
                  style={
                    +nowRank?.[data.name] === 1
                      ? { backgroundColor: "#eeed63" }
                      : +nowRank?.[data.name] === 2
                      ? { backgroundColor: "#cccccc" }
                      : +nowRank?.[data.name] === 3
                      ? { backgroundColor: "#c0a985" }
                      : {}
                  }
                >
                  {+nowRank?.[data.name] < 4 && (
                    <i
                      className="fa-solid fa-crown fa-sm"
                      style={{ color: "#414141", marginRight: "5px" }}
                    ></i>
                  )}
                  {nowRank?.[data.name]}등
                </button>
              )}
              {/* 모둠 이름 보여주기 */}
              {data.name}
            </span>
          ))}
        </div>
      )}
      {/* 현재까지 모둠의 점수 현황 보여주는 부분 */}

      {scoreWay !== "" && settingDone && (
        <div className={classes["data-div"]}>
          <DynamicGrid
            rows={datas?.reduce((max, current) => {
              return current.scores.length > max ? current.scores.length : max;
            }, 0)}
            columns={datas?.length}
            datas={datas}
            scoreWay={scoreWay}
          />
        </div>
      )}

      {/* 점수 혹은 타이머 / 스톱워치 보여줄 부분 */}
      {settingDone && Object.values(nowData)?.length > 0 && showWayRecord()}

      {/* 아무 모둠도 선택하지 않았을 때 */}
      {scoreWay !== "" &&
        settingDone &&
        Object.values(nowData)?.length === 0 && (
          <>
            <div
              className={classes["flex-20vh-center"]}
              style={{ fontSize: "28px", color: "gray" }}
            >
              * 모둠을 선택해주세요!
            </div>
            <button
              className={classes["scoreSaveBtn"]}
              onClick={() => showRank(true)}
            >
              끝내기
            </button>
          </>
        )}

      {/* 이전, 다음버튼들 */}
      <div>
        {settingDone && (
          <button
            className={
              !settingDone ? classes["moveBtn"] : classes["moveBefore"]
            }
            onClick={() => {
              if (scoreWay !== "") {
                Swal.fire({
                  title: "이전화면 돌아가기",
                  text: `설정화면으로 돌아갈까요? 현재 기록은 저장되지 않습니다.`,
                  showDenyButton: true,
                  confirmButtonText: "확인",
                  confirmButtonColor: "#db100cf2",
                  denyButtonColor: "#85bd82",
                  denyButtonText: `취소`,
                  icon: "warning",
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    moveTo("before");
                    setDatas(DATAS);
                    setExDatas();
                    setNowData({});
                    setNowScore(0);
                    setNowRank({});
                  }
                });
              } else {
                moveTo("before");
              }
            }}
            title={"이전화면"}
          >
            {!settingDone ? (
              "이전"
            ) : (
              <i className="fa-solid fa-share fa-rotate-180"></i>
            )}
          </button>
        )}
        {!settingDone && Object.values(datas)?.length > 0 && (
          <button className={classes["moveBtn"]} onClick={() => moveTo("next")}>
            다음
          </button>
        )}
      </div>
    </>
  );
};

export default ScoreBoard;
