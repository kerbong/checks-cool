import React, { useEffect, useState } from "react";
import classes from "./Mission.module.css";
import Button from "../../../components/Layout/Button";
import ReplyInput from "./ReplyInput";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Reply = (props) => {
  const [mission, setMission] = useState([]);
  const [replyAll, setReplyAll] = useState([]);
  const [replyExist, setReplyExist] = useState(false);
  const [existText, setExistText] = useState("");
  const [isEditting, setIsEditting] = useState(false);

  let navigate = useNavigate();
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

  useEffect(() => {
    setMission(props.mission);
    props.mission?.reply?.forEach((rep) => {
      if (rep.writtenId === props.userUid) {
        setReplyExist(true);
      } else {
        setReplyExist(false);
      }
    });
  }, [props.mission]);

  useEffect(() => {
    setReplyAll(props.showReply);
    let existNum = 0;
    props.showReply?.forEach((rep) => {
      //현재 유저가 썼던 댓글이 있으면
      if (rep.writtenId === props.userUid) {
        existNum += 1;
      }
    });
    if (existNum > 0) {
      //   console.log("있었네!");
      setReplyExist(true);
    } else {
      //   console.log("없었네!");
      setReplyExist(false);
    }
  }, [props.showReply]);

  const replyAddHandler = (value) => {
    props.replyAddHandler(value);
  };

  return (
    <div>
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
            replyAddHandler(value);
          }}
        />
      )}

      <div>
        {replyAll?.map((reply, index) => (
          <li key={`reply_${index}`} className={classes["reply-li"]}>
            {/* 닉네임, 댓글내용 부분 */}
            <div className={classes["replyNameText-div"]}>
              {!isEditting ? (
                <>
                  <span className={classes["reply-nickName"]}>
                    {reply.nickName}
                  </span>
                  <span className={classes["reply-text"]}>{reply.text}</span>
                </>
              ) : (
                <ReplyInput
                  existText={existText}
                  replyAddHandler={(value) => {
                    replyAddHandler(value);
                  }}
                  editting={true}
                />
              )}
            </div>

            {/* 내가 작성한 댓글이면 수정, 삭제버튼 보이기 */}
            {reply.writtenId === props.userUid && (
              <div>
                <Button
                  id={"edit" + mission.nickName}
                  className="missionEditBtn"
                  onclick={(e) => {
                    if (isEditting) {
                      //저장하고 수정화면끝
                      let value =
                        document.getElementById("replyText-input").value;

                      replyAddHandler(value);
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
                      props.replyDelHandler();
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
