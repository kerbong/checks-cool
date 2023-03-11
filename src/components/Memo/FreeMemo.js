import React, { useState, useEffect } from "react";
import Button from "components/Layout/Button";
import classes from "./FreeMemo.module.css";
import Modal from "components/Layout/Modal";
import CategoryInput from "./CategoryInput";
import FreeMemoInput from "./FreeMemoInput";
import { dbService } from "../../fbase";
import { setDoc, onSnapshot, doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const EXPLAINS = [
  "* 카테고리 추가방법!",
  "  1. 전체보기 왼쪽의 [+] 클릭",
  "  2. 필요한 정보 입력 및 커스텀하고 저장",
  "  (주의) 기존 카테고리와 제목 중복 안됨!",
  "* 카테고리 수정방법!",
  "  1. 전체보기 오른쪽 카테고리 찾고 클릭",
  "  2. [새로운메모+] 아래에 생긴 카테고리 이름 클릭",
  "  3. 카테고리 이름 옆 [수정] 클릭",
  "  4. 정보 수정 후 저장",
  "  (주의) 카테고리 이름 수정시 기존 메모의 카테고리 이름도 자동 수정",
  "* 메모 추가방법!",
  "  1. [새로운메모+] 클릭",
  "  2. 필요한 정보 입력, 선택하고 저장",
  "* 메모 수정방법!",
  "  1. 해당 메모의 아무 곳이나 클릭",
  "  2. 새로 생긴 [수정] 버튼 클릭",
  "  3. 정보 수정 후 저장",
];

const FreeMemo = (props) => {
  const [addCategory, setAddCategory] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [showCategoryEditBtn, setShowCategoryEditBtn] = useState(false);
  const [explainOn, setExplainOn] = useState(false);
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

  useEffect(() => {
    setShowCategoryEditBtn(false);
  }, [nowCategory]);

  const setFreeMemoHandler = async (category, freeMemo) => {
    setCategory(category); //배열
    setFreeMemo(freeMemo); //배열
    //firestore에 업로드
    const new_data = { category: category, freeMemo: freeMemo };
    const freeMemoRef = doc(dbService, "freeMemo", props.userUid);
    await setDoc(freeMemoRef, new_data);
  };

  //카테고리 저장/수정 함수
  const saveCategoryHandler = (new_category, newItemindex) => {
    Swal.fire(
      `저장 완료`,
      `${new_category[newItemindex].name}  카테고리가 저장/수정 되었습니다.`,
      "success"
    );

    //새로 카테고리 추가인 경우
    let new_freeMemo;
    if (addCategory) {
      setAddCategory(false);
      new_freeMemo = freeMemo;
      //기존 카테고리 수정인 경우 현재 카테고리 수정
    } else {
      //   freeMemo도 수정해야함..
      new_freeMemo = freeMemo.map((memo) => {
        let new_memoCategory = memo.category.map((cate) => {
          //기존이름과 같은게 있으면
          //새로운 이름으로 바꿔서 map
          if (cate === new_category[newItemindex].beforeName) {
            return new_category[newItemindex].name;
          } else {
            //만약 이름이 새로우면.. 안바꿔도 됨
            return cate;
          }
        });
        let new_memo = { ...memo, category: new_memoCategory };
        return new_memo;
      });
      delete new_category[newItemindex].beforeName;
      setNowCategory(new_category[newItemindex]);
    }

    setFreeMemoHandler(new_category, new_freeMemo);
  };

  // 새로운 메모 저장/수정하는 함수
  const saveFreeMemoHandler = (new_freeMemo) => {
    setAddItem(false);
    setFreeMemoHandler(category, new_freeMemo);
  };

  //   메모 삭제 함수
  const deleteHandler = (title) => {
    let new_freeMemo = freeMemo.filter((item) => item.title !== title);
    setFreeMemoHandler(category, new_freeMemo);
  };

  //카테고리 삭제 함수
  const deleteCategoryHandler = () => {
    //카테고리에서 삭제하고
    const removeCategory = () => {
      return category?.filter((cate) => cate.name !== nowCategory.name);
    };
    //전체 메모에 있는 카테고리도 삭제하고
    const removeCategoryInFreeMemo = () => {
      return freeMemo?.map((memo) => {
        let new_memoCategory = memo.category?.filter(
          (cate) => cate !== nowCategory.name
        );
        let new_memo = { ...memo, category: new_memoCategory };
        return new_memo;
      });
    };

    Swal.fire({
      icon: "warning",
      title: "삭제 할까요?",
      text: `카테고리를 지우면 기존 메모들에 존재하던 카테고리가 사라집니다.(기존 메모는 삭제되지 않습니다.) 카테고리 (${nowCategory.name}) 를 삭제할까요?`,
      confirmButtonText: "삭제",
      confirmButtonColor: "#85bd82",
      showDenyButton: true,
      denyButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        setFreeMemoHandler(removeCategory(), removeCategoryInFreeMemo());
        setNowCategory({ name: "all" });
      } else {
        return;
      }
    });
  };

  return (
    <div>
      {/* 카테고리 추가하는 모달 */}
      {addCategory && (
        <Modal onClose={() => setAddCategory(false)}>
          <CategoryInput
            caInputClose={() => setAddCategory(false)}
            saveCategoryHandler={saveCategoryHandler}
            category={category}
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
        <div className={`${classes["category-div"]}`}>
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

          {/* 입력된 카테고리 모음 버튼 */}

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
                  letterSpacing: "0px",
                  backgroundColor: item?.bgColor || "white",
                  color: item?.fontColor || "black",
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
              freeMemo={freeMemo}
              closeHandler={() => setAddItem(false)}
            />
          </div>
        )}

        <hr />
        {!editCategory && (
          // {/* 선택된 카테고리 보여주고 수정, 삭제하는 기능 */}
          <div
            className={classes["grid-category"]}
            onClick={() => {
              setShowCategoryEditBtn((prev) => !prev);
            }}
          >
            <span className={classes["category-name"]}>
              {nowCategory.name === "all" ? "전체보기" : nowCategory.name}
            </span>

            {showCategoryEditBtn &&
              //   {/* 전체보기는 불가능! 수정, 삭제버튼 */}
              nowCategory.name !== "all" && (
                <div className={classes["h2"]}>
                  <Button
                    name={"수정"}
                    className={"freeMemo-category"}
                    onclick={() => {
                      setEditCategory(true);
                    }}
                  />

                  <Button
                    name={"삭제"}
                    className={"freeMemo-category"}
                    onclick={() => {
                      deleteCategoryHandler();
                    }}
                  />
                </div>
              )}
          </div>
        )}

        {/* 카테고리 수정 할때 보이는 부분 */}
        {nowCategory.name !== "all" && editCategory && (
          <div>
            <CategoryInput
              caInputClose={() => setEditCategory(false)}
              saveCategoryHandler={saveCategoryHandler}
              nowCategory={nowCategory}
              category={category}
            />
          </div>
        )}

        {/* 실제 메모들이 보이고 수정 가능 */}
        <ul className={classes["freeMemo-ul"]}>
          {freeMemo
            ?.filter((memo) => memo.category.includes(nowCategory.name))
            ?.map((item) => (
              <div key={"memo" + item.title}>
                <hr className={classes["hr"]} />
                <FreeMemoInput
                  item={item}
                  category={category}
                  deleteHandler={deleteHandler}
                  freeMemo={freeMemo}
                  saveFreeMemoHandler={saveFreeMemoHandler}
                />
              </div>
            ))}

          {freeMemo?.filter((memo) => memo.category.includes(nowCategory.name))
            ?.length === 0 && "*해당 카테고리가 포함된 메모가 없습니다!"}
        </ul>
      </div>

      {/* 사용설명 부분 */}
      <div>
        <h2
          className={classes.h1}
          onClick={() => setExplainOn((prev) => !prev)}
        >
          🪄 사용 설명서{" "}
          <span className={classes.h1Span}>
            {explainOn ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}{" "}
          </span>
        </h2>

        {/* 실제 사용설명 내용 */}
        <div
          className={explainOn ? classes.explainDiv : classes.explainDivHide}
        >
          {EXPLAINS?.map((explain, index) => (
            <span
              key={`explain-${index}`}
              className={classes.explainP}
              style={{
                fontWeight:
                  (index === 0 && "bold") ||
                  (index === 4 && "bold") ||
                  (index === 10 && "bold") ||
                  (index === 13 && "bold"),
              }}
            >
              {explain}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreeMemo;
