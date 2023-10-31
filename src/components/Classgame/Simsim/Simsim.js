import React, { useState, useEffect } from "react";
import classes from "./Simsim.module.css";
import dayjs from "dayjs";
import { dbService, storageService } from "../../../fbase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  updateDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  orderBy,
} from "firebase/firestore";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SimsimAdd from "./SimsimAdd";
import SimsimContent from "./SimsimContent";

const Simsim = (props) => {
  const [recommend, setRecommend] = useState([]);
  const [nowOnRecommend, setNowOnRecommend] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [like, setLike] = useState(false);
  const [hasUserInfo, setHasUserInfo] = useState(false);
  const [contentNum, setContentNum] = useState(0);
  const [recommendLength, setRecommendLength] = useState(0);
  const [showExplain, setShowExplain] = useState(false);

  let navigate = useNavigate();

  const getRecommendFromDb = () => {
    //모든자료 가져오기

    let recommendRef = doc(dbService, "recommend", "all");

    setRecommend([]);
    onSnapshot(recommendRef, (doc) => {
      let new_recommend = [];
      if (doc?.data()?.datas) {
        new_recommend = doc?.data()?.datas;
      }

      setRecommend(new_recommend);
    });
  };

  //유저 닉네임, 상태메세지 저장, 글쓰기에 필요함.
  const getUserInfoFromDb = async () => {
    let userRef = doc(dbService, "user", props.userUid);
    let userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setUserInfo({
        nickName: userSnap.data().nickName,
        stateMessage: userSnap.data().stateMessage,
      });
      setHasUserInfo(true);
    } else {
      setHasUserInfo(false);
    }
  };

  useEffect(() => {
    getRecommendFromDb();
    getUserInfoFromDb();
  }, []);

  useEffect(() => {
    setRecommendLength(recommend.length);
    // setContentNum(0);
    setNowOnRecommend(recommend[contentNum]);
  }, [recommend]);

  useEffect(() => {
    checkSetLike();
  }, [nowOnRecommend]);

  useEffect(() => {
    //simsim자료에서 다음 이전 번호로 넘김
    if (contentNum < recommendLength && contentNum >= 0) {
      setNowOnRecommend(recommend[contentNum]);
    }
    //가져온 자료의 수보다 커지면 다시 -1해서 세팅
    if (recommendLength !== 0 && contentNum >= recommendLength) {
      setContentNum(recommendLength - 1);
    }
    //-1이 되면 다시 0으로 세팅
    if (contentNum <= -1) {
      setContentNum(0);
    }
  }, [contentNum]);

  useEffect(() => {
    const container = document.getElementById("container-div");
    container?.addEventListener("touchstart", touch_start);
    container?.addEventListener("touchend", touch_end);
  }, []);

  //like상태 불러와서 저장하기
  const checkSetLike = () => {
    let likeOrNot = nowOnRecommend?.like?.filter(
      (user) => user === props.userUid
    ).length;

    if (likeOrNot > 0) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  // 화면의 왼쪽 오른쪽으로 스와이프하면  nowOnSimsim을 바꿔주는 로직
  let start_x, end_x, start_y, end_y;

  const prev = () => {
    setContentNum((prev) => prev - 1);
  };
  const next = () => {
    setContentNum((prev) => prev + 1);
  };

  const touch_start = (e) => {
    start_x = e.touches[0].pageX;
    start_y = e.touches[0].pageY;
  };

  const touch_end = (e) => {
    end_x = e.changedTouches[0].pageX;
    end_y = e.changedTouches[0].pageY;
    //x축 이동이 y축 이동보다 많은 경우에만 넘기기로 인식
    if (Math.abs(start_y - end_y) < Math.abs(start_x - end_x)) {
      if (start_x > end_x) {
        next();
      } else {
        prev();
      }
    }
  };

  //라이크를 변경하는 함수, 값을 찾아서 업데이트
  const changeLikeHandler = async () => {
    const nowOnRef = doc(dbService, "recommend", "all");
    setLike((prev) => !prev);

    const getNowData = await getDoc(nowOnRef);
    //이번달 자료 중 현재 자료의 인덱스 저장하고
    let nowData_index = 0;
    let new_simsimData = [...getNowData.data().datas];
    new_simsimData.forEach((data, index) => {
      if (
        data.writtenId + data.id ===
        nowOnRecommend.writtenId + nowOnRecommend.id
      ) {
        nowData_index = index;
      }
    });
    let nowOnData = new_simsimData[nowData_index];
    let nowOnData_like = nowOnData.like;

    //만약 이전이 좋아요였으면 해제
    if (like) {
      new_simsimData[nowData_index].like = nowOnData_like?.filter(
        (uid) => uid !== props.userUid
      );

      //만약 이전이 무응답이었으면 추가
    } else {
      nowOnData_like.push(props.userUid);
    }

    await updateDoc(nowOnRef, { datas: new_simsimData });
  };

  //프로필 없는거 알려주고 이동시키기
  const profileErrorSwal = () => {
    Swal.fire({
      icon: "error",
      title: "작성 불가",
      text: "프로필이 존재하지 않아서 글 작성이 불가능합니다. [확인] 버튼을 눌러 프로필 화면으로 이동해주세요.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate(`/profile`);
      }
    });
  };

  //일반 저장 불가
  const saveErrorSwal = () => {
    Swal.fire({
      icon: "error",
      title: "작성 불가",
      text: "메인내용/이미지는 꼭 필요합니다.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: false,
      timer: 5000,
    });
  };

  //새로운 심심데이터 추가하기
  const addSimsimHandler = async (file) => {
    let descText = document.getElementById("descText-input")?.value;

    let insteadText = document.getElementById("insteadText-input")?.value;

    if (insteadText === undefined) {
      insteadText = "";
    }

    let image = "";

    if (file?.length > 0) {
      image = file;
    }

    if (insteadText?.trim().length === 0 && file?.length === 0) {
      saveErrorSwal();
    }

    if (image?.length > 0) {
      //storage에 저장
      const response = await uploadString(
        ref(storageService, `${props.userUid}/${v4()}`),
        image,
        "data_url"
      );
      //firestore에 저장할 url받아오기
      image = await getDownloadURL(response.ref);
    }

    const new_data = {
      id: dayjs().format("DD-HH:mm:ss"),
      descText,
      insteadText,
      image,
      like: [],
      nickName: userInfo.nickName,
      stateMessage: userInfo.stateMessage || "",
      writtenId: props.userUid,
    };

    // 초기화
    Swal.fire({
      icon: "success",
      title: "작성 성공",
      text: "추천해요에 글이 성공적으로 작성되었습니다.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: false,
      timer: 5000,
    });

    //firestore에 저장
    const recommendRef = doc(dbService, "recommend", "all");
    //기존 자료 목록 받아오고 거기에 추가하기

    let existData = [new_data];
    const recommendDoc = await getDoc(recommendRef);
    if (recommendDoc.exists()) {
      recommendDoc?.data()?.datas.forEach((data) => existData.push(data));
    }

    await setDoc(recommendRef, { datas: existData });

    insteadText = "";
    descText = "";
    setAddNew(false);
  };

  return (
    <>
      <div>
        {/* 심심글작성하기 */}
        <button
          className={classes["simsimAdd-btn"]}
          onClick={() => {
            setAddNew((prev) => !prev);
          }}
        >
          {addNew ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <i className="fa-solid fa-plus"></i>
          )}
        </button>
      </div>

      {/* 내용 보여줄 부분 */}
      <div className={classes["container-div"]} id="container-div">
        {!addNew ? (
          <>
            <SimsimContent
              changeLikeHandler={changeLikeHandler}
              like={like}
              nowOnRecommend={nowOnRecommend}
              key={nowOnRecommend?.id}
              prev={prev}
              next={next}
            />
          </>
        ) : (
          <>
            {hasUserInfo ? (
              <>
                <SimsimAdd addSimsimHandler={addSimsimHandler} />
              </>
            ) : (
              profileErrorSwal()
            )}
          </>
        )}
        <div>
          <hr />
        </div>
        <span
          className={classes["explain-span"]}
          onClick={() => setShowExplain((prev) => !prev)}
        >
          📋 추천해요 활용 안내
          <span className={classes["explain-icon"]}>
            {showExplain ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}{" "}
          </span>
        </span>
        <div>
          <div
            className={showExplain ? classes["p-active"] : classes["p-hide"]}
          >
            <p className={classes["p"]}>
              * 화면 중앙의 우측, 혹은 좌측 부분을 클릭 / 왼쪽이나 오른쪽으로
              슬라이드 하시면 다음, 이전 내용으로 이동합니다.
            </p>
            <p className={classes["p"]}>
              * "추천해요" 글에는 '좋아요'만 가능합니다.
            </p>
            <p className={classes["p"]}>
              * '좋아요' 버튼은 3초에 한 번만 상태 변경이 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Simsim;
