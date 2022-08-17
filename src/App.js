import { Routes, Route } from "react-router-dom";
import "./App.css";

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
              element={<AttendancePage students={students} />}
            />
            <Route
              path="attendance/:studentNum"
              element={<NumAttendancePage />}
            />
            <Route
              path="consulting"
              element={<ConsultingPage students={students} />}
            />
            <Route path="memo" element={<MemoPage />} />
            <Route path="todo" element={<TodoPage />} />
          </Routes>
        </div>
      </AttendProvider>
    </>
  );
}

export default App;
