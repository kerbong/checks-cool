import React, { useEffect } from "react";
import ConsultContext from "./consult-context.js";
import { useReducer } from "react";
import { dbService, dbAddData, dbDeleteData, storageService } from "../fbase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import {
  deleteObject,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

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

    // console.log("삭제 후 데이터" + updatedDatas);
    return {
      datas: updatedDatas,
    };
  }

  if (action.type === "INIT") {
    return {
      datas: [],
    };
  }
  return defaultConsultState;
};

const ConsultProvider = (props) => {
  const [consultState, dispatchConsultAction] = useReducer(
    consultReducer,
    defaultConsultState
  );

  useEffect(() => {
    //db에서 consult 상담 DB가져오고 작성자가 현재 유저와 동일한지 확인하고 consultCtx에 추가하기
    if (props.userUid !== "") {
      const q = query(
        collection(dbService, "consult"),
        where("writtenId", "==", props.userUid)
      );
      onSnapshot(q, (snapShot) => {
        snapShot.docs.map((doc) => {
          const attendObj = {
            ...doc.data(),
            doc_id: doc.id,
          };
          return dispatchConsultAction({ type: "ADD", data: attendObj });
        });
      });
    } else {
      return dispatchConsultAction({ type: "INIT" });
    }
  }, [props.userUid]);

  const addDataToConsultHandler = async (data) => {
    dispatchConsultAction({ type: "ADD", data: data });
    let fileUrl = "";
    //파일 있으면 storage에 저장하기, 업데이트하면서 파일을 바꾸지 않는 경우 패스!
    if (data.attachedFileUrl !== "") {
      //변경이 없을 때 저장하지 않는방법 잘 모르겠dj......스냅샷을 활용해야 할 것 같은데..?!

      //storage에 저장
      const response = await uploadString(
        ref(storageService, `${props.userUid}/${v4()}`),
        data.attachedFileUrl,
        "data_url"
      );
      //firestore에 저장할 url받아오기
      fileUrl = await getDownloadURL(response.ref);
    }
    //firebase에 firestore에 업로드, 데이터에서 같은게 있는지 확인
    const new_data = { ...data, attachedFileUrl: fileUrl };

    await dbAddData("consult", new_data, props.userUid);
  };

  const removeDataFromConsultHandler = async (id, attachedFileUrl) => {
    dispatchConsultAction({ type: "REMOVE", id: id });
    //firestore consult에서 현재유저가 작성한 자료가져오고 id가 같은거 찾아서 삭제하기
    await dbDeleteData("consult", id, props.userUid);

    //storage에 저장된 파일 지우기
    if (attachedFileUrl !== "") {
      await deleteObject(ref(storageService, attachedFileUrl));
    }
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
