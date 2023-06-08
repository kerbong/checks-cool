import { useState, useEffect } from "react";

import PadList from "../PadIt/PadList";
import PadItem from "../PadIt/PadItem";
import Swal from "sweetalert2";
import PadAdd from "../PadIt/PadAdd";
import classes from "../PadIt/PadIt.module.css";

import { dbService } from "../../fbase";
import { getDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import Modal from "components/Layout/Modal";
import dayjs from "dayjs";

const PadIt = (props) => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [padDatas, setPadDatas] = useState([]);
  const [padSectionNames, setPadSectionNames] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [roomPw, setRoomPw] = useState("");
  const [userUid, setUserUid] = useState("");
  const [roomNames, setRoomNames] = useState([]);
  const [showPadAdd, setShowPadAdd] = useState(false);
  const [hideAddBtn, setHideAddBtn] = useState(false);
  const [showLogInRoomInput, setShowLogInRoomInput] = useState(true);
  const [students, setStudents] = useState([]);
  const [checkListsRefData, setCheckListsRefData] = useState({});
  const [isSubject, setIsSubject] = useState(false);
  const [nowClName, setNowClName] = useState("");

  useEffect(() => {
    if (!props.userUid) return;
    setIsTeacher(true);
  }, [props.userUid]);

  useEffect(() => {
    let year = now_year();
    setIsSubject(
      props.isSubject?.filter(
        (yearData) => Object.keys(yearData)[0] === year
      )?.[0]?.[year]
    );
  }, [props.isSubject]);

  useEffect(() => {}, [isSubject]);

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
  //교사는 학생들 데이터 직접 app에서 받아서 쓰기
  useEffect(() => {
    if (props.students) {
      let year = now_year();
      //학년도에 해당하는 학생 목록 설정하기
      let now_students = props.students?.filter(
        (yearStd) => Object.keys(yearStd)[0] === year
      )?.[0]?.[year];
      setStudents(now_students);
    }
  }, [props.students]);

  //현재 학년도 정보 반환하는 함수
  const now_year = () => {
    return +dayjs().format("MM") <= 2
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  const showLoginPadError = () => {
    Swal.fire(
      "접속 실패",
      "방이름과 비밀번호를 확인하고, 다시 접속해주세요!",
      "warning"
    );
  };

  //학생들이 pad 데이터 가져오는 함수
  const getPadDatas = async (roomName, roomPw) => {
    let padRef = doc(dbService, "padIt", roomName);
    let padSnap = await getDoc(padRef);
    //학생용인경우, 화면의 nav바, 헤더 없애주기
    document.querySelector("nav").style.display = "none";

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
        setNowClName(doc?.data()?.clName);
        setStudents([...doc?.data()?.students]);
        setUserUid(doc?.data()?.userUid);
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

    let roomName = props.padItInfo.roomName;
    let roomPw = props.padItInfo.roomPw;

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

  //제출ox 자료 실행함수
  const checkListsHandler = async (userUid, new_datas) => {
    let checkRef = doc(dbService, "checkLists", userUid);
    let checkDoc = await getDoc(checkRef);
    // onSnapshot(checkRef, (doc) => {

    let new_checkLists = [...checkDoc?.data()?.checkLists_data] || [];
    // let new_checkLists = [...doc?.data()?.checkLists_data] || [];
    let checkListsData = {};
    let exist_index = 0;
    // 기존 제출ox에서 같은 이름으로 저장된거 있는지 확인
    new_checkLists?.forEach((list, index) => {
      if (list?.title === roomName) {
        exist_index = index;
        checkListsData = list;
      }
    });

    //미제출 학생목록만들기
    let unSubmitStudents = [];
    let pad_titles = new_datas?.map((data) => data?.title);

    let new_checkList;
    // 제출ox에 없던거면
    if (exist_index === 0) {
      //올해학생이름이 제목에 포함되어 있지 않으면 미제출학생에 추가
      let new_students = isSubject
        ? Object.values(
            students?.filter(
              (clObj) => Object.keys(clObj)[0] === nowClName
            )?.[0]
          )?.[0]
        : students;

      new_students?.forEach((std) => {
        let dataExist = false;
        pad_titles.forEach((t) => {
          if (t.includes(std.name)) {
            dataExist = true;
            return;
          }
        });
        if (!dataExist) {
          unSubmitStudents.push(std);
        }
      });

      new_checkList = {
        //시분초,  yearGroup 수정하기
        id: roomName.slice(0, 10) + dayjs().format(" HH:mm:ss"),
        title: roomName,
        unSubmitStudents,
        yearGroup: now_year(),
      };

      if (nowClName) {
        new_checkList["clName"] = nowClName;
      }

      new_checkLists.push(new_checkList);

      //이미존재하는 unsubmitstudents에서 뺴주기
    } else {
      unSubmitStudents = [...checkListsData.unSubmitStudents];
      unSubmitStudents = unSubmitStudents?.filter((std) => {
        let dataExist = false;
        pad_titles.forEach((t) => {
          if (t.includes(std.name)) {
            dataExist = true;
            return;
          }
        });
        return !dataExist;
      });

      new_checkList = {
        //yearGroup 수정하기
        id: checkListsData.id,
        title: checkListsData.title,
        unSubmitStudents,
        yearGroup: now_year(),
      };

      if (nowClName) {
        new_checkList["clName"] = nowClName;
      }

      new_checkLists.splice(exist_index, 1, new_checkList);
    }

    setCheckListsRefData({
      uid: userUid,
      data: new_checkLists,
    });
    // });
  };

  const saveCheckLists = async (uid, data) => {
    await setDoc(doc(dbService, "checkLists", uid), { checkLists_data: data });
  };

  useEffect(() => {
    if (!checkListsRefData.uid) return;
    if (!checkListsRefData.data) return;
    saveCheckLists(checkListsRefData.uid, checkListsRefData.data);
  }, [checkListsRefData]);

  //패드 데이터 추가, 삭제 등 함수
  const padDatasHandler = async (new_datas, new_sectionNames) => {
    let padRef = doc(dbService, "padIt", roomName);
    let new_pad_data = {
      datas: new_datas,
      pw: roomPw,
      sectionNames: new_sectionNames,
      userUid: userUid,
      students: students,
      //userUid 가 "" 아니면 학생정보
    };

    if (nowClName) {
      new_pad_data["clName"] = nowClName;
      new_pad_data["students"] = Object.values(
        students?.filter((clObj) => Object.keys(clObj)[0] === nowClName)?.[0]
      )?.[0];
    }

    await setDoc(padRef, new_pad_data);
    //제출 연동의 경우.. 제출함수 실행!
    if (userUid !== "") {
      checkListsHandler(userUid, new_datas);
    }
  };

  return (
    <>
      {isTeacher ? (
        <div style={{ marginTop: "-80px" }}>
          {/* 교사용 화면 */}
          {/* 패드 추가하기 */}
          {showPadAdd && (
            <Modal onClose={() => setShowPadAdd(false)}>
              <PadAdd
                onClose={() => setShowPadAdd(false)}
                userUid={props.userUid}
                roomNames={roomNames}
                isTeacher={isTeacher}
                students={students}
                isSubject={isSubject}
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
              <p>
                담임교사용 초기버전이 개발중입니다. 테스트만 추천드립니다.
                (전담교사용 개발예정...)
              </p>
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
            userUid={props.userUid}
            padDatasHandler={padDatasHandler}
            userUidHandler={(userID) => {
              setUserUid(userID);
            }}
            students={students}
            setPadPwHandler={(pw) => setRoomPw(pw)}
            setPadNameHandler={(room) => setRoomName(room)}
            nowItemClName={(name) => setNowClName(name)}
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
              userUid={props.userUid}
              padSectionNames={padSectionNames}
              onClose={() => {
                itemCloseHandler();
              }}
              students={students}
              padDatasHandler={padDatasHandler}
            />
          )}
        </>
      )}
    </>
  );
};

export default PadIt;
