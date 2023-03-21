import React from "react";
import classes from "./CompareListMemoTable.module.css";

const CompareListMemoTable = (props) => {
  return (
    <div className={classes["flex-center"]}>
      <p style={{ color: "white" }}>
        * 자료가 보기 어려운 경우 화면 확대/축소를 활용해주세요
      </p>
      <table className={classes["table"]}>
        {/* 가로 첫 줄 타이틀 만들기 */}
        <thead className={classes["bg-title"]}>
          <tr>
            <th>이름</th>
            {props.listMemo?.map((list) => (
              <th key={"title" + list.id} className={`${classes["thd"]}`}>
                {list.title}
              </th>
            ))}
          </tr>
        </thead>
        {/* 아래로 한 줄식 그리기 */}
        <tbody>
          {props.students?.map((stud, index) => (
            <tr
              key={"data" + stud.name + index}
              className={`${classes["thd"]} ${
                classes[index % 2 === 0 ? "bg-white" : "bg-gray"]
              }`}
            >
              {/* 이름써주기 */}
              <td className={classes["name-td"]}>{stud.name}</td>
              {/* 각 내용에서 학생 있는지 찾아서 자료 넣어주기 */}
              {props.listMemo?.map((list) => (
                <td key={"memo" + list.id} className={`${classes["thd"]}`}>
                  {list?.data?.filter((data) => data.name === stud.name)?.[0]
                    ?.memo || "-"}
                </td>
              ))}
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompareListMemoTable;
