import React, { useState, useCallback, useEffect, useRef } from "react";

import classes from "./PadIt.module.css";
import Modal from "components/Layout/Modal";
import PadMemoAdd from "./PadMemoAdd";
import SortableItem from "./SortableItem";
import Grid from "./Grid";

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import dayjs from "dayjs";
import { v4 } from "uuid";
import Item from "./Item";

const PadItem = ({
  padDatas,
  padName,
  onClose,
  isTeacher,
  addPadHandler,
  padDatasHandler,
}) => {
  const [showNewMemo, setShowNewMemo] = useState(false);
  const [gridTemplate, setGridTemplate] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [clientWidth, setClientWidth] = useState(window.innerWidth);
  const [padItems, setPadItems] = useState([]);
  const [showEachItem, setShowEachItem] = useState(false);
  const [eachItem, setEachItem] = useState({});
  const [longClick, setLongClick] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setClientWidth(window.innerWidth);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (padDatas.length === 0) return;
    setPadItems(padDatas);
  }, [padDatas]);

  // const handleDragStart = useCallback((event) => {
  //   setActiveId(event.active.id);
  // }, []);

  // const startTimerRef = useRef(null);

  // const handlePointerDown = useCallback(() => {
  //   startTimerRef.current = setTimeout(() => {
  //     startTimerRef.current = null;
  //   }, 2000); // Adjust the delay time as needed
  // }, []);

  // const startTimerRef = useRef(null);
  const clickStartTimeRef = useRef(0);

  const handlePointerDown = useCallback(() => {
    clickStartTimeRef.current = Date.now();
    // startTimerRef.current = setTimeout(() => {
    //   startTimerRef.current = null;
    // }, 1000); // Adjust the delay time as needed
    setLongClick(false);
  }, []);

  // const handleDragStart = useCallback(
  //   (event) => {
  //     if (startTimerRef.current) {
  //       clearTimeout(startTimerRef.current);
  //       startTimerRef.current = null;
  //       console.log("Click");
  //       // Delay time not reached, perform another action
  //       // setEachItem(padDatas?.filter((data) => data.id === event.active.id)?.[0]);
  //       // setShowEachItem(true);
  //     } else {
  //       console.log("Drag");
  //       setEachItem({});
  //       setShowEachItem(false);
  //       setActiveId(event.active.id);
  //       console.log("Dragging started");
  //     }
  //   },
  //   [setEachItem, setShowEachItem, setActiveId]
  // );

  const handleDragStart = useCallback((event) => {
    // clearTimeout(startTimerRef.current);

    // if (startTimerRef.current) {
    //   // Delay time not reached, perform action for short click
    //   console.log("Short click");
    //   // Perform action for short click
    // } else {
    //   // Delay time reached, perform action for long click
    //   console.log("Long click");
    //   // Perform action for long click
    // }

    setActiveId(event.active.id);
    console.log("Dragging started");
  }, []);

  const handleDragEnd = useCallback((event) => {
    // clearTimeout(startTimerRef.current);
    const clickEndTime = Date.now();
    const clickDuration = clickEndTime - clickStartTimeRef.current;

    // Perform action for short click
    if (clickDuration < 1000) {
      console.log("Short click");
      setEachItem(padDatas?.filter((data) => data.id === event.active.id)?.[0]);
      setShowEachItem(true);

      // Perform action for long click
    } else {
      setShowEachItem(false);
      setEachItem({});
      setLongClick(true);
      // setActiveId(event.active.id);

      if (event.active.id !== event.over?.id) {
        setPadItems((items) => {
          const oldIndex = items.findIndex(
            (data) => data.id === event.active.id
          );
          const newIndex = items.findIndex(
            (data) => data.id === event.over?.id
          );
          let new_padItems = arrayMove(items, oldIndex, newIndex);

          padDatasHandler(new_padItems);
          return new_padItems;
        });
      }

      // setActiveId(null);
    }

    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    // clearTimeout(startTimerRef.current);
    setActiveId(null);
  }, []);

  const addMemoHandler = (e, bgColor) => {
    //패드 추가 또는 접속 함수(검증까지)

    e.preventDefault();
    let title = e.target.title.value;
    let text = e.target.text.value;

    //제목이나 내용이 없으면 저장 불가
    if (title?.trim() === "" || text?.trim() === "") return;

    //기존에 로컬스토리지에 저장된 uuid가 있는지 확인
    let userInfo = localStorage.getItem("padUserInfo");
    if (!userInfo) {
      userInfo = v4();
      localStorage.setItem("padUserInfo", userInfo);
    }

    // console.log(e.target.parentNode.innerText);
    //여기 부분... 부모 태그에서 속성값 받아오기
    let grid = !gridTemplate ? "0" : e.target.parentNode.innerText;

    let memo_data = {
      title,
      text,
      userInfo,
      createdAt: dayjs().format("MM-DD HH:mm"),
      bgColor,
      grid,
      id: String(padItems.length + 1),
      // 0은 기본 flex wrap 의미. 나머지 문자 찬성, 혹은 반대 같은 분류로 저장되면 grid 속성 의미
    };

    let new_padDatas = [...padItems];
    new_padDatas.push(memo_data);
    setPadItems(new_padDatas);
    padDatasHandler(new_padDatas);
    setShowNewMemo(false);
  };

  return (
    <div>
      {showNewMemo && (
        <Modal onClose={() => setShowNewMemo(false)}>
          <PadMemoAdd
            onClose={() => setShowNewMemo(false)}
            addMemoHandler={addMemoHandler}
          />
        </Modal>
      )}

      {/* 개별 아이템 클릭했을 때 보이는 padmemoadd 컴포넌트 */}
      {showEachItem && (
        <Modal onClose={() => setShowEachItem(false)}>
          <PadMemoAdd
            onClose={() => setShowEachItem(false)}
            data={eachItem}
            isTeacher={isTeacher}
            addMemoHandler={addMemoHandler}
          />
        </Modal>
      )}

      {/* 뒤로가기 버튼 */}
      <span
        className={classes.closeBtn}
        onClick={onClose}
        style={{ fontSize: "1rem" }}
      >
        <i className="fa-solid fa-reply"></i>
        {" 뒤로"}
      </span>

      {/* 보여주기 속성 바꾸는 버튼 */}

      {/* 패드아이템 제목 */}
      <h1 className={classes["fs-17rem"]}>{padName?.slice(10)}</h1>

      {/* 데이터 없는경우 보여주기 */}
      {padItems.length === 0 && (
        <div style={{ marginTop: "20vh", color: "gray" }}>
          <p>자료가 없어요!</p> <br />
          <p> 오른쪽 아래의 "+" 버튼을 눌러서 </p>
          <br />
          <p>자료를 추가해주세요.</p>
        </div>
      )}

      {/* 패드 메모들 보여주는 부분 */}
      <DndContext
        sensors={sensors} //마우스, 터치 센서사용
        collisionDetection={closestCenter}
        onDragStart={handleDragStart} // 드래그 시작할 때 실행되는 함수
        onDragEnd={handleDragEnd} // 드래그 끝나면 배열 바꿔주는 함수
        onDragCancel={handleDragCancel} // 드래그 취소함수
      >
        <SortableContext items={padItems} strategy={rectSortingStrategy}>
          {/* <div className={classes["grid-container"]}></div> */}
          <Grid columns={Math.floor(clientWidth / 280)}>
            {padItems?.map((data) => (
              <SortableItem
                key={data.id}
                id={data.id}
                isTeacher={isTeacher}
                color={data.bgColor}
                data={data}
                isDragging={longClick ? true : false}
                onPointerDown={handlePointerDown}
              />
            ))}
          </Grid>
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
          {/* {activeId ? (
            <>
              <Item
                id={activeId}
                color={{
                  backgroundColor: padItems?.filter(
                    (data) => data.id === activeId
                  )?.[0]?.bgColor,
                }}
                data={padItems?.filter((data) => data.id === activeId)?.[0]}
                isTeacher={isTeacher}
                isDragging
              />
            </>
          ) : null} */}

          {longClick && (
            <>
              <Item
                id={activeId}
                color={{
                  backgroundColor: padItems?.filter(
                    (data) => data.id === activeId
                  )?.[0]?.bgColor,
                }}
                data={padItems?.filter((data) => data.id === activeId)?.[0]}
                isTeacher={isTeacher}
                isDragging
              />
            </>
          )}
        </DragOverlay>
      </DndContext>

      {/* 패드 추가하는 버튼 */}
      <div>
        <button
          className={classes["add-btn"]}
          onClick={() => {
            setShowNewMemo(true);
          }}
        >
          {" "}
          +{" "}
        </button>
      </div>
    </div>
  );
};

export default PadItem;
