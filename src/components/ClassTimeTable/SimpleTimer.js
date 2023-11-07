import React, { useRef, useState, useEffect } from "react";

import Swal from "sweetalert2";
import endingAudio from "../../assets/audio/endingSound.mp3";

import classes from "./SimpleTimer.module.css";

const SimpleTimer = (props) => {
  const progressBarRef = useRef(null);
  const pointerRef = useRef(null);
  const displayOutputRef = useRef(null);
  const pauseBtnRef = useRef(null);
  const resetBtnRef = useRef(null);

  const [timerRef, setTimerRef] = useState(null);
  const [length, setLength] = useState(Math.PI * 2 * 100);
  const [speakRate, setSpeakRate] = useState(1);
  const [countdownRate, setCountdownRate] = useState(1);
  const [browserType, setBrowserType] = useState("");

  const [timeLeft, setTimeLeft] = useState(600);
  const [firstSetTime, setFirstSetTime] = useState(600);
  const [wholeTime, setWholeTime] = useState(600);

  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const setterBtns = [
    { id: "minutes-plus", seconds: 60, title: "1분 추가" },
    { id: "minutes-minus", seconds: -60, title: "1분 빼기" },
    { id: "seconds-plus", seconds: 10, title: "10초 추가" },
    { id: "seconds-minus", seconds: -10, title: "10초 빼기" },
  ];

  useEffect(() => {
    setBrowserType(getBrowserType());
  }, []);

  useEffect(() => {
    if (!props.remainTime) return;
    setTimeLeft(props.remainTime);
    setFirstSetTime(props.remainTime);
    setWholeTime(props.remainTime);
  }, [props.remainTime]);

  useEffect(() => {
    if (!browserType) return;
    if (browserType === "Chrome" || browserType === "Edge") return;
    Swal.fire(
      "브라우저 권장",
      "크롬(1순위)이나 엣지(2순위) 브라우저에서 잘 작동합니다.",
      "info"
    );
  }, [browserType]);

  const getBrowserType = () => {
    const userAgent = navigator.userAgent;

    if (/(msie|trident)/i.test(userAgent)) {
      return "Internet Explorer";
    } else if (/firefox/i.test(userAgent)) {
      return "Firefox";
    } else if (/Chrome/.test(userAgent)) {
      if (/Edg/.test(userAgent)) {
        // console.log("엣지");
        setSpeakRate(1.1);
        setCountdownRate(1.6);
        return "Edge";
      }
      if (/OPR/.test(userAgent)) {
        return "Opera";
      }
      //   console.log("크롬");
      return "Chrome";
    } else if (/Safari/.test(userAgent)) {
      if (/EdgiOS/.test(userAgent)) {
        // console.log("엣지");
        setSpeakRate(1.1);
        setCountdownRate(1.6);
        return "Edge";
      }
      if (/CriOS/.test(userAgent)) {
        return "Chrome";
      }
      return "Safari";
    } else {
      return "Unknown";
    }
  };

  const update = (value, timePercent) => {
    const offset = -length - (length * value) / timePercent;
    pointerRef.current.style.transform = `rotate(${
      (360 * value) / timePercent
    }deg)`;
    progressBarRef.current.style.strokeDashoffset = offset;
  };

  /** 화면에 있는 시간 숫자 변경. 남은 시간을 보여줌. && 포인터 css 움직이는 함수,  */
  const displayTimeLeft = (timeLeft, wTime) => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let displayString = `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    if (!displayOutputRef || !displayOutputRef.current) return;
    displayOutputRef.current.textContent = displayString;

    if (isStarted) {
      let new_wholeTime = wTime ? wTime : wholeTime;
      //   console.log(new_wholeTime);
      update(timeLeft, new_wholeTime);
    }
  };

  //세팅한 시간
  useEffect(() => {
    displayTimeLeft(firstSetTime);
  }, [firstSetTime]);

  //시작이나 멈춤 버튼 누르면
  useEffect(() => {
    if (!isStarted) return;
    //시작버튼 누르면 타이머 시작!
    // console.log(firstSetTime);
    timer(firstSetTime);
  }, [isStarted]);

  //일시정지 버튼 누르면 (isstarted 트루 상태일 때만 누를 수 있음)
  useEffect(() => {
    if (!isStarted) return;
    //일시정지 버튼 누르면,
    if (isPaused) {
      //   console.log("시작 중간 일시중지");
      //   console.log(timeLeft, isPaused);
      timer(timeLeft, isPaused);
      //일시정지였다가 다시 시작하면
    } else {
      //   console.log("시작 중간 다시 시작");
      //   console.log(timeLeft, isPaused);
      timer(timeLeft, isPaused);
    }
  }, [isPaused]);

  /** 주어지는 전체 시간을 변경하는 함수, set이 있으면 기본시간으로 세팅함 */
  const changeWholeTime = (seconds, set) => {
    // 전체 시간과 더하거나 뺄 시간의 합이 아직 양수, 시간이 남아있으면
    if (wholeTime + seconds > 0) {
      //만약 지금 타이머가 작동하기 전이면
      if (!isStarted) {
        //오른쪽 버튼으로 누른 시간으로 바꾸기
        if (!set) {
          setFirstSetTime((prevTime) => prevTime + seconds);
          setWholeTime((prevTime) => prevTime + seconds);
          // +, - 버튼으로 눌러서 기존 시간에 추가하기
        } else {
          setWholeTime(seconds);
          setFirstSetTime(seconds);
        }

        // 만약 지금 타이머가 작동중이면,
      } else {
        // 현재 일시정지였으면
        if (isPaused) {
          displayTimeLeft(timeLeft + seconds, wholeTime + seconds);
          setTimeLeft(timeLeft + seconds);
          setWholeTime(wholeTime + seconds);
          clearTimeout(timerRef);

          // 타이머가 작동중이고 시간이 가고 있으면,
        } else {
          setTimeLeft(timeLeft + seconds);
          setWholeTime(wholeTime + seconds);
          clearTimeout(timerRef);
          timer(timeLeft + seconds, false, wholeTime + seconds);
        }
      }
    }
  };

  /** +, - 버튼 눌러서 전체 시간 추가, 삭제하는 함수 */
  const handleSetterBtnClick = (seconds) => {
    changeWholeTime(seconds);
  };

  /** 실제 타이머 작동하는 함수, 전달된 초를 기준으로 남은 시간보여주는 함수 연동 + 타임아웃함수 실행 */
  const timer = (leftSeconds, pause, wt) => {
    clearInterval(timerRef);

    //일시정지면 멈추기
    if (pause) return;

    let remainTime = Date.now() + leftSeconds * 1000;

    //1초 후에 매초 반복 실행될 함수
    let new_timerRef = setInterval(function tick() {
      let new_timeLeft = Math.round((remainTime - Date.now()) / 1000);
      //   시간이 끝나면
      if (new_timeLeft < 0) {
        // 기존 타이머를 지우고
        setIsPaused(false);
        setIsStarted(false);
        setTimeLeft(firstSetTime);
        setWholeTime(firstSetTime);
        displayTimeLeft(firstSetTime, firstSetTime);
        clearInterval(new_timerRef);
        setTimerRef(null);

        return;
      }
      let new_wholeTime = wt ? wt : wholeTime;
      if ((new_timeLeft / new_wholeTime) * 100 === 50 && new_timeLeft > 10) {
        let remainMS;
        if (new_timeLeft > 60) {
          let remainM = Math.floor(new_timeLeft / 60);
          let remainS = new_timeLeft - remainM * 60;
          remainMS = remainM + "분" + remainS + "초";
        } else {
          remainMS = new_timeLeft + "초";
        }
        speech(`시간의 반이 지났어요. ${remainMS} 남았어요.`);
      } else {
        let audio = new Audio(endingAudio);

        if (new_timeLeft === 60) {
          speech(`시간이 1분 남았어요.`);
        } else if (new_timeLeft <= 10 && new_timeLeft > 0) {
          speech(`${+new_timeLeft}`, true);
        } else if (new_timeLeft === 0) {
          audio.play();
          speech(`시간이 종료되었어요.`);
        }
      }

      if (wt) {
        displayTimeLeft(new_timeLeft, wt);
      } else {
        displayTimeLeft(new_timeLeft);
      }
      setTimeLeft(new_timeLeft);
    }, 1000);
    setTimerRef(new_timerRef);
  };

  //   const setMinute = (min) => {
  //     changeWholeTime(min * 60, true);
  //   };

  const speech = (txt, countdown) => {
    if (!window.speechSynthesis) {
      alert(
        "음성 재생을 지원하지 않는 브라우저입니다. 크롬, 파이어폭스 등의 최신 브라우저를 이용하세요"
      );
      return;
    }
    let voices = [];
    voices = window.speechSynthesis.getVoices();
    const lang = "ko-KR";
    const utterThis = new SpeechSynthesisUtterance(txt);
    utterThis.onend = function (event) {};
    utterThis.onerror = function (event) {
      //   console.log("error", event);
    };
    let voiceFound = false;
    for (let i = 0; i < voices.length; i++) {
      if (
        voices[i].lang.indexOf(lang) >= 0 ||
        voices[i].lang.indexOf(lang.replace("-", "_")) >= 0
      ) {
        utterThis.voice = voices[i];
        voiceFound = true;
      }
    }
    if (!voiceFound) {
      return;
    }
    utterThis.lang = lang;
    utterThis.pitch = 1;
    utterThis.rate = speakRate;
    if (countdown) {
      utterThis.rate = countdownRate;
    }
    window.speechSynthesis.speak(utterThis);
  };

  return (
    <div className={classes["container"]}>
      <div className={classes["circle"]}>
        <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(110,110)">
            <circle r="100" className={classes["e-c-base"]}></circle>
            <g transform="rotate(-90)">
              <circle
                r="100"
                className={classes["e-c-progress"]}
                style={{ strokeDasharray: 628.319, strokeDashoffset: -1256.64 }}
                ref={progressBarRef}
              ></circle>
              <g
                className={classes["e-pointer"]}
                style={{ transform: "rotate(360deg)" }}
                ref={pointerRef}
              >
                <circle
                  cx="100"
                  cy="0"
                  r="8"
                  className={classes["e-c-pointer"]}
                ></circle>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div className={classes["flex-center"]}>
        <div className={classes["setters"]}>
          <div className={classes["minutes-set"]}>
            {setterBtns.slice(0, 2).map((btn) => (
              <button
                key={btn.id}
                data-setter={btn.id}
                title={btn.title}
                onClick={() => handleSetterBtnClick(btn.seconds)}
              >
                {btn.seconds > 0 ? "+" : "-"}
              </button>
            ))}
          </div>
          <div className={classes["seconds-set"]}>
            {setterBtns.slice(2).map((btn) => (
              <button
                key={btn.id}
                data-setter={btn.id}
                title={btn.title}
                onClick={() => handleSetterBtnClick(btn.seconds)}
              >
                {btn.seconds > 0 ? "+" : "-"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={classes["flex-center"]}>
        <div className={classes["controlls"]}>
          <div
            className={classes["display-remain-time"]}
            ref={displayOutputRef}
          >
            01:00
          </div>
          <div className={classes["btns"]}>
            {/* 재생 / 일시정지 버튼 */}
            <button
              className={
                !isStarted
                  ? classes["play"]
                  : isPaused
                  ? classes["play"]
                  : classes["pause"]
              }
              ref={pauseBtnRef}
              onClick={() => {
                if (!isStarted) {
                  setIsStarted(true);
                  setIsPaused(false);
                } else {
                  //   console.log("일시정지 누름");
                  setIsPaused((prev) => !prev);
                }
                // isPaused = isPaused ? false : true;
                // pauseTimer();
              }}
            ></button>
            {/* 정지 = 리셋버튼 */}
            <button
              className={classes["reset"]}
              ref={resetBtnRef}
              onClick={() => {
                if (!isStarted) return;

                // console.log("정지 누름");
                setIsPaused(false);
                setIsStarted(false);
                setWholeTime(firstSetTime);
                displayTimeLeft(firstSetTime, firstSetTime);
                clearInterval(timerRef);
                setTimerRef(null);
              }}
            ></button>
          </div>
        </div>
      </div>
      <div className={classes["minute-btns"]}>
        <div title="다음교시">
          <i className={`fa-solid fa-circle-right ${classes["icon"]}`}></i>
        </div>

        {/* <button className={classes["minute-btn"]} onClick={() => setMinute(1)}>
          {isStarted && "+ "}1분
        </button>
        <button className={classes["minute-btn"]} onClick={() => setMinute(3)}>
          {isStarted && "+ "}3분
        </button>
        <button className={classes["minute-btn"]} onClick={() => setMinute(5)}>
          {isStarted && "+ "} 5분
        </button>
        <button className={classes["minute-btn"]} onClick={() => setMinute(10)}>
          {isStarted && "+ "} 10분
        </button>
        <button className={classes["minute-btn"]} onClick={() => setMinute(20)}>
          {isStarted && "+ "} 20분
        </button> */}
      </div>
    </div>
  );
};

export default SimpleTimer;
