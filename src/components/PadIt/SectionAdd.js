import React, { useState } from "react";
import classes from "./PadIt.module.css";

const SectionAdd = ({
  onClose,
  addSectionHandler,
  existName,
  delSectionHandler,
}) => {
  const [name, setName] = useState(existName || "");

  //이름 변경 함수
  const changeHandler = (e) => {
    let { value } = e.target;
    setName(value);
  };

  return (
    <div>
      <span
        className={classes.closeBtn}
        style={{ display: "flex", justifyContent: "flex-end" }}
        onClick={() => {
          onClose();
        }}
      >
        <i className="fa-regular fa-circle-xmark"></i>
      </span>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim().length === 0) return;
          addSectionHandler(name);
        }}
        className={classes["flex-col-center"]}
      >
        {/* 만약 데이터를 전달받고, 내가 입력한 데이터인 경우 input태그 보여주고, 아니면 그냥 span으로 보여주기 */}

        {/* 인풋태그 - data가 없거나, 교사 혹 내가 쓴 글인 경우 */}

        <>
          <div
            className={classes["section-title"]}
            style={{ backgroundColor: "inherit" }}
          >
            {!existName ? "섹션 추가하기" : "섹션이름 수정하기"}
          </div>
          {/* 제목과 내용 구분선 */}
          <hr style={{ width: "96%", margin: "13px" }} />
          {/* 제목 입력 div */}
          <div
            className={classes["margin10-wid95"]}
            style={{ justifyContent: "center" }}
          >
            <input
              type="text"
              required
              placeholder={"새로 추가할 섹션의 이름을 입력해주세요."}
              className={classes["memoAdd-input"]}
              style={{ width: "80%", textAlign: "center" }}
              autoFocus
              onChange={changeHandler}
              value={name}
            />
            <p>
              {!existName
                ? "* 추가 버튼을 누르시면, 바로 섹션이 추가됩니다."
                : "* 삭제 버튼을 누르시면, 현재 섹션의 모든 데이터도 삭제됩니다."}
            </p>
          </div>

          {/* 섹션추가 삭제 버튼 div*/}
          <div
            className={classes["margin10-wid95"]}
            style={
              !existName
                ? { justifyContent: "end" }
                : { justifyContent: "space-between" }
            }
          >
            {existName && (
              <input
                type="button"
                name="delete"
                value={"삭제"}
                className={classes["li-btn"]}
                onClick={(e) => {
                  delSectionHandler(existName);
                }}
              />
            )}
            {/* 섹션 추가버튼 */}
            <input
              type="submit"
              value={!existName ? "추가" : "수정"}
              className={classes["li-btn"]}
            />
          </div>
        </>
      </form>
    </div>
  );
};

export default SectionAdd;
