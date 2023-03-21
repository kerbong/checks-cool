import React, { useState, useEffect, useRef } from "react";
import ManageEach from "./ManageEach";
import Button from "../Layout/Button";
import dayjs from "dayjs";
import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router";
import classes from "./ManageEach.module.css";
import CompareListMemoTable from "../Manage/CompareListMemoTable";
import Swal from "sweetalert2";

const ManageCheckListMemo = (props) => {
  const [students, setStudents] = useState([]);
  const [showListMemo, setShowListMemo] = useState(true);
  const [checkLists, setCheckLists] = useState([]);
  const [listMemo, setListMemo] = useState([]);
  const [allListMemo, setAllListMemo] = useState([]);
  const [onAllListMemo, setOnAllListMemo] = useState([]);
  const [onListMemo, setOnListMemo] = useState([]);
  const [compareListMemo, setCompareListMemo] = useState([]);
  const [showCompareListMemo, setShowCompareListMemo] = useState(false);
  const [onCheckLists, setOnCheckLists] = useState([]);
  const [onStudent, setOnStudent] = useState("");
  const [clName, setClName] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const { state } = useLocation();

  const searchRef = useRef();

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
    setAllListMemo([]);
    let listMemoRef = doc(dbService, "listMemo", props.userUid);
    const listMemoDoc = await getDoc(listMemoRef);
    onSnapshot(listMemoRef, (doc) => {
      if (listMemoDoc.exists()) {
        let new_listMemo = [];
        let now_year_data = doc
          .data()
          ?.listMemo_data?.filter((data) => data.yearGroup === nowYear());

        now_year_data?.forEach((list) =>
          list?.data?.forEach((item) => {
            let new_item = { ...item, id: list.id, title: list.title };
            //전담이면 clName도 추가함
            if (nowIsSubject) {
              new_item.clName = list.clName;
            }
            new_listMemo.push(new_item);
          })
        );
        //개별학생 자료로 가공한거
        setListMemo([...new_listMemo]);
        //전체학생 검색 등 쿼리를 위한 원래 데이터
        setAllListMemo([...now_year_data]);
        setOnAllListMemo([...now_year_data]);
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
  }, [onStudent, listMemo]);

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

  //검색부분 함수
  const searchWordHandler = () => {
    let word = searchRef.current.value;
    setSearchWord(word);
  };

  //검색하는 단어가 입력되면.. 전체 자료에서 해당하는 게 있는 것들만 보여주기
  useEffect(() => {
    //검색이 빈칸이면 전체 보여주고
    if (searchWord === "") {
      setOnAllListMemo([...allListMemo]);
    } else {
      //해당 단어를 포함하고 있으면.. 그걸 다 보여줌
      let new_onAllListMemo = allListMemo?.filter((memo) =>
        memo.title.includes(searchWord)
      );
      setOnAllListMemo([...new_onAllListMemo]);
    }
  }, [searchWord]);

  //검색이 끝나고 완료를 클릭하면 실행되는 함수
  useEffect(() => {
    if (!showCompareListMemo) return;

    // 선택한 비교자료들을 화면에 보여주기
  }, [showCompareListMemo]);

  //각 listMemo클릭하면 저장해두는 함수
  const compareListMemoHandler = (memo) => {
    //기존에 존재하면 isExist true, 없었으면 false
    let isExist =
      compareListMemo?.filter((list) => list.id === memo.id)?.length > 0
        ? true
        : false;
    let new_data = [...compareListMemo];
    //같은게 있으면 제거해주고
    if (isExist) {
      new_data = new_data?.filter((list) => list.id !== memo.id);
      //새로운 거면 추가해주기
    } else {
      new_data?.push(memo);
    }
    // id를 기준으로 정렬해서 넣기

    setCompareListMemo(new_data.sort((a, b) => a.id > b.id));
  };

  //학년도 설정함수
  const setYear = () => {
    return +dayjs().format("MM") <= 2
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  useEffect(() => {
    let now_year = setYear();
    //현재학년도 자료만 입력가능하고,, 불러오기
    let now_students = props?.students?.filter(
      (yearStd) => Object.keys(yearStd)[0] === now_year
    )?.[0]?.[now_year];

    setStudents(now_students);
  }, [props.students]);

  //초기화 함수
  const resetHandler = () => {
    if (compareListMemo?.length === 0) return;

    Swal.fire({
      icon: "warning",
      title: "초기화 할까요?",
      text: "선택했던 항목들을 모두 선택 취소할까요?",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: true,
      denyButtonText: "취소",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setCompareListMemo([]);
      } else {
        return;
      }
    });
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

      {/* 전체 청록색 배경 */}
      <ul className={classes["bottom-content-ul"]}>
        {/* 제출 개별기록 전환 버튼 */}
        <div
          className={classes["flex-center"]}
          style={{ margin: "-10px 0 15px 0", height: "60px" }}
        >
          {/* 전환버튼 */}
          <Button
            name={showListMemo ? <span>제출보기</span> : " 개별기록 보기"}
            icon={<i className="fa-solid fa-rotate"></i>}
            onclick={() => setShowListMemo((prev) => !prev)}
            className={"save-classItem-button"}
            style={{
              width: "auto",
              backgroundColor: "#f3feff",
              height: "auto",
              padding: "10px",
              position: "absolute",
              left: "2%",
            }}
          />
        </div>

        {showListMemo ? (
          <>
            {/* 선택된 학생이 있으면 개별학생 정보 보여주기 */}
            {onStudent !== "" && (
              <div
                className={`${classes["flex-wrap"]}`}
                style={{ width: "100%" }}
              >
                {/* 학생 개별기록 부분 보여주기 */}
                {onListMemo?.map((list) => (
                  <li
                    key={list.id + list.num}
                    id={list.id + list.num}
                    className={classes["bottom-content-li"]}
                    style={{ minWidth: "170px", maxWidth: "400px" }}
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
              </div>
            )}

            {/* 선택된 학생이 없으면.. 검색쿼리 만들기 */}
            {onStudent === "" && (
              <>
                {/* 비교하는 화면이 아니면 */}
                {!showCompareListMemo ? (
                  <>
                    <h2 className={classes["fs-15"]}>
                      전체학생 개별기록 모아보기
                    </h2>
                    <h4 style={{ color: "white" }}>
                      * 검색 후 여러 자료를 선택(클릭)하시고
                      <br />
                      완료를 눌러주세요.(pc추천) <br />
                    </h4>
                    {/* 검색창 */}

                    <input
                      type="text"
                      ref={searchRef}
                      placeholder="제목 검색"
                      onChange={searchWordHandler}
                      className={classes["search-title"]}
                    />
                    {/* 완료버튼 */}
                    <button
                      onClick={() => setShowCompareListMemo(true)}
                      className={classes["search-btns"]}
                    >
                      완료
                    </button>

                    {/* 초기화버튼 */}
                    <button
                      onClick={resetHandler}
                      className={classes["search-btns"]}
                    >
                      초기화
                    </button>
                    {/* 선택한 자료 타이틀만 보여주기 */}
                    <div className={classes["bottom-content-li"]}>
                      <h3 className={classes["margin-15"]}>
                        선택된 자료{" "}
                        {compareListMemo?.length > 0 &&
                          `(${compareListMemo?.length})`}
                      </h3>
                      <div
                        className={classes["flex-center"]}
                        style={{ flexWrap: "wrap" }}
                      >
                        {compareListMemo?.map((list) => (
                          <div
                            key={"compare" + list.title}
                            className={classes["clicked-title"]}
                          >
                            {list.title}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 전체 자료 보여지는 부분 */}
                    <div
                      className={`${classes["flex-wrap"]}`}
                      style={{ width: "100%" }}
                    >
                      {onAllListMemo?.map((memo) => (
                        <li
                          key={memo.id}
                          id={memo.id}
                          className={`${classes["bottom-content-li"]} ${
                            compareListMemo?.filter(
                              (list) => list.id === memo.id
                            )?.length > 0
                              ? classes["list-clicked"]
                              : ""
                          }`}
                          style={{ width: "200px" }}
                          onClick={() => {
                            compareListMemoHandler(memo);
                          }}
                        >
                          {memo.id}
                          <br />
                          <h3>{memo.title}</h3>
                        </li>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* 비교하는 화면이면 */}
                    <button
                      onClick={() => {
                        setCompareListMemo([]);
                        setShowCompareListMemo(false);
                      }}
                      className={classes["search-btns"]}
                    >
                      비교닫기
                    </button>
                    <CompareListMemoTable
                      listMemo={compareListMemo}
                      students={students}
                    />
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {/* 선택된 학생이 있으면 개별학생 정보 보여주기 */}
            {onStudent !== "" && (
              <div
                className={`${classes["flex-wrap"]}`}
                style={{ width: "100%" }}
              >
                {/* 학생 제출/미제출 부분 보여주기 */}
                {onCheckLists?.map((list) => (
                  <li
                    key={list.id + list.num}
                    id={list.id + list.num}
                    className={classes["bottom-content-li"]}
                    style={{ width: "300px" }}
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
              </div>
            )}
            {/* 선택된 학생이 없을 경우 검색쿼리... 보여주기 */}
            {onStudent === "" && ""}
          </>
        )}
      </ul>
    </div>
  );
};

export default ManageCheckListMemo;
