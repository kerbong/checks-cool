import React from "react";
import classes from "./CompareListMemoTable.module.css";

const CompareListMemoTable = (props) => {
  //전담은.. 선택된 자료의 반에서 가장 학생이 많은 곳을 기준으로 줄tr을 만들기 위한 데이터 생성
  const listMemoClStudents = [];
  const dataClNames = [];
  let trNums = [];

  if (props.isSubject) {
    let studentsNums = 0;
    //자료의 반 이름을 모아두고
    props.listMemo?.forEach((list) => {
      dataClNames.push(list.clName);
      listMemoClStudents.push(
        Object.values(
          props.students?.filter(
            (std) => Object.keys(std)?.[0] === list.clName
          )?.[0]
        )?.[0]
      );
    });

    //자료의 반 학생들의 이름을 모아두기
    listMemoClStudents.forEach((clStd) => {
      //자료 중 가장 학생수 많은 거 찾기
      if (studentsNums < clStd.length) {
        studentsNums = clStd.length;
      }
    });

    trNums = [...Array(+studentsNums)]?.map((v, i) => i);
  }

  return (
    <div className={classes["flex-center"]}>
      <p style={{ color: "white" }}>
        * 자료가 보기 어려운 경우 화면 확대/축소를 활용해주세요
      </p>
      <table className={classes["table"]} id="listTable">
        {/* 가로 첫 줄 타이틀 만들기 */}
        <thead className={classes["bg-title"]}>
          <tr>
            {/* 담임이면 이름은 한 번만..! */}
            {!props.isSubject && (
              <>
                <th>이름</th>
                {props.listMemo?.map((list) => (
                  <th key={"title" + list.id} className={`${classes["thd"]}`}>
                    {list.title}
                  </th>
                ))}
              </>
            )}

            {/* 전담이면 이름은.. 반마다..!! 자료를  */}
            {props.isSubject && (
              <>
                {props.listMemo?.map((list, index) => (
                  <>
                    {index === 0 && <th>이름</th>}
                    {index > 0 &&
                      props.listMemo?.[index - 1].clName !== list.clName && (
                        <th>이름</th>
                      )}{" "}
                    <th key={"title" + list.id} className={`${classes["thd"]}`}>
                      {`${list.clName}) ${list.title}`}
                    </th>
                  </>
                ))}
              </>
            )}
          </tr>
        </thead>

        {/* 아래로 한 줄식 그리기 */}
        <tbody>
          {/* 담임이면 */}
          {!props.isSubject && (
            <>
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
                      {list?.data?.filter(
                        (data) => data.name === stud.name
                      )?.[0]?.memo || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}

          {/* 전담이면 */}
          {props.isSubject && (
            <>
              {/* 가장 학생수 많은 수를 기준으로 한줄씩 표현 */}
              {trNums?.map((num_index) => (
                <tr
                  key={"data" + num_index}
                  className={`${classes["thd"]} ${
                    classes[num_index % 2 === 0 ? "bg-white" : "bg-gray"]
                  }`}
                >
                  {props.listMemo?.map((list, index) => (
                    <>
                      {index === 0 && (
                        <>
                          {/* 이름써주기 */}
                          <td className={classes["name-td"]}>
                            {listMemoClStudents?.[index]?.[num_index]?.name}
                          </td>
                        </>
                      )}
                      {/* 2번쨰 자료부터는 이전 자료랑 학급이 다를 때만 이름 보여줌 */}
                      {index > 0 &&
                        props.listMemo?.[index - 1].clName !== list.clName && (
                          <td className={classes["name-td"]}>
                            {listMemoClStudents?.[index]?.[num_index]?.name}
                          </td>
                        )}{" "}
                      {/* 메모 내용 보여줌 */}
                      <td className={`${classes["thd"]}`}>
                        {listMemoClStudents?.[index]?.[num_index] && (
                          <>
                            {list?.data?.filter(
                              (data) =>
                                data.name ===
                                listMemoClStudents?.[index]?.[num_index]?.name
                            )?.[0]?.memo || "-"}
                          </>
                        )}
                      </td>
                    </>
                  ))}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompareListMemoTable;
