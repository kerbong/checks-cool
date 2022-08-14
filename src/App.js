import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useMemo } from "react";

import MainPage from "./components/page/MainPage";
import AttendancePage from "./components/page/AttendancePage";
import NumAttendancePage from "./components/page/NumAttendancePage";
import ClassgamePage from "./components/page/ClassgamePage";
import ConsultingPage from "./components/page/ConsultingPage";
import MemoPage from "./components/page/MemoPage";
import TodoPage from "./components/page/TodoPage";
import Header from "./components/Layout/Header";
import AttendProvider from "./store/AttendProvider";

let STUDENTS = [
  { num: "1", name: "김서연" },
  { num: "2", name: "김수민" },
  { num: "3", name: "김율" },
  { num: "4", name: "김태유" },
  { num: "5", name: "나윤지" },
  { num: "6", name: "노현주" },
  { num: "7", name: "박현진" },
  { num: "8", name: "송지우" },
  { num: "9", name: "전서정" },
  { num: "10", name: "최예은" },
  { num: "11", name: "황유진" },
  { num: "21", name: "김동주" },
  { num: "22", name: "남진우" },
  { num: "23", name: "박민찬" },
  { num: "24", name: "손민준" },
  { num: "25", name: "양범준" },
  { num: "26", name: "여은준" },
  { num: "27", name: "이승우" },
  { num: "28", name: "이재율" },
  { num: "29", name: "이지호" },
  { num: "30", name: "정주환" },
  { num: "31", name: "정훈기" },
  { num: "32", name: "최라온" },
  { num: "33", name: "최민범" },
];

function App() {
  return (
    <>
      <AttendProvider>
        <div className="App">
          <Header />

          <Routes>
            <Route index element={<MainPage />} />
            <Route path="classgame" element={<ClassgamePage />} />
            <Route
              path="attendance"
              element={<AttendancePage students={STUDENTS} />}
            />
            <Route
              path="attendance/:studentNum"
              element={<NumAttendancePage />}
            />
            <Route path="consulting" element={<ConsultingPage />} />
            <Route path="memo" element={<MemoPage />} />
            <Route path="todo" element={<TodoPage />} />
          </Routes>
        </div>
      </AttendProvider>
    </>
  );
}

export default App;
