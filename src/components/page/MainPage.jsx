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
} from "firebase/firestore";
import classes from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";

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
  const [listMemo, setListMemo] = useState([]);
  const [todayYyyymmdd, setTodayYyyymmdd] = useState(
    getDateHandler(new Date())
  );
  const [titleDate, setTitleDate] = useState(
    getDateHandler(new Date(), "title")
  );

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
      // where("id".slice(0, 10), "==", getDateHandler(new Date()))
    );
    // console.log(attendQuery);

    onSnapshot(attendQuery, (snapShot) => {
      snapShot.docs.map((doc) => {
        if (doc.data().id.slice(0, 10) !== todayYyyymmdd) {
          return false;
        }

        const attendObj = {
          ...doc.data(),
          doc_id: doc.id,
        };
        // console.log(attendObj);
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

  //db에서 자료 받아오기 useEffect
  useEffect(() => {
    getAttendsFromDb();
    getScheduleFromDb();
    getTodoListsFromDb();
  }, [todayYyyymmdd]);

  return (
    <div style={{ marginTop: "0px" }}>
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

        <div
          className={classes["event-div"]}
          onClick={() => navigate(`/attendance`)}
        >
          <div className={classes["event-title"]}>
            😉 출결 {attendEvents.length || ""}
          </div>
          {attendEvents.length === 0 ? (
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
      </div>

      <p>* 처음오시면 먼저 학생명부를 입력해주세요!</p>
      <p>* 입력/확인이 필요한 부분을 누르시면 해당 메뉴로 이동합니다.</p>
      <p>* 메뉴의 곰돌이를 누르면 현재 화면으로 오실 수 있어요!</p>
    </div>
  );
};

export default MainPage;
