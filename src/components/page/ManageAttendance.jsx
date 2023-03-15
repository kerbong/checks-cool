import React, { useState, useEffect } from "react";
import ManageEach from "./ManageEach";
import dayjs from "dayjs";
import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router";
import classes from "./ManageEach.module.css";
import Button from "components/Layout/Button";

const ManageAttendance = (props) => {
  const [onStudent, setOnStudent] = useState("");
  const [clName, setClName] = useState("");
  const [attends, setAttends] = useState([]);
  const [onAttends, setOnAttends] = useState([]);
  const [showOnAttends, setShowOnAttends] = useState([]);
  const [onAttendsOption, setOnAttendsOption] = useState([]);
  const [showAttendOption, setShowAttendOption] = useState("");

  const { state } = useLocation();

  const nowYear = (dataId) => {
    let data_id = dataId ? dataId : new Date();
    return +dayjs(data_id).format("MM") <= 2
      ? String(+dayjs(data_id).format("YYYY") - 1)
      : dayjs(data_id).format("YYYY");
  };

  //해당학년도의 전담여부 확인해서 설정하는 함수
  const changeSubjectHandler = (data_year) => {
    let isSubject;
    if (props.isSubject) {
      isSubject = props.isSubject?.filter(
        (yearData) => Object.keys(yearData)[0] === data_year
      )?.[0]?.[data_year];
    }
    return isSubject;
  };

  const nowIsSubject = changeSubjectHandler(nowYear());

  //firestore에서 checkLists와 listMemo 둘다 받아서 저장해두기
  const getDatasFromDb = async () => {
    //checkLists 부분, 올해 자료만 저장하기
    setAttends([]);
    let attendRef = doc(dbService, "attend", props.userUid);
    const attendSnap = await getDoc(attendRef);

    //id가 이번학년도 인 자료만 저장해둠.
    onSnapshot(attendRef, (doc) => {
      if (attendSnap.exists()) {
        let new_attend;

        //담임이면
        if (!nowIsSubject) {
          new_attend = doc
            .data()
            ?.attend_data?.filter(
              (data) => nowYear(data.id.slice(0, 10)) === nowYear()
            );

          //전담이면
        } else {
          new_attend = doc.data()?.attend_data;
        }

        setAttends([...new_attend]);
      }
    });
  };

  useEffect(() => {
    getDatasFromDb();
  }, []);

  //선택된 학생에 따라 정보를 필터해서 보여줌.
  useEffect(() => {
    if (onStudent !== "") {
      //담임이면
      if (!nowIsSubject) {
        let new_onAttends =
          attends?.filter(
            (attend) => attend.name === onStudent.split(" ")[1]
          ) || [];
        setOnAttends(new_onAttends);
        setShowOnAttends(new_onAttends);

        //총 정리한 부분에서 option만 따옴
        let new_onAttendsOption = new_onAttends?.map((attend) =>
          attend.option.slice(1)
        );
        setOnAttendsOption(new_onAttendsOption);

        //전담이면
      } else {
        let new_onAttends =
          attends?.[clName]?.filter(
            (attend) => attend.name === onStudent.split(" ")[1]
          ) || [];
        setOnAttends(new_onAttends);
        setShowOnAttends(new_onAttends);

        //총 정리한 부분에서 option만 따옴
        let new_onAttendsOption = new_onAttends?.map((attend) =>
          attend.option.slice(1)
        );
        setOnAttendsOption(new_onAttendsOption);
      }
    }
  }, [onStudent]);

  useEffect(() => {
    //받아온 정보 { student: 학생번호 이름 , clName: 전담이면 반이름}
    let new_onStudent = state?.student;
    let new_clName = state?.clName;
    if (new_onStudent !== "") {
      setOnStudent(new_onStudent);
    }

    if (new_clName !== "") {
      setClName(new_clName);
    }
  }, [state]);

  //선택된 학생 정보  번호 한칸띄우고 이름
  const selectStudentHandler = (studentNumName) => {
    setOnStudent(studentNumName);
  };

  //현재 보여주는 학생의 출결 옵션을 선택하면.. 보여주는거 수정
  useEffect(() => {
    //받아온 정보 { student: 학생번호 이름 , clName: 전담이면 반이름}
    let new_onStudent = state?.student;
    let new_clName = state?.clName;
    if (new_onStudent !== "") {
      setOnStudent(new_onStudent);
    }

    if (new_clName !== "") {
      setClName(new_clName);
    }
  }, [state]);

  //출결 옵션을 선택하면.. 보여주는 걸 바꿔주기
  useEffect(() => {
    //전체보여주는 거면.. 그냥 모두
    if (showAttendOption === "") {
      setShowOnAttends(onAttends);
    } else {
      let new_showOnAttends = onAttends?.filter(
        (attend) => attend.option.slice(1) === showAttendOption
      );
      setShowOnAttends(new_showOnAttends);
    }
  }, [showAttendOption]);

  //선택되어 있는 학급 (전담의 경우)
  const nowClassNameHandler = (classname) => {
    setClName(classname);
  };

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

      {/* 학생 출결부분 보여주기 */}
      <ul className={classes["bottom-content-ul"]}>
        {onStudent && (
          <>
            {/* 전체 출결 확인 출결옵션별 횟수 기록 */}
            <li className={classes["bottom-content-li"]}>
              {onStudent} | 출결 정보
              <hr className={classes["margin-15"]} />
              {onAttends?.length === 0 ? (
                <div className={`${classes["fs-13"]} ${classes["margin-15"]}`}>
                  개근입니다!
                </div>
              ) : (
                <div>
                  {/* 전체 버튼 */}
                  <Button
                    key={`whole`}
                    id={`whole`}
                    className={
                      showAttendOption === "" ? "sortBtn-clicked" : "sortBtn"
                    }
                    name={`전체(${onAttendsOption?.length})`}
                    onclick={() => {
                      setShowAttendOption("");
                    }}
                  />
                  {/* 옵션별 버튼 */}
                  {[...new Set(onAttendsOption)]?.map((option) => (
                    <Button
                      key={option}
                      id={option}
                      className={
                        showAttendOption === option
                          ? "sortBtn-clicked"
                          : "sortBtn"
                      }
                      name={`${option} (${
                        onAttendsOption?.filter((op) => op === option).length
                      })`}
                      onclick={() => {
                        setShowAttendOption(option);
                      }}
                    />
                  ))}
                </div>
              )}
            </li>

            {/* 개별 출결기록 */}
            {showOnAttends?.map((attend) => (
              <li
                key={attend.id}
                id={attend.id}
                className={classes["bottom-content-li"]}
              >
                {/* 출결의 id(yyyy-mm-dd)보여줌 */}
                <div className={classes["flex-ml-10"]}>
                  {attend.id.slice(0, 10)}
                </div>
                {/* 출결옵션 */}
                <div className={classes["fs-13"]}>
                  {attend.option.slice(1)} | {attend.note || "(메모 없음)"}
                </div>
                {/* 메모한 내용 */}

                <div className={classes["fs-13"]}></div>
              </li>
            ))}
            {/* 자료 없음 표시 */}
            {onAttends?.length === 0 && (
              <li className={classes["bottom-content-li"]}>
                * 학생의 출결기록이 없어요!
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default ManageAttendance;
