import React, { useState, useEffect } from "react";
import MemoTodayTodoInput from "./MemoTodayTodoInput";
import MemoTodayTodoItemList from "./MemoTodayTodoItemList";

import { dbService } from "../../fbase";
import { setDoc, onSnapshot, doc, getDoc } from "firebase/firestore";
import TodoPage from "components/page/TodoPage";

const MemoTodayTodo = (props) => {
  const [todoList, setTodoList] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 창의 크기가 1200px 이상이면 달력 보이도록
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //firestore에서 해당 이벤트 자료 받아오기
  const getMemoFromDb = async () => {
    //db에서 todo DB가져오고 작성자가 현재 유저와 동일한지 확인하고 events에 추가하기
    let memoRef = doc(dbService, "memo", props.userUid);
    let memoSnap = await getDoc(memoRef);

    if (memoSnap.exists()) {
      onSnapshot(memoRef, (doc) => {
        let hasDeleted = false;
        let exceptDeleted = doc.data().memoTodo?.filter((data) => {
          if (data.deleted) {
            hasDeleted = true;
          }
          return data.deleted === false || data.deleted === undefined;
        });
        //데이터 처리 오류로.. id만 남아있는 것들이 있으면 제거함
        exceptDeleted = exceptDeleted.filter(
          (item) => Object.keys(item).length !== 1
        );

        // 만약 deleted가 있으면.. 데이터에 새롭게 번호매기고 저장함.
        if (hasDeleted) {
          exceptDeleted = exceptDeleted?.map((item, index) => {
            return { ...item, id: exceptDeleted.length - index };
          });
        }

        let newLists = sortLists(exceptDeleted);

        setTodoListHandler(newLists);
        // setTodoListHandler(exceptDeleted);
      });
    }
  };

  const sortLists = (beforeLists) => {
    //데이터 받아올때 자료 수정하기
    let on_toDoList = [];
    let done_toDoList = [];
    let nextTodoList = [];

    beforeLists?.forEach((item) => {
      if (!item.checked) {
        on_toDoList.push(item);
      } else {
        done_toDoList.push(item);
      }
    });

    sortEmg(on_toDoList)?.forEach((item, index) => {
      nextTodoList.push({
        ...item,
        id: +(+beforeLists?.length - index),
      });
    });
    sortEmg(done_toDoList)?.forEach((item, index) => {
      nextTodoList.push({ ...item, id: +(+done_toDoList?.length - index) });
    });

    return nextTodoList;
  };

  useEffect(() => {
    getMemoFromDb();
  }, []);

  //중요 순으로 정렬하기
  const sortEmg = (todo_list) => {
    let sorted_lists = todo_list.sort(function (a, b) {
      let a_emg = a.emg || false;
      let b_emg = b.emg || false;
      return b_emg - a_emg;
    });
    return sorted_lists;
  };

  // }, [todoList]);
  const setTodoListHandler = async (e) => {
    let list = sortLists(e);
    setTodoList(list);
    // console.log(e);
    //firestore에 업로드  e는 전체 배열 {[할일],[할일]}
    const new_data = { memoTodo: e };
    const memoTodoRef = doc(dbService, "memo", props.userUid);
    await setDoc(memoTodoRef, new_data);
  };

  const dragEndHandler = (res) => {
    if (!res.destination) return;

    //드래그 하는 sourced의 index
    const sourceNum = res.source.index;
    //드래그 해서 내려놓은 destination의 index
    const destinationNum = res.destination.index;
    //이동 안되면 함수 탈출
    if (sourceNum === destinationNum) return;

    //할일 목록과 완료 목록 나누기
    let new_onTodo = [];
    let new_finishTodo = [];

    todoList.forEach((list) => {
      if (list.checked === false) {
        new_onTodo.push(list);
      } else {
        new_finishTodo.push(list);
      }
    });

    // 새로운 할일 목록만들기
    let new_todoList = [];

    //완료안 된 할 일의 순서 바꾸기 (기존 자리에서 빼고 새 자리에 넣기)
    let [sourceItem] = new_onTodo.splice(sourceNum, 1);
    new_onTodo.splice(destinationNum, 0, sourceItem);

    //할 일과 완료 항목 합치기
    new_todoList = [...new_onTodo, ...new_finishTodo];
    //긴급 기준으로 재 정렬
    new_todoList = sortEmg(new_todoList);
    //index 번호 새롭게 붙이기 (내림차순)
    new_todoList = new_todoList?.map((item, index) => {
      return { ...item, id: new_todoList.length - index };
    });
    setTodoListHandler(new_todoList);
  };

  const divWidth = windowWidth > 1200 ? "600px" : "450px";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <div
        className="homepage__container"
        style={
          windowWidth > 1200
            ? { margin: "10px 40px", width: String(windowWidth - 600) + "px" }
            : {}
        }
      >
        {/* ToDo Item을 추가할 수 있는 input 박스 */}
        <MemoTodayTodoInput
          setTodoList={setTodoListHandler}
          todoList={todoList}
        />

        {/* 할 일 Item 리스트 */}

        <MemoTodayTodoItemList
          title={"오늘 할 일"}
          setTodoList={setTodoListHandler}
          todoList={todoList}
          checkedList={false} // (체크되지 않은) 할 일 목록
          dragEndHandler={dragEndHandler}
        />

        <hr />
        {/* 완료한 Item 리스트 */}
        <MemoTodayTodoItemList
          title={"완료한 항목"}
          setTodoList={setTodoListHandler}
          todoList={todoList}
          checkedList={true} // (체크되어 있는)완료한 목록
        />
      </div>

      {/*  */}
      <div
        style={{
          overflowY: "auto",
          display: windowWidth > 1000 ? "block" : "none",
          width: divWidth,
          margin: windowWidth > 1000 ? "20px 10px" : "0",
        }}
      >
        <TodoPage
          userUid={props.userUid}
          insideLoad={true}
          forMemoPadding={windowWidth < 1200 ? true : false}
        />
      </div>
    </div>
  );
};

export default MemoTodayTodo;
