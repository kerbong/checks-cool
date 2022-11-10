import React, { useState, useEffect } from "react";
import classes from "./Simsim.module.css";
import { dbService } from "../../../fbase";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";

const Simsim = (props) => {
  const [simsim, setSimsim] = useState([]);
  const [nowOnSim, setNowOnSim] = useState({});
  const [userInfo, setUserInfo] = useState({});

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
    setNowOnSim(simsim[0]);
  }, [simsim]);

  return (
    <div className={classes["container-div"]}>
      <div className={classes["image-div"]}>
        {nowOnSim?.image === "" ? (
          <div className={classes["insteadText-div"]}>
            {nowOnSim?.insteadText}
          </div>
        ) : (
          <img alt="" src={nowOnSim?.image} />
        )}

        {/* 보여줄 이미지 부분 수정 */}
      </div>
      <div className={classes["user-like-div"]}>
        <div className={classes["userImage-div"]}>
          <img className={classes["userImage-img"]} alt="" src={props.image} />
        </div>
        <div className={classes["user-div"]}>
          <div className={classes["nickName-div"]}>{nowOnSim?.nickName}</div>
          <div className={classes["stateMessage-div"]}>
            {nowOnSim?.stateMessage}
          </div>
        </div>
        <div className={classes["like-div"]}>
          <i className="fa-regular fa-heart"></i>
        </div>
      </div>

      <div className={classes["text-div"]}>{nowOnSim?.descText}</div>

      <p className={classes["p"]}>* 개발중입니다!</p>
    </div>
  );
};

export default Simsim;
