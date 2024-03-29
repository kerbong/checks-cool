import React, { useEffect, useState } from "react";
import classes from "./SettingSeat.module.css";
import RowColumn from "./RowColumn";
import SeatTable from "./SeatTable";
import SeatLists from "./SeatLists";
import Button from "../../Layout/Button";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { dbService } from "../../../fbase";
import { setDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa6";

const SettingSeat = (props) => {
  const [init, setInit] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [explainOn, setExplainOn] = useState(false);
  const [addNew, setAddNew] = useState();
  const [rowColumn, setRowColumn] = useState("");
  const [nowClassName, setNowClassName] = useState("");
  const [students, setStudents] = useState();
  // 자리표에 보내는 최종 학생명단
  const [seatStudents, setSeatStudents] = useState();
  // 교사 세팅으로 정했던 목록 보여주기
  const [showTeacherPick, setShowTeacherPick] = useState(false);
  const [secretSeat, setSecretSeat] = useState({});
  const [goneStudents, setGoneStudents] = useState([]);

  //학년도 설정함수
  const setYear = () => {
    return dayjs().format("MM-DD") <= "02-15"
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  //전학생 목록 받아옴
  const getGoneStdFromDb = async () => {
    let goneStdRef = doc(dbService, "goneStd", props.userUid);
    const goneStdSnap = await getDoc(goneStdRef);

    //id가 이번학년도 인 자료만 저장해둠.

    if (goneStdSnap.exists()) {
      let new_goneStds = [];

      new_goneStds = goneStdSnap.data()?.goneStd_data?.[setYear()];

      //전출학생의 전출 날짜와 오늘 날짜를 비교해서.. 전출이 과거인 경우(이미 전학감) 전체 학생 목록에서 빼주기
      const yyyy_mm_dd = dayjs().format("YYYY-MM-DD");
      const now_goneStds = new_goneStds?.filter((std) => yyyy_mm_dd > std.date);

      if (now_goneStds?.length > 0) {
        setGoneStudents(now_goneStds);
      }
    }
  };

  useEffect(() => {
    getGoneStdFromDb();
  }, [props.userUid]);

  // useEffect(() => {
  //   getGoneStdFromDb();
  // }, []);

  const nowStudentHandler = () => {
    let now_year = setYear();
    //현재학년도 자료만 입력가능하고,, 불러오기
    let now_students = props?.students?.filter(
      (yearStd) => Object.keys(yearStd)[0] === now_year
    )?.[0]?.[now_year];

    setStudents(now_students);
  };

  useEffect(() => {
    nowStudentHandler();
  }, [props.students]);

  useEffect(() => {
    if (students?.length === 0) return;
    getSecretSeat();
  }, [students]);

  useEffect(() => {
    // console.log(secretSeat);
    if (Object.keys(secretSeat)?.length === 0) return;
    //전담 담임에 따라 전체 학생 목록도 세팅함.
    if (secretSeat.clName) {
      seatStudentsHandler(secretSeat.clName);
    } else {
      seatStudentsHandler("");
    }
  }, [secretSeat]);

  //최종 자리에 앉는 학생 세팅
  const seatStudentsHandler = (clName) => {
    //전출학생 제외함수
    const except_goneStds = (stds) => {
      const new_students = stds?.filter((stu) => {
        return !goneStudents?.some(
          (g_stu) => +g_stu.num === +stu.num && g_stu.name === stu.name
        );
      });

      return new_students;
    };
    // console.log("ddd");
    if (clName === "") {
      // console.log(students);
      setSeatStudents(except_goneStds(students));
    } else {
      let new_seatStudents = students?.filter(
        (cl) => Object.keys(cl)[0] === clName
      )?.[0]?.[clName];
      setSeatStudents(except_goneStds(new_seatStudents));
    }
    setNowClassName(clName);
  };

  //비밀(예시)자료만 불러오기!
  const getSecretSeat = async () => {
    let seatsRef = doc(dbService, "seats", props.userUid);
    const secretSeatDoc = await getDoc(seatsRef);
    if (secretSeatDoc?.exists()) {
      onSnapshot(seatsRef, (doc) => {
        setSecretSeat({});
        doc?.data()?.seats_data?.forEach((data) => {
          //예시자료만.. 저장해두기
          if (data.title === "-*-예시자료-*-") {
            setSecretSeat({ ...data });
          }
        });
      });
    }
  };

  //예시자료 있는지 받아와서 저장하기
  useEffect(() => {
    getSecretSeat();
  }, [addNew, props.userUid]);

  //사용방법
  const showHowToUse = (
    <>
      <h2 onClick={() => setExplainOn((prev) => !prev)}>
        {" "}
        😮 사용 방법 및 주의사항{" "}
        <span>{explainOn ? <FaChevronUp /> : <FaChevronDown />} </span>
      </h2>
      <div className={explainOn ? classes.explainDiv : classes.explainDivHide}>
        <p className={classes[`gameMenu`]}>
          * 1번 방법 (학생만 뽑고 자리는 직접선택) 👉 어떻게 - [학생만] 클릭! 👉
          [여학생, 남학생, 여/남] 에서 하나 클릭!(학생뽑기) 👉 자리선택
        </p>
        <p className={classes[`gameMenu`]}>
          * 2번 방법 (학생과 자리를 직접선택) 👉 (남은학생 아래에
          있는)[학생이름] 클릭! 👉 자리선택
        </p>
        <p className={classes[`gameMenu`]}>
          * 3번 방법 (학생+자리를 한 명씩 뽑기) 👉 어떻게 - [학생+자리] 클릭! 👉
          랜덤자리 한명씩 - [여학생, 남학생, 여/남] 에서 하나 클릭!
        </p>
        <p className={classes[`gameMenu`]}>
          * 4번 방법 (학생+자리를 한번에 순서대로 뽑기) 👉 어떻게 - [학생+자리]
          클릭! 👉 [한 번에, 여자먼저, 남자먼저] 클릭! 👉 3초 마다 새로운 학생이
          자동으로 배치됩니다! 예)여자먼저는 여자자리에 여자를 먼저 다 뽑은 후에
          남자가 뽑힙니다.
        </p>
        <p className={classes[`gameMenu`]}>
          * 움짤 On / Off 로 학생이 뽑힐 때 나오는 움짤을 켜거나 끌 수 있어요!
        </p>
        <p className={classes[`gameMenu`]}>
          * 버튼 숨김 On / Off 로 설정과 뽑기 버튼을 숨기거나 보이도록 할 수
          있어요!
        </p>
        <p className={classes[`gameMenu`]}>
          * [한 번에, 여자먼저, 남자먼저]를 사용하실 때 다른 화면으로의 이동을
          피해주세요!(사이트 멈춤 가능성이 있어요!)
        </p>
        <p className={classes[`gameMenu`]}>
          * 두 자리를 차례로 선택하면 자리를 바꿀 수 있습니다.(빈자리로 옮기기도
          가능)
        </p>
        <p className={classes[`gameMenu`]}>
          * 주의 * 가로에 앉는 학생 수가 홀수인 경우, 짝을 판단하는 자료에서
          해당 자료를 제외합니다.
        </p>

        <p className={classes[`gameMenu`]}>
          * 주의 * 저장할 때 제목에 '@'를 추가하시면, 짝을 판단하는 자료에서
          해당 자료를 제외합니다.
        </p>
        <p className={classes[`gameMenu`]}>
          * [메인화면] - [학생명부] 에 등록된 '전출학생'의 전출 날짜와 오늘
          날짜를 비교하여 자동으로 전출학생이 제외됩니다.
        </p>
        <p className={classes[`gameMenu`]}>
          * 예시사용법 1. * 기존자료처럼 추가하기 상태에서 미리 원하는 학생만
          일부 or 전체를 배치하고, 왼쪽 상단에 [자리뽑기] 버튼을 눌러 저장해두기
        </p>
        <p className={classes[`gameMenu`]}>
          * 예시사용법 2. * 자리뽑기 첫화면에서 [예시자료] 클릭 후 [학생+자리]
          옵션을 선택해서 자리 뽑기!
        </p>

        <p className={classes[`gameMenu`]}>
          * 예시사용법 3. * [자리뽑기]를 눌러서 저장하는 예시자료는 덮어쓰기
          됩니다!
        </p>

        <p className={classes[`gameMenu`]}>
          * 예시사용법 4. * 저장했던 예시자료를 불러와서 이어하고 싶으신가요??
          학생을 자리에 넣지 않은 상태에서 키보드의 + 버튼을 눌러주시면
          이어하기가 가능합니다!
        </p>
      </div>
    </>
  );

  return (
    <>
      {init && (
        <>
          <div className={classes["input-div"]}>
            <Button
              name={"추가하기"}
              className={"settingSeat"}
              onclick={() => {
                if (students !== undefined) {
                  setAddNew(true);
                  setShowTable(false);
                  setShowTeacherPick(false);
                  setInit(false);
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "자리뽑기 불가",
                    text: "먼저 메뉴의 곰돌이를 눌러서 학생명부를 입력해주세요.",
                    confirmButtonText: "확인",
                    confirmButtonColor: "#85bd82",
                    timer: 5000,
                  });
                }
              }}
            />
            <Button
              name={"기존자료"}
              className={"settingSeat"}
              onclick={() => {
                setAddNew(false);
                setShowTable(true);
                setShowTeacherPick(false);
                setInit(false);
              }}
            />
            <Button
              name={"예시자료"}
              className={"settingSeat"}
              onclick={() => {
                // 저장된 예시자료가 없으면.. 안띄우기
                if (Object.keys(secretSeat).length === 0) {
                  Swal.fire(
                    "자료 확인",
                    "예시자료로 저장된 자료가 있는지 확인해주세요! (추가하기 -> 자리뽑기로 저장) 혹시 저장하셨다면 메뉴의 다른 탭 (생기부-조회 등)을 클릭한 후 다시 접속해주세요! 문제가 지속되면 kerbong@gmail.com으로 알려주세요~"
                  );
                  return;
                }

                setAddNew(true);
                setShowTable(true);
                setInit(false);
                setShowTeacherPick(true);
              }}
            />
          </div>
        </>
      )}

      {/* 교사가 미리 픽해둔 비밀자리표... */}
      {addNew && showTable && showTeacherPick && (
        <>
          <div className={`${classes["title-div"]} ${classes["mt--25"]}`}></div>
          <SeatTable
            secretSeat={secretSeat}
            rowColumn={secretSeat?.rowColumn}
            students={seatStudents}
            userUid={props.userUid}
            addNewCancel={() => {
              setAddNew(false);
              setShowTable(false);
              setInit(true);
            }}
            nowClassName={nowClassName}
            showJustLists={true}
            wholeStudents={props.students}
            isNew={true}
            goneStudents={goneStudents}
            menuOnHead={props.menuOnHead}
          />
          {showHowToUse}
        </>
      )}

      {!addNew && showTable && (
        // 저장된 자료를 불러와서 리스트로 보여주기
        //firebase에서 자료 가져오고 그거 state에 저장해두고 그거 li태그에 감싸서 보여주기
        <>
          <button
            className={classes["seatsAdd-btn"]}
            onClick={() => {
              setAddNew(true);
              setShowTable(false);
            }}
          >
            <FaPlus />
          </button>
          <SeatLists
            userUid={props.userUid}
            wholeStudents={props.students}
            menuOnHead={props.menuOnHead}
          />
        </>
      )}

      {addNew && !showTable && (
        <RowColumn
          setRowColumn={(col, row, clName) => {
            setShowTable(true);
            setRowColumn(`${row}-${col}`);
            seatStudentsHandler(clName);
          }}
          addNewCancel={() => {
            setAddNew(false);
            setShowTable(false);
            setInit(true);
          }}
          students={students}
          goneStudents={goneStudents}
        />
      )}

      {addNew && showTable && !showTeacherPick && (
        <>
          <div className={`${classes["title-div"]} ${classes["mt--25"]}`}></div>
          <SeatTable
            rowColumn={rowColumn}
            students={seatStudents}
            userUid={props.userUid}
            addNewCancel={() => {
              setAddNew(false);
              setShowTable(false);
              setInit(true);
            }}
            nowClassName={nowClassName}
            showJustLists={true}
            wholeStudents={props.students}
            isNew={true}
            goneStudents={goneStudents}
            menuOnHead={props.menuOnHead}
          />
          {/* 사용방법 */}
          {showHowToUse}
        </>
      )}
    </>
  );
};

export default SettingSeat;
