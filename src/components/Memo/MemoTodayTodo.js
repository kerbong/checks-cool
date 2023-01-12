import React, { useState, useEffect } from "react";
import MemoTodayTodoInput from "./MemoTodayTodoInput";
import MemoTodayTodoItemList from "./MemoTodayTodoItemList";

import { dbService } from "../../fbase";
import { setDoc, onSnapshot, doc, getDoc } from "firebase/firestore";

const MemoTodayTodo = (props) => {
  const [todoList, setTodoList] = useState([]);
  //firestore에서 해당 이벤트 자료 받아오기
  const getMemoFromDb = async () => {
    //db에서 todo DB가져오고 작성자가 현재 유저와 동일한지 확인하고 events에 추가하기
    let memoRef = doc(dbService, "memo", props.userUid);
    let memoSnap = await getDoc(memoRef);

    if (memoSnap.exists()) {
      onSnapshot(memoRef, (doc) => setTodoList(doc.data().memoTodo));
    }
  };

  useEffect(() => {
    getMemoFromDb();
  }, []);

  const setTodoListHandler = async (e) => {
    setTodoList(e);
    //firestore에 업로드  e는 전체 배열 {[할일],[할일]}
    const new_data = { memoTodo: e };
    const memoTodoRef = doc(dbService, "memo", props.userUid);
    await setDoc(memoTodoRef, new_data);
  };

  return (
    <div className="homepage__container">
      {/* ToDo Item을 추가할 수 있는 input 박스 */}
      <MemoTodayTodoInput
        todoList={todoList}
        setTodoList={setTodoListHandler}
      />

      {/* 할 일 Item 리스트 */}
      <MemoTodayTodoItemList
        title={"할 일"}
        todoList={todoList}
        setTodoList={setTodoListHandler}
        checkedList={false} // (체크되지 않은) 할 일 목록
      />
      <hr />
      {/* 완료한 Item 리스트 */}
      <MemoTodayTodoItemList
        title={"완료한 항목"}
        todoList={todoList}
        setTodoList={setTodoListHandler}
        checkedList={true} // (체크되어 있는)완료한 목록
      />
    </div>
  );
};

export default MemoTodayTodo;
