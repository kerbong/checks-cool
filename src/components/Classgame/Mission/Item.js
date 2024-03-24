import React, { useEffect, useState } from "react";
import Button from "../../Layout/Button";
import LikeBtn from "../Simsim/LikeBtn";
import classes from "./Mission.module.css";
import { dbService } from "../../../fbase";
import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { FaReply } from "react-icons/fa6";

const Item = (props) => {
  const [like, setLike] = useState(false);
  const [userUid, setUserUid] = useState(props.userUid || "");
  const [mission, setMission] = useState({});

  useEffect(() => {
    setUserUid(props.userUid);
  }, [props.userUid]);
  useEffect(() => {
    setMission(props.mission);
  }, [props.mission]);

  //like상태 불러와서 저장하기
  const checkSetLike = (mission) => {
    let likeOrNot = mission?.like?.filter((data) => {
      return data === userUid;
    }).length;

    if (likeOrNot > 0) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  useEffect(() => {
    checkSetLike(mission);
  }, [mission]);
  //라이크를 변경하는 함수, 값을 찾아서 업데이트
  const changeLikeHandler = async () => {
    // console.log(mission);
    //해당 날짜의 자료에서
    if (props.likeNonClick) return;

    const nowOnRef = doc(dbService, "mission", props.dataDate);

    const getNowData = await getDoc(nowOnRef);
    //이번달 자료 중 현재 자료의 인덱스 저장하고
    let nowData_index = 0;
    let new_missionData = [...getNowData.data().mission_data];

    new_missionData.forEach((data, index) => {
      if (data.writtenId === mission.writtenId) {
        nowData_index = index;
      }
    });

    let nowOnData = new_missionData[nowData_index];
    let nowOnData_like = nowOnData.like;
    // console.log(nowOnData_like);

    //만약 이전이 좋아요였으면 해제
    if (like) {
      new_missionData[nowData_index].like = nowOnData_like?.filter(
        (uid) => uid !== props.userUid
      );

      // console.log(nowOnData);
      // console.log(new_missionData);

      //만약 이전이 무응답이었으면 추가
    } else {
      nowOnData_like.push(props.userUid);
      // console.log(nowOnData);
      // console.log(new_missionData);
    }

    setLike((prev) => !prev);

    await updateDoc(nowOnRef, { mission_data: new_missionData });
  };
  return (
    <li
      key={mission.nickName}
      className={classes.listArea}
      id={mission.nickName}
      onClick={() => {
        props?.itemClickHandler(mission);
      }}
    >
      <div key={mission.nickName + "item"}>
        <div className={classes.nameArea}>
          <span className={classes.nameIcon}>☕</span>
          <span id={"1" + mission.nickName}>
            <span className={classes.titleSpan} style={{ fontWeight: "bold" }}>
              {" "}
              {mission.nickName}
            </span>{" "}
          </span>
          <span className={classes.titleNickName}>{`${mission.title}`}</span>
        </div>
      </div>

      {/* text 부분 보여주기 */}
      {props.onPopup && (
        <div className={classes.textArea}>
          <span className={classes["text-span"]} id={"note" + mission.nickName}>
            {mission.text}
          </span>
        </div>
      )}

      <div className={classes.editDeleteArea}>
        {/* 좋아요와 댓글수 */}
        <div className={classes.likeReplyDiv}>
          <LikeBtn
            like={like}
            changeLike={changeLikeHandler}
            likeNonClick={props.likeNonClick}
          />
          {props.mission?.like?.length}
          <div className={classes.replyDiv}>
            <span className={classes.replyIcon}>
              <FaReply />
            </span>
            <span className={classes.replySpan}>{mission?.reply?.length}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Item;
