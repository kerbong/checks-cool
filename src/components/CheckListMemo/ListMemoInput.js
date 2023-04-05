import React, { useState, useEffect } from "react";
import classes from "./ListMemoInput.module.css";
import Button from "../Layout/Button";
import Swal from "sweetalert2";
import Input from "../Layout/Input";
import AttendCalendar from "components/Attendance/AttendCalendar";
import dayjs from "dayjs";
import holidays2023 from "holidays2023";

const ListMemoInput = (props) => {
  const getDateHandler = (date) => {
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let weekd = date.getDay();
    let weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    return `${month}월 ${day}일(${weekDays[weekd]})`;
  };

  const [showCal, setShowCal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));
  const [todayYyyymmdd, setTodayYyyymmdd] = useState(new Date());
  const [students, setStudents] = useState(props.students);
  const [studentMemo, setStudentMemo] = useState(props.item || []);
  const [memoTitle, setMemoTitle] = useState(
    props.item.title || getDateHandler(new Date())
  );
  const [hasNoInputStd, setHasNoInputStd] = useState(props.hasNoInputStd || []);

  //기존자료의 경우.. 시작날짜를 기존 날짜로!
  useEffect(() => {
    if (!props?.item?.id) return;
    setTodayYyyymmdd(props.item.id);
  }, [props.item]);

  const saveMemo = (auto) => {
    let tempId = localStorage.getItem("listId");
    let item_id;
    let nowOn_id;
    setTodayYyyymmdd((prev) => {
      nowOn_id = dayjs(prev).format("YYYY-MM-DD") + dayjs().format(" HH:mm:ss");
      return prev;
    });

    //기존의 아이템이거나.. 임시로 저장된 tempIdTitle이 있으면 넣어주기
    if (props?.item?.id || (tempId !== "null" && tempId)) {
      item_id = props.item.id || tempId;
      //완전 새거면.. 최신..현재 상태의 값으로 만든 시간 넣어주기
    } else {
      item_id = nowOn_id;
    }

    //혹시나.. id가 null같은게 들어가 있으면 현재 시간으로 찍어줌..!
    if (item_id === null || item_id === "null") {
      item_id = dayjs().format("YYYY-MM-DD HH:mm:ss");
    }
    //새로운 아이템인데 10초간 입력이 없으면 자동저장하지 않음.

    let titleTag = document.querySelector(".title-input");

    //타이틀 태그가 없거나 빈칸이면 저장 안함
    if (!titleTag || titleTag.value.trim().length === 0) return;

    let new_memo = {
      title: titleTag.value,
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

    //만약 기존 아이템인데, 날짜를 수정할 경우 new_id를 추가해서 보냄
    if (
      props?.item?.id &&
      nowOn_id?.slice(0, 10) !== props?.item?.id?.slice(0, 10)
    ) {
      new_memo["new_id"] = nowOn_id;
    }

    // setStudentMemo((prev) => [...prev, new_memo]);

    // 수동저장이면...
    if (!auto) {
      props.onClose();
      props.setItemNull();
      props.saveItemHandler(new_memo);
      localStorage.removeItem("listId");
    } else {
      props.saveItemHandler(new_memo, auto);
      localStorage.setItem("listId", item_id);
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
        props.removeData(item);
        props.onClose();
        props.setItemNull();
      }
    });
  };

  //10초마다 저장시키기
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

    return () => clearTimeout(timer);
  }, []);

  const calDateHandler = (date) => {
    setTodayYyyymmdd(dayjs(date).format("YYYY-MM-DD"));
  };

  //달력에서 받은 month로 currentMonth변경하기
  const getMonthHandler = (month) => {
    setCurrentMonth(dayjs(month).format("YYYY-MM"));
  };

  //휴일 달력에 그려주기!
  useEffect(() => {
    if (!currentMonth) return;
    holidays2023?.forEach((holiday) => {
      if (holiday[0] === currentMonth) {
        let holiday_queryName = holiday[1].split("*");
        let holidayTag = document.querySelectorAll(holiday_queryName[0])[0];
        if (!holidayTag) return;
        // console.log(holidayTag.classList.contains("eventAdded"));
        if (holidayTag.classList.contains("eventAdded")) return;

        const btn = document.createElement("button");
        btn.className = `${classes.holidayData} eventBtn`;
        btn.innerText = holiday_queryName[1];
        holidayTag?.appendChild(btn);
        holidayTag.style.borderRadius = "5px";

        holidayTag.classList.add("eventAdded");
      }
    });
  }, [currentMonth, showCal]);

  const hasNoInputStdHandler = (e) => {
    let inputTag = e.target;
    // console.log(inputTag.value)
    let new_hasNoInputStd = [...hasNoInputStd];
    let tagStudent = inputTag?.id?.split("-")?.[0];
    //입력값이 빈칸이 아니면
    if (inputTag.value.trim() !== "") {
      // 입력값없는 학생 배열에 있는지 확인하고
      if (new_hasNoInputStd?.filter((std) => std === tagStudent)?.length > 0) {
        new_hasNoInputStd = new_hasNoInputStd.filter(
          (std) => std !== tagStudent
        );
        setHasNoInputStd(new_hasNoInputStd);
      }
      //입력값이 빈칸이 되면
    } else {
      // 입력값 없는 학생 배열에 있는지 확인해서 없으면 넣어줌
      if (
        new_hasNoInputStd?.filter((std) => std === tagStudent)?.length === 0
      ) {
        new_hasNoInputStd = new_hasNoInputStd.push(tagStudent);
        setHasNoInputStd(new_hasNoInputStd);
      }
    }
  };

  // useEffect(() => {
  //   // 모든 텍스트area를 선택함.
  //   let memoInputAll = document.querySelectorAll(`textarea`);
  //   // //메모가 있는 항목들을 new_memo의 data에 추가함
  //   memoInputAll.forEach((inputTag) => {
  //     inputTag.addEventListener("keydown", hasNoInputStdHandler);
  //     //   if (inputTag.value.trim() !== "") {
  //     //     new_memo["data"].push({
  //     //       name: inputTag.id.split("-")[0],
  //     //       num: inputTag.id.split("-")[1],
  //     //       memo: inputTag.value,
  //     //     });
  //     //   }
  //   });
  // }, []);

  return (
    <>
      <h2 className={classes["title-section"]}>
        <div className={classes["title-dateInputBtnDiv"]}>
          <div className={classes["x-classDiv"]}>
            <p
              className={classes["listMemo-closeBtn"]}
              onClick={() => {
                localStorage.removeItem("listId");
                props.onClose();
                props.setItemNull();
              }}
            >
              <i className="fa-regular fa-circle-xmark"></i>
            </p>
            {props.isSubject && (
              <div className={classes["fs-1"]}>
                {" "}
                {props.item?.clName || props.clName}
              </div>
            )}
          </div>

          {/* 전담이면 학급명도 보여줌 */}
          {/* 날짜와 제목창 */}
          <div className={classes["date-title"]}>
            {/* 날짜 화면 보여주기 */}
            <div
              className={classes["date"]}
              onClick={() => setShowCal((prev) => !prev)}
            >
              {/* 오늘 날짜 보여주는 부분 날짜 클릭하면 달력도 나옴 */}

              {/* {titleDate} */}
              {/* 오늘 날짜 보여주는 부분 날짜 클릭하면 달력도 나옴 */}
              <span style={{ fontSize: "1.2rem" }}>
                <AttendCalendar
                  getDateValue={calDateHandler}
                  about="main"
                  setStart={new Date(todayYyyymmdd)}
                  getMonthValue={getMonthHandler}
                />
              </span>
            </div>
            <input
              type="text"
              placeholder="명렬표 기록 제목"
              onChange={(e) => setMemoTitle(e.target.value)}
              value={memoTitle}
              className={`${classes["title-input"]} title-input`}
              autoFocus
            />{" "}
          </div>

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
              if (
                props.students?.length === 0 ||
                props.students === undefined
              ) {
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
        </div>

        {/* 미입력/입력학생 보여주기*/}
        <div>
          <div>
            미입력 ({hasNoInputStd?.length}){" "}
            {hasNoInputStd?.map((data) => (
              <Button
                key={"hasinput" + data}
                id={"hasinput" + data}
                name={data}
                className={"checkList-button"}
              />
            ))}
          </div>
          {/* 입력학생 */}
          <div></div>
        </div>
      </h2>

      <p className={classes["upDownDiv"]}>* 10초간 입력이 없으면 자동저장</p>
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