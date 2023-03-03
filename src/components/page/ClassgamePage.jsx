import React, { useState, useEffect } from "react";
import Button from "../Layout/Button";
import classes from "../Classgame/SettingSeat/SettingSeat.module.css";
import SettingSeat from "../Classgame/SettingSeat/SettingSeat";
import Simsim from "../Classgame/Simsim/Simsim";
import Mission from "../Classgame/Mission/Mission";
import Doit from "../Classgame/Doit/Doit";
import { useLocation } from "react-router-dom";
import TitleBtn from "components/Memo/TitleBtn";
import Alarm from "components/Classgame/AlarmNotice/Alarm";

const ClassgamePage = (props) => {
  const { state } = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("");
  //알림장 세팅
  const [showAlarm, setShowAlarm] = useState(false);

  const SHOW_WHAT = ["settingSeat", "simsim", "mission", "doThis"];

  const MENU_NAME = [
    "자리<br/>뽑기",
    "심심<br/>해요",
    "아침<br/>한마디",
    "이거<br/>해요",
  ];

  const ICONS = [
    <i className="fa-sharp fa-solid fa-chair"></i>,
    <i className="fa-solid fa-face-meh"></i>,
    <i className="fa-solid fa-mug-saucer"></i>,
    <i className="fa-solid fa-thumbs-up"></i>,
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
        <Alarm alarmClose={() => setShowAlarm(false)} />
      ) : (
        <div>
          <div id="title-div">
            <button id="title-btn" className="">
              {/* onClick={exampleHandler}>/ */}
              {selectedMenu === "settingSeat" && <>{ICONS[0]}자리뽑기</>}
              {selectedMenu === "" && (
                <>
                  <i className="fa-solid fa-gamepad"></i> 잼잼
                </>
              )}
              {selectedMenu === "simsim" && <>{ICONS[1]} 심심해요</>}
              {selectedMenu === "mission" && <>{ICONS[2]}아침한마디</>}
              {selectedMenu === "doThis" && <>{ICONS[3]} 이거해요</>}
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
                name={"심심해요"}
                className={"settingSeat"}
                onclick={() => setSelectedMenu("simsim")}
              />
              <Button
                name={"아침한마디"}
                className={"settingSeat"}
                onclick={() => setSelectedMenu("mission")}
              />
              <Button
                name={"이거해요"}
                className={"settingSeat"}
                onclick={() => setSelectedMenu("doThis")}
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

            {selectedMenu === "simsim" && <Simsim userUid={props.userUid} />}

            {selectedMenu === "mission" && <Mission userUid={props.userUid} />}

            {selectedMenu === "doThis" && (
              <Doit
                userUid={props.userUid}
                nickName={props.nickName}
                email={props.email}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ClassgamePage;
