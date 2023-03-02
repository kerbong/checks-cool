import React from "react";
import PropTypes from "prop-types";
import MemoTodayTodoItem from "./MemoTodayTodoItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MemoTodayTodoItemList = ({
  title,
  todoList,
  setTodoList,
  checkedList,
  dragEndHandler,
}) => {
  const onDragEnd = (res) => {
    dragEndHandler(res);
  };

  return (
    <div className="todoapp__list">
      {/* props로 부터 title 값을 전달 받음 */}
      <p
        className={
          title !== "완료한 항목"
            ? "todoapp__list-tit"
            : "todoapp__list-tit done"
        }
      >
        {title}
      </p>

      {!checkedList && (
        // {/* 드래그 앤 드롭으로 순서 변경가능 */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todoapp__list-ul">
            {(provided) => (
              <div
                className="todoapp__list-ul"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todoList && // todoList가 있을때만 출력
                  todoList?.map((todoItem, index) => {
                    // checkedList 값에 따라 '할 일 목록' 또는 '완료한 목록'을 출력
                    if (checkedList !== todoItem.checked) return null;

                    return (
                      <Draggable
                        draggableId={String(todoItem.id)}
                        index={index}
                        key={String(todoItem.id)}
                      >
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {/* // map을 이용하여 ToDoItem을 출력 */}
                            <MemoTodayTodoItem
                              key={todoItem.id}
                              todoItem={todoItem}
                              todoList={todoList}
                              setTodoList={setTodoList}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {checkedList && (
        <ul className="todoapp__list-ul">
          {todoList && // todoList가 있을때만 출력
            todoList?.map((todoItem, index) => {
              // checkedList 값에 따라 '할 일 목록' 또는 '완료한 목록'을 출력
              if (checkedList !== todoItem.checked) return null;

              return (
                // {/* // map을 이용하여 ToDoItem을 출력 */}
                <MemoTodayTodoItem
                  key={todoItem.id}
                  todoItem={todoItem}
                  todoList={todoList}
                  setTodoList={setTodoList}
                />
              );
            })}
        </ul>
      )}
    </div>
  );
};

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
