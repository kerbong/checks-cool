import React from "react";
import ConsultContext from "./consult-context.js";
import { useReducer } from "react";

const defaultConsultState = {
  datas: [],
};

const consultReducer = (state, action) => {
  //같은 학생이 같은 날짜에 두 가지 상담 항목 저장 가능!

  if (action.type === "ADD") {
    const existingStudentDataIndex = state.datas.findIndex(
      (data) => data.id === action.data.id
    );
    //id는 날짜(yyyy-mm-dd) +시간(00:00)+ 번호

    const existingStudentData = state.datas[existingStudentDataIndex];

    let updatedDatas;

    //해당날짜와 시각에 해당학생의 자료가 없으면
    if (!existingStudentData) {
      //받은자료로 데이터 추가하기
      updatedDatas = state.datas.concat(action.data);
      //해당날짜에 해당학생의 자료가 있으면
    } else {
      //수정하기
      const updatedData = {
        ...existingStudentData,
        option: action.data.option,
        note: action.data.note,
      };
      updatedDatas = [...state.datas];
      updatedDatas[existingStudentDataIndex] = updatedData;
    }

    return {
      datas: updatedDatas,
    };
  }

  if (action.type === "REMOVE") {
    let updatedDatas;

    updatedDatas = state.datas.filter((data) => data.id !== action.id);

    console.log("삭제 후 데이터" + updatedDatas);
    return {
      datas: updatedDatas,
    };
  }
  return defaultConsultState;
};

const ConsultProvider = (props) => {
  const [consultState, dispatchConsultAction] = useReducer(
    consultReducer,
    defaultConsultState
  );

  const addDataToConsultHandler = (data) => {
    dispatchConsultAction({ type: "ADD", data: data });
  };

  const removeDataFromConsultHandler = (id) => {
    dispatchConsultAction({ type: "REMOVE", id: id });
  };

  const consultContext = {
    datas: consultState.datas,
    addData: addDataToConsultHandler,
    removeData: removeDataFromConsultHandler,
  };

  return (
    <ConsultContext.Provider value={consultContext}>
      {props.children}
    </ConsultContext.Provider>
  );
};

export default ConsultProvider;
