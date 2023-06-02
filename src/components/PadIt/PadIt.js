import { useState, useEffect } from "react";

import PadList from "./PadList";
import PadItem from "./PadItem";
import Swal from "sweetalert2";
import PadAdd from "./PadAdd";
import classes from "./PadIt.module.css";

import { dbService } from "../../fbase";
import { getDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import Modal from "components/Layout/Modal";

const PadIt = (props) => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [padDatas, setPadDatas] = useState([]);
  const [padSectionNames, setPadSectionNames] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [roomPw, setRoomPw] = useState("");
  const [roomNames, setRoomNames] = useState([]);
  const [showPadAdd, setShowPadAdd] = useState(false);
  const [hideAddBtn, setHideAddBtn] = useState(false);
  const [showLogInRoomInput, setShowLogInRoomInput] = useState(true);

  useEffect(() => {
    if (!props.userUid) return;
    setIsTeacher(true);
  }, [props.userUid]);

  //교사로 로그인 한 경우 만들었던 방 정보 받아오기
  const getRoomNames = async () => {
    // userUid로 저장된 문서에서 목록 가져옴
    let padRef = doc(dbService, "padIt", props.userUid);

    onSnapshot(padRef, (doc) => {
      if (doc.exists()) {
        setRoomNames(doc.data()?.datas);
      }
    });
  };

  //룸네임자료 받아오고, 현재 유저가 생성한 방 정보 확인하기
  useEffect(() => {
    if (!isTeacher) return;

    //교사용인경우, 이름들 받아오기

    getRoomNames();
  }, [isTeacher]);

  //pad data 구성...
  //  {
  //  pw: "",
  //  datas:[
  //  {title: "", text:'', userInfo:'', createdAt: new Date(), bg: ""}
  // 유저인포에는 uuid를 저장하고, 만들어진 uuid는 데이터를 저장하면서 localStorage에 저장해서 나중에도 불러와서 글을 수정, 삭제할 수 있도록..
  //교사가 작성할 경우 userInfo에 true를 넣어줌.

  //교사가 방을 만들때는 roomNames 문서에 이름이 존재하는지 중복확인 후에 만들 수 있도록

  //  ]
  // }
  const showLoginPadError = () => {
    Swal.fire(
      "접속 실패",
      "방이름과 비밀번호를 확인하고, 다시 접속해주세요!",
      "warning"
    );
  };

  //pad 데이터 가져오는 함수
  const getPadDatas = async (roomName, roomPw) => {
    let padRef = doc(dbService, "padIt", roomName);
    let padSnap = await getDoc(padRef);

    if (padSnap.exists()) {
      // onSnapshot(memoRef, (doc) => {
      //방이 존재하고 비밀번호가 맞는지 확인
      if (padSnap?.data()?.pw !== roomPw) {
        showLoginPadError();
        return false;
      } else {
        Swal.fire(
          "접속 성공",
          `${roomName} 에 접속이 성공되었습니다. 오른쪽 하단의 + 버튼으로 메모를 추가해보세요.`,
          "success"
        );
        setRoomName(roomName);
        setRoomPw(roomPw);
      }

      onSnapshot(padRef, (doc) => {
        setPadDatas(doc?.data()?.datas);
        setPadSectionNames(doc?.data()?.sectionNames);
      });

      setShowLogInRoomInput(false);
    } else {
      showLoginPadError();
    }
  };

  useEffect(() => {
    if (!props.padItInfo) return;
    if (
      Object.values(props.padItInfo)?.includes("undefined") ||
      Object.values(props.padItInfo)?.includes(undefined)
    )
      return;

    //학생용인경우, 화면의 nav바, 헤더 없애주기
    document.querySelector("nav").style.display = "none";

    let roomName = props.padItInfo.roomName;
    let roomPw = props.padItInfo.roomPw;
    setRoomName(roomName);
    setRoomPw(roomPw);
    // 가져온 데이터를 padList 상태에 저장한다.
    getPadDatas(roomName, roomPw);
  }, [props.padItInfo]);

  //학생이 방에서 뒤로 버튼을 누르면
  const itemCloseHandler = () => {
    Swal.fire({
      icon: "warning",
      title: "수동 입력으로",
      text: "패드잇 수동 입력화면으로 이동할까요? 이동하면 직접 방이름과 비밀번호를 입력해야 합니다!",
      confirmButtonText: "확인",
      showDenyButton: true,
      denyButtonText: "취소",
      confirmButtonColor: "#85bd82",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowLogInRoomInput(true);
      } else {
        return;
      }
    });
  };

  //패드 데이터 추가, 삭제 등 함수
  const padDatasHandler = async (new_datas, new_sectionNames) => {
    let padRef = doc(dbService, "padIt", roomName);
    let new_pad_data = {
      datas: new_datas,
      pw: roomPw,
      sectionNames: new_sectionNames,
    };
    await setDoc(padRef, new_pad_data);
  };

  return (
    <>
      {isTeacher ? (
        <div style={{ marginTop: "-80px" }}>
          {/* 교사용 화면 */}
          {/* 닉네임 만들기, 닉네임이 없으면 만드는화면으로, 있으면 방리스트  + 방 만들기 버튼 + (닉네임 수정하기 버튼)추후 업데이트! */}
          {showPadAdd && (
            <Modal onClose={() => setShowPadAdd(false)}>
              <PadAdd
                onClose={() => setShowPadAdd(false)}
                userUid={props.userUid}
                roomNames={roomNames}
                isTeacher={isTeacher}
              />
            </Modal>
          )}
          {!hideAddBtn && (
            <>
              <h2
                className={classes["fs-17rem"]}
                style={{ marginLeft: "43px" }}
              >
                {" "}
                패드잇 📌
              </h2>
              <p>개발중입니다. 현재는 작성만 가능합니다.</p>
              <button
                onClick={() => setShowPadAdd(true)}
                className={classes["li-btn"]}
              >
                패드 추가하기
              </button>
            </>
          )}
          <PadList
            roomNames={roomNames}
            hidePadAdd={(tOrF) => setHideAddBtn(tOrF)}
            isTeacher={isTeacher}
            padDatasHandler={padDatasHandler}
            setPadPwHandler={(pw) => setRoomPw(pw)}
            setPadNameHandler={(room) => setRoomName(room)}
          />
        </div>
      ) : (
        <>
          {/* 학생용 화면 */}

          {/* 수동 접속..! 쌤 닉네임 + 방이름 입력하는 폼, */}
          {showLogInRoomInput && (
            <>
              <h2
                className={classes["fs-17rem"]}
                style={{ marginLeft: "43px" }}
              >
                {" "}
                패드잇 📌
              </h2>
              <p>개발중입니다. 현재는 작성만 가능합니다.</p>
              <PadAdd
                onClose={() => setShowLogInRoomInput(false)}
                isTeacher={isTeacher}
                getPadDatasHandler={getPadDatas}
              />
            </>
          )}
          {/*  */}
          {!showLogInRoomInput && (
            <PadItem
              padName={roomName}
              padDatas={padDatas}
              padSectionNames={padSectionNames}
              onClose={() => {
                itemCloseHandler();
              }}
              padDatasHandler={padDatasHandler}
            />
          )}
        </>
      )}
    </>
  );
};

export default PadIt;
