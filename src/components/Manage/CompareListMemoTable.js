import React, { useEffect, useState } from "react";
import classes from "./CompareListMemoTable.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CompareListMemoTable = (props) => {
  const [listMemoClStudents, setListMemoClStudents] = useState([]);
  const [trNums, setTrNums] = useState([]);
  const [datas, setDatas] = useState({});
  const [canDrawChart, setCanDrawChart] = useState(false);
  // const [dataClNames, setDataClNames] = useState([]);

  const defaultLegendClickHandler = ChartJS.defaults.plugins.legend.onClick;
  var newLegendClickHandler = function (e, legendItem, legend) {
    var index = legendItem.datasetIndex;

    if (index > 0) {
      // 원래 로직을 수행합니다
      defaultLegendClickHandler(e, legendItem, legend);
      //전체선택을 누르면.. 모든 라인이 선택/ 또는 해제됨.
    } else {
      let ci = this.chart;
      let all_ci = props.students?.map((stu, index) => {
        return ci.getDatasetMeta(index + 2);
      });
      all_ci.forEach(function (meta) {
        meta.hidden = ci.getDatasetMeta(0).hidden ? false : true;
      });
      ci.getDatasetMeta(0).hidden = !ci.getDatasetMeta(0).hidden;
      ci.update();
    }
  };

  const options = {
    responsive: true,
    // 범례. 버튼으로 그래프 위에 나오는거.
    plugins: {
      legend: {
        position: "top",
        labels: {
          fontSize: 20,
        },
        onClick: newLegendClickHandler,
      },
    },

    layout: {
      padding: {
        left: 40,
        right: 40,
        top: 20,
        bottom: 20,
      },
      fontSize: 15,
    },
  };

  //전담은.. 선택된 자료의 반에서 가장 학생이 많은 곳을 기준으로 줄tr을 만들기 위한 데이터 생성
  useEffect(() => {
    if (!props.isSubject) return;

    const new_listMemoClStudents = [];
    // const new_dataClNames = [];
    let new_trNums = [];

    let studentsNums = 0;
    //자료의 반 이름을 모아두고
    props.listMemo?.forEach((list) => {
      // new_dataClNames?.push(list.clName);
      new_listMemoClStudents?.push(
        Object.values(
          props.students?.filter(
            (std) => Object.keys(std)?.[0] === list.clName
          )?.[0]
        )?.[0]
      );
    });

    setListMemoClStudents([...new_listMemoClStudents]);
    // setDataClNames([...new_dataClNames]);

    //자료의 반 학생들의 이름을 모아두기
    new_listMemoClStudents.forEach((clStd) => {
      //자료 중 가장 학생수 많은 거 찾기
      if (studentsNums < clStd.length) {
        studentsNums = clStd.length;
      }
    });

    new_trNums = [...Array(+studentsNums)]?.map((v, i) => i);
    setTrNums([...new_trNums]);
  }, [props.isSubject]);

  // 모든 자료가 숫자로 되어 있는지 판단함.
  useEffect(() => {
    //checkLists는 숫자가 아니므로.. 표그리기 패스
    if (props.about !== "listMemo") return;
    if (!props.listMemo) return;

    let isOnlyNum = true;
    props.listMemo?.forEach((list) => {
      list?.data?.forEach((data) => {
        if (isNaN(+data?.memo?.trim())) {
          isOnlyNum = false;
          return false;
        }
      });
    });

    //숫자로만 된 데이터면 가능 띄우고, 데이터만들어서 넘어주기
    if (isOnlyNum && props.listMemo?.length > 1) {
      let new_datasets = [];
      // 객체 하나가 각각의 선이 됨. 전담과 담임버전이 다름. 일단 담임버전만..
      if (!props.isSubject) {
        new_datasets = props.students?.map((stud, index) => {
          // 랜덤컬러 설정..?
          var RGB_1 = Math.floor(Math.random() * (255 + 1));
          var RGB_2 = Math.floor(Math.random() * (255 + 1));
          var RGB_3 = Math.floor(Math.random() * (255 + 1));

          return {
            label: stud.name,
            data: props.listMemo?.map((list) => {
              let memo_num = 0;
              list.data?.forEach((stud_data) => {
                if (stud_data.name === stud.name) {
                  memo_num = +stud_data.memo;
                }
              });

              return memo_num;
            }),
            borderColor: "rgba(" + RGB_1 + "," + RGB_2 + "," + RGB_3 + ")",
            backgroundColor: "white",
          };
        });

        //전담이면
      } else {
      }

      //전체평균 포함하기

      new_datasets.unshift({
        label: "전체평균",
        data: props.listMemo?.map((list) => {
          let memo_sum = 0;
          list.data?.forEach((stud_data) => {
            if (isNaN(+stud_data.memo)) return;
            memo_sum += +stud_data.memo;
          });

          return Math.floor(memo_sum / list.data.length);
        }),
        fill: true,
        borderColor: "blue",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      });

      //전체선택/해제키
      new_datasets.unshift({
        label: "전체선택",
        borderColor: "black",
        backgroundColor: "#000000e0",
      });

      const data = {
        // 라벨.. 가로축 해당. 리스트메모 제목 써주면 됨
        labels: props.listMemo?.map((list) => list.title),
        datasets: new_datasets,
      };

      setDatas(data);

      setCanDrawChart(true);
    }
  }, [props.listMemo]);

  return (
    <div className={classes["flex-center"]}>
      <p style={{ color: "white" }}>
        * 자료가 보기 어려운 경우 화면 확대/축소를 활용해주세요.
        {props.about === "listMemo" && (
          <>
            <br />* 숫자(점수)로만 저장된 개별기록을 두 개 이상 선택하면, 차트가
            자동으로 생성됩니다.
          </>
        )}
      </p>

      {/* 차트로 그려주기.. 만약 데이터가 모두 숫자 또는 '' 로만 되어있으면 */}
      {canDrawChart && (
        <>
          <div style={{ backgroundColor: "white" }}>
            <Line options={options} data={datas} />
          </div>
          <br />
        </>
      )}

      <table className={classes["table"]} id="listTable">
        {/* 가로 첫 줄 타이틀 만들기 */}
        <thead className={classes["bg-title"]}>
          <tr>
            {/* 담임이면 이름은 한 번만..! */}
            {!props.isSubject && (
              <>
                <th>이름</th>
                {props.listMemo?.map((list) => (
                  <th key={"titleth" + list.id} className={`${classes["thd"]}`}>
                    {list.id.slice(0, 10)}
                    <br />
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
                    <th
                      key={"titleth" + list.id}
                      className={`${classes["thd"]}`}
                    >
                      {list.id.slice(0, 10)}
                      <br />
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
                      {/* listMemo인 경우 */}
                      {props.about === "listMemo" ? (
                        <>
                          {list?.data?.filter(
                            (data) => data.name === stud.name
                          )?.[0]?.memo || "-"}
                        </>
                      ) : (
                        <>
                          {/* checkLists인 경우 */}
                          {list?.unSubmitStudents?.filter(
                            (unSub_std) => unSub_std.name === stud.name
                          )?.length === 0
                            ? "O"
                            : "X"}
                        </>
                      )}
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
                          <td
                            key={"clStdName" + index}
                            className={classes["name-td"]}
                          >
                            {listMemoClStudents?.[index]?.[num_index]?.name}
                          </td>
                        </>
                      )}
                      {/* 2번쨰 자료부터는 이전 자료랑 학급이 다를 때만 이름 보여줌 */}
                      {index > 0 &&
                        props.listMemo?.[index - 1].clName !== list.clName && (
                          <td
                            key={"clStdName" + index}
                            className={classes["name-td"]}
                          >
                            {listMemoClStudents?.[index]?.[num_index]?.name}
                          </td>
                        )}{" "}
                      {/* 메모 내용 보여줌 */}
                      <td
                        key={"clStdMemo" + index}
                        className={`${classes["thd"]}`}
                      >
                        {listMemoClStudents?.[index]?.[num_index] && (
                          <>
                            {props.about === "listMemo" ? (
                              <>
                                {/* listMemo인 경우 */}
                                {list?.data?.filter(
                                  (data) =>
                                    data.name ===
                                    listMemoClStudents?.[index]?.[num_index]
                                      ?.name
                                )?.[0]?.memo || "-"}
                              </>
                            ) : (
                              <>
                                {/* checkLists인 경우 */}

                                {list?.unSubmitStudents?.filter(
                                  (unSub_std) =>
                                    unSub_std.name ===
                                    listMemoClStudents?.[index]?.[num_index]
                                      ?.name
                                )?.length === 0
                                  ? "O"
                                  : "X"}
                              </>
                            )}
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
