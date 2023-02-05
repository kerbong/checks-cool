import React, { useState } from "react";
import classes from "./MeetingSummary.module.css";
import Input from "components/Layout/Input";
import FileArea from "components/Layout/FileArea";
import Swal from "sweetalert2";
import Button from "components/Layout/Button";
import dayjs from "dayjs";

const MeetingSumItem = (props) => {
  const [isNew, setIsNew] = useState(props.item ? false : true);
  const [attachedFile, setAttachedFile] = useState("");

  //에러 스왈
  const errorSwal = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });
  };

  //자료 최대글자수 제한 함수
  const handleOnInput = (e, maxlength) => {
    if (e.target.value.length > maxlength) {
      e.target.value = e.target.value.substr(0, maxlength);
      errorSwal(
        "입력 불가",
        `글자수를 초과했어요! 내용을 ${maxlength}자 이내로 줄여주세요.`
      );
    }
  };

  //저장하면...
  const submitHandler = (e) => {
    e.preventDefault();

    //저장에 딜레이가 조금 있어서.. 중복저장금지로 disabled 속성 추가
    const saveBtn = document.getElementById("saveMeetSum-btn");
    saveBtn.disabled = true;

    //데이터 만들기
    let title = document.getElementById("title-input").value.trim();
    let text = document.getElementById("text-input").value.trim();
    let result = document.getElementById("result-input").value.trim();

    if (title.length === 0 || text.length === 0 || result.length === 0) {
      errorSwal(
        "입력 항목 확인",
        "제목과 내용, 결과를 모두 입력했는지 확인해주세요"
      );
      return;
    }

    let data = {
      id: dayjs().format("YYYY-MM-DD HH:mm"),
      title: title,
      text: text,
      result: result,
      file: attachedFile,
    };

    props.addMeetSumHandler(data);
  };

  //삭제하는 함수
  const deleteHandler = () => {
    Swal.fire({
      icon: "warning",
      title: "회의록 삭제",
      text: "현재 회의록 관련 데이터를 삭제하시겠어요? ",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: true,
      denyButtonText: "취소",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        props.deleteHandler(props.item.id, props.item.title, props.item.file);
      }
    });
  };

  return (
    <>
      {/* 새로운 자료 입력할 때 */}
      {isNew ? (
        <>
          <div className={classes["close-div"]}>
            <span
              className={classes["close-span"]}
              onClick={() => props.showSumClose()}
            >
              <i className="fa-regular fa-circle-xmark"></i>
            </span>
          </div>
          <h2>회의제목</h2>

          <div className={classes["m-20-5"]}>
            <Input
              input={{ id: "title-input" }}
              className={"meetSum-Text"}
              type="text"
              required
              onInput={(e) => handleOnInput(e, 30)}
              placeholder={"30자 내로 작성해주세요."}
            />

            {/* 인풋창보여주기 */}
          </div>
          <h2>회의내용</h2>
          <div className={classes["m-20-5"]}>
            <Input
              id={`text-input`}
              myKey={"text-input"}
              className={`meetSum-Text`}
              label="insteadText"
              input={{
                type: "textarea",
              }}
              onInput={(e) => handleOnInput(e, 1000)}
              required
              placeholder="1000자 내로 작성해주세요."
            />
            <FileArea
              about={props.about}
              attachedFileHandler={(file) => {
                setAttachedFile(file);
              }}
            />
          </div>
          <h2>회의결과</h2>
          <div className={classes["m-20-5"]}>
            <Input
              input={{ id: "result-input" }}
              className={"meetSum-Text"}
              type="text"
              required
              onInput={(e) => handleOnInput(e, 100)}
              placeholder={"100자 내로 작성해주세요."}
            />
            * 회의 날짜는 현재 날짜+시각으로 저장됩니다.
          </div>
          <div className={classes["m-20-5"]}>
            <Button
              id={"saveMeetSum-btn"}
              className={"saveSimsim-btn"}
              onclick={submitHandler}
              icon={<>저장</>}
            />
          </div>
        </>
      ) : (
        //   {/* 기존 자료 보여줄 때 */}
        <div>
          {/* 비워두기 */}
          <div>{props.item.id}</div>
          <div className={classes["close-div"]}>
            <span
              className={classes["close-span"]}
              onClick={() => props.showSumClose()}
            >
              <i className="fa-regular fa-circle-xmark"></i>
            </span>
          </div>

          <div>
            <h1>{props.item.title}</h1>
            {/* 인풋창보여주기 */}
          </div>
          <hr />
          <div className={`${classes["fs-12"]} ${classes["m-10"]}`}>
            {/* 텍스트에어리어 / 파일추가 보여주기 */}
            {props.item.text}
          </div>
          <img alt="" src={props.item.file} className={classes["previewImg"]} />
          <hr />
          <div className={`${classes["fs-14"]} ${classes["m-10"]}`}>
            <p>(회의결과)</p>
            {/* 인풋창보여주기 */}
            {/* 수정 버튼 만들기 */}
            <div>{props.item.result}</div>
          </div>
          <div className={classes["m-20-5"]}>
            <Button
              className={"saveSimsim-btn"}
              onclick={deleteHandler}
              icon={<>삭제</>}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MeetingSumItem;
