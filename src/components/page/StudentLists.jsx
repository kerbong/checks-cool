import React, { useState, useEffect, useRef } from "react";
import TypingStudent from "../Student/TypingStudent";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { dbService } from "../../fbase";
import StudentLiWithDelete from "../Student/StudentLiWithDelete";
import StudentExcelUpload from "../Student/StudentExcelUpload";
import Swal from "sweetalert2";
import StudentInputByOcr from "../Student/StudentInputByOcr";
import Button from "../Layout/Button";
import dayjs from "dayjs";

import classes from "../Student/TypingStudent.module.css";
import {
  FaCircleArrowUp,
  FaFileArrowUp,
  FaRegFileImage,
  FaRegFloppyDisk,
  FaUserPlus,
} from "react-icons/fa6";

const StudentLists = (props) => {
  const [addStudentBy, setAddStudentBy] = useState(
    props.students.length !== 0 ? "typing" : "excelFile"
  );
  const [wholeClass, setWholeClass] = useState([]);
  const [studentsInfo, setStudentsInfo] = useState([]);

  const [nowClassName, setNowClassName] = useState("");

  const selectRef = useRef();

  //초기 렌더링 및 클릭해서 화면 세팅이 바뀌면 예시 이미지 설정하기
  useEffect(() => {}, [addStudentBy]);

  //학년도 설정함수
  const setYear = () => {
    //학생자료 등록의 경우..예외적으로 2월부터는 새로운 학년도로 인식함

    return dayjs().format("MM-DD") <= "02-15"
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  useEffect(() => {
    let now_year = setYear();

    //현재학년도 자료만 입력가능하고,, 불러오기
    let nowStudents = props?.students?.filter(
      (yearStd) => String(Object.keys(yearStd)[0]) === now_year
    )?.[0]?.[now_year];

    if (props.isSubject) {
      if (nowStudents?.length > 0) {
        setWholeClass(sortWholeClass(nowStudents));
        setStudentsInfo(...Object.values(nowStudents[0]));
        setNowClassName(Object.keys(nowStudents[0])[0]);
      }
    } else {
      setStudentsInfo(nowStudents);
    }
  }, [props.isSubject]);

  //저장버튼 누르면 현재 학생목록을 firestore에 저장하는 함수(덮어쓰기)
  const uploadStudents = async (up_data, isExcel) => {
    const uploadLogic = async (data) => {
      //현재학년도를 제외한 학생자료 만들어서 exceptNow 배열에 저장
      const studentsRef = doc(dbService, "students", props.userUid);
      const studentSnap = await getDoc(studentsRef);

      let uploadData = [];
      if (studentSnap.exists()) {
        // console.log(studentSnap.data());
        let exceptNow = [];
        // console.log(studentSnap);
        studentSnap.data()?.studentDatas?.forEach((yearData) => {
          if (Object.keys(yearData)[0] !== Object.keys(data)[0]) {
            exceptNow.push(yearData);
          }
        });
        exceptNow.push({ ...data });
        uploadData = exceptNow;
      } else {
        uploadData = [{ ...data }];
      }

      if (isExcel) {
        Swal.fire({
          icon: "success",
          title: "저장되었어요!",
          text: `엑셀파일의 학생정보가 업로드 되었습니다.`,
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "저장되었어요!",
          text: `수정/추가된 학생 명단이 저장되었습니다.`,
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
      }
      // console.log(uploadData);

      //업로드할 데이터, 기존자료에 전달받은 학년도 자료 추가

      await setDoc(doc(dbService, "students", props.userUid), {
        studentDatas: uploadData,
      });
    };

    // 만약 현재 1, 2월인 경우.  학년도 기준 설명하고 계속 저장할지 ... 물어보기
    if (+dayjs().format("MM") <= 2) {
      Swal.fire({
        title: "학생명부를 저장할까요?",
        html: `학생명부는 <b>${setYear()}학년도</b> 로 저장됩니다. <br/><br/>  * 학년도 기준 : 2월 15일 <br/> (예 2023.02.16. ~ 2024.2.15.)`,
        showDenyButton: true,
        confirmButtonText: "저장",
        confirmButtonColor: "#db100cf2",
        denyButtonColor: "#85bd82",
        denyButtonText: `취소`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          uploadLogic(up_data);
        }
      });
    } else {
      uploadLogic(up_data);
    }
  };

  const submitStudentUploader = async (isExcel) => {
    //명부를 전담, 담임에 맞게 수정하는 함수
    const fixStudentsData = (isExcel) => {
      if (!props.isSubject) {
        // console.log(studentsInfo);
        let new_studentsInfo = [...studentsInfo];
        new_studentsInfo = new_studentsInfo?.map((stu) => {
          if (!stu.hasOwnProperty("woman")) {
            stu["woman"] = false;
          }
          //혹시 pair정보가 있으면 삭제..!
          if (stu.hasOwnProperty("pair")) {
            delete stu.pair;
          }

          return stu;
        });

        const fixed_data = {
          [setYear()]: sortNum(new_studentsInfo),
        };

        uploadStudents(fixed_data, isExcel);

        //전담용 로직
      } else {
        // console.log(wholeClass);
        let new_wholeClass = [...wholeClass];
        new_wholeClass = new_wholeClass?.map((cl) => {
          //각반 학생들을 정렬하고 성별 속성 부여
          sortNum(Object.values(cl))?.map((stu) => {
            if (!stu.hasOwnProperty("woman")) {
              stu["woman"] = false;
            }

            //혹시 pair정보가 있으면 삭제..!
            if (stu.hasOwnProperty("pair")) {
              delete stu.pair;
            }
            return stu;
          });
          // console.log(cl);
          // new_wholeClass.push({`${Object.keys(cl)[0]}`:new_cl});
          return cl;
        });
        const fixed_data = {
          [setYear()]: new_wholeClass,
        };

        // console.log(fixed_data);
        uploadStudents(fixed_data, isExcel);
      }
    };

    if (isExcel === true) {
      fixStudentsData(isExcel);
    } else {
      //기존 자료에 덮어쓰기 됨을 알리기
      Swal.fire({
        icon: "question",
        title: "저장할까요?",
        html: `번호나 이름이 중복되지 않았는지 확인 후 '저장 버튼'을 눌러주세요!`,
        showDenyButton: true,
        confirmButtonText: "저장",
        confirmButtonColor: "#db100cf2",
        denyButtonColor: "#85bd82",
        denyButtonText: `취소`,
      }).then((result) => {
        if (result.isConfirmed) {
          // firestore에 저장하기
          // 담임교사
          // 여자 설정을 안한 경우 남자로 모두 설정하기
          fixStudentsData();

          //취소할 경우 저장하지 않기
        } else {
          return;
        }
      });
    }
  };

  const sortNum = (students) => {
    const sorted_students = students.sort(function (a, b) {
      let a_num = `${a.num}`;
      let b_num = `${b.num}`;
      return a_num - b_num;
    });

    return sorted_students;
  };

  //전담인 경우 전체 반을 정렬하는 함수
  const sortWholeClass = (whole) => {
    const sorted_classes = whole.sort(function (a, b) {
      let a_className = `${Object.keys(a)}`;
      let b_className = `${Object.keys(b)}`;
      return a_className > b_className ? 1 : -1;
    });

    return sorted_classes;
  };

  useEffect(() => {
    //현재 반 이름 세팅이 끝나면
    if (props.isSubject && nowClassName !== "") {
      // 현재 선택된 반만 학생 정보 수정하기
      let new_wholeClass = [...wholeClass]?.map((cl) => {
        let new_cl = cl;
        if (Object.keys(cl)[0] === nowClassName) {
          new_cl = { [nowClassName]: studentsInfo };
        }
        return new_cl;
      });
      //전체반 자료 업데이트
      setWholeClass([...new_wholeClass]);
    }
  }, [studentsInfo]);

  //학생 제거 함수
  const deleteStudentHandler = (student) => {
    let new_studentsInfo = [...studentsInfo]?.filter(
      (stu) => +stu.num !== +student.num
    );
    // console.log(new_studentsInfo);
    setStudentsInfo([...new_studentsInfo]);

    return new_studentsInfo;
  };

  const setAddStudentsInfo = (studentData) => {
    //현재 학생이 있으면.. 제거하고 푸시
    let new_studentsInfo = [];
    if (studentsInfo?.length > 0 || studentsInfo !== undefined) {
      //같은 번호 학생이 있으면 제거하고
      new_studentsInfo = deleteStudentHandler(studentData);
    }
    //새롭게 저장하기
    new_studentsInfo.push(studentData);

    setStudentsInfo(sortNum(new_studentsInfo));
  };

  const studentGenderChange = (student) => {
    let new_studentsInfo = [...studentsInfo];
    new_studentsInfo.forEach((stu, index) => {
      if (stu.name === student.name) {
        new_studentsInfo[index]["woman"] = !stu.woman;
      }
    });
    setStudentsInfo([...new_studentsInfo]);
  };

  //엑셀파일 업로드하기
  const excelUploadHandler = (data) => {
    //전담이면
    if (props.isSubject) {
      // setWholeClass([...data]);
      setWholeClass(sortWholeClass(data));
      setNowClassName(Object.keys(data[0])[0]);

      setStudentsInfo(...Object.values(data[0]));

      // 담임이면
    } else {
      setStudentsInfo([...data]);
    }
  };

  //학급 선택시 실행되는 함수
  const selectClassHandler = () => {
    let className = selectRef.current.value;
    //wholeClass에서 해당하는 학급 찾아서 studentsInfo에 저장
    wholeClass.forEach((cl) => {
      if (Object.keys(cl)[0] === className) {
        setStudentsInfo(Object.values(cl)[0]);
      }
    });
    setNowClassName(className);
  };

  return (
    <div>
      <div id="title-div">
        <button id="title-btn" className="upload">
          <FaUserPlus /> 학생등록
        </button>

        {addStudentBy === "typing" && (
          <>
            <Button
              id="excelFile"
              className={"studentAddBtn"}
              name={
                <>
                  <span className="excel-upload-text">엑셀</span>{" "}
                  <FaFileArrowUp />
                </>
              }
              onclick={() => setAddStudentBy("excelFile")}
            />

            {/* 전담이 아닐 때만 보여줌 */}
            {!props.isSubject && (
              <Button
                id="imageFile"
                className={"studentAddBtn"}
                name={
                  <>
                    <span className="excel-upload-text">명렬표</span>{" "}
                    <FaRegFileImage />
                  </>
                }
                onclick={() => setAddStudentBy("imageFile")}
              />
            )}
          </>
        )}

        {addStudentBy === "excelFile" && (
          <>
            <Button
              id="typing"
              className={"studentAddBtn"}
              name={
                <>
                  <span className="excel-upload-text">직접</span>{" "}
                  <FaCircleArrowUp />
                </>
              }
              onclick={() => setAddStudentBy("typing")}
            />
            {/* 전담이 아닐 때만 보여줌 */}
            {!props.isSubject && (
              <Button
                id="imageFile"
                className={"studentAddBtn"}
                name={
                  <>
                    <span className="excel-upload-text">명렬표</span>{" "}
                    <FaRegFileImage />
                  </>
                }
                onclick={() => setAddStudentBy("imageFile")}
              />
            )}
          </>
        )}

        {addStudentBy === "imageFile" && !props.isSubject && (
          <>
            <Button
              id="typing"
              className={"studentAddBtn"}
              name={
                <>
                  <span className="excel-upload-text">직접</span>{" "}
                  <FaCircleArrowUp />
                </>
              }
              onclick={() => setAddStudentBy("typing")}
            />

            <Button
              id="excelFile"
              className={"studentAddBtn"}
              name={
                <>
                  <span className="excel-upload-text">엑셀</span>{" "}
                  <FaFileArrowUp />
                </>
              }
              onclick={() => setAddStudentBy("excelFile")}
            />
          </>
        )}
      </div>

      {/* 전담이면 반을 선택할 수 있는 셀렉트태그 보여주기 */}
      {props.isSubject && addStudentBy !== "imageFile" && (
        <div className={classes.addStudentInputs}>
          <select
            ref={selectRef}
            onChange={selectClassHandler}
            className={classes["class-select"]}
            value={nowClassName}
          >
            <option value="">--학급--</option>
            {wholeClass?.map((cl) => (
              <option key={Object.keys(cl)} value={Object.keys(cl)}>
                {Object.keys(cl)}
              </option>
            ))}
          </select>
          <Button
            className={
              wholeClass.length > 0 ? "student-save-uploaded" : "student-save"
            }
            id="studentLists-save"
            name={
              <>
                {wholeClass.length > 0 && "클릭! "}
                <FaRegFloppyDisk />
              </>
            }
            onclick={submitStudentUploader}
          />
        </div>
      )}

      {addStudentBy === "typing" && (
        // 직접 타이핑 하는 학생입력 화면
        <>
          <TypingStudent
            studentsInfo={studentsInfo}
            setAddStudentsInfo={(studentData) =>
              setAddStudentsInfo(studentData)
            }
            studentGenderChange={(student) => {
              studentGenderChange(student);
            }}
            deleteStudentHandler={(student) => deleteStudentHandler(student)}
            uploadStudentsInfo={submitStudentUploader}
            deleteAllHandler={() => {
              setStudentsInfo([]);
            }}
            userUid={props.userUid}
            isSubject={props.isSubject}
            nowClassName={nowClassName}
          />
        </>
      )}

      {addStudentBy === "excelFile" && (
        <>
          {/* 엑셀파일 업로드 & 업로드 파일에서 불러온 자료 */}
          <StudentExcelUpload
            studentsInfoHandler={(data) => {
              excelUploadHandler(data);
              // submitStudentUploader(true);
            }}
            studentsInfo={studentsInfo}
            uploadStudentsInfo={submitStudentUploader}
            isSubject={props.isSubject}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {studentsInfo &&
              studentsInfo?.map((student) => (
                <StudentLiWithDelete
                  key={"key" + student.num + student.name}
                  myKey={student.num + student.name}
                  student={student}
                  studentFixHandler={(student) => {
                    studentGenderChange(student);
                  }}
                  deleteStudentHandler={(student) => {
                    deleteStudentHandler(student);
                  }}
                />
              ))}
          </div>
        </>
      )}

      {addStudentBy === "imageFile" && (
        <StudentInputByOcr
          studentsInfo={studentsInfo}
          setAddStudentsInfo={(studentData) => {
            setStudentsInfo([...studentData]);
            setAddStudentBy("typing");
          }}
          isSubject={props.isSubject}
        />
      )}

      <p>
        * 문제는 kerbong@gmail.com으로 알려주세요.
        <br />
        최대한 빠르게 해결해 드릴게요!
      </p>
    </div>
  );
};

export default StudentLists;
