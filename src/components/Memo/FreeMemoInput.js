import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import classes from "./FreeMemo.module.css";
import Button from "components/Layout/Button";
import dayjs from "dayjs";

//자료 최대글자수 제한 함수
const handleOnInput = (e, maxlength) => {
  if (e.target.value.length > maxlength) {
    e.target.value = e.target.value.substr(0, maxlength);
    Swal.fire(
      "입력 불가",
      `글자수를 초과했어요! 내용을 ${maxlength}자 이내로 줄여주세요.`,
      "warning"
    );
  }
};

const FreeMemoInput = (props) => {
  const [edited, setEdited] = useState(props.item ? false : true);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [showEditDeleteBtn, setShowEditDeleteBtn] = useState(false);
  const [category, setCategory] = useState(
    props.item ? props.item.category : ["all"]
  );

  const item = props.item;
  const exist_category = props.category;

  const editTextRef = useRef();

  const handleResizeHeight = () => {
    if (editTextRef === null || editTextRef.current === null) {
      return;
    }

    editTextRef.current.style.height = "10px";
    editTextRef.current.style.height =
      editTextRef.current.scrollHeight + 5 + "px";
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const textHandler = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    if (edited) {
      handleResizeHeight();
    }
  }, [edited]);

  useEffect(() => {
    if (props.item) {
      setTitle(props.item.title);
      setText(props.item.text);
    }
  }, [props.item]);

  //카테고리 추가, 삭제 함수
  const categoryHandler = (e) => {
    let clickedCategory = e.target.innerText;
    let new_category = [...category];
    // 만약 기존 category 상태에 없으면 추가, 있으면 삭제
    if (!category.includes(clickedCategory)) {
      new_category.push(clickedCategory);
    } else {
      new_category = new_category.filter((item) => item !== clickedCategory);
    }
    setCategory(new_category);
  };

  // 저장/수정하는 함수
  const saveFreeMemoHandler = () => {
    // 자료검증, 타이틀, 텍스트 있는지
    if (title.trim().length === 0) {
      Swal.fire("저장 불가", `제목이 없네요! 제목을 입력해주세요.`, "warning");
      return;
    }

    if (text.trim().length === 0) {
      Swal.fire("저장 불가", `내용이 없네요! 내용을 입력해주세요.`, "warning");
      return;
    }

    let new_memo = {
      title,
      text,
      category,
      id: dayjs().format("YYYY-MM-DD"),
    };

    //만약 기존 자료였던 경우 기존 이름 추가해서 보냄
    if (props.item) {
      new_memo.beforeTitle = props.item.title;
    }

    //기존자료 수정의 경우..
    //만약 기존 자료 수정의 경우.. beforeTitle 존재함, 그럴 경우 기존의 데이터는 삭제하고
    let isExist = false;
    let new_freeMemo = [];
    let newItem_index;
    if (new_memo.beforeTitle) {
      props.freeMemo?.forEach((item, index) => {
        if (item.title !== new_memo.beforeTitle) {
          new_freeMemo.push(item);
          //새로운 메모 제목이 기존 메모들 제목과 같으면
          if (item.title === new_memo.title) {
            isExist = true;
          }
        } else {
          new_freeMemo.push(new_memo);
          newItem_index = index;
        }
      });
      delete new_memo.beforeTitle;
    } else {
      props.freeMemo?.forEach((item) => {
        if (item.title === new_memo.title) {
          isExist = true;
        } else {
          new_freeMemo.push(item);
        }
      });
      new_freeMemo.push(new_memo);
      newItem_index = new_freeMemo.length - 1;
    }

    if (isExist) {
      Swal.fire(
        "제목 중복",
        `기존 자료에 동일한 제목의 메모가 존재합니다. 제목을 수정해주세요.`,
        "warning"
      );
      return;
    }

    let saveOrEdit = "저장";
    // 기존 자료 수정이면
    if (newItem_index !== new_freeMemo.length - 1) {
      saveOrEdit = "수정";
    }
    Swal.fire(
      `저장 완료`,
      `${new_memo.title} 메모가 ${saveOrEdit}되었습니다.`,
      "success"
    );

    setEdited(false);
    props.saveFreeMemoHandler(new_freeMemo);
  };

  //   삭제함수
  const deleteHandler = () => {
    // 기존타이틀로 삭제하기
    Swal.fire({
      icon: "warning",
      title: "삭제 할까요?",
      text: `현재 메모 (${item.title}) 를 삭제할까요?`,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: true,
      denyButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        setEdited(false);
        props.deleteHandler(item.title);
      } else {
        return;
      }
    });
  };

  return (
    <li
      className={classes["freeMemo-li"]}
      onClick={() => {
        setShowEditDeleteBtn((prev) => !prev);
      }}
    >
      {/* 제목부분 */}
      <div className={classes["title-div"]}>
        {edited ? (
          <>
            <span>제목</span>
            <input
              id="title-input"
              className={classes["title-input"]}
              type="text"
              required
              value={title}
              onInput={(e) => handleOnInput(e, 30)}
              onChange={titleHandler}
              placeholder={"30자 내로 작성해주세요."}
            />
          </>
        ) : (
          <h3 style={{ margin: 0 }}>{item?.title}</h3>
        )}
      </div>

      {/* 카테고리 보여주는 부분 */}
      <div className={classes["category-btns"]}>
        {edited ? (
          <>
            {/* 존재하는 카테고리를 다 보여주고, 그중에 클릭 한 것만 색깔을 나타냄.. 안하면 */}
            {exist_category?.map((categ) => {
              let isInclude = category?.includes(categ.name);

              return (
                <span key={"addMemo" + categ.name}>
                  {" "}
                  <Button
                    name={categ.name}
                    className={"freeMemo-category-edit"}
                    style={{
                      backgroundColor: isInclude && categ.bgColor,
                      color: isInclude ? categ.fontColor : "gray",
                      fontWeight: "bold",
                      borderWidth: !isInclude && "2px",
                      borderColor: !isInclude && "gray",
                    }}
                    onclick={(e) => categoryHandler(e)}
                  />
                </span>
              );
            })}

            {exist_category.length === 0 &&
              "아직 카테고리가 없어요! 먼저 왼쪽 상단의 + 버튼으로 카테고리를 추가해주세요!"}
          </>
        ) : (
          <>
            {item.category
              ?.filter((cate) => cate !== "all")
              ?.map((categ) => {
                let now_category = exist_category?.filter(
                  (item) => item.name === categ
                )[0];
                return (
                  <div key={categ}>
                    {" "}
                    <Button
                      name={categ}
                      className={"freeMemo-category-edit"}
                      style={{
                        backgroundColor: now_category?.bgColor || "gray",
                        color: now_category?.fontColor || "black",
                      }}
                    />
                  </div>
                );
              })}
            {item.category.length === 1 && (
              <span style={{ color: "gray" }}>
                * 카테고리가 존재하지 않아요!
              </span>
            )}
          </>
        )}
      </div>

      {/* 내용부분 */}
      <div className={classes["title-div"]}>
        {edited ? (
          <>
            <span>내용</span>
            <textarea
              className={classes["text-input"]}
              value={text}
              ref={editTextRef}
              onChange={textHandler}
              onKeyDown={() => handleResizeHeight(this)}
              onKeyUp={() => handleResizeHeight(this)}
              onClick={() => handleResizeHeight(this)}
              onInput={(e) => handleOnInput(e, 1000)}
            />
          </>
        ) : (
          <>
            <span className={classes["text-span"]}>{item?.text}</span>
          </>
        )}
      </div>
      {/* 버튼 모음 */}
      <div>
        {edited ? (
          <>
            {/* 저장버튼 */}
            <Button
              name={"저장"}
              className={"freeMemo-saveDelete"}
              onclick={() => {
                saveFreeMemoHandler();
              }}
            />
            {/* 취소버튼 */}
            <Button
              name={"취소"}
              className={"freeMemo-saveDelete"}
              onclick={() => {
                if (item) {
                  setEdited(false);
                } else {
                  props.closeHandler();
                }
              }}
            />
          </>
        ) : (
          <>
            {showEditDeleteBtn && (
              <>
                <Button
                  name={"수정"}
                  className={"freeMemo-saveDelete"}
                  onclick={() => {
                    setEdited(true);
                  }}
                />
                {/* 삭제버튼 */}
                {item && (
                  <Button
                    name={"삭제"}
                    className={"freeMemo-saveDelete"}
                    onclick={() => {
                      deleteHandler();
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default FreeMemoInput;
