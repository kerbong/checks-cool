import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import GradeSelection from "./GradeSelection";
import StudentLiWithDelete from "../../Student/StudentLiWithDelete";

const SettingAttendCheck = (props) => {
  const [schoolConfirm, setSchoolConfirm] = useState(false);
  const [studentsConfirm, setStudentsConfirm] = useState(false);
  const [gradeClass, setGradeClass] = useState("");
  const [scName, setScName] = useState("");
  const [scResult, setScResult] = useState([]);
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [school, setSchool] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const setYear = () => {
      //학생자료 등록의 경우..예외적으로 2월부터는 새로운 학년도로 인식함
      return +dayjs().format("MM") <= 1
        ? String(+dayjs().format("YYYY") - 1)
        : dayjs().format("YYYY");
    };

    let now_year = setYear();

    //현재학년도 자료만 입력가능하고,, 불러오기
    console.log(props.students);
    let nowStudents = props?.students?.filter(
      (yearStd) => String(Object.keys(yearStd)[0]) === now_year
    )?.[0]?.[now_year];

    if (!props.isSubject) {
      setStudentsInfo(nowStudents);
      console.log(nowStudents);
    } else {
      Swal.fire(
        "사용불가",
        "교외현장체험학습 연동 기능은 담임교사만 사용이 가능합니다.",
        "info"
      );
    }
  }, [props.isSubject]);

  // 학교정보 api 다운로드
  const getSchoolDatas = (filter) => {
    let baseUrl =
      "https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=1000&SCHUL_KND_SC_NM=초등학교";
    let key = "&KEY=" + process.env.REACT_APP_NEIS_OPEN_API;

    const fetchData = async () => {
      const res = await fetch(baseUrl + key + filter);
      const result = res.json();
      return result;
    };

    fetchData().then((res) => {
      if (res?.schoolInfo) {
        setScResult(res?.schoolInfo?.[1]?.row);
        console.log(res?.schoolInfo?.[1]?.row);
      } else {
        Swal.fire("검색오류", "학교명을 확인해주세요", "info");
        setScResult([]);
      }
    });
  };

  const studentsConfirmHandler = () => {
    let man = 0;
    let woman = 0;
    studentsInfo?.forEach((stu) => {
      if (stu.woman) {
        woman += 1;
      } else {
        man += 1;
      }
    });
    Swal.fire({
      title: "학생명부 확정",
      html: `학생명부를 확정하시겠어요?<br/> 남자 ${man}명, 여자 ${woman}명, 총 ${studentsInfo?.length}명`,
      icon: "question",
      showDenyButton: "true",
      denyButtonText: "취소",
      confirmButtonText: "확인",
    }).then((result) => {
      if (result.isConfirmed) {
        setStudentsConfirm(true);
      }
    });
  };

  // 학교명 입력하면면 api로 받아오기
  const findSchool = (e) => {
    e.preventDefault();
    if (scName === "") return;

    setSchoolConfirm(false);

    let filter = "&SCHUL_NM=" + scName + "초등학교";
    getSchoolDatas(filter);
  };

  return (
    <div>
      {" "}
      {/*  제일먼저 학생명부 보여주기 */}
      {!studentsConfirm ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {studentsInfo?.map((student) => (
              <StudentLiWithDelete
                key={student.num + student.name}
                myKey={student.num + student.name}
                student={student}
                noEdit={true}
              />
            ))}
          </div>
          <div>
            <button onClick={studentsConfirmHandler}>확인</button>
            <button onClick={() => navigate(`/student-manage`)}>
              {" "}
              학생명부 수정하러 가기{" "}
            </button>
          </div>
        </>
      ) : (
        <div>
          {/* 학교찾기 */}
          {!schoolConfirm ? (
            <form onSubmit={(e) => findSchool(e)}>
              <input
                type="text"
                placeholder="학교명 입력(가나초의 경우 가나)"
                onChange={(e) => setScName(e.target.value)}
                value={scName}
              />{" "}
              <span>초등학교</span>
              <button onClick={findSchool}>검색</button>
            </form>
          ) : (
            <div>
              <span>{school}</span>
              <button
                onClick={() => {
                  setSchoolConfirm(false);
                  setGradeClass("");
                }}
              >
                다시선택
              </button>
            </div>
          )}

          {/* 찾으면 학교보여주기 학교 확정상태가 아닐때만 */}
          {!schoolConfirm && (
            <div>
              {scResult?.map((sc, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="school"
                    value={`${sc.JU_ORG_NM?.split("교육지원청")?.[0]}*${
                      sc.SCHUL_NM
                    }`}
                    checked={
                      school ===
                      `${sc.JU_ORG_NM?.split("교육지원청")?.[0]}*${sc.SCHUL_NM}`
                    }
                    onChange={(e) => {
                      setSchool(e.target.value);
                    }}
                  />
                  위치: {sc.ORG_RDNMA}
                </label>
              ))}
              <button onClick={() => setSchoolConfirm(true)}>확인</button>
            </div>
          )}

          {/* 학교명 school이 선택되어 확정되면, 학년 반 선택하기 */}
          {school !== "" && schoolConfirm && (
            <GradeSelection
              confirmClassHandler={(grade_class) => setGradeClass(grade_class)}
              show={gradeClass === "" ? true : false}
            />
          )}

          {/* 학교명까지 선택이 확정되면 기초자료 만들기 설정하기 */}
          {gradeClass !== "" && (
            <button
              onClick={() => props.doneHandler(school + "*" + gradeClass)}
            >
              저장하기
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SettingAttendCheck;
