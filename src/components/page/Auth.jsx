import React from "react";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
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

  useEffect(() => {
    const isKakao = navigator.userAgent.match("KAKAOTALK");
    console.log(navigator.userAgent);
    setIsKakaoLink(Boolean(isKakao));
  }, []);

  useEffect(() => {
    console.log(isKakaoLink);
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

  const failLogIn = (text) => {
    Swal.fire({
      icon: "error",
      title: `${text}에 실패했어요.`,
      text: "아이디/비밀번호를 확인해주세요! 문제가 지속될 경우 kerbong@gmail.com 으로 문의주세요.",
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
      } catch (error) {
        failLogIn("로그인");
        return;
      }
    } else {
      try {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        failLogIn("회원가입");
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

    if (navigator.platform) {
      var filter = "win16|win32|win64|mac|macintel";
      if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
        // mobile 접속인 경우
        console.log("모바일");

        await signInWithRedirect(authService, provider);
      } else {
        if (
          navigator.userAgent.match(
            ".*(iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson).*"
          )
        ) {
          // PC 상의 모바일 에뮬레이터
          // console.log("mobile on pc");
          await signInWithPopup(authService, provider);
        } else {
          // pc 접속인 경우
          // console.log("pc");
          await signInWithPopup(authService, provider);
        }
      }
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
        <p>{!newAccount && <>* 이메일/연동 로그인 후 잠시 기다려주세요!</>}</p>

        {newAccount && (
          <div>
            <span>이용약관 및 개인정보제공동의(필수)</span>
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
              <span>약관에 모두 동의함</span>
            </p>

            <div className={classes["terms-area"]}>
              <div className={classes["terms-text"]}>
                <AuthTerms />
              </div>
            </div>
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
          <i className="fa-brands fa-google"></i>{" "}
          {newAccount ? "Google로  가입하기" : "Google 로그인하기"}
        </button>
        <span>
          {newAccount && !agreeTerms && (
            <>*약관 동의 후 회원가입이 가능합니다.</>
          )}
        </span>

        {newAccount && agreeTerms && (
          <p>* 회원가입 후 잠시 기다리시면 로그인이 됩니다!</p>
        )}
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
