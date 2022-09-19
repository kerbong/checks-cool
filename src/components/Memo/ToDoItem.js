import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const ToDoItem = ({ todoItem, todoList, setTodoList }) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewTest] = useState(todoItem.text);

  const editInputRef = useRef(null);

  useEffect(() => {
    // edit 모드일때 포커싱을 한다.
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const onChangeCheckbox = () => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      // id 값이 같은 항목의 checked 값을 Toggle 함
      checked: item.id === todoItem.id ? !item.checked : item.checked,
    }));

    setTodoList(nextTodoList);
  };

  const onClickEditButton = () => {
    setEdited(true);
  };

  const onChangeEditInput = (e) => {
    setNewTest(e.target.value);
  };

  const onClickSubmitButton = (e) => {
    const nextTodoList = todoList.map((item) => ({
      ...item,
      text: item.id === todoItem.id ? newText : item.text, // 새로운 아이템 내용을 넣어줌
    }));
    setTodoList(nextTodoList);
    setEdited(false);
  };

  const onClickDeleteButton = () => {
    Swal.fire({
      title: "항목을 지울까요?",
      text: `${todoItem.text} 을/를 삭제할까요?`,
      showDenyButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "자료가 삭제되었어요.",
          text: "5초 후에 창이 사라집니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
        const nextTodoList = todoList.map((item) => ({
          ...item,
          deleted: item.id === todoItem.id ? true : item.deleted,
        }));
        setTodoList(nextTodoList);
      }
    });
  };

  //입력 글자수 제한
  const handleOnInput = (e, maxlength) => {
    if (e.target.value.length > maxlength) {
      e.target.value = e.target.value.substr(0, maxlength);
      Swal.fire({
        icon: "error",
        title: "입력 불가",
        text: "입력한 내용을 줄여주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
    }
  };

  return (
    <li className="todoapp__item">
      {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
      <input
        id={`todoapp_checkbox${todoItem.id}`}
        type="checkbox"
        className="todoapp__item-checkbox"
        checked={todoItem.checked}
        onChange={onChangeCheckbox}
      />
      <label
        htmlFor={`todoapp_checkbox${todoItem.id}`}
        className={todoItem.checked ? "label_checked" : ""}
      ></label>
      {
        // 아이템 내용
        edited ? (
          <input
            type="text"
            className="todoapp__item-edit-input"
            value={newText}
            ref={editInputRef}
            onChange={onChangeEditInput}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onClickSubmitButton();
              }
            }}
            onInput={(e) => handleOnInput(e, 20)}
          />
        ) : (
          <span
            className={`todoapp__item-ctx ${
              todoItem.checked ? "todoapp__item-ctx-checked" : ""
            }`}
          >
            {todoItem.text}
          </span>
        )
      }
      {
        // 완료한 일인 경우에는 null을 반환하여 보이지 않도록 함
        !todoItem.checked ? (
          edited ? (
            <>
              {/* 저장버튼 */}
              <button
                type="button"
                className="todoapp__item-edit-btn"
                onClick={onClickSubmitButton}
              >
                <i className="fa-regular fa-floppy-disk"></i>
              </button>
              {/* 취소 버튼 */}
              <button
                type="button"
                className="todoapp__item-delete-btn"
                onClick={() => setEdited(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </>
          ) : (
            <>
              {/* 수정버튼 */}
              <button
                type="button"
                className="todoapp__item-edit-btn"
                onClick={onClickEditButton}
              >
                <i className="fa-solid fa-pencil"></i>
              </button>
              {/* 삭제 버튼 */}
              <button
                type="button"
                className="todoapp__item-delete-btn"
                onClick={onClickDeleteButton}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </>
          )
        ) : (
          <div className="todoapp__item-done-btn"></div>
        )
      }
    </li>
  );
};

ToDoItem.propTypes = {
  todoItem: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string.isRequired,
  }),
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  setTodoList: PropTypes.func.isRequired,
};

export default ToDoItem;
