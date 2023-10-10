import React, { useState, useCallback, useEffect, useRef } from "react";

import classes from "./PadIt.module.css";
import Modal from "components/Layout/Modal";
import PadMemoAdd from "./PadMemoAdd";
import SortableItem from "./SortableItem";
import Grid from "./Grid";
import Item from "./Item";
import CheckInput from "components/CheckListMemo/CheckInput";

import { dbService, storageService } from "../../fbase";
import { getDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  ref,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

import Swal from "sweetalert2";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import dayjs from "dayjs";
import { v4 } from "uuid";
import SectionAdd from "./SectionAdd";

const PadItem = ({
  padDatas,
  padName,
  onClose,
  isTeacher,
  padSectionNames,
  padDatasHandler,
  students,
  userUid,
  clName,
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
  const [addCheckItem, setAddCheckItem] = useState(false);
  const [checkListItem, setCheckListItem] = useState({});
  const [checkListsData, setCheckListsData] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

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
    if (padSectionNames.length === 0) {
      setSectionNames(["0"]);
    } else {
      setSectionNames(padSectionNames);
    }
  }, [padSectionNames]);

  useEffect(() => {
    if (padDatas.length === 0) return;
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

    const clickedItem = padItems?.filter(
      (data) => data.id === event.active.id
    )?.[0];

    // Perform action for short click
    if (10 < clickDuration && clickDuration < 300) {
      setEachItem(clickedItem);
      setShowEachItem(true);

      // Perform action for long click
    } else {
      setShowEachItem(false);
      setEachItem({});
      setLongClick(true);
      // setActiveId(event.active.id);

      let userInfo = localStorage.getItem("padUserInfo");
      //교사가 아닌데 내자료가 아니면 옮기지 못하도록!
      if (!isTeacher && userInfo !== clickedItem.userInfo) return;

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

            padDatasHandler(new_padItems, sectionNames);
            return new_padItems;
          });

          //
        } else {
          setPadItems((items) => {
            let new_items = items?.map((item) => {
              if (item.id !== event.active.id) return item;
              return { ...item, grid: targetGrid };
            });
            padDatasHandler(new_items, sectionNames);
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

  const delFileHandler = async (file) => {
    await deleteObject(ref(storageService, file));
  };

  const addMemoHandler = async (e, bgColor, file, data) => {
    //패드 추가 또는 접속 함수(검증까지)
    //data가 존재하면 기존데이터 수정

    e.preventDefault();

    let title = e.target.title.value;
    let text = e.target.text.value;
    let option = !gridTemplate ? e.target.option.value : "";

    // console.log(option);
    // return;

    //제목이나 내용이 없으면 저장 불가
    if (title?.trim() === "" || text?.trim() === "") return;

    //섹션 추가중인데 옵션 선택 안하면 저장불가
    if (!gridTemplate && option?.trim() === "") return;

    //저장되는 시간이 필요해서.. 저장중 로딩띄우기
    setIsSaving(true);

    let url = "";
    if (file !== "") {
      const response = await uploadString(
        ref(storageService, `${userUid}/${v4()}`),
        file,
        "data_url"
      );
      //firestore에 저장할 url받아오기
      url = await getDownloadURL(response.ref);
    }

    let userInfo;
    let memo_data;
    let new_padDatas;

    //여기 부분... 부모 태그에서 속성값 받아오기
    let grid = gridTemplate ? "0" : option;

    //파일 있으면 storage에 저장하기, 업데이트하면서 파일을 바꾸지 않는 경우 패스!

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
        fileUrl: url,
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
        fileUrl: url,
        // 0은 기본 flex wrap 의미. 나머지 문자 찬성, 혹은 반대 같은 분류로 저장되면 grid 속성 의미
      };
      setShowNewMemo(false);
      new_padDatas = [...padItems];
      new_padDatas.push(memo_data);
    }

    setPadItems(new_padDatas);
    padDatasHandler(new_padDatas, sectionNames);
    //저장되는 시간이 필요해서.
    setIsSaving(false);
  };

  //기존 메모 삭제함수, 삭제할 경우, id를 재설정해줘야함!
  const delMemoHandler = async (data) => {
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
        setIsSaving(true);
        // storage에 저장된 파일 지우기
        if (data.fileUrl !== "") {
          delFileHandler(data.fileUrl);
        }

        let new_padDatas = [...padItems];
        new_padDatas = new_padDatas?.filter((item) => item.id !== data.id);
        new_padDatas = new_padDatas?.map((item, index) => {
          let new_item = { ...item, id: String(index) };
          return new_item;
        });
        setPadItems(new_padDatas);
        padDatasHandler(new_padDatas, sectionNames);
        setShowEachItem(false);
        setIsSaving(false);
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

      let index = new_sectionNames.indexOf(nowSectionName);
      new_sectionNames.splice(index, 1, name);
      setSectionNames(new_sectionNames);

      setPadItems(new_padItems);
      padDatasHandler(new_padItems, new_sectionNames);

      setAddNewSection(false);
      setNowSectionName("");

      //새로운 섹션 추가하는 경우
    } else {
      new_sectionNames.push(name);
      setSectionNames(new_sectionNames);
      padDatasHandler(padItems, new_sectionNames);
    }
  };

  //섹션 제거하는 함수
  const delSectionHandler = (name) => {
    Swal.fire({
      icon: "warning",
      title: "섹션을 삭제할까요?",
      text: `${name} 제목의 섹션을 삭제할까요? *(주의)* 삭제할 경우 섹션에 포함된 모든 데이터도 함께 삭제됩니다.`,
      confirmButtonText: "확인",
      showDenyButton: true,
      denyButtonText: "취소",
      confirmButtonColor: "#85bd82",
    }).then((result) => {
      if (result.isConfirmed) {
        let new_padDatas = [...padItems]?.filter((item) => item.grid !== name);
        new_padDatas = new_padDatas?.map((item, index) => {
          let new_item = { ...item, id: String(index) };
          return new_item;
        });

        let new_sectionNames = [...sectionNames]?.filter((n) => n !== name);

        setPadItems(new_padDatas);
        padDatasHandler(new_padDatas, new_sectionNames);
        setAddNewSection(false);
      } else {
        return;
      }
    });
  };

  //교사인 경우, 제출ox 데이터 받아오기
  const getCheckListData = async () => {
    let checkRef = doc(dbService, "checkLists", userUid);
    // let checkDoc = await getDoc(checkRef);
    onSnapshot(checkRef, (doc) => {
      let new_checkLists = [...doc?.data()?.checkLists_data] || [];
      // let new_checkLists = [...doc?.data()?.checkLists_data] || [];
      let checkListItem = {};
      // 기존 제출ox에서 같은 이름으로 저장된거 있는지 확인
      new_checkLists?.forEach((list) => {
        if (list?.title === padName) {
          checkListItem = list;
        }
      });
      setCheckListsData(new_checkLists);
      setCheckListItem(checkListItem);
    });
  };

  useEffect(() => {
    if (!isTeacher || userUid === "") return;
    getCheckListData();
  }, [isTeacher]);

  //현재 학년도 정보 반환하는 함수
  const now_year = () => {
    return +dayjs().format("MM") <= 2
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  const saveItemHandler = async (new_item, auto) => {
    //자료 저장할 떄 실제로 실행되는 함수
    console.log(new_item);
    console.log(auto);
    const dataSaved = async (newOrSame) => {
      //동일한 이름의 자료가 이미 있는, 새로운 저장이면 팝업 띄우기
      if (newOrSame === "sameTitle" && !auto) {
        Swal.fire({
          icon: "warning",
          title: "동일한 제목 존재",
          text: "기존 자료에 동일한 제목의 자료가 존재합니다. 계속 저장 하시겠어요?",
          confirmButtonText: "확인",
          showDenyButton: true,
          denyButtonText: "취소",
          confirmButtonColor: "#85bd82",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            saveLogic();
          }

          if (result.isDenied) return;
        });
      }

      const saveLogic = async () => {
        let upload_item;

        //기존자료가 있으면?!
        if (datas?.length > 0) {
          // if (checkLists?.length > 0) {
          upload_item = {
            ...new_item,
            yearGroup: now_year(),
          };
          let new_datas = [...datas];
          let data_index = undefined;
          new_datas.forEach((data, index) => {
            if (data.id === upload_item.id) {
              data_index = index;
            }
          });
          //기존에 없던자료
          if (data_index === undefined) {
            new_datas.push(upload_item);
            //기존에 있던자료
          } else {
            //로직이 모두 진행되고 나면 혹시 기존데이터에서 날짜가 바뀐 경우
            if (new_item?.new_id) {
              upload_item = { ...upload_item, id: new_item.new_id };
              delete upload_item.new_id;
            }
            new_datas[data_index] = upload_item;
          }

          //3.17에러.. id가 null이거나 'null'인 자료 제외함
          new_datas = new_datas.filter(
            (data) => data.id !== null && data.id !== "null"
          );

          await setDoc(firestoreRef, {
            checkLists_data: [...new_datas],
          });

          setCheckListItem(new_item);

          setCheckListsData([...new_datas]);

          //처음 자료를 저장하는 경우
        } else {
          //학년도 데이터 추가하기
          let new_itemData = { ...new_item, yearGroup: now_year() };
          await setDoc(firestoreRef, {
            checkLists_data: [new_itemData],
          });

          setCheckListItem(new_item);

          setCheckListsData([new_itemData]);
          // setNowOnCheckLists([
          //   { ...new_item, yearGroup: now_year()},
          // ]);
          // }
        }
      };

      //새로운 자료면 저장하기
      if (newOrSame === "new" || auto) {
        saveLogic();
      }
    }; // 자료 저장 실행 함수 끝

    //firebase에 있는 저장된 데이터
    let datas = checkListsData;
    let firestoreRef = doc(dbService, "checkLists", userUid);

    //같은 이름의 체크리스트 있는지 확인하고, 저장 묻기 (id까지 같으면.. 기존자료 수정임)
    let regex = / /gi;
    let same_checkTitle = datas?.filter(
      (list) =>
        list.title.replace(regex, "") === new_item.title.replace(regex, "") &&
        list.id !== new_item.id
    );

    //기존에 있던 자료
    let isExist = datas?.filter(
      (list) =>
        list.title.replace(regex, "") === new_item.title.replace(regex, "") &&
        list.id === new_item.id
    );

    //동일한 이름의 체크리스트가 있는데.. 기존자료가 아니면 묻기
    if (same_checkTitle?.length > 0 && isExist?.length === 0) {
      dataSaved("sameTitle");
    } else {
      dataSaved("new");
    }
  };

  const removeData = async (item) => {
    //checkLists 에서 중복되는거 없애기(순서가 중요함..! firestore전에)
    let new_datas;

    let newCheckRef = doc(dbService, "checkLists", userUid);
    const checkListsSnap = await getDoc(newCheckRef);
    const checkListsData = checkListsSnap?.data()?.checkLists_data;

    new_datas = checkListsData?.filter((list) => list.id !== item.id);
    // setCheckLists([...new_datas]);
    // setNowOnCheckLists([
    //   ...nowOnCheckLists?.filter((list) => list.id !== item.id),
    // ]);
    await setDoc(doc(dbService, "checkLists", userUid), {
      checkLists_data: new_datas,
    });
  };

  const setItemNull = () => {};

  return (
    <div>
      {showNewMemo && (
        <Modal onClose={() => setShowNewMemo(false)}>
          <PadMemoAdd
            onClose={() => setShowNewMemo(false)}
            addMemoHandler={addMemoHandler}
            gridTemplate={gridTemplate}
            sectionNames={sectionNames}
            isSaving={isSaving}
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
            isSaving={isSaving}
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

      {addCheckItem && (
        <Modal onClose={() => setAddCheckItem(false)}>
          <CheckInput
            // 전담이 아니면 년도별에 따라 받아온거 보냄
            students={students}
            onClose={() => {
              localStorage.setItem("itemId", "null");
              setAddCheckItem(false);
            }}
            saveItemHandler={(item, auto) => {
              saveItemHandler(item, auto);
              if (!auto) {
                setAddCheckItem(false);
              }
            }}
            unSubmitStudents={checkListItem.unSubmitStudents}
            item={checkListItem}
            removeData={removeData}
            setItemNull={setItemNull}
            isSubject={false}
            clName={""}
          />
        </Modal>
      )}

      {/* 스타일 변경, 뒤로가기 버튼 모음 */}
      <div className={classes["flex-end"]}>
        {/* userUid가 있으면 제출ox 연동 */}
        {isTeacher && userUid !== "" && (
          <div>
            <span
              className={classes.closeBtn}
              onClick={() => setAddCheckItem((prev) => !prev)}
              style={{ fontSize: "1rem" }}
            >
              <i className="fa-regular fa-square-check"></i>&nbsp; 제출ox 보기
            </span>
          </div>
        )}

        <div>
          {/* 보여주기 속성 바꾸는 버튼 */}
          <span
            className={classes.closeBtn}
            onClick={() => setGridTemplate((prev) => !prev)}
            style={{ fontSize: "1rem" }}
          >
            {gridTemplate ? (
              <>
                <i className="fa-solid fa-grip-vertical"></i>
                &nbsp; 섹션스타일
              </>
            ) : (
              <>
                <i className="fa-solid fa-grip"></i>&nbsp; 기본스타일
              </>
            )}
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
                  key={name}
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
                style={{
                  margin: "40px 20px 0 0",
                  width: "30%",
                  maxWidth: "80px",
                }}
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
