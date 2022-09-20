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

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(agreeTerms);
    if (!agreeTerms) {
      return;
    }
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
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
                onClick={() => setAgreeTerms((prev) => !prev)}
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
          disabled={!agreeTerms ? true : false}
          className={classes["logInOut-SignUp"]}
        />
      </form>
      <div className={classes["google-login"]}>
        <button
          name="google"
          onClick={onSocialClick}
          disabled={!agreeTerms ? true : false}
          className={classes["logInOut-SignUp"]}
        >
          <i className="fa-brands fa-google"></i> Google 로그인하기
        </button>
        <span>
          {!agreeTerms && (
            <>
              *약관에 동의하시면
              <br /> 회원가입/구글로그인이 가능합니다.
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
