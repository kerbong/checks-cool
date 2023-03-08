import React, { useState, useEffect } from "react";
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

  // console.log(props.students);

  const [students, setStudents] = useState(props.students);
  const [studentMemo, setStudentMemo] = useState(props.item || []);
  const [memoTitle, setMemoTitle] = useState(
    props.item.title || getDateHandler(new Date())
  );

  const saveMemo = (auto) => {
    if (memoTitle) {
      const tiemStamp = () => {
        let today = new Date();
        today.setHours(today.getHours() + 9);
        return today.toISOString().replace("T", " ").substring(0, 19);
      };

      let item_id;
      //기존의 아이템인 경우 기존 아이디 쓰고
      if (props?.item?.id) {
        item_id = props.item.id;
      } else {
        item_id = tiemStamp();
      }

      let new_memo = {
        title: document.querySelector(".title-input").value,
        data: [],
        id: item_id,
      };

      //전담일 경우에만 clName 추가함
      if (props.isSubject) {
        new_memo["clName"] = props.item?.clName || props.clName;
      }

      //모든 텍스트area를 선택함.
      let memoInputAll = document.querySelectorAll(`textarea`);

      //메모가 있는 항목들을 new_memo의 data에 추가함
      memoInputAll.forEach((inputTag) => {
        if (inputTag.value.trim() !== "") {
          new_memo["data"].push({
            name: inputTag.id.split("-")[0],
            num: inputTag.id.split("-")[1],
            memo: inputTag.value,
          });
        }
      });

      // setStudentMemo((prev) => [...prev, new_memo]);

      console.log(new_memo);
      // 수동저장이면...
      if (!auto) {
        props.onClose();
        props.setItemNull();
        props.saveItemHandler(new_memo);
      } else {
        props.saveItemHandler(new_memo, auto);
      }
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
        // Swal.fire({
        //   icon: "success",
        //   title: "자료가 삭제되었어요.",
        //   text: "5초 후에 창이 사라집니다.",
        //   confirmButtonText: "확인",
        //   confirmButtonColor: "#85bd82",
        //   timer: 5000,
        // });

        props.removeData(item);
        props.onClose();
        props.setItemNull();
      }
    });
  };

  //5초마다 저장시키기
  useEffect(() => {
    let modalDiv = document.querySelector(".modal");
    let timer;
    const checkInput = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // console.log("10초 지남");

        saveMemo(true);
      }, 10000);
    };
    modalDiv.addEventListener("keydown", checkInput);
    modalDiv.addEventListener("click", checkInput);

    return () => clearTimeout(timer);
  }, []);

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
          className={`${classes["title-input"]} title-input`}
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
            if (props.students?.length === 0 || props.students === undefined) {
              Swal.fire({
                icon: "error",
                title: "저장에 실패했어요!",
                text: "메뉴의 곰돌이를 눌러서 학생명부를 먼저 입력해주세요. 학생명부가 저장 되어있는데 저장이 실패하셨다면, 새로운 학년도의 3월부터 입력이 가능합니다.",
                confirmButtonText: "확인",
                confirmButtonColor: "#85bd82",
              });
            } else {
              saveMemo(false);
              props.setItemNull();
            }
          }}
        />
      </h2>
      <p>* 10초간 입력이 없으면 자동저장</p>
      <ul className={classes["ul-section"]}>
        {students?.length > 0 &&
          students?.map((student) => (
            <li className={classes["li-section"]} key={student.num}>
              <div className={classes["num-section"]}>{student.num}</div>
              <div className={classes["name-section"]}>{student.name}</div>

              <Input
                id={student.name + "-" + student.num}
                myKey={"textArea" + student.num}
                className={"memo-section"}
                label="inputData"
                input={{
                  type: "textarea",
                }}
                defaultValue={
                  //자료가 있으면 length가 undefined가 나오고 없으면 0이 나옴. 자료 있을 때만 저장되어 있던거 보여주기
                  studentMemo?.data?.filter(
                    (data) => +student.num === +data.num
                  ).length > 0
                    ? studentMemo.data?.filter(
                        (data) => +student.num === +data.num
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
