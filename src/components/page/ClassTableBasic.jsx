import React, { useState, useEffect } from "react";
import ExampleModal from "./ExampleModal";
import classes from "./ClassTableBasic.module.css";
import Button from "../Layout/Button";
import Swal from "sweetalert2";
import TimeTable from "../Main/TimeTable";
import { dbService } from "../../fbase";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { FaTable } from "react-icons/fa6";
const STARTBASE = [
  "2022-01-13 08:20",
  "2022-01-13 09:00",
  "2022-01-13 09:50",
  "2022-01-13 10:40",
  "2022-01-13 11:30",
  "2022-01-13 12:10",
  "2022-01-13 13:10",
  "2022-01-13 14:00",
  "2022-01-13 14:50",
  "2022-01-13 15:40",
];
const CLASSTIME = [
  "아침",
  "1교시",
  "2교시",
  "3교시",
  "4교시",
  "점심",
  "5교시",
  "6교시",
  "방과후",
  "준비물",
];

const ClassTableBasic = (props) => {
  const [showExample, setShowExample] = useState(false);
  const [items, setItems] = useState(false);
  const [classBasic, setClassBasic] = useState([]);
  const [classStart, setClassStart] = useState([]);
  const [classTime, setClassTime] = useState([]);
  const [itemsNumArray, setItemsNumArray] = useState([]);

  const WEEKDAYS = ["월", "화", "수", "목", "금"];

  const makeItems = () => {
    return itemsNumArray?.map((item, index) => (
      <div className={classes["input-div"]} key={`table-${item}`}>
        <input
          className={classes["input"]}
          type="text"
          id={`table-${item}`}
          placeholder={""}
          defaultValue={classBasic[index]}
        />
      </div>
    ));
  };
  // 만약 교시이름의 수가 8개가 아니면..(초기세팅값) 그 개수에 따라 *5해서 칸을 만들어줌.
  useEffect(() => {
    setItemsNumArray([...Array(classTime?.length * 5).keys()]?.map((i) => i));
  }, [classTime]);

  //시간표의 인풋창들 만들기, 저장된 기존 기초시간표 자료가 있으면 재랜더링해서 값 넣어주기.
  useEffect(() => {
    setItems(makeItems());
  }, [itemsNumArray]);

  //기존에 저장했던 기초시간표, 시작시각 불러와서 넣어주기
  useEffect(() => {
    const getClassTable = async () => {
      setClassBasic([]);
      let classTableRef = doc(dbService, "classTable", props.userUid);

      const now_doc = await getDoc(classTableRef);

      if (now_doc?.data()?.classStart) {
        let new_classBasic = [];
        CLASSTIME.forEach((cl_title, cl_index) => {
          WEEKDAYS.forEach((wd) => {
            new_classBasic.push(now_doc.data()?.[wd]?.[cl_index]);
          });
        });
        setClassBasic([...new_classBasic]);
        setClassStart([...now_doc.data()?.classStart]);
      } else {
        setClassStart([...STARTBASE]);
      }

      if (now_doc?.data()?.classTime) {
        setClassTime(now_doc?.data()?.classTime);
      } else {
        setClassTime(CLASSTIME);
      }
    };

    getClassTable();
    // console.log(new_classBasic);
  }, [props.userUid]);

  const saveClassBasicHandler = async () => {
    let 월 = [];
    let 화 = [];
    let 수 = [];
    let 목 = [];
    let 금 = [];
    //빈칸을 기준으로 과목을 요일별로 저장함.
    const classBasicRef = doc(dbService, "classTable", props.userUid);

    itemsNumArray.forEach((item) => {
      // 월요일 자료
      if (+item % 5 === 0) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        월.push(subject);

        // 화요일 자료
      } else if (+item % 5 === 1) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        화.push(subject);

        // 수요일 자료
      } else if (+item % 5 === 2) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        수.push(subject);

        // 목요일 자료
      } else if (+item % 5 === 3) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        목.push(subject);

        // 금요일 자료
      } else if (+item % 5 === 4) {
        let subject = document.querySelectorAll(`input[id="table-${item}"]`)[0]
          .value;
        금.push(subject);
      }
    });

    // 현재 입력된 교시 이름 설정하기
    let new_classTime = [];

    // 빈칸이 있는지 확인하기
    let isEmpty = false;

    classTime?.forEach((cl, index) => {
      let clt_name = document.querySelectorAll(
        `input[id="classTime-${index}"]`
      )[0].value;
      // 빈칸이 있는지 확인하기
      if (clt_name.trim() === "") {
        isEmpty = true;
      }
      new_classTime.push(clt_name);
    });

    if (isEmpty) {
      Swal.fire({
        icon: "error",
        title: "저장 실패",
        text: "기초시간표의 교시 이름에 빈칸이 있는지 확인해주세요! 지속적으로 문제가 생길 경우 kerbong@gmail.com으로 알려주세요!",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return;
    }

    let deleteDuplicate = [...new Set(new_classTime)];

    // 혹시나 현재 입력된 교시 이름에 같은 이름이 있지 않도록 확인하기!
    if (deleteDuplicate.length !== new_classTime.length) {
      Swal.fire({
        icon: "error",
        title: "저장 실패",
        text: "기초시간표의 교시 이름을 다르게 설정해주세요!",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return;
    }

    //교시 이름에 빈칸이 있는지 확인하기!

    let all_datas = {
      월: [...월],
      화: [...화],
      수: [...수],
      목: [...목],
      금: [...금],
      classStart: [...classStart],
      classTime: [...new_classTime],
    };

    // console.log(all_datas);

    const now_doc = await getDoc(classBasicRef);
    if (now_doc.exists() && Object.keys(now_doc?.data()).length > 0) {
      await updateDoc(classBasicRef, all_datas);
      // console.log("업데이트");
    } else {
      await setDoc(classBasicRef, all_datas);
      // console.log("새로 추가");
    }

    Swal.fire({
      icon: "success",
      title: "저장 완료",
      text: "기초시간표가 저장되었습니다. 5초 후에 창이 사라집니다.",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });
  };

  //시간표 시간 수정하는 함수
  const classStartHandler = (what, sTime, eTime) => {
    let newTime = `${dayjs("2022-01-13 " + sTime).format(
      "YYYY-MM-DD HH:mm"
    )},${dayjs("2022-01-13 " + eTime).format("YYYY-MM-DD HH:mm")}`;

    let new_classStart = [];
    console.log(newTime);
    console.log(classStart);
    classStart.forEach((cl, index) => {
      //모두 변경이 아니고, what과 인덱스가 다르면 변경하지 않음
      if (index < +what) {
        new_classStart.push(cl);
      } else if (index === +what) {
        new_classStart.push(newTime);
      } else {
        let cl_time = cl?.split(",");
        // 만약...해당교시 시간이 이미 저장되어 있으면, 패스!
        if (cl_time?.[1]) {
          new_classStart.push(cl);
          return;
        }

        let howMin = 10 + 50 * (index - +what - 1);

        //인덱스 차이 = 1이면, 시작 시간은 끝시각 + 10 분  2차이면, 시작은 + 10+50
        // 10 + 50*(인덱스-1)
        let new_clTime = dayjs("2022-01-13 " + eTime)
          .add(+howMin, "minute")
          .format("YYYY-MM-DD HH:mm");

        new_classStart.push(new_clTime);
      }
    });
    setClassStart([...new_classStart]);
  };

  //초기화 함수
  const returnBaseHandler = () => {
    Swal.fire({
      icon: "info",
      title: "초기화 할까요?",
      text: "시간표 전체와 교시별 시간을 모두 초기화 할까요? (초기화 후 저장해주세요.)",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: true,
      denyButtonText: "취소",
      timer: 5000,
    }).then((result) => {
      if (result.isConfirmed) {
        //시간초기화
        setClassStart([...STARTBASE]);
        //교시별 과목 초기화
        setClassBasic([]);
        //교시 이름 초기화
        setClassTime(CLASSTIME);
      }
    });
  };

  //마지막 교시 삭제 혹은 추가 함수
  const delAddClassTimeHandler = (delAdd) => {
    if (delAdd === "del") {
      //만약.. 현재 아이템이 총 20개면 즉 화면에 표현되는 교시가 4교시면... 최소값이라 삭제불가
      if (itemsNumArray.length <= 20) {
        Swal.fire({
          icon: "error",
          title: "교시 삭제 실패",
          text: "최소 4교시는 존재해야 합니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
        return;

        // 현재 칸에서 5칸씩 줄여줌.
      } else {
        // 과목이 들어가는 칸을 줄여줌
        setItemsNumArray(
          [...Array(itemsNumArray.length - 5).keys()]?.map((i) => i)
        );

        //교시 이름이 들어가는 칸도 줄여줌
        setClassTime((prev) => {
          prev.pop();
          return prev;
        });

        //교시시작 시간도 하나 제거함.
        setClassStart((prev) => {
          let new_prev = prev;
          new_prev.pop();
          return new_prev;
        });
      }

      // 교시 추가일 경우
    } else if (delAdd === "add") {
      // 만약 10교시까지 존재하면.. 최대!
      if (itemsNumArray.length >= 50) {
        Swal.fire({
          icon: "error",
          title: "교시 추가 실패",
          text: "최대 10교시(10줄)까지 추가가 가능합니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
        return;
      } else {
        // 과목이 들어가는 칸을 추가함
        setItemsNumArray(
          [...Array(itemsNumArray.length + 5).keys()]?.map((i) => i)
        );

        //교시 이름이 들어가는 칸도 추가함
        setClassTime((prev) => {
          let new_clTimeName = String(prev.length + 1) + "교시";
          //과목명 설정(key값이라 중복되면 안되서)
          if (prev.includes(new_clTimeName)) {
            new_clTimeName = String(prev.length + 2) + "교시";
          }
          prev.push(new_clTimeName);
          return prev;
        });

        // 시작 시각 추가함
        setClassStart((prev) => {
          let new_prev = prev;
          new_prev.push(STARTBASE[new_prev.length]);
          return new_prev;
        });
      }
    }
  };

  /** 시작, 끝 시각 불러오는 함수ㅡ 시작시각, 끝시각 */
  const classTimeHandler = (value, ind) => {
    let new_classTime = [];
    // 같은 이름.. 중복은 안되도록
    if (classTime?.includes(value)) {
      Swal.fire(
        "중복 불가!",
        "중복된 교시 이름이 존재합니다! 교시의 이름이 겹치지 않도록 수정해주세요.",
        "warning"
      );
      return;
    }

    let new_value = value;
    //  /같은 css선택자에서 불가능한 것들 사용하지 못하도록 막아주기
    if (/[\s!\"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~]/.test(value)) {
      Swal.fire(
        "특수문자 사용불가!",
        `방금 입력하신 특수문자, 띄어쓰기 등은 사용이 불가능합니다! - _ 숫자 영어 한글 문자만 활용해주세요.`,
        "warning"
      );
      new_value = value.replace(/[\s!\"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~]/g, "");

      return;
    }

    classTime?.forEach((ct, index) => {
      if (index === ind) {
        new_classTime.push(new_value);
      } else {
        new_classTime.push(ct);
      }
    });
    setClassTime(new_classTime);
  };

  return (
    <>
      {showExample && (
        <ExampleModal
          onClose={() => setShowExample(false)}
          imgSrc={""}
          text={
            <>
              <p
                style={{
                  fontSize: "1.3em",
                  textAlign: "center",
                  margin: "5px",
                }}
              >
                === 기초시간표기록 예시 ===
              </p>
              <p style={{ margin: "15px" }}>
                * 화면 왼쪽 상단의 현재 페이지 타이틀을 클릭하시면 다시 보실 수
                있어요!
              </p>
            </>
          }
        />
      )}
      <div id="title-div">
        {/* 화면 좌상단 타이틀 */}
        <button id="title-btn" onClick={() => setShowExample(true)}>
          <FaTable /> 기초시간표
        </button>
        <Button
          name={"저장"}
          className={"save-classTable-button"}
          onclick={saveClassBasicHandler}
        />
      </div>

      <div className={classes["title-class-container"]}>
        {/* 월화수목금 표시 */}
        <div className={classes["title-class"]}></div>
        <div className={classes["title-weekday"]}>
          {WEEKDAYS?.map((day) => (
            <span key={day} style={{ fontWeight: "bold" }}>
              {day}
            </span>
          ))}
        </div>
      </div>

      <div className={classes["title-class-container"]}>
        {/* 아침~ 6교시, 방과후 표시 */}
        <div className={classes["title-class"]}>
          {classTime?.map((ct, index) => (
            <div key={index} className={classes["title-class-div"]}>
              {/* 1교시 */}
              <div style={{ fontWeight: "bold" }}>
                <input
                  className={classes["time-input"]}
                  type="text"
                  id={`classTime-${index}`}
                  placeholder={""}
                  value={ct}
                  onChange={(e) => {
                    e.preventDefault();
                    classTimeHandler(e.target?.value?.trim(), index);
                  }}
                />
              </div>
              <div className={classes["timeRanges"]}>
                {/* 시간표시 09:00~09:40 */}
                <div className={classes["timeRange"]}>{`${dayjs(
                  classStart[index]?.split(",")?.[0]
                ).format("HH:mm")} `}</div>
                <div className={classes["timeRange"]}>
                  {classStart[index]?.split(",")?.[1]
                    ? ` ~ ${dayjs(classStart[index]?.split(",")?.[1]).format(
                        "HH:mm"
                      )}`
                    : ` ~ ${dayjs(classStart[index]?.split(",")?.[0])
                        .add(40, "minute")
                        .format("HH:mm")}`}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 인풋창, 40개 */}
        <div className={classes["container"]}>{items}</div>
      </div>

      <TimeTable
        timeHandler={classStartHandler}
        classTime={classTime}
        classStart={classStart}
        returnBaseHandler={returnBaseHandler}
        delAddClassTimeHandler={delAddClassTimeHandler}
      />
    </>
  );
};

export default ClassTableBasic;
