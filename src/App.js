import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect, Suspense, lazy } from "react";
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import { dbService, authService } from "./fbase";
import { signInWithCredential } from "firebase/auth";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import Notification from "./components/Layout/Notification";
import Loading from "components/page/Loading";
import Header from "./components/Layout/Header";

// lazy 로딩 적용
const ManageStudentInfo = lazy(() =>
  import("components/page/ManageStudentInfo")
);
const ManageCheckListMemo = lazy(() =>
  import("components/page/ManageCheckListMemo")
);
const ManageConsult = lazy(() => import("components/page/ManageConsult"));
const ManageAttendance = lazy(() => import("components/page/ManageAttendance"));
const MainPage = lazy(() => import("./components/page/MainPage"));
const AttendancePage = lazy(() => import("./components/page/AttendancePage"));
const ClassgamePage = lazy(() => import("./components/page/ClassgamePage"));
const WeTeacher = lazy(() => import("./components/page/WeTeacher"));
const ConsultingPage = lazy(() => import("./components/page/ConsultingPage"));
const CheckListMemo = lazy(() => import("./components/page/CheckListMemo"));
const MemoPage = lazy(() => import("./components/page/MemoPage"));
const TodoPage = lazy(() => import("./components/page/TodoPage"));
const Profile = lazy(() => import("./components/page/Profile"));
const Notice = lazy(() => import("./components/page/Notice"));
const ClassTableBasic = lazy(() => import("./components/page/ClassTableBasic"));
const Auth = lazy(() => import("./components/page/Auth"));
const StudentLists = lazy(() => import("./components/page/StudentLists"));

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUid, setUserUid] = useState(null);
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState(null);
  const [menuOnHead, setMenuOnHead] = useState(true);
  const [showMainExample, setShowMainExample] = useState();
  const [profile, setProfile] = useState({});
  const [nowToken, setNowToken] = useState("");

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
      if (doc.exists() && doc?.data()?.studentDatas.length > 0) {
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

  //토큰 저장하는 함수 7일 지나면 삭제
  const saveTokenHandler = async (token) => {
    //아직 유저uid가 없으면.. 실행안함
    if (!userUid) {
      return;
    }

    const now_yymmdd = dayjs().format("YYYY-MM-DD");

    //저장된 토큰이 있는데, 현재 날짜와 최근 받아온 토큰의 날짜 차이가 1일보다 작으면... 저장하지 않음
    if (
      nowToken !== "" &&
      dayjs(now_yymmdd)?.diff(nowToken?.split("***")?.[0]) < 2
    ) {
      return;
    }

    const fcmTokenRef = doc(dbService, "fcmToken", userUid);
    const now_fcmToken = now_yymmdd + "***" + token;

    const now_doc = await getDoc(fcmTokenRef);
    let new_token = [];
    if (now_doc?.exists()) {
      let remain_token = now_doc?.data()?.fcmToken_data;

      new_token = remain_token?.filter(
        (tk) =>
          //날짜가 일주일 이상 지난거, 지금꺼랑 같은거 제외하고 저장하기
          dayjs(now_yymmdd)?.diff(dayjs(tk?.split("***")?.[0]), "day") < 7 &&
          token !== tk?.split("***")?.[1]
      );
      //일단...토큰이 5개 남았으면 제일 오래된 한개 지우기
      if (new_token?.length > 4) {
        new_token?.sort()?.shift();
      }

      if (new_token?.length === 0 || new_token === undefined) {
        new_token = [now_fcmToken];
      } else {
        new_token?.push(now_fcmToken);
      }

      //현재 날짜+토큰 새롭게 추가
    } else {
      new_token = [now_fcmToken];
    }

    //토큰 상태에 저장
    setNowToken(now_fcmToken);

    //토큰 최종 저장
    await setDoc(fcmTokenRef, { fcmToken_data: new_token });
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

        <Notification saveTokenHandler={saveTokenHandler} />
        <Suspense fallback={<Loading />}>
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
                      email={user.email}
                      nickName={profile?.nickName || ""}
                      isSubject={profile?.isSubject || []}
                    />
                  }
                />
                <Route
                  path="weteacher"
                  element={
                    <WeTeacher
                      students={students}
                      userUid={userUid}
                      email={user.email}
                      nickName={profile?.nickName || ""}
                      isSubject={profile?.isSubject || []}
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
                  path="manageStudent"
                  element={
                    <ManageStudentInfo
                      students={students}
                      userUid={userUid}
                      isSubject={profile.isSubject || []}
                    />
                  }
                />

                <Route
                  path="manageCheckListMemo"
                  element={
                    <ManageCheckListMemo
                      students={students}
                      userUid={userUid}
                      isSubject={profile.isSubject || []}
                    />
                  }
                />

                <Route
                  path="manageConsult"
                  element={
                    <ManageConsult
                      students={students}
                      userUid={userUid}
                      isSubject={profile.isSubject || []}
                    />
                  }
                />

                <Route
                  path="manageAttendance"
                  element={
                    <ManageAttendance
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
                <Route
                  path="checkListMemo"
                  element={
                    <CheckListMemo
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
                <Route
                  index
                  element={
                    <Auth
                      safariHandler={(credential) => {
                        signInWithCredential(authService, credential);
                      }}
                    />
                  }
                />
              </>
            )}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
