import React, { useEffect, useState } from "react";
import Button from "../Layout/Button";
import { dbService } from "../../fbase";
import {
  collection,
  query,
  onSnapshot,
  where,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import classes from "./MainPage.module.css";
import ClassItem from "../Main/ClassItem";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ExampleModal from "./ExampleModal";
import ocrExample from "../../assets/ocr-example-gif.gif";

//오늘 날짜 yyyy-mm-dd로 만들기
const getDateHandler = (date, titleOrQuery) => {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  if (titleOrQuery === "title") {
    let weekd = date.getDay();
    let weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    return `${year}년 ${month}월 ${day}일(${weekDays[weekd]})`;
  } else {
    return year + "-" + month + "-" + day;
  }
};

const MainPage = (props) => {
  const [attendEvents, setAttendEvents] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [toDoLists, setToDoLists] = useState([]);
  const [classTable, setClassTable] = useState([]);
  const [checkLists, setCheckLists] = useState([]);
  const [listMemo, setListMemo] = useState([]);
  const [todayYyyymmdd, setTodayYyyymmdd] = useState(
    getDateHandler(new Date())
  );
  const [titleDate, setTitleDate] = useState(
    getDateHandler(new Date(), "title")
  );
  const [todayClassTable, setTodayClassTable] = useState({
    id: "",
    classMemo: [],
  });
  const [hideClassTable, setHideClassTable] = useState(false);
  const [showExample, setShowExample] = useState(
    props.students.length === 0 ? true : false
  );

  let classLists = ["1", "2", "3", "4", "5", "6"];

  let navigate = useNavigate();

  let roomInfo = localStorage.getItem("todoPublicRoom");
  if (roomInfo === null) {
    roomInfo = "--";
  }

  const moveDateHandler = (tomoOrYester) => {
    let now = new Date(todayYyyymmdd);
    let tOrY;
    if (tomoOrYester === "tomorrow") {
      tOrY = new Date(now.setDate(now.getDate() + 1));
    } else if (tomoOrYester === "yesterday") {
      tOrY = new Date(now.setDate(now.getDate() - 1));
    }
    setTodayYyyymmdd(getDateHandler(tOrY, "query"));
    setTitleDate(getDateHandler(tOrY, "title"));
  };

  //firestore에서 오늘 attend관련 자료들 받아오기
  const getAttendsFromDb = () => {
    setAttendEvents([]);

    let attendQuery = query(
      collection(dbService, "attend"),
      where("writtenId", "==", props.userUid)
    );

    onSnapshot(attendQuery, (snapShot) => {
      snapShot.docs.map((doc) => {
        if (doc.data().id.slice(0, 10) !== todayYyyymmdd) {
          return false;
        }

        const attendObj = {
          ...doc.data(),
          doc_id: doc.id,
        };

        return setAttendEvents((prev) => {
          prev.forEach((prev_data, index) => {
            if (prev_data.id === attendObj.id) {
              prev.splice(index, 1);
            }
          });

          return [...prev, attendObj];
        });
      });
    });
  };

  //firestore에서 공용/개인 스케쥴 자료 받아오기
  const getScheduleFromDb = () => {
    setSchedule([]);

    let publicQuery = query(
      collection(dbService, "todo"),
      where("owner", "==", roomInfo)
    );

    let personalQuery = query(
      collection(dbService, "todo"),
      where("owner", "==", "personal"),
      where("writtenId", "==", props.userUid)
    );

    onSnapshot(publicQuery, (snapShot) => {
      snapShot.docs.map((doc) => {
        if (doc.data().id.slice(0, 10) !== todayYyyymmdd) {
          return false;
        }

        const pubSheduleObj = {
          ...doc.data(),
          doc_id: doc.id,
        };
        // console.log(pubSheduleObj);
        return setSchedule((prev) => {
          prev.forEach((prev_data, index) => {
            if (prev_data.id === pubSheduleObj.id) {
              prev.splice(index, 1);
            }
          });
          return [...prev, pubSheduleObj];
        });
      });
    });

    onSnapshot(personalQuery, (snapShot) => {
      snapShot.docs.map((doc) => {
        if (doc.data().id.slice(0, 10) !== todayYyyymmdd) {
          return false;
        }

        const personSheduleObj = {
          ...doc.data(),
          doc_id: doc.id,
        };
        // console.log(personSheduleObj);

        return setSchedule((prev) => {
          prev.forEach((prev_data, index) => {
            if (prev_data.id === personSheduleObj.id) {
              prev.splice(index, 1);
            }
          });
          return [...prev, personSheduleObj];
        });
      });
    });
  };

  //firestore에서 오늘 할일 관련 자료들 받아오기
  const getTodoListsFromDb = async () => {
    let memoRef = doc(dbService, "memo", props.userUid);
    let memoSnap = await getDoc(memoRef);

    if (memoSnap.exists()) {
      onSnapshot(memoRef, (doc) => {
        doc.data().memoTodo.forEach((data) => {
          if (data.deleted === false && data.checked === false) {
            setToDoLists((prev) => {
              prev.forEach((prev_data, index) => {
                if (prev_data.id === data.id) {
                  prev.splice(index, 1);
                }
              });
              return [...prev, data];
            });
          }
        });
      });
    }
  };

  const sortList = (list) => {
    const sorted_lists = list.sort(function (a, b) {
      let a_date = `${a.id}`;
      let b_date = `${b.id}`;
      return new Date(a_date) - new Date(b_date);
    });
    return sorted_lists.reverse();
  };

  const getDateDiff = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const diffDate = date1.getTime() - date2.getTime();

    return Math.abs(diffDate / (1000 * 60 * 60 * 24));
    // 밀리세컨 * 초 * 분 * 시 = 일
  };
  //firestore에서 제출(냄 안냄) 받아오기
  const getCheckListsFromDb = () => {
    let checkListsQuery = query(
      collection(dbService, "checkLists"),
      where("writtenId", "==", props.userUid)
    );

    onSnapshot(checkListsQuery, (snapShot) => {
      snapShot.docs.map((doc) => {
        const itemObj = {
          ...doc.data(),
          doc_id: doc.id,
        };

        //최근 7일 이내의 자료만 보여줌
        if (getDateDiff(doc.data().id, todayYyyymmdd) < 7) {
          return setCheckLists((prev) => {
            prev.forEach((prev_data, index) => {
              if (prev_data.doc_id === itemObj.doc_id) {
                prev.splice(index, 1);
              }
            });
            return [...prev, itemObj];
          });
        } else {
          return false;
        }
      });
    });
  };

  //firestore에서 개별 명렬표 기록 받아오기

  const getListMemoFromDb = () => {
    let listMemoQuery = query(
      collection(dbService, "listMemo"),
      where("writtenId", "==", props.userUid)
    );

    onSnapshot(listMemoQuery, (snapShot) => {
      snapShot.docs.map((doc) => {
        const itemObj = {
          ...doc.data(),
          doc_id: doc.id,
        };

        //최근 7일 이내의 자료만 보여줌
        if (getDateDiff(doc.data().id, todayYyyymmdd) < 7) {
          return setListMemo((prev) => {
            prev.forEach((prev_data, index) => {
              if (prev_data.doc_id === itemObj.doc_id) {
                prev.splice(index, 1);
              }
            });
            return [...prev, itemObj];
          });
        } else {
          return false;
        }
      });
      // console.log(listMemo);
    });
  };

  //firestore에서 오늘 시간표 관련 자료들 받아오기
  const getClassTableFromDb = async () => {
    let classTableRef = doc(dbService, "classTable", props.userUid);
    let memoSnap = await getDoc(classTableRef);

    if (memoSnap.exists()) {
      onSnapshot(classTableRef, (doc) => {
        setClassTable([...doc.data().datas]);
        let todayClass = doc
          .data()
          .datas.filter((data) => data.id === todayYyyymmdd);
        if (todayClass.length !== 0) {
          setTodayClassTable({ ...todayClass[0] });
          // console.log(todayClass[0]);
        } else {
          setTodayClassTable({ id: "", classMemo: [] });
        }
      });
    }
  };

  //db에서 자료 받아오기 useEffect
  useEffect(() => {
    getAttendsFromDb();
    getScheduleFromDb();
    getClassTableFromDb();
    getCheckListsFromDb();
    getListMemoFromDb();
  }, [todayYyyymmdd]);

  useEffect(() => {
    getTodoListsFromDb();
  }, []);

  //시간표 저장 함수
  const saveClassMemoHandler = async (classMemo) => {
    let new_classMemo = {
      id: todayYyyymmdd,
      classMemo: [],
    };

    //각각의 인덱스를 기준으로 각교시 과목 이름과 메모를 저장함.
    classLists.forEach((item, index) => {
      let subject = document.querySelector(`#classSubject-${item}`);
      let memo = document.querySelector(`#classMemo-${item}`);

      new_classMemo["classMemo"].push({
        classNum: item,
        subject: subject.value.trim(),
        memo: memo.value.trim(),
      });
    });
    //데이터는 new_classMemo라는 객체에 저장
    console.log(new_classMemo);

    Swal.fire({
      icon: "success",
      title: "자료가 저장되었어요.",
      text: "5초 후에 창이 사라집니다.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });

    console.log(classTable);

    const new_classTable = [...classTable];
    if (new_classTable.length !== 0) {
      new_classTable.forEach((data, index) => {
        console.log(data.id);
        console.log(new_classMemo.id);
        if (data.id === new_classMemo.id) {
          // console.log("날짜가 같은 자료");
          new_classTable.splice(index, 1);
        }
      });
    }

    new_classTable.push(new_classMemo);

    const new_classData = { datas: new_classTable };

    console.log(new_classTable);
    console.log(new_classData);

    const classMemoRef = doc(dbService, "classTable", props.userUid);
    await setDoc(classMemoRef, new_classData);
  };

  return (
    <div style={{ marginTop: "0px" }}>
      {showExample && (
        <ExampleModal
          onClose={() => setShowExample(false)}
          imgSrc={ocrExample}
          text={
            <>
              <p style={{ fontSize: "1.3em", textAlign: "center" }}>
                === 학생명부 입력 예시 ===
              </p>
              <p>* 다시 보시려면 오늘 날짜를 클릭해주세요!"</p>
            </>
          }
        />
      )}
      <div className={classes["events"]}>
        <h2 className={classes["events-dateArea"]}>
          <span
            className={classes["events-dateMove"]}
            onClick={() => moveDateHandler("yesterday")}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </span>
          <span
            className={
              getDateHandler(new Date(), "title") === titleDate
                ? classes["events-today"]
                : ""
            }
            onClick={() => setShowExample(true)}
          >
            {titleDate}
          </span>
          <span
            className={classes["events-dateMove"]}
            onClick={() => moveDateHandler("tomorrow")}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </span>
        </h2>

        <div id="title-div">
          <Button
            name={" 오늘로"}
            onclick={() => {
              setTodayYyyymmdd(getDateHandler(new Date()));
              setTitleDate(getDateHandler(new Date(), "title"));
            }}
            className="main-studentPage"
            icon={<i className="fa-solid fa-reply"></i>}
          />
          <Button
            name={" 학생명부"}
            path={"student-manage"}
            className="main-studentPage"
            icon={<i className="fa-solid fa-user-plus"></i>}
          />
        </div>

        {/* 출결목록 */}
        <div
          className={classes["event-div"]}
          onClick={() => navigate(`/attendance`)}
        >
          <div className={classes["event-title"]}>
            😉 출결 {attendEvents.length || ""}
          </div>
          {props.students.length === 0 && (
            <li className={classes["main-li"]}>* 학생명부를 입력해주세요!</li>
          )}
          {props.students.length !== 0 && attendEvents.length === 0 ? (
            <li className={classes["main-li"]}>모두 출석!</li>
          ) : (
            attendEvents.map((event) => (
              <li key={event.id} className={classes["main-li"]}>
                {event.student_num}번 {event.student_name} /{" "}
                {event.option.slice(1)} / {event.note || ""}
              </li>
            ))
          )}
        </div>

        {/* 공용 개별일정 */}
        <div className={classes["event-div"]} onClick={() => navigate(`/todo`)}>
          <div className={classes["event-title"]}>📆 일정</div>

          {schedule.length === 0 ? (
            <li className={classes["main-li"]}>일정 없음</li>
          ) : (
            schedule.map((event) => (
              <li key={event.id} className={classes["main-li"]}>
                <span>
                  {event.eventName}({event.option.slice(1)})
                </span>
                <span>/ {event.note || ""}</span>
              </li>
            ))
          )}
        </div>

        {/* 할일 목록 */}
        <div className={classes["event-div"]} onClick={() => navigate(`/memo`)}>
          <div className={classes["event-title"]}>📝 할 일</div>
          {toDoLists.length === 0 ? (
            <li className={classes["main-li"]}>할 일 없음</li>
          ) : (
            toDoLists.map((event) => (
              <li key={event.id} className={classes["main-li"]}>
                {event.text}
              </li>
            ))
          )}
        </div>

        {/* 제출 냄안냄 목록 */}
        <div
          className={classes["event-div"]}
          onClick={() => navigate(`/memo`, { state: "checkLists" })}
        >
          <div className={classes["event-title"]}>👉 미제출</div>

          {checkLists.length === 0 ? (
            <li className={classes["main-li"]}>* 7일 이내의 자료 없음</li>
          ) : (
            <>
              {checkLists.map(
                (event) =>
                  event.unSubmitStudents.length !== 0 && (
                    <li key={event.id} className={classes["mainCheckLists-li"]}>
                      <span>
                        {event.title}({event.unSubmitStudents.length})
                      </span>
                      <span className={classes["mainCheckLists-students"]}>
                        {" "}
                        {event.unSubmitStudents.map((stu) => (
                          <span
                            key={stu.num + stu.name}
                            className={classes["mainCheckLists-student"]}
                          >{`${stu.num}번 ${stu.name}`}</span>
                        )) || ""}
                      </span>
                    </li>
                  )
              )}
              <span className={classes["mainCheckLists-student"]}>
                * 날짜를 기준으로 7일 이내의 자료입니다
              </span>
            </>
          )}
        </div>

        {/* 개별기록 목록 */}
        <div
          className={classes["event-div"]}
          onClick={() => navigate(`/memo`, { state: "listMemo" })}
        >
          <div className={classes["event-title"]}>📑 개별기록</div>

          {listMemo.length === 0 ? (
            <li className={classes["main-li"]}>* 7일 이내의 자료 없음</li>
          ) : (
            <>
              {listMemo.map(
                (event) =>
                  event.data.length !== props.students.length && (
                    <li key={event.id} className={classes["mainCheckLists-li"]}>
                      <span className={classes["mainCheckLists-student"]}>
                        {event.title} / 미입력 (
                        {
                          props.students.filter(
                            (stu) =>
                              !event.data
                                .map((data) => data.student_num)
                                .includes(stu.num)
                          ).length
                        }
                        )
                      </span>
                    </li>
                  )
              )}
              <span className={classes["mainCheckLists-student"]}>
                * 날짜를 기준으로 7일 이내의 자료입니다
              </span>
            </>
          )}
        </div>

        {/* 시간표 */}
        <div className={classes["event-div"]}>
          <div className={classes["event-title"]}>
            <span>🕘 시간표 </span>
            <span
              className={classes["event-title-dropdown"]}
              onClick={() => setHideClassTable((prev) => !prev)}
            >
              {" "}
              {hideClassTable ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i className="fa-solid fa-chevron-up"></i>
              )}{" "}
            </span>
          </div>

          <div
            className={
              hideClassTable
                ? classes["eventContent-hide"]
                : classes["eventContent-show"]
            }
          >
            {titleDate.slice(-2, -1) !== "토" &&
            titleDate.slice(-2, -1) !== "일" ? (
              <>
                <ul className={classes["ul-section"]}>
                  {classLists.map((classNum, index) => (
                    <ClassItem
                      key={`item${classNum}`}
                      myKey={`class${classNum}`}
                      classNum={classNum}
                      subject={
                        todayClassTable.id.length !== 0
                          ? todayClassTable.classMemo[index]["subject"]
                          : ""
                      }
                      memo={
                        todayClassTable.id.length !== 0
                          ? todayClassTable.classMemo[index]["memo"]
                          : ""
                      }
                    />
                  ))}
                </ul>
                <div className={classes["eventSave-div"]}>
                  <Button
                    name={"저장"}
                    className={"save-classItem-button"}
                    onclick={saveClassMemoHandler}
                  />
                </div>
              </>
            ) : (
              "주말에는 푹 쉬세요❤"
            )}
          </div>
        </div>
      </div>

      <p>* 처음오시면 먼저 학생명부를 입력해주세요!</p>
      <p>* 입력/확인이 필요한 부분을 누르시면 해당 메뉴로 이동합니다.</p>
      <p>* 메뉴의 곰돌이를 누르면 현재 화면으로 오실 수 있어요!</p>
    </div>
  );
};

export default MainPage;
