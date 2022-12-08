import React, { useEffect, useState } from "react";
import classes from "./Mission.module.css";
import Button from "../../../components/Layout/Button";
import ReplyInput from "./ReplyInput";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { dbService } from "../../../fbase";
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
const Reply = (props) => {
  const [mission, setMission] = useState([]);
  const [replyAll, setReplyAll] = useState([]);
  const [replyExist, setReplyExist] = useState(false);
  const [existText, setExistText] = useState("");
  const [isEditting, setIsEditting] = useState(false);

  let navigate = useNavigate();

  //현재 받은 미션자료 받아오고 댓글 담아두기
  const getMissionFromDb = async (doc_id) => {
    onSnapshot(doc(dbService, "mission", doc_id), (doc) => {
      setMission({ ...doc.data(), doc_id: doc.id });
      setReplyAll([...doc.data().reply]);
    });
  };

  useEffect(() => {
    getMissionFromDb(props.mission.doc_id);
  }, [props.mission]);

  //현재 유저가 썼던 댓글이 있으면
  useEffect(() => {
    let existNum = 0;
    replyAll?.forEach((rep) => {
      if (rep.writtenId === props.userUid) {
        existNum += 1;
      }
    });
    if (existNum > 0) {
      setReplyExist(true);
    } else {
      setReplyExist(false);
    }
  }, [replyAll]);

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
  const replyHandler = async (value, option) => {
    const nowOnRef = doc(dbService, "mission", mission.doc_id);
    const data_reply = (await getDoc(nowOnRef)).data().reply;
    //새로운 댓글목록 배열 만들고
    let new_data_reply = [];
    //기존댓글목록에 이미 쓴게 있으면 빼고 새로운 댓글 목록에 저장
    data_reply?.forEach((reply) => {
      if (reply.writtenId !== props.userUid) {
        new_data_reply.push(reply);
      }
    });

    //댓글 업데이트 혹은 새로쓰기면
    if (option === "update" || option === "add") {
      //데이터 새롭게 추가하고
      new_data_reply.push({
        text: value,
        writtenId: props.userUid,
        nickName: props.userState.nickName,
      });
    }

    console.log(new_data_reply);
    //업데이트 공통
    await updateDoc(nowOnRef, { reply: new_data_reply });
  };

  return (
    <div>
      {/* 내가쓴 댓글이 없으면 입력창 보여주기 */}
      {!replyExist && (
        <ReplyInput
          replyAddHandler={(value) => {
            //프로필 없으면 프로필 입력화면으로 이동
            if (
              props.userState === undefined ||
              !props.userState?.hasOwnProperty("nickName")
            ) {
              profileErrorSwal();
            }
            replyHandler(value, "update");
          }}
        />
      )}

      {/* 전체 댓글들 보여주기 */}
      <div>
        {replyAll?.map((reply, index) => (
          <li key={`reply_${index}`} className={classes["reply-li"]}>
            {/* 닉네임, 댓글내용 부분 */}
            <div className={classes["replyNameText-div"]}>
              {/* 수정중이 아니면 */}
              {!isEditting ? (
                <>
                  <span className={classes["reply-nickName"]}>
                    {reply.nickName}
                  </span>
                  <span className={classes["reply-text"]}>{reply.text}</span>
                </>
              ) : (
                /* 수정중이면 */
                <ReplyInput
                  existText={existText}
                  replyAddHandler={(value) => {
                    replyHandler(value, "update");
                  }}
                  editting={true}
                />
              )}
            </div>

            {/* 내가 작성한 댓글이면 수정, 삭제버튼 보이기 */}
            {reply.writtenId === props.userUid && (
              <div className={classes["replyBtn-div"]}>
                <Button
                  id={"edit" + mission.nickName}
                  className="missionEditBtn"
                  onclick={(e) => {
                    if (isEditting) {
                      //저장하고 수정화면끝
                      let value =
                        document.getElementById("replyText-input").value;

                      replyHandler(value, "update");
                      setIsEditting(false);
                    } else {
                      //기본값 전달하고 수정화면으로
                      replyAll?.forEach((rep) => {
                        if (rep.writtenId === props.userUid) {
                          setExistText(rep.text);
                        }
                      });
                      setIsEditting(true);
                    }
                  }}
                  icon={
                    isEditting ? (
                      <i className="fa-solid fa-circle-arrow-right"></i>
                    ) : (
                      <i className="fa-solid fa-pen-to-square"></i>
                    )
                  }
                />
                <Button
                  id={"delete" + mission.nickName}
                  className="missionEditBtn"
                  onclick={() => {
                    if (isEditting) {
                      //취소버튼 기능
                      setIsEditting(false);
                    } else {
                      //삭제버튼 기능
                      replyHandler("none", "delete");
                    }
                  }}
                  icon={
                    isEditting ? (
                      <i className="fa-regular fa-circle-xmark"></i>
                    ) : (
                      <i className="fa-solid fa-trash"></i>
                    )
                  }
                />
              </div>
            )}
          </li>
        ))}
      </div>
    </div>
  );
};

export default Reply;
