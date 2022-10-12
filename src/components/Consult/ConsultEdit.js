import React, {
  useCallback,
  useRef,
  useState,
  useContext,
  useEffect,
} from "react";
import classes from "./ConsultLists.module.css";
import FileForm from "components/Layout/FileForm";
import Button from "components/Layout/Button";
import Input from "../Layout/Input";
import Swal from "sweetalert2";

const ConsultEdit = (props) => {
  const consult = props.consult;
  const [attachedFileUrl, setAttachedFileUrl] = useState("");
  const anyContext = useContext(props.context);

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
      option: optionValue,
      attachedFileUrl: consult_fileUrl,
      note: inputValue,
    };

    //변경사항이 없을 경우 경고창으로 알려주고 저장하지 않기
    if (JSON.stringify(consult) === JSON.stringify(new_data)) {
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

    //context랑 firestore & Storage에 수정하기
    anyContext.addData(new_data);

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

  return (
    <>
      <div className={classes.nameArea}>
        <span className={classes.nameIcon}>
          <i className="fa-regular fa-id-badge"></i>
        </span>
        <span className={classes.nameSpan}>
          {consult.student_name} {" | "}
          {props.selectOption && (
            <select
              name="consult-option"
              id={`option-select`}
              className={classes.selectArea}
              defaultValue={consult.option}
            >
              <option value="">-- 분류 --</option>
              {props.selectOption.map((select_option) => (
                <option value={select_option.value} key={select_option.id}>
                  {select_option.class}
                </option>
              ))}
            </select>
          )}
        </span>
      </div>
      {consult.attachedFileUrl && (
        <div className={classes.fileArea}>
          <img
            src={consult.attachedFileUrl}
            width="100%"
            max-height="20vh"
            alt="filePreview"
          />
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
          attachedFileHandler={(url) => {
            setAttachedFileUrl(url);
          }}
        />
        {attachedFileUrl && (
          <img
            src={attachedFileUrl}
            width="60%"
            max-height="20vh"
            alt="filePreview"
          />
        )}
      </div>
    </>
  );
};

export default ConsultEdit;
