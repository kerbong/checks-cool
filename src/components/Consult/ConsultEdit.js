import React, { useEffect, useState } from "react";
import classes from "./ConsultLists.module.css";
import FileForm from "components/Layout/FileForm";
import Button from "components/Layout/Button";
import Input from "../Layout/Input";
import Swal from "sweetalert2";
import AttendCalendar from "components/Attendance/AttendCalendar";
import dayjs from "dayjs";
import ConsultRelated from "./ConsultRelated";

const ConsultEdit = (props) => {
  const consult = props.consult;
  const [attachedFileUrl, setAttachedFileUrl] = useState("");
  const [consultId, setConsultId] = useState(props.consult.id);
  const [showStudent, setShowStudent] = useState(false);
  const [relatedStudent, setRelatedStudent] = useState(props.consult?.related);

  const cancelEdit = () => {
    props.cancelEditor();
  };

  const saveConsult = (consult) => {
    const inputValue = document.querySelector("#consult_note").value;
    const optionValue = document.querySelector(`#option-select`).value;

    let consult_fileUrl;
    //새로 추가된 파일이 없으면 기존 파일
    if (attachedFileUrl === "") {
      consult_fileUrl = consult.attachedFileUrl;
      //새로 추가된 파일이 있으면 새로운 파일주소 추가
    } else {
      consult_fileUrl = attachedFileUrl;
    }

    //새로운 데이터로 만들기
    const new_data = {
      ...consult,
      id: consultId,
      option: optionValue,
      attachedFileUrl: consult_fileUrl,
      note: inputValue,
      related: relatedStudent,
    };

    //변경사항이 없을 경우(내용도 같고, 날짜도 같은 경우) 경고창으로 알려주고 저장하지 않기
    if (
      JSON.stringify(consult) === JSON.stringify(new_data) &&
      new_data.id === consult.id
    ) {
      Swal.fire({
        icon: "error",
        title: "저장에 실패했어요.",
        text: "변경된 내용이 없어요!",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return;
    }

    //어찌되었건.. 기존 id를 첨부해서 보냄
    new_data.beforeId = consult.id;

    //context랑 firestore & Storage에 수정하기
    props.addData(new_data);

    Swal.fire({
      icon: "success",
      title: "자료가 저장되었어요.",
      text: "5초 후에 창이 사라집니다.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });

    //에딧 설정 상태변수 "" 로 초기화 (consultLists에서)
    cancelEdit();
  };

  const imageOnError = (event) => {
    event.currentTarget.style.display = "none";
  };

  useEffect(() => {
    let addImgTag = document.getElementById("newFile");
    if (addImgTag) {
      addImgTag.style.maxHeight = "250px";
    }
  }, [attachedFileUrl]);

  const calDateHandler = (date) => {
    //상담 id 구성... yyyy-mm-dd시간:분번호
    let editDate = dayjs(date).format("YYYY-MM-DD");
    let new_id = editDate + consultId.slice(10, 15) + consult.num;
    console.log(new_id);
    setConsultId(new_id);
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

  //관련학생 모달 취소하면 기존 관련학생으로.
  const closeModalHandler = () => {
    setShowStudent(false);
    setRelatedStudent(consult.related);
  };

  return (
    <>
      {/* 관련학생부분 코드 모달 */}
      {showStudent && (
        <ConsultRelated
          who={consult.num + " " + consult.name}
          cancleBtnHandler={() => {
            setShowStudent(false);
            setRelatedStudent(consult.related);
          }}
          confirmBtnHandler={() => setShowStudent(false)}
          studentClickHandler={(e) => relatedStdHandler(e)}
          students={props.students}
          isSubject={props.isSubject}
          relatedStudent={relatedStudent}
          closeModalHandler={closeModalHandler}
        />
      )}
      <div className={classes.nameArea}>
        <span className={classes.nameIcon}>
          <i className="fa-regular fa-id-badge"></i>
        </span>
        <span className={classes["hide-cal"]}>
          <AttendCalendar
            getDateValue={calDateHandler}
            about="main"
            setStart={new Date(consultId.slice(0, 10))}
            getMonthValue={() => {}}
            getYearValue={() => {}}
          />
        </span>
        <span className={classes.nameSpan}>
          {consult.name} {" | "}
          {props.selectOption && (
            <select
              name="consult-option"
              id={`option-select`}
              className={classes.selectArea}
              defaultValue={consult.option}
            >
              <option value="">-- 분류 --</option>
              {props.selectOption?.map((select_option) => (
                <option value={select_option.value} key={select_option.id}>
                  {select_option.class}
                </option>
              ))}
            </select>
          )}
        </span>
      </div>

      {/* 관련학생 버튼 및 선택된 학생 보여주기 */}
      <div className={classes.noteArea}>
        {/* 학생 선택버튼 부분 */}
        <Button
          className="consult-relatedStdBtn"
          name={"관련학생"}
          onclick={function () {
            setShowStudent(!showStudent);
          }}
        />
        {/* 관련학생 있으면 보여주기 */}
        {relatedStudent?.length > 0 && (
          <div className={classes.noteArea} style={{ flexWrap: "wrap" }}>
            {relatedStudent?.map((std) => (
              <span key={std} className={classes["nameSpan"]}>
                {std}
              </span>
            ))}
          </div>
        )}

        {/* 관련학생 없음 */}
        {relatedStudent?.length === 0 && (
          <div
            className={classes.noteArea}
            style={{ flexWrap: "wrap", width: "50%", justifyContent: "center" }}
          >
            <span className={classes["nameSpan"]}>* 관련 학생 없음</span>
          </div>
        )}
      </div>
      {/* 이미지나 오디오 있으면..! */}
      {consult.attachedFileUrl && (
        <div className={classes.fileArea}>
          <>
            <img
              src={consult.attachedFileUrl}
              width="60%"
              max-height="250px"
              alt="filePreview"
              onError={imageOnError}
            />
            <audio
              controls
              src={consult.attachedFileUrl}
              onError={imageOnError}
            ></audio>
          </>
        </div>
      )}
      {/* 상담 비고 등록한 부분 있으면 보여주기 */}
      {/* <div className={classes.noteArea}>
        {!consult.note && "기록이 없습니다."}
      </div> */}
      <Input
        myKey={consult.id}
        className={classes.input}
        id={"consult_note"}
        label="inputData"
        defaultValue={consult.note && consult.note}
        input={{
          type: "textarea",
          style: { height: props.initTextareaHeight + "px" },
          autoFocus: true,
        }}
      />

      <div className={classes.editDeleteArea}>
        <Button
          id={"save" + consult.id}
          className="consultEditBtn"
          onclick={() => {
            saveConsult(consult);
          }}
          icon={<i className="fa-solid fa-floppy-disk"></i>}
        />
        <Button
          id={"cancel" + consult.id}
          className="consultEditBtn"
          onclick={cancelEdit}
          icon={<i className="fa-solid fa-rectangle-xmark"></i>}
        />
      </div>
      <div className={classes.editFileArea}>
        <FileForm
          src={consult.attachedFileUrl || ""}
          attachedFileHandler={(url) => {
            setAttachedFileUrl(url);
          }}
        />
        {attachedFileUrl && (
          <div className={classes["editImg-prev"]}>
            <img
              src={attachedFileUrl}
              style={{ maxHeight: "250px", maxwidth: "300px" }}
              alt="filePreview"
              id="newFile"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ConsultEdit;
