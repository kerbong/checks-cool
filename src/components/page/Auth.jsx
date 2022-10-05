import React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
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
    await signInWithPopup(authService, provider);
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
            <>
              *약관에 동의하시면
              <br /> 회원가입이 가능합니다.
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
