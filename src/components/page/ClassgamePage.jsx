import React, { useState } from "react";
import Button from "../Layout/Button";
import classes from "../Classgame/SettingSeat/SettingSeat.module.css";
import TitleBtn from "components/Memo/TitleBtn";

import { useNavigate } from "react-router-dom";
import SettingSeat from "../Classgame/SettingSeat/SettingSeat";
import RandomPick from "../Classgame/RandomPick/RandomPick";

import PadIt from "components/page/PadIt";
import {
  FaCapsules,
  FaChair,
  FaChalkboard,
  FaCopy,
  FaDice,
  FaGamepad,
  FaHourglassStart,
  FaMedal,
  FaRegCopy,
  FaShuffle,
  FaStopwatch,
  FaUsersRectangle,
} from "react-icons/fa6";

const ClassgamePage = (props) => {
  const [selectedMenu, setSelectedMenu] = useState("");

  const SHOW_WHAT = ["settingSeat", "randomPick", "alarm", "padIt"];

  const MENU_NAME = ["자리<br/>뽑기", "뽑기", "알림장", "패드잇"];

  let navigate = useNavigate();

  const ICONS = [
    <FaChair color="#000000bd" />,
    <FaShuffle color="#000000bd" />,
    <FaChalkboard color="#000000bd" />,
    <FaRegCopy color="#000000bd" />,
  ];

  const ICONS_LEFT = [
    <div className={classes["iconLeft"]}>
      <FaChair color="#f2ffd8" />
    </div>,
    <div className={classes["iconLeft"]}>
      <FaShuffle color="#f2ffd8" />
    </div>,
    <div className={classes["iconLeft"]}>
      <FaStopwatch color="#f2ffd8" />
    </div>,
    <div className={classes["iconLeft"]}>
      <FaChalkboard color="#f2ffd8" />
    </div>,
    <div className={classes["iconLeft"]}>
      <FaCapsules color="#f2ffd8" />
    </div>,
    <div className={classes["iconLeft"]}>
      <FaCopy color="#f2ffd8" />
    </div>,
    <div className={classes["iconLeft"]}>
      <FaHourglassStart color="#f2ffd8" />
    </div>,
    <div className={classes["iconLeft"]}>
      <FaMedal color="#f2ffd8" />
    </div>,
    <div className={classes["iconLeft"]}>
      <FaDice color="#f2ffd8" />
    </div>,
    <div className={classes["iconLeft"]}>
      <FaUsersRectangle color="#f2ffd8" />
    </div>,
  ];

  return (
    <>
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
                <FaGamepad /> 제자랑
              </>
            )}
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
                name={"자리뽑기"}
                className={"settingSeatSelect"}
                onclick={() => setSelectedMenu("settingSeat")}
                icon={ICONS_LEFT[0]}
                title="움짤로 즐겁게 뽑기 과정을 즐기는, 모든 기능을 포함한 자리뽑기!"
              />

              <Button
                name={"랜덤뽑기"}
                className={"settingSeatSelect"}
                title={
                  "학생을 선택해서 상품? 벌칙? 을 정하기 / 줄세우기 등 순서정하기"
                }
                style={{ backgroundColor: "#9ad237" }}
                onclick={() => setSelectedMenu("randomPick")}
                icon={ICONS_LEFT[1]}
              />
              <Button
                name={"데덴찌/주사위 던지기"}
                className={"settingSeatSelect"}
                title={"엎어라 뒤집어라 뽑기 /  주사위 뽑기가 가능해요"}
                onclick={() => {
                  navigate("/simpleRandom");
                }}
                style={{
                  backgroundColor: "#9ad237",
                  fontSize: "1.2rem",
                  wordBreak: "keep-all",
                }}
                icon={ICONS_LEFT[8]}
              />
              <Button
                name={"타이머"}
                className={"settingSeatSelect"}
                title={"새창) 심플한 디자인의 사용하기 편한 웹 타이머"}
                onclick={() =>
                  window.open(
                    "https://bit.ly/%EC%8B%AC%ED%94%8C%ED%83%80%EC%9D%B4%EB%A8%B8"
                  )
                }
                icon={ICONS_LEFT[2]}
              />

              <Button
                name={"알림장"}
                className={"settingSeatSelect"}
                onclick={() => {
                  const specificString = "alarm";
                  const encodedString = encodeURIComponent(specificString);
                  let urlHref = window.location.href;
                  const url = `${
                    urlHref?.split("/classgame")?.[0]
                  }/${encodedString}`;
                  window.open(url, "_blank");
                }}
                title="새창) 자동저장이 가능한 칠판형태의 알림장"
                icon={ICONS_LEFT[3]}
              />

              <Button
                name={"타임캡슐"}
                className={"settingSeatSelect"}
                title={
                  "새창) 기간을 정해두고 학생들과 온라인 타임캡슐을 만들어요!"
                }
                onclick={() =>
                  window.open(
                    "https://bit.ly/%EB%91%90%EA%B7%BC%EB%91%90%EA%B7%BC%ED%83%80%EC%9E%84%EC%BA%A1%EC%8A%90"
                  )
                }
                icon={ICONS_LEFT[4]}
              />

              <Button
                name={"패드잇"}
                className={"settingSeatSelect"}
                onclick={() => setSelectedMenu("padIt")}
                icon={ICONS_LEFT[5]}
                title="과제제출 / 토론 등에 활용할 수 있어요"
              />

              <Button
                name={"준비타이머"}
                className={"settingSeatSelect"}
                title={"다음 수업시간까지 남은 시간, 준비할 것들을 보여줘요"}
                onclick={() => {
                  navigate("/classTimeTable");
                }}
                icon={ICONS_LEFT[6]}
              />

              <Button
                name={"모둠대결"}
                className={"settingSeatSelect"}
                title={"모둠끼리 ( 점수 / 타이머 / 스톱워치 ) 로 대결을 해요"}
                onclick={() => {
                  navigate("/scoreBoard");
                }}
                icon={ICONS_LEFT[7]}
                style={{ backgroundColor: "#9ad237" }}
              />

              <Button
                name={"모둠화면"}
                className={"settingSeatSelect"}
                title={
                  "새창) 모둠의 자리배치를 보면서 ( 모둠점수 / 개별점수 / 출결 / 제출 / 개별기록 ) 등을 사용해요"
                }
                onclick={() => {
                  const specificString = "groupPage";
                  const encodedString = encodeURIComponent(specificString);
                  let urlHref = window.location.href;
                  const url = `${
                    urlHref?.split("/classgame")?.[0]
                  }/${encodedString}`;
                  window.open(url, "_blank");
                }}
                icon={ICONS_LEFT[9]}
                style={{ backgroundColor: "#9ad237" }}
              />
            </div>
            <p>타임캡슐 주소 👉 https://bit.ly/두근두근타임캡슐</p>
            <p>
              타임캡슐 비밀번호{" "}
              <span style={{ color: "white" }}>from-indi</span> (왼쪽을 마우스로
              드래그 해주세요!){" "}
            </p>
            <p>타이머 주소 👉 https://bit.ly/심플타이머</p>
          </>
        )}

        <div className={classes["container-div"]}>
          {selectedMenu === "settingSeat" && (
            <SettingSeat
              students={props.students}
              userUid={props.userUid}
              menuOnHead={props.menuOnHead}
            />
          )}
          {selectedMenu === "randomPick" && (
            <RandomPick students={props.students} userUid={props.userUid} />
          )}

          {selectedMenu === "padIt" && (
            <PadIt
              userUid={props.userUid}
              students={props.students}
              isSubject={props.isSubject}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ClassgamePage;
