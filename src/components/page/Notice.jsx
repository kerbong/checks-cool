import React, { useEffect, useState } from "react";
import { dbService } from "../../fbase";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const Notice = () => {
  const [noticeDatas, setNoticeDatas] = useState([]);

  const getNoticeFromDb = async () => {
    let noticeSnapshot = await getDocs(collection(dbService, "notice"));

    setNoticeDatas([]);
    noticeSnapshot.forEach((doc) => {
      const itemObj = { ...doc.data(), doc_id: doc.id };
      setNoticeDatas((prev) => [...prev, itemObj]);
    });
  };

  useEffect(() => {
    getNoticeFromDb();
  }, []);

  return (
    <div>
      <h2>공지사항</h2>
      <ul>
        {noticeDatas.map((notice) => (
          <li>{notice.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notice;
