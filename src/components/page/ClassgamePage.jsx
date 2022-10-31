import React, { useState } from "react";
import Button from "../Layout/Button";
import SettingSeat from "../Classgame/SettingSeat/SettingSeat";

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
        <Button
          name={"자리뽑기"}
          onclick={() => setSelectedMenu("settingSeat")}
        />
      )}

      {selectedMenu === "settingSeat" && <SettingSeat />}
    </>
  );
};

export default ClassgamePage;
