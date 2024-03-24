import React, { useState, useEffect } from "react";
import FileArea from "../../Layout/FileArea";
import classes from "./SimsimAdd.module.css";
import Input from "../../Layout/Input";
import Swal from "sweetalert2";
import Button from "../../Layout/Button";
import { FaArrowsRotate } from "react-icons/fa6";

const SimsimAdd = (props) => {
  const [attachedFile, setAttachedFile] = useState("");
  const [addImage, setAddImage] = useState(false);

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
    //메인내용 확인
    let mainTextImg;
    if (addImage) {
      mainTextImg = attachedFile;
    } else {
      mainTextImg = document.getElementById("insteadText-input").value;
    }

    if (mainTextImg.trim().length === 0) {
      errorSwal("저장 실패", "메인 텍스트/이미지를 등록해주세요!");
      return;
    }

    //추가 설명 내용 확인
    let descText = document.getElementById("descText-input").value;
    if (descText.trim().length === 0) {
      errorSwal("저장 실패", "추가 설명을 등록해주세요!");
      return;
    }

    props.addSimsimHandler(attachedFile);
  };

  return (
    <>
      <p className={classes["p"]}>
        {" "}
        ✅ <b className={classes["b"]}>자주쓰는 기능, 활용 Tip</b> 을 다른
        선생님에게 알려주세요~
        <br /> <br />✅ 교사로서 일상의 변화, 혹은 성장을 위해{" "}
        <b className={classes["b"]}>첵스쿨에 바라는 점</b>이 있다면?
      </p>
      <br />

      <form className={classes["form"]}>
        <div className={classes["image-div"]}>
          <div className={classes["imageTitle-div"]}>
            <p className={classes["title-p"]}>
              {" "}
              {!addImage ? "글로 설명하기" : "이미지로 설명하기"}{" "}
            </p>
            <button
              className={classes["ImgTextChange-btn"]}
              onClick={(e) => {
                e.preventDefault();
                setAddImage((prev) => !prev);
                setAttachedFile("");
              }}
            >
              <FaArrowsRotate />
              <span className={classes["addImage-span"]}>
                {addImage ? "글로.." : "이미지로.."}
              </span>
            </button>
          </div>

          <div>
            {addImage ? (
              <FileArea
                about={props.about}
                attachedFileHandler={(file) => {
                  setAttachedFile(file);
                }}
              />
            ) : (
              <Input
                id={`insteadText-input`}
                myKey={"insteadText-input"}
                className={`simsim-Text`}
                label="insteadText"
                input={{
                  type: "textarea",
                }}
                onInput={(e) => handleOnInput(e, 1000)}
                required
                placeholder="화면 가운데에 보일 주요설명 "
              />
            )}
          </div>
        </div>

        <hr />
        <div className={classes["descText-div"]}>
          <p className={classes["title-p"]}> 추가설명 </p>
          <Input
            input={{ id: "descText-input" }}
            className={"simsim-Text"}
            type="text"
            required
            onInput={(e) => handleOnInput(e, 1000)}
            placeholder={"프로필 아래쪽에 보일 추가설명"}
          />
        </div>
        <div className={classes["saveSimsim-div"]}>
          <Button
            className={"saveSimsim-btn2"}
            onclick={submitHandler}
            icon={<>글쓰기</>}
          />
        </div>
      </form>
    </>
  );
};

export default SimsimAdd;
