import React from "react";
import PropTypes from "prop-types";
import MemoTodayTodoItem from "./MemoTodayTodoItem";

const MemoTodayTodoItemList = ({
  title,
  todoList,
  setTodoList,
  checkedList,
}) => (
  <div className="todoapp__list">
    {/* props로 부터 title 값을 전달 받음 */}
    <p
      className={
        title !== "완료한 항목" ? "todoapp__list-tit" : "todoapp__list-tit done"
      }
    >
      {title}
    </p>

    <ul className="todoapp__list-ul">
      {todoList && // todoList가 있을때만 출력
        todoList.map((todoItem) => {
          // 삭제한 항목인 경우, 출력하지 않음 (deleted가 true)
          if (todoItem.deleted) return null;

          // checkedList 값에 따라 '할 일 목록' 또는 '완료한 목록'을 출력
          if (checkedList !== todoItem.checked) return null;

          return (
            // map을 이용하여 ToDoItem을 출력
            <MemoTodayTodoItem
              key={todoItem.id}
              todoItem={todoItem}
              todoList={todoList}
              setTodoList={setTodoList}
            />
          );
        })}
    </ul>
  </div>
);

MemoTodayTodoItemList.propTypes = {
  title: PropTypes.string.isRequired,
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  setTodoList: PropTypes.func.isRequired,
  checkedList: PropTypes.bool.isRequired,
};

export default MemoTodayTodoItemList;
