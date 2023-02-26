import React, { useEffect, useState } from "react";
import classes from "./SettingSeat.module.css";
import RowColumn from "./RowColumn";
import SeatTable from "./SeatTable";
import SeatLists from "./SeatLists";
import Button from "../../Layout/Button";
import dayjs from "dayjs";
import Swal from "sweetalert2";

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

  //학년도 설정함수
  const setYear = () => {
    return +dayjs().format("MM") <= 1
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  useEffect(() => {
    let now_year = setYear();
    //현재학년도 자료만 입력가능하고,, 불러오기
    let now_students = props?.students?.filter(
      (yearStd) => Object.keys(yearStd)[0] === now_year
    )?.[0]?.[now_year];

    setStudents(now_students);
  }, [props.students]);

  //최종 자리에 앉는 학생 세팅
  const seatStudentsHandler = (clName) => {
    if (clName === "") {
      setSeatStudents(students);
    } else {
      setSeatStudents(
        students?.filter((cl) => Object.keys(cl)[0] === clName)?.[0]?.[clName]
      );
    }
    setNowClassName(clName);
  };

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
                setInit(false);
              }}
            />
          </div>
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
            <i className="fa-solid fa-plus"></i>
          </button>
          <SeatLists userUid={props.userUid} wholeStudents={props.students} />
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
        />
      )}

      {addNew && showTable && (
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
          />

          <h2 onClick={() => setExplainOn((prev) => !prev)}>
            {" "}
            😮 사용 방법{" "}
            <span>
              {explainOn ? (
                <i className="fa-solid fa-chevron-up"></i>
              ) : (
                <i className="fa-solid fa-chevron-down"></i>
              )}{" "}
            </span>
          </h2>
          <div
            className={explainOn ? classes.explainDiv : classes.explainDivHide}
          >
            <p className={classes[`gameMenu`]}>
              * 1번 방법 (학생만 뽑고 자리는 직접선택) 👉 어떻게 - [학생만]
              클릭! 👉 [여학생/남학생/아무나] 에서 하나 클릭!(학생뽑기) 👉
              자리선택
            </p>
            <p className={classes[`gameMenu`]}>
              * 2번 방법 (학생과 자리를 직접선택) 👉 (남은학생 아래에
              있는)[학생번호] 클릭! 👉 자리선택
            </p>
            <p className={classes[`gameMenu`]}>
              * 3번 방법 (학생+자리를 한명씩 뽑기) 👉 어떻게 - [학생+자리] 클릭!
              👉 한명씩 - [여학생/남학생/아무나] 에서 하나 클릭!
            </p>
            <p className={classes[`gameMenu`]}>
              * 4번 방법 (학생+자리를 한번에 뽑기) 👉 어떻게 - [학생+자리] 클릭!
              👉 한번에 - [남+여/아무나] 클릭! 👉 3초 마다 새로운 학생이
              1번자리부터 쭉- 자동으로 들어갑니다.
            </p>
            <p className={classes[`gameMenu`]}>
              * 두 자리를 차례로 선택하면 자리를 바꿀 수 있습니다.(빈자리로
              옮기기도 가능)
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default SettingSeat;
