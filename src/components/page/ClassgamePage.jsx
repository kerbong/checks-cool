import React, { useState } from "react";
import Button from "../Layout/Button";
import SettingSeat from "../Classgame/SettingSeat/SettingSeat";
import classes from "../Classgame/SettingSeat/SettingSeat.module.css";
import Simsim from "../Classgame/Simsim/Simsim";

const ClassgamePage = (props) => {
  const [gemgemMenu, setGemgemMenu] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");

  return (
    <>
      <div id="title-div">
        <button id="title-btn" className="">
          {/* onClick={exampleHandler}>/ */}
          {selectedMenu === "settingSeat" && (
            <>
              <i className="fa-regular fa-square-check"></i> 자리뽑기
            </>
          )}
          {selectedMenu === "" && (
            <>
              <i className="fa-solid fa-gamepad"></i> 잼잼
            </>
          )}
          {selectedMenu === "simsim" && (
            <>
              <i className="fa-regular fa-square-check"></i> 심심해요
            </>
          )}
        </button>

        {/* 추가하기 버튼 */}

        {/*  )} */}
      </div>

      {selectedMenu === "" && (
        <div className={classes["gameMenu-btn"]}>
          <Button
            name={"자리뽑기"}
            className={"settingSeat"}
            onclick={() => setSelectedMenu("settingSeat")}
          />
          <Button
            name={"심심해요"}
            className={"settingSeat"}
            onclick={() => setSelectedMenu("simsim")}
          />
          <p className={classes["gameMenu"]}>
            {" "}
            고민이 많아요... 사용하고 싶은 기능들을 추천해주세요! 심사숙고 후에
            빠르게 개발해보겠습니다! 👉 kerbong@gmail.com{" "}
          </p>
        </div>
      )}

      <div className={classes["container-div"]}>
        {selectedMenu === "settingSeat" && (
          <SettingSeat students={props.students} userUid={props.userUid} />
        )}

        {selectedMenu === "simsim" && <Simsim userUid={props.userUid} />}
      </div>
    </>
  );
};

export default ClassgamePage;
