import React, { useState, useEffect } from "react";
import Button from "../Layout/Button";
import classes from "../Classgame/SettingSeat/SettingSeat.module.css";
import Simsim from "../Classgame/Simsim/Simsim";
import Mission from "../Classgame/Mission/Mission";
import Doit from "../Classgame/Doit/Doit";
import { useLocation } from "react-router-dom";
import TitleBtn from "components/Memo/TitleBtn";
import HwpControl from "components/Classgame/Crawling/HwpControl";
import dayjs from "dayjs";

// import AssistanceAi from "components/Classgame/AssistanceAi/AssistanceAi";
// import Crawling from "components/Classgame/Crawling/Crawling";
// import NotionClone from "components/Classgame/Crawling/NotionClone";
// import SpeechToText from "components/Main/SpeechToText";

const WeTeacher = (props) => {
  const { state } = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("");

  const SHOW_WHAT = ["simsim", "mission", "doThis", "ai"];

  const MENU_NAME = [
    "심심<br/>해요",
    "아침<br/>한마디",
    "이거<br/>해요",
    "현장<br/>체험",
  ];

  const ICONS = [
    <i className="fa-solid fa-face-meh" style={{ fontSize: "1em" }}></i>,
    <i className="fa-solid fa-mug-saucer" style={{ fontSize: "1em" }}></i>,
    <i className="fa-solid fa-thumbs-up" style={{ fontSize: "1em" }}></i>,
    <i className="fa-solid fa-robot" style={{ fontSize: "1em" }}></i>,
  ];

  useEffect(() => {
    if (state === "main") {
      setSelectedMenu("simsim");
    } else if (state === "morning") {
      setSelectedMenu("mission");
    }
  }, [state]);

  //현재 학년도 정보 반환하는 함수
  const now_year = () => {
    return +dayjs().format("MM") <= 1
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  return (
    <>
      <div>
        <div id="title-div">
          <button id="title-btn" className="">
            {/* onClick={exampleHandler}>/ */}
            {selectedMenu === "" && (
              <>
                <i
                  className="fa-solid fa-cookie-bite"
                  style={{ fontSize: "1em" }}
                ></i>{" "}
                교사랑
              </>
            )}
            {selectedMenu === "simsim" && <>{ICONS[0]} 심심해요</>}
            {selectedMenu === "mission" && <>{ICONS[1]} 아침한마디</>}
            {selectedMenu === "doThis" && <>{ICONS[2]} 이거해요 </>}
            {selectedMenu === "ai" && <>{ICONS[3]} 현장체험 </>}
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
              name={"현장체험"}
              className={"settingSeat"}
              onclick={() => setSelectedMenu("ai")}
            />
            <Button
              name={"분반해요"}
              className={"settingSeat"}
              onclick={() =>
                window.open(
                  "https://bit.ly/%EB%B6%84%EB%B0%98%ED%95%B4%EC%9A%94"
                )
              }
            />
            {/* <SpeechToText /> */}

            <p>분반해요 주소 👉 bit.ly/분반해요</p>
          </div>
        )}

        <div className={classes["container-div"]} style={{ marginTop: "-5px" }}>
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
            <HwpControl
              userUid={props.userUid}
              students={props.students}
              isSubject={
                props?.isSubject?.filter(
                  (yearData) => Object.keys(yearData)[0] === now_year()
                )?.[0]?.[now_year()]
              }
              email={props.email}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default WeTeacher;
