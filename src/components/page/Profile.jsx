import React, { useState, useEffect } from "react";
import { dbService } from "../../fbase";
import {
  collection,
  query,
  onSnapshot,
  where,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Button from "../Layout/Button";
import classes from "./Profile.module.css";

const Profile = (props) => {
  const [userInfo, setUserInfo] = useState({});

  //firestore에서 해당 이벤트 자료 받아오기
  const getDatasFromDb = async () => {
    let userDocRef = doc(dbService, "user", props.user.uid);

    onSnapshot(userDocRef, (doc) => {
      setUserInfo({ ...doc.data() });
    });
  };

  useEffect(() => {
    getDatasFromDb();
  }, []);

  return (
    <div>
      <div className={classes["loginEmail-div"]}>
        <p className={classes["loginEmail-p"]}>현재 로그인 아이디</p>
        <p className={classes["loginEmail-p"]}>{props.user.email}</p>
      </div>
      <form className={classes["userProfile-form"]}>
        <h3>닉네임</h3>
        <input
          className={classes["nickName-input"]}
          placeholder=""
          type="text"
          defaultValue={userInfo["nickName"]}
          maxLength={12}
        />
        <h3>상태메세지</h3>
        <textarea className={classes["stateMessage-textarea"]} />

        <Button
          name={"저장"}
          id={"userInfo-saveBtn"}
          className={"add-event-button"}
          style={{ width: "73%" }}
          onclick={() => {}}
        />
      </form>
    </div>
  );
};

export default Profile;
