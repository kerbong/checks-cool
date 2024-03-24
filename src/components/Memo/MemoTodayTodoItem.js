import React, { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import {
  FaCircleExclamation,
  FaPencil,
  FaRegFloppyDisk,
  FaRegTrashCan,
  FaXmark,
} from "react-icons/fa6";

const MemoTodayTodoItem = ({ todoItem, todoList, setTodoList, mykey }) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewTest] = useState(todoItem.text);
  const [emergency, setEmergency] = useState(false);

  const editInputRef = useRef(null);

  useEffect(() => {
    // edit 모드일때 포커싱을 한다.
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  useEffect(() => {
    setEmergency(todoItem.emg);
  }, [todoItem]);

  const handleResizeHeight = useCallback(() => {
    if (editInputRef === null || editInputRef.current === null) {
      return;
    }

    editInputRef.current.style.height = "10px";
    editInputRef.current.style.height =
      editInputRef.current.scrollHeight + 5 + "px";
  }, []);

  const onChangeCheckbox = () => {
    const nextTodoList = todoList?.reduce((acc, item) => {
      const newItem = {
        ...item,
        checked: item.id === todoItem.id ? !item.checked : item.checked,
      };
      return [...acc, newItem];
    }, []);

    setTodoList(nextTodoList);
  };

  const onClickEditButton = () => {
    setEdited(true);
    // 혹시 순서가 바뀐 걸 고려해서, textarea에 들어갈 value 새로 세팅하기 (안해주면.. 순서바꾸고 edit 버튼 누르면 순서 바뀌기 전의 텍스트가 보임)
    todoList?.forEach((item) => {
      if (todoItem?.id === item?.id) {
        setNewTest(item.text);
      }
    });
  };

  const onChangeEditInput = (e) => {
    setNewTest(e.target.value);
  };

  //수정할 때 저장버튼 함수
  const onClickSubmitButton = (e) => {
    const nextTodoList = todoList?.reduce((acc, item) => {
      const newItem = {
        ...item,
        text: item.id === todoItem.id ? newText : item.text,
        emg: item.id === todoItem.id ? emergency : item.emg || false,
      };
      return [...acc, newItem];
    }, []);
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
        // Swal.fire({
        //   icon: "success",
        //   title: "자료가 삭제되었어요.",
        //   text: "5초 후에 창이 사라집니다.",
        //   confirmButtonText: "확인",
        //   confirmButtonColor: "#85bd82",
        //   timer: 5000,
        // });
        const nextTodoList = todoList?.filter(
          (item) => item.id !== todoItem.id
        );
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

  useEffect(() => {
    if (editInputRef.current !== null) {
      editInputRef.current.style.height =
        editInputRef.current.scrollHeight - 1 + "px";
    }
  }, [edited]);

  return (
    <div className="todoapp__item" id={`item-${todoItem.id}`} key={mykey}>
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

      <span
        className={
          emergency
            ? "todoapp__inputbox-emergency-clicked"
            : edited
            ? "todoapp__inputbox-emergency"
            : "todoapp__inputbox-emergency-none"
        }
        // 수정중일 때만 클릭가능
        onClick={() => {
          if (edited) {
            setEmergency((prev) => !prev);
          } else {
            if (todoItem?.emg !== emergency) {
              setEmergency(todoItem?.emg);
            }
          }
        }}
      >
        <FaCircleExclamation />
      </span>

      {
        // 아이템 내용
        edited ? (
          <textarea
            className="todoapp__item-edit-input"
            value={newText}
            ref={editInputRef}
            onChange={onChangeEditInput}
            onKeyDown={() => handleResizeHeight(this)}
            onKeyUp={() => handleResizeHeight(this)}
            onClick={() => handleResizeHeight(this)}
            onInput={(e) => handleOnInput(e, 100)}
          />
        ) : (
          <>
            <span
              className={`todoapp__item-ctx ${
                todoItem.checked ? "todoapp__item-ctx-checked" : ""
              }`}
            >
              {todoItem.text}
            </span>
          </>
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
                <FaRegFloppyDisk />
              </button>
              {/* 취소 버튼 */}
              <button
                type="button"
                className="todoapp__item-delete-btn"
                onClick={() => {
                  if (todoItem?.emg !== emergency) {
                    setEmergency(todoItem?.emg);
                  }
                  setEdited(false);
                }}
              >
                <FaXmark />
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
                <FaPencil />
              </button>
              {/* 삭제 버튼 */}
              <button
                type="button"
                className="todoapp__item-delete-btn"
                onClick={onClickDeleteButton}
              >
                <FaRegTrashCan />
              </button>
            </>
          )
        ) : (
          <>
            {/* 완료된 항목에는.. 삭제버튼만 보임 */}
            <button
              type="button"
              className="todoapp__item-delete-btn"
              onClick={onClickDeleteButton}
            >
              <FaRegTrashCan />
            </button>
          </>
        )
      }
    </div>
  );
};

MemoTodayTodoItem.propTypes = {
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

export default MemoTodayTodoItem;
