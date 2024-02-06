import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import GradeSelection from "./GradeSelection";
import StudentLiWithDelete from "../../Student/StudentLiWithDelete";
import classes from "./HwpControl.module.css";
import DocxForm from "./DocxForm";

const SettingAttendCheck = (props) => {
  const [schoolConfirm, setSchoolConfirm] = useState(false);
  const [studentsConfirm, setStudentsConfirm] = useState(false);
  const [lastStep, setLastStep] = useState(false);
  const [school, setSchool] = useState("");
  const [gradeClass, setGradeClass] = useState("");
  const [scName, setScName] = useState("");
  const [scResult, setScResult] = useState([]);
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [possibleDate, setPossibleDate] = useState(20);

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
      return dayjs().format("MM-DD") <= "02-15"
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
    if (school?.length === 0 || gradeClass?.length === 0 || +possibleDate < 1)
      return;
    //
    setLastStep(true);
    // 최종적으로 문서 만드는 함수
    props.doneHandler(school + "*" + gradeClass, studentsInfo, possibleDate);
  };

  const possibleDateHandler = (e) => {
    let dateValue = e.target.value?.replace(/[^0-9]/g, "");
    setPossibleDate(dateValue);
  };

  return (
    <div>
      {" "}
      {/*  제일먼저 학생명부 보여주기 */}
      {!studentsConfirm ? (
        <>
          <h2 className={classes["h2"]}>학생 명부 설정하기(1/3)</h2>
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
        // 학생명부 확정되면 다음단계
        !lastStep && (
          <>
            {!props.dataExisted && (
              <>
                <h2 className={classes["h2"]}>학교 정보 설정하기(2/3)</h2>

                {/* 이전단계로...학생명부 수정 */}
                <button
                  className={`${classes["btn"]} ${classes["m-l20"]}`}
                  onClick={() => setStudentsConfirm(false)}
                  style={{ width: "300px" }}
                >
                  이전 (학생명부 수정)
                </button>
              </>
            )}

            <div className={classes["flex-wrap"]}>
              {/* 학교찾기 */}
              {!schoolConfirm ? (
                <form
                  onSubmit={(e) => findSchool(e)}
                  className={classes["m20"]}
                >
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
                <>
                  <div className={!props.dataExisted ? classes["card"] : ""}>
                    {/* 선택된 학교명 */}
                    <span className={classes["fs14"]}> {school}</span>

                    <button
                      onClick={() => {
                        setSchoolConfirm(false);
                        setGradeClass("");
                        if (props.dataExisted) {
                          props.dataEditHandler();
                        }
                      }}
                      className={classes["btn"]}
                      style={{ width: "300px" }}
                    >
                      {props.dataExisted ? "설정 변경" : "학교 변경"}
                    </button>
                  </div>
                  {/* 개발자용 버튼  */}
                  {props.email === "kerbong@gmail.com" && (
                    <button onClick={() => navigate(`/admin`)}>
                      개발자 화면 이동
                    </button>
                  )}
                </>
              )}

              {/* 찾으면 학교보여주기 학교 확정상태가 아닐때만 */}
              {!schoolConfirm &&
                (scResult?.length === 0 ? (
                  <span>학교 이름을 확인해주세요!</span>
                ) : (
                  <>
                    <div
                      className={classes["flex-column"]}
                      style={{ alignItems: "flex-start" }}
                    >
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
                  confirmClassHandler={(grade_class) =>
                    setGradeClass(grade_class)
                  }
                  selectedGrade={gradeClass?.split("학년")?.[0] + "학년"}
                  className={gradeClass?.split("학년")?.[1]?.split("반")?.[0]}
                  show={gradeClass === "" ? true : false}
                />
              )}

              {/* 학교명까지 선택이 확정되면 기초자료 만들기 설정하기 */}
              {gradeClass !== "" && (
                <div className={classes["card"]}>
                  {/* 연간 체험학습일 설정하기 */}
                  <div>
                    <span className={classes["fs14"]}> 체험학습 연간인정 </span>

                    <input
                      type="text"
                      placeholder="연간체험학습일"
                      onChange={possibleDateHandler}
                      value={possibleDate}
                      className={classes["input"]}
                      style={{ width: "50px", height: "25px" }}
                    />

                    <span className={classes["fs14"]}> 일</span>
                  </div>

                  {/* 저장버튼 */}
                  <button
                    onClick={saveBasicSetting}
                    className={classes["btn"]}
                    style={{ width: "300px" }}
                  >
                    기초자료 저장
                  </button>
                </div>
              )}
            </div>
          </>
        )
      )}
      {/* 3단계... 파일 업로드하기 */}
      {lastStep && (
        <>
          <DocxForm
            lastStep={lastStep}
            school={school}
            gradeClass={gradeClass}
            beforeLastStep={() => setLastStep(false)}
            userUid={props.userUid}
            email={props.email}
          />
        </>
      )}
    </div>
  );
};

export default SettingAttendCheck;
