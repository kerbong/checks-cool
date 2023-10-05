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
  const [explainOn, setExplainOn] = useState(false);

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
    let new_students = isSubject
      ? Object.values(
          students?.filter((clObj) => Object.keys(clObj)[0] === nowClName)?.[0]
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

    // 제출ox에 없던거면
    if (exist_index === 0) {
      //올해학생이름이 제목에 포함되어 있지 않으면 미제출학생에 추가

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
      students: userUid ? students : [],
      //userUid 가 "" 아니면 학생정보
    };

    if (nowClName) {
      new_pad_data["clName"] = nowClName;
      //userUid 있으면 제출ox 연동
      if (userUid !== "") {
        //전담교사면.. 해당학급 찾아서 학생명부
        if (isTeacher) {
          new_pad_data["students"] = Object.values(
            students?.filter(
              (clObj) => Object.keys(clObj)[0] === nowClName
            )?.[0]
          )?.[0];

          //학생이면 그냥 학생 ..
        } else {
          new_pad_data["students"] = students;
        }
      }
    }

    await setDoc(padRef, new_pad_data);
    //제출 연동의 경우.. 제출함수 실행!
    if (userUid !== "") {
      checkListsHandler(userUid, new_datas);
    }
  };

  //설명부분 html
  const showHowToUse = (
    <>
      <h2 onClick={() => setExplainOn((prev) => !prev)}>
        {" "}
        😮 사용 방법 및 주의사항{" "}
        <span>
          {explainOn ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}{" "}
        </span>
      </h2>
      <div className={explainOn ? classes.explainDiv : classes.explainDivHide}>
        {isTeacher && (
          <>
            <p className={classes[`ul`]} style={{ width: "90%" }}>
              <p className={classes["ex-title"]}>👉 패드 추가하기 </p>
              접속할 방이름과 비밀번호 (전담은 학급도 선택)를 설정해주세요.
              <br />* 주의 * 전담의 경우, 방이름에 학급명을 넣어주셔야
              패드리스트에서 구분이 편리합니다!
            </p>
            <p className={classes[`ul`]} style={{ width: "90%" }}>
              <p className={classes["ex-title"]}>👉 생기부 - 제출ox 연동?</p>
              연동을 설정하여 패드를 만든 경우, 학생들이 제목에 성을 포함한
              전체이름을 적어서 자료를 올릴 경우, 자동으로 [생기부] - [제출ox]에
              자료가 생성, 수정됩니다!
            </p>
            <p className={classes[`ul`]} style={{ width: "90%" }}>
              <p className={classes["ex-title"]}>👉 학생 접속방법</p>
              1. qr코드 접속 - 교사가 만든 방의 qr코드 확인을 누르면 나오는,
              qr코드를 태블릿, 혹은 핸드폰 카메라로 인식하여 접속하여
              사용합니다. <br />
              2. 수동접속 - qr코드 확인에 있는 방이름(날짜를 포함한!!)과
              비밀번호를 학생이 직접 입력하여 접속합니다.
            </p>
          </>
        )}

        {!isTeacher && (
          <p className={classes[`ul`]} style={{ width: "90%" }}>
            <p className={classes["ex-title"]}>👉 수동접속 방법</p>
            선생님에게 방이름과 비밀번호를 물어보고 그대로 입력하여 접속합니다.
          </p>
        )}
        <p className={classes[`ul`]} style={{ width: "90%" }}>
          <p className={classes["ex-title"]}>👉 자료 스타일 (기본? 섹션?)</p>
          1. 기본스타일 - 칠판에 포스트잇을 붙인 형태로 자료가 자동으로
          정렬됩니다. <br />
          2. 섹션스타일 - 선생님이 미리 만들어둔 찬성, 반대와 같은 섹션별로
          자료를 정렬합니다.
        </p>
        <p className={classes[`ul`]} style={{ width: "90%" }}>
          <p className={classes["ex-title"]}>👉 자료 세부 내용 확인</p>
          자료를 짧게 클릭하면 세부 내용을 확인할 수 있습니다.
          <br /> * 내가 쓴 자료 / 선생님은 자료의 내용을 수정, 삭제할 수
          있습니다.
        </p>
        <p className={classes[`ul`]} style={{ width: "90%" }}>
          <p className={classes["ex-title"]}>👉 자료 순서 바꾸기(이동)</p>
          자료를 길게 클릭하여 드래그하면 자료가 보이는 순서를 변경할 수
          있습니다!
          <br />
          (내가 쓴 자료만 / 선생님은 모두 가능)
        </p>
      </div>
    </>
  );

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
              <p>초기버전 개발 완료. 테스트 후 사용해주세요.</p>
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
      {showHowToUse}
    </>
  );
};

export default PadIt;
