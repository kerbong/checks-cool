import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
const MemoTodayTodoInput = ({ todoList, setTodoList }) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  // input 값 가져오기
  const onChangeInput = (e) => {
    setText(e.target.value);
  };

  const onPressSubmitButton = (e) => {
    e.preventDefault();

    // todoItemList에 값 추가
    const nextTodoList = todoList.concat({
      id: todoList.length,
      text,
      checked: false,
      deleted: false,
    });
    setTodoList(nextTodoList);

    // input 값 초기화 및 포커싱
    setText("");
    inputRef.current.focus();
  };

  //자료 최대글자수 제한 함수
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
    <form onSubmit={onPressSubmitButton} className="todoapp__inputbox">
      {/* 아이템 내용 입력 오늘할일 제일 위쪽 입력창 */}
      <input
        type="text"
        name="todoItem"
        value={text}
        ref={inputRef}
        placeholder="할 일을 입력해주세요"
        className="todoapp__inputbox-inp"
        onChange={onChangeInput}
        onInput={(e) => handleOnInput(e, 30)}
      />
      {/* 입력 후 아이템 추가 버튼 */}
      <button type="submit" className="todoapp__inputbox-add-btn">
        추가
      </button>
    </form>
  );
};

// props 값 검증
MemoTodayTodoInput.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ),
  setTodoList: PropTypes.func.isRequired,
};

export default MemoTodayTodoInput;
