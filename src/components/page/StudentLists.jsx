import React, { useState, useEffect } from "react";
import TypingStudent from "../Student/TypingStudent";
import { doc, setDoc } from "firebase/firestore";
import { dbService } from "../../fbase";
import StudentLiWithDelete from "../Student/StudentLiWithDelete";
import StudentExcelUpload from "../Student/StudentExcelUpload";
import Swal from "sweetalert2";

const StudentLists = (props) => {
  const [addStudentByFile, setAddStudentByFile] = useState(false);
  const [studentsInfo, setStudentsInfo] = useState([]);

  //직접입력 <<==>> 파일업로드 바꾸는 함수
  const addStudentHandler = () => {
    setAddStudentByFile((prev) => !prev);
  };

  //학생 제거 함수
  const deleteStudentHandler = (num) => {
    //학생 번호를 제외한 리스트 새로 만들어서 등록
    setStudentsInfo((prev) => [...prev.filter((stu) => stu.num !== num)]);
  };

  useEffect(() => {
    setStudentsInfo(props.students);
  }, [props.students]);

  //학생 추가하는 함수(덮어쓰기)
  const uploadStudents = async (data) => {
    await setDoc(doc(dbService, "students", props.userUid), data);
  };

  const submitStudentUploader = async () => {
    //변경된 값이 없으면 return.. 차집합으로 계산해서 완전 겹쳐지면.. 차집합 영역이 둘다 없으면 return
    let differ1 = studentsInfo.filter((x) => !props.students.includes(x));
    let differ2 = props.students.filter((x) => !studentsInfo.includes(x));

    if (differ1.length === 0 && differ2.length === 0) {
      Swal.fire({
        icon: "error",
        title: "저장에 실패했어요!",
        html: "변경된 자료가 없어요! 확인해주세요!",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
      });
      return;
    }

    //기존 자료에 덮어쓰기 됨을 알리기
    Swal.fire({
      title: "저장하시겠어요?",
      text: `기존 학생의 번호나 이름이 변경될 경우 자료와 내용이 사라질 수 있습니다.`,
      showDenyButton: true,
      confirmButtonText: "저장/덮어쓰기",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      // firestore에 저장하기
      if (result.isConfirmed) {
        const fixed_data = { studentDatas: studentsInfo };
        uploadStudents(fixed_data);
        //취소할 경우 저장하지 않기
      } else {
        return;
      }
    });
  };

  return (
    <div>
      <div id="title-div">
        <button id="title-btn" className="upload">
          <i className="fa-solid fa-user-plus"></i> 학생등록
        </button>

        <button id="switch-btn" onClick={addStudentHandler}>
          {!addStudentByFile ? (
            <i className="fa-solid fa-file-arrow-up"></i>
          ) : (
            <i className="fa-solid fa-circle-arrow-up"></i>
          )}
        </button>
      </div>
      {!addStudentByFile ? (
        // 직접 타이핑 하는 학생입력 화면
        <TypingStudent
          studentsInfo={studentsInfo}
          setAddStudentsInfo={(studentData) =>
            setStudentsInfo((prev) => [...prev, studentData])
          }
          setDelStudentsInfo={(num) =>
            setStudentsInfo((prev) => [
              ...prev.filter((stu) => stu.num !== num),
            ])
          }
          uploadStudentsInfo={submitStudentUploader}
        />
      ) : (
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
                  key={student.num}
                  student={student}
                  deleteStudentHandler={(num) => {
                    deleteStudentHandler(num);
                  }}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentLists;
