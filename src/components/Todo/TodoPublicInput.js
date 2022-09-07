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
    console.log(publickRoomData);
    localStorage.setItem("todoPublicRoom", publickRoomData);
  };

  return (
    <>
      <h2 className={classes["header-area"]}>공용으로 사용할 정보</h2>

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
          placeholder="간단한 비밀번호"
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
