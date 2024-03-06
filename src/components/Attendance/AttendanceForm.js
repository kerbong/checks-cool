import React, { useRef, useState, useEffect } from "react";
import classes from "./AttendanceForm.module.css";
import Input from "../Layout/Input";
import Swal from "sweetalert2";
import AttendanceOption from "./AttendanceOption";
import FileArea from "components/Layout/FileArea";
import Button from "components/Layout/Button";
import ConsultRelated from "components/Consult/ConsultRelated";

import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import AudioRecord from "components/Consult/AudioRecord";
import dayjs from "dayjs";

const AttendanceForm = (props) => {
  const [attachedFile, setAttachedFile] = useState("");
  const [option, setOption] = useState("");
  const [inputIsShown, setInputIsShown] = useState(false);
  const [paperSubmit, setPaperSubmit] = useState(false);
  const [requestSubmit, setRequestSubmit] = useState(false);
  const [reportSubmit, setReportSubmit] = useState(false);
  const [isImgFile, setIsImgFile] = useState(false);
  const [attendEvents, setAttendEvents] = useState([]);
  const [showStudent, setShowStudent] = useState(false);
  const [relatedStudent, setRelatedStudent] = useState([]);
  const [optionsSet, setOptionsSet] = useState([]);

  const noteRef = useRef(null);

  const getAttendEventsFromDb = () => {
    let attendRef = doc(dbService, "attend", props.userUid);
    // console.log(queryWhere);

    onSnapshot(attendRef, (doc) => {
      setAttendEvents([]);
      const new_attends = [];
      doc?.data()?.attend_data?.forEach((data) => {
        // if (data.id.slice(0, 7) === currentMonth.slice(0, 7)) {
        new_attends.push(data);
        // }
      });
      setAttendEvents([...new_attends]);
    });
    // console.log(queryWhere);
  };

  useEffect(() => {
    getAttendEventsFromDb();
  }, []);

  const getToday = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  };

  const getTime = (date) => {
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    return hours + ":" + minutes;
  };

  const checkSave = (text) => {
    Swal.fire({
      icon: "success",
      title: "저장되었어요!",
      text: text,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });
  };

  const checkDayOfWeekAlert = () => {
    Swal.fire({
      icon: "error",
      title: "저장에 실패했어요!",
      html: "토 / 일요일은 저장이 불가능합니다. <br>날짜를 확인, 변경해주세요",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const inputValue = document.getElementById("textArea").value;
    const studentInfo = props.who.split(" ");

    let new_data_id = "";

    if (props.about === "consulting") {
      let selectDate = getToday(props.attendDate);
      let selectDateTime = getTime(props.attendDate);
      //년월일시간+번호 를 식별id로 사용 나중에 지울떄(상담)
      new_data_id = selectDate + selectDateTime + studentInfo[0];

      const new_data = {
        num: studentInfo[0],
        name: studentInfo[1],
        id: new_data_id,
        option: option,
        note: inputValue,
        attachedFileUrl: attachedFile,
        related: relatedStudent,
      };

      props.addData(new_data);
    } else if (props.about === "attendance") {
      let start;
      let end;
      //시작날짜와 끝날짜가 다를 경우
      if (Array.isArray(props.attendDate)) {
        [start, end] = props.attendDate;
        //같은 경우
      } else {
        start = props.attendDate;
        end = props.attendDate;
      }
      //만약 시작날짜와 끝날짜가 같고 주말이면 저장하지 않기
      if (start.getDay() === 0 || start.getDay() === 6) {
        checkDayOfWeekAlert();
        return;
      }

      // 전체 날짜에서 개별적으로 작업하기
      let data = {
        num: studentInfo[0],
        name: studentInfo[1],
        option: option,
        note: inputValue,
      };

      //서류 제출부분 추가
      if (option === "1교외체험" || option === "3가정학습") {
        data["request"] = requestSubmit;
        data["report"] = reportSubmit;
      } else {
        data["paper"] = paperSubmit;
      }

      //주말 제외한 날짜만 모아두기
      let weekDayEvents = [];
      let curDate = start;

      //날짜가 하루일 때를 분리하지 않으면 아마도.. 얕은 복사라 start와 end가 모두 1일씩 같이 늘어나서 while문이 무한실행
      if (start === end) {
        let selectDate = getToday(start);
        new_data_id =
          selectDate + studentInfo[0] + " " + dayjs().format("HH:mm");
        weekDayEvents.push(new_data_id);
      } else {
        while (curDate <= end) {
          //주말(index 6 = 토, index 0 = 일)이면 저장안되도록!
          if (curDate.getDay() === 0 || curDate.getDay() === 6) {
            curDate.setDate(curDate.getDate() + 1);
          } else {
            let selectDate = getToday(curDate);
            new_data_id =
              selectDate + studentInfo[0] + " " + dayjs().format("HH:mm");
            weekDayEvents.push(new_data_id);

            curDate.setDate(curDate.getDate() + 1);
          }
        }
      }

      //저장가능한 날짜 중에 이미 저장된 데이터 있는지 확인하고 저장하기
      let new_attendEvents = JSON.parse(JSON.stringify(attendEvents));
      weekDayEvents.forEach((data_id) => {
        // 같은날 같은 번호로 저장된 출결자료
        let existAttend = attendEvents?.filter(
          (event) => event.id?.split(" ")?.[0] === data_id?.split(" ")?.[0]
        );
        //해당날짜에 해당학생 출결은 최대 3개!
        if (existAttend.length < 3) {
          //새로운 리스트에 추가해두기
          new_attendEvents.push({
            ...data,
            id: data_id,
          });
        } else {
          Swal.fire(
            "저장 실패",
            "출결자료는 학생당 하루에 3개 까지만 저장할 수 있습니다.",
            "error"
          );
          return;
        }
      });
      // 저장할 자료들이 추가된 리스트를 업로드하기
      await setDoc(doc(dbService, "attend", props.userUid), {
        attend_data: new_attendEvents,
      });
    }

    //나중에 기간, 날짜도 추가하기
    checkSave(
      `${studentInfo[1]} 학생의 ${option.slice(
        1
      )} 정보가 저장되었습니다. \n(5초 후 창이 자동으로 사라집니다.)`
    );

    setInputIsShown(false);
    setAttachedFile("");
    props.onClose();
    ///
  };

  //입력 글자수 제한
  const handleOnInput = (e) => {
    let maxlength;
    if (props.about === "consulting") {
      maxlength = 1500;
    } else if (props.about === "attendance") {
      maxlength = 30;
    }

    if (e.target.value.length > maxlength) {
      e.target.value = e.target.value.substr(0, maxlength);
      Swal.fire({
        icon: "error",
        title: "입력 불가",
        text: "입력한 내용을 줄여주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
    }
  };

  // 녹음파일 추가하기
  const uploadAudio = (url) => {
    setAttachedFile(url);
  };

  //관련학생 모달 취소하면
  const closeModalHandler = () => {
    setShowStudent(false);
    setRelatedStudent([]);
  };

  //관련학생 모달에서 학생 클릭하면.. relatedStd에 저장시키는 함수
  const relatedStdHandler = (e) => {
    let clicked_std = e.target.innerText;
    let new_relatedStudent = [...relatedStudent];
    //현재 선택된 입력하고 있는 학생은 추가할 수 없음
    if (clicked_std === props.who) return;

    //기존에 있으면 빼고
    if (new_relatedStudent?.includes(clicked_std)) {
      new_relatedStudent = new_relatedStudent?.filter(
        (std) => std !== clicked_std
      );
      //없으면 추가하기
    } else {
      new_relatedStudent.push(clicked_std);
    }
    setRelatedStudent(new_relatedStudent);
  };

  const getAttendsFromDb = async () => {
    let attendRef = doc(dbService, "attend", props.userUid);
    let events = [];
    // console.log(queryWhere);
    const attendDoc = await getDoc(attendRef);
    if (attendDoc.exists()) {
      events = attendDoc.data()?.attend_data;
    }
    if (!events || events?.length === 0 || props.students?.length === 0) return;

    // 출결에서만 나오는..거..!! 현재학생 정보만 거르고
    let now_studentEvents = events?.filter(
      (evt) => evt.name === props.who.split(" ")[1]
    );
    let new_optionsSet = [];
    now_studentEvents?.forEach((evt) => {
      new_optionsSet.push(evt.option);
    });
    setOptionsSet(new_optionsSet);
  };

  //학생을 선택하면, 그 학생이 지금까지 썼던 출결관련 내용 간략하게 보여줌.
  useEffect(() => {
    if (props.about !== "attendance") return;
    getAttendsFromDb();
    //전체 이벤트 받아오기
  }, [props.students]);

  return (
    <>
      {/* 상담에서만 true false로 만들 수 있는, 관련학생 선택하는 모달창 */}
      {showStudent && (
        <ConsultRelated
          who={props.who}
          confirmBtnHandler={() => setShowStudent(false)}
          studentClickHandler={(e) => relatedStdHandler(e)}
          students={props.students}
          isSubject={props.isSubject}
          relatedStudent={relatedStudent}
          closeModalHandler={closeModalHandler}
        />
      )}

      <AttendanceOption
        selectOption={props.selectOption}
        showNote={(option) => {
          setInputIsShown(true);
          setOption(option);
        }}
      />

      {/* 출결일 경우, 이미 사용했던 출결관련 기록 보여주기 */}
      {props.about === "attendance" && optionsSet?.length > 0 && (
        <>
          <span className={classes["optionsSet"]}>
            <span className={classes["optionsSet"]}>* 저장된 출결정보:</span>
            {[...new Set(optionsSet)]?.map((option) => (
              <span
                key={`optionSet-${option}`}
                className={classes["optionsSet"]}
              >
                🙂
                {option?.slice(1)}{" "}
                {optionsSet?.filter((op) => op === option).length}일
              </span>
            ))}
          </span>
        </>
      )}

      {props.about === "attendance" && optionsSet?.length === 0 && (
        <span className={classes["optionsSet"]}>
          * 저장된 출결 자료가 없어요!
        </span>
      )}

      {/* 상담일 경우, 관련학생 기록하기 */}
      {props.about === "consulting" && (
        <div className={classes.btnArea}>
          <div className={classes.relStdArea}>
            <b>선택된 관련학생</b>
            <div className={classes["relStdShowDiv"]}>
              {relatedStudent?.length > 0 &&
                relatedStudent?.map((std) => (
                  <span key={std} className={classes["margin-5"]}>
                    {std}
                  </span>
                ))}
            </div>
          </div>
          {/* 학생 선택버튼 부분 */}
          <Button
            className="consult-relatedStdBtn"
            name={"관련학생"}
            onclick={function () {
              setShowStudent(!showStudent);
            }}
          />
        </div>
      )}
      {inputIsShown && (
        <>
          <form
            id="area-form"
            className={classes.form}
            onSubmit={submitHandler}
          >
            {/* 학생서류 제출했는지 체크하는 버튼 */}
            {props.about === "attendance" && (
              <>
                {option === "1교외체험" || option === "3가정학습" ? (
                  <>
                    <Button
                      className={
                        requestSubmit ? "paperSub-btn-clicked" : "paperSub-btn"
                      }
                      onclick={(e) => {
                        e.preventDefault();
                        setRequestSubmit((prev) => !prev);
                      }}
                      title="신청서"
                      name={"신청서"}
                    />
                    <Button
                      className={
                        reportSubmit ? "paperSub-btn-clicked" : "paperSub-btn"
                      }
                      onclick={(e) => {
                        e.preventDefault();
                        setReportSubmit((prev) => !prev);
                      }}
                      title="보고서"
                      name={"보고서"}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      className={
                        paperSubmit ? "paperSub-btn-clicked" : "paperSub-btn"
                      }
                      onclick={(e) => {
                        e.preventDefault();
                        setPaperSubmit((prev) => !prev);
                      }}
                      title="서류"
                      name={"서류"}
                    />
                  </>
                )}
              </>
            )}

            <Input
              ref={noteRef}
              id={"textArea"}
              className={"attendForm-input"}
              label="inputData"
              input={{
                type: "textarea",
                placeholder: "비고를 입력하세요.",
                autoFocus: true,
              }}
              defaultValue={""}
              onInput={(e) => handleOnInput(e)}
            />
          </form>

          <div className={classes.btnArea} style={{ justifyContent: "center" }}>
            {props.about === "consulting" ? (
              <>
                {isImgFile ? (
                  <FileArea
                    about={props.about}
                    attachedFileHandler={(file) => {
                      setAttachedFile(file);
                    }}
                  />
                ) : (
                  <AudioRecord
                    userUid={props.userUid}
                    uploadAudio={uploadAudio}
                  />
                )}
              </>
            ) : (
              <FileArea
                about={props.about}
                attachedFileHandler={(file) => {
                  setAttachedFile(file);
                }}
              />
            )}
          </div>

          <div
            className={classes.btnArea}
            style={
              props.about === "attendance" ? { justifyContent: "center" } : {}
            }
          >
            {props.about === "consulting" && (
              <>
                <button
                  className={classes.btn}
                  onClick={() => setIsImgFile((prev) => !prev)}
                  style={{ fontSize: "1em" }}
                >
                  <i className="fa-solid fa-rotate"></i>{" "}
                  {isImgFile ? "오디오 녹음하기" : "사진 올리기"}
                </button>
              </>
            )}

            <button
              className={classes.btn}
              onClick={submitHandler}
              style={
                props.about === "attendance"
                  ? { width: "98%" }
                  : { width: "50%" }
              }
            >
              저장
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AttendanceForm;
