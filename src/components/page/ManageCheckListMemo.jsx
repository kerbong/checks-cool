import React, { useState, useEffect } from "react";
import ManageEach from "./ManageEach";
import ManageChangeBtns from "./ManageChangeBtns";
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

  const { state } = useLocation();

  useEffect(() => {
    //받아온 학생정보?
    console.log(state);
  }, [state]);

  //선택된 학생 정보  번호 한칸띄우고 이름
  const selectStudentHandler = (studentNumName) => {
    setOnStudent(studentNumName);
  };

  const nowYear = () => {
    return +dayjs().format("MM") <= 2
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

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
      let new_onListMemo = listMemo.filter(
        (list) => list.name === onStudent.split(" ")[1]
      );
      setOnListMemo(new_onListMemo);

      let new_onCheckLists = checkLists.filter(
        (list) => list.name === onStudent.split(" ")[1]
      );
      setOnCheckLists(new_onCheckLists);
    }
  }, [onStudent]);

  return (
    <div>
      {/* 학생 보여주는 부분 */}
      <ManageEach
        students={props.students}
        userUid={props.userUid}
        isSubject={props.isSubject}
        selectStudentHandler={selectStudentHandler}
      />
      {/* 버튼 모음 보여주기 */}
      <ManageChangeBtns onStudent={onStudent} />

      {showListMemo ? (
        <>
          {/* 학생 개별기록 부분 보여주기 */}
          <ul className={classes["bottom-content-ul"]}>
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
                {/* 제출, 개별기록 */}
                <div className={classes["fs-13"]}>{list.memo}</div>
              </li>
            ))}
            {/* 자료 없음 표시 */}
            {onListMemo?.length === 0 && (
              <li className={classes["bottom-content-li"]}>
                * 저장된 학생관련 정보가 없어요!
              </li>
            )}
          </ul>
        </>
      ) : (
        <>
          {/* 학생 체크리스트 부분 보여주기 */}
          <div></div>
        </>
      )}
    </div>
  );
};

export default ManageCheckListMemo;
