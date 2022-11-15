import React, { useState, useEffect } from "react";
import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc } from "firebase/firestore";
import Button from "../Layout/Button";
import classes from "./Profile.module.css";
import Swal from "sweetalert2";

const Profile = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [existUserInfo, setExistUserInfo] = useState({});

  //firestore에서 해당 이벤트 자료 받아오기
  const getDatasFromDb = async () => {
    let userDocRef = doc(dbService, "user", props.user.uid);

    onSnapshot(userDocRef, (doc) => {
      setExistUserInfo({ ...doc.data() });
      setUserInfo({ ...doc.data() });
    });
  };

  useEffect(() => {
    getDatasFromDb();
  }, []);

  const objCompareSame = (obj1, obj2) => {
    if (
      obj1.nickName.trim() === obj2.nickName.trim() &&
      obj1.stateMessage.trim() === obj2.stateMessage.trim()
    ) {
      return true;
    }
    return false;
  };

  const userInfoSaveHandler = async (e) => {
    e.preventDefault();
    //존재하는지 확인하기
    if (Object.values(userInfo).length === 0) {
      Swal.fire({
        icon: "error",
        title: "저장에 실패했어요!",
        html: "입력된 내용이 없습니다. 확인해주세요!",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
      });
      return false;
    }

    //기존내용이 존재하는데 변경된게 없으면
    if (
      Object.values(existUserInfo).length !== 0 &&
      objCompareSame(existUserInfo, userInfo)
    ) {
      Swal.fire({
        icon: "error",
        title: "저장에 실패했어요!",
        html: "변경된 내용이 없습니다. 확인해주세요!",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
      });
      return false;
    }

    Swal.fire({
      icon: "success",
      title: "저장되었어요!",
      text: "자료가 수정/저장되었습니다!",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });
    await setDoc(doc(dbService, "user", props.user.uid), userInfo);
  };

  const userInfoHandler = (e, nameOrState) => {
    if (nameOrState === "nickName") {
      setUserInfo((prev) => ({ ...prev, nickName: e.target.value }));
    } else {
      setUserInfo((prev) => ({ ...prev, stateMessage: e.target.value }));
    }
  };

  return (
    <div>
      <div className={classes["loginEmail-div"]}>
        <p className={classes["loginEmail-p"]}>현재 로그인 아이디</p>
        <p className={classes["loginEmail-p"]}>{props.user.email}</p>
      </div>
      <form
        className={classes["userProfile-form"]}
        onSubmit={userInfoSaveHandler}
      >
        <h3>닉네임</h3>
        <input
          key={"nickName"}
          onChange={(e) => userInfoHandler(e, "nickName")}
          className={classes["nickName-input"]}
          placeholder=""
          type="text"
          defaultValue={userInfo["nickName"] || ""}
          maxLength={12}
        />
        <h3>상태메세지</h3>
        <textarea
          onChange={(e) => userInfoHandler(e, "stateMessage")}
          className={classes["stateMessage-textarea"]}
          defaultValue={userInfo["stateMessage"] || ""}
          maxLength={50}
        />

        <Button
          name={"저장"}
          id={"userInfo-saveBtn"}
          className={"add-event-button"}
          style={{ width: "73%" }}
          onclick={userInfoSaveHandler}
        />
      </form>
      <p className={classes["explain-p"]}>
        * 메뉴의 "On" 👉 "프로필 수정" 을 통해 현재 페이지로 이동이 가능합니다.{" "}
      </p>
    </div>
  );
};

export default Profile;
