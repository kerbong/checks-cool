import React, { useState } from "react";
import classes from "./MeetingSummary.module.css";
import Input from "components/Layout/Input";
import FileArea from "components/Layout/FileArea";
import Swal from "sweetalert2";
import Button from "components/Layout/Button";
import dayjs from "dayjs";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storageService } from "../../fbase";
import { FaRegCircleXmark } from "react-icons/fa6";

const MeetingSumItem = (props) => {
  const [isNew, setIsNew] = useState(props.item ? false : true);
  const [attachedFile, setAttachedFile] = useState(
    props.item ? props.item.file : ""
  );

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

  /**  */
  const fileExtension = (img) => {
    console.log(img);
    if (img?.includes("application/haansofthwp")) {
      return ".hwp";
    } else if (img?.includes("application/pdf")) {
      return ".pdf";
    } else if (img?.includes("image/jpeg")) {
      return ".jpg";
    } else if (img?.includes("application/vnd.openxmlformats-officedocument")) {
      return ".xlsx";
    } else if (img?.includes("application/vnd.ms-excel")) {
      return ".xls";
    } else {
      return "";
    }
  };

  const makeData = async () => {
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

    //새로운 자료인데, 기존 이번달 자료에 id와 title이 같은게 있으면 저장 불가!
    if (
      isNew &&
      props.nowSummary?.filter(
        (s) => s.title === title && s.id === dayjs().format("YYYY-MM-DD HH:mm")
      )?.length > 0
    ) {
      Swal.fire(
        "저장 불가!",
        "같은 시각에 같은 제목의 회의록/연수자료가 있어요!! 회의 제목을 변경해주세요!",
        "warning"
      );
      return;
    }

    let data = {
      id: isNew ? dayjs().format("YYYY-MM-DD HH:mm") : props.item.id,
      title: title,
      text: text,
      result: result,
      file: attachedFile,
    };

    let img = data.file;

    //새로운 자료면
    if (isNew) {
      //첨부파일 있으면
      if (img.length > 0) {
        //storage에 저장
        const response = await uploadString(
          ref(
            storageService,
            `${props.userUid}/${data?.title}${fileExtension(img)}`
          ),
          img,
          "data_url"
        );
        //firestore에 저장할 url받아오기
        img = await getDownloadURL(response.ref);
      }
      //기존 자료면
    } else {
      //사진이 바뀌었으면 새롭게 저장
      if (img !== props.item.file) {
        //storage에 저장
        const response = await uploadString(
          ref(storageService, `${props.userUid}/${v4()}`),
          img,
          "data_url"
        );
        //firestore에 저장할 url받아오기
        img = await getDownloadURL(response.ref);
      } else {
      }
    }

    data = {
      ...data,
      file: img,
    };

    return data;
  };

  //저장하면...
  const submitHandler = async (e) => {
    e.preventDefault();

    //공용방 정보가 빈자료는 저장불가...
    if (
      localStorage.getItem("todoPublicRoom") === "--" &&
      props.showPublicEvent
    ) {
      Swal.fire({
        icon: "warning",
        title: "공용회의록 저장 불가",
        text: "먼저 공용 방 설정을 해주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
      });
      return false;
    }

    //저장에 딜레이가 조금 있어서.. 중복저장금지로 disabled 속성 추가
    const saveBtn = document.getElementById("saveMeetSum-btn");
    saveBtn.disabled = true;

    let data = await makeData();

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

  //수정하는 함수
  const editHandler = async () => {
    //저장에 딜레이가 조금 있어서.. 중복저장금지로 disabled 속성 추가
    const saveBtn = document.getElementById("saveMeetSum-btn");
    saveBtn.disabled = true;

    Swal.fire({
      icon: "warning",
      title: "회의록 수정",
      text: "현재 회의록을 수정해서 저장하시겠어요?",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: true,
      denyButtonText: "취소",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // 고쳐야될 로직 ------------
        // 새롭게 아이템으로 만들어서 보내기
        let new_data = await makeData();
        props.editHandler(new_data);
        // props.deleteHandler(props.item.id, props.item.title, props.item.file);
      }
    });
  };

  return (
    <>
      {/* isNew를 기준으로 자료가 있을 떄만 자료 input에 넣어줌.  */}

      {/* 기존 자료 보여줄 때 */}
      <div>
        {/* 비워두기 */}
        <div>{!isNew ? props.item.id : ""}</div>
        <div className={classes["close-div"]}>
          <span
            className={classes["close-span"]}
            onClick={() => props.showSumClose()}
          >
            <FaRegCircleXmark />
          </span>
        </div>
        <div>
          {/* 제목 */}

          <h3 className={classes["t-align-left"]}>
            &nbsp;&nbsp;&nbsp;&nbsp;회의제목
          </h3>

          <Input
            input={{
              id: "title-input",
              style: { width: "50%", minWidth: "230px", marginLeft: "10px" },
            }}
            className={"meetSum-Text"}
            type="text"
            required
            defaultValue={!isNew ? props.item.title : ""}
            onInput={(e) => handleOnInput(e, 30)}
            placeholder={"30자 내로 작성해주세요."}
          />
        </div>

        <div className={`${classes["fs-12"]} ${classes["m-10"]}`}>
          {/* 회의내용 */}
          {<h3>&nbsp;&nbsp;회의내용</h3>}
          <Input
            id={`text-input`}
            myKey={"text-input"}
            className={`meetSum-Text`}
            label="insteadText"
            input={{
              type: "textarea",
            }}
            defaultValue={!isNew ? props.item.text : ""}
            onInput={(e) => handleOnInput(e, 1000)}
            required
            placeholder="1000자 내로 작성해주세요."
          />
        </div>
        <FileArea
          about={"meetSum"}
          file={!isNew ? props.item.file : ""}
          attachedFileHandler={(file) => {
            setAttachedFile(file);
          }}
        />

        <div className={`${classes["fs-14"]} ${classes["m-10"]}`}>
          {<h3>&nbsp;&nbsp;회의결과</h3>}
          <div>
            <Input
              input={{ id: "result-input" }}
              className={"meetSum-Text"}
              type="text"
              required
              defaultValue={!isNew ? props.item.result : ""}
              onInput={(e) => handleOnInput(e, 100)}
              placeholder={"100자 내로 작성해주세요."}
            />
          </div>
        </div>
        <div style={{ margin: "20px" }}>
          ** 저장/수정/삭제 후 눈을 감고 10초 동안 쉬고계세요! 얼른
          저장해드릴게요.😌
        </div>

        {/* 수정 / 삭제 버튼 */}
        <div className={classes["m-20-5-btns"]}>
          {!isNew && (
            <>
              <Button
                className={"saveSimsim-btn"}
                onclick={deleteHandler}
                icon={<>삭제</>}
                style={{ width: "45%", backgroundColor: "#767676" }}
              />
            </>
          )}
          <Button
            id={"saveMeetSum-btn"}
            className={"saveSimsim-btn"}
            onclick={isNew ? submitHandler : editHandler}
            icon={isNew ? <>저장</> : <>수정</>}
            style={{ width: "45%" }}
          />
        </div>
      </div>
    </>
  );
};

export default MeetingSumItem;
