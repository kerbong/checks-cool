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

  useEffect(() => {
    setInnerContent(props.defaultValue);

    contentEditableRef.current.innerHTML = `${props.defaultValue || ""}`;
  }, [props.defaultValue]);

  const handleUnderline = () => {
    document.execCommand("underline", false, null);
  };

  const handleBold = () => {
    document.execCommand("bold", false, null);
  };

  const handleItalic = () => {
    // 기울임 스타일을 적용하는 로직 추가
    document.execCommand("italic", false, null);
  };

  const handleColorChange = (color) => {
    // 색상 변경 로직 추가
    document.execCommand("foreColor", false, color);
  };

  const inputHandler = (e) => {
    setInnerContent(e.target.innerHTML);
  };

  const handleMouseDown = (e) => {
    setCursorPos(window.getSelection());
  };

  const handleMouseUp = (e) => {
    if (cursorPos && cursorPos.toString().length > 0) {
      // 사용자가 텍스트를 드래그하여 블록처리한 경우
      const range = cursorPos.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setBlockRect(rect);
      setShowBlockHighlight(true);
    } else {
      // 사용자가 단순히 클릭

      setShowBlockHighlight(false);
    }
  };

  /**굵게, 기울임, 색깔변경 버튼이 모아진 html*/
  const renderStyleButtons = () => {
    return (
      <div className="style-buttons" style={{ pointerEvents: "none" }}>
        {/* 굵게 버튼 */}
        <button onClick={handleBold} className={classes["font-style-btn"]}>
          <i className="fa-solid fa-bold"></i>
        </button>
        {/* 기울임 버튼 */}
        <button onClick={handleItalic} className={classes["font-style-btn"]}>
          <i className="fa-solid fa-italic"></i>
        </button>
        {/* 밑줄 버튼 */}
        <button onClick={handleUnderline} className={classes["font-style-btn"]}>
          <i className="fa-solid fa-underline"></i>
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
        className={classes[props.className]}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      ></div>
    </div>
  );
};

export default NotionClone;
