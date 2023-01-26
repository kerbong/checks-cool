import React, { useState, useEffect } from "react";
import { dbService } from "../../fbase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Button from "../Layout/Button";
import classes from "./Profile.module.css";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const Profile = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [existUserInfo, setExistUserInfo] = useState({});

  //firestore에서 해당 이벤트 자료 받아오기
  const getDatasFromDb = async () => {
    let userDocRef = doc(dbService, "user", props.user.uid);

    const now_doc = await getDoc(userDocRef);
    if (now_doc.exists()) {
      setExistUserInfo({ ...now_doc.data() });
      setUserInfo({
        ...now_doc.data(),
        isSubject: now_doc
          .data()
          ?.isSubject?.filter(
            (yearData) => Object.keys(yearData)[0] === now_year()
          )?.[0],
      });
    }
  };

  useEffect(() => {
    getDatasFromDb();
  }, []);

  const objCompareSame = (obj1, obj2) => {
    if (
      obj1?.nickName?.trim() === obj2?.nickName?.trim() &&
      obj1?.stateMessage?.trim() === obj2?.stateMessage?.trim() &&
      obj1?.isSubject?.[now_year()] === obj2?.isSubject?.[now_year()]
    ) {
      return true;
    }
    return false;
  };

  const now_year = () => {
    //2월부터는 새로운 학년도로 인식함
    return +dayjs().format("MM") <= 1
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
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

    let profileRef = doc(dbService, "user", props.user.uid);

    //전담이 아닌경우 자료 추가
    if (!userInfo.isSubject) {
      userInfo.isSubject = { [now_year()]: false };
    }

    //전담여부 배열자료에서 현재 학년도 자료 제거하고 새롭게 추가하기
    let exceptNowData = existUserInfo?.isSubject?.filter(
      (yearData) =>
        Object.keys(yearData)[0] !== Object.keys(userInfo.isSubject)[0]
    );

    let new_isSubject;
    // 만약 기존자료가 없으면
    if (exceptNowData) {
      new_isSubject = exceptNowData.push(userInfo.isSubject);
    } else {
      new_isSubject = [userInfo.isSubject];
    }

    let new_userInfo = {
      ...userInfo,
      isSubject: new_isSubject,
    };

    await setDoc(profileRef, new_userInfo);
  };

  const userInfoHandler = (e, nameOrState) => {
    if (nameOrState === "nickName") {
      setUserInfo((prev) => ({ ...prev, nickName: e.target.value }));
    } else if (nameOrState === "stateMessage") {
      setUserInfo((prev) => ({ ...prev, stateMessage: e.target.value }));
    } else {
      if (e.target.checked) {
        setUserInfo((prev) => ({
          ...prev,
          isSubject: { [now_year()]: true },
        }));
      } else {
        setUserInfo((prev) => ({
          ...prev,
          isSubject: { [now_year()]: false },
        }));
      }
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
        <div>
          <h3>
            <input
              key={"isSub"}
              onChange={(e) => userInfoHandler(e, "isSubject")}
              value={userInfo?.["isSubject"]?.[now_year()] || ""}
              checked={userInfo?.["isSubject"]?.[now_year()] ? true : false}
              type="checkbox"
              // defaultValue={}
            />{" "}
            이번학년도 전담교사
          </h3>
        </div>

        <Button
          name={"저장"}
          id={"userInfo-saveBtn"}
          className={"add-event-button"}
          style={{ width: "73%" }}
          onclick={userInfoSaveHandler}
        />
      </form>
      <p className={classes["explain-p"]}>
        * 메뉴의 <i className="fa-solid fa-user"></i> => "프로필 수정" 을 통해
        현재 페이지로 이동이 가능합니다.{" "}
      </p>
    </div>
  );
};

export default Profile;
