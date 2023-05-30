import { useState, useEffect } from "react";

import Input from "components/Layout/Input";
import classes from "./PadIt.module.css";
import Swal from "sweetalert2";

//배경색목록 7개
const BG_COLORS = [
  "#FFACAC",
  "#FFD9AC",
  "#FFFFAC",
  "#BDFFAC",
  "#ACDEFF",
  "#C8ACFF",
  "#FFFFFF",
];

const PadMemoAdd = ({ onClose, addMemoHandler, nowMemo, data, isTeacher }) => {
  const [bgColor, setBgColor] = useState("#FFACAC");
  const [isEdited, setIsEdited] = useState(false);

  //메모 수정할 때 props로 넘어올 nowMemo edited상황인지 세팅
  useEffect(() => {
    if (nowMemo) {
      setIsEdited(true);
      setBgColor(nowMemo.bgColor);
    }
  }, [nowMemo]);

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

  // 수정중이고, 내가 작성한 자료가 아닐때만 보여주기
  useEffect(() => {
    if (!isEdited) return;
    document.querySelector(".modal").style.backgroundColor = bgColor;
  }, [bgColor]);

  console.log(isTeacher);

  return (
    <>
      <div>
        <span
          className={classes.closeBtn}
          onClick={() => {
            onClose();
          }}
        >
          <i className="fa-regular fa-circle-xmark"></i>
        </span>

        <form
          onSubmit={(e) => addMemoHandler(e, bgColor)}
          className={classes["flex-col-center"]}
        >
          {/* 제목 입력 div */}
          <div className={classes["margin10-wid95"]}>
            {/* 만약 데이터를 전달받고, 내가 입력한 데이터인 경우 input태그 보여주고, 아니면 그냥 span으로 보여주기 */}

            {/* 인풋태그 - data가 없거나, 교사 혹 내가 쓴 글인 경우 */}
            {(!data ||
              isTeacher ||
              data.userInfo === localStorage.getItem("padUserInfo")) && (
              <input
                type="text"
                name="title"
                required
                placeholder={"제목"}
                title={"제목을 입력해주세요."}
                className={classes["memoAdd-input"]}
                autoFocus
                defaultValue={data ? data.title : ""}
              />
            )}

            {/* span태그 - data가 있고, 내가 쓴 글이 아닌 경우 */}
            {data &&
              !isTeacher &&
              data.userInfo !== localStorage.getItem("padUserInfo") && (
                <>{data.title}</>
              )}
          </div>

          {/* 제목과 내용 구분선 */}
          <hr style={{ width: "96%", margin: "13px" }} />

          {/* 내용 입력 div */}
          <div className={classes["margin10-wid95"]}>
            <Input
              myKey={"text-input"}
              className={`memoAdd-textarea`}
              label="insteadText"
              input={{
                name: "text",
                type: "textarea",
                required: true,
              }}
              onInput={(e) => handleOnInput(e, 500)}
              required
              placeholder="내용을 입력해주세요."
            />
          </div>

          {/* 배경색, 메모추가 버튼 div(추후 파일업로드 추가)*/}
          {/* 새거, 수정가능(기존+(내가 작성자 || 내가 교사))일 때만 보이도록,  */}
          <div
            className={classes["margin10-wid95"]}
            style={{ justifyContent: "space-between" }}
          >
            {/* 배경색 선택 */}
            {/* 배경색을 리스트로 만들고 고를 수 있도록 버튼 그려주기 */}

            <div
              className={`${classes["flex-center-all"]} ${classes["bgcolor-div"]} `}
            >
              <span className={classes["color-span"]}>배경</span>

              {BG_COLORS.map((color, index) => (
                <span
                  key={index}
                  onClick={() => setBgColor(color)}
                  className={
                    bgColor !== color
                      ? classes["color-area"]
                      : classes["color-area-clicked"]
                  }
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
            {/* 파일추가 기능 추가할 부분, 버튼 추가하기 */}

            {/* 메모추가버튼 */}
            <input
              type="submit"
              value={!isEdited ? "추가하기" : "수정하기"}
              className={classes["li-btn"]}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default PadMemoAdd;
