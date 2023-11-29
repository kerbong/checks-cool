import React, { useState, useEffect } from "react";
import StudentBtn from "../Student/StudentBtn";

import classes from "./CheckLists.module.css";
import Button from "../Layout/Button";
import AttendCalendar from "components/Attendance/AttendCalendar";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import holidays2023 from "holidays2023";

const CheckInput = (props) => {
  const [checkTitle, setCheckTitle] = useState(
    props.item ? props.item.title : ""
  );
  const [students, setStudents] = useState([]);
  const [showCal, setShowCal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));
  const [todayYyyymmdd, setTodayYyyymmdd] = useState(new Date());

  const [unSubmitStudents, setUnSubmitStudents] = useState([]);

  const [submitStudents, setSubmitStudents] = useState([]);

  useEffect(() => {
    if (props.exceptGone && props.goneStudents && props.unSubmitStudents) {
      let goneStds = !props.isSubject
        ? props.goneStudents
        : props.goneStudents?.filter((std) => std.clName === props.clName);

      let new_unSubmitStudents = props.unSubmitStudents?.filter((stu) => {
        return !goneStds.some(
          (g_stu) => +g_stu.num === +stu.num && g_stu.name === stu.name
        );
      });

      let new_students = props.students?.filter((stu) => {
        return !goneStds.some(
          (g_stu) => +g_stu.num === +stu.num && g_stu.name === stu.name
        );
      });

      // 중복되는 학생들 있을 수 있어서.. 제거해줌!
      setUnSubmitStudents(
        uniqueArray(new_unSubmitStudents.sort((a, b) => +a.num - +b.num))
      );
      setStudents(new_students.sort((a, b) => +a.num - +b.num));
    } else {
      // 중복되는 학생들 있을 수 있어서.. 제거해줌!
      setUnSubmitStudents(
        uniqueArray(props.unSubmitStudents.sort((a, b) => +a.num - +b.num))
      );
      setStudents(props.students.sort((a, b) => +a.num - +b.num));
    }
  }, [props.unSubmitStudents, props.students]);

  useEffect(() => {
    let new_students = students
      ?.filter(
        (stu1) => !unSubmitStudents?.some((stu2) => +stu1.num === +stu2.num)
      )
      .sort((a, b) => +a.num - +b.num);

    new_students = uniqueArray(new_students);
    setSubmitStudents(new_students);
  }, [students]);
  //기존자료의 경우.. 시작날짜를 기존 날짜로하고 새로운 자료의 경우, 전학생을 제외하고 보여주기
  useEffect(() => {
    if (!props?.item?.id) return;
    setTodayYyyymmdd(props.item.id.slice(0, 10));
  }, [props.item]);

  const calDateHandler = (date) => {
    setTodayYyyymmdd(dayjs(date).format("YYYY-MM-DD"));
  };

  /** 달력에서 받은 month로 currentMonth변경하기 */
  const getMonthHandler = (month) => {
    setCurrentMonth(dayjs(month).format("YYYY-MM"));
  };

  /** 중복학생 제외 함수 */
  const uniqueArray = (students) => {
    let new_students = students.reduce((accumulator, current) => {
      const duplicate = accumulator.find(
        (item) => item.name === current.name && +item.num === +current.num
      );
      if (!duplicate) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);

    return new_students;
  };

  const changeUnSubmitStudents = (studentInfo) => {
    let new_unSubmitStudents;
    let new_submitStudents;
    let existedUnsubmit =
      unSubmitStudents?.filter((stu) => +stu.num === +studentInfo.num)
        .length !== 0;
    //안낸 사람에 있으면 제거
    if (existedUnsubmit) {
      new_unSubmitStudents = unSubmitStudents?.filter(
        (stu) => +stu.num !== +studentInfo.num
      );
      new_submitStudents = submitStudents.concat(studentInfo);
      //안낸 사람에 없으면 추가
    } else {
      new_unSubmitStudents = unSubmitStudents.concat(studentInfo);
      new_submitStudents = submitStudents?.filter(
        (stu) => +stu.num !== +studentInfo.num
      );
    }
    //이름만 모아두고
    let new_unSubmitStudentsNames = new_unSubmitStudents?.map(
      (std) => std.name
    );
    //성별정보 없을 수 있어서.. 성별 있는걸로 다시 만들어주고
    new_unSubmitStudents = students?.filter((std) =>
      new_unSubmitStudentsNames?.includes(std.name)
    );
    new_submitStudents = students?.filter((std) =>
      new_submitStudents.some((stu) => +stu.num === +std.num)
    );

    //번호순으로 정렬하기
    new_unSubmitStudents.sort((a, b) => +a.num - +b.num);
    new_submitStudents.sort((a, b) => +a.num - +b.num);

    //중복제거하기
    new_unSubmitStudents = uniqueArray(new_unSubmitStudents);
    setUnSubmitStudents(new_unSubmitStudents);

    //중복제거하기
    new_submitStudents = uniqueArray(new_submitStudents);
    setSubmitStudents(new_submitStudents);
  };

  const saveCheckItem = (auto) => {
    let tempId = localStorage.getItem("itemId");
    let item_id;
    //현재 화면의 아이디
    let nowOn_id;
    let screenDate = document
      .querySelector(".custom-input")
      .innerText.split(" ");

    let year = "20" + screenDate[0].split("년")[0];
    let month = screenDate[1].split("월")[0].padStart(2, "0");
    let day = screenDate[2].split("일")[0].padStart(2, "0");

    nowOn_id = year + "-" + month + "-" + day + dayjs().format(" HH:mm:ss");

    //기존의 아이템인 경우 기존 아이디 쓰고
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
    //처음 새로운 자료 자동 저장할 때는 null 임..
    //처음 자동 저장되면 처음 저장하면 시간으로 tempId 찍힘

    //기존 아이템이면 innerText 새로운거면 input의 value
    let titleValue = document.getElementById("title-input")?.value;

    //타이틀 없으면(새로운 자료면) 오류내용 보여줌.
    if (titleValue?.trim()?.length === 0) {
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

    let new_checkItem = {
      title: titleValue || checkTitle,
      unSubmitStudents,
      id: item_id,
      // fixOrNew,
    };

    //전담일경우 학급만 추가로 저장
    if (props.isSubject) {
      new_checkItem["clName"] =
        document.getElementById("item-clName").innerText;
    }

    //전학생이 숨겨져 있을때, 전학생의 데이터가 기존 자료에 있는 경우 그것도 추가해주기
    if (props.exceptGone && props.goneStudents && props.unSubmitStudents) {
      let goneStds = !props.isSubject
        ? props.goneStudents
        : props.goneStudents?.filter((std) => std.clName === props.clName);

      goneStds?.forEach((stu) => {
        props.unSubmitStudents?.forEach((data_stu) => {
          if (+data_stu.num === +stu.num) {
            new_checkItem["unSubmitStudents"].push({
              name: stu.name,
              num: stu.num,
            });
          }
        });
      });
    }

    //만약 기존 아이템인데, 날짜를 수정할 경우 new_id를 추가해서 보냄
    //만약 기존 아이템인데, 날짜를 수정할 경우 new_id를 추가해서 보냄
    if (
      props?.item?.id &&
      nowOn_id?.slice(0, 10) !== props?.item?.id?.slice(0, 10)
    ) {
      new_checkItem["new_id"] = nowOn_id;
    }

    // 수동저장이면...
    if (!auto) {
      props.saveItemHandler(new_checkItem);
      props.onClose();
      props.setItemNull();
      localStorage.removeItem("itemId");
    } else {
      localStorage.setItem("itemId", item_id);
      props.saveItemHandler(new_checkItem, auto);
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
  const changeSubmitHandler = () => {
    let new_unSubmitStudents = JSON.parse(JSON.stringify(unSubmitStudents));
    setUnSubmitStudents([...submitStudents]);
    setSubmitStudents((prev) => [...new_unSubmitStudents]);

    //바꾸기 버튼 수정 필요함...
  };

  //10초마다 저장시키기
  useEffect(() => {
    let timer;
    const checkInput = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // console.log("10초 지남");
        // if (props.unSubmitStudents) {
        if (
          JSON.stringify(props.unSubmitStudents) !==
          JSON.stringify(unSubmitStudents)
        ) {
          saveCheckItem(true);
        }
      }, 10000);
    };
    checkInput();
    return () => clearTimeout(timer);
  }, [unSubmitStudents]);

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

  return (
    <>
      <div className={classes.div}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveCheckItem(false);
          }}
        >
          {props.item.title ? (
            <div className={classes.h2}>
              {/* 전담이면 학급명 보여주기 */}
              {props.isSubject && (
                <span className={classes["div-left"]} id="item-clName">
                  {props.item.clName}
                </span>
              )}
              {/* 날짜 화면 보여주기 */}

              <div
                className={classes["date-title"]}
                onClick={() => setShowCal((prev) => !prev)}
              >
                <span style={{ fontSize: "1.2rem" }}>
                  <AttendCalendar
                    getDateValue={calDateHandler}
                    about="main"
                    setStart={new Date(todayYyyymmdd)}
                    getMonthValue={getMonthHandler}
                  />
                </span>
              </div>

              {/* <h2 id={"title-input"}>{checkTitle}</h2> */}
              <input
                type="text"
                placeholder="제목"
                id={"title-input"}
                value={checkTitle || ""}
                onChange={(e) => setCheckTitle(e.target.value)}
                className={classes.checkTitle}
              />
            </div>
          ) : (
            <>
              {/* 전담이면 학급명 보여주기 */}
              {props.isSubject && (
                <span className={classes["div-left"]} id="item-clName">
                  {props.clName}
                </span>
              )}
              {/* 날짜 화면 보여주기 */}

              <div
                className={classes["date-title"]}
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
                placeholder="제목"
                id={"title-input"}
                value={checkTitle || ""}
                onChange={(e) => setCheckTitle(e.target.value)}
                className={classes.checkTitle}
              />
            </>
          )}
        </form>

        <span
          className={classes.closeBtn}
          onClick={() => {
            localStorage.removeItem("itemId");
            props.onClose();
            props.setItemNull();
          }}
        >
          <i className="fa-regular fa-circle-xmark"></i>
        </span>
      </div>
      <div>
        <h3 className={classes.h3}> 미 제 출 ({unSubmitStudents?.length})</h3>
        <div className={classes.div}>
          {/* 미제출 학생 보여주기 */}
          {unSubmitStudents &&
            unSubmitStudents?.map((stu) => (
              <StudentBtn
                className={"checklist-student"}
                name={stu.name}
                key={stu.num}
                woman={stu.woman}
                num={stu.num}
                onShowOption={() => {
                  let studentInfo = { num: +stu.num, name: stu.name };
                  changeUnSubmitStudents(studentInfo);
                }}
              />
            ))}
        </div>
        <div className={classes.upDownDiv}>
          <span className={classes.upDownDivHr}>
            <hr className={classes.hr} />
          </span>
          <span>
            {/* 제출 미제출 한번에 교체하는 버튼 */}
            <Button
              icon={<i className="fa-solid fa-arrows-up-down"></i>}
              id={"add-checkItemBtn"}
              className={"change-submit-button"}
              onclick={changeSubmitHandler}
            />
          </span>
          <span className={classes.upDownDivHr}>
            <hr className={classes.hr} />
          </span>
        </div>
        <h3 className={classes.h3}> 제 출 ({submitStudents?.length})</h3>

        <div className={classes.div}>
          {/* 제출 학생 보여주기 */}
          {submitStudents?.map((stu) => (
            <StudentBtn
              className={"checklist-student"}
              name={stu.name}
              key={stu.num}
              num={stu.num}
              woman={stu.woman}
              onShowOption={() => {
                let studentInfo = { num: +stu.num, name: stu.name };
                changeUnSubmitStudents(studentInfo);
              }}
            />
            /* 여기에 reducer함수 실행해서.. students 배열에서 상태 바꾸기 온클릭 함수에 해당함  */
          ))}
        </div>
        <p className={classes["upDownDiv"]}>* 10초간 입력이 없으면 자동저장</p>
        <Button
          name={"저장"}
          id={"add-checkItemBtn"}
          className={"save-checkItem-button"}
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
              saveCheckItem(false);
            }
          }}
        />
        {props.item.id && (
          <Button
            name={"삭제"}
            id={"del-checkItemBtn"}
            className={"del-checkItem-button"}
            onclick={() => {
              delCheckItem(props.item);
              // props.setItemNull();
            }}
          />
        )}
      </div>
    </>
  );
};

export default CheckInput;
