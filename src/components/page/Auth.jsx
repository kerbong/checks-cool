import React from "react";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { authService } from "../../fbase";
import classes from "./Auth.module.css";
import AuthTerms from "./AuthTerms";
import Swal from "sweetalert2";
import Loading from "./Loading";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isNaverKakao, setIsKakaoNaver] = useState("");
  const [showAgency, setShowAgency] = useState(false);
  const [isSamePw, setIsSamePw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isTeacherInput, setIsTeacherInput] = useState("");

  useEffect(() => {
    let isKakaoNaver = "";
    if (navigator.userAgent.match("KAKAOTALK")) {
      isKakaoNaver = "카카오톡";
    } else if (navigator.userAgent.match("NAVER")) {
      isKakaoNaver = "네이버";
    }
    // console.log(navigator.userAgent);
    setIsKakaoNaver(isKakaoNaver);
  }, []);

  useEffect(() => {
    // console.log(isNaverKakao);
    if (isNaverKakao !== "") {
      let text;
      const mobileType = navigator.userAgent.toLowerCase();
      //안드로이드폰에서 카톡링크로 접속하면
      if (mobileType.indexOf("android") > -1) {
        text =
          " ...(메뉴바) 을 눌러 '다른 브라우저로 열기' 혹은 '기본 브라우저로 열기' ";
        //아이폰에서 카톡링크로 접속하면
      } else if (
        mobileType.indexOf("iphone") > -1 ||
        mobileType.indexOf("ipad") > -1
      ) {
        text = " '공유 버튼'을 눌러 'Safari로 열기' 등으";
      }
      Swal.fire({
        icon: "error",
        title: `연동 로그인 불가`,
        text: `${isNaverKakao} 링크로 접속하면 구글 연동 로그인이 불가능합니다. 오른쪽 하단의 ${text}로 접속해주세요.`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
      });
    }
  }, [isNaverKakao]);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "isTeacherInput") {
      setIsTeacherInput(value);
    }
  };

  //비밀번호 확인 로직
  const checkPwHandler = (e) => {
    const checkPwValue = e.target.value;
    if (checkPwValue === password) {
      setIsSamePw(true);
    } else {
      setIsSamePw(false);
    }
  };

  const failLogIn = (icon, title, text) => {
    Swal.fire({
      icon: icon,
      title: `${title}`,
      text: text,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    const auth = getAuth();
    //기존 유저의 로그인이면
    if (!newAccount) {
      setIsLoading(true);
      try {
        data = await signInWithEmailAndPassword(auth, email, password);
        //이메일 인증이 완료되지 않은 경우
        if (!auth.currentUser.emailVerified) {
          setIsLoading(false);
          failLogIn(
            "error",
            "로그인 실패",
            "이메일 인증이 완료되지 않았습니다! 문제가 지속될 경우 kerbong@gmail.com 으로 문의주세요."
          );
          auth.signOut();
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        failLogIn(
          "error",
          "로그인 실패",
          "아이디/비밀번호를 확인해주세요! 문제가 지속될 경우 kerbong@gmail.com 으로 문의주세요."
        );
        return;
      }
    } else {
      //비밀번호가 다르면 회원가입 불가..!!
      if (!isSamePw) {
        Swal.fire({
          icon: "error",
          title: `비밀번호 불일치`,
          text: `비밀번호가 일치하지 않습니다. 확인하시고 수정해주세요.`,
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
        });
        return;
      }

      try {
        setIsLoading(true);
        data = await createUserWithEmailAndPassword(auth, email, password);

        try {
          // send verification mail.
          sendEmailVerification(auth.currentUser);
          auth.signOut();
          setIsLoading(false);
          failLogIn(
            "success",
            "인증메일 발송완료",
            "인증메일이 발송되었습니다. 인증메일 내부의 링크를 눌러 가입을 완료해주세요."
          );
        } catch {
          setIsLoading(false);
          console.log("에러");
        }
      } catch (error) {
        setIsLoading(false);
        failLogIn(
          "error",
          "회원가입 실패",
          "아이디/비밀번호를 확인해주세요! 문제가 지속될 경우 kerbong@gmail.com 으로 문의주세요."
        );
        return;
      }
    }
  };

  //로그인 중에 전체 화면 클릭 막는 함수

  const toggleAccount = (e) => {
    setNewAccount((prev) => !prev);
    setAgreeTerms(false);
  };

  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(
      window.navigator.userAgent
    );

    if (isMobile) {
      // mobile 접속인 경우
      // const mobileType = navigator.userAgent.toLowerCase();
      // 아이폰은 팝업으로 로그인
      // if (
      //   mobileType.indexOf("iphone") > -1 ||
      //   mobileType.indexOf("ipad") > -1 ||
      //   mobileType.indexOf("ipod") > -1
      // ) {
      setIsLoading(true);
      await signInWithPopup(authService, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        // The signed-in user info.
        props.safariHandler(credential);
      });
      // 안드로이드는 리다이렉트로 로그인
      // } else {
      //   setIsLoading(true);
      //   await signInWithRedirect(authService, provider);
      // }
      // 피씨는 팝업 로그인
    } else {
      setIsLoading(true);
      // console.log("PC");
      await signInWithPopup(authService, provider);
    }
  };

  //이메일 로그인의 경우 비밀번호 찾기 로직
  const findPassword = () => {
    var regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    // 검증에 사용할 정규식 변수 regExp에 저장

    if (email.match(regExp) === null) {
      failLogIn(
        "error",
        "이메일주소 확인",
        "이메일주소의 양식이 올바르지 않습니다. 확인해주세요."
      );
      return;
    }

    sendPasswordResetEmail(authService, email).then(() => {
      failLogIn(
        "success",
        "메일전송 완료",
        "입력하신 이메일 주소로 비밀번호 재설정 링크가 전송되었습니다."
      );
    });
  };

  const confirmTeacherHandler = (e) => {
    e.preventDefault();
    if (isTeacherInput === "") {
      return false;
    } else if (isTeacherInput === "from-indi") {
      setIsTeacher(true);
    } else {
      Swal.fire(
        "인증실패!",
        "교사 인증에 실패했습니다. indischool.com/boards/square/37298755 에서 인증번호를 확인해주세요.",
        "warning"
      );
      setIsTeacher(false);
    }
  };

  return !isLoading ? (
    <div>
      {/* 교사 인증화면 추가. 인증 후에  */}
      {isTeacher ? (
        <>
          <form onSubmit={onSubmit} className={classes["logInOut-form"]}>
            <input
              name="email"
              type="email"
              placeholder="이메일 주소"
              required
              value={email}
              onChange={onChange}
              className={classes["logInOut-input"]}
            />
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              required
              value={password}
              onChange={onChange}
              className={classes["logInOut-input"]}
            />
            {newAccount && (
              <input
                name="passwordCheck"
                type="password"
                placeholder="비밀번호 확인"
                required
                onChange={checkPwHandler}
                className={classes["logInOut-input"]}
              />
            )}

            {!newAccount && (
              <>
                <p>* 이메일/연동 로그인 후 잠시 기다려주세요.</p>
              </>
            )}

            {newAccount && (
              <div>
                <div style={{ margin: "10px 0" }}>
                  <span style={{ marginLeft: "10px" }}>
                    이용약관 및 개인정보제공동의
                  </span>
                  <span
                    style={{ margin: "0 10px", color: "gray" }}
                    onClick={() => {
                      setShowAgency((prev) => !prev);
                    }}
                  >
                    {!showAgency ? <FaChevronDown /> : <FaChevronUp />}
                  </span>
                </div>
                <p className={classes["terms-checkbox-area"]}>
                  <input
                    type="checkbox"
                    name="terms-checkbox"
                    onClick={(e) => {
                      if (e.target.checked) {
                        setAgreeTerms(true);
                      } else {
                        setAgreeTerms(false);
                      }
                    }}
                  />
                  <span> 동의함 </span>
                </p>

                {showAgency && (
                  <div className={classes["terms-area"]}>
                    <div className={classes["terms-text"]}>
                      <AuthTerms />
                    </div>
                  </div>
                )}
              </div>
            )}

            <input
              type="submit"
              value={newAccount ? "회원가입" : "로그인"}
              disabled={newAccount && !agreeTerms && true}
              className={classes["logInOut-SignUp"]}
            />
          </form>
          <div className={classes["google-login"]}>
            <button
              name="google"
              onClick={onSocialClick}
              disabled={newAccount && !agreeTerms && true}
              className={classes["logInOut-SignUp"]}
            >
              <FcGoogle /> {newAccount ? "Google로 가입" : "Google 로그인"}
            </button>

            {!newAccount && (
              <button
                name="google"
                onClick={findPassword}
                disabled={newAccount && !agreeTerms && true}
                className={classes["logInOut-SignUp"]}
              >
                비밀번호 찾기
              </button>
            )}
            <span>
              {newAccount && !agreeTerms && (
                <>
                  <p>* 구글 연동가입이 아니면 이메일 인증이 진행됩니다.</p>
                  <p>* 약관 동의 후 회원가입이 가능합니다.</p>
                </>
              )}
              {newAccount && agreeTerms && (
                <>
                  <p>* 구글 연동가입이 아니면 이메일 인증이 진행됩니다.</p>
                  <p>* 회원가입 후 잠시 기다려주세요.</p>
                </>
              )}
            </span>
          </div>
          <div className={classes["logInOut-SignUp-Change"]}>
            <hr />
            {newAccount
              ? "이미 가입하셨나요? -> "
              : "아직 회원이 아니신가요? -> "}
            <button onClick={toggleAccount} className={classes["change-btn"]}>
              {newAccount ? "로그인하기" : "가입하기"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={classes["auth-main"]}>
            <h2>교사인증 후, 서비스 이용이 가능합니다.</h2>
            <form onSubmit={confirmTeacherHandler}>
              <input
                placeholder="교사 인증번호"
                name={"isTeacherInput"}
                required
                value={isTeacherInput}
                onChange={onChange}
                style={{ textAlign: "center" }}
                className={classes["logInOut-input"]}
              />
            </form>
            <p>
              ** 접속이 어려우신 분들은 아래의 주소를 활용해주세요!
              <br /> https://checks-cho-ok.firebaseapp.com
              <br /> https://checks-cho-ok.web.app
            </p>
          </div>
        </>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default Auth;
