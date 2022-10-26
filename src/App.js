import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { dbService } from "./fbase";

import MainPage from "./components/page/MainPage";
import AttendancePage from "./components/page/AttendancePage";
import NumAttendancePage from "./components/page/NumAttendancePage";
import ClassgamePage from "./components/page/ClassgamePage";
import ConsultingPage from "./components/page/ConsultingPage";
import MemoPage from "./components/page/MemoPage";
import TodoPage from "./components/page/TodoPage";
import Header from "./components/Layout/Header";
import Profile from "./components/page/Profile";

import ConsultProvider from "./store/ConsultProvider";
import Auth from "./components/page/Auth";
import { authService } from "./fbase";
import StudentLists from "./components/page/StudentLists";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUid, setUserUid] = useState(null);
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState(null);
  const [menuOnHead, setMenuOnHead] = useState(true);

  useEffect(() => {
    try {
      authService.onAuthStateChanged((user) => {
        if (user) {
          setUserUid(user.uid);
          getStudents(user.uid);
          setUser(user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setStudents([]);
        }
        setInit(true);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //저장된 학생명부 불러오는 snapshot 함수
  //참고 https://firebase.google.com/docs/firestore/query-data/listen?hl=ko
  const getStudents = async (uid) => {
    //db에서 studnets 콜렉션 DB가져오고 doc id가 현재 유저인 doc 가져오기
    const docRef = doc(dbService, "students", uid);
    onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const sortNum = (students) => {
          const sorted_students = students.sort(function (a, b) {
            let a_num = `${a.num}`;
            let b_num = `${b.num}`;
            return a_num - b_num;
          });

          return sorted_students;
        };

        setStudents([...sortNum(doc.data().studentDatas)]);
      }
    });
  };

  const logOutHandler = () => {
    setInit(false);
    setIsLoggedIn(false);
    setUserUid(null);
    setStudents([]);
    setUser(null);
  };

  const setMenuHandler = () => {
    setMenuOnHead((prev) => !prev);
  };

  return (
    <div>
      <div className={menuOnHead ? "App" : "App-bottom"}>
        <ConsultProvider userUid={isLoggedIn ? userUid : ""}>
          <Header
            isLoggedIn={isLoggedIn}
            user={isLoggedIn && user}
            logOutHandler={logOutHandler}
            setMenuHandler={setMenuHandler}
            menuOnHead={menuOnHead}
          />
          <Routes>
            {init && isLoggedIn ? (
              <>
                <Route
                  index
                  element={<MainPage userUid={userUid} students={students} />}
                />

                <Route path="classgame" element={<ClassgamePage />} />

                <Route
                  path="attendance"
                  element={
                    <AttendancePage students={students} userUid={userUid} />
                  }
                />

                <Route
                  path="attendance/:studentNum"
                  element={<NumAttendancePage />}
                />

                <Route
                  path="consulting"
                  element={
                    <ConsultingPage students={students} userUid={userUid} />
                  }
                />

                <Route
                  path="memo"
                  element={<MemoPage students={students} userUid={userUid} />}
                />

                <Route path="todo" element={<TodoPage userUid={userUid} />} />

                <Route
                  path="student-manage"
                  element={
                    <StudentLists userUid={userUid} students={students} />
                  }
                />

                <Route path="profile" element={<Profile user={user} />} />
              </>
            ) : (
              <>
                <Route index element={<Auth />} />
              </>
            )}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </ConsultProvider>
      </div>
    </div>
  );
}

export default App;
