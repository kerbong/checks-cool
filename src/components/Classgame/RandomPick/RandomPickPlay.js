import React, { useState, useEffect } from "react";
import classes from "./RandomPick.module.css";

import Swal from "sweetalert2";
import StudentBtn from "components/Student/StudentBtn";

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

  const handleDraw = () => {
    setIsDrawing(true);
    setTimeout(() => {
      const shuffledUsers = shuffleArray(users);
      const numWinners = Math.min(shuffledUsers.length, props.pickStdNum); // 최대 3명까지 당첨
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
      const shuffledPrizes = shuffleArray(prizes);
      const matched = winners.map((winner, index) => ({
        winner,
        prize: shuffledPrizes[index] || "꽝💣",
      }));
      setMatchedWinners(matched);
      let title = matched
        .map(
          (win) =>
            `<div style="margin: 5px 20px; font-size: 1.8rem;">${
              win.winner + " 👉 " + win.prize
            }</div>`
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
        timer: 10000,
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

  return (
    <div>
      <button
        onClick={!isDrawing ? handleDraw : undefined}
        disabled={isDrawing || isMatching}
        className={isDrawing ? classes["playBtn-disabled"] : classes["playBtn"]}
      >
        {isDrawing ? "추첨 중..." : "추첨하기"}
      </button>
      {winners.length > 0 && (
        <div
          className={classes["div"]}
          style={{ width: "95vw", alignItems: "normal" }}
        >
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
                // <span key={index} className={classes["prize-btn"]}>
                //   {winner}
                // </span>
              ))}
            </div>

            <button
              onClick={!isMatching ? handleMatch : undefined}
              disabled={winners?.length === 0}
              className={
                isMatching ? classes["playBtn-disabled"] : classes["playBtn"]
              }
            >
              {isMatching ? "매칭 중..." : "매칭하기"}
            </button>
          </div>
          {matchedWinners.length > 0 && (
            <div className={classes["resultPrize"]}>
              <h2 className={classes["fs15"]}>당첨 결과 🎊</h2>
              <div
                className={`${classes["results"]} ${
                  isMatching ? `${classes["animate"]}` : ""
                }`}
              >
                {matchedWinners.map(({ winner, prize }, index) => (
                  <span key={index} className={classes["prize-btn"]}>
                    {winner} 👉 {prize}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RandomPickPlay;
