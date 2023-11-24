import React, { useState, useEffect, useRef } from "react";
import classes from "./SimpleRandom.module.css";

import backHand from "../../../assets/simpleRandom/손등.png";
import foreHand from "../../../assets/simpleRandom/손바닥.png";
import DiceRandom from "./DiceRandom";

const GIFS = [backHand, foreHand];

function SimpleRandom() {
  const [gifUrl, setGifUrl] = useState("");
  const [showResource, setShowResource] = useState(false);
  const [showHand, setShowHand] = useState(true);
  const [resultHand, setResultHand] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const handleHand = () => {
    let counter = 0;
    let delay = 100;
    setResultHand(null);
    setGifUrl("");
    setIsRunning(true);

    const changeGif = () => {
      setGifUrl(counter % 2 === 0 ? backHand : foreHand);
      counter++;
      delay += 30;
      intervalRef.current = setTimeout(changeGif, delay);
    };

    intervalRef.current = setTimeout(changeGif, 1500);

    setTimeout(() => {
      clearTimeout(intervalRef.current);

      let result = Math.floor(Math.random() * GIFS.length);
      setGifUrl(GIFS[result]);
      setResultHand(+result);
      setIsRunning(false);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className={classes["div"]}>
      <div className={classes["switch-btns"]}>
        <button
          onClick={() => {
            setGifUrl("");
            setResultHand(null);
            setShowHand(true);
          }}
          className={classes["switch-btn"]}
          style={
            !showHand
              ? {}
              : {
                  backgroundColor: "whitesmoke",
                  fontWeight: "bold",
                  fontSize: "25px",
                }
          }
        >
          엎어라 뒤짚어라!
        </button>
        <button
          onClick={() => setShowHand(false)}
          className={classes["switch-btn"]}
          style={
            showHand
              ? {}
              : {
                  backgroundColor: "whitesmoke",
                  fontWeight: "bold",
                  fontSize: "25px",
                }
          }
        >
          주사위 던지기
        </button>
      </div>
      {/* 손바닥 화면..  */}
      {showHand && (
        <div className={classes["flex-column"]}>
          {/* 손바닥 손등 이미지 보이는 부분 */}
          <div className={classes["img"]}>
            {gifUrl && (
              <img className={classes["img"]} src={gifUrl} alt="hand" />
            )}
            {!gifUrl && (
              <span className={classes["score"]} style={{ fontSize: "40px" }}>
                손바닥? 손등? <br />
                어떤 게 나올까??
              </span>
            )}
          </div>
          {/* 게임 결과 손바닥? 손등? */}

          <div className={classes["score"]}>
            {resultHand === 1 ? "손바닥" : resultHand === 0 ? "손등" : ""}
          </div>

          {/* 게임시작 버튼 */}
          <button
            className={classes["roll-btn"]}
            onClick={handleHand}
            style={
              !isRunning
                ? { backgroundColor: "#b1d21e", pointerEvents: "auto" }
                : { pointerEvents: "none", backgroundColor: "lightgray" }
            }
          >
            게임시작!
          </button>

          <div
            style={{ color: "lightgray", cursor: "pointer" }}
            onClick={() => setShowResource((prev) => !prev)}
          >
            이미지출처
            <span
              style={showResource ? { display: "inline" } : { display: "none" }}
            >
              {" "}
              {" => "}
              <a href="https://kr.freepik.com/free-vector/playing-dice-3d-realistic-vector-white-cube-with-different-number-of-dots-from-1-to-6-for-casino-game-or-gambling-concept-six-sided-spot-dies-poker-and-backgammon-falling-craps-to-try-luck_73605796.htm#query=%EC%A3%BC%EC%82%AC%EC%9C%84&position=7&from_view=search&track=sph&uuid=12bd53d1-6223-4384-83e3-f282122f133d">
                주사위 이미지: 작가 upklyak
              </a>{" "}
              출처 Freepik{" "}
            </span>
            <span
              style={showResource ? { display: "inline" } : { display: "none" }}
            >
              {"/ "}손 이미지: 미리캔버스
            </span>
          </div>
        </div>
      )}

      {/* 주사위 화면 */}
      {!showHand && <DiceRandom />}
    </div>
  );
}

export default SimpleRandom;
