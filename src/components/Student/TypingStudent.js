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
    //같은 번호의 학생이 있는지 확인!
    let existedNum = props.studentsInfo.filter(
      (stu) => stu.num === studentNumValue
    );

    //비어있는 정보가 있거나 동일한 이름, 번호의 학생이 있으면 alert띄워주기
    if (
      studentNameValue.trim() === "" ||
      existedStudent.length !== 0 ||
      existedNum.length !== 0
    ) {
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
    nameRef.current.value = "";
  };

  //학생 제거 함수
  const deleteStudentHandler = (num) => {
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
                name={
                  <>
                    1 <i className="fa-solid fa-plus"></i>
                  </>
                }
                onclick={submitHandler}
              />
            </div>
          </form>
          <Button
            className="student-save"
            name={
              <>
                2 <i className="fa-regular fa-floppy-disk"></i>
              </>
            }
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
        <div className={classes.studentListArea}>
          * 학생을 추가 / 수정한 뒤에는{"  "}
          <span className={classes["span-highlight"]}> 저장버튼(2) </span>을
          눌러 적용시켜주세요!
        </div>
        <p>
          * 문제가 지속되시면 kerbong@gmail.com으로 알려주세요. 최대한 빠르게
          해결해 드릴게요!
        </p>
      </div>
    </>
  );
};

export default TypingStudent;
