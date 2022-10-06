import React from "react";
import classes from "./TodoPublicInput.module.css";
import Button from "../Layout/Button";

import Swal from "sweetalert2";

const TodoPublicInput = (props) => {
  const publicRoomHandler = (e) => {
    e.preventDefault();
    let schoolName = document
      .getElementById("todo-schoolName")
      .value.replace(/ /g, "");
    let grade = document.getElementById("todo-grade").value.replace(/ /g, "");
    let publicPw = document
      .getElementById("todo-publicPw")
      .value.replace(/ /g, "");

    if (
      schoolName.includes("-") ||
      grade.includes("-") ||
      publicPw.includes("-")
    ) {
      Swal.fire({
        icon: "error",
        title: "저장에 실패했습니다.",
        text: "'-'는 사용할 수 없어요!",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 3000,
      });
      return;
    }

    let publickRoomData = `${schoolName}-${grade}-${publicPw}`;
    props.setPublicRoom(publickRoomData);
    localStorage.setItem("todoPublicRoom", publickRoomData);
  };

  return (
    <>
      <div className={classes["explain-span"]}>
        <h2 className={classes["header-area"]}>공용그룹 생성 / 변경</h2>
        <span>
          *해당정보로 설정된 공용그룹이 없을 경우 생성, 있을 경우 접속합니다.
        </span>
      </div>
      <form onSubmit={publicRoomHandler} className={classes["form-area"]}>
        <input
          type="text"
          placeholder="학교명"
          id={"todo-schoolName"}
          className={classes["schoolName-area"]}
          autoFocus
          required
        />
        <input
          type="text"
          placeholder="학년"
          id={"todo-grade"}
          className={classes["grade-area"]}
          autoFocus
          required
        />
        <input
          type="text"
          placeholder="비밀번호"
          id={"todo-publicPw"}
          className={classes["publicPw-area"]}
          autoFocus
          required
        />

        <Button
          className="event-fix-btn"
          name="저장"
          id={"save-todoPublicBtn"}
          onclick={(e) => {
            publicRoomHandler(e);
          }}
        />
      </form>
    </>
  );
};

export default TodoPublicInput;
