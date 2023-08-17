import React, { useEffect, useState } from "react";
import { dbService } from "../../fbase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import NoticeList from "components/Notice/NoticeList";

const Template = ["공지사항", "활용 설명서"];

const Notice = () => {
  const [noticeDatas, setNoticeDatas] = useState([]);
  const [showTemplate, setShowTemplate] = useState(Template[0]);

  const getNoticeFromDb = async () => {
    let noticeSnapshot = await getDocs(
      query(collection(dbService, "notice"), orderBy("id", "desc"))
    );

    setNoticeDatas([]);
    noticeSnapshot.forEach((doc) => {
      const itemObj = {
        ...doc.data(),
        doc_id: doc.id,
      };
      setNoticeDatas((prev) => [...prev, itemObj]);
    });
  };

  useEffect(() => {
    getNoticeFromDb();
  }, []);

  return (
    <div>
      <h1 style={{ margin: "15px" }}>공지사항</h1>
      {/* 기능 예시들 보여주는 화면 추가하기 */}
      <NoticeList noticeDatas={noticeDatas} />
    </div>
  );
};

export default Notice;
