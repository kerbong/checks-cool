import React, { useState, useRef, useEffect } from "react";
// import Marked from "marked";
import classes from "./NotionClone.module.css"; // 노션 스타일을 정의한 CSS 파일을 import 합니다.

//글자색목록 7개
const COLORS = ["#ff0000", "#009aff", "#6b20ff"];

const NotionClone = (props) => {
  const contentEditableRef = useRef();
  const [innerContent, setInnerContent] = useState("");
  const [cursorPos, setCursorPos] = useState();
  const [showBlockHighlight, setShowBlockHighlight] = useState(false);
  const [blockRect, setBlockRect] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null); // setTimeout 함수의 ID를 저장할 state 추가
  const [timeoutSaveId, setTimeoutSaveId] = useState(null); // 저장할 때 타임아웃 실행
  const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 판단하는 상태

  useEffect(() => {
    setInnerContent(props.defaultValue);

    contentEditableRef.current.innerHTML = `${props.defaultValue || ""}`;
  }, [props.defaultValue]);

  const checkInput = () => {
    if (timeoutSaveId) clearTimeout(timeoutSaveId);

    const id = setTimeout(() => {
      props.changeHandler();
    }, 9500);
    setTimeoutSaveId(id);
  };

  const handleUnderline = () => {
    document.execCommand("underline", false, null);
    resetTimer(); // 타이머 재설정 로직 추가
  };

  const handleBold = () => {
    document.execCommand("bold", false, null);
    resetTimer(); // 타이머 재설정 로직 추가
  };

  const handleItalic = () => {
    if (props.minSize) return;
    // 기울임 스타일을 적용하는 로직 추가
    const selection = window.getSelection();
    if (!selection.rangeCount) return false;
    let range = selection.getRangeAt(0);

    let node = selection.anchorNode;
    while (node != null && node.nodeName !== "A") {
      node = node.parentNode;
    }

    if (node != null) {
      range.selectNode(node);
      let text = document.createTextNode(node.textContent);
      range.deleteContents();
      range.insertNode(text);
    } else {
      // 선택한 텍스트를 URL로 사용
      let url = selection.toString();

      // URL 유효성 검사
      let urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(url)) {
        return false;
      }

      // a 태그 생성
      let a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.style.cursor = "pointer";

      a.addEventListener("click", function (event) {
        event.preventDefault();
        window.open(url, "_blank");
      });

      // 선택한 텍스트를 a 태그로 감싸기
      a.appendChild(range.extractContents());
      range.insertNode(a);
    }
    resetTimer(); // 타이머 재설정 로직 추가
  };

  const resetTimer = () => {
    // 기존의 타이머를 제거

    if (timeoutId) clearTimeout(timeoutId);
    checkInput();

    // 5초 후에 div를 숨기는 타이머 설정
    const id = setTimeout(() => setShowBlockHighlight(false), 5000);
    setTimeoutId(id);
  };

  const handleThrough = () => {
    // 기울임 스타일을 적용하는 로직 추가
    document.execCommand("strikeThrough", false, null);
    resetTimer(); // 타이머 재설정 로직 추가
  };

  const handleColorChange = (color) => {
    // 색상 변경 로직 추가
    document.execCommand("foreColor", false, color);
    resetTimer(); // 타이머 재설정 로직 추가
  };

  const inputHandler = (e) => {
    setInnerContent(e.target.innerHTML);
  };

  const handleMouseDown = (e) => {
    setIsClicked(true);
    if (props.minSize) return;
    setCursorPos(window.getSelection());
  };

  const handleMouseUp = (e) => {
    if (props.minSize) return;
    if (cursorPos && cursorPos.toString().length > 0) {
      // 사용자가 텍스트를 드래그하여 블록처리한 경우
      const range = cursorPos.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setBlockRect(rect);
      setShowBlockHighlight(true);

      // 기존의 타이머를 제거
      if (timeoutId) clearTimeout(timeoutId);

      // 5초 후에 div를 숨기는 타이머 설정
      const id = setTimeout(() => setShowBlockHighlight(false), 5000);
      setTimeoutId(id);
    } else {
      // 사용자가 단순히 클릭
      setShowBlockHighlight(false);
    }
  };

  const handleBlur = () => {
    setIsClicked(false);
    // 다른 로직...
  };

  /**굵게, 기울임, 색깔변경 버튼이 모아진 html*/
  const renderStyleButtons = () => {
    return (
      <div className="style-buttons" style={{ pointerEvents: "none" }}>
        {/* 굵게 버튼 */}
        <button onClick={handleBold} className={classes["font-style-btn"]}>
          <i className="fa-solid fa-bold"></i>
        </button>

        {/* 밑줄 버튼 */}
        <button onClick={handleUnderline} className={classes["font-style-btn"]}>
          <i className="fa-solid fa-underline"></i>
        </button>
        {/* 취소선 버튼 */}
        <button onClick={handleThrough} className={classes["font-style-btn"]}>
          <i className="fa-solid fa-strikethrough"></i>
        </button>
        {/* a태그 버튼 */}
        <button onClick={handleItalic} className={classes["font-style-btn"]}>
          <i className="fa-solid fa-link"></i>
        </button>

        {/* 색깔 버튼들 */}
        {COLORS.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorChange(color)}
            className={classes["color-area"]}
            style={{ backgroundColor: color, pointerEvents: "auto" }}
          ></button>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* 블록선택 시 나오는 글자스타일 변경div */}
      {showBlockHighlight && blockRect && (
        <div
          className={classes["block-highlight"]}
          style={{
            top: blockRect.top + window.pageYOffset - 35,
            left: blockRect.left + window.pageXOffset,
            height: blockRect.height + 5,
          }}
        >
          {renderStyleButtons()}
        </div>
      )}
      {/* 글자 입력할 수 있는 div */}
      <div
        ref={contentEditableRef}
        contentEditable
        onInput={inputHandler}
        id={props.id}
        key={"textArea" + props.myKey}
        className={`${classes[props.className]} ${
          !props.minSize
            ? ""
            : isClicked
            ? classes["clicked"]
            : classes["non-clicked"]
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onBlur={handleBlur}
      ></div>
    </div>
  );
};

export default NotionClone;
