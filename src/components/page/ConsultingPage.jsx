import React, { useState } from "react";
import consultingOption from "../../consultingOption";
// import ConsultContext from "../../store/consult-context";
import Attendance from "../Attendance/Attendance";
import Student from "../Student/Student";

import ConsultLists from "../Consult/ConsultLists";
import ExampleModal from "./ExampleModal";
import consultAdd from "../../assets/consult/consultAdd.gif";
import { dbService, storageService } from "../../fbase";
import {
  collection,
  query,
  onSnapshot,
  where,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import {
  deleteObject,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

const ConsultingPage = (props) => {
  const [optionIsShown, setOptionShown] = useState(false);
  const [student, setStudent] = useState("");
  const [showConsultList, setShowConsultList] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const showOptionHandler = (e) => {
    setStudent(e.target.innerText);
    setOptionShown(true);
  };

  const hideOptionHandler = () => {
    setOptionShown(false);
  };

  const showCalHandler = () => {
    setShowConsultList(!showConsultList);
  };

  const addDataHandler = async (data) => {
    let fileUrl = "";
    //파일 있으면 storage에 저장하기, 업데이트하면서 파일을 바꾸지 않는 경우 패스!
    if (data.attachedFileUrl !== "") {
      //storage에 저장
      const response = await uploadString(
        ref(storageService, `${props.userUid}/${v4()}`),
        data.attachedFileUrl,
        "data_url"
      );
      //firestore에 저장할 url받아오기
      fileUrl = await getDownloadURL(response.ref);
    }
    //firebase에 firestore에 업로드, 데이터에서 같은게 있는지 확인
    const new_data = { ...data, attachedFileUrl: fileUrl };

    //기존데이터는 업데이트
    if (data.doc_id) {
      const consultRef = doc(dbService, "consult", data.doc_id);
      await updateDoc(consultRef, new_data);
      //새 자료는 저장
    } else {
      const newConsultRef = doc(collection(dbService, "consult"));
      await setDoc(newConsultRef, { ...new_data, writtenId: props.userUid });
    }
  };

  const deleteConsultHandler = async (docId, url) => {
    //storage에 저장된 파일 지우기
    if (url !== "") {
      await deleteObject(ref(storageService, url));
    }

    await deleteDoc(doc(dbService, "consult", docId));
  };

  return (
    <>
      {showExample && (
        <ExampleModal
          onClose={() => setShowExample(false)}
          imgSrc={consultAdd}
          text={
            <>
              <p
                style={{
                  fontSize: "1.3em",
                  textAlign: "center",
                  margin: "5px",
                }}
              >
                === 상담기록 예시 ===
              </p>
              <p style={{ margin: "15px" }}>
                * 화면 왼쪽 상단의 현재 페이지 타이틀을 클릭하시면 다시 보실 수
                있어요!
              </p>
            </>
          }
        />
      )}
      <div id="title-div">
        <button
          id="title-btn"
          className="consult"
          onClick={() => setShowExample(true)}
        >
          <i className="fa-regular fa-comments"></i> 금쪽상담소
        </button>

        <button id="switch-btn" onClick={showCalHandler}>
          {showConsultList ? (
            <>
              <i className="fa-solid fa-list-ol"></i> 쓰기
            </>
          ) : (
            <>
              <i className="fa-regular fa-rectangle-list"></i> 보기
            </>
          )}
        </button>
      </div>

      {optionIsShown && (
        //모달로 나오는 상담 입력화면
        <Attendance
          onClose={hideOptionHandler}
          who={student}
          date={new Date()}
          selectOption={consultingOption}
          addData={addDataHandler}
          about="consulting"
          userUid={props.userUid}
        />
      )}
      {props.students.length === 0 && (
        <>
          <div>학생 명단이 존재하지 않네요!</div>
          <div>메뉴의 곰돌이를 눌러서</div>
          <div>학생 명단을 먼저 입력해주세요!</div>
        </>
      )}
      {!showConsultList ? (
        //명렬표로 입력할 수 있도록 나오는 화면
        <Student students={props.students} showOption={showOptionHandler} />
      ) : (
        <>
          {/* 그동안의 기록들 볼 수 있는 화면 */}
          <ConsultLists
            userUid={props.userUid}
            selectOption={consultingOption}
            addData={(data) => addDataHandler(data)}
            deleteConsult={(id, url) => deleteConsultHandler(id, url)}
          />
        </>
      )}
    </>
  );
};

export default ConsultingPage;
