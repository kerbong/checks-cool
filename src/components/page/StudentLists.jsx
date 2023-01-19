import React, { useState, useEffect, useRef } from "react";
import TypingStudent from "../Student/TypingStudent";
import { doc, setDoc } from "firebase/firestore";
import { dbService } from "../../fbase";
import StudentLiWithDelete from "../Student/StudentLiWithDelete";
import StudentExcelUpload from "../Student/StudentExcelUpload";
import Swal from "sweetalert2";
import StudentInputByOcr from "../Student/StudentInputByOcr";
import Button from "../Layout/Button";
import ExampleModal from "./ExampleModal";

import ocrGif from "../../assets/student/ocrGif.gif";
import typingGif from "../../assets/student/typing_new_upload.gif";
import excelGif from "../../assets/student/excel_new_upload.gif";
import classes from "../Student/TypingStudent.module.css";

const StudentLists = (props) => {
  const [addStudentBy, setAddStudentBy] = useState(
    props.students.length !== 0 ? "typing" : "excelFile"
  );
  const [wholeClass, setWholeClass] = useState([]);
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [showExample, setShowExample] = useState(false);
  const [nowClassName, setNowClassName] = useState("");

  const selectRef = useRef();

  useEffect(() => {
    if (props.isSubject) {
      if (props.students.length > 0) {
        setWholeClass(sortWholeClass(props?.students));
        setStudentsInfo(...Object.values(props.students[0]));
        setNowClassName(Object.keys(props.students[0])[0]);
      }
    } else {
      setStudentsInfo(props?.students);
    }
  }, [props.isSubject]);

  //저장버튼 누르면 현재 학생목록을 firestore에 저장하는 함수(덮어쓰기)
  const uploadStudents = async (data) => {
    await setDoc(doc(dbService, "students", props.userUid), data);
  };

  const submitStudentUploader = async () => {
    //기존 자료에 덮어쓰기 됨을 알리기
    Swal.fire({
      icon: "question",
      title: "저장할까요?",
      text: `번호나 이름이 중복되지 않았는지 확인해주세요.`,
      showDenyButton: true,
      confirmButtonText: "저장",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      if (result.isConfirmed) {
        // firestore에 저장하기
        // 여자 설정을 안한 경우 남자로 모두 설정하기
        if (!props.isSubject) {
          let new_studentsInfo = [...studentsInfo];
          new_studentsInfo.map((stu) => {
            if (!stu.hasOwnProperty("woman")) {
              stu["woman"] = false;
            }
            return stu;
          });

          const fixed_data = { studentDatas: sortNum(new_studentsInfo) };
          uploadStudents(fixed_data);

          //전담용 로직
        } else {
          console.log(wholeClass);
          let new_wholeClass = [...wholeClass];
          new_wholeClass.map((cl) => {
            //각반 학생들을 정렬하고 성별 속성 부여
            sortNum(Object.values(cl)).map((stu) => {
              if (!stu.hasOwnProperty("woman")) {
                stu["woman"] = false;
              }
              return stu;
            });
            console.log(cl);
            // new_wholeClass.push({`${Object.keys(cl)[0]}`:new_cl});
            return cl;
          });
          const fixed_data = { studentDatas: new_wholeClass };

          console.log(fixed_data);
          uploadStudents(fixed_data);
        }

        Swal.fire({
          icon: "success",
          title: "저장되었어요!",
          text: "수정/추가된 학생 명단이 저장되었습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });

        //취소할 경우 저장하지 않기
      } else {
        return;
      }
    });
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
      let new_wholeClass = [...wholeClass].map((cl) => {
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
    let new_studentsInfo = [...studentsInfo].filter(
      (stu) => stu.num !== student.num
    );
    console.log(new_studentsInfo);
    setStudentsInfo([...new_studentsInfo]);

    return new_studentsInfo;
  };

  const setAddStudentsInfo = (studentData) => {
    //같은 번호 학생이 있으면 제거하고
    let new_studentsInfo = deleteStudentHandler(studentData);
    //새롭게 저장하기
    new_studentsInfo.push(studentData);
    console.log(new_studentsInfo);
    setStudentsInfo(sortNum(new_studentsInfo));
  };

  const studentGenderChange = (student) => {
    let new_studentsInfo = [...studentsInfo];
    new_studentsInfo.forEach((stu, index) => {
      if (stu.name === student.name) {
        new_studentsInfo[index]["woman"] = student.woman;
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
        <button
          id="title-btn"
          className="upload"
          onClick={() => setShowExample(true)}
        >
          <i className="fa-solid fa-user-plus"></i> 학생등록
        </button>

        {showExample && (
          <ExampleModal
            onClose={() => setShowExample(false)}
            imgSrc={
              addStudentBy === "imageFile"
                ? ocrGif
                : addStudentBy === "typing"
                ? typingGif
                : excelGif
            }
            text={
              <>
                <p
                  style={{
                    fontSize: "1.3em",
                    textAlign: "center",
                    margin: "5px",
                  }}
                >
                  === {addStudentBy === "imageFile" && "학생명부 업로드"}{" "}
                  {addStudentBy === "typing" && "직접 입력"}{" "}
                  {addStudentBy === "excelFile" && "엑셀 업로드 "} 예시 ===
                </p>
                <p style={{ margin: "15px" }}>
                  * 페이지의 왼쪽 상단, [보라색 학생등록]을 클릭하시면 다시 보실
                  수 있어요!
                </p>
              </>
            }
          />
        )}

        {addStudentBy === "typing" && (
          <>
            <Button
              id="excelFile"
              className={"studentAddBtn"}
              name={
                <>
                  <span className="excel-upload-text">엑셀</span>{" "}
                  <i className="fa-solid fa-file-arrow-up"></i>
                </>
              }
              onclick={() => setAddStudentBy("excelFile")}
            />

            <Button
              id="imageFile"
              className={"studentAddBtn"}
              name={
                <>
                  <span className="excel-upload-text">명렬표</span>{" "}
                  <i className="fa-regular fa-file-image"></i>
                </>
              }
              onclick={() => setAddStudentBy("imageFile")}
            />
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
                  <i className="fa-solid fa-circle-arrow-up"></i>
                </>
              }
              onclick={() => setAddStudentBy("typing")}
            />

            <Button
              id="imageFile"
              className={"studentAddBtn"}
              name={
                <>
                  <span className="excel-upload-text">명렬표</span>{" "}
                  <i className="fa-regular fa-file-image"></i>
                </>
              }
              onclick={() => setAddStudentBy("imageFile")}
            />
          </>
        )}

        {addStudentBy === "imageFile" && (
          <>
            <Button
              id="typing"
              className={"studentAddBtn"}
              name={
                <>
                  <span className="excel-upload-text">직접</span>{" "}
                  <i className="fa-solid fa-circle-arrow-up"></i>
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
                  <i className="fa-solid fa-file-arrow-up"></i>
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
            className="student-save"
            name={
              <>
                <i className="fa-regular fa-floppy-disk"></i>
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
            isSubject={props.isSubject}
          />
        </>
      )}

      {addStudentBy === "excelFile" && (
        <>
          {/* 엑셀파일 업로드 & 업로드 파일에서 불러온 자료 */}
          <StudentExcelUpload
            studentsInfoHandler={(data) => excelUploadHandler(data)}
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
              studentsInfo.map((student) => (
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
                  isSubject={props.isSubject}
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
