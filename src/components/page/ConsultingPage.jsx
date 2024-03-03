import React, { useState, useRef, useEffect } from "react";
import consultingOption from "../../consultingOption";
import Attendance from "../Attendance/Attendance";
import Student from "../Student/Student";
import dayjs from "dayjs";
import ConsultLists from "../Consult/ConsultLists";

import { dbService, storageService } from "../../fbase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteObject,
  ref,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

const ConsultingPage = (props) => {
  const [optionIsShown, setOptionShown] = useState(false);
  const [student, setStudent] = useState("");
  const [showConsultList, setShowConsultList] = useState(false);

  const [nowClassName, setNowClassName] = useState("");
  const [nowClStudents, setNowClStudents] = useState([]);
  const [nowStudents, setNowStudents] = useState([]);
  const [isSubject, setIsSubject] = useState(false);

  const { state } = useLocation();
  let navigate = useNavigate();

  const selectRef = useRef();

  useEffect(() => {
    if (state?.doWhat === "addConsult") {
      setShowConsultList(false);
    } else if (state?.doWhat === "showConsult") {
      setShowConsultList(true);
    }
  }, [state]);

  const showOptionHandler = (e) => {
    setStudent(e.target.innerText);
    setOptionShown(true);
  };

  const hideOptionHandler = () => {
    setOptionShown(false);
  };

  const showCalHandler = () => {
    // setShowConsultList(!showConsultList);
    setShowConsultList(false);
  };

  const addDataHandler = async (data) => {
    let fileUrl = "";
    //파일 있으면 storage에 저장하기, 업데이트하면서 파일을 바꾸지 않는 경우 패스!
    if (data.attachedFileUrl !== "") {
      //storage에 저장
      //음성녹음인 경우
      if (data.attachedFileUrl instanceof Object) {
        const upAndDownUrl = async (audio_file) => {
          const response = await uploadBytes(
            ref(storageService, `${props.userUid}/${v4()}`),
            audio_file,
            { contentType: "audio/mp4" }
          );
          //firestore에 저장할 url받아오기
          return await getDownloadURL(response.ref);
        };

        // //blob 또는 File api정보 업로드하기
        // const reader = new FileReader();
        // reader.readAsDataURL(data.attachedFileUrl);
        // reader.onloadend = (finishedEvent) => {
        //   fileUrl = upAndDownUrl(finishedEvent.currentTarget.result);
        // };
        fileUrl = await upAndDownUrl(data.attachedFileUrl);

        //이미지파일인 경우
      } else {
        const response = await uploadString(
          ref(storageService, `${props.userUid}/${v4()}`),
          data.attachedFileUrl,
          "data_url"
        );
        //firestore에 저장할 url받아오기
        fileUrl = await getDownloadURL(response.ref);
      }
    }
    //firebase에 firestore에 업로드, 데이터에서 같은게 있는지 확인
    let new_data = {
      ...data,
      attachedFileUrl: fileUrl,
    };

    let data_year = setYear(data.id.slice(0, 10));
    //전담일 경우 학급만 추가하기
    if (changeSubjectHandler(data_year)) {
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
      let before_id;
      if (new_data.beforeId) {
        before_id = new_data.beforeId;
      } else {
        before_id = new_data.id;
      }

      let new_datas = [
        ...consultSnap
          .data()
          .consult_data?.filter((consult) => consult.id !== before_id),
      ];
      if (new_data.beforeId) {
        delete new_data.beforeId;
      }

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
        ?.consult_data?.filter((consult) => consult.id !== id),
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
    nowStudents?.forEach((cl) => {
      if (Object.keys(cl)[0] === nowClassName) {
        setNowClStudents(Object.values(cl)[0]);
      }
    });

    // --학급-- 을 누르면 학생을 초기화
    if (nowClassName === "") {
      setNowClStudents([]);
    }
  };

  //학년도 설정함수
  const setYear = (date) => {
    let data_id = date?.length > 0 ? date : new Date();
    return dayjs(data_id).format("MM-DD") <= "02-15"
      ? String(+dayjs(data_id).format("YYYY") - 1)
      : dayjs(data_id).format("YYYY");
  };

  useEffect(() => {
    let now_year = setYear();
    //현재학년도 자료만 입력가능하고,, 불러오기
    let now_students = props?.students?.filter(
      (yearStd) => Object.keys(yearStd)[0] === now_year
    )?.[0]?.[now_year];

    setNowStudents(now_students);
  }, [props.students]);

  //해당학년도의 전담여부 확인해서 설정하는 함수
  const changeSubjectHandler = (data_year) => {
    let isSubject;
    if (props.isSubject) {
      isSubject = props.isSubject?.filter(
        (yearData) => Object.keys(yearData)[0] === data_year
      )?.[0]?.[data_year];
    }
    return isSubject;
  };

  useEffect(() => {
    //해당학년도에 전담여부 확인
    let data_year = setYear();
    let isSubject = changeSubjectHandler(data_year);
    setIsSubject(isSubject);
  }, [props.isSubject]);

  return (
    <>
      <div id="title-div">
        <button id="title-btn">
          <i className="fa-regular fa-comments" style={{ fontSize: "1em" }}></i>{" "}
          상담관리
        </button>

        <div
          style={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            width: "auto",
            justifyContent: "flex-end",
            lineHeight: "20px",
            fontSize: "0.9rem",
          }}
        >
          <span
            id="switch-btn"
            onClick={() => {
              navigate(`/attendance`, {
                state: { doWhat: "addAttend" },
              });
            }}
          >
            <i className="fa-regular fa-calendar-days"></i> 출결
            <br />
            기록
          </span>

          <span id="switch-btn" onClick={showCalHandler}>
            <>
              <i className="fa-regular fa-comments"></i> 상담
              <br />
              관리
            </>
          </span>
          {/* 제출ox */}
          <span
            id="switch-btn"
            onClick={() => {
              navigate(`/checkListMemo`, {
                state: { about: "checkLists" },
              });
            }}
          >
            <i className="fa-regular fa-square-check"></i> 제출
            <br />
            ox
          </span>
          {/* 개별기록 */}
          <span
            id="switch-btn"
            onClick={() => {
              navigate(`/checkListMemo`, {
                state: { about: "listMemo" },
              });
            }}
          >
            <i className="fa-solid fa-clipboard-check"></i> 개별
            <br />
            기록
          </span>
        </div>
      </div>

      {optionIsShown && (
        //모달로 나오는 상담 입력화면
        <Attendance
          onClose={hideOptionHandler}
          students={!isSubject ? nowStudents : nowClStudents}
          who={student}
          date={new Date()}
          selectOption={consultingOption}
          addData={addDataHandler}
          about="consulting"
          userUid={props.userUid}
          isSubject={true}
        />
      )}
      {(!nowStudents || nowStudents?.length === 0) && (
        <>
          <>
            현재 학년도의 기초자료를 먼저 입력해주세요. <br />
            (학년도 기준 예: 2023.02.16. ~ 2024.02.15.)
            <br />
            <br />
            1. 프로필 ( [👤] - '프로필 수정' - '저장')
            <br /> 2. 학생 ( [메인화면] - '학생등록' )
            <br /> <br />
          </>
        </>
      )}
      {!showConsultList ? (
        //명렬표로 입력할 수 있도록 나오는 화면
        <>
          {/* 전담교사만 보이는 학급 셀렉트 */}
          {isSubject && (
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
                {nowStudents?.map((cl) => (
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
            students={!isSubject ? nowStudents : nowClStudents}
            showOption={showOptionHandler}
            isSubject={props.isSubject}
          />

          <br />
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
