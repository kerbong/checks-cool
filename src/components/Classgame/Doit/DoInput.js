import React, { useState } from "react";
import FileArea from "components/Layout/FileArea";
import Input from "components/Layout/Input";
import classes from "./Doit.module.css";
import Swal from "sweetalert2";
import Button from "components/Layout/Button";
import dayjs from "dayjs";

const DoInput = (props) => {
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

    //데이터 만들기
    let title = document.getElementById("title-input").value.trim();
    let text = document.getElementById("text-input").value.trim();

    if (title.length === 0 || text.length === 0) {
      errorSwal("입력 항목 확인", "제목과 내용을 모두 입력했는지 확인해주세요");
      return;
    }

    let data = {
      id: dayjs().format("YYYY-MM-DD HH:mm"),
      title: title,
      text: text,
      file: attachedFile,
    };

    props.addDoitHandler(data);

    //데이터 삭제하기
  };

  return (
    <div className={classes["input-div"]}>
      <h1 style={{ fontSize: "1.8rem" }}>건의 / 불편 글 보내기</h1>
      <br />
      <div className={classes["title"]}>
        <h2>글 제목</h2>
      </div>

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
      <div className={classes["title"]}>
        <h2>건의 / 불편사항 설명</h2>
      </div>
      <div className={classes["m-20-5"]}>
        <Input
          id={`text-input`}
          myKey={"text-input"}
          className={`meetSum-Text`}
          label="insteadText"
          input={{
            type: "textarea",
          }}
          onInput={(e) => handleOnInput(e, 300)}
          required
          placeholder="불편한 부분에 수정, 추가하고 싶은 기능을 설명해주세요 / 문제가 발생된 부분과 과정을 자세히 설명해주세요.  ** 필요한 경우 가입하신 이메일 주소로 연락드립니다. ** "
        />
        <div className={classes["title"]}>
          <FileArea
            about={props.about}
            attachedFileHandler={(file) => {
              setAttachedFile(file);
            }}
          />
          <Button
            id={"saveMeetSum-btn"}
            className={"saveSimsim-btn"}
            style={{
              backgroundColor: "#36c260",
              padding: "17px 12px",
              height: "auto",
            }}
            onclick={submitHandler}
            icon={<>저장</>}
          />
        </div>
      </div>
    </div>
  );
};

export default DoInput;
