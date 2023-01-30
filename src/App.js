import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
// import { dbService, fcm_permission, messaging } from "./fbase";
import { dbService } from "./fbase";
// import { getFirebaseToken } from "./FirebaseInit";
// import "./fcm_messaging_init";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import MainPage from "./components/page/MainPage";
import AttendancePage from "./components/page/AttendancePage";
import ClassgamePage from "./components/page/ClassgamePage";
import ConsultingPage from "./components/page/ConsultingPage";
import MemoPage from "./components/page/MemoPage";
import TodoPage from "./components/page/TodoPage";
import Header from "./components/Layout/Header";
import Profile from "./components/page/Profile";
import Notice from "./components/page/Notice";
import ClassTableBasic from "./components/page/ClassTableBasic";

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
  const [showMainExample, setShowMainExample] = useState();
  const [profile, setProfile] = useState({});

  let navigate = useNavigate();

  const getProfile = async (uid) => {
    let userDocRef = doc(dbService, "user", uid);

    const now_doc = await getDoc(userDocRef);
    if (now_doc.exists()) {
      onSnapshot(userDocRef, (doc) => {
        setProfile({ ...doc.data() });
      });
    }
  };

  // 처음 렌더링 할 때 로그인 되었는지 확인하고 유저 정보 프로필 정보 받아오는 함수
  useEffect(() => {
    try {
      authService.onAuthStateChanged((user) => {
        // console.log("실행");
        if (user) {
          setUserUid(user.uid);
          getProfile(user.uid);
          setUser(user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setStudents([]);
          setProfile({});
        }
        setInit(true);

        //로그인해서 7~9시면 아침미션 화면 먼저 보여주기
        const nowHour = +new Date().toTimeString().slice(0, 2);
        if (nowHour >= 7 && nowHour <= 9) {
          navigate(`/classgame`, { state: "morning" });
        }
        // else {
        //   //로그인하면 심심해요 화면 먼저보여주기
        //   navigate(`/classgame`, { state: "main" });
        // }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //로그인해서 프로필이 없으면, 프로필 화면으로 먼저 보내기
  useEffect(() => {
    if (init && isLoggedIn && Object.keys(profile).length === 0) {
      Swal.fire({
        icon: "info",
        title: "반갑습니다!",
        text: "프로필을 설정하신 후에 사용하실 수 있어요. 프로필 페이지로 이동합니다.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        showDenyButton: false,
      }).then((result) => {
        navigate(`/profile`);
      });
      return;
    } else if (userUid) {
      getStudents(userUid);
    }
  }, [profile]);

  const sortNum = (students) => {
    let sorted_students;
    if (!profile.isSubject) {
      sorted_students = students?.sort(function (a, b) {
        let a_num = `${a.num}`;
        let b_num = `${b.num}`;
        return a_num - b_num;
      });
    } else {
      sorted_students = students?.sort(function (a, b) {
        let a_className = `${Object.keys(a)}`;
        let b_className = `${Object.keys(b)}`;
        return a_className > b_className ? 1 : -1;
      });
    }

    return sorted_students;
  };

  //저장된 학생명부 불러오는 snapshot 함수
  //참고 https://firebase.google.com/docs/firestore/query-data/listen?hl=ko
  const getStudents = async (uid) => {
    //db에서 studnets 콜렉션 DB가져오고 doc id가 현재 유저인 doc 가져오기
    const docRef = doc(dbService, "students", uid);

    onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setShowMainExample(false);
        //현재학년도 자료만 보내기
        setStudents([...sortNum(doc?.data()?.studentDatas)]);
      } else {
        setShowMainExample(true);
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

  //메뉴 위 / 아래 이동 기능
  const setMenuHandler = () => {
    setMenuOnHead((prev) => !prev);
  };

  //현재 학년도 정보 반환하는 함수
  const now_year = () => {
    return +dayjs().format("MM") <= 1
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  const profileHandler = () => {
    getProfile(userUid);
  };

  return (
    <div>
      <div className={menuOnHead ? "App" : "App-bottom"}>
        <Header
          isLoggedIn={isLoggedIn}
          user={isLoggedIn && user}
          logOutHandler={logOutHandler}
          setMenuHandler={setMenuHandler}
          menuOnHead={menuOnHead}
        />
        <Routes>
          {/* 초기화 로그인 되어 있는데, 프로필이 없거나 프로필에 올해 전담여부가 없으면 */}
          {init &&
            isLoggedIn &&
            (Object.keys(profile)?.length === 0 ||
              profile?.isSubject?.filter(
                (yearData) => Object.keys(yearData)[0] === now_year()
              )?.length === 0) && (
              <Route
                index
                element={
                  <Profile user={user} profileHandler={profileHandler} />
                }
              />
            )}

          {/* 초기화 되었고 로그인 상태 */}
          {init &&
          Object.keys(profile)?.length !== 0 &&
          profile?.isSubject?.filter(
            (yearData) => Object.keys(yearData)[0] === now_year()
          )?.length !== 0 &&
          isLoggedIn ? (
            <>
              <Route
                index
                path=""
                element={
                  <MainPage
                    userUid={userUid}
                    showMainExample={showMainExample}
                    students={students}
                    setShowMainExample={() => setShowMainExample(false)}
                    isSubject={profile?.isSubject}
                  />
                }
              />

              <Route
                path="classgame"
                element={
                  <ClassgamePage
                    students={students}
                    userUid={userUid}
                    isSubject={profile.isSubject || []}
                  />
                }
              />

              <Route
                path="classTable"
                element={<ClassTableBasic userUid={userUid} />}
              />

              <Route
                path="attendance"
                element={
                  <AttendancePage
                    students={students}
                    userUid={userUid}
                    isSubject={profile?.isSubject || []}
                  />
                }
              />

              <Route
                path="consulting"
                element={
                  <ConsultingPage
                    students={students}
                    userUid={userUid}
                    isSubject={profile.isSubject || []}
                  />
                }
              />

              <Route
                path="memo"
                element={
                  <MemoPage
                    students={students}
                    userUid={userUid}
                    isSubject={profile.isSubject || []}
                  />
                }
              />

              <Route path="todo" element={<TodoPage userUid={userUid} />} />

              {/* 전담여부 issubject를 올해 자료만 보냄. 어차피 올해자료만 입력/수정가능 */}
              <Route
                path="student-manage"
                element={
                  <StudentLists
                    userUid={userUid}
                    students={students}
                    isSubject={
                      profile?.isSubject?.filter(
                        (yearData) => Object.keys(yearData)[0] === now_year()
                      )?.[0]?.[now_year()]
                    }
                  />
                }
              />

              <Route
                path="profile"
                element={
                  <Profile user={user} profileHandler={profileHandler} />
                }
              />

              <Route path="notice" element={<Notice />} />
            </>
          ) : (
            // 초기화되었지만 로그인 되지 않은 상태
            <>
              <Route index element={<Auth />} />
            </>
          )}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
