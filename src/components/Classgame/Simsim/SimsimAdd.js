import React, { useState, useEffect } from "react";
import FileArea from "../../Layout/FileArea";
import classes from "./SimsimAdd.module.css";
import Input from "../../Layout/Input";
import Swal from "sweetalert2";
import Button from "../../Layout/Button";

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
      <p className={classes["title-p"]} style={{ marginTop: "-20px" }}>
        {" "}
        추천 글 작성하기 😄{" "}
      </p>
      <p className={classes["p"]}>
        {" "}
        * 첵스쿨이 가진 장,단점을 공유해주세요! <br /> * 추천/자주쓰는 기능,
        활용방법 등을 공유해주세요!{" "}
      </p>

      <form>
        <div className={classes["image-div"]}>
          <div className={classes["imageTitle-div"]}>
            <p className={classes["title-p"]}> 주요설명 </p>
            <button
              className={classes["ImgTextChange-btn"]}
              onClick={(e) => {
                e.preventDefault();
                setAddImage((prev) => !prev);
                setAttachedFile("");
              }}
            >
              <i className="fa-solid fa-arrows-rotate"></i>
              <span className={classes["addImage-span"]}>
                {addImage ? "글로 쓰기" : "이미지 첨부하기"}
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
                onInput={(e) => handleOnInput(e, 300)}
                required
                placeholder="화면 가운데에 보일 주요설명 (300자 이내) "
              />
            )}
          </div>
        </div>

        <div className={classes["descText-div"]}>
          <p className={classes["title-p"]}> 추가설명 </p>
          <Input
            input={{ id: "descText-input" }}
            className={"simsim-Text"}
            type="text"
            required
            onInput={(e) => handleOnInput(e, 100)}
            placeholder={"프로필 아래쪽에 보일 추가설명 (100자 이내)"}
          />
        </div>
        <div className={classes["saveSimsim-div"]}>
          <Button
            className={"saveSimsim-btn2"}
            onclick={submitHandler}
            icon={<>저장</>}
          />
        </div>
      </form>
    </>
  );
};

export default SimsimAdd;
