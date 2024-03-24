import React, { useState, useEffect } from "react";
import Button from "../Layout/Button";
import classes from "../Classgame/SettingSeat/SettingSeat.module.css";
import Simsim from "../Classgame/Simsim/Simsim";
import Mission from "../Classgame/Mission/Mission";
import Doit from "../Classgame/Doit/Doit";
import { useLocation, useNavigate } from "react-router-dom";
import TitleBtn from "components/Memo/TitleBtn";
import HwpControl from "components/Classgame/Crawling/HwpControl";
import dayjs from "dayjs";
import {
  FaCookieBite,
  FaMugSaucer,
  FaPeopleArrows,
  FaRobot,
  FaStar,
  FaThumbsUp,
} from "react-icons/fa6";

// import AssistanceAi from "components/Classgame/AssistanceAi/AssistanceAi";
// import Crawling from "components/Classgame/Crawling/Crawling";
// import NotionClone from "components/Classgame/Crawling/NotionClone";
// import SpeechToText from "components/Main/SpeechToText";

const WeTeacher = (props) => {
  const { state } = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("");

  let navigate = useNavigate();
  const SHOW_WHAT = ["simsim", "mission", "doThis", "ai"];

  const MENU_NAME = [
    "추천<br/>해요",
    "아침<br/>한마디",
    "이거<br/>해요",
    "현장<br/>체험",
  ];

  const ICONS = [
    <FaStar color="#000000bd" />,
    <FaMugSaucer color="#000000bd" />,
    <FaThumbsUp color="#000000bd" />,
    <FaRobot color="#000000bd" />,
  ];

  const ICONS_LEFT = [
    <div className={classes["iconLeft"]}>
      <FaStar color="#f2ffd8" />{" "}
    </div>,
    <div className={classes["iconLeft"]}>
      <FaMugSaucer color="#f2ffd8" />{" "}
    </div>,
    <div className={classes["iconLeft"]}>
      <FaThumbsUp color="#f2ffd8" />{" "}
    </div>,
    <div className={classes["iconLeft"]}>
      <FaRobot color="#f2ffd8" />{" "}
    </div>,
    <div className={classes["iconLeft"]}>
      <FaPeopleArrows color="#f2ffd8" />{" "}
    </div>,
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
    return dayjs().format("MM-DD") <= "02-15"
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  useEffect(() => {
    if (props.isClub === "" || props.isClub === "main") return;
    //동아리 버전 사용에서는.. 초기화면으로 보내기!
    navigate("/");
  }, [props.isClub]);

  return (
    <>
      <div>
        <div id="title-div">
          <button id="title-btn" className="">
            {/* onClick={exampleHandler}>/ */}
            {selectedMenu === "" && (
              <>
                <FaCookieBite /> 교사랑
              </>
            )}
            {selectedMenu === "simsim" && <>{ICONS[0]} 추천해요</>}
            {selectedMenu === "mission" && <>{ICONS[1]} 아침한마디</>}
            {selectedMenu === "doThis" && <>{ICONS[2]} 이거해요 </>}
            {selectedMenu === "ai" && <>{ICONS[3]} 현장체험 </>}
          </button>

          <div
            className={classes["title-btns"]}
            style={selectedMenu === "" ? { visibility: "hidden" } : {}}
          >
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
          <>
            <div className={classes["gameMenu-btn"]}>
              <Button
                name={"추천해요"}
                className={"settingSeatSelect"}
                onclick={() => setSelectedMenu("simsim")}
                icon={ICONS_LEFT[0]}
              />
              <Button
                name={"아침한마디"}
                className={"settingSeatSelect"}
                onclick={() => setSelectedMenu("mission")}
                icon={ICONS_LEFT[1]}
              />
              <Button
                name={"이거해요"}
                className={"settingSeatSelect"}
                onclick={() => setSelectedMenu("doThis")}
                icon={ICONS_LEFT[2]}
              />
              <Button
                name={"현장체험"}
                className={"settingSeatSelect"}
                onclick={() => setSelectedMenu("ai")}
                icon={ICONS_LEFT[3]}
              />
              <Button
                name={"분반해요"}
                className={"settingSeatSelect"}
                onclick={() =>
                  window.open(
                    "https://bit.ly/%EB%B6%84%EB%B0%98%ED%95%B4%EC%9A%94"
                  )
                }
                icon={ICONS_LEFT[4]}
              />
              {/* <SpeechToText /> */}
            </div>
            <p>분반해요 주소 👉 bit.ly/분반해요</p>{" "}
          </>
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
