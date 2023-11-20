import React, { useState, useRef, useEffect } from "react";
import classes from "./SimpleTimer.module.css";

const StopWatch = (props) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startStopWatch = () => {
    //멈춰 있다가... 다시 시작을 누르면!
    if (!isRunning) {
      props.runningHandler(true);
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
      //시간이 가고 있다가... 멈춤을 누르면!
    } else {
      props.runningHandler(false);

      props.timeHandler(time);
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const resetStopWatch = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const getMinutes = () => `0${Math.floor((time / 6000) % 60)}`.slice(-2);
  const getSeconds = () => `0${Math.floor((time / 100) % 60)}`.slice(-2);
  const getCentiseconds = () => `0${time % 100}`.slice(-2);

  return (
    <div>
      <h1 className={classes["h1"]}>
        <span className={classes["h1-span"]}>{getMinutes()}</span> :{" "}
        <span className={classes["h1-span"]}>{getSeconds()}</span> :{" "}
        <span className={classes["h1-span"]}>{getCentiseconds()}</span>
      </h1>
      <div className={classes["flex-center"]}>
        <button
          className={
            isRunning ? classes["stopWatchPause"] : classes["stopWatchPlay"]
          }
          title={isRunning ? "일시정지" : "이어하기"}
          onClick={startStopWatch}
        ></button>
        <button
          className={classes["stopWatchReset"]}
          onClick={resetStopWatch}
          title="정지하고 시간 초기화하기"
        ></button>{" "}
      </div>
      <br />
      {isRunning
        ? "* 자료를 저장하시려면 '일시정지' => '기록저장'을 눌러주세요!"
        : time !== 0
        ? "* '기록저장' 으로 현재 시간 저장하기!"
        : ""}
    </div>
  );
};

export default StopWatch;
