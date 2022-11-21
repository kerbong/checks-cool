import React, { useState } from "react";
import classes from "./ListMemoInput.module.css";
import Button from "../Layout/Button";
import Swal from "sweetalert2";
import Input from "../Layout/Input";

const ListMemoInput = (props) => {
  const getDateHandler = (date) => {
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let weekd = date.getDay();
    let weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    return `${month}월 ${day}일(${weekDays[weekd]})`;
  };

  const [students, setStudents] = useState(props.students);
  const [studentMemo, setStudentMemo] = useState(props.item || []);
  const [memoTitle, setMemoTitle] = useState(
    props.item.title || getDateHandler(new Date())
  );

  const saveMemo = () => {
    if (memoTitle) {
      let new_memo = {
        title: memoTitle,
        data: [],
      };
      //모든 텍스트area를 선택함.
      let memoInputAll = document.querySelectorAll(`textarea`);

      //메모가 있는 항목들을 new_memo의 data에 추가함
      memoInputAll.forEach((inputTag) => {
        if (inputTag.value.trim() !== "") {
          let student_name = students.filter(
            (stu) => stu.num === inputTag.getAttribute("id")
          )[0].name;
          console.log(student_name);

          new_memo["data"].push({
            student_num: inputTag.id,
            student_name,
            memo: inputTag.value,
          });
          // console.log(new_memo);
        }
      });

      setStudentMemo((prev) => [...prev, new_memo]);

      console.log(new_memo);
      console.log(studentMemo);

      props.saveItemHandler(new_memo, props.item.doc_id);
      props.onClose();
      props.setItemNull();
    } else {
      Swal.fire({
        icon: "error",
        title: "정보가 부족해요!",
        text: "체크리스트 제목을 입력해주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return;
    }
  };

  const delCheckItem = (item) => {
    Swal.fire({
      title: "자료를 지울까요?",
      text: `${item.title} 체크리스트를 삭제할까요?`,
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

        props.removeData(item);
        props.onClose();
        props.setItemNull();
      }
    });
  };

  return (
    <>
      <h2 className={classes["title-section"]}>
        <p
          className={classes["listMemo-closeBtn"]}
          onClick={() => {
            props.onClose();
            props.setItemNull();
          }}
        >
          <i className="fa-regular fa-circle-xmark"></i>
        </p>
        <input
          type="text"
          placeholder="명렬표 기록 제목"
          onChange={(e) => setMemoTitle(e.target.value)}
          value={memoTitle}
          className={classes["title-input"]}
          autoFocus
        />{" "}
        <Button
          name={"삭제"}
          id={"del-checkItemBtn"}
          style={{ display: props.item.length === 0 && "none" }}
          className={"save-listMemo-button"}
          onclick={() => {
            delCheckItem(props.item);
          }}
        />
        <Button
          name={"저장"}
          id={"add-checkItemBtn"}
          className={"save-listMemo-button"}
          onclick={() => {
            if (props.students.length === 0) {
              Swal.fire({
                icon: "error",
                title: "저장에 실패했어요!",
                text: "메뉴의 곰돌이를 눌러서 학생명단을 먼저 입력해주세요.",
                confirmButtonText: "확인",
                confirmButtonColor: "#85bd82",
                timer: 5000,
              });
            } else {
              saveMemo();
              props.setItemNull();
            }
          }}
        />
      </h2>
      <ul className={classes["ul-section"]}>
        {students.length > 0 &&
          students.map((student) => (
            <li className={classes["li-section"]} key={student.num}>
              <div className={classes["num-section"]}>{student.num}</div>
              <div className={classes["name-section"]}>{student.name}</div>

              <Input
                id={student.num}
                myKey={"textArea" + student.num}
                className={"memo-section"}
                label="inputData"
                input={{
                  type: "textarea",
                }}
                defaultValue={
                  //자료가 있으면 length가 undefined가 나오고 없으면 0이 나옴. 자료 있을 때만 저장되어 있던거 보여주기
                  studentMemo?.data?.filter(
                    (data) => student.num === data.student_num
                  ).length > 0
                    ? studentMemo.data.filter(
                        (data) => student.num === data.student_num
                      )[0].memo
                    : ""
                }
              />
            </li>
          ))}
      </ul>
    </>
  );
};

export default ListMemoInput;
