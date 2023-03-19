import React, { useState, useEffect } from "react";
import ManageEach from "./ManageEach";
import Button from "../Layout/Button";
import dayjs from "dayjs";
import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router";
import classes from "./ManageEach.module.css";

const ManageCheckListMemo = (props) => {
  const [showListMemo, setShowListMemo] = useState(true);
  const [checkLists, setCheckLists] = useState([]);
  const [listMemo, setListMemo] = useState([]);
  const [onListMemo, setOnListMemo] = useState([]);
  const [onCheckLists, setOnCheckLists] = useState([]);
  const [onStudent, setOnStudent] = useState("");
  const [clName, setClName] = useState("");

  const { state } = useLocation();

  //선택된 학생 정보  번호 한칸띄우고 이름
  const selectStudentHandler = (studentNumName) => {
    setOnStudent(studentNumName);
  };

  const nowYear = () => {
    return +dayjs().format("MM") <= 2
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
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
    setCheckLists([]);
    let checkListsRef = doc(dbService, "checkLists", props.userUid);
    const checkListsSnap = await getDoc(checkListsRef);
    // const new_checkLists = [];
    // const years = [];
    onSnapshot(checkListsRef, (doc) => {
      if (checkListsSnap.exists()) {
        let new_checkLists = [];
        doc
          .data()
          ?.checkLists_data?.filter((data) => data.yearGroup === nowYear())
          ?.forEach((list) =>
            list.unSubmitStudents.forEach((stu) => {
              let new_data = { ...stu, id: list.id, title: list.title };
              //전담이면 clName도 추가함
              if (nowIsSubject) {
                new_data.clName = list.clName;
              }
              new_checkLists.push(new_data);
            })
          );

        setCheckLists([...new_checkLists]);
      }
    });

    //listMemo 인 경우
    setListMemo([]);
    let listMemoRef = doc(dbService, "listMemo", props.userUid);
    const listMemoDoc = await getDoc(listMemoRef);
    onSnapshot(listMemoRef, (doc) => {
      if (listMemoDoc.exists()) {
        let new_listMemo = [];
        doc
          .data()
          ?.listMemo_data?.filter((data) => data.yearGroup === nowYear())
          ?.forEach((list) =>
            list?.data?.forEach((item) => {
              let new_item = { ...item, id: list.id, title: list.title };
              //전담이면 clName도 추가함
              if (nowIsSubject) {
                new_item.clName = list.clName;
              }
              new_listMemo.push(new_item);
            })
          );

        setListMemo([...new_listMemo]);
      }
    });
  };

  useEffect(() => {
    getDatasFromDb();
  }, []);

  useEffect(() => {
    if (onStudent !== "") {
      //담임이면
      if (!nowIsSubject) {
        let new_onListMemo = listMemo.filter(
          (list) => list.name === onStudent.split(" ")[1]
        );
        setOnListMemo(new_onListMemo);

        let new_onCheckLists = checkLists.filter(
          (list) => list.name === onStudent.split(" ")[1]
        );
        setOnCheckLists(new_onCheckLists);

        //전담이면.. 반과 이름 모두 같아야 함
      } else {
        let new_onListMemo = listMemo.filter(
          (list) =>
            list.name === onStudent.split(" ")[1] && list.clName === clName
        );
        setOnListMemo(new_onListMemo);

        let new_onCheckLists = checkLists.filter(
          (list) =>
            list.name === onStudent.split(" ")[1] && list.clName === clName
        );
        setOnCheckLists(new_onCheckLists);
      }
    }
  }, [onStudent]);

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

      <ul className={classes["bottom-content-ul"]}>
        {/* 제출 개별기록 전환 버튼 */}
        <div className={classes["flex-center"]}>
          <Button
            name={showListMemo ? " 미제출 목록 보기" : " 개별기록 보기"}
            icon={<i className="fa-solid fa-rotate"></i>}
            onclick={() => setShowListMemo((prev) => !prev)}
            className={"save-classItem-button"}
            style={{ width: "200px", backgroundColor: "#f3feff" }}
          />
        </div>

        {showListMemo ? (
          <>
            {/* 학생 개별기록 부분 보여주기 */}
            {onListMemo?.map((list) => (
              <li
                key={list.id + list.num}
                id={list.id + list.num}
                className={classes["bottom-content-li"]}
              >
                {/* 제출, 개별기록의 id(yyyy-mm-dd) */}
                <div className={classes["flex-ml-10"]}>
                  {list.id.slice(0, 10)}
                </div>
                {/* 제목 */}
                <div className={classes["fs-13"]}>{list.title}</div>
                <hr className={classes["margin-15"]} />
                {/* 제출, 개별기록 */}
                <div className={classes["fs-13"]}>{list.memo}</div>
              </li>
            ))}
            {/* 자료 없음 표시 */}
            {onListMemo?.length === 0 && (
              <li className={classes["bottom-content-li"]}>
                * 학생의 개별기록 정보가 없어요!
              </li>
            )}
          </>
        ) : (
          <>
            {/* 학생 제출/미제출 부분 보여주기 */}
            {onCheckLists?.map((list) => (
              <li
                key={list.id + list.num}
                id={list.id + list.num}
                className={classes["bottom-content-li"]}
              >
                {/* 제출, 개별기록의 id(yyyy-mm-dd) */}
                <div className={classes["flex-ml-10"]}>
                  {list.id.slice(0, 10)} | 미제출
                </div>
                {/* 제목 */}
                <div className={classes["fs-13"]}>{list.title} </div>
              </li>
            ))}
            {/* 자료 없음 표시 */}
            {onCheckLists?.length === 0 && (
              <li className={classes["bottom-content-li"]}>
                * 학생의 미제출 정보가 없어요!
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default ManageCheckListMemo;
