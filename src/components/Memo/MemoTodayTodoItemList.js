import React from "react";
import PropTypes from "prop-types";
import MemoTodayTodoItem from "./MemoTodayTodoItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";

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

  //완료한 항목 전체삭제 버튼 실행 함수
  const checkedDelAllHandler = () => {
    // 전달 받은 전체목록에서, checked false만 찾아서 props.setTodoList 로 보냄
    Swal.fire({
      icon: "warning",
      title: "전체 삭제",
      text: "완료한 항목을 모두 삭제할까요? (삭제된 자료는 복구되지 않습니다!)",
      showDenyButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setTodoList(todoList?.filter((data) => !data.checked));
      }
    });
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
        {/* 완료한 항목일 경우 전체삭제버튼 추가 */}
        {title === "완료한 항목" && (
          <button
            className="todoapp__inputbox-del-btn"
            onClick={checkedDelAllHandler}
          >
            전체삭제
          </button>
        )}
      </p>

      {!checkedList && (
        // {/* 드래그 앤 드롭으로 순서 변경가능 */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todoapp__list-ul">
            {(provided, index1) => (
              <div
                className="todoapp__list-ul"
                {...provided.droppableProps}
                ref={provided.innerRef}
                key={index1}
              >
                {todoList && // todoList가 있을때만 출력
                  todoList?.map((todoItem, index2) => {
                    // checkedList 값에 따라 '할 일 목록' 또는 '완료한 목록'을 출력
                    if (checkedList !== todoItem.checked) return null;
                    return (
                      <Draggable
                        draggableId={String(todoItem.id)}
                        index={index2}
                        key={String(todoItem.id)}
                      >
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            key={`draggable-${todoItem.id}`}
                          >
                            {/* // map을 이용하여 ToDoItem을 출력 */}
                            <MemoTodayTodoItem
                              key={todoItem.id + todoItem.text}
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
                <>
                  {/* // map을 이용하여 ToDoItem을 출력 */}
                  <MemoTodayTodoItem
                    key={todoItem.id + todoItem.text}
                    todoItem={todoItem}
                    todoList={todoList}
                    setTodoList={setTodoList}
                  />
                </>
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
