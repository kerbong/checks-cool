import { useState, useEffect, useRef } from "react";
import classes from "./PadIt.module.css";

import dayjs from "dayjs";
import { dbService } from "../../fbase";
import { getDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const PadAdd = (props) => {
  const [isExist, setIsExist] = useState(null);
  const [roomData, setRoomData] = useState({});
  const [roomNamesData, setRoomNamesData] = useState([]);
  const [linkCheckLists, setLinkCheckLists] = useState(true);
  const [clName, setClName] = useState("");

  const toggleRef = useRef();

  //방이름 데이터 받아오기 함수
  const getRoomNames = async (roomName, pw, clName) => {
    let padRef = doc(dbService, "padIt", "roomNames");
    let date_roomName = dayjs().format("YYYY-MM-DD") + roomName;
    onSnapshot(padRef, (doc) => {
      setRoomNamesData(doc?.data()?.datas);
      if (doc?.data()?.datas?.includes(date_roomName)) {
        setRoomData({});
        setIsExist(true);
      } else {
        let new_roomData = { name: date_roomName, pw: pw };
        if (props.isSubject) {
          new_roomData["clName"] = clName;
        }
        setRoomData(new_roomData);
        setIsExist(false);
      }
    });
  };

  //패드 추가 또는 접속 함수(검증까지)
  const addHandler = (e) => {
    e.preventDefault();
    let roomName = e.target.roomName.value;
    let roomPw = e.target.roomPw.value;

    //전담이면 학급 선택안하면 저장불가
    if (props.isSubject && e.target.option.value.trim() === "") return;

    //빈자료 만들기, 접속 불가
    if (roomName.trim() === "" || roomPw.trim() === "") return;

    //비밀번호 8자리이상 검증
    if (roomPw.trim().length < 8) {
      if (props.isTeacher) {
        Swal.fire(
          "저장 실패",
          "문자와 숫자를 포함해 8자리 이상으로 만들어주세요.",
          "warning"
        );
      } else {
        Swal.fire(
          "접속 실패",
          "비밀번호의 문자와 숫자를 정확하게 입력해주세요. 오류가 반복되면 선생님께 도움을 요청하세요.",
          "warning"
        );
      }
      return;
    }

    if (props.isTeacher) {
      //방이름 중복되는지 확인
      if (props.isSubject) {
        getRoomNames(roomName.trim(), roomPw.trim(), e.target.option.value);
        setClName(e.target.option.value);
      } else {
        getRoomNames(roomName.trim(), roomPw.trim());
      }
    } else {
      //학생이면 접속하기..!!
      props.getPadDatasHandler(roomName.trim(), roomPw.trim());
    }
  };

  //방 추가하기 함수
  const padAddDb = async () => {
    let new_roomNames = [...roomNamesData];
    new_roomNames.push(roomData.name);

    //방이름 목록문서에 추가하고
    await updateDoc(doc(dbService, "padIt", "roomNames"), {
      datas: new_roomNames,
    });

    let new_students = props.isSubject
      ? Object.values(
          props.students?.filter(
            (clObj) => Object.keys(clObj)[0] === clName
          )?.[0]
        )?.[0]
      : props.students;

    let new_data = {
      datas: [],
      pw: roomData.pw,
      sectionNames: ["0"],
      userUid: linkCheckLists ? props.userUid : "",
      //학생정보도 넣어서 저장..?(학생이 데이터 저장할 때, checkLists에 미제출 학생을 비교하려면 필요)
      students: linkCheckLists ? new_students : [],
    };

    if (props.isSubject) {
      new_data["clName"] = clName;
    }

    //방 문서 만들기
    await setDoc(doc(dbService, "padIt", roomData.name), new_data);

    //내 uid 방목록에 추가하기
    let new_userRoomNames = [...props.roomNames] || [];

    new_userRoomNames.push(roomData.name);

    await setDoc(doc(dbService, "padIt", props.userUid), {
      datas: new_userRoomNames,
    });
  };

  useEffect(() => {
    if (isExist === null) return;

    //중복 방이름
    if (isExist === true) {
      Swal.fire(
        "추가 실패",
        "이미 존재하는 방이름입니다. 방이름을 변경해주세요.",
        "warning"
      );

      //실제 저장로직
    } else if (isExist === false) {
      padAddDb();
      //모달창 닫기
      props.onClose();
    }
  }, [isExist]);

  return (
    <>
      <div>
        {props.isTeacher && (
          <span
            className={classes.closeBtn}
            style={{ display: "flex", justifyContent: "flex-end" }}
            onClick={() => {
              props.onClose();
            }}
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </span>
        )}
        <p className={classes["fs-17rem"]} style={{ textAlign: "center" }}>
          {props.isTeacher ? "패드잇 추가" : "수동으로 접속하기"}
        </p>
        <form onSubmit={addHandler} className={classes["flex-col-center"]}>
          {/* 교사이면서, 전담교사면 학급 선택하기 */}
          {props.isTeacher && props.isSubject && (
            <div className={classes["margin10"]}>
              {/* 전담교사 학급 선택하는 셀렉트 */}
              <select
                name={"option"}
                defaultValue={""}
                className={classes["select"]}
                required
              >
                <option value="">-학급 선택-</option>
                {props.students?.map((clObj, index) => (
                  <option key={index} value={Object.keys(clObj)?.[0]}>
                    {" "}
                    {Object.keys(clObj)?.[0]}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className={classes["margin10"]}>
            <label name="roomName" className={classes["margin10"]}>
              방 이름
            </label>
            <input
              type="text"
              name="roomName"
              required
              placeholder={
                props.isTeacher
                  ? "접속할 방이름(전담은 학급넣기!)"
                  : "접속할 방이름을 입력하세요."
              }
              className={classes["minwid-250"]}
              autoFocus
            />
          </div>
          <div className={classes["margin10"]}>
            <label name="roomPw" className={classes["margin10"]}>
              비밀번호
            </label>
            <input
              type="text"
              name="roomPw"
              required
              placeholder={
                props.isTeacher
                  ? "8자리이상 입력해주세요."
                  : "비밀번호를 입력하세요."
              }
              className={classes["minwid-250"]}
            />
          </div>
          {/* 제출ox 연동버튼 */}
          {props.isTeacher && (
            <div
              className={classes["margin10"]}
              style={{ justifyContent: "center" }}
            >
              <li className={classes["dropdown-li-nonehover"]}>
                * [생기부] - [제출ox] 연동 &nbsp;&nbsp;
                <input type="checkbox" id="toggle" hidden />
                <label
                  htmlFor="toggle"
                  className={
                    linkCheckLists
                      ? `${classes["toggleSwitch"]} ${classes["active"]}`
                      : `${classes["toggleSwitch"]}`
                  }
                  onClick={() => {
                    setLinkCheckLists((prev) => !prev);
                  }}
                  ref={toggleRef}
                >
                  <span className={classes["toggleButton"]}></span>
                </label>
              </li>
            </div>
          )}
          <div className={classes["margin10"]}>
            <input
              type="submit"
              value={props.isTeacher ? "추가하기" : "접속하기"}
              style={{ minWidth: "380px" }}
              className={classes["li-btn"]}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default PadAdd;
