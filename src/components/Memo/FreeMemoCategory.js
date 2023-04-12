import React, { useState, useEffect } from "react";
import classes from "./FreeMemo.module.css";

import Button from "components/Layout/Button";

const FreeMemoCategory = ({
  edited,
  exist_category,
  item,
  setCategoryHandler,
}) => {
  const [category, setCategory] = useState(item ? item?.category : ["all"]);

  //카테고리 추가, 삭제 함수
  const categoryHandler = (e) => {
    let clickedCategory = e.target.innerText;
    let new_category = [...category];
    // 만약 기존 category 상태에 없으면 추가, 있으면 삭제
    if (!category.includes(clickedCategory)) {
      new_category.push(clickedCategory);
    } else {
      new_category = new_category.filter((item) => item !== clickedCategory);
    }
    setCategory(new_category);
    setCategoryHandler(new_category);
  };

  return edited ? (
    <>
      {/* 존재하는 카테고리를 다 보여주고, 그중에 클릭 한 것만 색깔을 나타냄.. 안하면 */}
      {exist_category?.map((categ) => {
        let isInclude = category?.includes(categ.name);

        return (
          <span key={"addMemo" + categ.name}>
            {" "}
            <Button
              name={categ.name}
              className={"freeMemo-category-edit"}
              style={{
                backgroundColor: isInclude && categ.bgColor,
                color: isInclude ? categ.fontColor : "gray",
                fontWeight: "bold",
                borderWidth: !isInclude && "2px",
                borderColor: !isInclude && "gray",
              }}
              onclick={(e) => categoryHandler(e)}
            />
          </span>
        );
      })}

      {exist_category.length === 0 &&
        "아직 카테고리가 없어요! 먼저 왼쪽 상단의 + 버튼으로 카테고리를 추가해주세요!"}
    </>
  ) : (
    <>
      {item?.category
        ?.filter((cate) => cate !== "all")
        ?.map((categ) => {
          let now_category = exist_category?.filter(
            (item) => item.name === categ
          )[0];
          return (
            <div key={categ}>
              {" "}
              <Button
                name={categ}
                className={"freeMemo-category-edit"}
                style={{
                  backgroundColor: now_category?.bgColor || "gray",
                  color: now_category?.fontColor || "black",
                }}
              />
            </div>
          );
        })}
      {item?.category?.length === 1 && (
        <span style={{ color: "gray" }}>* 카테고리가 존재하지 않아요!</span>
      )}
    </>
  );
};

export default FreeMemoCategory;
