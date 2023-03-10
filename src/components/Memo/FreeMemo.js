import React, { useState, useEffect } from "react";
import Button from "components/Layout/Button";
import classes from "./FreeMemo.module.css";
import Modal from "components/Layout/Modal";
import CategoryInput from "./CategoryInput";
import FreeMemoInput from "./FreeMemoInput";
import { dbService } from "../../fbase";
import { setDoc, onSnapshot, doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const FreeMemo = (props) => {
  const [addCategory, setAddCategory] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [nowCategory, setNowCategory] = useState({ name: "all" });
  const [freeMemo, setFreeMemo] = useState([]);
  const [category, setCategory] = useState([]);

  const getFreeMemoDb = async () => {
    //db에서 todo DB가져오고 작성자가 현재 유저와 동일한지 확인하고 events에 추가하기
    let freeMemoRef = doc(dbService, "freeMemo", props.userUid);
    let freeMemoSnap = await getDoc(freeMemoRef);
    if (freeMemoSnap.exists()) {
      onSnapshot(freeMemoRef, (doc) => {
        //카테고리 모음
        let new_category = doc.data()?.category;
        //데이터 모음
        let new_freeMemo = doc.data()?.freeMemo;

        setCategory(new_category);
        setFreeMemo(new_freeMemo);
      });
    }
  };

  useEffect(() => {
    getFreeMemoDb();
  }, []);

  const setFreeMemoHandler = async (category, freeMemo) => {
    setCategory(category); //배열
    setFreeMemo(freeMemo); //배열
    console.log(category);
    console.log(freeMemo);
    //firestore에 업로드
    const new_data = { category: category, freeMemo: freeMemo };
    const freeMemoRef = doc(dbService, "freeMemo", props.userUid);
    await setDoc(freeMemoRef, new_data);
  };

  //카테고리 저장함수
  const saveCategoryHandler = (new_item) => {
    //만약 기존 자료 수정의 경우.. beforeName 존재함, 그럴 경우 기존의 데이터는 삭제하고
    let isExist = false;
    let new_category = [];
    if (new_item.beforeName) {
      category.forEach((item) => {
        if (item.name !== new_item.beforeName) {
          new_category.push(item);
        }
      });
      delete new_item.beforeName;
    } else {
      category.forEach((item) => {
        if (item.name === new_item.name) {
          isExist = true;
        } else {
          new_category.push(item);
        }
      });
    }
    new_category.push(new_item);

    if (isExist) {
      Swal.fire(
        "이름 중복",
        `기존 자료에 동일한 이름의 카테고리가 존재합니다. 이름을 수정해주세요.`,
        "warning"
      );
      return;
    }
    //모달창 닫기
    setAddCategory(false);
    Swal.fire(
      `저장 완료`,
      `${new_item.name} 카테고리가 저장되었습니다.`,
      "success"
    );

    setFreeMemoHandler(new_category, freeMemo);
  };

  // 새로운 메모 저장/수정하는 함수
  const saveFreeMemoHandler = (new_item) => {
    //기존자료 수정의 경우..
    //만약 기존 자료 수정의 경우.. beforeTitle 존재함, 그럴 경우 기존의 데이터는 삭제하고
    let isExist = false;
    let new_freeMemo = [];
    if (new_item.beforeTitle) {
      freeMemo.forEach((item) => {
        if (item.title !== new_item.beforeTitle) {
          new_freeMemo.push(item);
        }
      });
      delete new_item.beforeTitle;
    } else {
      freeMemo.forEach((item) => {
        if (item.title === new_item.title) {
          isExist = true;
        } else {
          new_freeMemo.push(item);
        }
      });
    }
    new_freeMemo.push(new_item);

    if (isExist) {
      Swal.fire(
        "제목 중복",
        `기존 자료에 동일한 제목의 메모가 존재합니다. 제목을 수정해주세요.`,
        "warning"
      );
      return;
    }

    Swal.fire(
      `저장 완료`,
      `${new_item.title} 메모가 저장되었습니다.`,
      "success"
    );

    setAddItem(false);
    setFreeMemoHandler(category, new_freeMemo);
  };

  //   메모 삭제 함수
  const deleteHandler = (title) => {
    let new_freeMemo = freeMemo.filter((item) => item.title !== title);
    setFreeMemoHandler(category, new_freeMemo);
  };

  return (
    <div>
      {/* 카테고리 추가하는 모달 */}
      {addCategory && (
        <Modal onClose={() => setAddCategory(false)}>
          <CategoryInput
            caInputClose={() => setAddCategory(false)}
            saveCategoryHandler={saveCategoryHandler}
          />
          {/* 저장하는 핸들러 추가하기,  */}
        </Modal>
      )}

      {/* 카테고리 메뉴바... 추가 버튼 + 전체 + 직접입력한 카테고리 / 가능하도록 오른쪽으로 슬라이드 가능 */}
      <div className={classes["menu-div"]}>
        {/* 추가버튼은 고정되어 움직이지 않음.*/}
        <div>
          {/* 카테고리 추가 버튼 */}
          <Button
            icon={
              !addCategory ? (
                <i className="fa-solid fa-plus"></i>
              ) : (
                <i className="fa-solid fa-xmark"></i>
              )
            }
            id={"add-freeMemoBtn"}
            className={"freeMemoCategory-add"}
            onclick={() => {
              setAddCategory((prev) => !prev);
            }}
          />
        </div>
        <div className={classes["category-div"]}>
          {/* 전체보기 버튼 */}
          <div>
            <Button
              name={"전체보기"}
              id={"add-listMemoBtn"}
              className={"freeMemo-category"}
              onclick={() => {
                setNowCategory({ name: "all" });
              }}
              style={{
                fontWeight: "bold",
              }}
            />
          </div>

          {category?.map((item) => (
            <div key={item.name}>
              <Button
                name={item.name}
                id={"add-listMemoBtn"}
                className={"freeMemo-category"}
                onclick={() => {
                  setNowCategory(item);
                }}
                style={{
                  backgroundColor: item.bgColor,
                  color: item.fontColor,
                  fontWeight: "bold",
                }}
              />
            </div>
          ))}
          {category.length === 0 && "아직 자료가 없습니다!"}
        </div>
      </div>

      {/* 메뉴바의 요소를 클릭하면.. 해당 카테고리 메모들만 보임. 추가도 거기에서 가능. */}
      <div>
        <div>
          {/* 메모 추가 버튼 */}
          <Button
            icon={
              !addItem ? (
                <>
                  새로운 메모 <i className="fa-solid fa-plus"></i>
                </>
              ) : (
                <i className="fa-solid fa-xmark"></i>
              )
            }
            id={"add-freeMemoBtn"}
            className={!addItem ? "freeMemo-add-basic" : "freeMemo-add"}
            onclick={() => {
              setAddItem((prev) => !prev);
            }}
          />
        </div>
        {/* 메모 추가할 때 보여질 아이템 */}
        {addItem && (
          <div>
            <FreeMemoInput
              saveFreeMemoHandler={saveFreeMemoHandler}
              category={category}
              closeHandler={() => setAddItem(false)}
            />
          </div>
        )}

        {/* 실제 메모들이 보이고 수정 가능 */}
        <ul className={classes["freeMemo-ul"]}>
          {freeMemo
            ?.filter((memo) => memo.category.includes(nowCategory.name))
            ?.map((item) => (
              <div key={"memo" + item.title}>
                <FreeMemoInput
                  item={item}
                  category={category}
                  deleteHandler={deleteHandler}
                  saveFreeMemoHandler={saveFreeMemoHandler}
                />
                <hr />
              </div>
            ))}
        </ul>
      </div>

      {/*  */}
    </div>
  );
};

export default FreeMemo;
