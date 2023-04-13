import React, { useState } from "react";
import classes from "./BudgetExcelLists.module.css";

const BudgetExcelLists = ({ budget }) => {
  const [showAllTdContent, setShowAllTdContent] = useState(false);

  const numberComma = (num) => {
    if (!num) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <table className={classes["table"]}>
      {/* 표 헤드부분 */}
      <thead>
        {/* 날짜, 품목명, 사이트, 메모, 개당가격, 수량, 총가격 타이틀*/}
        <tr className={classes["th"]}>
          <th className={classes["td-date"]}>날짜</th>
          <th className={classes["td-title"]}>품목명</th>
          <th className={classes["td-site"]}>사이트</th>
          <th className={classes["td-memo"]}>메모</th>
          <th className={classes["td-each"]}>개당가격</th>
          <th className={classes["td-count"]}>수량</th>
          <th className={classes["td-amount"]}>총가격</th>
        </tr>
      </thead>
      <tbody>
        {/* 예산 사용목록 */}
        {budget?.useLists?.map((list) => (
          <tr
            key={list.title + list.date}
            onClick={() => setShowAllTdContent((prev) => !prev)}
            className={classes["tr"]}
          >
            <td
              className={`${classes["td-date"]} ${
                showAllTdContent ? classes["clicked"] : ""
              }`}
              title={list.date.slice(0, 10)}
            >
              {list.date.slice(0, 10)}
            </td>
            <td
              className={`${classes["td-title"]} ${
                showAllTdContent ? classes["clicked"] : ""
              }`}
              title={list.title}
            >
              {list.title}
            </td>
            <td
              className={`${classes["td-site"]} ${
                showAllTdContent ? classes["clicked"] : ""
              }`}
              title={list.site}
            >
              {list.site}
            </td>
            <td
              className={`${classes["td-note"]} ${
                showAllTdContent ? classes["clicked"] : ""
              }`}
              title={list.note}
            >
              {list.note}
            </td>
            <td
              className={`${classes["td-each"]} ${
                showAllTdContent ? classes["clicked"] : ""
              }`}
              title={list.each}
            >
              {numberComma(+list.each)}
            </td>
            <td
              className={`${classes["td-count"]} ${
                showAllTdContent ? classes["clicked"] : ""
              }`}
              title={list.count}
            >
              {numberComma(+list.count)}
            </td>
            <td
              className={`${classes["td-amount"]} ${
                showAllTdContent ? classes["clicked"] : ""
              }`}
              title={list.amount}
            >
              {numberComma(+list.amount)}
            </td>
          </tr>
        ))}
        <tr className={classes["th"]}>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <th>총계</th>
          <th
            className={`${classes["td-amount"]} ${
              showAllTdContent ? classes["clicked"] : ""
            }`}
          >
            {" "}
            {numberComma(
              budget?.useLists
                ?.map((list) => +list.amount)
                ?.reduce((a, b) => a + b, 0)
            )}
          </th>
        </tr>
      </tbody>
    </table>
  );
};

export default BudgetExcelLists;
