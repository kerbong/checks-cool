import React from "react";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  sendEmailVerification,
} from "firebase/auth";
import { authService } from "../../fbase";
import classes from "./Auth.module.css";
import AuthTerms from "./AuthTerms";
import Swal from "sweetalert2";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isKakaoLink, setIsKakaoLink] = useState(false);
  const [showAgency, setShowAgency] = useState(false);

  useEffect(() => {
    const isKakao = navigator.userAgent.match("KAKAOTALK");
    // console.log(navigator.userAgent);
    setIsKakaoLink(Boolean(isKakao));
  }, []);

  useEffect(() => {
    // console.log(isKakaoLink);
    if (isKakaoLink) {
      let text;
      const mobileType = navigator.userAgent.toLowerCase();
      //안드로이드폰에서 카톡링크로 접속하면
      if (mobileType.indexOf("android") > -1) {
        text = " ... 을 눌러 '다른 브라우저로 열기' ";
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
        text: `카카오톡 링크로 접속하면 구글 연동 로그인이 불가능합니다. 오른쪽 하단의 ${text}로 접속해주세요.`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
      });
    }
  }, [isKakaoLink]);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
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
      try {
        data = await signInWithEmailAndPassword(auth, email, password);
        //이메일 인증이 완료되지 않은 경우
        if (!auth.currentUser.emailVerified) {
          failLogIn(
            "error",
            "로그인 실패",
            "이메일 인증이 완료되지 않았습니다! 문제가 지속될 경우 kerbong@gmail.com 으로 문의주세요."
          );
          auth.signOut();
        }
      } catch (error) {
        failLogIn(
          "error",
          "로그인 실패",
          "아이디/비밀번호를 확인해주세요! 문제가 지속될 경우 kerbong@gmail.com 으로 문의주세요."
        );
        return;
      }
    } else {
      try {
        data = await createUserWithEmailAndPassword(auth, email, password);

        try {
          // send verification mail.
          sendEmailVerification(auth.currentUser);
          auth.signOut();
          failLogIn(
            "success",
            "인증메일 발송완료",
            "인증메일이 발송되었습니다. 인증메일 내부의 링크를 눌러 가입을 완료해주세요."
          );
        } catch {
          console.log("에러");
        }
      } catch (error) {
        failLogIn(
          "error",
          "회원가입 실패",
          "아이디/비밀번호를 확인해주세요! 문제가 지속될 경우 kerbong@gmail.com 으로 문의주세요."
        );
        return;
      }
    }
  };

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
      console.log("모바일");

      await signInWithRedirect(authService, provider);
    } else {
      console.log("PC");
      await signInWithPopup(authService, provider);
      // if (
      //   navigator.userAgent.match(
      //     ".*(iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson).*"
      //   )
      // ) {
      //   // PC 상의 모바일 에뮬레이터
      //   // console.log("mobile on pc");
      //   await signInWithPopup(authService, provider);
      // } else {
      //   // pc 접속인 경우
      //   // console.log("pc");
      //   await signInWithPopup(authService, provider);
      // }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={classes["logInOut-form"]}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className={classes["logInOut-input"]}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className={classes["logInOut-input"]}
        />
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
                {!showAgency ? (
                  <i className="fa-solid fa-chevron-down"></i>
                ) : (
                  <i className="fa-solid fa-chevron-up"></i>
                )}
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
          style={{ width: "74%" }}
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
          <i className="fa-brands fa-google"></i>{" "}
          {newAccount ? "Google로 가입" : "Google 로그인"}
        </button>
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
        {newAccount ? "이미 가입하셨나요? -> " : "아직 회원이 아니신가요? -> "}
        <button onClick={toggleAccount} className={classes["change-btn"]}>
          {newAccount ? "로그인하기" : "가입하기"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
