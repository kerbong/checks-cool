import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import classes from "./ConsultLists.module.css";
import Button from "components/Layout/Button";
import ConsultEdit from "./ConsultEdit";
import { dbService } from "../../fbase";
import { onSnapshot, doc } from "firebase/firestore";
import { utils, writeFile } from "xlsx";

const ConsultLists = (props) => {
  const [consults, setConsults] = useState([]);
  const [nowOnConsult, setNowOnConsult] = useState([]);
  const [showEditor, setShowEditor] = useState("");
  const [initTextareaHeight, setInitTextareaHeight] = useState("");
  const [showPastFirst, setShowPastFirst] = useState(false);

  const [dataYears, setDataYears] = useState([]);
  const [studentsOnConsults, setStudentsOnConsults] = useState([]);

  const yearGroupRef = useRef();
  const studentSelectRef = useRef();

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
    const sorted_consults = consult.sort(function (a, b) {
      let a_date = `${a.id.slice(0, 10)} ${a.id.slice(10, 15)}`;
      let b_date = `${b.id.slice(0, 10)} ${b.id.slice(10, 15)}`;
      return new Date(a_date) - new Date(b_date);
    });

    if (upOrDown === "up") {
      sorted_consults.reverse();
    }
    return sorted_consults;
  }

  const deleteConsult = (consult) => {
    Swal.fire({
      title: "자료를 지울까요?",
      text: `${consult.id.slice(0, 10)} | ${
        consult.student_name
      } | ${consult.option.slice(1)}`,
      showDenyButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "자료가 삭제되었어요.",
          text: "5초 후에 창이 사라집니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });

        props.deleteConsult(consult.id, consult.attachedFileUrl);

        //전체 베이스 자료에서 삭제
        setConsults((prev) => {
          return prev.filter((data) => data.id !== consult.id);
        });
        //현재 보여주고 있는 자료에서 삭제
        setNowOnConsult((prev) => {
          return prev.filter((data) => data.id !== consult.id);
        });
      }
    });
  };

  const editConsult = (consult_id) => {
    setShowEditor(consult_id);
    // console.log(this.scrollHeight);
    // setInitTextareaHeight(this.scrollHeight);
  };

  const yearMonthDay = (yyyymmdd) => {
    const year = yyyymmdd.split("-")[0].slice(2);
    const month = yyyymmdd.split("-")[1].replace(/(^0+)/, "");
    const day = yyyymmdd.split("-")[2].replace(/(^0+)/, "");
    return year + "년 " + month + "월 " + day + "일  ";
  };

  const timeSortedHandler = (upOrDown, tOrF) => {
    if (nowOnConsult.length === 1) {
      return;
    }
    setNowOnConsult((prev) => sortDate(prev, upOrDown));
    setShowPastFirst(tOrF);
  };

  const consultsHandler = (e) => {
    const student = e.target.value;
    let list;
    if (student === "전체학생") {
      list = sortDate(consults, "up");
      setShowPastFirst(false);
    } else {
      list = sortDate(
        consults?.filter((data) => data.student_name === student),
        "up"
      );
    }
    setNowOnConsult(list);
  };

  const searchYearHandler = (e) => {
    const year_group = e.target.value;
    const list = consults?.filter((data) => data.yearGroup === year_group);
    setNowOnConsult(list);

    //선택된 학생(셀렉트 태그)초기화
    studentSelectRef.current.value = "";
    //학생들 이름 세팅하기
    setStudentsOnConsults([...new Set(list?.map((data) => data.student_name))]);
  };

  //엑셀로 저장하기 함수
  const saveExcelHandler = () => {
    const new_datas = [];
    consults.forEach((consult) => {
      let data = [
        consult.student_num,
        consult.student_name,
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
    //전체 베이스 자료에서 삭제하고 다시 추가
    setConsults((prev) => {
      let new_datas = [...prev];
      let data_index;
      prev.forEach((data, index) => {
        if (data.id === consult.id) {
          data_index = index;
        }
      });
      new_datas[data_index] = consult;
      return new_datas;
    });
    //현재 보여주고 있는 자료에서 삭제하고 다시 추가
    setNowOnConsult((prev) => {
      let new_datas = [...prev];
      let data_index;
      prev.forEach((data, index) => {
        if (data.id === consult.id) {
          data_index = index;
        }
      });
      new_datas[data_index] = consult;
      return new_datas;
    });
    props.addData(consult);
  };

  return (
    <>
      {/* 정렬하는 부분 */}
      <div className={classes["sortBtnArea"]}>
        <div className={classes["select-area"]}>
          <select
            name="searchYear-selcet"
            ref={yearGroupRef}
            defaultValue={""}
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
            {nowOnConsult.length > 0 && (
              <option value="전체학생">전체보기</option>
            )}

            {studentsOnConsults?.map((student) => (
              <option value={student} key={student}>
                {student}
              </option>
            ))}
          </select>
        </div>
        {!showPastFirst ? (
          <Button
            id={"past"}
            className={"sortBtn"}
            name={"과거순"}
            onclick={() => {
              timeSortedHandler("down", true);
            }}
          />
        ) : (
          <Button
            id={"current"}
            className={"sortBtn"}
            name={"최신순"}
            onclick={() => {
              timeSortedHandler("up", false);
            }}
          />
        )}
        <Button
          id={"saveExcel"}
          className={"sortBtn"}
          name={"엑셀저장"}
          onclick={saveExcelHandler}
        />
      </div>
      {nowOnConsult &&
        nowOnConsult.map((consult) => (
          <div key={consult.id}>
            <li key={consult.id} className={classes.listArea} id={consult.id}>
              {showEditor === consult.id ? (
                <ConsultEdit
                  selectOption={props.selectOption}
                  consult={consult}
                  cancelEditor={() => setShowEditor("")}
                  context={props.context}
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
                      {`${consult.student_name} | ${consult.option.slice(1)}`}
                    </span>
                  </div>

                  {/* 이미지가 있으면 이미지 보여주기 */}
                  {consult.attachedFileUrl && (
                    <div className={classes.fileArea}>
                      <img
                        src={consult.attachedFileUrl}
                        height="400px"
                        alt="filePreview"
                      />
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
