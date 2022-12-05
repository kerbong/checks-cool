import React, { useState, useEffect } from "react";
import classes from "./Mission.module.css";
import Item from "./Item";
import { useNavigate } from "react-router-dom";
import { dbService } from "../../../fbase";
import {
  collection,
  query,
  onSnapshot,
  where,
  doc,
  getDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";

import Modal from "components/Layout/Modal";
import Reply from "./Reply";
import MissionInput from "./MissionInput";
import Swal from "sweetalert2";

const EXPLAINS = [
  "* 아침 7~9시에 글쓰기가 가능해요.",
  "* 하루 한 개의 미션만 올릴 수 있어요.",
  "* 미션 당 하나의 댓글만 쓸 수 있어요.",
  "* 여러 미션에 댓글을 달 수 있어요.",
  "* 오늘 올린 미션만 볼 수 있어요.",
  "* 미션은 수정, 삭제가 불가능해요!",
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
    let q = query(
      collection(dbService, "mission"),
      where("date", "==", TODAYDATE)
    );

    onSnapshot(q, (snapShot) => {
      const new_missions = [];
      snapShot.docs.forEach((doc) => {
        const itemObj = {
          ...doc.data(),
          doc_id: doc.id,
        };

        new_missions.push(itemObj);
      });

      setMissions([...new_missions]);

      //만약 자료가 변경되었는데 현재 팝업상태이면 보여지고 있는 showMission과 일치하는 걸 찾아서 새롭게 수정해주기..
      //   if (showItem) {
      //     let new_mission = new_missions.filter(
      //       (mission) => mission.writtenId === showMission.writtenId
      //     );
      //     setShowMission({ ...new_mission[0] });

      //     // console.log(new_reply[0].reply);
      //     setShowReply([...new_mission[0].reply]);
      //   }
    });
  };

  useEffect(() => {
    getMissionFromDb();
  }, []);

  //닉네임 받아두기
  const getNicknameDb = async () => {
    const userStateRef = doc(dbService, "user", props.userUid);
    const userStateDoc = await getDoc(userStateRef);
    console.log(userStateDoc.data());
    setUserState({ ...userStateDoc.data() });
  };

  useEffect(() => {
    getNicknameDb();
  }, []);

  //프로필 없는거 알려주고 이동시키는 함수
  const profileErrorSwal = () => {};

  //   미션 추가 함수
  const missionAddHandler = async (titleValue, textValue) => {
    console.log(userState);
    //프로필 없으면 먼저 저장하고 오도록..
    if (userState === undefined || !userState?.hasOwnProperty("nickName")) {
      Swal.fire({
        icon: "error",
        title: "작성 불가",
        text: "프로필이 존재하지 않아서 글 작성이 불가능합니다. [확인] 버튼을 눌러 프로필 화면으로 이동해주세요. 잼잼-아침미션 으로 다시 오실 수 있습니다.",
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

    //혹시 이미 올렸던 미션이 있으면 작동하지 않도록!
    const missionAddDoc = async () => {
      const data = {
        title: titleValue,
        text: textValue,
        writtenId: props.userUid,
        date: TODAYDATE,
        like: [],
        nickName: userState.nickName,
        reply: [],
      };

      await addDoc(collection(dbService, "mission"), data);
    };

    let q = query(
      collection(dbService, "mission"),
      where("date", "==", TODAYDATE)
    );
    //오늘 현재 유저가 올렸던게 있는지 확인
    let alreadyAdd = false;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().writtenId === props.userUid) {
        alreadyAdd = true;
      }
    });

    //올렸던게 있으면
    if (alreadyAdd) {
      Swal.fire({
        icon: "error",
        title: "저장불가",
        text: `이미 오늘 미션을 등록하셨네요!`,
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
          text: "미션이 저장되었습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });

        missionAddDoc();
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
            mission={showMission}
            itemClickHandler={() => {}}
            onPopup={true}
            userUid={props.userUid}
          />
          <Reply
            userState={userState}
            mission={showMission}
            userUid={props.userUid}
          />
        </Modal>
      )}

      <h1 className={classes.h1}>
        🌞 오늘의 아침미션{" "}
        <span
          className={classes.h1Span}
          onClick={() => setExplainOn((prev) => !prev)}
        >
          {explainOn ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}{" "}
        </span>
      </h1>
      {explainOn && (
        <div className={classes.explainDiv}>
          {EXPLAINS.map((explain, index) => (
            <p key={`explain-${index}`} className={classes.explainP}>
              {explain}
            </p>
          ))}
        </div>
      )}

      {/* 아침미션 입력 7~9시에만 보이기 */}
      {is7to9 ? (
        <MissionInput
          missionAddHandler={(title, text) => {
            missionAddHandler(title, text);
          }}
        />
      ) : (
        <span>매일 아침 7시 ~ 9시 사이에만 입력이 가능해요.</span>
      )}

      {missions?.map((mission) => (
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
      ))}
    </div>
  );
};

export default Mission;
