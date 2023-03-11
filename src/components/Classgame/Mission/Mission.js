import React, { useState, useEffect } from "react";
import classes from "./Mission.module.css";
import Item from "./Item";
import { useNavigate } from "react-router-dom";
import { dbService } from "../../../fbase";
import { onSnapshot, doc, getDoc, setDoc } from "firebase/firestore";

import Modal from "components/Layout/Modal";
import Reply from "./Reply";
import MissionInput from "./MissionInput";
import Swal from "sweetalert2";

const EXPLAINS = [
  "* 아침 7~9시에 글쓰기가 가능해요.",
  "* 하루 한 개의 글만 올릴 수 있어요.",
  "* 글에는 한 개의 댓글만 쓸 수 있어요.",
  "* 여러 글에 댓글을 달 수 있어요.",
  "* 오늘 올린 글만 볼 수 있어요.",
  "* 글은 수정, 삭제가 불가능해요!",
];
//   {/* <p>* 매주 월요일에는 지난주 핫미션이 나와요.</p> */}

const TODAYDATE = new Intl.DateTimeFormat("fr-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(Date.now());

const Mission = (props) => {
  const [missions, setMissions] = useState([]);
  const [showReply, setShowReply] = useState([]);
  const [explainOn, setExplainOn] = useState(false);
  const [userState, setUserState] = useState("");
  const [showItem, setShowItem] = useState(false);
  const [showMission, setShowMission] = useState({});
  const [is7to9, setIs7to9] = useState(null);
  const [isWritten, setIsWritten] = useState(
    localStorage.getItem("isWritten") || false
  );

  let navigate = useNavigate();

  useEffect(() => {
    //7-9
    const nowHour = +new Date().toTimeString().slice(0, 2);
    if (nowHour >= 7 && nowHour <= 9) {
      setIs7to9(true);
    } else {
      setIs7to9(false);
    }
  }, []);

  //오늘 날짜의 미션자료 받아오기
  const getMissionFromDb = () => {
    let todayRef = doc(dbService, "mission", TODAYDATE);

    onSnapshot(todayRef, (doc) => {
      const new_missions = [];
      doc?.data()?.mission_data?.forEach((data) => {
        new_missions.push(data);
      });

      setMissions([...new_missions]);
    });
  };

  useEffect(() => {
    getMissionFromDb();
  }, []);

  //닉네임 받아두기
  const getNicknameDb = async () => {
    const userStateRef = doc(dbService, "user", props.userUid);
    const userStateDoc = await getDoc(userStateRef);
    setUserState({ ...userStateDoc.data() });
  };

  useEffect(() => {
    getNicknameDb();
  }, []);

  //   미션 추가 함수
  const missionAddHandler = async (titleValue, textValue) => {
    console.log(userState);
    //프로필 없으면 먼저 저장하고 오도록..
    if (userState === undefined || !userState?.hasOwnProperty("nickName")) {
      Swal.fire({
        icon: "error",
        title: "작성 불가",
        text: "프로필이 존재하지 않아서 글 작성이 불가능합니다. [확인] 버튼을 눌러 프로필 화면으로 이동해주세요. 잼잼-아침한마디 로 다시 오실 수 있습니다.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        showDenyButton: false,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate(`/profile`);
        }
      });
      return;
    }

    const todayData = await getDoc(doc(dbService, "mission", TODAYDATE));

    //최종적으로 미션을 저장하는 함수
    const missionAddDoc = async () => {
      const data = {
        title: titleValue,
        text: textValue,
        writtenId: props.userUid,
        like: [],
        nickName: userState.nickName,
        reply: [],
      };

      let new_datas = [data];

      if (todayData.exists()) {
        todayData?.data()?.mission_data.forEach((data) => new_datas.push(data));
      }

      await setDoc(doc(dbService, "mission", TODAYDATE), {
        mission_data: new_datas,
      });
    };

    //혹시 이미 올렸던 미션이 있으면 작동하지 않도록!
    //오늘 현재 유저가 올렸던게 있는지 확인
    let alreadyAdd = false;
    todayData?.data()?.mission_data?.forEach((data) => {
      if (data.writtenId === props.userUid) {
        alreadyAdd = true;
      }
    });

    //올렸던게 있으면
    if (alreadyAdd) {
      Swal.fire({
        icon: "error",
        title: "저장불가",
        text: `이미 오늘 아침한마디를 등록하셨네요!`,
        showDenyButton: false,
        confirmButtonText: "확인",
        confirmButtonColor: "#db100cf2",
        timer: 5000,
      });
      return false;
    }

    //올렸던게 없으면
    Swal.fire({
      icon: "question",
      title: "저장할까요?",
      text: `한 번 저장하면 오늘 미션을 수정, 삭제할 수 없습니다!`,
      showDenyButton: true,
      confirmButtonText: "저장",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "저장완료",
          text: "아침한마디가 저장되었습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });

        missionAddDoc();
        localStorage.setItem("isWritten", true);
      }
    });
  };

  return (
    <div>
      {showItem && (
        <Modal
          onClose={() => {
            setShowItem(false);
            setShowMission({});
            setShowReply([]);
          }}
        >
          <Item
            userUid={props.userUid}
            mission={showMission}
            itemClickHandler={() => {}}
            onPopup={true}
            likeNonClick={false}
            dataDate={TODAYDATE}
          />
          <Reply
            userState={userState}
            mission={showMission}
            userUid={props.userUid}
            dataDate={TODAYDATE}
          />
        </Modal>
      )}

      <h1 className={classes.h1} onClick={() => setExplainOn((prev) => !prev)}>
        🌞 오늘의 아침한마디{" "}
        <span className={classes.h1Span}>
          {explainOn ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}{" "}
        </span>
      </h1>

      <div className={explainOn ? classes.explainDiv : classes.explainDivHide}>
        {EXPLAINS?.map((explain, index) => (
          <span key={`explain-${index}`} className={classes.explainP}>
            {explain}
          </span>
        ))}
      </div>

      {/* 아침미션 입력 7~9시에만 보이기 */}
      {is7to9 && (
        <MissionInput
          missionAddHandler={(title, text) => {
            missionAddHandler(title, text);
          }}
        />
      )}

      {/* 글을 하나라도 쓴 사람만 보이기기 */}
      {isWritten ? (
        missions?.map((mission) => (
          <Item
            likeNonClick={true}
            key={mission.nickName}
            mission={mission}
            itemClickHandler={(mission) => {
              setShowItem(true);
              setShowMission(mission);
              setShowReply(mission.reply);
            }}
          />
        ))
      ) : (
        <>
          <br />
          <br />
          <h2>* 한 개 이상의 글을 작성해주세요.</h2>
        </>
      )}
    </div>
  );
};

export default Mission;
