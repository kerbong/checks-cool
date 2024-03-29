import React, { useState, useEffect, useRef } from "react";
import Student from "components/Student/Student";
import dayjs from "dayjs";
import classes from "./ManageEach.module.css";
import ManageChangeBtns from "./ManageChangeBtns";

const ManageEach = (props) => {
  const [student, setStudent] = useState("");
  const [nowClassName, setNowClassName] = useState("");
  const [nowClStudents, setNowClStudents] = useState([]);
  const [nowStudents, setNowStudents] = useState([]);
  const [isSubject, setIsSubject] = useState(false);

  const selectRef = useRef();

  useEffect(() => {
    // 현재 클릭된 학생 clicked css 적용
    if (student !== "") {
      let selectStd = document.getElementById(`std-${student}`);
      selectStd?.classList.remove("none");
      selectStd?.classList.add("clicked");
    }
    //   beforeSelectStd.style.backgroundColor = "#e9cfcc";
    //   beforeSelectStd.style.fontWeight = "400";
    // }
  }, [student]);

  const showOptionHandler = (e) => {
    let clicked_student = e.target.innerText;
    if (student === clicked_student) {
      setStudent("");
    } else {
      setStudent(clicked_student);
    }
    if (student !== "") {
      //이전학생을 원래대로 none click css속성 적용
      let beforeSelectStd = document.getElementById(`std-${student}`);
      beforeSelectStd?.classList.remove("clicked");
      beforeSelectStd?.classList.add("none");
    }
  };

  //학급 선택시 실행되는 함수
  const selectClassHandler = () => {
    let className = selectRef.current.value;
    // console.log(className);
    setNowClassName(className);
  };

  //학년도 설정함수
  const setYear = (date) => {
    let data_id = date?.length > 0 ? date : new Date();
    return dayjs(data_id).format("MM-DD") <= "02-15"
      ? String(+dayjs(data_id).format("YYYY") - 1)
      : dayjs(data_id).format("YYYY");
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
    //해당학년도에 전담여부 확인
    let data_year = setYear();
    let isSubject = changeSubjectHandler(data_year);
    setIsSubject(isSubject);
  }, [props.isSubject]);

  useEffect(() => {
    let now_year = setYear();
    //현재학년도 자료만 입력가능하고,, 불러오기
    let now_students = props?.students?.filter(
      (yearStd) => Object.keys(yearStd)[0] === now_year
    )?.[0]?.[now_year];

    if (now_students?.length > 0) {
      setNowStudents(now_students);
    } else {
      setNowStudents([]);
    }
  }, [props.students]);

  //선택된 학급이 바뀌면 해당반 학생으로 바꿔주기
  const selectEvents = () => {
    nowStudents?.forEach((cl) => {
      if (Object.keys(cl)[0] === nowClassName) {
        setNowClStudents(Object.values(cl)[0]);
      }
    });

    // --학급-- 을 누르면 학생을 초기화
    if (nowClassName === "") {
      setNowClStudents([]);
    }
  };

  //셀렉트 태그에서 값을 선택하면 해당 반의 학생자료만 화면에 보여주도록 events 상태 set하기
  useEffect(() => {
    // console.log(nowClassName);
    selectEvents();
    props.nowClassNameHandler(nowClassName);
  }, [nowClassName]);

  useEffect(() => {
    props.selectStudentHandler(student);
  }, [student]);

  useEffect(() => {
    setNowClassName(props.clName);
    // 만약학급이 바뀌면.. 현재 학급에서 전달받은 학생이 없어지니까.. setStudents를 빈칸으로
    setStudent("");
  }, [props.clName]);

  useEffect(() => {
    if (props.passStudent !== "") {
      setStudent(props.passStudent);
    }
    // if (isSubject) {
    //   if (
    //     nowClStudents.filter(
    //       (stu) => stu.name === props.passStudent.split(" ")[1]
    //     )?.length === 0
    //   ) {
    //     setStudent("");
    //   }
    // }
  }, [props.passStudent]);

  return (
    <div>
      {/* 전담의 경우 학급 선택하는 부분 */}
      <div>
        {/* 전담교사만 보이는 학급 셀렉트 */}
        {isSubject && (
          <div>
            <select
              ref={selectRef}
              onChange={selectClassHandler}
              className={classes["class-select"]}
              value={nowClassName}
            >
              <option value="">--학급--</option>
              {nowStudents?.map((cl) => (
                <option key={Object.keys(cl)} value={Object.keys(cl)}>
                  {Object.keys(cl)}
                </option>
              ))}
            </select>
            {selectRef?.current?.value === "" && "* 학급을 먼저 선택해주세요."}
          </div>
        )}
      </div>
      {/* 학생 명렬표 보여주는 부분 */}
      <div>
        <Student
          students={!isSubject ? nowStudents : nowClStudents}
          showOption={showOptionHandler}
          isSubject={props.isSubject}
          manageEach={true}
          passStudent={props.passStudent}
        />
        {/* 학생 등록이 안되어 있으면, */}
        {!isSubject && (!nowStudents || nowStudents?.length === 0) && (
          <>
            현재 학년도의 기초자료를 먼저 입력해주세요. <br />
            (학년도 기준 예: 2023.02.16. ~ 2024.02.15.)
            <br />
            <br />
            1. 프로필 ( [👤] - '프로필 수정' - '저장')
            <br /> 2. 학생 ( [메인화면] - '학생등록' )
            <br /> <br />
          </>
        )}
        {isSubject && (!nowClStudents || nowClStudents?.length === 0) && (
          <>
            현재 학년도의 기초자료를 먼저 입력해주세요. <br />
            (학년도 기준 예: 2023.02.16. ~ 2024.02.15.)
            <br />
            <br />
            1. 프로필 ( [👤] - '프로필 수정' - '저장')
            <br /> 2. 학생 ( [메인화면] - '학생등록' )
            <br /> <br />
          </>
        )}
      </div>
      {/* 버튼 모음 보여주기 */}
      <ManageChangeBtns onStudent={student} clName={nowClassName} />

      {/* 여기가 진짜. 학생을 클릭하면 해당 학생의 모든 정보를 모아서 보여주는 페이지
       */}
      {/*파일에 색인 있는 것처럼 표현하는 버튼 모음
       */}
      <div></div>
    </div>
  );
};

export default ManageEach;
