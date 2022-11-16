import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import classes from "./ConsultLists.module.css";
import Button from "components/Layout/Button";
import ConsultEdit from "./ConsultEdit";
import { dbService } from "../../fbase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { utils, writeFile } from "xlsx";

const ConsultLists = (props) => {
  const [consults, setConsults] = useState([]);
  const [nowOnConsult, setNowOnConsult] = useState([]);
  const [showEditor, setShowEditor] = useState("");
  const [initTextareaHeight, setInitTextareaHeight] = useState("");
  const [showPastFirst, setShowPastFirst] = useState(false);
  const [searchYear, setSearchYear] = useState(
    String(new Date().getFullYear())
  );
  const [dataYears, setDataYears] = useState([]);
  const [studentsOnConsults, setStudentsOnConsults] = useState([]);

  //상담자료 받아오기
  const getConsultFromDb = () => {
    let q = query(
      collection(dbService, "consult"),
      where("writtenId", "==", props.userUid)
    );

    onSnapshot(q, (snapShot) => {
      const new_consults = [];
      const years = [];
      snapShot.docs.forEach((doc) => {
        const itemObj = {
          ...doc.data(),
          doc_id: doc.id,
        };
        years.push(doc.data().id.slice(0, 4));
        if (doc.data().id.slice(0, 4) !== searchYear) {
          return false;
        }
        new_consults.push(itemObj);
      });

      setDataYears([...new Set(years)]);
      setConsults([...new_consults]);
    });
  };

  useEffect(() => {
    getConsultFromDb();
  }, [searchYear]);

  useEffect(() => {
    setNowOnConsult([...consults]);
    timeSortedHandler("up", true);
  }, [consults]);

  useEffect(() => {
    setStudentsOnConsults([
      ...new Set(consults.map((data) => data.student_name)),
    ]);
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

        props.deleteConsult(consult.doc_id, consult.attachedFileUrl);
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
    const year = e.target.value;
    setSearchYear(year);
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

    writeFile(book, `상담기록(${searchYear}).xlsx`);
  };

  return (
    <>
      {/* 정렬하는 부분 */}
      <div className={classes["sortBtnArea"]}>
        <div className={classes["select-area"]}>
          <select
            name="searchYear-selcet"
            defaultValue={props.searchYear}
            onChange={searchYearHandler}
          >
            <option value="" disabled>
              --년도--
            </option>
            {dataYears?.map((year) => (
              <option value={year} key={year}>
                {year}년
              </option>
            ))}
          </select>
          <select
            name="student-selcet"
            className={classes[`student-select`]}
            defaultValue={"전체학생"}
            onChange={consultsHandler}
          >
            <option value="" disabled>
              --학생--
            </option>
            <option value="전체학생">전체보기</option>
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
                  addData={(data) => props.addData(data)}
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
