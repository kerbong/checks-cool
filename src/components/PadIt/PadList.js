import React, { useState } from "react";

import { dbService, storageService } from "../../fbase";
import { getDoc, doc, onSnapshot, setDoc, deleteDoc } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";
import Swal from "sweetalert2";

import DateComparison from "components/Layout/DateComparison";
import classes from "./PadIt.module.css";
import PadItem from "./PadItem";
import Modal from "components/Layout/Modal";
import { deleteObject, ref } from "firebase/storage";

const PadList = (props) => {
  const [padDatas, setPadDatas] = useState([]);
  const [padSectionNames, setPadSectionNames] = useState([]);
  const [padName, setPadName] = useState("");
  const [padPw, setPadPw] = useState("");
  const [showItem, setShowItem] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [clName, setClName] = useState("");
  const [students, setStudents] = useState(props.students || []);
  const [userUid, setUserUid] = useState("");

  //교사가 방 데이터 받아오기
  const getRoomData = async (roomName) => {
    // 해당 방 이름의 문서를 불러와서, 방에 입력된 자료들만 padDatas에 저장
    setPadName(roomName);
    props.setPadNameHandler(roomName);
    let padRef = doc(dbService, "padIt", roomName);
    onSnapshot(padRef, (doc) => {
      //전담이라 학급명이 저장되어 있으면 따로 저장
      let doc_clName = doc?.data()?.clName;
      if (doc_clName) {
        setClName(doc_clName);
        props.nowItemClName(doc_clName);
        setStudents(doc?.data()?.students);
      }

      setPadDatas(doc?.data()?.datas);
      setPadSectionNames(doc?.data()?.sectionNames);
      props.userUidHandler(doc?.data()?.userUid);
      setUserUid(doc?.data()?.userUid);
      setShowItem(true);
      //교사용 padit에서 패드 추가하기 보이지 않도록
      props.setPadPwHandler(doc?.data()?.pw);
      props.hidePadAdd(true);
    });
  };

  //qr코드 모달로 보이는 버튼 누르면 실행되는 함수
  const showQrHandler = async (room) => {
    // if (room !== padName) {
    let padRef = doc(dbService, "padIt", room);
    let padDoc = await getDoc(padRef);
    let roomPw = padDoc.data()?.pw;
    setPadPw(roomPw);
    setPadName(room);
    // } else {
    //   console.log("다름");
    // }
    setShowQrCode(true);
  };

  //방에서 뒤로 버튼을 누르면
  const itemCloseHandler = () => {
    Swal.fire({
      icon: "warning",
      title: "목록으로 이동",
      text: "패드잇 목록으로 이동하시겠어요?",
      confirmButtonText: "확인",
      showDenyButton: true,
      denyButtonText: "취소",
      confirmButtonColor: "#85bd82",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowItem(false);
        props.hidePadAdd(false);
      } else {
        return;
      }
    });
  };

  /** 방 이름 목록에서 지우기 */
  const deleteRoomNames = async (room) => {
    const roomNameRef = doc(dbService, "padIt", "roomNames");
    const roomDoc = await getDoc(roomNameRef);
    const new_doc = roomDoc.data()?.datas?.filter((name) => name !== room);
    // console.log(new_doc);
    await setDoc(roomNameRef, { datas: new_doc });
  };
  /** 해당 유저의 도큐먼트에서 방 이름 지우기 */
  const deleteInUserDoc = async (room) => {
    const roomNameRef = doc(dbService, "padIt", props.userUid);
    const roomDoc = await getDoc(roomNameRef);
    const new_doc = roomDoc.data()?.datas?.filter((name) => name !== room);
    await setDoc(roomNameRef, { datas: new_doc });
  };
  /** 해당 룸 도큐먼트 데이터에서 업로드된 파일 있는지 확인해서 지운후, 해당 도큐먼트도 지우기 */
  const deleteDocument = async (room) => {
    const roomNameRef = doc(dbService, "padIt", room);
    const roomDoc = await getDoc(roomNameRef);
    roomDoc.data()?.datas?.forEach(async (data) => {
      if (data?.fileUrl && data?.fileUrl !== "") {
        await deleteObject(ref(storageService, data?.fileUrl));
      }
    });

    await deleteDoc(roomNameRef);
  };

  /** 패드잇 아이템 삭제 함수 */
  const delHandler = (room) => {
    // console.log(room);
    Swal.fire({
      icon: "warning",
      title: "패드 삭제",
      text: "패드와 관련 데이터(업로드한 사진, 글 등)를 정말 삭제할까요?",
      confirmButtonText: "삭제",
      showDenyButton: true,
      denyButtonText: "취소",
      confirmButtonColor: "#85bd82",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRoomNames(room);
        deleteInUserDoc(room);
        deleteDocument(room);
      } else {
        return;
      }
    });
  };

  return (
    <div>
      {showQrCode && (
        <Modal onClose={() => setShowQrCode(false)}>
          <div className={classes["flex-col-center"]}>
            <h2
              className={`${classes["fs-2rem"]} ${classes["margin-10-0-5-0"]}`}
            >
              {padName?.slice(10)}
            </h2>
            <QRCodeSVG
              value={`https://checks-cho-ok.firebaseapp.com/padIt/${padName}/${padPw}`}
              size={`33vw`}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={true}
            />
            <p
              className={`${classes["margin-10-0-5-0"]} ${classes["padRoomPw-p"]}`}
              style={{ marginTop: "-10px" }}
            >
              <span>🙂 방이름</span>
              <span>{padName}</span>
            </p>
            <p className={classes["padRoomPw-p"]}>
              <span>🙂 비밀번호</span>
              <span>{padPw}</span>
            </p>
          </div>
        </Modal>
      )}

      {!showItem && (
        <>
          <ul className={`${classes["ul"]} ${classes["flex-center-wrap"]}`}>
            {props.roomNames?.map((room, index) => (
              <li key={index} className={classes["li"]}>
                <div className={classes["flex-col-center"]}>
                  {/* 패드 개별 이름 */}
                  <span className={classes["fs-14rem"]}>{room.slice(10)}</span>
                  {/* ~일전 표시 */}
                  <span className={classes["date"]}>
                    <DateComparison date={room.slice(0, 10)} />
                  </span>
                  {/* 삭제버튼 */}
                  <button
                    onClick={() => delHandler(room)}
                    className={classes["del-btn"]}
                  >
                    삭제
                  </button>

                  {/* 구분선 */}
                  <hr style={{ width: "90%", margin: "20px 5px" }} />
                  {/* 입장 / qr코드 확인 / 삭제 버튼 div */}
                  <div className={classes["flex-around-80"]}>
                    <button
                      onClick={() => getRoomData(room)}
                      className={classes["li-btn"]}
                    >
                      입장
                    </button>
                    <button
                      onClick={() => {
                        showQrHandler(room);
                      }}
                      className={classes["li-btn"]}
                    >
                      qr코드 확인
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {showItem && (
        <PadItem
          padName={padName}
          padDatas={padDatas}
          onClose={() => {
            itemCloseHandler();
          }}
          userUid={userUid}
          students={students}
          padSectionNames={padSectionNames}
          isTeacher={props.isTeacher}
          padDatasHandler={(items, names) =>
            props.padDatasHandler(items, names)
          }
          clName={clName}
        />
      )}
    </div>
  );
};

export default PadList;
