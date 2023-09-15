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
  const [canDrawLine, setCanDrawLine] = useState(false);
  const [canDrawBar, setCanDrawBar] = useState(false);
  const [dataClNames, setDataClNames] = useState([]);
  const [explainOn, setExplainOn] = useState(false);

  const explainP = () => {
    return (
      <>
        <p style={{ color: "white" }}>
          * 자료가 보기 어려운 경우 화면 확대/축소를 활용해주세요.
        </p>
        <p style={{ color: "white" }}>
          * 제출/미제출 👉 같은 반의 제출기록을 2개 이상 선택하면 차트가
          자동으로 생성됩니다.
        </p>
        <p style={{ color: "white" }}>
          * 개별기록 👉 숫자(점수)로만 저장된 개별기록을 두 개 이상 선택하면,
          차트가 자동으로 생성됩니다.
        </p>
      </>
    );
  };

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

  // 개별기록 그려주기 (꺾은선그래프)
  const options = {
    responsive: true,
    // 범례. 버튼으로 그래프 위에 나오는거.
    plugins: {
      legend: {
        position: "top",
        labels: {
          fontSize: 30,
          usePointStyle: true,
          // 범례 도형 모양과 관련된 속성으로, false일 경우엔 기본 직사각형 도형으로 표시됩니다.
          padding: 20,
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
      fontSize: 25,
    },
    scales: {
      y: {
        axis: "y",
        afterDataLimits: (scale) => {
          // y축의 최대값은 데이터의 최대값에 딱 맞춰져서 그려지므로
          // y축 위쪽 여유공간이 없어 좀 답답한 느낌이 들 수 있는데요,
          // 이와 같이 afterDataLimits 콜백을 사용하여 y축의 최대값을 좀 더 여유있게 지정할 수 있습니다!
          scale.max = scale.max * 1.1;
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1, //y축 간격
        },
      },
    },
  };

  // 제출 미제출 그려주기 (막대그래프)

  const bar_options = {
    responsive: true,
    layout: {
      padding: {
        left: 40,
        right: 40,
        top: 20,
        bottom: 20,
      },
      fontSize: 15,
    },
    // x,y축 설정
    scales: {
      y: {
        axis: "y",
        afterDataLimits: (scale) => {
          // y축의 최대값은 데이터의 최대값에 딱 맞춰져서 그려지므로
          // y축 위쪽 여유공간이 없어 좀 답답한 느낌이 들 수 있는데요,
          // 이와 같이 afterDataLimits 콜백을 사용하여 y축의 최대값을 좀 더 여유있게 지정할 수 있습니다!
          scale.max = scale.max * 1.1;
        },
        title: {
          // 이 축의 단위 또는 이름도 title 속성을 이용하여 표시할 수 있습니다.
          display: true,
          align: "end",
          color: "#808080",
          text: "(개)",
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1, //y축 간격
        },
      },
    },
  };

  //전담은.. 선택된 자료의 반에서 가장 학생이 많은 곳을 기준으로 줄tr을 만들기 위한 데이터 생성
  useEffect(() => {
    if (!props.isSubject) return;

    const new_listMemoClStudents = [];
    const new_dataClNames = [];
    let new_trNums = [];

    console.log(props.students);

    let studentsNums = 0;
    //자료의 반 이름을 모아두고
    props.listMemo?.forEach((list) => {
      new_dataClNames?.push(list?.clName);
      let list_clStds = props.students?.filter(
        (std) => Object.keys(std)?.[0] === list?.clName
      )?.[0];
      if (list_clStds?.length === 0) return;
      new_listMemoClStudents?.push(Object.values(list_clStds)?.[0]);
    });

    setListMemoClStudents([...new_listMemoClStudents]);
    setDataClNames([...new Set(new_dataClNames)]);

    //자료의 반 학생들의 이름을 모아두기
    new_listMemoClStudents?.forEach((clStd) => {
      //자료 중 가장 학생수 많은 거 찾기
      if (studentsNums < clStd.length) {
        studentsNums = clStd.length;
      }
    });

    new_trNums = [...Array(+studentsNums)]?.map((v, i) => i);
    setTrNums([...new_trNums]);
  }, [props.isSubject]);

  // 모든 자료가 숫자로 되어 있는지 판단해서 listMemo 숫자 표로그려주는 데이터 만들기
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
      console.log(list);
      console.log(isOnlyNum);
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

          let new_stdData = props.listMemo?.map((list) => {
            let memo_num = 0;
            list.data?.forEach((stud_data) => {
              if (stud_data.name === stud.name) {
                memo_num = +stud_data.memo;
              }
            });

            return memo_num;
          });

          // 총계
          let stdScoreSum = props.listMemo
            ?.map((list) => {
              let returnValue = 0;
              let isExist = list?.data?.filter((std) => std.name === stud.name);
              if (isExist?.length > 0) {
                returnValue = isExist?.[0]?.memo;
              }
              return returnValue;
            })
            .reduce((ac, cur) => +ac + +cur);

          new_stdData.push(stdScoreSum);

          new_stdData.push((stdScoreSum / props.listMemo?.length).toFixed(1));

          return {
            label: stud.name,
            data: new_stdData,
            borderColor: "rgba(" + RGB_1 + "," + RGB_2 + "," + RGB_3 + ")",
            backgroundColor: "white",
          };
        });

        //전담이면
      } else {
        // 1반 자료만 다루기.. 나머지는 고민해보자 ㅠㅠ
        //그렇게 되면.. 가로축에는 번호, 세로축은 점수,
        // 각 선그래프는 반이 되어야 할 것 같다.

        if (dataClNames?.length !== 1) return;

        new_datasets = listMemoClStudents?.[0]?.map((stud, index) => {
          // 랜덤컬러 설정..?
          var RGB_1 = Math.floor(Math.random() * (255 + 1));
          var RGB_2 = Math.floor(Math.random() * (255 + 1));
          var RGB_3 = Math.floor(Math.random() * (255 + 1));

          let new_stdData = props.listMemo?.map((list) => {
            let memo_num = 0;
            list.data?.forEach((stud_data) => {
              if (stud_data.name === stud.name) {
                memo_num = +stud_data.memo;
              }
            });

            return memo_num;
          });

          // 총계/
          let stdScoreSum = props.listMemo
            ?.map((list) => {
              return (
                list?.data?.filter((std) => std.name === stud.name)?.[0]
                  ?.memo || 0
              );
            })
            ?.reduce((ac, cur) => +ac + +cur);

          new_stdData.push(stdScoreSum);

          new_stdData.push((stdScoreSum / props.listMemo?.length).toFixed(1));

          return {
            label: stud.name,
            data: new_stdData,
            borderColor: "rgba(" + RGB_1 + "," + RGB_2 + "," + RGB_3 + ")",
            backgroundColor: "white",
          };
        });
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

      let data_labels = props.listMemo?.map(
        (list) => list.id.slice(5, 10) + " " + list.title
      );
      data_labels.push("총계", "개별평균");

      const data = {
        // 라벨.. 가로축 해당. 리스트메모 제목 + 총계, 평균 써주면 됨
        labels: data_labels,
        datasets: new_datasets,
      };

      setDatas(data);

      setCanDrawLine(true);
    }
  }, [props.listMemo, dataClNames]);

  // 체크리스트 o,x 데이터 총계로 그래프 만들기! 가로축이 학생이름 세로축이 제출 개수
  useEffect(() => {
    //listMemo는 패스
    if (props.about === "listMemo") return;
    if (!props.listMemo) return;

    //숫자로만 된 데이터면 가능 띄우고, 데이터만들어서 넘어주기
    if (props.listMemo?.length > 1) {
      let new_dataset;
      // 담임이면
      if (!props.isSubject) {
        new_dataset = {
          type: "bar",
          label: "제출/미제출 합계",
          data: props.students?.map((stud) => {
            return props.listMemo?.filter((list) => {
              return list?.unSubmitStudents?.filter(
                (unSub_std) => unSub_std.name === stud.name
              )?.length === 0
                ? true
                : false;
            })?.length;
          }),
          barThickness: 25,
          borderColor: "red",
          backgroundColor: "rgb(255, 99, 132)",
          borderWidth: 2,
        };

        const data = {
          // 라벨.. 가로축 해당. 학생이름 써주면 됨
          labels: props.students?.map((stud) => stud.name),
          datasets: [new_dataset],
        };

        setDatas(data);
        setCanDrawBar(true);
        // 전담이면
      } else {
        if (dataClNames.length !== 1) return;
        new_dataset = {
          type: "bar",
          label: "제출/미제출 합계",
          data: listMemoClStudents[0]?.map((stud) => {
            return props.listMemo?.filter((list) =>
              list?.unSubmitStudents?.filter(
                (unSub_std) => unSub_std.name === stud.name
              )?.length === 0
                ? true
                : false
            )?.length;
          }),
          barThickness: 25,
          borderColor: "red",
          backgroundColor: "rgb(255, 99, 132)",
          borderWidth: 2,
        };
        const data = {
          // 라벨.. 가로축 해당. 학생이름 써주면 됨
          labels: listMemoClStudents[0]?.map((stud) => stud.name),
          datasets: [new_dataset],
        };

        setDatas(data);
        setCanDrawBar(true);
      }
    }
  }, [props.listMemo, dataClNames]);

  return (
    <div className={classes["flex-center"]}>
      <div>
        <h2 onClick={() => setExplainOn((prev) => !prev)}>
          {" "}
          😮 사용 방법 및 주의사항{" "}
          <span>
            {explainOn ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}{" "}
          </span>
        </h2>
        {explainOn && explainP()}
      </div>

      {/* 차트로 그려주기.. 만약 데이터가 모두 숫자 또는 '' 로만 되어있으면 */}
      {canDrawLine && (
        <>
          <div style={{ backgroundColor: "white" }}>
            <Line options={options} data={datas} />
          </div>
          <br />
        </>
      )}

      {/* 바형 으로 체크리스트 총합 그려주기..  */}
      {canDrawBar && (
        <>
          <div style={{ backgroundColor: "white" }}>
            <Line options={bar_options} data={datas} />
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
                {/* 체크리스트인 경우 제출한 총 개수 넣어주기 */}
                {props.about !== "listMemo" && (
                  <>
                    <th className={`${classes["thd"]}`}>제출 개수</th>
                  </>
                )}
                {/* 개별기록의 경우 총계, 평균 넣어주기 */}
                {props.about === "listMemo" && canDrawLine && (
                  <>
                    <th className={`${classes["thd"]}`}>총계</th>
                    <th className={`${classes["thd"]}`}>개별평균</th>
                  </>
                )}
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
                {/* 체크리스트인 경우 제출한 총 개수 넣어주기 */}
                {props.about !== "listMemo" && dataClNames.length === 1 && (
                  <>
                    <th className={`${classes["thd"]}`}>제출 개수</th>
                  </>
                )}
                {/* 개별기록의 경우 총계, 평균 넣어주기 */}
                {props.about === "listMemo" &&
                  dataClNames.length === 1 &&
                  canDrawLine && (
                    <>
                      <th className={`${classes["thd"]}`}>총계</th>
                      <th className={`${classes["thd"]}`}>개별평균</th>
                    </>
                  )}
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
                  <td key={"std" + stud.name} className={classes["name-td"]}>
                    {stud.name}
                  </td>
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
                  {/* 체크리스트인 경우 총계 */}
                  {props.about !== "listMemo" && (
                    <td key={"eachSumCheck"} className={`${classes["thd"]}`}>
                      {props.listMemo
                        ?.map((list) => {
                          return list?.unSubmitStudents?.filter(
                            (unSub_std) => unSub_std.name === stud.name
                          ).length === 0
                            ? 1
                            : 0;
                        })
                        .reduce((ac, cur) => +ac + +cur)}
                    </td>
                  )}
                  {/* 개별기록의 경우 총계 평균 넣어주기 */}
                  {props.about === "listMemo" && canDrawLine && (
                    <>
                      {/* 총계 */}
                      <td key={"eachSumList"} className={`${classes["thd"]}`}>
                        {props.listMemo
                          ?.map((list) => {
                            return (
                              list?.data?.filter(
                                (std) => std.name === stud.name
                              )?.[0]?.memo || 0
                            );
                          })
                          .reduce((ac, cur) => +ac + +cur)}
                      </td>
                      {/* 개별평균값 */}
                      <td key={"eachAverList"} className={`${classes["thd"]}`}>
                        {(
                          props.listMemo
                            ?.map((list) => {
                              return (
                                list?.data?.filter(
                                  (std) => std.name === stud.name
                                )?.[0]?.memo || 0
                              );
                            })
                            .reduce((ac, cur) => +ac + +cur) /
                          props.listMemo?.length
                        ).toFixed(1)}
                      </td>
                    </>
                  )}
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
                  {/* 체크리스트인 경우 총계, 한 반 자료인 경우에만 보여주기 */}
                  {dataClNames.length === 1 && props.about !== "listMemo" && (
                    <td
                      key={"whole" + num_index}
                      className={`${classes["thd"]}`}
                    >
                      {
                        props.listMemo?.filter((list) => {
                          return list?.unSubmitStudents?.filter(
                            (unSub_std) =>
                              unSub_std.name ===
                              listMemoClStudents[0]?.[num_index]?.name
                          )?.length === 0
                            ? true
                            : false;
                        })?.length
                      }
                    </td>
                  )}
                  {/* 개별기록의 경우 총계 평균 넣어주기 */}
                  {props.about === "listMemo" &&
                    dataClNames.length === 1 &&
                    canDrawLine && (
                      <>
                        {/* 총계 */}
                        <td key={"eachSumList"} className={`${classes["thd"]}`}>
                          {props.listMemo
                            ?.map((list) => {
                              return (
                                list?.data?.filter(
                                  (std) =>
                                    std.name ===
                                    listMemoClStudents[0]?.[num_index]?.name
                                )?.[0]?.memo || 0
                              );
                            })
                            .reduce((ac, cur) => +ac + +cur)}
                        </td>
                        {/* 개별평균값 */}
                        <td
                          key={"eachAverList"}
                          className={`${classes["thd"]}`}
                        >
                          {(
                            props.listMemo
                              ?.map((list) => {
                                return (
                                  list?.data?.filter(
                                    (std) =>
                                      std.name ===
                                      listMemoClStudents[0]?.[num_index]?.name
                                  )?.[0]?.memo || 0
                                );
                              })
                              .reduce((ac, cur) => +ac + +cur) /
                            props.listMemo?.length
                          ).toFixed(1)}
                        </td>
                      </>
                    )}
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
