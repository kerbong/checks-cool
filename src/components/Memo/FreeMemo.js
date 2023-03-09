import React, { useState, useEffect } from "react";
import Button from "components/Layout/Button";
import classes from "./FreeMemo.module.css";
import Modal from "components/Layout/Modal";
import CategoryInput from "./CategoryInput";
import FreeMemoInput from "./FreeMemoInput";

const FreeMemo = (props) => {
  const [addCategory, setAddCategory] = useState(false);
  const [addItem, setAddItem] = useState(false);

  return (
    <div>
      {/* 카테고리 추가하는 모달 */}
      {addCategory && (
        <Modal onClose={() => setAddCategory(false)}>
          <CategoryInput caInputClose={() => setAddCategory(false)} />
          {/* 저장하는 핸들러 추가하기,  */}
        </Modal>
      )}

      {/* 카테고리 메뉴바... 추가 버튼 + 전체 + 직접입력한 카테고리 / 가능하도록 오른쪽으로 슬라이드 가능 */}
      <div className={classes["menu-div"]}>
        {/* 추가버튼은 고정되어 움직이지 않음.*/}
        <div>
          {/* 카테고리 추가 버튼 */}
          <Button
            icon={
              !addCategory ? (
                <i className="fa-solid fa-plus"></i>
              ) : (
                <i className="fa-solid fa-xmark"></i>
              )
            }
            id={"add-freeMemoBtn"}
            className={"freeMemo-add"}
            onclick={() => {
              setAddCategory((prev) => !prev);
            }}
          />
        </div>
        <div className={classes["category-div"]}>
          <Button
            name={"예시자료"}
            id={"add-listMemoBtn"}
            className={"freeMemo-category"}
            onclick={() => {}}
          />
          <Button
            name={"유저가설정한배경색"}
            id={"add-listMemoBtn"}
            className={"freeMemo-category"}
            onclick={() => {}}
          />

          <Button
            name={"글자색으로"}
            id={"add-listMemoBtn"}
            className={"freeMemo-category"}
            onclick={() => {}}
          />

          <Button
            name={"으로설정될예정"}
            id={"add-listMemoBtn"}
            className={"freeMemo-category"}
            onclick={() => {}}
          />
        </div>
      </div>

      {/* 메뉴바의 요소를 클릭하면.. 해당 카테고리 메모들만 보임. 추가도 거기에서 가능. */}
      <div>
        {/* 카테고리 + 수정, 삭제 버튼 */}
        <div></div>
        {/* 실제 메모들이 보이고 추가 가능 */}
        <ul>
          <FreeMemoInput />
        </ul>
      </div>

      {/*  */}
    </div>
  );
};

export default FreeMemo;
