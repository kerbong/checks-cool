import React, { useEffect, useState } from "react";
import Input from "../Layout/Input";
import classes from "./ClassItem.module.css";
import dayjs from "dayjs";
import NotionClone from "components/Classgame/Crawling/NotionClone";

/** 타이틀(교시명시간만) 텍스트(수업내용만) 올(둘다) */
const SHOWWHAT = ["title", "text", "all"];

const ClassItem = (props) => {
  const [memoDefValue, setMemoDefValue] = useState("");
  const [hover, setHover] = useState(false);
  const [showCvChange, setShowCvChange] = useState(false);

  useEffect(() => {
    if (props.memo) {
      setMemoDefValue(props.memo);
    } else {
      setMemoDefValue("");
    }
  }, [props.memo]);

  /**노션클론에서 받아온, 뭔가 변함감지, 자동 저장하라고 신호 보내주기 */
  const changeHandler = () => {
    props.changeHandler();
  };

  /** 현재 복붙, 클릭한 시간! mainpage에 넘겨줌!  */
  const selectedClassHandler = () => {
    let clNum = props.classNum;
    let new_selectedClass = {
      classTime: clNum,
      classIndex: props.clIndex,
      subject: document.getElementById(`classSubject-${clNum}`)?.value?.trim(),
      memo: document.getElementById(`classMemo-${clNum}`)?.innerHTML,
    };
    props.classChHandler(new_selectedClass);
  };

  return (
    <>
      <li
        className={classes["li-section"]}
        key={props.myKey}
        style={
          props.showWhat === SHOWWHAT[1]
            ? {
                flexWrap: "wrap",
                borderRadius: "15px",
                padding: "10px",
                backgroundColor: "white",
                marginTop: "5px",
              }
            : {}
        }
      >
        {/* 클릭하면 보일.. hover 부분 버튼  */}
        {props.showWhat === SHOWWHAT[2] && (
          <div
            className={hover ? classes["hover"] : classes["hover-none"]}
            style={window.innerWidth > 1000 ? { width: "9%" } : {}}
          >
            <button onClick={selectedClassHandler} className={classes["btn"]}>
              복붙 / 교환
            </button>
            <br />
            <button onClick={() => setHover(false)} className={classes["btn"]}>
              취소
            </button>
          </div>
        )}

        {/*  교시명 + 교시 시간 */}
        {(props.showWhat === SHOWWHAT[2] || props.showWhat === SHOWWHAT[0]) && (
          <div
            className={classes["title-section"]}
            title="클릭해서 다른 날짜로 복붙 / 교환  이 가능합니다."
            onClick={() => setHover((prev) => !prev)}
            style={props.showWhat === SHOWWHAT[0] ? { width: "100%" } : {}}
          >
            {/* 교시이름 - 1교시 2교시... */}
            <div className={classes["title-bold"]}>{props.classNum}</div>
            {/* 시간표시 09:00~09:40 */}
            <div className={`${classes["fs-09"]} ${classes["time-div"]}`}>
              <div>
                {props?.classStart
                  ? `${dayjs(props?.classStart).format("HH:mm")}`
                  : ""}
              </div>
              <div>
                {!props?.classEnd
                  ? ` ~ ${dayjs(props?.classStart)
                      .add(40, "minute")
                      .format("HH:mm")}`
                  : ` ~ ${dayjs(props?.classEnd).format("HH:mm")}`}
              </div>
            </div>
          </div>
        )}

        {/* {props.showWhat === SHOWWHAT[1] && <hr style={{ margin: "10px" }} />} */}

        {/* 과목명 */}
        {(props.showWhat === SHOWWHAT[2] || props.showWhat === SHOWWHAT[1]) && (
          <>
            <div
              className={classes["class-section"]}
              style={
                props.showWhat === SHOWWHAT[1]
                  ? { width: "100%" }
                  : { display: "block" }
              }
            >
              {/* 교시이름 - 1교시 2교시... */}
              {props.showWhat === SHOWWHAT[1] && (
                <span
                  className={classes["title-bold"]}
                  style={{
                    fontWeight: "100",
                    paddingLeft: "10px",
                    fontSize: "0.8rem",
                  }}
                >
                  {props.classNum}
                </span>
              )}
              <Input
                input={{
                  id:
                    props.showWhat === SHOWWHAT[1]
                      ? `classSubject-${props.weekInd}${props.classNum}`
                      : `classSubject-${props.classNum}`,
                  style:
                    props.showWhat === SHOWWHAT[1]
                      ? { width: "45%", fontSize: "0.8rem" }
                      : {},
                }}
                showOn={true}
                startheight={props.showWhat === SHOWWHAT[1] ? "8px" : "29px"}
                key={
                  props.showWhat === SHOWWHAT[1]
                    ? `classSubject-${props.weekInd}${props.classNum}`
                    : `classSubject-${props.classNum}`
                }
                myKey={
                  props.showWhat === SHOWWHAT[1]
                    ? `classSubject-${props.weekInd}${props.classNum}`
                    : `classSubject-${props.classNum}`
                }
                className={"class-subject"}
                defaultValue={props.subject || ""}
              />
            </div>

            {props.showWhat === SHOWWHAT[1] && (
              <>
                <br />
              </>
            )}

            {/* 수업내용 */}
            <div
              className={classes["classNote-section"]}
              style={props.showWhat === SHOWWHAT[1] ? { width: "100%" } : {}}
            >
              <NotionClone
                id={
                  props.showWhat === SHOWWHAT[1]
                    ? `classMemo-${props.weekInd}${props.classNum}`
                    : `classMemo-${props.classNum}`
                }
                myKey={
                  props.showWhat === SHOWWHAT[1]
                    ? `classMemo-${props.weekInd}${props.classNum}`
                    : `classMemo-${props.classNum}`
                }
                className={"class-memo"}
                defaultValue={memoDefValue}
                changeHandler={changeHandler}
                minSize={props.showWhat === SHOWWHAT[1] ? true : false}
              />
            </div>
          </>
        )}
      </li>
    </>
  );
};

export default ClassItem;
