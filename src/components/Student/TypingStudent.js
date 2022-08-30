import React, { useRef, useState } from "react";
import Input from "../Layout/Input";
import Button from "../Layout/Button";
import classes from "./TypingStudent.module.css";
import Swal from "sweetalert2";
import StudentLiWithDelete from "./StudentLiWithDelete";

const TypingStudent = (props) => {
  const [tempAutoNum, setTempAutoNum] = useState(1);

  let numberRef = useRef(null);
  const nameRef = useRef(null);

  //학생 추가하기 함수
  const submitHandler = (e) => {
    e.preventDefault();
    //번호 이름 값가져오기
    let studentNumValue = numberRef.current.value;
    let studentNameValue = nameRef.current.value;

    //같은 이름의 학생이 있는지 확인!
    let existedStudent = props.studentsInfo.filter(
      (stu) => stu.name === studentNameValue
    );

    //비어있는 정보가 있으면 alert띄워주기
    if (studentNameValue.trim() === "" || existedStudent.length !== 0) {
      console.log(studentNameValue.trim() === "");
      console.log(existedStudent);
      Swal.fire({
        icon: "error",
        title: "저장에 실패했어요.",
        text: "학생번호 / 이름 정보를 확인해주세요!",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return;
    }

    const studentData = { num: studentNumValue, name: studentNameValue };
    props.setAddStudentsInfo(studentData);

    //자동으로 번호 다음으로 입력해주기
    setTempAutoNum(+studentNumValue + 1);
    numberRef = tempAutoNum;
    studentNameValue = "";
  };

  //학생 제거 함수
  const deleteStudentHandler = (num) => {
    console.log(num);
    //학생 번호를 제외한 리스트 새로 만들어서 등록
    props.setDelStudentsInfo(num);
  };

  //학생자료 firebase upload함수
  const uploadStudentHandler = () => {
    props.uploadStudentsInfo();
  };
  return (
    <>
      <div className={classes.addStudent}>
        <div className={classes.addStudentInputs}>
          <form onSubmit={submitHandler}>
            <div className={classes.inputArea}>
              <Input
                ref={numberRef}
                className={classes["input-num"]}
                label="inputData"
                input={{
                  type: "number",
                  placeholder: "번호",
                  key: tempAutoNum,
                  defaultValue: tempAutoNum,
                  autoFocus: true,
                  min: 1,
                  step: 1,
                }}
                required={true}
              />
              <Input
                ref={nameRef}
                className={classes["input-name"]}
                label="inputData"
                input={{
                  type: "text",
                  placeholder: "이름을 입력하세요.",
                  defaultValue: "",
                  autoFocus: true,
                }}
                required={true}
              />
              <Button
                className="student-add"
                name={<i className="fa-solid fa-plus"></i>}
                onclick={submitHandler}
              />
            </div>
          </form>
          <Button
            className="student-save"
            name={<i className="fa-regular fa-floppy-disk"></i>}
            onclick={uploadStudentHandler}
          />
        </div>

        <div className={classes.studentListArea}>
          {props.studentsInfo.map((student) => (
            <StudentLiWithDelete
              key={student.num}
              student={student}
              deleteStudentHandler={(num) => {
                deleteStudentHandler(num);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TypingStudent;
