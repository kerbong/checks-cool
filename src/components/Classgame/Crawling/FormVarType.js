import React, { useState, useEffect } from "react";
import classes from "./HwpControl.module.css";

import Modal from "components/Layout/Modal";
import ScoreGradeInput from "components/CheckListMemo/ScoreGradeInput";

const TYPE = ["string", "phone", "select", "date", "period", "sign"];

const TYPE_TITLES = [
  "문자나 숫자",
  "핸드폰 번호",
  "객관식 선택",
  "날짜 선택",
  "기간 선택",
  "서명",
];

const TYPE_DESC = [
  "* 가장 일반적인 입력방식",
  "* 핸드폰 번호만 입력할 수 있도록 하는 입력방식",
  "* 정해진 타입 중에 하나를 고르는 방식",
  "* 결석 날짜, 조퇴 날짜 등 하루만 선택하는 방식",
  "* 현장체험학습 신청 기간 선택 등 여러 날짜도 선택할 수 있는 방식",
  "학부모의 온라인 서명을 추가할 수 있는 방식",
];

const TYPE_BASIC = [
  { var: "담임서명", type: "sign" },
  { var: "학생이름", type: "string" },
  { var: "학년반", type: "string" },
  { var: "번호", type: "string" },
  { var: "부모휴대폰", type: "phone" },
  { var: "**기간", type: "period" },
  { var: "**며칠", type: "string" },
  { var: "**학습형태", type: "select" },
  { var: "**목적지", type: "string" },
  { var: "**보호자서명", type: "sign" },
  { var: "**인솔자이름", type: "string" },
  { var: "**인솔자관계", type: "string" },
  { var: "**인솔자휴대폰", type: "phone" },
  { var: "**목적", type: "string" },
  { var: "**계획", type: "string" },
  { var: "신청날짜", type: "date" },
  { var: "보호자이름", type: "string" },
  { var: "보호자관계", type: "string" },
  { var: "**제목", type: "string" },
  { var: "**사진", type: "image" },
  { var: "제출날짜", type: "string" },
  { var: "보호자관계", type: "string" },
];

const FormVarType = (props) => {
  const [formKeys, setFormKeys] = useState([]);
  const [formValues, setFormValues] = useState(props.formValues || []);
  const [nowKey, setNowKey] = useState(0);
  const [schoolClass, setSchoolClass] = useState("");
  const [allValueDone, setAllValueDone] = useState(false);
  const [selectOptionModal, setSelectOptionModal] = useState(false);

  useEffect(() => {
    setFormKeys(props.formKeys);
  }, [props.formKeys]);

  useEffect(() => {
    if (
      formValues?.filter((val) => val.type !== "")?.length ===
      formValues?.length
    ) {
      setAllValueDone(true);
    }
  }, [formValues]);

  useEffect(() => {
    if (formKeys?.length === 0) return;

    //키 목록이 전달됐는데 값 목록은 없으면,

    const new_values = [];
    formKeys?.forEach((fkey) => {
      let k_type = { var: fkey, type: "" };
      TYPE_BASIC.forEach((tBasic) => {
        if (tBasic.var === fkey) {
          k_type = { var: fkey, type: tBasic.type };
          return;
        }
      });
      new_values.push(k_type);
    });
    console.log(new_values);
    setFormValues(new_values);
  }, [formKeys]);

  const keyHandler = (pN) => {
    //이전 버튼 누르면 index 빼고
    if (pN === "prev") {
      if (nowKey === 0) return;
      setNowKey(nowKey - 1);
      //다음 버튼 누르면 index 더하기
    } else {
      if (nowKey === formKeys?.length - 1) return;
      setNowKey(nowKey + 1);
    }
  };

  useEffect(() => {
    if (formValues?.length === 0) return;
    if (formValues?.[nowKey]?.type === "select") {
      setSelectOptionModal(true);
    } else {
      setSelectOptionModal(false);
    }
  }, [nowKey]);

  const formValuesHandler = (typeIndex) => {
    let new_values = [...formValues];
    new_values[nowKey].type = TYPE[typeIndex];
    setFormValues(new_values);
    if (TYPE[typeIndex] === "select") {
      console.log("dd");
      setSelectOptionModal(true);
    }
    console.log(new_values);
  };

  //   console.log(Object.values(formValues?.[0])?.[0]);

  return (
    <>
      {/* 지금 선택된 변수가 select일 경우, 보일 modal화면. 들어갈 option value를 배열로 만들어서 넣어주기..! */}
      {selectOptionModal && (
        <Modal
          onClose={() => {
            setSelectOptionModal(false);
          }}
        >
          <ScoreGradeInput
            scoreGradeValue={(sel_array) => {
              let new_formValues = [...formValues];
              new_formValues[nowKey].option = sel_array;
              console.log(new_formValues);
              setFormValues(new_formValues);
            }}
            closeHandler={() => setSelectOptionModal(false)}
            title={"셀렉트 요소"}
            inputValues={
              formValues?.[nowKey].option || [
                "가족동반여행",
                "친인척방문",
                "답사견학활동",
              ]
            }
          />
        </Modal>
      )}

      {/* 모든 변수 설정완료하면 보임 */}
      {allValueDone && (
        <>
          <label>
            학년도*교육청*학교*학년반
            <input
              type="text"
              onChange={(e) => setSchoolClass(e.target.value)}
            />
          </label>
          <button
            onClick={() => {
              props.saveKeyType(formValues, schoolClass);
            }}
          >
            저장
          </button>
        </>
      )}
      <div className={classes["flex-wrap"]}>
        {/* 변수 이름 보여줄 타이틀부분, 이전, 다음버튼 포함 */}
        <div className={classes["flex-wrap"]} style={{ flexWrap: "nowrap" }}>
          {/* 이전 단계로 버튼 */}
          <button
            onClick={() => keyHandler("prev")}
            className={classes["btn"]}
            style={{ width: "50px", margin: "0 20px " }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* 변수들 보여주기 */}
          <div className={classes["flex-wrap"]}>
            {formKeys?.map((formKey, i) => (
              <span
                key={i}
                className={classes["keySpan"]}
                onClick={() => setNowKey(+i)}
                style={
                  i === nowKey
                    ? {
                        fontWeight: "bold",
                        fontSize: "1.4rem",
                        textDecorationLine: "underline",
                      }
                    : {}
                }
              >
                {/* 셀렉트인경우 option이 있는지도 확인해서 보여주기 */}
                {formValues?.[i]?.type !== "select" ? "✅" : "🔥"}
                {formKey}
              </span>
            ))}
          </div>

          {/* 다음 단계로 버튼 */}
          <button
            onClick={() => keyHandler("next")}
            className={classes["btn"]}
            style={{ width: "50px", margin: "0 20px " }}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        {/* 버튼 스타일로 보여줄 타입부분 */}
        <div className={classes["flex-wrap"]}>
          {TYPE_TITLES?.map((title, index) => (
            <button
              key={index}
              onClick={() => formValuesHandler(index)}
              className={classes["typeBtn"]}
              style={
                formValues?.[nowKey]?.type === TYPE[index]
                  ? { backgroundColor: "rgb(34 142 91)" }
                  : {}
              }
            >
              <div className={classes["typeTitle"]}> {title}</div>
              <div>{TYPE_DESC[index]}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default FormVarType;
