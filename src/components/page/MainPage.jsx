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

const MainPage = (props) => {
  const [attendEvents, setAttendEvents] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [toDoLists, setToDoLists] = useState([]);
  const [listMemo, setListMemo] = useState([]);

  let roomInfo = localStorage.getItem("todoPublicRoom");
  if (roomInfo === null) {
    roomInfo = "--";
  }

  //오늘 날짜 yyyy-mm-dd로 만들기
  const getDateHandler = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  };

  let todayYyyymmdd = getDateHandler(new Date());

  //firestore에서 오늘 attend관련 자료들 받아오기
  const getAttendsFromDb = () => {
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
  }, []);

  return (
    <div style={{ marginTop: "0px" }}>
      <div id="title-div">
        <button id="title-btn" className="mainSum">
          오늘-요약
        </button>

        <Button
          name={" 학생명부"}
          path={"student-manage"}
          className="main-studentPage"
          icon={<i className="fa-solid fa-user-plus"></i>}
        />
      </div>
      <div className={classes["events"]}>
        <div className={classes["event-div"]}>
          {attendEvents.length === 0
            ? "오늘 출결관련 정보가 없어요"
            : attendEvents.map((event) => (
                <li key={event.id}>
                  {event.id}
                  {event.student_name}
                </li>
              ))}
        </div>

        <div className={classes["event-div"]}>
          {schedule.length === 0
            ? "오늘 공용/개인 일정 관련 정보가 없어요"
            : schedule.map((event) => <li key={event.id}>{event.id}</li>)}
        </div>

        <div className={classes["event-div"]}>
          {toDoLists.length === 0
            ? "오늘 할일 관련 정보가 없어요"
            : toDoLists.map((event) => <li key={event.id}>{event.text}</li>)}
        </div>
      </div>

      <p>* 처음오시면 먼저 학생명부를 입력해주세요!</p>
      <p>* 메뉴의 곰돌이를 누르면 현재 화면으로 오실 수 있어요!</p>
    </div>
  );
};

export default MainPage;
