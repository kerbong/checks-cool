import React, { useEffect, useState } from "react";
import classes from "./Mission.module.css";
import Button from "../../../components/Layout/Button";
import ReplyInput from "./ReplyInput";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { dbService } from "../../../fbase";
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";

const Reply = (props) => {
  const [mission, setMission] = useState([]);
  const [replyAll, setReplyAll] = useState([]);
  // const [replyExist, setReplyExist] = useState(false);

  let navigate = useNavigate();

  //현재 받은 미션자료 받아오고 댓글 담아두기
  const getMissionFromDb = async (mission) => {
    const missionRef = doc(dbService, "mission", props.dataDate);
    onSnapshot(missionRef, (doc) => {
      const allMission = doc.data().mission_data;
      allMission.forEach((data) => {
        if (data.writtenId === mission.writtenId) {
          setMission({ ...data });
          setReplyAll([...data.reply]);
        }
      });
    });
  };

  useEffect(() => {
    getMissionFromDb(props.mission);
  }, [props.mission]);

  // //현재 유저가 썼던 댓글이 있으면
  // useEffect(() => {
  //   let existNum = 0;
  //   replyAll?.forEach((rep) => {
  //     if (rep.writtenId === props.userUid) {
  //       existNum += 1;
  //     }
  //   });
  //   if (existNum > 0) {
  //     setReplyExist(true);
  //   } else {
  //     setReplyExist(false);
  //   }
  // }, [replyAll]);

  //프로필 없는거 알려주고 이동시키기
  const profileErrorSwal = () => {
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
  };

  //댓글 삭제, 추가, 수정기능 함수
  const replyHandler = async (value, option, reply_data) => {
    //프로필 없으면 프로필 입력화면으로 이동
    if (
      props.userState === undefined ||
      !props.userState?.hasOwnProperty("nickName")
    ) {
      profileErrorSwal();
    }

    const nowOnRef = doc(dbService, "mission", props.dataDate);
    //오늘 미션 전체 데이터
    let getDatas = await getDoc(nowOnRef);
    let nowAllMission = [...getDatas.data().mission_data];
    //오늘 미션 데이터 중 해당 글 데이터
    let nowOnMission = {};
    let nowOnIndex;
    let data_reply = [];
    nowAllMission.forEach((data, onIndex) => {
      if (data.writtenId === mission.writtenId) {
        data_reply = [...data.reply];
        nowOnMission = { ...data };
        nowOnIndex = onIndex;
      }
    });
    //기존댓글목록에 이미 쓴게 있으면 빼고 새로운 댓글 목록에 저장
    let new_data_reply = [...data_reply];

    //댓글 업데이트 혹은 새로쓰기면
    if (option === "add") {
      //데이터 새롭게 추가하고
      new_data_reply.push({
        text: value,
        id: dayjs().format("HH:mm:ss"),
        writtenId: props.userUid,
        nickName: props.userState.nickName,
      });
    } else if (option === "update") {
      //데이터 새롭게 추가하고
      new_data_reply = new_data_reply.map((reply) => {
        let new_reply = reply;
        if (reply.writtenId === props.userUid && reply?.id === reply_data?.id) {
          new_reply = {
            text: value,
            id: reply.id,
            writtenId: reply.writtenId,
            nickName: props.userState.nickName,
          };
        }
        return new_reply;
      });
    } else if (option === "delete") {
      new_data_reply = new_data_reply.filter(
        (reply) =>
          !(reply.writtenId === props.userUid && reply?.id === reply_data?.id)
      );
    }
    nowOnMission.reply = [...new_data_reply];
    nowAllMission[nowOnIndex] = { ...nowOnMission };
    //업데이트 공통
    await updateDoc(nowOnRef, { mission_data: nowAllMission });
  };

  return (
    <div>
      <ReplyInput isBase={true} replyAddHandler={replyHandler} />

      {/* 전체 댓글들 보여주기 */}
      <div>
        {replyAll?.map((reply, index) => (
          <li key={`reply_${index}`} className={classes["reply-li"]}>
            {/* 닉네임, 댓글내용 부분 */}
            <div className={classes["replyNameText-div"]}>
              <ReplyInput
                replyAddHandler={replyHandler}
                reply={reply}
                userUid={props.userUid}
              />
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Reply;
