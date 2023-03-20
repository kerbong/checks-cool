import React, { useState, useEffect } from "react";
import ManageEach from "./ManageEach";
import { useLocation } from "react-router";
import dayjs from "dayjs";
import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import classes from "./ManageEach.module.css";

const ManageConsult = (props) => {
  const [onStudent, setOnStudent] = useState("");
  const [consults, setConsults] = useState([]);
  const [onConsults, setOnConsults] = useState([]);
  const [clName, setClName] = useState("");

  const { state } = useLocation();

  const nowYear = (dataId) => {
    let data_id = dataId ? dataId : new Date();
    return +dayjs(data_id).format("MM") <= 2
      ? String(+dayjs(data_id).format("YYYY") - 1)
      : dayjs(data_id).format("YYYY");
  };

  //firestore에서 checkLists와 listMemo 둘다 받아서 저장해두기
  const getDatasFromDb = async () => {
    //checkLists 부분, 올해 자료만 저장하기
    setConsults([]);
    let consultsRef = doc(dbService, "consult", props.userUid);
    const consultsSnap = await getDoc(consultsRef);

    //id가 이번학년도 인 자료만 저장해둠.
    onSnapshot(consultsRef, (doc) => {
      if (consultsSnap.exists()) {
        let new_consults = doc
          .data()
          ?.consult_data?.filter(
            (data) => nowYear(data.id.slice(0, 10)) === nowYear()
          );

        setConsults([...new_consults]);
      }
    });
  };

  useEffect(() => {
    getDatasFromDb();
  }, []);

  //선택된 학생에 따라 정보를 필터해서 보여줌.
  useEffect(() => {
    if (onStudent !== "") {
      let new_onConsults;
      //담임이면
      if (clName === "") {
        new_onConsults = consults?.filter(
          (consult) => consult.name === onStudent.split(" ")[1]
        );

        //전담이면.. 반과 이름 모두 같아야 함
      } else {
        new_onConsults = consults?.filter(
          (data) =>
            data.clName === clName && data.name === onStudent.split(" ")[1]
        );
      }

      setOnConsults(new_onConsults);
    }
  }, [onStudent, consults]);

  //선택된 학생 정보  번호 한칸띄우고 이름
  const selectStudentHandler = (studentNumName) => {
    setOnStudent(studentNumName);
  };

  //이미지나 음성파일 없을 경우 보여주지 않기
  const imageOnError = (event) => {
    event.currentTarget.style.display = "none";
  };

  //선택되어 있는 학급 (전담의 경우)
  const nowClassNameHandler = (classname) => {
    setClName(classname);
  };

  useEffect(() => {
    //받아온 정보 { student: 학생번호 이름 , clName: 전담이면 반이름}
    let new_onStudent = state?.student;
    let new_clName = state?.clName;

    if (new_clName !== "") {
      setClName(new_clName);
    }
    if (new_onStudent !== "") {
      setOnStudent(new_onStudent);
    }
  }, [state]);

  return (
    <div>
      {/* 학생 보여주는 부분 */}
      <ManageEach
        students={props.students}
        userUid={props.userUid}
        isSubject={props.isSubject}
        selectStudentHandler={selectStudentHandler}
        clName={clName}
        passStudent={onStudent}
        nowClassNameHandler={nowClassNameHandler}
      />

      {/* 학생 상담부분 보여주기 */}
      <ul className={classes["bottom-content-ul"]}>
        <div className={`${classes["flex-wrap"]}`} style={{ width: "100%" }}>
          {onConsults?.map((consult) => (
            <li
              key={consult.id}
              id={consult.id}
              className={classes["bottom-content-li"]}
              style={{ minWidth: "240px", maxWidth: "540px" }}
            >
              {/* 상담의 id(yyyy-mm-dd) 시간:분 보여줌 */}
              <div className={classes["flex-ml-10"]}>
                {`${consult.id.slice(0, 10)} ${consult.id.slice(10, 15)}`}
              </div>
              {/* 상담옵션 */}
              <div className={classes["fs-13"]}>{consult.option.slice(1)}</div>
              <hr className={classes["margin-15"]} />
              {/* 메모한 내용 */}
              <div className={classes["fs-13"]}>{consult.note}</div>
              {/* 첨부한 사진이나 음성파일 있으면 보여주기 */}
              {/* 이미지 / 녹음파일이 있으면 이미지 보여주기 */}
              {consult.attachedFileUrl && (
                <div className={classes["margin-15"]}>
                  <img
                    className={classes["width-max400"]}
                    src={consult.attachedFileUrl}
                    height="auto"
                    alt="filePreview"
                    onError={imageOnError}
                  />
                  <audio
                    controls
                    className={classes["width-max400"]}
                    src={consult.attachedFileUrl}
                    onError={imageOnError}
                  ></audio>
                </div>
              )}
            </li>
          ))}
          {/* 자료 없음 표시 */}
          {onConsults?.length === 0 && (
            <li className={classes["bottom-content-li"]}>
              * 학생의 상담기록이 없어요!
            </li>
          )}
        </div>
      </ul>
    </div>
  );
};

export default ManageConsult;
