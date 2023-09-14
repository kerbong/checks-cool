import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import GradeSelection from "./GradeSelection";
import StudentLiWithDelete from "../../Student/StudentLiWithDelete";
import classes from "./HwpControl.module.css";

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
    if (props.dataExisted) {
      setSchoolConfirm(true);
      setStudentsConfirm(true);
    }
  }, [props.dataExisted]);

  useEffect(() => {
    const setYear = () => {
      //학생자료 등록의 경우..예외적으로 2월부터는 새로운 학년도로 인식함
      return +dayjs().format("MM") <= 1
        ? String(+dayjs().format("YYYY") - 1)
        : dayjs().format("YYYY");
    };

    let now_year = setYear();

    //현재학년도 자료만 입력가능하고,, 불러오기
    let nowStudents = props?.students?.filter(
      (yearStd) => String(Object.keys(yearStd)[0]) === now_year
    )?.[0]?.[now_year];

    if (!props.isSubject) {
      setStudentsInfo(nowStudents);
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
      confirmButtonColor: "#006B5F",
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

  /** 기초 정보 확정함수, 교육청명*학교명*학급명, 학생정보 전달 */
  const saveBasicSetting = () => {
    props.doneHandler(school + "*" + gradeClass, studentsInfo);
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
          <div className={classes["flex-row"]}>
            <button
              className={classes["btn"]}
              onClick={() => navigate(`/student-manage`)}
            >
              {" "}
              학생명부 수정하러 가기{" "}
            </button>
            <button className={classes["btn"]} onClick={studentsConfirmHandler}>
              확인
            </button>
          </div>
        </>
      ) : (
        <div>
          {/* 학교찾기 */}
          {!schoolConfirm ? (
            <form onSubmit={(e) => findSchool(e)} className={classes["m20"]}>
              <input
                type="text"
                placeholder="학교이름"
                onChange={(e) => setScName(e.target.value)}
                value={scName}
                className={classes["input"]}
              />{" "}
              <span>초등학교</span>
              <button
                className={`${classes["btn"]} ${classes["m-l20"]}`}
                onClick={findSchool}
              >
                찾기
              </button>
            </form>
          ) : (
            <div>
              {/* 선택된 학교명 */}
              <span className={classes["fs14"]}>{school}</span>
              <br />
              <button
                onClick={() => {
                  setSchoolConfirm(false);
                  setGradeClass("");
                  if (props.dataExisted) {
                    props.dataEditHandler();
                  }
                }}
                className={classes["mini-btn"]}
              >
                {props.dataExisted ? "학생 자료 재생성" : "학교 변경"}
              </button>
              <br />
            </div>
          )}

          {/* 찾으면 학교보여주기 학교 확정상태가 아닐때만 */}
          {!schoolConfirm &&
            (scResult?.length === 0 ? (
              <span>학교 이름을 확인해주세요!</span>
            ) : (
              <>
                <div className={classes["flex-column"]}>
                  {scResult?.map((sc, index) => (
                    <label key={index} className={classes["school-list"]}>
                      <input
                        type="radio"
                        name="school"
                        value={`${sc.JU_ORG_NM?.split("교육지원청")?.[0]}*${
                          sc.SCHUL_NM
                        }`}
                        // 만약 전국에 하나밖에 안나오면 자동 선택하기..
                        checked={
                          scResult?.length === 1 ||
                          school ===
                            `${sc.JU_ORG_NM?.split("교육지원청")?.[0]}*${
                              sc.SCHUL_NM
                            }`
                        }
                        onChange={(e) => {
                          setSchool(e.target.value);
                        }}
                      />
                      주소 : {sc.ORG_RDNMA}
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => setSchoolConfirm(true)}
                  className={classes["btn"]}
                  style={{ width: "300px" }}
                >
                  확인
                </button>
              </>
            ))}

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
              onClick={saveBasicSetting}
              className={classes["btn"]}
              style={{ width: "300px" }}
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