import React, { useRef, useState } from "react";
import Button from "../Layout/Button";
import classes from "./TypingStudent.module.css";
import StudentLiWithDelete from "./StudentLiWithDelete";
import Swal from "sweetalert2";

const TypingStudent = (props) => {
  const [tempAutoNum, setTempAutoNum] = useState(1);
  const [tempStudent, setTempStudent] = useState({});
  let numberRef = useRef(null);
  const nameRef = useRef(null);

  //학생 추가/수정하기 함수
  const submitHandler = (e) => {
    e.preventDefault();
    //번호 이름 값가져오기
    let studentNumValue = numberRef.current.value;
    let studentNameValue = nameRef.current.value;

    // //같은 번호의 학생이 있을 경우 해당 값 지우기
    // props.deleteStudentHandler({ num: studentNumValue });

    //학생추가하기
    const studentData = { num: studentNumValue, name: studentNameValue };
    props.setAddStudentsInfo(studentData);

    //자동으로 번호 다음으로 입력해주기
    setTempAutoNum(+studentNumValue + 1);
    numberRef = tempAutoNum;
    nameRef.current.value = "";

    //임시 학생저장값 초기화
    setTempStudent({});
  };

  //학생 제거 함수
  const deleteStudentHandler = (student) => {
    //학생 번호를 제외한 리스트 새로 만들어서 등록
    props.deleteStudentHandler(student);
  };

  //학생 전체 제거 함수
  const deleteAllHandler = () => {
    //학생 번호를 제외한 리스트 새로 만들어서 등록
    Swal.fire({
      icon: "question",
      title: "삭제할까요?",
      text: `학생정보를 모두 삭제할까요?.`,
      showDenyButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire({
        //   icon: "success",
        //   title: "삭제완료",
        //   text: `모든 학생정보가 삭제되었습니다.`,
        //   confirmButtonText: "확인",
        //   confirmButtonColor: "#85bd82",
        //   timer: 4000,
        // });

        props.deleteAllHandler();
      }
    });
  };

  //학생자료 firebase upload함수 저장버튼
  const uploadStudentHandler = () => {
    props.uploadStudentsInfo();
  };

  //기존 학생 클릭하면 수정할 수 있도록 인풋창에 보여주는 함수
  const studentFixHandler = (student) => {
    numberRef.current.value = student.num;
    nameRef.current.value = student.name;
    setTempStudent({ ...student });
    //성별 바꾸기 함수
    props.studentGenderChange(student);
  };

  return (
    <>
      <div className={classes.addStudent}>
        <div className={classes.addStudentInputs}>
          <form onSubmit={submitHandler}>
            <div className={classes.inputArea}>
              <input
                ref={numberRef}
                className={classes["input-num"]}
                label="inputData"
                type="number"
                placeholder="번호"
                key={tempAutoNum}
                defaultValue={tempAutoNum}
                min="1"
                step="1"
                required={true}
              />
              <input
                ref={nameRef}
                className={classes["input-name"]}
                label="inputData"
                type="text"
                placeholder="이름을 입력하세요."
                defaultValue=""
                autoFocus={true}
                required={true}
              />
              {/* 학생 추가 / 수정완료 버튼 */}
              <Button
                className="student-add"
                name={
                  <>
                    <i className="fa-solid fa-plus"></i>/
                    <i className="fa-solid fa-pencil"></i>
                  </>
                }
                onclick={submitHandler}
              />
            </div>
          </form>

          {/* 전체 저장버튼 전담버전에서는 나오지 않도록*/}
          {!props.isSubject && (
            <Button
              className="student-save"
              name={
                <>
                  <i className="fa-regular fa-floppy-disk"></i>
                </>
              }
              onclick={uploadStudentHandler}
            />
          )}
        </div>

        <p className={classes.studentBgColorInfo}>
          {" "}
          <span className={classes.genderExample}>여학생</span>
          &nbsp;&nbsp;&nbsp;남학생&nbsp;&nbsp;&nbsp;| 이름 클릭하면 성별 변경
        </p>
        <div className={classes.studentListArea}>
          {props.studentsInfo?.map((student) => (
            <StudentLiWithDelete
              key={student.num + student.name}
              myKey={student.num + student.name}
              student={student}
              deleteStudentHandler={(student) => {
                deleteStudentHandler(student);
              }}
              studentFixHandler={(student) => {
                studentFixHandler(student);
              }}
            />
          ))}
        </div>
        {/* 전체삭제 버튼 */}
        <div className={classes["deleteAll-div"]}>
          {props.studentsInfo?.length !== 0 && (
            <Button
              className="student-save"
              name={
                <>
                  전체
                  <i className="fa-solid fa-trash-can"></i>
                </>
              }
              onclick={deleteAllHandler}
            />
          )}
        </div>
        <div className={classes.studentListArea}>
          <hr className={classes["hr"]} />
          <span className={classes["span-title"]}>학생 직접 입력/수정</span>

          <hr className={classes["hr"]} />
          <div className={classes["div-explain"]}>
            <span className={classes["span-explain"]}>
              * 번호와 이름을 직접 입력하거나 <br />
              학생의 이름을 눌러서 수정한 후<br />
              <span className={classes["span-highlight"]}>추가/수정 버튼</span>
              을 눌러주세요.
            </span>

            <span className={classes["span-explain"]}>
              * 모든 입력/수정이 끝나면 꼭!!!
              <br />
              <span className={classes["span-highlight"]}>
                {" "}
                저장버튼으로 반영
              </span>
              해주세요!
            </span>
          </div>
          <hr className={classes["hr"]} />
          <span className={classes["span-explain"]}>
            * 화면 왼쪽 상단의 보라색 [학생등록] <br />
            버튼을 누르시면 예시를 보실 수 있어요!
            <br />
          </span>
          <hr className={classes["hr"]} />
        </div>
      </div>
    </>
  );
};

export default TypingStudent;
