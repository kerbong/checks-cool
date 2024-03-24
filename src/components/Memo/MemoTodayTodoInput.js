import React, { useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { FaCircleExclamation } from "react-icons/fa6";
const MemoTodayTodoInput = ({ todoList, setTodoList }) => {
  const [text, setText] = useState("");
  const [emergency, setEmergency] = useState(false);

  const inputRef = useRef(null);

  // input 값 가져오기
  const onChangeInput = (e) => {
    setText(e.target.value);
  };

  const handleResizeHeight = useCallback(() => {
    if (inputRef === null || inputRef.current === null) {
      return;
    }

    inputRef.current.style.height = "10px";
    inputRef.current.style.height = inputRef.current.scrollHeight + 5 + "px";
  }, []);

  const onPressSubmitButton = (e) => {
    e.preventDefault();

    //빈칸의 경우 저장되지 않도록
    if (text.trim().length === 0) return;

    //todolist에서 현재 남아있는 데이터들만 새롭게 id 만들어주기
    let new_todoList = [...todoList];

    // todoItemList에 값 추가
    new_todoList.unshift({
      id: +(new_todoList.length + 1),
      text,
      checked: false,
      emg: emergency,
    });
    console.log(new_todoList);
    setTodoList(new_todoList);

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
    <div className="todoapp__inputbox-div">
      {/* 긴급 버튼 추가 */}
      <button
        className={
          emergency
            ? "todoapp__inputbox-emergency-btn-clicked"
            : "todoapp__inputbox-emergency-btn"
        }
        onClick={() => setEmergency((prev) => !prev)}
      >
        중요 <FaCircleExclamation />
      </button>

      <form onSubmit={onPressSubmitButton} className="todoapp__inputbox">
        {/* 아이템 내용 입력 오늘할일 제일 위쪽 입력창 */}
        <textarea
          name="todoItem"
          value={text}
          ref={inputRef}
          placeholder="할 일을 입력해주세요"
          className="todoapp__inputbox-inp"
          onKeyDown={() => handleResizeHeight(this)}
          onKeyUp={() => handleResizeHeight(this)}
          onClick={() => handleResizeHeight(this)}
          onChange={onChangeInput}
          onInput={(e) => handleOnInput(e, 100)}
        />

        {/* 입력 후 아이템 추가 버튼 */}
        <button type="submit" className="todoapp__inputbox-add-btn">
          추가
        </button>
      </form>
    </div>
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
