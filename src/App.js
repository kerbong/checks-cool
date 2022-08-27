import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";

import MainPage from "./components/page/MainPage";
import AttendancePage from "./components/page/AttendancePage";
import NumAttendancePage from "./components/page/NumAttendancePage";
import ClassgamePage from "./components/page/ClassgamePage";
import ConsultingPage from "./components/page/ConsultingPage";
import MemoPage from "./components/page/MemoPage";
import TodoPage from "./components/page/TodoPage";
import Header from "./components/Layout/Header";
import AttendProvider from "./store/AttendProvider";
import students from "./studentInfo";
import ConsultProvider from "./store/ConsultProvider";
import Auth from "./components/page/Auth";

import { authService } from "./fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

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
                  <Route path="todo" element={<TodoPage />} />
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
