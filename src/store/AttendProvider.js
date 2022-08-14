import React from "react";
import AttendContext from "./attend-context";
import { useReducer } from "react";
// import Swal from "sweetalert2";
const defaultAttendState = {
  datas: [],
};

// const AttendContext = React.createContext({
//     data: [],
//     addData: (data) => {},
//     removeData: (id) => {},
//   });

// data안에 들어갈 내용
// student_num: studentInfo[0],
// student_name: studentInfo[1],
// id: attendOption.slice(0, 1),
// option: 출석형태*d비고*d며칠

const attendReducer = (state, action) => {
  //같은 학생이 같은 날짜에 두 가지 출석 항목이 있을 경우 저장 안됨!

  if (action.type === "ADD") {
    // console.log(action.data);
    const existingStudentDataIndex = state.datas.findIndex(
      (data) => data.id === action.data.id
    );

    const existingStudentData = state.datas[existingStudentDataIndex];

    let updatedDatas;

    //해당날짜에 해당학생의 자료가 없으면
    if (!existingStudentData) {
      //받은자료로 데이터 추가하기
      updatedDatas = state.datas.concat(action.data);
      //해당날짜에 해당학생의 자료가 있으면
    } else {
      //수정하기
      const updatedData = {
        ...existingStudentData,
        option_id: action.data.option_id,
        option: action.data.option,
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
  return defaultAttendState;
};

const AttendProvider = (props) => {
  const [attendState, dispatchAttendAction] = useReducer(
    attendReducer,
    defaultAttendState
  );

  const addDataToAttendHandler = (data) => {
    dispatchAttendAction({ type: "ADD", data: data });
  };

  const removeDataFromAttendHandler = (id) => {
    dispatchAttendAction({ type: "REMOVE", id: id });
  };

  const attendContext = {
    datas: attendState.datas,
    addData: addDataToAttendHandler,
    removeData: removeDataFromAttendHandler,
  };

  return (
    <AttendContext.Provider value={attendContext}>
      {props.children}
    </AttendContext.Provider>
  );
};

export default AttendProvider;
