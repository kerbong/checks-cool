import React, { useState, useEffect } from "react";
import classes from "./Simsim.module.css";
import { dbService, storageService } from "../../../fbase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  arrayRemove,
  arrayUnion,
  updateDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  addDoc,
  orderBy,
} from "firebase/firestore";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SimsimAdd from "./SimsimAdd";
import SimsimContent from "./SimsimContent";

const Simsim = (props) => {
  const [simsim, setSimsim] = useState([]);
  const [nowOnSimsim, setNowOnSimsim] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [like, setLike] = useState(false);
  const [hasUserInfo, setHasUserInfo] = useState(false);
  const [contentNum, setContentNum] = useState(0);
  const [simsimLength, setSimsimLength] = useState(0);

  let navigate = useNavigate();

  const getSimsimFromDb = () => {
    let queryWhere = query(
      collection(dbService, "simsim"),
      orderBy("id", "desc")
    );
    onSnapshot(queryWhere, (snapShot) => {
      setSimsim([]);
      snapShot.docs.map((doc) => {
        let itemObj = {
          ...doc.data(),
          doc_id: doc.id,
        };
        return setSimsim((prev) => [...prev, itemObj]);
      });
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
    getSimsimFromDb();
    getUserInfoFromDb();
  }, []);

  useEffect(() => {
    setSimsimLength(simsim.length);
    // setContentNum(0);
    setNowOnSimsim(simsim[contentNum]);
  }, [simsim]);

  useEffect(() => {
    checkSetLike();
  }, [nowOnSimsim]);

  useEffect(() => {
    //simsim자료에서 다음 이전 번호로 넘김
    if (contentNum < simsimLength && contentNum >= 0) {
      setNowOnSimsim(simsim[contentNum]);
    }
    //가져온 자료의 수보다 커지면 다시 -1해서 세팅
    if (simsimLength !== 0 && contentNum >= simsimLength) {
      setContentNum(simsimLength - 1);
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
    let likeOrNot = nowOnSimsim?.like?.filter(
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
    const nowOnRef = doc(dbService, "simsim", nowOnSimsim.doc_id);
    setLike((prev) => !prev);

    //만약 이전이 좋아요였으면 해제
    if (like) {
      await updateDoc(nowOnRef, {
        like: arrayRemove(props.userUid),
      });
      //만약 이전이 무응답이었으면 추가
    } else {
      await updateDoc(nowOnRef, {
        like: arrayUnion(props.userUid),
      });
    }
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

  //id만들기용 yyyy-mm-dd-h-m
  const yyyymmddhm = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}-${hours}:${minutes}`;
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
      id: yyyymmddhm(new Date()),
      descText,
      insteadText,
      image,
      like: [],
      nickName: userInfo.nickName,
      stateMessage: userInfo.stateMessage,
      writtenId: props.userUid,
    };

    // 초기화
    Swal.fire({
      icon: "success",
      title: "작성 성공",
      text: "심심해요에 글이 성공적으로 작성되었습니다.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: false,
      timer: 5000,
    });

    //firestore에 저장
    await addDoc(collection(dbService, "simsim"), new_data);

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
              nowOnSimsim={nowOnSimsim}
              key={nowOnSimsim?.id}
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
        <p className={classes["p"]}>
          * 화면 중앙의 우측, 혹은 좌측 부분을 클릭 / 왼쪽이나 오른쪽으로
          슬라이드 하시면 다음, 이전 내용으로 이동합니다.
        </p>
        <p className={classes["p"]}>
          * 좋아요 버튼은 4초에 한 번만 상태 변경이 가능합니다.
        </p>
      </div>
    </>
  );
};

export default Simsim;
