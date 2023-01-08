import React, { useRef, useState, useEffect } from "react";
import classes from "./AttendanceForm.module.css";
import Input from "../Layout/Input";
import Swal from "sweetalert2";
import AttendanceOption from "./AttendanceOption";
import FileArea from "components/Layout/FileArea";

import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc } from "firebase/firestore";

const AttendanceForm = (props) => {
  const [attachedFile, setAttachedFile] = useState("");
  const [option, setOption] = useState("");
  const [inputIsShown, setInputIsShown] = useState(false);
  const [attendEvents, setAttendEvents] = useState([]);
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
        student_num: studentInfo[0],
        student_name: studentInfo[1],
        id: new_data_id,
        option: option,
        note: inputValue,
        attachedFileUrl: attachedFile,
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
        student_num: studentInfo[0],
        student_name: studentInfo[1],
        option: option,
        note: inputValue,
      };

      //주말 제외한 날짜만 모아두기
      let weekDayEvents = [];
      let curDate = start;

      //날짜가 하루일 때를 분리하지 않으면 아마도.. 얕은 복사라 start와 end가 모두 1일씩 같이 늘어나서 while문이 무한실행
      if (start === end) {
        let selectDate = getToday(start);
        new_data_id = selectDate + studentInfo[0];
        weekDayEvents.push(new_data_id);
      } else {
        while (curDate <= end) {
          //주말(index 6 = 토, index 0 = 일)이면 저장안되도록!
          if (curDate.getDay() === 0 || curDate.getDay() === 6) {
            curDate.setDate(curDate.getDate() + 1);
          } else {
            let selectDate = getToday(curDate);
            new_data_id = selectDate + studentInfo[0];
            weekDayEvents.push(new_data_id);

            curDate.setDate(curDate.getDate() + 1);
          }
        }
      }

      //저장가능한 날짜 중에 이미 저장된 데이터 있는지 확인하고 저장하기
      let new_attendEvents = JSON.parse(JSON.stringify(attendEvents));
      weekDayEvents.forEach((data_id) => {
        let existAttend = attendEvents.filter((event) => event.id === data_id);
        //같은 날에 저장된 다른 자료가 없으면
        if (existAttend.length === 0) {
          //새로운 리스트에 추가해두기
          new_attendEvents.push({
            ...data,
            id: data_id,
          });
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
      maxlength = 500;
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

  return (
    <>
      <AttendanceOption
        selectOption={props.selectOption}
        showNote={(option) => {
          setInputIsShown(true);
          setOption(option);
        }}
      />
      {inputIsShown && (
        <>
          <form
            id="area-form"
            className={classes.form}
            onSubmit={submitHandler}
          >
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
          <div className={classes.btnArea}>
            <FileArea
              about={props.about}
              attachedFileHandler={(file) => {
                setAttachedFile(file);
              }}
            />
            <button className={classes.btn} onClick={submitHandler}>
              저장
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AttendanceForm;
