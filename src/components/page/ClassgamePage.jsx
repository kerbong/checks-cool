import React, { useState } from "react";
import Button from "../Layout/Button";
import SettingSeat from "../Classgame/SettingSeat/SettingSeat";
import classes from "../Classgame/SettingSeat/SettingSeat.module.css";

const ClassgamePage = (props) => {
  const [gemgemMenu, setGemgemMenu] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");

  return (
    <>
      <div id="title-div">
        <button id="title-btn" className="todo">
          {/* onClick={exampleHandler}>/ */}
          {selectedMenu === "settingSeat" && (
            <>
              <i className="fa-regular fa-square-check"></i> 자리뽑기
            </>
          )}
          {selectedMenu === "" && (
            <>
              <i className="fa-solid fa-gamepad"></i>
              잼잼
            </>
          )}
          {/* {showChecklists && (
            <>
              {">"}
              <i className="fa-solid fa-clipboard-check"></i> 냄/안냄
            </>
          )}
          {showAchives && (
            <>
              {">"}
              <i className="fa-solid fa-clipboard-list"></i> 개별기록
            </>
          )} */}
        </button>
      </div>

      {selectedMenu === "" && (
        <div className={classes["gameMenu-btn"]}>
          <Button
            name={"자리뽑기"}
            className={"settingSeat"}
            onclick={() => setSelectedMenu("settingSeat")}
          />
          <p className={classes["gameMenu"]}>
            {" "}
            고민이 많아요... 사용하고 싶은 기능들을 추천해주세요! 심사숙고 후에
            빠르게 개발해보겠습니다! 👉 kerbong@gmail.com{" "}
          </p>
        </div>
      )}

      {selectedMenu === "settingSeat" && (
        <SettingSeat students={props.students} userUid={props.userUid} />
      )}
    </>
  );
};

export default ClassgamePage;
