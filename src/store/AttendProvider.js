import React, { useEffect } from "react";
import AttendContext from "./attend-context";
import { useReducer } from "react";
import { dbService } from "../fbase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  setDoc,
  getDocs,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";

// import Swal from "sweetalert2";
const defaultAttendState = {
  datas: [],
};

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
  return defaultAttendState;
};

const AttendProvider = (props) => {
  const [attendState, dispatchAttendAction] = useReducer(
    attendReducer,
    defaultAttendState
  );

  useEffect(() => {
    //db에서 attend 출결 DB가져오고 작성자가 현재 유저와 동일한지 확인하고 attendCtx에 추가하기
    const q = query(
      collection(dbService, "attend"),
      where("writtenId", "==", props.userUid)
    );
    onSnapshot(q, (snapShot) => {
      snapShot.docs.map((doc) => {
        const attendObj = {
          ...doc.data(),
          doc_id: doc.id,
        };
        return dispatchAttendAction({ type: "ADD", data: attendObj });
      });
    });
  }, [props.userUid]);

  const addDataToAttendHandler = async (data) => {
    //앱 내부의 attendCtx에 저장
    dispatchAttendAction({ type: "ADD", data: data });
    //firebase에 firestore에 업로드, 데이터에서 같은게 있는지 확인
    console.log(attendState.datas);
    const q = query(
      collection(dbService, "attend"),
      where("id", "==", data.id)
    );
    const querySnapshot = await getDocs(q);
    let existedDoc_id;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      existedDoc_id = doc.id;
    });
    console.log(existedDoc_id);

    if (existedDoc_id) {
      //기존 데이터가 존재할 경우 덮어쓰기로 저장하기
      await setDoc(doc(dbService, "attend", existedDoc_id), {
        ...data,
        writtenId: props.userUid,
      });
    } else {
      //새로운 데이터 자료 firestore에 저장하기
      await addDoc(collection(dbService, "attend"), {
        ...data,
        writtenId: props.userUid,
      });
    }
  };

  const removeDataFromAttendHandler = async (id) => {
    dispatchAttendAction({ type: "REMOVE", id: id });

    //firestore attend에서 현재유저가 작성한 자료가져오고 id가 같은거 찾아서 삭제하기
    const q = query(
      collection(dbService, "attend"),
      where("writtenId", "==", props.userUid),
      where("id", "==", id)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((document) =>
      deleteDoc(doc(dbService, "attend", document.id))
    );
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
