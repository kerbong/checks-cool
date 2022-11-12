import React, { useState, useEffect } from "react";
import classes from "./Simsim.module.css";
import { dbService } from "../../../fbase";
import {
  arrayRemove,
  arrayUnion,
  updateDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import LikeBtn from "./LikeBtn";

const Simsim = (props) => {
  const [simsim, setSimsim] = useState([]);
  const [nowOnSimsim, setNowOnSimsim] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [like, setLike] = useState();

  const getSimsimFromDb = () => {
    let queryWhere = query(collection(dbService, "simsim"));

    onSnapshot(queryWhere, (snapShot) => {
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
    }
  };

  useEffect(() => {
    getSimsimFromDb();
    getUserInfoFromDb();
  }, []);

  useEffect(() => {
    setNowOnSimsim(simsim[0]);
  }, [simsim]);

  useEffect(() => {
    nowOnSimsim?.like?.filter((user) => user === props.userUid).length === 0
      ? setLike(false)
      : setLike(true);
  }, [nowOnSimsim]);

  //라이크를 변경하는 함수, 값을 찾아서 업데이트
  const changeLikeHandler = async () => {
    const nowOnRef = doc(dbService, "simsim", nowOnSimsim.doc_id);
    setLike((prev) => !prev);

    if (like) {
      await updateDoc(nowOnRef, {
        like: arrayRemove(props.userUid),
      });
    } else {
      await updateDoc(nowOnRef, {
        like: arrayUnion(props.userUid),
      });
    }
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
      <div className={classes["container-div"]}>
        {!addNew ? (
          <>
            {/* 이미지가 없는 글만 있는 자료의 경우 이미지 대신 insteadText(최대 100자)를 메인에 넣어줌 */}
            <div className={classes["image-div"]}>
              {nowOnSimsim?.image === "" ? (
                <div className={classes["insteadText-div"]}>
                  {nowOnSimsim?.insteadText}
                </div>
              ) : (
                // 이미지있을 경우 넣어줌
                <img alt="" src={nowOnSimsim?.image} />
              )}
            </div>

            <div className={classes["user-like-div"]}>
              {/* 글쓴이 프로필이미지 */}
              <div className={classes["userImage-div"]}>
                <img
                  className={classes["userImage-img"]}
                  alt=""
                  src={props.image}
                />
              </div>
              {/* 글쓴이정보 */}
              <div className={classes["user-div"]}>
                <div className={classes["nickName-div"]}>
                  {nowOnSimsim?.nickName}
                </div>
                <div className={classes["stateMessage-div"]}>
                  {nowOnSimsim?.stateMessage}
                </div>
              </div>
              {/* 좋아요 버튼 */}
              <div className={classes["like-div"]}>
                <LikeBtn like={like} changeLike={changeLikeHandler} />
                <div>{nowOnSimsim?.like?.length}</div>
              </div>
            </div>

            {/* 설명텍스트란 최대 30자 */}
            <div className={classes["text-div"]}>
              <span className={classes["text-span"]}>
                {nowOnSimsim?.descText}
              </span>
            </div>
          </>
        ) : (
          <>
            {/* 먼저 닉네임 있는지 확인하고 없으면 swal로 띄워서 해당화면으로 보냄. */}

            {/* 파일첨부버튼 먼저 보여주고 o,x 조건에 따라 화면 구성을 다르게... 첨부일 경우 파일첨부image, 설명텍스트descText, 입력하는 창 */}

            {/* 첨부가 아닌경우 100자 insteadText 입력하고 부가 설명descText입력하는 창 */}

            {/* 저장버튼은 공용 */}
            <div>새로운거 입력하는 화면</div>
          </>
        )}

        <p className={classes["p"]}>* 개발중입니다!</p>
      </div>
    </>
  );
};

export default Simsim;
