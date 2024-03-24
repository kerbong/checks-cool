import React, { useState, useEffect, useRef } from "react";
import ManageEach from "./ManageEach";
import Button from "../Layout/Button";
import dayjs from "dayjs";
import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router";
import classes from "./ManageEach.module.css";
import { utils, writeFile } from "xlsx";
import DoughnutChart from "../Manage/DoughnutChart";
import SearchCheckListMemo from "components/Manage/SearchCheckListMemo";
import Swal from "sweetalert2";
import { FaDownload } from "react-icons/fa6";

const ManageCheckListMemo = (props) => {
  const [students, setStudents] = useState([]);
  const [showListMemo, setShowListMemo] = useState(true);
  const [checkLists, setCheckLists] = useState([]);
  const [originCheckLists, setOriginCheckLists] = useState([]);
  const [listMemo, setListMemo] = useState([]);
  const [originListMemo, setOriginListMemo] = useState([]);
  const [onListMemo, setOnListMemo] = useState([]);
  const [onCheckLists, setOnCheckLists] = useState([]);
  const [onStudent, setOnStudent] = useState("");
  const [clName, setClName] = useState("");

  const { state } = useLocation();

  //선택된 학생 정보  번호 한칸띄우고 이름
  const selectStudentHandler = (studentNumName) => {
    setOnStudent(studentNumName);
  };

  //학년도 설정함수
  const setYear = () => {
    return dayjs().format("MM-DD") <= "02-15"
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

  const nowIsSubject = changeSubjectHandler(setYear());

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
        let now_year_data = doc
          .data()
          ?.checkLists_data?.filter((data) => data.yearGroup === setYear());

        now_year_data?.forEach((list) => {
          let now_students = [...students];
          let nowClassName = list?.clName;
          //혹시 데이터에 없는 학급목록이면 return

          if (
            now_students?.filter((cl) => Object.keys(cl)[0] === nowClassName)
              ?.length === 0
          )
            return;

          if (nowClassName?.length > 0) {
            now_students?.forEach((cl, cl_ind) => {
              if (Object.keys(cl)[0] === nowClassName) {
                now_students = now_students[cl_ind][nowClassName];
              }
            });
          }

          now_students?.forEach((stu1) => {
            let new_data = {
              ...stu1,
              id: list.id,
              title: list.title,
              submit: true,
            };
            //미제출 학생이면
            if (
              list.unSubmitStudents?.some((stu2) => +stu1.num === +stu2.num)
            ) {
              new_data.submit = false;
            }
            //전담이면 clName도 추가함
            if (list?.clName) {
              new_data.clName = list.clName;
            }
            new_checkLists.push(new_data);
          });
        });

        //학생용 가공데이터
        setCheckLists([...new_checkLists]);

        //전체학생 검색 등 쿼리를 위한 원래 데이터
        setOriginCheckLists([...now_year_data]);
      }
    });

    //listMemo 인 경우
    setListMemo([]);
    setOriginListMemo([]);
    let listMemoRef = doc(dbService, "listMemo", props.userUid);
    const listMemoDoc = await getDoc(listMemoRef);
    onSnapshot(listMemoRef, (doc) => {
      if (listMemoDoc.exists()) {
        let new_listMemo = [];
        let now_year_data = doc
          .data()
          ?.listMemo_data?.filter((data) => data.yearGroup === setYear());

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
        setOriginListMemo([...now_year_data]);
      }
    });
  };

  useEffect(() => {
    if (students?.length === 0) return;
    getDatasFromDb();
  }, [students, props.userUid]);

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

        setOnCheckLists(
          new_onCheckLists.sort((a, b) => (a.submit > b.submit ? 1 : -1))
        );

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
        setOnCheckLists(
          new_onCheckLists.sort((a, b) => (a.submit > b.submit ? 1 : -1))
        );
      }
    }

    //학생 선택을 안한 경우, 처음에 db에서 받아와서 저장해둔 데이터를 사용하므로, 따로 설정해줄 필요 없음..!

    if (!showListMemo) {
      doughnut_datas();
    }
  }, [onStudent, listMemo]);

  useEffect(() => {
    //받아온 정보 { student: 학생번호 이름 , clName: 전담이면 반이름}
    let new_onStudent = state?.student;
    let new_clName = state?.clName;

    if (new_clName !== "") {
      setClName(new_clName);
    }
    if (new_onStudent !== "" && new_onStudent) {
      setOnStudent(new_onStudent);
    }
  }, [state]);

  //선택되어 있는 학급 (전담의 경우)
  const nowClassNameHandler = (classname) => {
    setClName(classname);
  };

  useEffect(() => {
    let now_year = setYear();
    //현재학년도 자료만 입력가능하고,, 불러오기
    let now_students = props?.students?.filter(
      (yearStd) => Object.keys(yearStd)[0] === now_year
    )?.[0]?.[now_year];

    setStudents(now_students);
  }, [props.students]);

  //엑셀로 저장하기 함수
  const saveExcelHandler = () => {
    // listmemo가 없으면 저장하지 않기
    if (originListMemo?.length === 0) return;

    // console.log(listMemo);
    const new_datas = [];
    originListMemo?.forEach((memo) => {
      memo.data.forEach((stud) => {
        let data = [+stud.num, stud.name, memo.title, stud.memo];
        if (nowIsSubject) {
          data.unshift(memo.clName);
        }
        new_datas.push(data);
      });
    });
    if (nowIsSubject) {
      new_datas.unshift(["반", "번호", "이름", "개별기록 제목", "기록내용"]);
    } else {
      new_datas.unshift(["번호", "이름", "개별기록 제목", "기록내용"]);
    }
    //새로운 가상 엑셀파일 생성
    const book = utils.book_new();
    const listMemo_datas = utils.aoa_to_sheet(new_datas);
    //셀의 넓이 지정
    listMemo_datas["!cols"] = [
      { wpx: 40 },
      { wpx: 50 },
      { wpx: 100 },
      { wpx: 300 },
    ];
    if (nowIsSubject) {
      listMemo_datas["!cols"].unshift({ wpx: 40 });
    }
    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, listMemo_datas, "개별기록");

    writeFile(
      book,
      `${setYear()}학년도 개별기록(${dayjs().format("YYYY-MM-DD")}).xlsx`
    );
  };

  //도넛차트로 보낼 데이터셋,
  const doughnut_datas = () => {
    let submitNum = 0;
    let unSubmitNum = 0;

    originCheckLists?.forEach((list) => {
      // 전담인데.. 현재 선택된 학급과 자료 학급이 다르면 리턴
      if (nowIsSubject && list?.clName !== clName) return;
      list?.unSubmitStudents?.filter(
        (stu) => stu?.name === onStudent?.split(" ")[1]
      )?.length > 0
        ? (unSubmitNum += 1)
        : (submitNum += 1);
    });

    const new_datas = {
      labels: ["제출", "미제출"],
      datasets: [
        {
          label: "개수",
          // 제출개수, 미제출개수 보내기
          data: [submitNum, unSubmitNum],
          backgroundColor: ["#ffcd56", "#4bc0c0"],
          borderWidth: 0,
        },
      ],
    };
    return new_datas;
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
            name={<span> 제출 </span>}
            onclick={() => setShowListMemo(false)}
            className={
              showListMemo
                ? "change-checkList-button"
                : "change-checkList-button-clicked"
            }
          />
          <Button
            name={<span> 개별기록 </span>}
            onclick={() => setShowListMemo(true)}
            className={
              !showListMemo
                ? "change-listMemo-button"
                : "change-listMemo-button-clicked"
            }
          />
          {/* 엑셀저장버튼 */}
          <Button
            name={<span> 저장</span>}
            icon={<FaDownload />}
            title={"보이는 데이터를 모두 저장하기"}
            onclick={saveExcelHandler}
            className={"excelSave-button"}
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
                <SearchCheckListMemo
                  about="listMemo"
                  allCheckListMemo={originListMemo}
                  students={students}
                  nowIsSubject={nowIsSubject}
                />
              </>
            )}
          </>
        ) : (
          <>
            {/* checkList 관련 렌더링 */}
            {/* 선택된 학생이 있으면 개별학생 정보 보여주기 */}
            {onStudent !== "" && (
              <div
                className={`${classes["flex-wrap"]}`}
                style={{ width: "100%" }}
              >
                {/* 전체 제출ox 자료 중에.. 현재학생 미제출 개수 원그래프 차트로 보여주기 */}
                <div
                  className={classes["flex-center"]}
                  style={{ width: "100%" }}
                >
                  <li
                    id={"notChecked"}
                    className={classes["bottom-content-li"]}
                    style={{ width: "200px" }}
                  >
                    <DoughnutChart data={doughnut_datas()} />
                  </li>
                </div>

                {/* 학생 제출/미제출 부분 보여주기 */}
                {onCheckLists?.map((list, ind) => (
                  <div key={list.id + list.num}>
                    <li
                      id={list.id + list.num}
                      className={classes["bottom-content-li"]}
                      style={
                        list.submit
                          ? { width: "300px", backgroundColor: "#ffde90" }
                          : { width: "300px" }
                      }
                    >
                      {/* 제출, 개별기록의 id(yyyy-mm-dd) */}
                      <div className={classes["flex-ml-10"]}>
                        {list.id.slice(0, 10)}&nbsp;{" "}
                        {list.submit ? "(제출)" : "(미제출)"}
                      </div>
                      {/* 제목 */}
                      <div className={classes["fs-13"]}>{list.title} </div>
                    </li>
                    {/* 제출 미제출 구분선 */}
                    {/* {ind > 0 &&
                      onCheckLists?.[ind]?.submit !==
                        onCheckLists?.[ind - 1]?.submit && (
                        <hr style={{ width: "100vw" }} />
                      )} */}
                  </div>
                ))}
                {/* 자료 없음 표시 */}
                {onCheckLists?.length === 0 && (
                  <li className={classes["bottom-content-li"]}>
                    * 학생의 제출 관련 정보가 없어요!
                  </li>
                )}
              </div>
            )}

            {/* 선택된 학생이 없으면.. 검색쿼리 */}
            {onStudent === "" && (
              <>
                <SearchCheckListMemo
                  about="checkLists"
                  allCheckListMemo={originCheckLists}
                  students={students}
                  nowIsSubject={nowIsSubject}
                />
              </>
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default ManageCheckListMemo;
