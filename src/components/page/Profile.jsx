import React, { useState, useEffect } from "react";
import { dbService, authService } from "../../fbase";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Button from "../Layout/Button";
import classes from "./Profile.module.css";
import Swal from "sweetalert2";
import dayjs from "dayjs";

import { sendPasswordResetEmail } from "firebase/auth";

const Profile = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [existUserInfo, setExistUserInfo] = useState({});
  const [loginType, setLoginType] = useState("");

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

  const now_year = () => {
    //2월부터는 새로운 학년도로 인식함
    return +dayjs().format("MM") <= 1
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  const swal_maker = (icon, title, text) => {
    Swal.fire({
      icon: icon,
      title: title,
      html: text,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
    });
  };

  const userInfoSaveHandler = async (e) => {
    e.preventDefault();
    //하루에 두 번만 수정 가능함.
    let todayProfileChange = localStorage.getItem(
      "profile" + dayjs().format("YY-MM-DD") + props.user.email
    );

    if (todayProfileChange >= 2) {
      swal_maker(
        "error",
        "저장횟수 초과",
        "하루에 두 번만 프로필 수정이 가능합니다. 내일 다시 시도해주세요!"
      );
      return false;
    }

    let existUserInfo;
    let isNew = false;
    let profileRef = doc(dbService, "user", props.user.uid);
    const now_doc = await getDoc(profileRef);
    if (now_doc.exists()) {
      existUserInfo = now_doc.data();
    } else {
      existUserInfo = {};
      isNew = true;
    }

    //존재하는지 확인하기
    if (Object.values(userInfo).length === 0) {
      swal_maker(
        "error",
        "저장에 실패했어요!",
        "입력된 내용이 없습니다. 확인해주세요!"
      );

      return false;
    }

    //닉네임은 필수저장!
    if (userInfo.nickName?.trim().length === 0) {
      swal_maker(
        "error",
        "저장에 실패했어요!",
        "닉네임은 필수 입력 사항입니다! 확인해주세요."
      );

      return false;
    }

    //다른 유저들의 닉네임과 겹치지 않는지 확인하기
    let nickNamesRef = doc(dbService, "user", "nickNames");
    const nick_doc = await getDoc(nickNamesRef);
    let existNickNames = nick_doc.data().nickNames_data;
    const lastNick = existUserInfo?.nickName;

    //새로 프로필 생성 중이 아니면, 기존의 내 닉네임 제외하기
    if (!isNew) {
      existNickNames = existNickNames?.filter((nick) => nick !== lastNick);
    }

    //유저들 닉네임과 같은거
    let isExistNick = existNickNames?.filter(
      (nick) => nick === userInfo.nickName?.trim()
    );

    if (isExistNick.length > 0) {
      swal_maker(
        "error",
        "닉네임 중복",
        "이미 존재하는 닉네임입니다! 다른 이름으로 변경해주세요!"
      );

      return false;
    }

    swal_maker("success", "저장되었어요!", "자료가 수정/저장되었습니다!");

    //전담이 아닌경우 자료 추가
    if (!userInfo.isSubject) {
      userInfo.isSubject = { [now_year()]: false };
    }

    //전담여부 배열자료에서 현재 학년도 자료 제거하고 새롭게 추가하기
    let exceptNowData = [];
    existUserInfo?.isSubject?.forEach((yearData) => {
      if (Object.keys(yearData)[0] !== Object.keys(userInfo.isSubject)[0]) {
        exceptNowData.push(yearData);
      }
    });

    // 만약 기존자료가 없거나 같은 해의 자료면
    if (exceptNowData === undefined || exceptNowData?.length === 0) {
      exceptNowData = [userInfo.isSubject];
    } else {
      exceptNowData.push(userInfo.isSubject);
    }
    let new_isSubject = exceptNowData;

    let new_userInfo = {
      ...userInfo,
      isSubject: new_isSubject,
    };

    if (isNew) {
      await setDoc(profileRef, new_userInfo);
    } else {
      await updateDoc(profileRef, new_userInfo);
    }

    //현재 닉네임만 따로 저장하기
    existNickNames.push(userInfo.nickName?.trim());
    const new_nickNames = existNickNames;
    await updateDoc(nickNamesRef, { nickNames_data: new_nickNames });

    props.profileHandler();

    //오늘 프로필 수정 횟수 저장하기.

    localStorage.setItem(
      "profile" + dayjs().format("YY-MM-DD") + props.user.email,
      todayProfileChange + 1
    );
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

  //이메일 로그인의 경우 비밀번호 찾기 로직
  const resetPassword = () => {
    Swal.fire({
      icon: "question",
      title: "메일 전송",
      html: "비밀번호 변경(재설정) 메일을 전송할까요?",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      denyButtonText: "취소",
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        sendPasswordResetEmail(authService, props.user.email).then(() => {
          console.log("email sent");
          Swal.fire(
            "메일전송 완료",
            `이메일 주소 ( ${props.user.email} ) 로 비밀번호 재설정 메일이 전송되었습니다.`,
            "success"
          );
        });
      }
    });
  };

  useEffect(() => {
    props.user.providerData.forEach(function (profile) {
      if (
        profile.providerId === "password" &&
        profile.providerId === "google.com"
      ) {
        setLoginType("email & Google연동");
      } else if (profile.providerId === "google.com") {
        setLoginType("Google연동");
      } else if (profile.providerId === "password") {
        setLoginType("email");
      }
    });
  }, []);

  return (
    <div>
      <form
        className={classes["userProfile-form"]}
        onSubmit={userInfoSaveHandler}
        style={{ marginTop: "30px" }}
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
          <h3 className={classes["check-h3"]}>
            <label
              className={`${classes["checkLabel"]} ${
                userInfo?.["isSubject"]?.[now_year()] &&
                classes["checkLabel-checked"]
              }`}
            >
              <input
                className={classes["check-input"]}
                key={"isSub"}
                onChange={(e) => userInfoHandler(e, "isSubject")}
                value={userInfo?.["isSubject"]?.[now_year()] || ""}
                checked={userInfo?.["isSubject"]?.[now_year()] ? true : false}
                type="checkbox"
                // defaultValue={}
              />{" "}
            </label>
            이번학년도 전담교사
          </h3>
          {/* 첫 프로필이면... */}
          {Object.keys(existUserInfo).length === 0 && (
            <h3 className={classes["explain-h3"]}>
              {" "}
              * 프로필을 입력하신 후에 <br /> 서비스 이용이 가능합니다. <br />
              <br />
              내용을 입력하시고 [저장]해주세요!
            </h3>
          )}
          {/* 프로필은 있는데 올해 전담 여부 자료가 없으면 */}
          {Object.keys(existUserInfo).length !== 0 &&
            existUserInfo?.isSubject?.filter(
              (yearData) => Object.keys(yearData)[0] === now_year()
            )?.length === 0 && (
              <h3 className={classes["explain-h3"]}>
                {" "}
                * 2월부터 새로운 학년도로 인식됩니다. <br />
                이번학년도 전담교사 여부를 확인하시고 <br />
                [저장] 해주세요!
                <br />
                <br />* 전담이 아니신 경우 그냥 [저장] 해주세요!
              </h3>
            )}
        </div>

        <Button
          name={"저장"}
          id={"userInfo-saveBtn"}
          className={"add-event-button"}
          style={{ width: "73%" }}
          onclick={userInfoSaveHandler}
        />
        <hr style={{ width: "73%" }} />
      </form>

      <div className={classes["userProfile-form"]}>
        <div className={classes["check-h3"]}>
          <div>
            <p className={classes["loginEmail-p"]}>현재 로그인 아이디</p>
            <p className={classes["loginEmail-p"]}>{props.user.email}</p>
          </div>
          <div>
            <Button
              name={loginType}
              className={"add-event-button"}
              style={{ fontSize: "1rem" }}
              onclick={() =>
                Swal.fire(
                  `가입 & 로그인 방식`,
                  `${loginType} 방식을 사용해서 가입, 로그인 하신 상태입니다.`,
                  "info"
                )
              }
            />
          </div>
          <div>
            <Button
              name={"비밀번호 변경"}
              id={"userInfo-saveBtn"}
              className={"add-event-button"}
              style={{ fontSize: "1rem" }}
              onclick={resetPassword}
            />
          </div>
        </div>
        <hr style={{ width: "73%" }} />
      </div>

      <p className={classes["explain-p"]} style={{ marginBottom: "50px" }}>
        * 메뉴의 <i className="fa-solid fa-user"></i> - "프로필 수정" 을 통해
        현재 페이지로 이동이 가능합니다.{" "}
      </p>
    </div>
  );
};

export default Profile;
