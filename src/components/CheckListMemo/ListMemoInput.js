import React, { useState, useEffect } from "react";
import classes from "./ListMemoInput.module.css";
import Button from "../Layout/Button";
import Swal from "sweetalert2";
import Input from "../Layout/Input";
import AttendCalendar from "components/Attendance/AttendCalendar";
import dayjs from "dayjs";
import holidays2023 from "holidays2023";
import { FaArrowsRotate, FaRegCircleXmark } from "react-icons/fa6";

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
  const [studentMemo, setStudentMemo] = useState(props.item?.data || []);
  const [memoTitle, setMemoTitle] = useState(
    props.item.title || getDateHandler(new Date())
  );
  const [hasNoInputStd, setHasNoInputStd] = useState(
    props?.hasNoInputStd || []
  );
  const [showNoInput, setShowNoInput] = useState(true);
  const [nowFocusNameNum, setNowFocusNameNum] = useState("");
  const [activeStdInput, setActiveStdInput] = useState(null);
  const [deleteDone, setDeleteDone] = useState(false);
  const [textareaDefValue, setTextareaDefValue] = useState([]);

  //기존자료의 경우.. 시작날짜를 기존 날짜로!
  useEffect(() => {
    if (!props?.item?.id) return;
    setTodayYyyymmdd(props.item.id);
  }, [props.item]);

  const nowYear = (date) => {
    let data_id = date?.length > 0 ? date : new Date();
    return dayjs(data_id).format("MM-DD") <= "02-15"
      ? String(+dayjs(data_id).format("YYYY") - 1)
      : dayjs(data_id).format("YYYY");
  };

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
      //혹시나... 새 자료인데 현재 날짜의 학년도와, 데이터의 학년도가 다르면 저장불가
      if (nowYear() !== nowYear(nowOn_id)) {
        Swal.fire({
          icon: "error",
          title: "저장 불가",
          text: "현재날짜 기준의 학년도와 다른 학년도의 데이터를 새롭게 저장할 수 없습니다! * 수정은 가능함. (예 : 현재 2023학년도 인데 2022학년도 자료 추가 불가)",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          showDenyButton: false,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            return;
          }
        });

        return;
      }
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

    //전학생이 숨겨져 있을때, 전학생의 데이터가 기존 자료에 있는 경우 그것도 추가해주기
    if (props.exceptGone && props.goneStudents && props.item?.data) {
      let goneStds = !props.isSubject
        ? props.goneStudents
        : props.goneStudents?.filter((std) => std.clName === props.clName);

      goneStds?.forEach((stu) => {
        props.item?.data?.forEach((data_stu) => {
          if (+data_stu.num === +stu.num) {
            new_memo["data"].push({
              name: stu.name,
              num: stu.num,
              memo: data_stu.memo,
            });
          }
        });
      });
    }

    //만약 기존 아이템인데, 날짜를 수정할 경우 new_id를 추가해서 보냄
    if (
      props?.item?.id &&
      nowOn_id?.slice(0, 10) !== props?.item?.id?.slice(0, 10)
    ) {
      new_memo["new_id"] = nowOn_id;
    }

    // setStudentMemo((prev) => [...prev, new_memo]);

    if (new_memo.id === undefined) {
      let screenDate = document
        .querySelector(".custom-input")
        .innerText.split(" ");

      let year = "20" + screenDate[0].split("년")[0];
      let month = screenDate[1].split("월")[0].padStart(2, "0");
      let day = screenDate[2].split("일")[0].padStart(2, "0");

      new_memo.id =
        year + "-" + month + "-" + day + dayjs().format(" HH:mm:ss");
    }

    // 수동저장이면...
    if (!auto) {
      props.saveItemHandler(new_memo);
      props.onClose();
      props.setItemNull();
      localStorage.removeItem("listId");
    } else {
      props.saveItemHandler(new_memo, auto);
      localStorage.setItem("listId", item_id);
    }
  };

  const delCheckItem = (item) => {
    Swal.fire({
      title: "자료를 지울까요?",
      text: `'${item.title}' 개별기록을 삭제할까요?`,
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

  //번호순 정렬
  const sortByNum = (arr) => {
    return arr?.sort((a, b) => +a.num - +b.num);
  };

  useEffect(() => {
    // 이전 학생이 있고 만약 이전까지 포커스되어 있던 학생과 현재 포커스 학생이 다를 경우
    let new_hasNoInputStd = [...hasNoInputStd];

    let before_target = document.getElementById(nowFocusNameNum);
    let tagStudent = before_target?.id?.split("-")?.[0];
    if (!before_target) return;
    //이전 포커스 학생의 입력값이 빈칸이 아니면
    if (before_target.value?.trim() !== "") {
      // 입력값없는 학생 배열에 있는지 확인하고
      if (
        new_hasNoInputStd?.filter((std) => std.name === tagStudent)?.length > 0
      ) {
        new_hasNoInputStd = new_hasNoInputStd.filter(
          (std) => std.name !== tagStudent
        );
        setStudentMemo([...newStdData()]);
        setHasNoInputStd([...sortByNum(new_hasNoInputStd)]);
      }
      //이전 포커스 학생이 없거나 입력값이 빈칸이면
    } else if (!before_target || before_target.value?.trim() === "") {
      // 입력값 없는 학생 배열에 있는지 확인해서 없으면 넣어줌
      // console.log("입력끝 빈칸");
      if (
        new_hasNoInputStd?.filter((std) => std.name === tagStudent)?.length ===
        0
      ) {
        let addStd = {
          name: before_target?.id?.split("-")?.[0],
          num: before_target?.id?.split("-")?.[1],
          woman: before_target?.id?.split("-")?.[2],
        };
        new_hasNoInputStd.push(addStd);
        setStudentMemo([...newStdData()]);
        setHasNoInputStd([...sortByNum(new_hasNoInputStd)]);
      }
    }
  }, [activeStdInput]);

  //현재 학생들 데이터 만들기
  const newStdData = () => {
    //모든 텍스트area를 선택함.
    let new_data = [];
    let memoInputAll = document.querySelectorAll(`textarea`);

    //메모가 있는 항목들을 new_memo의 data에 추가함
    memoInputAll.forEach((inputTag) => {
      if (inputTag.value.trim() !== "") {
        new_data.push({
          name: inputTag.id.split("-")[0],
          num: inputTag.id.split("-")[1],
          memo: inputTag.value,
        });
      }
    });
    return new_data;
  };

  //삭제가 완료된 경우 다시 포커스 넣어주기 함수
  useEffect(() => {
    if (!nowFocusNameNum) return;
    //   //포커스가 사라져서.. 다시 해당 학생 포커스 해주기
    let nowTag = document.getElementById(nowFocusNameNum);
    // console.log(nowTag);
    nowTag.focus();
    setDeleteDone(false);
  }, [deleteDone]);

  //인풋창 입력시 실행되는 함수
  const getValueHandler = (e) => {
    //자료가 빈칸이 되면, 즉 삭제할 경우 무조건 미입력으로 넣어주기
    if (e.target.value === "") {
      setStudentMemo([...newStdData()]);
      setHasNoInputStd((prev) => {
        let new_data = prev;
        if (
          prev.filter((std) => std.name === e.target.id?.split("-")?.[0])
            ?.length === 0
        ) {
          new_data.push({
            name: e.target?.id?.split("-")?.[0],
            num: e.target?.id?.split("-")?.[1],
            woman: e.target?.id?.split("-")?.[2],
          });
        }
        return sortByNum(new_data);
      });
      setDeleteDone(true);
    }
    //
    gradeSelectHandler(e, e.target.id.split("-")[1]);
    setNowFocusNameNum(e.target?.id);
  };

  //미입력/입력의 학생 이름 클릭시... 해당 학생 input창에 focus 해줌
  const stdNameBtnClickHandler = (e) => {
    let stdName_num = e.target.id.slice(8);
    document.getElementById(stdName_num).focus();
  };

  const gradeSelectHandler = (e, num) => {
    let new_textareaDefV = textareaDefValue?.map((student) => {
      let new_value = student;
      if (+student.num === +num) {
        new_value = { ...student, memo: e.target.value };
      }
      return new_value;
    });
    setTextareaDefValue(new_textareaDefV);
  };

  const wholeGradeHandler = (grade) => {
    Swal.fire({
      icon: "warning",
      title: "일괄입력 확인",
      text: `${grade}로 모든 학생을 일괄입력 하시겠어요? (기존에 입력된 정보는 모두 삭제됩니다!)`,
      showDenyButton: true,
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: "취소",
      confirmButtonText: "확인",
    }).then((result) => {
      if (result.isConfirmed) {
        //textarea default state 바꿔주기
        let textareaDefV = students?.map((student) => {
          return { ...student, memo: grade };
        });
        setTextareaDefValue(textareaDefV);
      }
    });
  };

  //디폴트값 설정함수
  const setTextareaValue = (stds) => {
    let textareaDefV = stds?.map((student, std_index) => {
      let nowDefaultValue =
        studentMemo?.filter((data) => +student.num === +data.num)[0]?.memo ||
        "";
      return { ...student, memo: nowDefaultValue };
    });
    setTextareaDefValue(textareaDefV);
  };

  //textarea의 default값 설정해두기
  useEffect(() => {
    setTextareaValue(students);
  }, [students]);

  //이름과 인풋창 보여주는 함수
  const makeNameInputArea = (noInputFirst) => {
    const showInputArea = (students) => {
      return students?.map((student) => {
        return (
          <li className={classes["li-section"]} key={student.num}>
            <div className={classes["num-section"]}>{student.num}</div>
            <div className={classes["name-section"]}>{student.name}</div>
            {/*그 전에는 셀렉트 태그로 보여주기 */}
            <select
              defaultChecked={""}
              onChange={(e) => gradeSelectHandler(e, student.num)}
              className={classes["gradeSelect-section"]}
            >
              <option value="">-단계-</option>
              {props.scoreGrade?.map((grade, i) => (
                <option key={i} value={grade}>
                  {grade}
                </option>
              ))}
            </select>

            {/* 1100px넘어가면 매잘,잘,보통,노력요함,매우노력요함 버튼 보임. */}

            <Input
              id={student.name + "-" + student.num + "-" + student.woman}
              myKey={"textArea" + student.num}
              className={"memo-section"}
              label="inputData"
              input={{
                type: "textarea",
                onFocus: () => {
                  setActiveStdInput(student.name + "-" + student.num);
                },
              }}
              getValue={true}
              getValueHandler={getValueHandler}
              defaultValue={
                // //자료가 있으면 length가 undefined가 나오고 없으면 0이 나옴. 자료 있을 때만 저장되어 있던거 보여주기
                textareaDefValue?.filter((data) => +student.num === +data.num)
                  .length > 0
                  ? textareaDefValue?.filter(
                      (data) => +student.num === +data.num
                    )[0].memo
                  : ""
              }
            />
          </li>
        );
      });
    };

    //noinput stds
    let noInputArea = showInputArea(hasNoInputStd);
    //input stds
    let hasNoInputStdNames = hasNoInputStd?.map((std) => std.name);
    let hasInputStd = students.filter(
      (std) => !hasNoInputStdNames?.includes(std.name)
    );
    let inputArea = showInputArea(hasInputStd);

    return noInputFirst ? (
      <>
        {noInputArea}
        {inputArea}
      </>
    ) : (
      <>
        {inputArea}
        {noInputArea}
      </>
    );
  };

  //미입력 혹은 입력 학생들 이름버튼 보여주는 함수
  const makeStdNameBtns = (showNoInput) => {
    //input stds
    let hasNoInputStdNames = hasNoInputStd?.map((std) => std.name);
    let hasInputStd = students.filter(
      (std) => !hasNoInputStdNames?.includes(std.name)
    );

    const showStdNameBtns = (stds) => {
      return stds?.map((data) => (
        <Button
          title="클릭하면 해당학생 입력창으로 이동"
          onclick={stdNameBtnClickHandler}
          key={"hasinput" + data.name}
          id={"hasinput" + data.name + "-" + data.num + "-" + data.woman}
          name={data.name}
          className={
            data.woman ? "listMemoNoInputStd-btn" : "listMemoNoInputStd-btn-man"
          }
        />
      ));
    };

    return showNoInput
      ? showStdNameBtns(hasNoInputStd)
      : showStdNameBtns(hasInputStd);
  };

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
              <FaRegCircleXmark />
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
                  getYearValue={getMonthHandler}
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
          <div className={classes["lineH-1"]}>
            <Button
              onclick={() => setShowNoInput((prev) => !prev)}
              className={"checkList-button"}
              style={{ backgroundColor: "#e5b8b8" }}
              icon={<FaArrowsRotate />}
              name={
                showNoInput
                  ? ` 미입력 (${hasNoInputStd?.length})`
                  : ` 입력(${students.length - hasNoInputStd?.length})`
              }
            />{" "}
            &nbsp;
            {makeStdNameBtns(showNoInput)}
          </div>
          {/* 입력학생 */}
          <div></div>
        </div>
      </h2>

      <p className={classes["upDownDiv"]}>
        * 10초간 입력이 없으면 자동저장
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;일괄입력&nbsp;
        {props.scoreGrade?.map((grade) => (
          <Button
            key={"whole" + grade}
            onclick={() => wholeGradeHandler(grade)}
            name={grade}
            className={"checkList-button"}
            style={{ backgroundColor: "#e5b8b8" }}
          />
        ))}
      </p>
      <ul className={classes["ul-section"]}>
        {students?.length > 0 && (
          <>
            {/* 미입력 학생만 먼저 보여주고 */}

            {makeNameInputArea(showNoInput)}
            {/* 나머지 입력 학생들은 아래에 보여주기 */}
          </>
        )}
      </ul>
    </>
  );
};

export default ListMemoInput;
