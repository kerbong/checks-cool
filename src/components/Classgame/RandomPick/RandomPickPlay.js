import React, { useState, useEffect } from "react";
import classes from "./RandomPick.module.css";

import Swal from "sweetalert2";
import StudentBtn from "components/Student/StudentBtn";
import html2canvas from "html2canvas";
import { FaRegImage } from "react-icons/fa6";

const RandomPickPlay = (props) => {
  const [winners, setWinners] = useState([]);
  const [prizes, setPrizes] = useState(props.prizes);
  const [matchedWinners, setMatchedWinners] = useState([]);
  const [users, setUsers] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (!props.users) return;
    let new_users = props.users.map((userObj) => {
      let user = userObj.num + " " + userObj.name;
      return user;
    });
    setUsers(new_users);
  }, [props.users]);

  /** 선택 학생수보다 상목록의 수가 적을 경우에만 실행! */
  const handleDraw = () => {
    setIsDrawing(true);
    setTimeout(() => {
      const shuffledUsers = shuffleArray(users);
      const numWinners = prizes?.length; // 최대 3명까지 당첨
      const selectedWinners = shuffledUsers.slice(0, numWinners);
      setWinners(selectedWinners);
      let title = selectedWinners
        .map(
          (win) =>
            `<span style="margin: 5px 15px; font-size: 1.8rem;">${win}</span>`
        )
        .join("");
      Swal.fire({
        title: `${title}`,
        width: 800,
        padding: "3em",
        color: "#312b76",
        background: `#fff`,
        backdrop: `
          #00087ba1
              left top
              no-repeat
            `,
        timer: 5000,
      });
    }, 3000);
  };

  const handleMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      let title;
      // 품목 뽑기인 경우
      if (props.init !== "order") {
        const shuffledPrizes = shuffleArray(prizes);
        const matched_winners =
          winners?.length > 0
            ? winners
            : shuffleArray(users).slice(0, prizes?.length);

        const matched = matched_winners?.map((winner, index) => ({
          winner,
          prize: shuffledPrizes[index] || "꽝💣",
        }));
        setMatchedWinners(matched);
        title = matched
          .map(
            (win) =>
              `<div style="margin: 5px 20px; font-size: 1.8rem;">${
                win.winner + " 👉 " + win.prize
              }</div>`
          )
          .join("");
        // 순서뽑기인 경우
      } else {
        const matched_winners = shuffleArray(users).slice(0, users?.length);

        const matched = matched_winners?.map((winner, index) => ({
          winner: winner?.split(" ")[1],
          prize: index + 1,
        }));
        setMatchedWinners(matched);
        title = matched
          .map(
            (win) =>
              `<span style="margin: 5px 25px; font-size: 1.8rem; padding: 0 8px; width: auto">${
                win.prize + ") " + win.winner
              }</span>`
          )
          .join("");
      }

      Swal.fire({
        title: `<div style="display: flex; flex-wrap: wrap">${title}</div>`,
        width: 1200,
        padding: "3em",
        color: "#312b76",
        background: `#fff`,
        backdrop: `
          #00087ba1
              left top
              no-repeat
            `,
        timer: 20000,
      });
    }, 3000);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  /** 캡처함수 */
  const captureHandler = () => {
    const section = document.getElementById("capture");
    if (!section) {
      return console.log("캡처 실패, 영역이 존재하지 않음");
    }
    html2canvas(section).then((canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = canvas.toDataURL("image/png");
      link.download = "뽑기 결과 캡처.png";
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div style={{ width: "100%" }}>
      {/* 순서뽑기 부분 로직 */}
      {props.init === "order" && (
        <div
          className={classes["div"]}
          style={{ maxWidth: "100%", alignItems: "normal" }}
        >
          {matchedWinners.length === 0 && (
            <button
              onClick={() => {
                if (!isMatching) {
                  handleMatch();
                }
              }}
              className={
                isMatching
                  ? classes["playBtn-disabled"]
                  : classes["optionDone-btn"]
              }
            >
              {isMatching ? "순서 뽑기 중..." : "순서 뽑기"}
            </button>
          )}
          {matchedWinners.length > 0 && (
            <div className={classes["resultPrize"]} id="capture">
              <h2 className={classes["fs15"]} style={{ position: "relative" }}>
                순서 뽑기 결과 🎊{/* 캡처 버튼 만들기 */}
                <span
                  title="뽑기 결과 캡처하기"
                  className={classes["capture"]}
                  onClick={captureHandler}
                >
                  <FaRegImage />
                </span>
              </h2>
              <div
                className={`${classes["results"]} ${
                  isMatching ? `${classes["animate"]}` : ""
                }`}
              >
                {matchedWinners.map(({ winner, prize }, index) => (
                  <span
                    key={index}
                    className={classes["prize-btn"]}
                    style={{ margin: "10px 5px" }}
                  >
                    {prize + ") " + winner}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 상보다 사람이 많으면, 사람 추첨하기 */}
      {props.init === "something" &&
        prizes.length < users?.length &&
        winners?.length === 0 && (
          <button
            onClick={!isDrawing ? handleDraw : undefined}
            disabled={isDrawing || isMatching}
            className={
              isDrawing ? classes["playBtn-disabled"] : classes["playBtn"]
            }
          >
            {isDrawing ? "학생 뽑는 중..." : "당첨될 학생 뽑기"}
          </button>
        )}

      {/* 최종 품목 뽑기 */}
      {props.init === "something" &&
        (prizes.length === users?.length || winners.length > 0) && (
          <div
            className={classes["div"]}
            style={{ maxWidth: "100%", alignItems: "normal" }}
          >
            {winners.length > 0 && (
              <div className={classes["resultStd"]}>
                <h2 className={classes["fs15"]}>당첨자 🎉</h2>
                <div
                  className={`${classes["results"]} ${
                    isDrawing ? `${classes["animate"]}` : ""
                  }`}
                >
                  {winners.map((winner, index) => (
                    <StudentBtn
                      className={"checklist-student"}
                      name={winner.split(" ")[1]}
                      key={index}
                      woman={
                        props.users?.filter(
                          (user) => user.name === winner.split(" ")[1]
                        )?.[0]?.woman
                      }
                      num={winner.split(" ")[0]}
                    />
                  ))}
                </div>
              </div>
            )}
            {matchedWinners.length === 0 && (
              <button
                onClick={() => {
                  if (!isMatching) {
                    handleMatch();
                  }
                }}
                className={
                  isMatching
                    ? classes["playBtn-disabled"]
                    : classes["optionDone-btn"]
                }
              >
                {isMatching ? "품목 뽑기 중..." : "품목 뽑기"}
              </button>
            )}
            {matchedWinners.length > 0 && (
              <div className={classes["resultPrize"]} id="capture">
                <h2
                  className={classes["fs15"]}
                  style={{ position: "relative" }}
                >
                  뽑기 결과 🎊
                  {/* 캡처 버튼 만들기 */}
                  <span
                    title="뽑기 결과 캡처하기"
                    className={classes["capture"]}
                    onClick={captureHandler}
                  >
                    <FaRegImage />
                  </span>
                </h2>
                <div
                  className={`${classes["results"]} ${
                    isMatching ? `${classes["animate"]}` : ""
                  }`}
                >
                  {matchedWinners.map(({ winner, prize }, index) => (
                    <span
                      key={index}
                      className={classes["prize-btn"]}
                      style={{ margin: "10px 5px" }}
                    >
                      {winner} 👉 {prize}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      {/* 최종 품목 뽑은 후, 처음화면으로 돌아가기 버튼 */}
      {matchedWinners.length > 0 && (
        <button
          className={classes["optionDone-btn"]}
          onClick={() => props.backToBasic()}
        >
          처음으로 돌아가기
        </button>
      )}
    </div>
  );
};

export default RandomPickPlay;
