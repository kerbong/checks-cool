import React, { useState, useEffect } from "react";
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

const StudentLists = (props) => {
  const [addStudentBy, setAddStudentBy] = useState(
    props.students.length !== 0 ? "typing" : "excelFile"
  );
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [showExample, setShowExample] = useState(false);

  //학생 제거 함수
  const deleteStudentHandler = (student) => {
    setStudentsInfo((prev) => {
      //받은 데이터와 기존 등록된 학생이 같은 번호면 그거 다 지우기
      let new_studentsInfo = prev.filter((stu) => stu.num !== student.num);

      return [...new_studentsInfo];
    });
  };

  useEffect(() => {
    setStudentsInfo(props.students);
  }, [props.students]);

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
      // firestore에 저장하기
      // 여자 설정을 안한 경우 남자로 모두 설정하기
      let new_studentsInfo = [...studentsInfo];
      new_studentsInfo.map((stu) => {
        if (!stu.hasOwnProperty("woman")) {
          stu["woman"] = false;
        }
        return stu;
      });

      if (result.isConfirmed) {
        const fixed_data = { studentDatas: sortNum(new_studentsInfo) };
        uploadStudents(fixed_data);

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

  const setAddStudentsInfo = (studentData) => {
    setStudentsInfo((prev) => {
      //새로 수정해서 저장하기
      let students = [...prev, studentData];
      return sortNum(students);
    });
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
                  <span className="excel-upload-text">엑셀 업로드</span>{" "}
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
                  <span className="excel-upload-text">명렬표 이미지</span>{" "}
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
                  <span className="excel-upload-text">직접 입력</span>{" "}
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
                  <span className="excel-upload-text">명렬표 이미지</span>{" "}
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
                  <span className="excel-upload-text">직접 입력</span>{" "}
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
                  <span className="excel-upload-text">엑셀 업로드</span>{" "}
                  <i className="fa-solid fa-file-arrow-up"></i>
                </>
              }
              onclick={() => setAddStudentBy("excelFile")}
            />
          </>
        )}
      </div>

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
          />
        </>
      )}

      {addStudentBy === "excelFile" && (
        <>
          {/* 엑셀파일 업로드 & 업로드 파일에서 불러온 자료 */}
          <StudentExcelUpload
            studentsInfoHandler={(rows) => setStudentsInfo([...rows])}
            studentsInfo={studentsInfo}
            uploadStudentsInfo={submitStudentUploader}
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
