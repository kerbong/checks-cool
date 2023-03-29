import React, { useState, useEffect } from "react";
import Button from "../Layout/Button";
import classes from "../Classgame/SettingSeat/SettingSeat.module.css";
import Simsim from "../Classgame/Simsim/Simsim";
import Mission from "../Classgame/Mission/Mission";
import Doit from "../Classgame/Doit/Doit";
import { useLocation } from "react-router-dom";
import TitleBtn from "components/Memo/TitleBtn";
import AssistanceAi from "components/Classgame/AssistanceAi/AssistanceAi";

const WeTeacher = (props) => {
  const { state } = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("");

  const SHOW_WHAT = ["simsim", "mission", "doThis", "ai"];

  const MENU_NAME = [
    "심심<br/>해요",
    "아침<br/>한마디",
    "이거<br/>해요",
    "헤이<br/>비서",
  ];

  const ICONS = [
    <i className="fa-solid fa-face-meh"></i>,
    <i className="fa-solid fa-mug-saucer"></i>,
    <i className="fa-solid fa-thumbs-up"></i>,
    <i className="fa-solid fa-robot"></i>,
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
      <div>
        <div id="title-div">
          <button id="title-btn" className="">
            {/* onClick={exampleHandler}>/ */}
            {selectedMenu === "" && (
              <>
                <i className="fa-solid fa-cookie-bite"></i> 교사랑
              </>
            )}
            {selectedMenu === "simsim" && <>{ICONS[0]} 심심해요</>}
            {selectedMenu === "mission" && <>{ICONS[1]} 아침한마디</>}
            {selectedMenu === "doThis" && <>{ICONS[2]} 이거해요 </>}
            {selectedMenu === "ai" && <>{ICONS[3]} 헤이비서 </>}
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
              name={"비서"}
              className={"settingSeat"}
              onclick={() => setSelectedMenu("ai")}
            />
          </div>
        )}

        <div className={classes["container-div"]}>
          {selectedMenu === "simsim" && <Simsim userUid={props.userUid} />}

          {selectedMenu === "mission" && <Mission userUid={props.userUid} />}

          {selectedMenu === "doThis" && (
            <Doit
              userUid={props.userUid}
              nickName={props.nickName}
              email={props.email}
            />
          )}

          {selectedMenu === "ai" && (
            <AssistanceAi userUid={props.userUid} nickName={props.nickName} />
          )}
        </div>
      </div>
    </>
  );
};

export default WeTeacher;
