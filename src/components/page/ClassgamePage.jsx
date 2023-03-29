import React, { useState, useEffect } from "react";
import Button from "../Layout/Button";
import classes from "../Classgame/SettingSeat/SettingSeat.module.css";
import SettingSeat from "../Classgame/SettingSeat/SettingSeat";
import { useLocation } from "react-router-dom";
import TitleBtn from "components/Memo/TitleBtn";
import Alarm from "components/Classgame/AlarmNotice/Alarm";

const ClassgamePage = (props) => {
  const { state } = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("");
  //알림장 세팅
  const [showAlarm, setShowAlarm] = useState(false);

  const SHOW_WHAT = ["settingSeat", "alarm"];

  const MENU_NAME = ["자리<br/>뽑기", "알림장"];

  const ICONS = [
    <i className="fa-sharp fa-solid fa-chair"></i>,
    <i className="fa-solid fa-chalkboard"></i>,
  ];

  useEffect(() => {
    if (state === "main") {
      setSelectedMenu("simsim");
    } else if (state === "morning") {
      setSelectedMenu("mission");
    }
  }, [state]);

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
              {selectedMenu === "alarm" && <>{ICONS[1]} 알림장</>}
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
                name={"알림장"}
                className={"settingSeat"}
                onclick={() => setShowAlarm(true)}
              />
            </div>
          )}

          <div className={classes["container-div"]}>
            {selectedMenu === "settingSeat" && (
              <SettingSeat students={props.students} userUid={props.userUid} />
            )}
            {selectedMenu === "alarm" && (
              <Alarm
                alarmClose={() => setSelectedMenu("")}
                userUid={props.userUid}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ClassgamePage;
