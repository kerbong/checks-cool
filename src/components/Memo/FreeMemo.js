import React from "react";
import Button from "components/Layout/Button";
import classes from "./FreeMemo.module.css";
const FreeMemo = (props) => {
  return (
    <div>
      {/* 카테고리 메뉴바... 추가 버튼 + 전체 + 직접입력한 카테고리 / 가능하도록 오른쪽으로 슬라이드 가능 */}
      <div className={classes["menu-div"]}>
        {/* 추가버튼은 고정되어 움직이지 않음.*/}
        <div>
          <Button
            icon={<i className="fa-solid fa-plus"></i>}
            id={"add-freeMemoBtn"}
            className={"freeMemo-add"}
            onclick={() => {}}
          />
        </div>
        <div className={classes["category-div"]}>
          <Button
            name={"학급경영"}
            id={"add-listMemoBtn"}
            className={"freeMemo-category"}
            onclick={() => {}}
          />
          <Button
            name={"업무아이디어없음"}
            id={"add-listMemoBtn"}
            className={"freeMemo-category"}
            onclick={() => {}}
          />

          <Button
            name={"방과후할일"}
            id={"add-listMemoBtn"}
            className={"freeMemo-category"}
            onclick={() => {}}
          />

          <Button
            name={"수업아이디어"}
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
        <ul></ul>
      </div>

      {/*  */}
    </div>
  );
};

export default FreeMemo;
