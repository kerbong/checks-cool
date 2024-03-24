import { useEffect, useState, useRef } from "react";

import classes from "./GoneStd.module.css";
import AttendCalendar from "components/Attendance/AttendCalendar";
import StudentBtn from "./StudentBtn";

import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { FaRegCircleXmark } from "react-icons/fa6";

const GoneStd = ({ student, closeModal, userUid, isSubject, nowClassName }) => {
  const [tempStd, setTempStd] = useState(student);
  const [todayYyyymmdd, setTodayYyyymmdd] = useState(new Date());
  const [goneStudents, setGoneStudents] = useState([]);
  const [allYearData, setAllYearData] = useState({});

  const addOrFix = useRef();

  const nowYear =
    dayjs().format("MM-DD") <= "02-15"
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");

  //firestore에서 전학생 목록 전체 받아오기
  const getDatasFromDb = async () => {
    let goneStdRef = doc(dbService, "goneStd", userUid);
    const goneStdSnap = await getDoc(goneStdRef);

    //전체 학년도 데이터와 현재 학년도 데이터 상태에 저장해두기
    onSnapshot(goneStdRef, (doc) => {
      if (goneStdSnap.exists()) {
        let new_goneStd = [];

        new_goneStd = doc.data()?.goneStd_data?.[nowYear];

        setAllYearData(doc.data()?.goneStd_data);

        setGoneStudents(new_goneStd);
      }
    });
  };

  useEffect(() => {
    getDatasFromDb();
  }, [userUid]);

  const updateGoneStdDb = async (datas) => {
    let goneStdRef = doc(dbService, "goneStd", userUid);
    let newAllYearData = { ...allYearData };
    newAllYearData[nowYear] = datas;
    await setDoc(goneStdRef, { goneStd_data: newAllYearData });
  };

  const calDateHandler = (date) => {
    setTodayYyyymmdd(dayjs(date).format("YYYY-MM-DD"));
  };

  //달력에서 받은 month로 currentMonth변경하기
  const getMonthHandler = () => {};

  //전학생 추가/ 수정하기
  const addGoneStdHandler = () => {
    let new_goneStd = [...goneStudents];
    //중복되지 않도록 이미 존재하는 번호인지 확인
    let duple_index = -1;
    new_goneStd?.forEach((std, index) => {
      if (std.num === tempStd.num && std.name === tempStd.name) {
        duple_index = index;
      }
    });

    let selected_std = {
      ...tempStd,
      date: dayjs(todayYyyymmdd).format("YYYY-MM-DD"),
    };

    //전담이면 반이름 추가해주기
    if (isSubject) {
      selected_std.clName = nowClassName;
    }

    //이미 존재하는 학생이면 수정
    if (duple_index !== -1) {
      new_goneStd.splice(duple_index, 1, selected_std);
      setGoneStudents(new_goneStd);
      updateGoneStdDb(new_goneStd);

      //새로운 학생이면 추가
    } else {
      new_goneStd.push(selected_std);
      setGoneStudents(new_goneStd);
      updateGoneStdDb(new_goneStd);
    }

    const btnText = addOrFix.current.innerText;
    let swalTitle;
    let swalHtml;
    if (btnText === "수정하기") {
      swalTitle = "수정 완료";
      swalHtml = `${tempStd.name} 학생의 전출과 관련된 내용이 수정되었습니다.`;
    } else {
      swalTitle = "추가 완료";
      swalHtml = `${tempStd.name} 학생의 전출 자료가 추가되었습니다.`;
    }
    Swal.fire({
      title: swalTitle,
      icon: "success",
      html: swalHtml,
      confirmButtonText: "확인",
      timer: 5000,
    });
  };

  //전학생 삭제하기
  const delGoneStdHandler = () => {
    Swal.fire({
      title: "삭제할까요?",
      text: `전학생으로 등록된 ${tempStd.name} 학생을 목록에서 삭제할까요? `,
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "취소",
      confirmButtonText: "삭제",
      denyButtonColor: "#8bc34a",
      confirmButtonColor: "#dc3741",
    }).then((result) => {
      if (result.isConfirmed) {
        let new_goneStd = [...goneStudents];
        new_goneStd = new_goneStd?.filter(
          (std) => std.name !== tempStd.name && std.num !== tempStd.num
        );
        setGoneStudents(new_goneStd);
        updateGoneStdDb(new_goneStd);
      }
    });
  };

  return (
    // 가운데 정렬, flex direction column
    <div className={classes["flex-col-cen"]}>
      {/* 취소 버튼  */}
      <span className={classes["absol-ringt-top"]} onClick={closeModal}>
        <FaRegCircleXmark />
      </span>

      {/* 글자크기 설정하기 */}
      <h2 style={{ fontSize: "1.7rem" }}> 전출학생 관리</h2>
      <p>
        * 전출 학생만을 위한 관리페이지 입니다.
        <br /> * 전입 학생을 추가는 학생 등록을 이용해주세요.
      </p>

      {/* 전체 전학생 */}
      <h3 style={{ fontSize: "1.5rem" }} className={classes["flex--cen-100"]}>
        <hr style={{ width: "20%" }} />
        등록된 전출학생
        <hr style={{ width: "20%" }} />
      </h3>

      {/* 현재 등록되어 있는 전학생 목록 버튼 형식으로 보여주기 */}
      <div className={classes["flex--cen-100"]}>
        {goneStudents?.map((stu) => (
          <StudentBtn
            className={"checklist-student"}
            classAdd={
              tempStd.num === stu.num && tempStd.name === stu.name
                ? true
                : false
            }
            name={stu.name}
            key={stu.num}
            num={stu.num}
            woman={stu.woman}
            onShowOption={() => {
              // 이름 클릭하면 실행될 함수, tempStd로 set하기..
              setTempStd(stu);
              setTodayYyyymmdd(stu.date);
            }}
          />
        ))}
      </div>

      {/* 선택된 학생 */}
      <h3 style={{ fontSize: "1.5rem" }} className={classes["flex--cen-100"]}>
        <hr style={{ width: "20%" }} />
        선택된 전출학생
        <hr style={{ width: "20%" }} />
      </h3>

      {/* 선택된 전학생 정보 보여주기 */}
      {/* // 가운데 정렬, flex direction column */}
      <div
        className={classes["flex-col-cen"]}
        style={{ alignItems: "flex-start" }}
      >
        <div
          className={classes["flex--cen-100"]}
          style={{ marginBottom: "15px" }}
        >
          {/* 추가 or 수정버튼 */}
          <button
            ref={addOrFix}
            className={classes["add-save-btn"]}
            onClick={addGoneStdHandler}
          >
            {goneStudents?.filter(
              (std) => std.num === tempStd.num && std.name === tempStd.name
            )?.length === 0
              ? "추가하기"
              : "수정하기"}
          </button>
          {/* 삭제하기 */}
          {goneStudents?.filter(
            (std) => std.num === tempStd.num && std.name === tempStd.name
          )?.length !== 0 && (
            <button
              className={classes["add-save-btn"]}
              onClick={delGoneStdHandler}
            >
              삭제하기
            </button>
          )}
        </div>
        {/* 번호 이름 보여주기 */}
        <span>
          <span>번호 이름 &nbsp;&nbsp;| </span> &nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <span>
            {tempStd?.clName} {tempStd.num} 번 {tempStd.name}
          </span>
        </span>

        {/* 전학 날짜 정보 보여주기 */}
        <span className={classes["flex--cen"]}>
          <span>전학 날짜 &nbsp;&nbsp;| </span> &nbsp;&nbsp;&nbsp;&nbsp;
          {/* 날짜 선택 */}
          <span style={{ fontSize: "1.2rem" }}>
            <AttendCalendar
              getDateValue={calDateHandler}
              about="main"
              setStart={new Date(todayYyyymmdd)}
              getMonthValue={getMonthHandler}
              getYearValue={getMonthHandler}
            />
          </span>
        </span>

        {/* 출결에 "기타" - "전출" 로 자동 기록할지 보여주기 */}
      </div>
    </div>
  );
};

export default GoneStd;
