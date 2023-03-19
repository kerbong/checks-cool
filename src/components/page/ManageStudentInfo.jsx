import React, { useState, useEffect, useRef } from "react";
import ManageEach from "./ManageEach";
import dayjs from "dayjs";
import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router";
import classes from "./ManageEach.module.css";
import Button from "components/Layout/Button";
import Swal from "sweetalert2";
import { read, utils } from "xlsx";

const ManageStudentInfo = (props) => {
  const [onStudent, setOnStudent] = useState("");
  const [onOption, setOnOption] = useState("");
  const [nowSubject, setNowSubject] = useState(false);
  const [clName, setClName] = useState("");
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [nowClassName, setNowClassName] = useState("");

  const { state } = useLocation();

  const fileInfoInput = useRef();

  const nowYear = () => {
    return +dayjs().format("MM") <= 2
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  //해당학년도의 전담여부 확인해서 설정하는 함수
  const changeSubjectHandler = (data_year) => {
    let isSubject;
    if (props.isSubject) {
      isSubject = props.isSubject?.filter(
        (yearData) => Object.keys(yearData)[0] === data_year
      )?.[0]?.[data_year];
    }
    return isSubject;
  };

  useEffect(() => {
    let now_subject = changeSubjectHandler(nowYear());
    setNowSubject(now_subject);
  }, [props.isSubject]);

  // db에서 데이터 받아오기
  const getInfoFromDb = async () => {
    setStudentsInfo([]);
    const studentsInfoRef = doc(dbService, "studentsInfo", props.userUid);

    onSnapshot(studentsInfoRef, (doc) => {
      if (doc.exists()) {
        setStudentsInfo([...doc.data()?.info_datas]);
      }
    });
  };

  //학생 데이터 받아옴. 전담 담임 상관없이 그냥 배열(올해 자료만 저장.. 덮어쓰기 됨.)
  useEffect(() => {
    getInfoFromDb();
  }, []);

  //받아온 학생, 학급 정보
  useEffect(() => {
    //받아온 정보 { student: 학생번호 이름 , clName: 전담이면 반이름}
    let new_onStudent = state?.student;
    let new_clName = state?.clName;
    if (new_onStudent !== "") {
      setOnStudent(new_onStudent);
    }

    if (new_clName !== "") {
      setClName(new_clName);
    }

    //초기 화면에 진입하면..
    if (new_onStudent === undefined) {
      setOnStudent("");
    }
  }, [state]);

  //선택된 학생 정보  번호 한칸띄우고 이름
  const selectStudentHandler = (studentNumName) => {
    setOnStudent(studentNumName);
  };

  //선택되어 있는 학급 (전담의 경우)
  const nowClassNameHandler = (classname) => {
    setClName(classname);
  };

  //번호로 정렬하기
  const sortNum = (students) => {
    const sorted_students = students.sort(function (a, b) {
      let a_num = `${a.num}`;
      let b_num = `${b.num}`;
      return a_num - b_num;
    });

    return sorted_students;
  };

  //저장버튼 누르면 현재 학생정보를 firestore에 저장하는 함수(덮어쓰기)
  const uploadStudents = async (data) => {
    //학생정보는.. 현재 학년도 자료만 저장하고 있기!
    const studentsRef = doc(dbService, "studentsInfo", props.userUid);
    await setDoc(studentsRef, data);
  };

  const studentsInfoHandler = (studentsInfo) => {
    //명부를 전담, 담임에 맞게 수정하는 함수
    let fixed_data;
    if (!nowSubject) {
      fixed_data = {
        info_datas: sortNum(studentsInfo),
      };

      //전담용 로직
    } else {
      // console.log(wholeClass);
      let new_wholeClass = [...studentsInfo];
      new_wholeClass?.map((cl) => {
        //각반 학생들을 정렬하고 성별 속성 부여
        sortNum(Object.values(cl));

        return cl;
      });
      fixed_data = {
        info_datas: new_wholeClass,
      };
    }

    setStudentsInfo(fixed_data.info_datas);
    uploadStudents(fixed_data);

    Swal.fire({
      icon: "success",
      title: "저장되었어요!",
      text: `엑셀파일의 학생정보가 업로드 되었습니다.`,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });
  };

  //엑셀파일 업로더
  const excelFileHandler = (e) => {
    let input = e.target;
    if (input.files[0] !== undefined) {
      let reader = new FileReader();
      reader.onload = function () {
        try {
          let data = reader.result;
          let workBook = read(data, { type: "binary" });

          //전담인지 판단해서 로직 다르게 설정, 전담이면
          if (nowSubject) {
            let wholeClass = [];
            workBook.SheetNames.forEach(function (sheetName) {
              let classInfo = {};
              let rows = utils.sheet_to_json(workBook.Sheets[sheetName]);
              // console.log(rows);
              let new_rows = rows?.map((row) => ({
                num: String(row["번호"]),
                name: String(row["이름"] || row["성명"]),
                month: String(row["월"]),
                day: String(row["일"]),
                studTel: String(row["학생연락처"]) || "",
                mom: String(row["모성명"]) || "",
                momTel: String(row["모연락처"]) || "",
                dad: String(row["부성명"]) || "",
                dadTel: String(row["부연락처"]) || "",
                bns: String(row["형제자매"] || ""),
                etc: String(row["기타"] || ""),
                clName: String(sheetName),
              }));

              let hasUndefined = false;
              new_rows.forEach((stu) => {
                if (
                  // 학생의 각각의 value 중에 undefined 인 것들이 있으면..
                  Object.values(stu)?.filter((each) => each === undefined)
                    .length > 0
                ) {
                  hasUndefined = true;
                }
              });

              if (hasUndefined) {
                Swal.fire({
                  icon: "error",
                  title: "업로드 실패!",
                  html: "학생 정보에 비어있는 칸이나 줄은 없는지 다른 입력 오류들은 없는지 확인해주세요! 문제가 지속되면 kerbong@gmail.com 으로 알려주세요!",
                  confirmButtonText: "확인",
                  confirmButtonColor: "#85bd82",
                });
                return;
              }

              wholeClass.push(...new_rows);
            });
            studentsInfoHandler(wholeClass);
            console.log(wholeClass);

            //담임일 경우 시트가 하나!
          } else {
            workBook.SheetNames.forEach(function (sheetName) {
              let rows = utils.sheet_to_json(workBook.Sheets[sheetName]);
              // console.log(rows);
              let new_rows = rows?.map((row) => ({
                num: String(row["번호"]),
                name: String(row["이름"] || row["성명"]),
                month: String(row["월"]),
                day: String(row["일"]),
                studTel: String(row["학생연락처"]) || "",
                mom: String(row["모성명"]) || "",
                momTel: String(row["모연락처"]) || "",
                dad: String(row["부성명"]) || "",
                dadTel: String(row["부연락처"]) || "",
                bns: String(row["형제자매"] || ""),
                etc: String(row["기타"] || ""),
              }));

              let hasUndefined = false;
              new_rows.forEach((stu) => {
                if (
                  Object.values(stu)?.filter((each) => each === undefined)
                    .length > 0
                ) {
                  hasUndefined = true;
                }
              });

              console.log(hasUndefined);
              if (hasUndefined) {
                Swal.fire({
                  icon: "error",
                  title: "업로드 실패!",
                  html: "번호, 이름, 성별 문자의 철자가 정확한지, 문자 앞/뒤에 띄어쓰기는 없는지, 비어있는 칸이나 줄은 없는지 확인해주세요! 문제가 지속되면 kerbong@gmail.com 으로 알려주세요!",
                  confirmButtonText: "확인",
                  confirmButtonColor: "#85bd82",
                });
                return;
              }
              studentsInfoHandler(new_rows);
            });
          }
        } catch (error) {
          console.log(error.message);
          Swal.fire({
            icon: "error",
            title: "업로드 실패!",
            html: "번호, 이름 행의 철자가 정확한지 확인해주세요!",
            confirmButtonText: "확인",
            confirmButtonColor: "#85bd82",
          });
        }
      };
      reader.readAsBinaryString(input.files[0]);
    } else {
      return;
    }
  };

  //모든학생 생일보여주는 거 월별로 새롭게 정렬하고..
  const showStudentsBirth = () => {
    let new_studentsInfo = [...studentsInfo];
    let monthBirthAll = new_studentsInfo?.map((stud) => stud.month);
    let monthBirth = [...new Set(monthBirthAll.sort((a, b) => a - b))];

    let monthBrithDiv = monthBirth.map((month) => {
      return (
        <div
          key={month + "월"}
          className={`${classes["bottom-content-li"]}`}
          style={{ width: "300px" }}
        >
          <h2>
            {month}월 (
            {new_studentsInfo?.filter((stud) => stud.month === month)?.length}
            명)
          </h2>
          <div className={`${classes["margin-15"]} ${classes["fs-11"]} `}>
            {new_studentsInfo?.map((stud) => {
              if (stud.month !== month) return null;
              return (
                <span
                  className={`${classes["margin-5"]} ${classes["flex-wrap"]}`}
                  key={stud.name}
                >
                  {stud.name} ({stud.day}일)
                </span>
              );
            })}
          </div>
        </div>
      );
    });
    return monthBrithDiv;
  };

  //모든학생 학생연락처 보여주기
  const showStudentsTel = () => {
    let new_studentsInfo = [...studentsInfo];
    let telAll = new_studentsInfo?.map((stud) => (
      <span
        key={stud.studTel}
        className={`${classes["margin-5"]} ${classes["flex-wrap"]} ${classes["padd-5"]}`}
        style={{ width: "", alignItems: "center" }}
      >
        <span>
          {stud.num} {stud.name}
        </span>{" "}
        <span
          className={`${classes["margin-5"]}`}
          style={{ marginLeft: "15px" }}
        >
          {stud.studTel}
        </span>
      </span>
    ));

    return (
      <>
        <div className={`${classes["flex-wrap"]}`} style={{ width: "90%" }}>
          <h2
            className={`${classes["bottom-content-li"]} ${classes["flex-wrap"]}`}
            style={{ width: "200px" }}
          >
            학생 연락처
          </h2>
        </div>
        <div
          className={`${classes["bottom-content-li"]} ${classes["flex-wrap"]} ${classes["fs-11"]}`}
          style={{ width: "80%", justifyContent: "space-evenly" }}
        >
          {telAll}
        </div>
      </>
    );
  };

  //모든학생 부모연락처 보여주기
  const showParentsTel = () => {
    let new_studentsInfo = [...studentsInfo];
    let telAll = new_studentsInfo?.map((stud) => (
      <div
        key={stud.momTel}
        className={`${classes["bottom-content-li"]} ${classes["flex-wrap"]} ${classes["fs-11"]}`}
        style={{ width: "300px" }}
      >
        <h3 style={{ width: "300px" }}>
          {stud.num} {stud.name}
        </h3>{" "}
        <span
          className={`${classes["margin-5"]} ${classes["flex-wrap"]} ${classes["padd-5"]}`}
          style={{ width: "", alignItems: "center" }}
        >
          <span className={`${classes["margin-5"]}`}>(부) {stud.dad}</span>
          <span className={`${classes["margin-5"]}`}>{stud.dadTel}</span>
        </span>
        <span
          className={`${classes["margin-5"]} ${classes["flex-wrap"]} ${classes["padd-5"]}`}
          style={{ width: "", alignItems: "center" }}
        >
          <span className={`${classes["margin-5"]}`}>(모) {stud.mom}</span>
          <span className={`${classes["margin-5"]}`}>{stud.momTel}</span>
        </span>
      </div>
    ));

    return (
      <>
        <div className={`${classes["flex-wrap"]}`} style={{ width: "90%" }}>
          <h2
            className={`${classes["bottom-content-li"]} ${classes["flex-wrap"]}`}
            style={{ width: "200px" }}
          >
            부모 연락처
          </h2>
        </div>
        {telAll}
      </>
    );
  };

  //형제자매 관련 데이터 보여주기
  const showBnS = () => {
    let new_studentsInfo = [...studentsInfo];
    let bnsAll = new_studentsInfo?.map((stud) => {
      if (stud.bns === "") return null;

      return (
        <div
          key={stud.num + "bns"}
          className={`${classes["bottom-content-li"]} ${classes["flex-wrap"]} ${classes["fs-11"]}`}
          style={{ width: "300px" }}
        >
          <h3 style={{ width: "300px" }}>
            {stud.num} {stud.name}
          </h3>{" "}
          <span
            className={`${classes["margin-5"]} ${classes["flex-wrap"]} ${classes["padd-5"]}`}
            style={{ width: "", alignItems: "center" }}
          >
            <span className={`${classes["margin-5"]}`}> {stud.bns}</span>
          </span>
        </div>
      );
    });

    return (
      <>
        <div className={`${classes["flex-wrap"]}`} style={{ width: "90%" }}>
          <h2
            className={`${classes["bottom-content-li"]} ${classes["flex-wrap"]}`}
            style={{ width: "200px" }}
          >
            형제자매
          </h2>
        </div>
        {bnsAll}
        {new_studentsInfo?.filter((stud) => stud.bns !== "")?.length === 0 &&
          "* 자료가 없습니다."}
      </>
    );
  };

  //기타 관련 데이터 보여주기
  const showEtc = () => {
    let new_studentsInfo = [...studentsInfo];
    let bnsAll = new_studentsInfo?.map((stud) => {
      if (stud.etc === "") return null;

      return (
        <div
          key={stud.num + "etc"}
          className={`${classes["bottom-content-li"]} ${classes["flex-wrap"]} ${classes["fs-11"]}`}
          style={{ width: "300px" }}
        >
          <h3 style={{ width: "300px" }}>
            {stud.num} {stud.name}
          </h3>{" "}
          <span
            className={`${classes["margin-5"]} ${classes["flex-wrap"]} ${classes["padd-5"]}`}
            style={{ width: "", alignItems: "center" }}
          >
            <span className={`${classes["margin-5"]}`}> {stud.etc}</span>
          </span>
        </div>
      );
    });

    return (
      <>
        <div className={`${classes["flex-wrap"]}`} style={{ width: "90%" }}>
          <h2
            className={`${classes["bottom-content-li"]} ${classes["flex-wrap"]}`}
            style={{ width: "200px" }}
          >
            기타 정보
          </h2>
        </div>
        {bnsAll}
        {new_studentsInfo?.filter((stud) => stud.etc !== "")?.length === 0 &&
          "* 자료가 없습니다."}
      </>
    );
  };

  return (
    <div>
      {/* 학생 보여주는 부분 */}
      <ManageEach
        students={props.students}
        userUid={props.userUid}
        isSubject={props.isSubject}
        selectStudentHandler={selectStudentHandler}
        clName={clName}
        passStudent={onStudent}
        nowClassNameHandler={nowClassNameHandler}
      />

      {/* 학생 관련 정보 보여주기 */}
      <ul className={classes["bottom-content-ul"]}>
        {/* 엑셀 다운, 업로드 부분 */}
        <div className={`${classes["flex-center"]} ${classes["margin-15"]}`}>
          <Button
            name={
              <a
                href={
                  !nowSubject
                    ? "https://docs.google.com/uc?export=download&id=1h6klLxXkld4ZUeWedjCiO3XN7-4GWO9M"
                    : "https://docs.google.com/uc?export=download&id=1TlTFGcZO3f6i_tToLyjwxKgVnvcz5TXX"
                }
                className={classes["a-link"]}
              >
                양식파일 다운<i className="fa-solid fa-download"></i>
              </a>
            }
            className={"save-classItem-button"}
            style={{
              width: "165px",
              backgroundColor: "#f3feff",
              padding: "1.5vh",
              height: "auto",
              fontSize: "0.8rem",
            }}
          />
          <label
            id="excelFileLabel"
            htmlFor="excelFile"
            className={classes.excelfileUploadBtn}
          >
            업로드&저장
          </label>
          <input
            type="file"
            id="excelFile"
            ref={fileInfoInput}
            onChange={(e) => {
              excelFileHandler(e);
            }}
            style={{ display: "none" }}
            accept={".xls,.xlsx"}
          />
        </div>

        {/* 전담용 화면 */}
        {nowSubject && (
          <>
            {/* 전체 출결 확인 출결옵션별 횟수 기록 */}
            <li className={classes["bottom-content-li"]}>
              {/* 학생이 선택되지 않았으면 */}
            </li>
          </>
        )}
        {/* 담임용 화면 */}
        {!nowSubject && (
          <>
            {/* 학생이 선택되지 않았으면 요소들 버튼과 버튼 클릭시 옵션에 따라 전체 학생의 정보들 보여주기*/}
            {onStudent === "" && (
              <>
                <div>
                  <Button
                    name={"생일(월별)"}
                    onclick={() => {
                      setOnOption("month");
                    }}
                    className={"stdInfo-btn"}
                  />
                  <Button
                    name={"학생연락처"}
                    onclick={() => {
                      setOnOption("studTel");
                    }}
                    className={"stdInfo-btn"}
                  />
                  <Button
                    name={"부모연락처"}
                    onclick={() => {
                      setOnOption("parentsTel");
                    }}
                    className={"stdInfo-btn"}
                  />

                  <Button
                    name={"형제자매"}
                    onclick={() => {
                      setOnOption("bns");
                    }}
                    className={"stdInfo-btn"}
                  />
                  <Button
                    name={"기타"}
                    onclick={() => {
                      setOnOption("etc");
                    }}
                    className={"stdInfo-btn"}
                  />
                </div>

                {/* 전체학생의 정보들 보여주기 */}
                <div className={`${classes["flex-wrap"]}`}>
                  {onOption === "month" && showStudentsBirth()}
                  {onOption === "studTel" && showStudentsTel()}
                  {onOption === "parentsTel" && showParentsTel()}
                  {onOption === "bns" && showBnS()}
                  {onOption === "etc" && showEtc()}
                </div>
              </>
            )}

            {/* 학생이 선택되었을 때 보여줄 것들 */}
            {onStudent !== "" && <h2>* 개발중입니다.</h2>}
          </>
        )}
      </ul>
    </div>
  );
};

export default ManageStudentInfo;
