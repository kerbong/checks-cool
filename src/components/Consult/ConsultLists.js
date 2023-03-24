import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import classes from "./ConsultLists.module.css";
import Button from "components/Layout/Button";
import ConsultEdit from "./ConsultEdit";
import { dbService } from "../../fbase";
import { onSnapshot, doc } from "firebase/firestore";
import { utils, writeFile } from "xlsx";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

const ConsultLists = (props) => {
  const [consults, setConsults] = useState([]);
  const [nowOnConsult, setNowOnConsult] = useState([]);
  const [showOnScreen, setShowOnScreen] = useState([]);
  const [showEditor, setShowEditor] = useState("");
  const [initTextareaHeight, setInitTextareaHeight] = useState("");
  // const [showPastFirst, setShowPastFirst] = useState(false);

  const [dataYears, setDataYears] = useState([]);
  const [studentsOnConsults, setStudentsOnConsults] = useState([]);
  const [students, setStudents] = useState([]);
  //선택된 학급 이름
  const [nowClassName, setNowClassName] = useState("");
  const [isSubject, setIsSubject] = useState(false);

  const yearGroupRef = useRef();
  const studentSelectRef = useRef();
  const selectClassRef = useRef();

  //상담자료 받아오기
  const getConsultFromDb = () => {
    let consultRef = doc(dbService, "consult", props.userUid);

    onSnapshot(consultRef, (doc) => {
      const new_consults = [];
      const years = [];
      doc.data()?.consult_data?.forEach((data) => {
        let new_data = {};
        let data_month = data.id.slice(5, 7);
        let data_year = data.id.slice(0, 4);
        if (+data_month >= 3) {
          years.push(data_year);
          //자료에 년도를 yearGroup으로 추가
          new_data = { ...data, yearGroup: data_year };
        } else if (+data_month <= 2) {
          let fixed_year = String(+data_year - 1);
          years.push(fixed_year);
          new_data = { ...data, yearGroup: fixed_year };
        }
        new_consults.push(new_data);
      });
      //학년도 저장 및 상담기록 저장
      setDataYears([...new Set(years)]);
      setConsults([...new_consults]);
    });
  };

  useEffect(() => {
    getConsultFromDb();
  }, []);

  useEffect(() => {
    if (
      yearGroupRef.current.value === ""
      //  &&
      // yearGroupRef.current.value === ""
    ) {
      return;
    }
  }, [consults]);

  function sortDate(consult, upOrDown) {
    const sorted_consults = consult?.sort(function (a, b) {
      let a_date = `${a.id.slice(0, 10)} ${a.id.slice(10, 15)}`;
      let b_date = `${b.id.slice(0, 10)} ${b.id.slice(10, 15)}`;
      return new Date(a_date) - new Date(b_date);
    });

    if (upOrDown === "up") {
      sorted_consults?.reverse();
    }
    return sorted_consults;
  }

  const deleteConsult = (consult) => {
    Swal.fire({
      title: "자료를 지울까요?",
      text: `${consult.id.slice(0, 10)} | ${
        consult.name
      } | ${consult.option.slice(1)}`,
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
        //   title: "자료가 삭제되었어요.",
        //   text: "5초 후에 창이 사라집니다.",
        //   confirmButtonText: "확인",
        //   confirmButtonColor: "#85bd82",
        //   timer: 5000,
        // });

        props.deleteConsult(consult.id, consult.attachedFileUrl);

        //전체 베이스 자료에서 삭제
        setConsults((prev) => {
          return prev?.filter((data) => data.id !== consult.id);
        });
        //현재 보여주고 있는 자료에서 삭제
        setNowOnConsult((prev) => {
          let new_nowOnConsult = prev?.filter((data) => data.id !== consult.id);

          return new_nowOnConsult;
        });

        setShowOnScreen((prev) => {
          let new_nowOnConsult = prev?.filter((data) => data.id !== consult.id);

          return new_nowOnConsult;
        });

        if (!isSubject) {
          //학생들 이름 다시 세팅하기. 전체자료에서 현재학년도이면서 삭제한 자료가 아닌것 들로 학생들 이름 설정
          setStudentsOnConsults([
            ...new Set(
              consults
                ?.filter(
                  (data) =>
                    data.yearGroup === yearGroupRef.current.value &&
                    data.id !== consult.id
                )
                ?.map((data) => data.name)
            ),
          ]);
        }
      }
    });
  };

  const editConsult = (consult_id) => {
    setShowEditor(consult_id);
    // console.log(this.scrollHeight);
    // setInitTextareaHeight(this.scrollHeight);
  };

  const yearMonthDay = (yyyymmdd) => {
    const date = dayjs(yyyymmdd).format("ddd");

    const year = yyyymmdd.split("-")[0].slice(2);
    const month = yyyymmdd.split("-")[1].replace(/(^0+)/, "");
    const day = yyyymmdd.split("-")[2].replace(/(^0+)/, "");
    return `${year}년 ${month}월 ${day}일(${date})`;
  };

  //이름 셀렉트 부분에 정렬하기 오름차?
  const sortName = (datas) => {
    return datas.sort((a, b) => (a > b ? 1 : -1));
  };

  //학생 이름 선택하면 실행되는 함수
  const consultsHandler = (e) => {
    const student = e.target.value;
    let list;
    // 현재 학년도 자료 (nowOnConsult에서 보여주기)
    let consult_data = !isSubject
      ? nowOnConsult
      : nowOnConsult?.filter((data) => data.clName === nowClassName);

    if (student === "전체학생") {
      list = sortDate(consult_data, "up");

      // setShowPastFirst(false);
    } else {
      list = sortDate(
        consult_data?.filter((data) => data.name === student),
        "up"
      );
    }
    setShowOnScreen(list);
  };

  //학년도 선택 함수
  const searchYearHandler = (e) => {
    const year_group = e.target.value;
    const list = consults?.filter((data) => data.yearGroup === year_group);
    setNowOnConsult(list);
    let isSubject = changeSubjectHandler(year_group);

    if (!isSubject) {
      setIsSubject(false);
      //학생들 이름 세팅하기
      setStudentsOnConsults([...new Set(list?.map((data) => data.name))]);
    } else {
      setIsSubject(true);
      setNowClassName("");
      //받아온 props.students에서 학년도에 맞는 것만 students변수에 넣기
      let now_students = props.students?.filter(
        (yearStd) => Object.keys(yearStd)[0] === year_group
      )?.[0]?.[year_group];

      setStudents(now_students);
    }
    //선택된 학생(셀렉트 태그)초기화
    studentSelectRef.current.value = "";
    //선택된 학급 초기화
  };

  //엑셀로 저장하기 함수
  const saveExcelHandler = () => {
    const new_datas = [];
    consults.forEach((consult) => {
      let data = [
        consult.num,
        consult.name,
        consult.option.slice(1),
        `${consult.id.slice(0, 10)} ${consult.id.slice(10, 15)}`,
        consult.note,
      ];
      new_datas.push(data);
    });
    new_datas.unshift([
      "번호",
      "이름",
      "관련",
      "날짜(년월일 시각)",
      "기록내용",
    ]);

    //새로운 가상 엑셀파일 생성
    const book = utils.book_new();
    const consult_datas = utils.aoa_to_sheet(new_datas);
    //셀의 넓이 지정
    consult_datas["!cols"] = [
      { wpx: 40 },
      { wpx: 60 },
      { wpx: 60 },
      { wpx: 100 },
      { wpx: 150 },
    ];
    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, consult_datas, "상담기록");

    writeFile(book, `상담기록(${yearGroupRef.current.value}).xlsx`);
  };

  const addDataHandler = (consult) => {
    let before_id = consult.beforeId;

    //전체 베이스 자료에서 삭제하고 다시 추가
    setConsults((prev) => {
      let new_datas = [...prev];
      let data_index;
      prev.forEach((data, index) => {
        if (data.id === before_id) {
          data_index = index;
        }
      });

      new_datas[data_index] = isSubject
        ? { ...consult, clName: nowClassName }
        : consult;
      return new_datas;
    });
    //현재 보여주고 있는 자료에서 삭제하고 다시 추가
    setNowOnConsult((prev) => {
      let new_datas = [...prev];
      let data_index;
      prev.forEach((data, index) => {
        if (data.id === before_id) {
          data_index = index;
        }
      });

      new_datas[data_index] = isSubject
        ? { ...consult, clName: nowClassName }
        : consult;
      return new_datas;
    });

    //현재 보여주고 있는 자료에서 삭제하고 다시 추가
    setShowOnScreen((prev) => {
      let new_datas = [...prev];
      let data_index;
      prev.forEach((data, index) => {
        if (data.id === before_id) {
          data_index = index;
        }
      });

      new_datas[data_index] = isSubject
        ? { ...consult, clName: nowClassName }
        : consult;

      return sortDate(new_datas, "up");
    });
    props.addData(consult);
  };

  //학급 선택시 학급 이름 설정하고 useEffect 실행
  const selectClassHandler = () => {
    let className = selectClassRef.current.value;
    // console.log(className);
    setNowClassName(className);
  };

  useEffect(() => {
    if (consults.length > 0) {
      //특정학급 선택하면

      let new_nowOnConsult = consults?.filter(
        (data) => data.clName === nowClassName
      );

      setNowOnConsult(new_nowOnConsult);
      //학생 선택하는 셀렉트 태그를 위한 값 설정
      let studentsOnDatas = new_nowOnConsult?.map((data) => data.name);
      setStudentsOnConsults([...new Set(studentsOnDatas)]);

      studentSelectRef.current.value = "";
    }
  }, [nowClassName]);

  //학년도 설정함수
  const setYear = () => {
    let now = dayjs();
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
    let isSubject = props.isSubject?.filter(
      (yearData) => Object.keys(yearData)[0] === data_year
    )?.[0]?.[data_year];
    return isSubject;
  };

  useEffect(() => {
    //해당학년도에 전담여부 확인
    let data_year = setYear();
    let isSubject = changeSubjectHandler(data_year);
    setIsSubject(isSubject);
  }, [props.isSubject]);

  const imageOnError = (event) => {
    event.currentTarget.style.display = "none";
  };

  return (
    <>
      {/* 정렬하는 부분 */}
      <hr />
      <h1>상담 조회 및 수정</h1>
      <br />
      <div className={classes["sortBtnArea"]}>
        <div className={classes["select-area"]}>
          <select
            name="searchYear-selcet"
            ref={yearGroupRef}
            defaultValue={""}
            className={classes["student-select"]}
            onChange={searchYearHandler}
          >
            <option value="" defaultChecked>
              --학년도--
            </option>
            {dataYears?.map((year) => (
              <option value={year} key={year}>
                {year}학년도
              </option>
            ))}
          </select>

          {/* 학급 선택부분 - 전담교사만 보임 */}
          {isSubject && (
            <select
              ref={selectClassRef}
              onChange={selectClassHandler}
              className={classes[`student-select`]}
              value={nowClassName}
            >
              <option value="">--학급--</option>

              {students?.map((cl) => (
                <option key={Object.keys(cl)} value={Object.keys(cl)}>
                  {Object.keys(cl)}
                </option>
              ))}
            </select>
          )}

          {/* 학생 선택하는 셀렉트 태그 */}
          <select
            name="student-selcet"
            ref={studentSelectRef}
            className={classes[`student-select`]}
            defaultValue={""}
            onChange={consultsHandler}
          >
            <option value="" defaultChecked>
              --학생--
            </option>
            {nowOnConsult?.length > 0 && (
              <option value="전체학생">전체보기</option>
            )}

            {sortName(studentsOnConsults)?.map((student) => (
              <option value={student} key={student}>
                {student}
              </option>
            ))}
          </select>
        </div>

        <Button
          id={"saveExcel"}
          className={"sortBtn-consult"}
          name={"엑셀저장"}
          onclick={saveExcelHandler}
        />
      </div>
      {nowOnConsult ? (
        <>
          <br />
          <p>* 정보보호를 위해 먼저 항목을 선택해주세요.</p>
          <br />
        </>
      ) : (
        <p>* 자료가 없습니다. </p>
      )}
      {nowOnConsult &&
        showOnScreen?.map((consult) => (
          <div key={consult.id}>
            <li key={consult.id} className={classes.listArea} id={consult.id}>
              {showEditor === consult.id ? (
                <ConsultEdit
                  selectOption={props.selectOption}
                  consult={consult}
                  cancelEditor={() => setShowEditor("")}
                  initTextareaHeight={initTextareaHeight}
                  addData={(data) => addDataHandler(data)}
                />
              ) : (
                <div key={consult.id + "item"}>
                  <div className={classes.nameArea}>
                    <span className={classes.nameIcon}>
                      <i className="fa-regular fa-id-badge"></i>
                    </span>
                    <p className={classes.consultDate}>
                      {yearMonthDay(consult.id.slice(0, 10))}
                    </p>
                    <span className={classes.nameSpan} id={"1" + consult.id}>
                      {`${consult.name} | ${consult.option.slice(1)}`}
                    </span>
                  </div>

                  {/* 이미지 / 녹음파일이 있으면 이미지 보여주기 */}
                  {consult.attachedFileUrl && (
                    <div className={classes.fileArea}>
                      <img
                        src={consult.attachedFileUrl}
                        height="400px"
                        alt="filePreview"
                        onError={imageOnError}
                      />
                      <audio
                        controls
                        src={consult.attachedFileUrl}
                        onError={imageOnError}
                      ></audio>
                    </div>
                  )}
                  {/* 상담 비고 등록한 부분 있으면 보여주기 */}
                  <div className={classes.noteArea}>
                    <span
                      className={classes.noteTextArea}
                      id={"note" + consult.id}
                    >
                      {consult.note ? consult.note : "'기록이 없습니다.'"}
                    </span>
                  </div>
                  <div className={classes.editDeleteArea}>
                    <Button
                      id={"edit" + consult.id}
                      className="consultEditBtn"
                      onclick={() => {
                        editConsult(consult.id);
                        const initHeight = document.getElementById(
                          `note${consult.id}`
                        ).scrollHeight;

                        setInitTextareaHeight(initHeight);
                      }}
                      icon={<i className="fa-solid fa-pencil"></i>}
                    />
                    <Button
                      id={"delete" + consult.id}
                      className="consultEditBtn"
                      onclick={() => {
                        deleteConsult(consult);
                      }}
                      icon={<i className="fa-solid fa-trash-can"></i>}
                    />
                  </div>
                </div>
              )}
            </li>
          </div>
        ))}
    </>
  );
};

export default ConsultLists;
