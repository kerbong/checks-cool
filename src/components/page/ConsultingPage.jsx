import React, { useState, useRef, useEffect } from "react";
import consultingOption from "../../consultingOption";
import Attendance from "../Attendance/Attendance";
import Student from "../Student/Student";

import ConsultLists from "../Consult/ConsultLists";
import ExampleModal from "./ExampleModal";
import consultAdd from "../../assets/consult/consultAdd.gif";
import { dbService, storageService } from "../../fbase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
  const [nowClassName, setNowClassName] = useState("");
  const [nowClStudents, setNowClStudents] = useState([]);

  const selectRef = useRef();

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
    let new_data = {
      ...data,
      attachedFileUrl: fileUrl,
    };

    //전담일 경우 학급만 추가하기
    if (props.isSubject) {
      new_data = {
        ...new_data,
        clName: nowClassName === "" ? new_data.clName : nowClassName,
      };
    }
    delete new_data.yearGroup;

    const consultRef = doc(dbService, "consult", props.userUid);
    //상담자료 받아오기
    const consultSnap = await getDoc(consultRef);
    //만약 저장된 자료가 있었으면
    if (consultSnap.exists()) {
      //현재 저장되는 자료와 중복되는거 제외하고 거기에 새 자료 추가함
      let new_datas = [
        ...consultSnap
          .data()
          .consult_data.filter((consult) => consult.id !== new_data.id),
      ];
      new_datas.push(new_data);
      await setDoc(consultRef, {
        consult_data: new_datas,
      });
    } else {
      await setDoc(consultRef, { consult_data: [new_data] });
    }
  };

  const deleteConsultHandler = async (id, url) => {
    //storage에 저장된 파일 지우기
    if (url !== "") {
      await deleteObject(ref(storageService, url));
    }
    //firestore자료 수정하기
    const consultRef = doc(dbService, "consult", props.userUid);
    //상담자료 받아오기
    const consultSnap = await getDoc(consultRef);

    //현재 저장되는 자료와 중복되는거 제외하고 저장
    let new_datas = [
      ...consultSnap
        ?.data()
        ?.consult_data.filter((consult) => consult.id !== id),
    ];
    await setDoc(consultRef, {
      consult_data: new_datas,
    });
  };

  //학급 선택시 실행되는 함수
  const selectClassHandler = () => {
    let className = selectRef.current.value;
    // console.log(className);
    setNowClassName(className);
  };

  //셀렉트 태그에서 값을 선택하면 해당 반의 자료만 화면에 보여주도록 events 상태 set하기
  useEffect(() => {
    // console.log(nowClassName);
    selectEvents();
  }, [nowClassName]);

  //선택된 학급이 바뀌면 해당반 학생으로 바꿔주기
  const selectEvents = () => {
    //만약 해당 반에 아직 데이터가 없으면 events빈배열로 설정 및 리무브 스크린 이벤트함수 실행
    // const existSelectClData = [...wholeEvents].filter(
    //   (cl) => Object.keys(cl)[0] === nowClassName
    // );
    // if (existSelectClData.length === 0) {
    //   removeScreenEvents();

    //   setEvents([]);
    // }

    //wholeEvents에서 해당하는 학급 찾아서 events에 저장
    // [...wholeEvents].forEach((cl) => {
    //   if (Object.keys(cl)[0] === nowClassName) {
    //     removeScreenEvents();

    //     setEvents(Object.values(cl)[0]);
    //   }
    // });
    props.students?.forEach((cl) => {
      if (Object.keys(cl)[0] === nowClassName) {
        setNowClStudents(Object.values(cl)[0]);
      }
    });

    // --학급-- 을 누르면 학생을 초기화
    if (nowClassName === "") {
      setNowClStudents([]);
    }
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
        <>
          {/* 전담교사만 보이는 학급 셀렉트 */}

          {props.isSubject && (
            <div>
              <select
                ref={selectRef}
                onChange={selectClassHandler}
                style={{
                  fontSize: "1.2rem",
                  width: "auto",
                  margin: "10px 0 20px 0",
                }}
                value={nowClassName}
              >
                <option value="">--학급--</option>
                {props.students?.map((cl) => (
                  <option key={Object.keys(cl)} value={Object.keys(cl)}>
                    {Object.keys(cl)}
                  </option>
                ))}
              </select>
              {selectRef?.current?.value === "" &&
                "* 학급을 먼저 선택해주세요."}
            </div>
          )}
          <Student
            students={!props.isSubject ? props.students : nowClStudents}
            showOption={showOptionHandler}
            isSubject={props.isSubject}
          />
        </>
      ) : (
        <>
          {/* 그동안의 기록들 볼 수 있는 화면 */}
          <ConsultLists
            userUid={props.userUid}
            selectOption={consultingOption}
            addData={(data) => addDataHandler(data)}
            deleteConsult={(id, url) => deleteConsultHandler(id, url)}
            isSubject={props.isSubject}
            students={props.students}
          />
        </>
      )}
    </>
  );
};

export default ConsultingPage;
