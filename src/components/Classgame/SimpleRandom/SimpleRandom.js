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
          엎어라 뒤집어라!
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
            이미지출처 및 참고
            <span
              style={showResource ? { display: "inline" } : { display: "none" }}
            >
              {" "}
              <br />
              Copyright (c) 2023 by Ksenia Kondrashova
              (https://codepen.io/ksenia-k/pen/QWZVvxm) Permission is hereby
              granted, free of charge, to any person obtaining a copy of this
              software and associated documentation files (the "Software"), to
              deal in the Software without restriction, including without
              limitation the rights to use, copy, modify, merge, publish,
              distribute, sublicense, and/or sell copies of the Software, and to
              permit persons to whom the Software is furnished to do so, subject
              to the following conditions: The above copyright notice and this
              permission notice shall be included in all copies or substantial
              portions of the Software. THE SOFTWARE IS PROVIDED "AS IS",
              WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
              NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
              OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
              OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
              OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </span>
            <br />
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
