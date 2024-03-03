import React, { useState, useEffect } from "react";
import classes from "./ClassItem.module.css";
import dayjs from "dayjs";
import ShowClassTable from "./ShowClassTable";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { dbService } from "fbase";
import Swal from "sweetalert2";

const ShowClassChange = (props) => {
  const [selectedClass, setSelectedClass] = useState(props.selectedClass || []); // 바꾸려고 선택한 시간표, 처음꺼가 from, 두번째 꺼가 to

  /** html제외한 텍스트만 반환해서 보여주기 */
  const parsingHtml = (origin) => {
    let new_text = "";
    if (origin) {
      const parser = new DOMParser();
      const dom = parser.parseFromString(origin, "text/html");
      new_text = dom?.body?.textContent;
    }
    return new_text;
  };

  /** 선택된 수업을 취소함. */
  const cancleSelectTo = () => {
    let new_selectedClass = [...selectedClass]?.filter((_, ind) => ind === 0);
    setSelectedClass(new_selectedClass);
  };

  /** 두번째 선택된 수업을 넣어주기 */
  const classChHandler = (new_class) => {
    let new_selectedClass = [...selectedClass];
    new_selectedClass?.push(new_class);
    setSelectedClass(new_selectedClass);
  };

  /** 두 수업을 바꾸는 함수!  */
  const classExchangeHandler = async (how) => {
    let fromClass = selectedClass?.[0];
    let toClass = selectedClass?.[1];
    console.log(fromClass);
    console.log(toClass);

    let classTableRef = doc(dbService, "classTable", props.userUid);

    let whole_data = await getDoc(classTableRef);

    //복붙이면 기존 from수업은 그대로 두고, to부분의 날짜인 수업을 찾아서 과목 - 내용 넣어주기

    let new_classTable = [...whole_data?.data()?.datas];

    console.log(new_classTable);

    // 기존자료에 없는 날짜면 추가...!
    if (new_classTable?.filter((dt) => dt.id === toClass.id)?.length === 0) {
      new_classTable?.push({
        classMemo: props.classLists?.map((cl, cl_ind) => {
          let new_cl = { memo: "", classNum: cl, subject: "" };
          if (cl_ind === +toClass.classIndex) {
            new_cl = {
              memo: fromClass.memo,
              classNum: cl,
              subject: fromClass.subject,
            };
          }
          return new_cl;
        }),
        id: toClass.id,
      });

      //기존자료에 있는거면 해당 시간만 바뀍
    } else {
      new_classTable = new_classTable?.map((data) => {
        let new_data = data;
        //기존자료에서 해당 시간만 바꾸려면
        if (data.id === toClass?.id) {
          new_data.classMemo[+toClass.classIndex].memo = fromClass.memo;
          new_data.classMemo[+toClass.classIndex].subject = fromClass.subject;
        }
        return new_data;
      });
    }

    //이동(기존 수업 정보 초기화 해주기..)
    if (how === "move" || how === "exchange") {
      console.log(toClass);
      new_classTable = new_classTable?.map((data) => {
        let new_data = data;
        //기존자료에서 해당 시간만 바꾸려면
        if (data.id === fromClass?.id) {
          new_data.classMemo[+fromClass.classIndex].memo =
            how === "move" ? "" : toClass.memo;
          new_data.classMemo[+fromClass.classIndex].subject =
            how === "move" ? "" : toClass.subject;
        }
        return new_data;
      });
    }

    try {
      await updateDoc(classTableRef, { datas: new_classTable });

      props.saveDone();

      Swal.fire(
        "저장 성공!",
        `수업 ${
          how === "move" ? "옮기기" : how === "exchange" ? "교환" : "복붙"
        } 기능이 성공적으로 실행되었어요!`,
        "success"
      );
    } catch (error) {
      Swal.fire(
        "저장 실패!",
        "해당 수업 내용을 이동하거나 복사하지 못했어요! 증상이 지속되면 kerbong@gmail.com 으로 알려주세요!",
        "warning"
      );
    }
  };

  return (
    <>
      {/* 타이틀 부분 */}
      <div className={classes["flex-cen"]}>
        <div className={classes["title"]}>시간표 (복붙 / 교환) 하기</div>
        <div className={classes["title-sub"]} style={{ marginBottom: "-20px" }}>
          <br />* 날짜 선택 => 수업 선택 => 기능 선택 <br />
        </div>
      </div>

      {/* 가로줄 */}
      <hr style={{ margin: "20px 15px" }} />

      {/* 수업 두개 비교해서 보여주기 */}
      <div className={classes["clChange-div"]}>
        {/* 기존수업 */}
        <div
          className={classes["ch-class-div"]}
          style={
            selectedClass?.length === 2
              ? {
                  width: "44%",
                }
              : {}
          }
        >
          <div className={classes["title"]}>기존 수업</div>
          <div
            className={classes["flex-start-36"]}
            style={{ alignItems: "normal" }}
          >
            {/* 현재 날짜 */}
            <h3 className={classes["h3"]} style={{ marginTop: "5px" }}>
              날짜
            </h3>
            <div className={classes["m10"]}>{selectedClass?.[0]?.id}</div>
            {/* 교시 - 과목 */}
            <h3 className={classes["h3"]}>교시 - 과목</h3>
            <div className={classes["m10"]}>
              {selectedClass?.[0]?.classTime} -{" "}
              {selectedClass?.[0]?.subject || "-"}
            </div>
            {/* 수업내용 */}
            <h3 className={classes["h3"]}>내용</h3>{" "}
            <div className={classes["m10"]}>
              {parsingHtml(selectedClass?.[0]?.memo)}
            </div>
          </div>
        </div>

        {/* 복붙 / 교환 버튼 보여줄 부분 */}
        {selectedClass?.length === 2 && (
          <div
            className={classes["seat-ul"]}
            style={{
              justifyContent: "center",
              width: "10%",
              alignItems: "baseline",
            }}
          >
            <div style={{ height: "90px" }}></div>
            <button
              onClick={() => {
                classExchangeHandler("copy");
              }}
              className={classes["btn"]}
              style={{ margin: "10px 0", width: "70px", padding: "8px 0" }}
            >
              복붙
            </button>
            <button
              onClick={() => {
                classExchangeHandler("move");
              }}
              className={classes["btn"]}
              style={{ margin: "10px 0", width: "70px", padding: "8px 0" }}
            >
              옮기기
            </button>
            <button
              onClick={() => {
                classExchangeHandler("exchange");
              }}
              className={classes["btn"]}
              style={{ margin: "10px 0", width: "70px", padding: "8px 0" }}
            >
              교환
            </button>
            <button
              style={{ margin: "10px 0", width: "70px", padding: "8px 0" }}
              className={classes["btn"]}
              title="수업 선택을 취소하고 날짜선택으로 돌아갑니다. "
              onClick={cancleSelectTo}
            >
              선택취소
            </button>
          </div>
        )}

        {/* 새로운 바꿀 수업 */}
        <div
          className={classes["ch-class-div"]}
          style={
            selectedClass?.length === 2
              ? {
                  width: "44%",
                }
              : {}
          }
        >
          <div className={classes["title"]}>
            {selectedClass?.length === 1 ? "바꿀 수업선택" : "바꿀 수업"}
          </div>

          {/* 수업 선택하는 부분 */}
          {selectedClass?.length === 1 && (
            <div
              className={classes["flex-start-36"]}
              style={{ alignItems: "normal" }}
            >
              <ShowClassTable
                classTable={props.classTable}
                classLists={props.classLists}
                classFromSchedule={props.classFromSchedule}
                classBasicAll={props.classBasicAll}
                classChHandler={classChHandler}
              />
              {/* 달력보여주기 */}

              {/* 메인화면에 있는 시간표를 보여주기, 클릭하면, 선택하기 */}

              {/* 날짜 클릭하면 왼쪽에 classTime 보여주고, subject 보여주고, 간단한 memo 보여주기 */}
            </div>
          )}

          {/* 수업이 선택되면 보여줌 */}
          {selectedClass?.length === 2 && (
            <div
              className={classes["flex-start-36"]}
              style={{ alignItems: "normal" }}
            >
              {/* 현재 날짜 */}
              <h3 className={classes["h3"]} style={{ marginTop: "5px" }}>
                날짜
              </h3>
              <div className={classes["m10"]}>{selectedClass?.[1]?.id}</div>
              {/* 교시 - 과목 */}
              <h3 className={classes["h3"]}>교시 - 과목</h3>
              <div className={classes["m10"]}>
                {selectedClass?.[1]?.classTime} -{" "}
                {selectedClass?.[1]?.subject || "-"}
              </div>
              {/* 수업내용 */}
              <h3 className={classes["h3"]}>내용</h3>{" "}
              <div className={classes["m10"]}>
                {parsingHtml(selectedClass?.[1]?.memo)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowClassChange;
