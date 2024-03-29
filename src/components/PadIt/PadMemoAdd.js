import { useState, useEffect, useRef } from "react";

import Input from "components/Layout/Input";
import classes from "./PadIt.module.css";
import Swal from "sweetalert2";
import FileArea from "components/Layout/FileArea";
import { FaLock, FaLockOpen, FaRegCircleXmark } from "react-icons/fa6";

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

const PadMemoAdd = ({
  onClose,
  delMemoHandler,
  addMemoHandler,
  nowMemo,
  data,
  isTeacher,
  gridTemplate,
  sectionNames,
  isSaving,
  lockHandler,
}) => {
  const [bgColor, setBgColor] = useState("#FFACAC");
  const [isEdited, setIsEdited] = useState(false);
  const [attachedFile, setAttachedFile] = useState("");
  const [lock, setLock] = useState(data?.lock || false);

  const linkSpanRef = useRef();

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
    if (!data) return;
    setIsEdited(true);
    setBgColor(data.bgColor);
  }, [data]);

  // 수정중이고, 내가 작성한 자료가 아닐때만 보여주기
  useEffect(() => {
    if (!isEdited) return;
    document.querySelector(".modal").style.backgroundColor = bgColor;
  }, [isEdited]);

  /** 패드잇 내용 안에 링크주소가 있으면 링크주소로 바꿔주는 함수 */
  const converTextLink = (text, justLink) => {
    let linksIn = text?.match(/https?:\/\/[^\s]+/g);
    let convertedText = text;

    if (justLink && linksIn) {
      convertedText = linksIn.join("\n");
      convertedText = convertedText?.replace(
        /https?:\/\/[^\s]+/g,
        `<a href=${convertedText} target="_blank">${convertedText}</a>`
      );
    } else if (justLink && !linksIn) {
      convertedText = "";
    }

    // linkSpanRef.current.innerHTML = convertedText;
    return convertedText;
  };

  useEffect(() => {
    if (isEdited) {
      // 원본자료의 lock상태 변경하기
      lockHandler({ ...data, lock: lock });
    }
  }, [lock]);

  return (
    <>
      <div>
        <span
          className={classes.closeBtn}
          style={{ display: "flex", justifyContent: "flex-end", right: "0px" }}
          onClick={() => {
            onClose();
          }}
        >
          <FaRegCircleXmark />
        </span>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isSaving) return;

            isEdited
              ? addMemoHandler(e, bgColor, attachedFile, data)
              : addMemoHandler(e, bgColor, attachedFile);
          }}
          className={classes["flex-col-center"]}
        >
          {/* 만약 데이터를 전달받고, 내가 입력한 데이터인 경우 input태그 보여주고, 아니면 그냥 span으로 보여주기 */}

          {/* 인풋태그 - data가 없거나, 교사 혹 내가 쓴 글인 경우 */}
          {(!data ||
            isTeacher ||
            data.userInfo === localStorage.getItem("padUserInfo")) && (
            <>
              {/* 섹션스타일이면 섹션 선택하는거 보여주기*/}
              {!gridTemplate && (
                <div className={classes["margin10-wid95"]}>
                  {/* 섹션 선택하는 셀렉트 */}
                  <select
                    name={"option"}
                    defaultValue={data?.grid || ""}
                    className={classes["select"]}
                  >
                    <option value="">-섹션 선택-</option>
                    {sectionNames?.map((section_name, index) => (
                      <option key={index} value={section_name}>
                        {" "}
                        {section_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* 제목 입력 div */}
              <div className={classes["margin10-wid95"]}>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder={
                    isTeacher
                      ? "제목"
                      : "성과 이름을 포함한 제목 (예 - 김지수 입니다)"
                  }
                  title={"제목을 입력해주세요."}
                  className={classes["memoAdd-input"]}
                  autoFocus
                  defaultValue={data ? data.title : ""}
                />
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
                  defaultValue={data ? data.text : ""}
                />
                {data && (
                  <span
                    ref={linkSpanRef}
                    style={{ wordBreak: "break-all" }}
                    dangerouslySetInnerHTML={{
                      __html: converTextLink(data.text, true),
                    }}
                  ></span>
                )}
                <p>* 링크주소를 붙여넣은 후에는 한 칸을 띄워주세요!</p>
              </div>

              {/* 파일 업로드하는 부분 */}
              <div
                className={classes["margin10-wid95"]}
                style={{ justifyContent: "center" }}
              >
                <FileArea
                  about={"padIt"}
                  attachedFileHandler={(file) => {
                    setAttachedFile(file);
                  }}
                  file={data?.fileUrl || ""}
                />
              </div>

              {/* 배경색, 메모추가 버튼 div(추후 파일업로드 추가)*/}
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

                {/* 수정중이면 보일 삭제버튼 */}
                {isEdited && (
                  <input
                    type="button"
                    name="delete"
                    value={"삭제"}
                    className={classes["li-btn"]}
                    onClick={(e) => {
                      if (isSaving) return;
                      delMemoHandler(data);
                    }}
                  />
                )}

                {/* 비밀글 버튼 */}
                <button
                  // name="lockSwitch"

                  title={lock ? "공개로 바꾸기" : "비밀로 바꾸기"}
                  className={classes["li-btn"]}
                  onClick={(e) => {
                    e.preventDefault();
                    setLock((prev) => !prev);
                  }}
                >
                  {lock ? <FaLock /> : <FaLockOpen />}
                </button>
                {/* 메모추가버튼 */}
                <input
                  type="submit"
                  value={!isEdited ? "추가" : "수정"}
                  className={classes["li-btn"]}
                />
              </div>
            </>
          )}

          {/* span태그 - data가 있고, 내가 쓴 글이 아닌 경우 */}
          {data &&
            !isTeacher &&
            data.userInfo !== localStorage.getItem("padUserInfo") && (
              <>
                <div
                  className={classes["margin10-wid95"]}
                  style={{ fontSize: "1.5rem", padding: "15px" }}
                >
                  {data.title}
                </div>

                {/* 제목과 내용 구분선 */}
                <hr style={{ width: "96%", margin: "13px" }} />

                {/* 내용 입력 div */}
                <div
                  className={classes["margin10-wid95"]}
                  style={{ fontSize: "1.3rem", padding: "15px" }}
                >
                  <span
                    ref={linkSpanRef}
                    style={{ wordBreak: "break-all" }}
                    dangerouslySetInnerHTML={{
                      __html: converTextLink(data.text, false),
                    }}
                  ></span>
                  {/* {data.text} */}
                </div>
                {/* 이미지 있으면.. div */}
                {data?.fileUrl && (
                  <div
                    className={classes["margin10-wid95"]}
                    style={{ justifyContent: "center" }}
                  >
                    <img
                      src={attachedFile}
                      className={classes.previewImg}
                      alt="filePreview"
                    />
                  </div>
                )}
              </>
            )}
        </form>
      </div>
    </>
  );
};

export default PadMemoAdd;
