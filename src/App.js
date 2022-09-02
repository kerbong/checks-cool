import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { dbService } from "./fbase";

import MainPage from "./components/page/MainPage";
import AttendancePage from "./components/page/AttendancePage";
import NumAttendancePage from "./components/page/NumAttendancePage";
import ClassgamePage from "./components/page/ClassgamePage";
import ConsultingPage from "./components/page/ConsultingPage";
import MemoPage from "./components/page/MemoPage";
import TodoPage from "./components/page/TodoPage";
import Header from "./components/Layout/Header";
import AttendProvider from "./store/AttendProvider";
import ConsultProvider from "./store/ConsultProvider";
import Auth from "./components/page/Auth";
import { authService } from "./fbase";
import StudentLists from "./components/page/StudentLists";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUid, setUserUid] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
        setIsLoggedIn(true);
        getStudents(user.uid);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  //저장된 학생명부 불러오는 snapshot 함수
  //참고 https://firebase.google.com/docs/firestore/query-data/listen?hl=ko
  const getStudents = async (uid) => {
    //db에서 studnets 콜렉션 DB가져오고 doc id가 현재 유저인 doc 가져오기
    const docRef = doc(dbService, "students", uid);
    onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setStudents([...doc.data().studentDatas]);
      }
    });
  };

  return (
    <div>
      <div className="App">
        <AttendProvider userUid={userUid}>
          <ConsultProvider userUid={userUid}>
            <Header isLoggedIn={isLoggedIn} />
            <Routes>
              {init && isLoggedIn ? (
                <>
                  <Route index element={<MainPage />} />
                  <Route path="classgame" element={<ClassgamePage />} />
                  <Route
                    path="attendance"
                    element={<AttendancePage students={students} />}
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
                  <Route path="memo" element={<MemoPage />} />
                  <Route path="todo" element={<TodoPage />} userUid={userUid} />
                  <Route
                    path="student-manage"
                    element={
                      <StudentLists userUid={userUid} students={students} />
                    }
                  />
                </>
              ) : (
                <>
                  <Route index element={<Auth />} />
                </>
              )}
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </ConsultProvider>
        </AttendProvider>
      </div>
    </div>
  );
}

export default App;
