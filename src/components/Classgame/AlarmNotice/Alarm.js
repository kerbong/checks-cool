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
              defaultValue={todayAlarm.text || ""}
              alarm={true}
              fontSize={fontSize}
              maxRowAlert={(error) => {
                maxRowAlert(error);
              }}
            />
          </div>
          {/* 칠판 설정 */}
          <div className={classes["setting"]}>
            {!isMobile && (
              <div className={classes["fontSize-div"]}>
                <div className={classes["mg-5"]}>
                  글자
                  <br />
                  크기
                </div>
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

            <button
              className={`${classes["mg-5"]} ${classes["btn"]}`}
              onClick={getYesterdayData}
            >
              어제자료 가져오기
            </button>
            <button
              className={`${classes["mg-5"]} ${classes["btn"]}`}
              onClick={saveHandler}
            >
              수동저장
            </button>
            <button
              className={`${classes["mg-5"]} ${classes["btn"]}`}
              onClick={excelSave}
            >
              전체 <br />
              엑셀저장
            </button>
            <button
              className={`${classes["mg-5"]} ${classes["btn"]}`}
              onClick={deleteAll}
            >
              전체삭제
            </button>
            <div className={classes["mg-5"]}>
              * 5초 이상 입력이 없으면 자동저장
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alarm;
