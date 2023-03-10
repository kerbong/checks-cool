import React, { useState, useEffect } from "react";
import DoInput from "./DoInput";
import DoingList from "./DoingList";
import DoMyList from "./DoMyList";
import { dbService, storageService } from "../../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import {
  ref,
  uploadString,
  getDownloadURL,
  // deleteObject,/
} from "firebase/storage";
import { init, send } from "emailjs-com";
// import { initializeApp, applicationDefault } from "firebase-admin/app";

// import serviceAccount from "../../../firebase-adminsdk.json";
import { v4 } from "uuid";
import Swal from "sweetalert2";
import dayjs from "dayjs";
// import { getMessaging } from "firebase/messaging";
// // import axios from "axios";
// import BrowserNotification from "components/Layout/useBrowserNotification";
// import HwpMaker from "./HwpMaker";

const Doit = (props) => {
  const [lists, setLists] = useState([]);
  const [myLists, setMyLists] = useState([]);

  //최근 2달 불편 건의사항 받아오기
  const getDoitDatas = async () => {
    let this_mon = dayjs().format("YY-MM");
    let last_mon = dayjs().subtract(1, "month").format("YY-MM");

    //firestore에 저장
    let thisMonthRef = doc(dbService, "doit", this_mon);
    let lastMonthRef = doc(dbService, "doit", last_mon);
    const thisMonthData = await getDoc(thisMonthRef);
    const lastMonthData = await getDoc(lastMonthRef);

    let new_list = [];
    if (thisMonthData.exists() && thisMonthData.data().doit_data) {
      new_list = [...thisMonthData?.data()?.doit_data];
    }

    if (lastMonthData.exists() && lastMonthData.data().doit_data) {
      lastMonthData?.data()?.doit_data?.forEach((data) => {
        new_list?.push(data);
      });
    }
    setLists(new_list);
  };

  useEffect(() => {
    getDoitDatas();
  }, []);

  //이메일 서비스 실행
  // useEffect(() => {
  //   init(process.env.REACT_APP_EMAILJS_INIT);
  // }, []);

  //건의 불편사항 글 추가하기
  const addDoitHandler = async (data) => {
    let today_yymmdd = dayjs().format("YY-MM-DD");
    //날짜가 오늘과 같으면 오늘 몇개썼는지 확인
    let write_count = localStorage.getItem("doitWrite");
    let today_done = false;
    if (write_count !== null) {
      if (today_yymmdd === write_count.split("***")[0]) {
        //하루 최대 5개만 저장가능...
        if (+write_count.split("***")[1] > 4) {
          today_done = true;
        } else {
          let new_num = +write_count.split("***")[1] + 1;
          localStorage.setItem("doitWrite", today_yymmdd + "***" + new_num);
        }
      }
    } else {
      localStorage.setItem("doitWrite", today_yymmdd + "***1");
    }

    //오늘치 건의 끝..이면
    if (today_done) {
      Swal.fire({
        icon: "error",
        title: "저장불가",
        text: "하루에 5개 까지만 건의/불편 접수가 가능합니다! 급하신 내용이 있다면 kerbong@gmail.com으로 알려주세요!",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "저장 성공",
      text: `더 나은 서비스를 위한 의견 / 도움주셔서 감사합니다. 새로고침, 혹은 다른 탭에서 다시 들어오시면 내용을 확인하실 수 있습니다.🥰`,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: false,
      timer: 5000,
    });

    //첨부파일 있으면
    let img = data.file;
    if (img.length > 0) {
      //storage에 저장
      const response = await uploadString(
        ref(storageService, `${props.userUid}/${v4()}`),
        img,
        "data_url"
      );
      //firestore에 저장할 url받아오기
      img = await getDownloadURL(response.ref);
    }

    const new_data = {
      ...data,
      file: img,
      user: props.userUid,
      nickName: props.nickName,
      result: "0",
    };

    //firestore에 저장
    let doitRef = doc(dbService, "doit", dayjs().format("YY-MM"));

    //기존 자료 목록 받아오고 거기에 추가하기

    let existData = [new_data];
    const doitDoc = await getDoc(doitRef);
    if (doitDoc.exists()) {
      doitDoc?.data()?.doit_data?.forEach((data) => existData.push(data));
    }

    await setDoc(doitRef, { doit_data: existData });

    var templateParams = {
      from_name: props.nickName + ")" + props.email,
      to_name: "말랑한 거봉 운영자님",
      message: data.text,
      title: data.title,
    };

    //개발자 이메일로 내용 보내기
    await send(
      process.env.REACT_APP_EMAILJS_SERVICEID,
      process.env.REACT_APP_EMAILJS_TEMPLATEID,
      templateParams,
      process.env.REACT_APP_EMAILJS_INIT
    );

    //입력되었던 자료들 삭제하기
    document.getElementById("title-input").value = "";
    document.getElementById("text-input").value = "";
  };

  // //내가 쓴 건의불편사항 삭제함수
  // const deleteHandler = async (id, title, url) => {
  //   let remainData = myLists?.filter((data) => data.id !== id);

  //   //전체 컬렉션 가져오고 거기에서 작업하기
  //   let doitRef = doc(dbService, "doit", dayjs);

  //   Swal.fire({
  //     icon: "success",
  //     title: "삭제 성공",
  //     text: `다른 건의 / 불편사항이 생기시면 꼭 알려주세요!🫡`,
  //     confirmButtonText: "확인",
  //     confirmButtonColor: "#85bd82",
  //     showDenyButton: false,
  //     timer: 5000,
  //   });

  //   //자료 업데이트
  //   await setDoc(meetingSumRef, { meetSum_data: remainData });

  //   //사진 파일 있었으면 저장했던 파일 삭제
  //   if (url !== "") {
  //     await deleteObject(ref(storageService, url));
  //   }
  // };
  // const registrationTokens = [
  //
  // ];

  // const message = {
  //   data: {
  //     score: "850",
  //     time: "2:45",
  //   },
  //   token: registrationTokens,
  // };

  const sendMessage = async () => {
    // initializeApp({
    //   credential: applicationDefault(),
    //   projectId: "checks-cho-ok",
    // });
    // const { JWT } = require("google-auth-library");
    // let MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
    // let SCOPES = [MESSAGING_SCOPE];
    // function getAccessToken() {
    //   return new Promise(function (resolve, reject) {
    //     const key = require("../../../firebase-adminsdk.json");
    //     const jwtClient = new JWT(
    //       key.client_email,
    //       null,
    //       key.private_key,
    //       SCOPES,
    //       null
    //     );
    //     jwtClient.authorize(function (err, tokens) {
    //       if (err) {
    //         reject(err);
    //         return;
    //       }
    //       resolve(tokens.access_token);
    //     });
    //   });
    // }
    // const accessToken = getAccessToken();
    // // const GOOGLE_APPLICATION_CREDENTIALS = "../../../firebase-adminsdk.json";
    // axios.post(
    //   "https://fcm.googleapis.com/v1/projects/checks-cho-ok/messages:send",
    //   {
    //     message: {
    //       token:
    //         "",
    //       notification: {
    //         body: "알림이 도착했습니다!",
    //         title: "TEST-PWA",
    //       },
    //     },
    //   },
    //   {
    //     headers: {
    //       Authorization: "Bearer " + accessToken,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // getMessaging()
    //   .sendMulticast(message)
    //   .then((response) => {
    //     console.log(response.successCount + " messages were sent successfully");
    //   });
    // const registrationToken =
    //   "";
    // const message = {
    //   data: {
    //     score: "850",
    //     time: "2:45",
    //   },
    //   token: registrationToken,
    // };
    // Send a message to the device corresponding to the provided
    // registration token.
    // getMessaging()
    //   .send(message)
    //   .then((response) => {
    //     // Response is a message ID string.
    //     console.log("Successfully sent message:", response);
    //   })
    //   .catch((error) => {
    //     console.log("Error sending message:", error);
    //   });
  };

  return (
    <div>
      {/* 운영자가 정리해서 올리는 해결중인 내용들 */}
      <DoingList lists={lists} />
      <br />
      {/* 유저가 직접 작성한 건의 불편사항 */}
      <DoMyList lists={lists?.filter((list) => list.user === props.userUid)} />
      <br />
      <hr />
      <br />
      <DoInput addDoitHandler={addDoitHandler} />

      {/* <button onClick={sendMessage}>메세지보내기</button> */}
      {/* <HwpMaker /> */}
    </div>
  );
};

export default Doit;
