import React, { useRef, useCallback, useContext, useState } from "react";
import classes from "./AttendanceForm.module.css";
import Input from "../Layout/Input";
import Swal from "sweetalert2";
import AttendanceOption from "./AttendanceOption";
import FileArea from "components/Layout/FileArea";

const AttendanceForm = (props) => {
  const [attachedFile, setAttachedFile] = useState("");
  const [option, setOption] = useState("");
  const [inputIsShown, setInputIsShown] = useState(false);
  const anyContext = useContext(props.Context);
  const noteRef = useRef(null);

  const handleResizeHeight = useCallback(() => {
    if (noteRef === null || noteRef.current === null) {
      return;
    }
    noteRef.current.style.height = "10px";
    noteRef.current.style.height = noteRef.current.scrollHeight + "px";
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

    const inputValue = noteRef.current.value;
    const studentInfo = props.who.split(" ");

    const selectDate = getToday(props.attendDate);

    let new_data_id = "";

    if (props.about === "consulting") {
      let selectDateTime = getTime(props.attendDate);
      //년월일시간+번호 를 식별id로 사용 나중에 지울떄(상담)
      new_data_id = selectDate + selectDateTime + studentInfo[0];
    } else if (props.about === "attendance") {
      //주말(index 6 = 토, index 0 = 일)이면 저장안되도록!
      let dayOfWeek = props.attendDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        checkDayOfWeekAlert();
        return;
      }
      //년월일+번호 를 식별id로 사용 나중에 지울떄(출결)
      new_data_id = selectDate + studentInfo[0];
    }

    const new_data = {
      student_num: studentInfo[0],
      student_name: studentInfo[1],
      id: new_data_id,
      option: option,
      note: inputValue,
    };

    if (props.about === "consulting") {
      new_data["attachedFileUrl"] = attachedFile;
    }

    anyContext.addData(new_data);

    //나중에 기간, 날짜도 추가하기
    checkSave(
      `${studentInfo[1]} 학생의 ${option.slice(
        1
      )} 관련 내용이 저장되었습니다. \n(5초 후 창이 자동으로 사라집니다.)`
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
      maxlength = 400;
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
              className={classes.input}
              label="inputData"
              input={{
                id: props.id,
                type: "textarea",
                placeholder: "비고를 입력하세요.",
                defaultValue: "",
                autoFocus: true,
              }}
              onKeyDown={() => handleResizeHeight(this)}
              onKeyUp={() => handleResizeHeight(this)}
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
