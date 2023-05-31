import React, { useState, useCallback, useEffect, useRef } from "react";

import classes from "./PadIt.module.css";
import Modal from "components/Layout/Modal";
import PadMemoAdd from "./PadMemoAdd";
import SortableItem from "./SortableItem";
import Grid from "./Grid";
import Item from "./Item";

import Swal from "sweetalert2";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  KeyboardSensor,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import dayjs from "dayjs";
import { v4 } from "uuid";
import SectionAdd from "./SectionAdd";

const PadItem = ({
  padDatas,
  padName,
  onClose,
  isTeacher,
  addPadHandler,
  padDatasHandler,
}) => {
  const [showNewMemo, setShowNewMemo] = useState(false);
  const [gridTemplate, setGridTemplate] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [clientWidth, setClientWidth] = useState(window.innerWidth);
  const [padItems, setPadItems] = useState([]);
  const [showEachItem, setShowEachItem] = useState(false);
  const [eachItem, setEachItem] = useState({});
  const [longClick, setLongClick] = useState(false);
  const [sectionNames, setSectionNames] = useState([]);
  const [targetGrid, setTargetGrid] = useState(null);
  const [addNewSection, setAddNewSection] = useState(false);
  const [nowSectionName, setNowSectionName] = useState("");

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
    // 섹션이름 설정해주기
    let new_sectionNames = [];
    padDatas?.forEach((data) => {
      new_sectionNames.push(data.grid);
    });
    new_sectionNames = [...new Set(new_sectionNames)];
    setSectionNames(new_sectionNames);

    setPadItems(padDatas);
  }, [padDatas]);

  const clickStartTimeRef = useRef(0);

  const handleDragStart = useCallback((event) => {
    clickStartTimeRef.current = Date.now();
    setLongClick(false);
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = (event) => {
    // clearTimeout(startTimerRef.current);
    const clickEndTime = Date.now();
    const clickDuration = clickEndTime - clickStartTimeRef.current;

    // Perform action for short click
    if (clickDuration < 300) {
      setEachItem(padItems?.filter((data) => data.id === event.active.id)?.[0]);
      setShowEachItem(true);

      // Perform action for long click
    } else {
      setShowEachItem(false);
      setEachItem({});
      setLongClick(true);
      // setActiveId(event.active.id);

      if (event.active.id !== event.over?.id) {
        //
        if (!targetGrid) {
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

          //
        } else {
          setPadItems((items) => {
            let new_items = items?.map((item) => {
              if (item.id !== event.active.id) return item;
              return { ...item, grid: targetGrid };
            });
            return new_items;
          });
        }
      } else {
      }
    }

    setActiveId(null);
  };

  const handleDragCancel = useCallback(() => {
    // clearTimeout(startTimerRef.current);
    setActiveId(null);
  }, []);

  const addMemoHandler = (e, bgColor, data) => {
    //패드 추가 또는 접속 함수(검증까지)
    //data가 존재하면 기존데이터 수정

    e.preventDefault();
    let title = e.target.title.value;
    let text = e.target.text.value;

    //제목이나 내용이 없으면 저장 불가
    if (title?.trim() === "" || text?.trim() === "") return;

    let userInfo;
    let memo_data;
    let new_padDatas;
    //여기 부분... 부모 태그에서 속성값 받아오기
    let grid = !gridTemplate ? "0" : e.target.parentNode.innerText;

    //기존 자료 수정의 경우
    if (data) {
      memo_data = {
        title,
        text,
        userInfo: data.userInfo,
        createdAt: dayjs().format("MM-DD HH:mm"),
        bgColor,
        grid,
        id: data.id,
      };

      new_padDatas = [...padItems];
      let data_index = new_padDatas.findIndex((item) => item.id === data.id);
      new_padDatas.splice(data_index, 1, memo_data);
      setShowEachItem(false);

      // 새로운 데이터 저장
    } else {
      //기존에 로컬스토리지에 저장된 uuid가 있는지 확인
      userInfo = localStorage.getItem("padUserInfo");
      if (!userInfo) {
        userInfo = v4();
        localStorage.setItem("padUserInfo", userInfo);
      }

      // console.log(e.target.parentNode.innerText);

      memo_data = {
        title,
        text,
        userInfo,
        createdAt: dayjs().format("MM-DD HH:mm"),
        bgColor,
        grid,
        id: String(padItems.length),
        // 0은 기본 flex wrap 의미. 나머지 문자 찬성, 혹은 반대 같은 분류로 저장되면 grid 속성 의미
      };
      setShowNewMemo(false);
      new_padDatas = [...padItems];
      new_padDatas.push(memo_data);
    }

    setPadItems(new_padDatas);
    padDatasHandler(new_padDatas);
  };

  //기존 메모 삭제함수, 삭제할 경우, id를 재설정해줘야함!
  const delMemoHandler = (data) => {
    Swal.fire({
      icon: "warning",
      title: "메모를 삭제할까요?",
      text: `${data.title} 제목의 메모를 삭제할까요?`,
      confirmButtonText: "확인",
      showDenyButton: true,
      denyButtonText: "취소",
      confirmButtonColor: "#85bd82",
    }).then((result) => {
      if (result.isConfirmed) {
        let new_padDatas = [...padItems];
        new_padDatas = new_padDatas?.filter((item) => item.id !== data.id);
        new_padDatas = new_padDatas?.map((item, index) => {
          let new_item = { ...item, id: String(index) };
          return new_item;
        });
        setPadItems(new_padDatas);
        padDatasHandler(new_padDatas);
        setShowEachItem(false);
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    // setFirstGridItems()
  }, [targetGrid]);

  const handleDragMove = (event) => {
    const { active, over } = event;
    console.log(over);
    //드래그해서 위에 가져간 항목 섹션에 현재active id가 없으면 targetGrid에 저장
    if (over && over?.data?.current) {
      const isAnotherGrid = !over?.data?.current?.sortable?.items?.includes(
        active.id
      );
      //만약 grid 속성 값이 다르면 targetGrid에 값(이름) 저장
      if (isAnotherGrid) {
        //새로운 섹션에 가짜로 저장된 자료인 경우(숫자가 아니면)
        if (isNaN(+over.id)) {
          setTargetGrid(over.id);

          //기존 자료가 있는 곳이면
        } else {
          padItems.forEach((item) => {
            if (item.id === over.id) {
              setTargetGrid(item.grid);
            }
          });
        }

        // grid 속성값이 같으면 null
      } else {
        setTargetGrid(null);
      }
    }
    setActiveId(event.active.id);
  };

  //섹션 추가하는 함수
  const addSectionHandler = (name) => {
    // 숫자로만 이루어진건 불가능
    if (!isNaN(+name)) {
      Swal.fire(
        "저장 실패",
        "숫자로만 이루어진 섹션이름은 불가능해요!",
        "warning"
      );
      return false;
    }

    //빈칸저장불가능
    if (name.trim().length === 0) {
      Swal.fire(
        "저장 실패",
        "빈칸으로 저장할 수 없어요! 섹션의 이름을 입력해주세요.",
        "warning"
      );
      return false;
    }

    //이미 존재하는 이름은 불가능,
    let new_sectionNames = [...sectionNames];
    if (new_sectionNames.includes(name)) {
      Swal.fire(
        "저장 실패",
        "이미 존재하는 섹션이름입니다! 확인해주세요!",
        "warning"
      );
      return false;
    }

    //기존 섹션이름 수정하는 경우
    if (nowSectionName) {
      //padItems에서 grid값을 수정해줘야함.
      let new_padItems = [...padItems]?.map((item) => {
        let new_item;
        if (item.grid !== nowSectionName) {
          new_item = item;
        } else {
          new_item = { ...item, grid: name };
        }
        return new_item;
      });

      setPadItems(new_padItems);
      padDatasHandler(new_padItems);

      let index = new_sectionNames.indexOf(nowSectionName);
      new_sectionNames.splice(index, 1, name);
      setSectionNames(new_sectionNames);

      //새로운 섹션 추가하는 경우
    } else {
      new_sectionNames.push(name);
      setSectionNames(new_sectionNames);
    }
  };

  //섹션 제거하는 함수
  const delSectionHandler = () => {};

  return (
    <div>
      {showNewMemo && (
        <Modal onClose={() => setShowNewMemo(false)}>
          <PadMemoAdd
            onClose={() => setShowNewMemo(false)}
            addMemoHandler={addMemoHandler}
            gridTemplate={gridTemplate}
            sectionNames={sectionNames}
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
            delMemoHandler={delMemoHandler}
            gridTemplate={gridTemplate}
            sectionNames={sectionNames}
          />
        </Modal>
      )}

      {/* 섹션추가할 경우, 보여질 모달 */}
      {addNewSection && (
        <>
          <Modal
            onClose={() => {
              setAddNewSection(false);
              setNowSectionName("");
            }}
          >
            <SectionAdd
              onClose={() => {
                setAddNewSection(false);
                setNowSectionName("");
              }}
              addSectionHandler={addSectionHandler}
              delSectionHandler={delSectionHandler}
              existName={nowSectionName}
            />
          </Modal>
        </>
      )}

      {/* 스타일 변경, 뒤로가기 버튼 모음 */}
      <div className={classes["flex-end"]}>
        {/* 보여주기 속성 바꾸는 버튼 */}
        <span
          className={classes.closeBtn}
          onClick={() => setGridTemplate((prev) => !prev)}
          style={{ fontSize: "1rem" }}
        >
          <i className="fa-solid fa-reply"></i>
          {gridTemplate ? " 섹션스타일" : " 기본스타일"}
        </span>

        {/* 뒤로가기 버튼 */}
        <span
          className={classes.closeBtn}
          onClick={onClose}
          style={{ fontSize: "1rem" }}
        >
          <i className="fa-solid fa-reply"></i>
          {" 뒤로"}
        </span>
      </div>

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

      {/* 패드 메모들 - 그리드스타일 */}
      {gridTemplate && (
        <DndContext
          sensors={sensors} //마우스, 터치 센서사용
          collisionDetection={closestCenter}
          onDragStart={handleDragStart} // 드래그 시작할 때 실행되는 함수
          onDragEnd={handleDragEnd} // 드래그 끝나면 배열 바꿔주는 함수
          onDragCancel={handleDragCancel} // 드래그 취소함수
        >
          <SortableContext items={padItems} strategy={rectSortingStrategy}>
            <Grid columns={Math.floor(clientWidth / 280)}>
              {padItems?.map((data) => (
                <SortableItem
                  key={data.id}
                  id={data.id}
                  isTeacher={isTeacher}
                  color={data.bgColor}
                  data={data}
                />
              ))}
            </Grid>
          </SortableContext>
          <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
            {longClick && activeId && (
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
      )}

      {/* 패드 메모들 - 컬럼스타일 */}
      {!gridTemplate && (
        <DndContext
          sensors={sensors} //마우스, 터치 센서사용
          collisionDetection={closestCenter}
          onDragStart={handleDragStart} // 드래그 시작할 때 실행되는 함수
          onDragEnd={handleDragEnd} // 드래그 끝나면 배열 바꿔주는 함수
          onDragCancel={handleDragCancel} // 드래그 취소함수
          onDragMove={handleDragMove}
        >
          <div className={classes["flex-center"]}>
            {sectionNames?.map((name) => {
              let items = padItems?.filter((item) => item.grid === name);

              if (items.length === 0) {
                items = [
                  {
                    id: name,
                    grid: name,
                    bgColor: "",
                    text: "",
                    title: "",
                    userInfo: "",
                    createdAt: "",
                  },
                ];
              }

              return (
                <SortableContext
                  items={items}
                  strategy={rectSortingStrategy}
                  onDragOver={() => {
                    setTargetGrid(name); // Set the current grid as the targetGrid
                  }}
                >
                  <Grid columns={1} data-droppable-id={name}>
                    <div
                      className={classes["section-title"]}
                      onClick={() => {
                        setNowSectionName(name);
                        setAddNewSection(true);
                      }}
                    >
                      {name}
                    </div>
                    {items?.map((data) => {
                      return (
                        <SortableItem
                          key={data.id}
                          id={data.id}
                          isTeacher={isTeacher}
                          color={data.bgColor}
                          data={data}
                        />
                      );
                    })}
                  </Grid>
                </SortableContext>
              );
            })}
            {/* 섹션 추가하는 버튼, 교사만 보임 */}
            {isTeacher && (
              <div
                className={classes["section-title"]}
                style={{ margin: "40px 20px 0 0" }}
                onClick={() => setAddNewSection(true)}
              >
                {"+"}
              </div>
            )}
          </div>

          <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
            {longClick && activeId && (
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
      )}

      {/* 패드 추가하는 버튼 */}
      <div>
        <button
          className={classes["add-btn"]}
          onClick={() => {
            if (showEachItem) {
              setShowEachItem(false);
            }
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
