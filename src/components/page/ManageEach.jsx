import React, { useState, useEffect, useRef } from "react";
import Student from "components/Student/Student";
import dayjs from "dayjs";
import classes from "./ManageEach.module.css";

const ManageEach = (props) => {
  const [student, setStudent] = useState("");
  const [nowClassName, setNowClassName] = useState("");
  const [nowClStudents, setNowClStudents] = useState([]);
  const [nowStudents, setNowStudents] = useState([]);
  const [isSubject, setIsSubject] = useState(false);

  const selectRef = useRef();

  const showOptionHandler = (e) => {
    setStudent(e.target.innerText);
  };

  //학급 선택시 실행되는 함수
  const selectClassHandler = () => {
    let className = selectRef.current.value;
    // console.log(className);
    setNowClassName(className);
  };

  //학년도 설정함수
  const setYear = (date) => {
    let now = dayjs(date);
    let yearGroup = "";
    let now_month = now.format("MM");
    let now_year = now.format("YYYY");

    if (+now_month >= 2) {
      yearGroup = now_year;
    } else if (+now_month <= 1) {
      yearGroup = String(+now_year - 1);
    }
    return yearGroup;
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

    setNowStudents(now_students);
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

  //셀렉트 태그에서 값을 선택하면 해당 반의 자료만 화면에 보여주도록 events 상태 set하기
  useEffect(() => {
    // console.log(nowClassName);
    selectEvents();
  }, [nowClassName]);

  useEffect(() => {
    props.selectStudentHandler(student);
  }, [student]);

  return (
    <div>
      {/* 전담의 경우 학급 선택하는 부분 */}
      <div>
        {/* 테스트 중이라는 것을 보여줌. */}
        <p>* 학생관리(정확한 명칭 미정) 탭 신설 테스트화면</p>

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
        />
      </div>

      {/* 여기가 진짜. 학생을 클릭하면 해당 학생의 모든 정보를 모아서 보여주는 페이지
       */}
      {/*파일에 색인 있는 것처럼 표현하는 버튼 모음
       */}
      <div></div>
    </div>
  );
};

export default ManageEach;
