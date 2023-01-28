import React, { useEffect, useState } from "react";
import Button from "../Layout/Button";
import { dbService, messaging } from "../../fbase";

import { getToken } from "firebase/messaging";

import { query, onSnapshot, getDoc, doc, setDoc } from "firebase/firestore";
import classes from "./MainPage.module.css";
import ClassItem from "../Main/ClassItem";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ExampleModal from "./ExampleModal";
import ocrGif from "../../assets/student/ocrGif.gif";
import xmasGift from "../../assets/notice/크리스마스선물.jpg";
import dayjs from "dayjs";
import AttendCalendar from "components/Attendance/AttendCalendar";

const update_title = "== 업데이트 안내 ==";

const update_text = "";
// "* 아, 이거 있으면 좋겠다! 하는 기능이 있으신가요? 내년에 사용해보고 싶은 기능을 추천해주세요! 가장 많은 추천을 받은 아이디어를 선정하여 추가할 계획입니다! '잼잼'-'이거해요' 에 적어주세요~ ";
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
  const [classBasic, setClassBasic] = useState([]);
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
  const [hideClassTable, setHideClassTable] = useState(true);
  const [classStart, setClassStart] = useState([]);
  // const [subjectYear, setSubjectYear] = useState(false);
  const [isSubject, setIsSubject] = useState(false);

  //업데이트 내용 보여주기 로컬스토리지에서 showNotice를 스트링으로 저장해서 확인 후에 이전에 봤으면 안보여주기
  const [showNotice, setShowNotice] = useState(
    localStorage.getItem("showNotice") === "doThis" ? false : true
  );

  const classLists = [
    "아침",
    "1교시",
    "2교시",
    "3교시",
    "4교시",
    "5교시",
    "6교시",
    "방과후",
  ];

  const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

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

  const calDateHandler = (date) => {
    let weekd = dayjs(date).format("d");
    let weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    setTodayYyyymmdd(dayjs(date).format("YYYY-MM-DD"));
    setTitleDate(dayjs(date).format(`YYYY년 MM월 DD일(${weekDays[weekd]})`));
  };

  //firestore에서 오늘 attend관련 자료들 받아오기
  const getAttendsFromDb = (isSubject) => {
    setAttendEvents([]);

    let attendRef = query(doc(dbService, "attend", props.userUid));
    onSnapshot(attendRef, (doc) => {
      let new_attends = [];
      if (isSubject) {
        doc?.data()?.attend_data?.forEach((cl) => {
          let attends = [];
          // new_attends.push(...Object.values(cl));
          Object.values(cl).forEach((atd) => {
            attends.push(...atd);
          });
          let new_data = [];
          attends.forEach((atd) => {
            // console.log(atd);
            if (atd.id.slice(0, 10) === todayYyyymmdd) {
              new_data.push({ ...atd, cl: Object.keys(cl)[0] });
            }
          });
          new_attends.push(...new_data);
        });
      } else {
        doc?.data()?.attend_data?.forEach((data) => {
          if (data?.id?.slice(0, 10) === todayYyyymmdd) {
            new_attends.push(data);
          }
        });
      }
      // console.log(new_attends);
      setAttendEvents([...new_attends]);
    });
  };

  //firestore에서 공용/개인 스케쥴 자료 받아오기
  const getScheduleFromDb = () => {
    setSchedule([]);

    let publicRef = doc(dbService, "todo", roomInfo);

    let personalRef = doc(dbService, "todo", props.userUid);

    const new_schedule = [];

    onSnapshot(publicRef, (doc) => {
      doc?.data()?.todo_data?.forEach((data) => {
        if (data.id.slice(0, 10) === todayYyyymmdd) {
          const new_data = { ...data, public: true };
          new_schedule.push(new_data);
        }
      });
    });

    onSnapshot(personalRef, (doc) => {
      doc?.data()?.todo_data?.forEach((data) => {
        if (data.id.slice(0, 10) === todayYyyymmdd) {
          const new_data = { ...data, public: false };
          new_schedule.push(new_data);
        }
      });
    });

    setSchedule(new_schedule);
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

  //firestore에서 제출(냄 안냄) 받아오기
  const getCheckListsFromDb = () => {
    let checkListsRef = doc(dbService, "checkLists", props.userUid);
    setCheckLists([]);
    onSnapshot(checkListsRef, (doc) => {
      const new_checkLists = [];
      doc?.data()?.checkLists_data?.forEach((data) => {
        if (data.id.slice(0, 10) === todayYyyymmdd) {
          new_checkLists.push(data);
        }
      });
      setCheckLists([...new_checkLists]);
    });
  };

  //firestore에서 개별 명렬표 기록 받아오기
  const getListMemoFromDb = () => {
    let listMemoRef = doc(dbService, "listMemo", props.userUid);
    setListMemo([]);
    onSnapshot(listMemoRef, (doc) => {
      const new_listMemo = [];
      doc?.data()?.listMemo_data?.forEach((data) => {
        if (data.id.slice(0, 10) === todayYyyymmdd) {
          new_listMemo.push(data);
        }
      });
      setListMemo([...new_listMemo]);
    });
  };

  //firestore에서 오늘 시간표 관련 자료들 받아오기
  const getClassTableFromDb = async () => {
    let classTableRef = doc(dbService, "classTable", props.userUid);
    setClassTable([]);
    setClassBasic([]);
    setTodayClassTable({});
    setClassStart([]);

    const now_doc = await getDoc(classTableRef);
    if (now_doc.exists()) {
      setClassTable([...now_doc?.data()?.datas]);
      let todayClass = now_doc
        ?.data()
        ?.datas.filter((data) => data.id === todayYyyymmdd);
      // console.log(todayClass);
      if (todayClass.length !== 0) {
        setTodayClassTable({ ...todayClass[0] });
        // console.log(todayClass[0]);
      } else {
        setTodayClassTable({ id: "", classMemo: [] });
      }

      //오늘 요일설정
      let today_weekday = new Date(todayYyyymmdd).getDay();
      //기초 시간표 내용 넣기
      if (today_weekday > 0 && today_weekday < 6) {
        setClassBasic(now_doc.data()?.[WEEKDAYS[today_weekday]]);
      }

      //교시별 시작시간 세팅하기
      if (now_doc?.data()?.classStart) {
        setClassStart([...now_doc?.data()?.classStart]);
      }
    }
  };

  //db에서 자료 받아오기 useEffect
  useEffect(() => {
    //해당학년도에 전담여부 확인
    let year = todayYyyymmdd.slice(0, 4);
    let month = todayYyyymmdd.slice(5, 7);

    if (+month <= 1) {
      year = String(+year - 1);
    }

    let isSubject = false;
    props.isSubject?.forEach((yearData) => {
      if (Object.keys(yearData)?.[0] === year) {
        setIsSubject(yearData[year]);
        isSubject = yearData[year];
      }
    });

    getAttendsFromDb(isSubject);
    getScheduleFromDb();
    getClassTableFromDb();
    getCheckListsFromDb();
    getListMemoFromDb();
  }, [todayYyyymmdd, props.isSubject]);

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
    // console.log(new_classMemo);

    Swal.fire({
      icon: "success",
      title: "자료가 저장되었어요.",
      text: "5초 후에 창이 사라집니다.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });

    // console.log(classTable);

    //최신 .. 클래스 테이블 전체 자료 가져오고
    const new_classTable = [...classTable];
    if (new_classTable.length !== 0) {
      new_classTable.forEach((data, index) => {
        // console.log(data.id);
        // console.log(new_classMemo.id);
        if (data.id === new_classMemo.id) {
          // console.log("날짜가 같은 자료");
          new_classTable.splice(index, 1);
        }
      });
    }

    new_classTable.push(new_classMemo);

    const new_classData = { datas: new_classTable };

    // console.log(new_classTable);
    // console.log(new_classData);

    const classMemoRef = doc(dbService, "classTable", props.userUid);
    await setDoc(classMemoRef, new_classData);
  };

  return (
    <div className={classes["whole-div"]}>
      {props.showMainExample && (
        <ExampleModal
          onClose={() => props.setShowMainExample()}
          imgSrc={ocrGif}
          text={
            <>
              <p
                style={{
                  fontSize: "1.3em",
                  textAlign: "center",
                  margin: "5px",
                }}
              >
                === 처음 학생등록 예시 ===
              </p>
              <p style={{ margin: "15px" }}>
                * 화면 왼쪽 상단의 현재 페이지 타이틀을 클릭하시면 각 화면의
                예시를 보실 수 있어요!
              </p>
            </>
          }
        />
      )}

      {/* //update 업데이트 시 보여줄 팝업창 */}
      {showNotice && (
        <ExampleModal
          onClose={() => {
            localStorage.setItem("showNotice", "doThis");
            setShowNotice(false);
          }}
          imgSrc={xmasGift}
          text={
            <>
              <p
                style={{
                  fontSize: "1.3em",
                  textAlign: "center",
                  margin: "5px",
                }}
              >
                {update_title}
              </p>
              <p
                className={`${classes.p} ${classes.top}`}
                dangerouslySetInnerHTML={{ __html: update_text }}
              ></p>
            </>
          }
          bottomText={
            <>
              <p className={classes.p}>
                * 화면 우측 상단의 <i className="fa-solid fa-user"></i> -
                "공지사항"에 들어오시면 내용을 다시 보실 수 있어요.
              </p>
            </>
          }
        />
      )}

      <div className={classes["events"]}>
        <div className={classes["events-dateArea"]}>
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
          >
            {/* {titleDate} */}
            {/* 오늘 날짜 보여주는 부분 날짜 클릭하면 달력도 나옴 */}
            <span className={classes["hide-cal"]}>
              <AttendCalendar
                getDateValue={calDateHandler}
                about="main"
                setStart={new Date(todayYyyymmdd)}
              />
            </span>
          </span>
          <span
            className={classes["events-dateMove"]}
            onClick={() => moveDateHandler("tomorrow")}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </span>
        </div>

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

        {/* 시간표 */}
        <div className={classes["event-div"]}>
          <div
            className={classes["event-title"]}
            onClick={() => setHideClassTable((prev) => !prev)}
          >
            🕘 시간표
            <span className={classes["event-title-dropdown"]}>
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
                      classStart={classStart?.[index]}
                      subject={
                        todayClassTable?.classMemo?.[index]?.subject ||
                        classBasic?.[index] ||
                        ""
                      }
                      memo={todayClassTable?.classMemo?.[index]?.memo || ""}
                    />
                  ))}
                </ul>
                <div className={classes["eventSave-div"]}>
                  <Button
                    name={"기초시간표"}
                    className={"show-basicClass-button"}
                    onclick={() => navigate(`/classTable`)}
                  />
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
              <li
                key={
                  !isSubject
                    ? event.id + event.num
                    : event.cl + event.id + event.num
                }
                className={classes["main-li"]}
              >
                {isSubject && (
                  <span className={classes["mr-underline"]}>{event.cl}</span>
                )}
                {event.num}번 - {event.name} / {event.option.slice(1)} /{" "}
                {event.note || ""}
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
                  {event.public ? "공용) " : "개인) "}
                  {event.eventName}({event.option.slice(1)})
                </span>
                <span> {event.note ? ` / ${event.note}` : ""}</span>
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

        {/* 제출 냄안냄 checklist 목록 */}
        <div
          className={classes["event-div"]}
          onClick={() => navigate(`/memo`, { state: "checkLists" })}
        >
          <div className={classes["event-title"]}>👉 미제출</div>

          {checkLists.length === 0 ? (
            <li className={classes["main-li"]}> 자료 없음</li>
          ) : (
            <>
              {checkLists.map(
                (event) =>
                  event.unSubmitStudents.length !== 0 && (
                    <li key={event.id} className={classes["mainCheckLists-li"]}>
                      <span>
                        {isSubject && (
                          <span className={classes["mr-underline"]}>
                            {event.clName}
                          </span>
                        )}
                        {event.title} ({event.unSubmitStudents.length})
                      </span>
                      <span className={classes["mainCheckLists-students"]}>
                        {" "}
                        {event.unSubmitStudents.map((stu) => (
                          <span
                            key={stu.num + stu.name}
                            className={classes["mainCheckLists-student"]}
                          >{`${stu.name}`}</span>
                        )) || ""}
                      </span>
                    </li>
                  )
              )}
            </>
          )}
        </div>

        {/* 개별기록 listmemo 목록 */}
        <div
          className={classes["event-div"]}
          onClick={() => navigate(`/memo`, { state: "listMemo" })}
        >
          <div className={classes["event-title"]}>📑 개별기록</div>

          {listMemo.length === 0 ? (
            <li className={classes["main-li"]}>* 자료 없음</li>
          ) : (
            <>
              {listMemo.map(
                (event) =>
                  event.data.length !== props.students.length && (
                    <li key={event.id} className={classes["mainCheckLists-li"]}>
                      <span>
                        {isSubject && (
                          <span className={classes["mr-underline"]}>
                            {event.clName}
                          </span>
                        )}
                        {event.title} / 미입력 (
                        {
                          props.students.filter(
                            (stu) =>
                              !event.data
                                .map((data) => data.num)
                                .includes(stu.num)
                          ).length
                        }
                        )
                      </span>
                    </li>
                  )
              )}
            </>
          )}
        </div>
      </div>

      <p className={classes.p}>* 처음오시면 먼저 학생명부를 입력해주세요!</p>
      <p className={classes.p}>
        * 메뉴의 곰돌이를 누르면 현재 화면으로 오실 수 있어요!
      </p>
    </div>
  );
};

export default MainPage;
