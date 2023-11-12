import React, { useState, useEffect } from "react";
import classes from "./Alarm.module.css";
import AttendCalendar from "../../Attendance/AttendCalendar";
import dayjs from "dayjs";
import Input from "components/Layout/Input";
import Swal from "sweetalert2";
import { dbService } from "../../../fbase";
import { onSnapshot, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { utils, writeFile } from "xlsx";
import holidays2023 from "holidays2023";
import userEvent from "@testing-library/user-event";
import AssistanceAi from "../AssistanceAi/AssistanceAi";

const getDateHandler = (date, titleOrQuery) => {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  if (titleOrQuery === "title") {
    let weekd = date.getDay();
    let weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    return `${year}년 ${month}월 ${day}일(${weekDays[weekd]})`;
  } else {
    return year + "-" + month + "-" + day;
  }
};

const FONTSIZE = ["40px", "50px", "60px", "70px", "80px"];

const Alarm = (props) => {
  const [todayYyyymmdd, setTodayYyyymmdd] = useState(
    getDateHandler(new Date())
  );
  const [titleDate, setTitleDate] = useState(
    getDateHandler(new Date(), "title")
  );
  const [isMobile, setIsMobile] = useState(null);
  const [fontSize, setFontSize] = useState("50px");
  const [alarmLists, setAlarmLists] = useState([]);
  const [todayAlarm, setTodayAlarm] = useState({});
  const [showCal, setShowCal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));
  const [showTodayDate, setShowTodayDate] = useState(true);
  const [tableMessage, setTableMessage] = useState("");
  const [scheduleMessage, setScheduleMessage] = useState("");
  const [wholeMessage, setWholeMessage] = useState("");

  //해당 pc에 설정이 꺼져있는지 확인하기
  useEffect(() => {
    let show_state = localStorage.getItem("alarmShowTodayDate");
    if (show_state === false || show_state === "false") {
      setShowTodayDate(false);
    }
  }, []);

  const getAlarmFromDb = async () => {
    let alarmRef = doc(dbService, "alarm", props.userUid);

    onSnapshot(alarmRef, (doc) => {
      setAlarmLists([]);
      const new_lists = [];
      doc?.data()?.alarm_data?.forEach((data) => {
        new_lists.push(data);
      });
      setAlarmLists([...new_lists]);
    });
  };

  useEffect(() => {
    getAlarmFromDb();
  }, [todayYyyymmdd]);

  useEffect(() => {
    if (alarmLists.length > 0) {
      let todayData = {};
      alarmLists?.forEach((al) => {
        if (al.id === todayYyyymmdd) {
          todayData = al;
        }
      });

      setTodayAlarm(todayData);
    }
  }, [alarmLists]);

  useEffect(() => {
    let is_mobile = /iPhone|iPad|iPod|Android/i.test(
      window.navigator.userAgent
    );
    if (is_mobile) {
      setIsMobile(is_mobile);
    } else {
      setIsMobile(false);
    }
  }, [window.navigator.userAgent]);

  useEffect(() => {
    if (isMobile) {
      document.getElementById("board-input").style.fontSize = "25px";
      setFontSize("25px");
    }
  }, [isMobile]);

  //5초마다 저장시키기
  useEffect(() => {
    let textArea = document.getElementById("board-input");
    let timer;
    const checkInput = () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        // console.log("5초 지남");

        await saveHandler();
      }, 5000);
    };
    textArea.addEventListener("keydown", checkInput);

    return () => clearTimeout(timer);
  }, [todayYyyymmdd]);

  const calDateHandler = (date) => {
    let weekd = dayjs(date).format("d");
    let weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    setTodayYyyymmdd(dayjs(date).format("YYYY-MM-DD"));
    setTitleDate(dayjs(date).format(`YYYY년 MM월 DD일(${weekDays[weekd]})`));
  };

  //줄을 넘어가면 swal로 알려주고 내용 삭제..
  const maxRowAlert = (error) => {
    let text;
    if (error === "enter") {
      text =
        "입력 가능한 줄을 초과했어요! 글자크기를 줄이시거나 내용을 줄여주세요.";
    } else if (error === "length") {
      text =
        "입력가능한 글자수를 초과했어요! 글자크기를 줄이시거나 내용을 줄여주세요.";
    }
    Swal.fire({
      icon: "error",
      title: "입력 불가",
      text: text,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    }).then(() => {
      let textValue = document.getElementById("board-input");
      textValue.value = textValue.value.slice(0, -2);

      textValue.innerText = textValue.value;
    });
  };

  //전체내용 삭제함수
  const deleteAll = () => {
    let textValue = document.getElementById("board-input");
    textValue.value = "";
    textValue.innerText = "";
  };

  //전체 알림장 엑셀로 저장하기
  const excelSave = () => {
    const new_datas = [];
    alarmLists.forEach((alarm) => {
      let data = [alarm.id, alarm.text];
      new_datas.push(data);
    });
    new_datas.unshift(["날짜(년-월-일)", "알림장 내용"]);

    //새로운 가상 엑셀파일 생성
    const book = utils.book_new();
    const alarm_datas = utils.aoa_to_sheet(new_datas);
    //셀의 넓이 지정
    alarm_datas["!cols"] = [{ wpx: 100 }, { wpx: 300 }];
    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, alarm_datas, "알림장 기록");

    writeFile(book, `알림장 기록(${todayYyyymmdd} 저장).xlsx`);
  };

  //어제 자료 받아오기
  const getYesterdayData = () => {
    if (alarmLists.length > 0) {
      let yesterYMD = dayjs(todayYyyymmdd)
        .subtract(1, "d")
        .format("YYYY-MM-DD");
      // 만약 오늘이 월요일이면, 금요일 자료 가져오기
      if (dayjs(todayYyyymmdd).day() === 1) {
        yesterYMD = dayjs(todayYyyymmdd).subtract(3, "d").format("YYYY-MM-DD");
      }
      let yesterData = alarmLists.filter((al) => al.id === yesterYMD);
      //어제 자료 있으면
      if (yesterData.length > 0) {
        let textValue = document.getElementById("board-input");
        textValue.value += yesterData[0].text;
      } else {
        Swal.fire({
          icon: "error",
          title: "불러오기 실패",
          text: "어제 날짜의 자료가 없어요. 날짜를 확인해주세요.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
      }
    }
  };

  //수동저장함수
  const saveHandler = async () => {
    let textArea = document.getElementById("board-input");
    //년 월 일
    let nowDate = document.getElementById("todayYYYYMMDD").innerText;
    let year = "20" + nowDate.split("년")[0];
    let month = nowDate.split("월")[0].split(" ")[1];
    let day = nowDate.split("일")[0].split(" ")[2];

    let todayYYYYMMDD = dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");

    //데이터 저장하기
    let today_data = {
      id: todayYYYYMMDD,
      text: textArea.value,
    };

    let new_datas = [];

    //setTimeout에서 상태변화 못잡아내서.. 받아오기

    const alarmRef = doc(dbService, "alarm", props.userUid);
    const now_doc = await getDoc(alarmRef);

    let new_alarmLists = [];
    if (now_doc?.data()?.alarm_data?.length > 0) {
      new_alarmLists = now_doc.data().alarm_data;
    }

    new_alarmLists?.forEach((data) => {
      if (data.id !== todayYYYYMMDD) {
        new_datas.push(data);
      }
    });
    new_datas.push(today_data);

    if (new_datas.length > 1) {
      await updateDoc(doc(dbService, "alarm", props.userUid), {
        alarm_data: new_datas,
      });
    } else {
      await setDoc(doc(dbService, "alarm", props.userUid), {
        alarm_data: new_datas,
      });
    }
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

        const btn = document.createElement("button");
        btn.className = `${classes.holidayData} eventBtn`;
        btn.innerText = holiday_queryName[1];
        holidayTag?.appendChild(btn);
        holidayTag.style.borderRadius = "5px";
      }
    });
  }, [currentMonth, showCal]);

  /** 날짜 이동 함수, 다음날 혹은 이전 날짜로 */
  const dayChangerHandler = (befOrNex) => {
    if (befOrNex === "before") {
      calDateHandler(dayjs(todayYyyymmdd).subtract(1, "day"));
    } else if (befOrNex === "next") {
      calDateHandler(dayjs(todayYyyymmdd).add(1, "day"));
    }
  };

  /** 내일의 시간표 정보들 받아오기 */
  const getClassTableFromDb = async (day) => {
    let classTableRef = doc(dbService, "classTable", props.userUid);
    const now_doc = await getDoc(classTableRef);
    if (now_doc.exists()) {
      // 저장된 각 날짜의 시간표 데이터가 있으면
      if (now_doc?.data()?.datas) {
        let todayClass = now_doc
          ?.data()
          ?.datas?.filter((data) => data.id === day);

        if (todayClass?.length === 0) {
          Swal.fire(
            "자동생성 실패",
            "내일 시간표가 존재하지 않아요! [메인화면] 에서 알림장을 쓰고 싶은 날짜의 다음 날 시간표를 저장해주세요!",
            "warning"
          );
          return;
        }

        function removeHTMLTags(str) {
          return str.replace(/<[^>]*>?/gm, "");
        }

        //오늘 날짜의 시간표가 있으면 메모만 모아서 저장하기
        let new_memos = "";
        todayClass[0]?.classMemo?.forEach((cl) => {
          if (cl.memo?.trim()?.length === 0) return;
          new_memos += removeHTMLTags(cl.memo) + ", ";
        });
        setTableMessage(new_memos);
      }
    } else {
      Swal.fire(
        "자동생성 실패",
        "내일 시간표가 존재하지 않아요! [메인화면] 에서 알림장을 쓰고 싶은 날짜의 다음 날 시간표를 저장해주세요!",
        "warning"
      );
      return;
    }
  };

  /** 내일의 스케쥴 정보들 받아오기 */
  const getScheduleFromDb = async (day) => {
    let roomInfo = localStorage.getItem("todoPublicRoom");

    let personalRef = doc(dbService, "todo", props.userUid);
    let personalSnap = await getDoc(personalRef);
    let new_memos = "";

    //개인 스케쥴(달력 일정표)에 내일 데이터 있으면
    if (personalSnap.exists()) {
      personalSnap?.data()?.todo_data?.forEach((data) => {
        if (data.id.slice(0, 10) !== day) return;
        // 내일 날짜의 스케쥴이 있으면 넣어주기
        new_memos += data.eventName;
        if (data.note) {
          new_memos += " " + data.note;
        }
        new_memos += ",";
      });
    }

    //공용 스케쥴(달력 일정표)에 내일 데이터 있으면
    if (roomInfo !== null) {
      let publicRef = doc(dbService, "todo", roomInfo);
      let publicSnap = await getDoc(publicRef);
      if (publicSnap.exists()) {
        publicSnap?.data()?.todo_data?.forEach((data) => {
          if (data.id.slice(0, 10) !== day) return;
          // 내일 날짜의 스케쥴이 있으면 넣어주기
          new_memos += data.eventName;
          if (data.note) {
            new_memos += " " + data.note;
          }
          new_memos += ",";
        });
      }
    }

    setScheduleMessage(new_memos);
  };

  /** 알림장 자동으로 작성해주는 함수, 내일시간표, 내일 달력 일정 확인해서 자동으로 만들어주기 */
  const autoWriteHandler = () => {
    let day = dayjs(todayYyyymmdd).add(1, "day").format("YYYY-MM-DD");
    getClassTableFromDb(day);
  };

  useEffect(() => {
    if (!tableMessage) return;
    let day = dayjs(todayYyyymmdd).add(1, "day").format("YYYY-MM-DD");
    getScheduleFromDb(day);
  }, [tableMessage]);

  useEffect(() => {
    if (!scheduleMessage) return;
    setWholeMessage(tableMessage + ", " + scheduleMessage);
  }, [scheduleMessage]);

  return (
    <div>
      {/* 잼잼 첫 화면으로 넘어가는 x 버튼 div */}
      <div>
        <button
          className={classes["exit-btn"]}
          onClick={() => {
            props.alarmClose();
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {/* 알림장 전체 div */}
      <div className={classes["alarm-all"]}>
        {/* 날짜 화면 보여주기 */}
        <div
          className={classes["date"]}
          onClick={() => setShowCal((prev) => !prev)}
        >
          {/* 왼쪽 버튼 어제로..  */}
          <span
            className={classes["cal-moveDay"]}
            title="이전 날짜"
            onClick={() => dayChangerHandler("before")}
          >
            <i className="fa-solid fa-chevron-left fa-lg"></i>
          </span>
          {/* 오늘 날짜 보여주는 부분 날짜 클릭하면 달력도 나옴 */}
          <span
            className={
              getDateHandler(new Date(), "title") === titleDate
                ? classes["events-today"]
                : ""
            }
            id="todayYYYYMMDD"
          >
            {/* {titleDate} */}
            {/* 오늘 날짜 보여주는 부분 날짜 클릭하면 달력도 나옴 */}
            <span className={classes["hide-cal"]}>
              <AttendCalendar
                getDateValue={calDateHandler}
                about="main"
                setStart={new Date(todayYyyymmdd)}
                getMonthValue={getMonthHandler}
              />
            </span>
          </span>
          {/* 오른쪽 버튼 내일로..  */}
          <span
            className={classes["cal-moveDay"]}
            title="다음 날짜"
            onClick={() => dayChangerHandler("next")}
          >
            <i className="fa-solid fa-chevron-right fa-lg"></i>
          </span>
        </div>

        {/* 칠판, 칠판 설정 부분 */}
        <div className={classes["board-all"]}>
          {/* 칠판 */}
          <div className={classes["board"]}>
            <Input
              id={`board-input`}
              myKey={"board-input"}
              className={"board-input"}
              label="board-input"
              input={{
                type: "textarea",
                autoFocus: true,
              }}
              startheight={"64px"}
              defaultValue={
                Object.values(todayAlarm)?.length > 0
                  ? todayAlarm.text
                  : showTodayDate
                  ? titleDate
                  : ""
              }
              alarm={true}
              fontSize={fontSize}
              maxRowAlert={(error) => {
                maxRowAlert(error);
              }}
            />
          </div>
          {/* 칠판 설정 버튼 모음 */}
          <div className={classes["setting"]}>
            {/* 날짜 자동 입력 */}
            <button
              className={`${classes["mg-5"]} ${classes["btn"]}  ${
                showTodayDate && classes["btn-clicked"]
              }`}
              onClick={() => {
                if (showTodayDate) {
                  setShowTodayDate(false);
                  localStorage.setItem("alarmShowTodayDate", false);
                } else {
                  setShowTodayDate(true);
                  localStorage.setItem("alarmShowTodayDate", true);
                }
              }}
              title={
                showTodayDate
                  ? "알림장 내용에 오늘날짜 자동으로 기록하기 기능 켜짐상태 ( 현재pc )"
                  : "알림장 내용에 오늘날짜 자동으로 기록하기 기능 꺼짐상태 ( 현재pc )"
              }
            >
              {showTodayDate ? "날짜on" : "날짜off"}
            </button>
            {!isMobile && (
              <div className={classes["fontSize-div"]}>
                {FONTSIZE.map((fs, index) => (
                  <button
                    className={`${classes["mg-5"]} ${classes["btn"]}  ${
                      fontSize === fs && classes["btn-clicked"]
                    }`}
                    onClick={() => {
                      setFontSize(fs);
                      document.getElementById("board-input").style.fontSize =
                        fs;
                    }}
                    key={`fs-btn-${index}`}
                  >
                    {fs}
                  </button>
                ))}
              </div>
            )}

            {/* 어제자료 불러오기 버튼 */}
            <button
              className={`${classes["mg-5"]} ${classes["btn"]}`}
              onClick={getYesterdayData}
              title="어제 알림장 내용을 가져와서 붙입니다."
            >
              어제자료 가져오기
            </button>

            {/* 수동으로 알림장 저장 버튼 */}
            <button
              className={`${classes["mg-5"]} ${classes["btn"]}`}
              onClick={saveHandler}
            >
              수동저장
            </button>

            {/* 알림장 전체 자료 저장 */}
            <button
              className={`${classes["mg-5"]} ${classes["btn"]}`}
              onClick={excelSave}
              title="현재까지 작성된 모든 알림장을 저장합니다."
            >
              전체 <br />
              엑셀저장
            </button>

            {/* 현재 알림장 내용 삭제 */}
            <button
              className={`${classes["mg-5"]} ${classes["btn"]}`}
              onClick={deleteAll}
              title="현재 알림장에 있는 모든 내용을 삭제합니다."
            >
              내용삭제
            </button>
            <div className={classes["mg-5"]}>
              * 5초 이상 입력이 없으면 자동저장
            </div>
          </div>
        </div>

        {/* 자동 알림장 써주기 */}
        <button
          className={`${classes["mg-5"]} ${classes["btn"]} ${
            classes["autoWrite"]
          }  ${showTodayDate && classes["btn-clicked"]}`}
          onClick={autoWriteHandler}
          title="내일의 시간표와 일정을 바탕으로 알림장을 자동으로 생성합니다.(beta)"
        >
          알림장 참고자료 (+beta)
        </button>
        <AssistanceAi message={wholeMessage} />
      </div>
    </div>
  );
};

export default Alarm;
