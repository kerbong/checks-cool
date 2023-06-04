import React, { useState, useEffect } from "react";
import Button from "../Layout/Button";
import classes from "../Classgame/SettingSeat/SettingSeat.module.css";
import TitleBtn from "components/Memo/TitleBtn";

import SettingSeat from "../Classgame/SettingSeat/SettingSeat";
import RandomPick from "../Classgame/RandomPick/RandomPick";
import Alarm from "components/Classgame/AlarmNotice/Alarm";
import PadIt from "components/page/PadIt";

const ClassgamePage = (props) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  //알림장 세팅
  const [showAlarm, setShowAlarm] = useState(false);

  const SHOW_WHAT = ["settingSeat", "randomPick", "alarm", "padIt"];

  const MENU_NAME = ["자리<br/>뽑기", "뽑기", "알림장", "패드잇"];

  const ICONS = [
    <i className="fa-sharp fa-solid fa-chair"></i>,
    <i className="fa-solid fa-shuffle"></i>,
    <i className="fa-solid fa-chalkboard"></i>,
    <i className="fa-regular fa-copy"></i>,
  ];

  return (
    <>
      {showAlarm ? (
        <Alarm alarmClose={() => setShowAlarm(false)} userUid={props.userUid} />
      ) : (
        <div>
          <div id="title-div">
            <button id="title-btn" className="">
              {/* onClick={exampleHandler}>/ */}
              {selectedMenu === "settingSeat" && <>{ICONS[0]} 자리뽑기</>}
              {selectedMenu === "randomPick" && <>{ICONS[1]} 랜덤뽑기</>}
              {selectedMenu === "alarm" && <>{ICONS[2]} 알림장</>}
              {selectedMenu === "padIt" && <>{ICONS[3]} 패드잇</>}
              {selectedMenu === "" && (
                <>
                  <i className="fa-solid fa-gamepad"></i> 제자랑
                </>
              )}
            </button>

            <div className={classes["title-btns"]}>
              {/* 메뉴 선택하는 버튼들 */}
              {SHOW_WHAT?.map((what, index) => (
                <TitleBtn
                  setShowWhatMemo={() => {
                    setSelectedMenu(what);
                  }}
                  key={what}
                  icon={ICONS[index]}
                  what={what}
                  menu_name={MENU_NAME[index]}
                />
              ))}
            </div>
          </div>

          {/* 잼잼 첫 화면 큰 녹색 버튼 모음 */}
          {selectedMenu === "" && (
            <div className={classes["gameMenu-btn"]}>
              <Button
                name={"자리뽑기"}
                className={"settingSeat"}
                onclick={() => setSelectedMenu("settingSeat")}
              />

              <Button
                name={"랜덤뽑기"}
                className={"settingSeat"}
                onclick={() => setSelectedMenu("randomPick")}
              />

              <Button
                name={"타이머"}
                className={"settingSeat"}
                onclick={() =>
                  window.open(
                    "https://bit.ly/%EC%8B%AC%ED%94%8C%ED%83%80%EC%9D%B4%EB%A8%B8"
                  )
                }
              />

              <Button
                name={"알림장"}
                className={"settingSeat"}
                onclick={() => setShowAlarm(true)}
              />

              <Button
                name={"타임캡슐"}
                className={"settingSeat"}
                onclick={() =>
                  window.open(
                    "https://bit.ly/%EB%91%90%EA%B7%BC%EB%91%90%EA%B7%BC%ED%83%80%EC%9E%84%EC%BA%A1%EC%8A%90"
                  )
                }
              />

              <Button
                name={"패드잇"}
                className={"settingSeat"}
                onclick={() => setSelectedMenu("padIt")}
              />

              <p>타임캡슐 주소 👉 bit.ly/두근두근타임캡슐</p>
              <p>타이머 주소 👉 bit.ly/심플타이머</p>
              <p>
                타임캡슐 비밀번호{" "}
                <span style={{ color: "white" }}>from-indi</span> (왼쪽을
                마우스로 드래그 해주세요!){" "}
              </p>
            </div>
          )}

          <div className={classes["container-div"]}>
            {selectedMenu === "settingSeat" && (
              <SettingSeat students={props.students} userUid={props.userUid} />
            )}
            {selectedMenu === "randomPick" && (
              <RandomPick students={props.students} userUid={props.userUid} />
            )}
            {selectedMenu === "alarm" && (
              <Alarm
                alarmClose={() => setSelectedMenu("")}
                userUid={props.userUid}
              />
            )}
            {selectedMenu === "padIt" && (
              <PadIt userUid={props.userUid} students={props.students} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ClassgamePage;
