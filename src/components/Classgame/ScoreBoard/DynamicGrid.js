import React, { useState, useEffect } from "react";
import classes from "./ScoreBoard.module.css";

function DynamicGrid(props) {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(6);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    setRows(props.rows);
  }, [props.rows]);

  useEffect(() => {
    setColumns(props.columns);
  }, [props.columns]);

  /** 걸린 초들을 모두 더해서 분 초로 나타내는 함수 */
  function calculateTime(total, arr) {
    // 초 단위의 숫자들을 더합니다.

    let totalSeconds;
    if (total) {
      totalSeconds = arr.reduce((total, current) => total + current, 0);
    } else {
      totalSeconds = arr;
    }

    // 분과 초로 변환합니다.
    const getMinutes = `0${Math.floor((totalSeconds / 6000) % 60)}`.slice(-2);
    const getSeconds = `0${Math.floor((totalSeconds / 100) % 60)}`.slice(-2);
    const getCentiseconds = `0${totalSeconds % 100}`.slice(-2);

    if (!totalSeconds && !total) return ``;

    // 결과를 문자열로 반환합니다.
    return `${getMinutes}:${getSeconds}:${getCentiseconds}`;
  }

  useEffect(() => {
    const newGrid = [];
    for (let i = 0; i < rows + 1; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        let returnHtml;
        if (rows !== i) {
          returnHtml = (
            <div
              className={classes["grid-item"]}
              key={j}
              style={{ width: `calc(90vw / ${props.datas?.length})` }}
            >
              {props.scoreWay !== "stopWatch" && props.datas?.[j]?.scores?.[i]}

              {props.scoreWay === "stopWatch" && (
                <>{calculateTime(false, props.datas?.[j]?.scores?.[i])}</>
              )}
            </div>
          );
          //   마지막 총점 보여줄 부분
        } else {
          returnHtml = (
            <div
              className={classes["grid-item"]}
              style={{
                fontSize: "27px",
                padding: "10px 0",
                width: `calc(90vw / ${props.datas?.length})`,
                backgroundColor: "#f0f0f0",
              }}
              key={j}
            >
              {/* 점수추가 / 타이머 방식이면 */}
              {(props.scoreWay === "addScore" ||
                props.scoreWay === "timer") && (
                <>
                  총{" "}
                  {props.datas?.[j]?.scores?.reduce(
                    (total, current) => total + current,
                    0
                  )}
                  점
                </>
              )}
              {/* 스톱워치 - 미션완료에 걸린 시간- 방식이면 */}
              {props.scoreWay === "stopWatch" && (
                <> {calculateTime(true, props.datas?.[j]?.scores)}</>
              )}
            </div>
          );
        }
        row.push(returnHtml);
      }
      newGrid.push(
        <div className={classes["grid-row"]} key={i}>
          {row}
        </div>
      );
    }

    setGrid(newGrid);
  }, [rows, columns, props.datas]);

  return <div className={classes["grid-container"]}>{grid}</div>;
}

export default DynamicGrid;
