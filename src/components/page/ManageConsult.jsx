import React, { useState, useEffect } from "react";
import ManageEach from "./ManageEach";
import { useLocation } from "react-router";
import dayjs from "dayjs";
import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import classes from "./ManageEach.module.css";
import Button from "components/Layout/Button";
import { utils, writeFile } from "xlsx";

const ManageConsult = (props) => {
  const [onStudent, setOnStudent] = useState("");
  const [consults, setConsults] = useState([]);
  const [onConsults, setOnConsults] = useState([]);
  const [clName, setClName] = useState("");
  const [showConsultOption, setShowConsultOption] = useState("");
  const [showConsultMonth, setShowConsultMonth] = useState("");
  const [onConsultsOption, setOnConsultsOption] = useState([]);

  const { state } = useLocation();

  const nowYear = (dataId) => {
    let data_id = dataId ? dataId : new Date();
    return +dayjs(data_id).format("MM") <= 2
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

  const nowIsSubject = changeSubjectHandler(nowYear());

  const sortBy = (datas, pastNow) => {
    if (pastNow === "past") {
      datas?.sort((a, b) => (a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1));
    } else {
      datas?.sort((a, b) => (a.id.slice(0, 10) < b.id.slice(0, 10) ? 1 : -1));
    }
    return datas;
  };

  //firestore에서 checkLists와 listMemo 둘다 받아서 저장해두기
  const getDatasFromDb = async () => {
    //checkLists 부분, 올해 자료만 저장하기
    setConsults([]);
    let consultsRef = doc(dbService, "consult", props.userUid);
    const consultsSnap = await getDoc(consultsRef);

    //id가 이번학년도 인 자료만 저장해둠.
    onSnapshot(consultsRef, (doc) => {
      if (consultsSnap.exists()) {
        let new_consults = doc
          .data()
          ?.consult_data?.filter(
            (data) => nowYear(data.id.slice(0, 10)) === nowYear()
          );

        //과거순으로 일단 정렬
        new_consults = sortBy(new_consults, "past");
        setConsults([...new_consults]);
      }
    });
  };

  useEffect(() => {
    getDatasFromDb();
  }, []);

  //선택된 학생에 따라 정보를 필터해서 보여줌.
  useEffect(() => {
    const optionSaveHandler = (datas) => {
      //총 정리한 부분에서 option만 따옴
      let new_datasOption = datas?.map((data) => data.option.slice(1));
      setOnConsultsOption(new_datasOption);
    };

    let new_onConsults = [];
    if (onStudent !== "") {
      //담임이면
      if (!nowIsSubject) {
        new_onConsults = consults?.filter(
          (consult) => consult.name === onStudent.split(" ")[1]
        );

        //전담이면.. 반과 이름 모두 같아야 함
      } else {
        new_onConsults = consults?.filter(
          (data) =>
            data.clName === clName && data.name === onStudent.split(" ")[1]
        );
      }

      //학생 선택되지 않은 상태면 전체 정보 보여주기
    } else {
      new_onConsults = [...consults];
      //전담인 경우만.. 학급으로 세팅
      if (clName !== "") {
        new_onConsults = new_onConsults?.filter(
          (data) => data.clName === clName
        );
      }

      new_onConsults = sortBy(new_onConsults, "past");
    }
    setOnConsults(new_onConsults);
    // setShowOnConsults(new_onAttends);
    optionSaveHandler(new_onConsults);
  }, [onStudent, consults, clName]);

  //선택된 학생 정보  번호 한칸띄우고 이름
  const selectStudentHandler = (studentNumName) => {
    setOnStudent(studentNumName);
  };

  //이미지나 음성파일 없을 경우 보여주지 않기
  const imageOnError = (event) => {
    event.currentTarget.style.display = "none";
  };

  //선택되어 있는 학급 (전담의 경우)
  const nowClassNameHandler = (classname) => {
    setClName(classname);
  };

  //엑셀저장함수
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
      if (nowIsSubject) {
        data.unshift(consult.clName);
      }
      new_datas.push(data);
    });

    let data_title = ["번호", "이름", "관련", "날짜(년월일 시각)", "기록내용"];
    if (nowIsSubject) {
      data_title.unshift("반");
    }
    new_datas.unshift(data_title);

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
    if (nowIsSubject) {
      consult_datas["!cols"].unshift({ wpx: 30 });
    }
    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, consult_datas, "상담기록");

    writeFile(
      book,
      `${nowYear()}학년도 상담기록(${dayjs().format("YYYY-MM-DD")}).xlsx`
    );
  };

  useEffect(() => {
    //받아온 정보 { student: 학생번호 이름 , clName: 전담이면 반이름}
    let new_onStudent = state?.student;
    let new_clName = state?.clName;

    if (new_clName !== "") {
      setClName(new_clName);
    }
    if (new_onStudent !== "") {
      setOnStudent(new_onStudent);
    }
  }, [state]);

  return (
    <div>
      {/* 학생 보여주는 부분 */}
      <ManageEach
        students={props.students}
        userUid={props.userUid}
        isSubject={props.isSubject}
        selectStudentHandler={selectStudentHandler}
        clName={clName}
        passStudent={onStudent}
        nowClassNameHandler={nowClassNameHandler}
      />

      <ul className={`${classes["bottom-content-ul"]} ${classes["flex-wrap"]}`}>
        {/* 학생이 선택되지 않은, 우리반 정보를 볼 때 정렬버튼들 */}
        <div>
          {onStudent === "" && (
            <>
              {/* 정렬하는 버튼들... 전체랑.. 월별, 옵션별 보여주기 */}
              <div
                className={classes["flex-wrap"]}
                style={{ alignItems: "flex-end" }}
              >
                {/* 전체 상담 확인 상담옵션별 횟수 기록 */}
                <li
                  className={classes["bottom-content-li"]}
                  style={{ minWidth: "350px" }}
                >
                  <div className={classes["flex-center-ml-10"]}>
                    <span className={classes["fs-13-bold"]}>
                      {clName ? `${clName} | 상담 요약` : "우리반 상담 요약"}
                    </span>
                    &nbsp;&nbsp;
                    {/* 엑셀다운 버튼 */}
                    <button
                      className={classes["search-btns"]}
                      onClick={saveExcelHandler}
                    >
                      <i className="fa-solid fa-download"></i> 엑셀저장
                    </button>
                  </div>

                  <hr className={classes["margin-15"]} />
                  {onConsults?.length === 0 ? (
                    <div
                      className={`${classes["fs-13"]} ${classes["margin-15"]}`}
                    >
                      * 학급의 상담 자료가 없어요!
                    </div>
                  ) : (
                    <div>
                      {/* 학급의 상담 자료가 있으면 */}
                      <div>
                        {/* 전체 버튼 */}
                        <Button
                          id={`whole`}
                          className={
                            showConsultOption === ""
                              ? "sortBtn-clicked"
                              : "sortBtn"
                          }
                          name={`전체(${onConsultsOption?.length})`}
                          onclick={() => {
                            setShowConsultOption("");
                          }}
                        />
                        {/* 옵션별 버튼 */}
                        {[...new Set(onConsultsOption)]?.map((option) => (
                          <Button
                            key={option}
                            id={option}
                            className={
                              showConsultOption === option
                                ? "sortBtn-clicked"
                                : "sortBtn"
                            }
                            name={`${option} (${
                              onConsultsOption?.filter((op) => op === option)
                                .length
                            })`}
                            onclick={() => {
                              setShowConsultMonth("");
                              setShowConsultOption(option);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </li>
                {/* 월별 데이터 보여주기 버튼 */}
                {onConsults?.length !== 0 && (
                  <li className={classes["bottom-content-li"]}>
                    월별로 보기
                    <hr className={classes["margin-15"]} />
                    {/* 전체 월 버튼 */}
                    <Button
                      id={`모든 달`}
                      className={
                        showConsultMonth === "" ? "sortBtn-clicked" : "sortBtn"
                      }
                      name={`모든 달`}
                      onclick={() => {
                        setShowConsultMonth("");
                      }}
                    />
                    {/* 자료가 있는 달만 보여줌 */}
                    {/* 전담용은 clname으로 한번 거르고 */}
                    {(nowIsSubject
                      ? [
                          ...new Set(
                            consults
                              ?.filter((consult) => consult?.clName === clName)
                              ?.map((cst) => +cst.id.slice(5, 7))
                          ),
                        ]
                      : [
                          ...new Set(
                            consults?.map((cst) => +cst.id.slice(5, 7))
                          ),
                        ]
                    )?.map((month) => (
                      <>
                        {/* 월별 버튼 */}
                        <Button
                          key={`${month}월`}
                          id={`${month}월`}
                          className={
                            showConsultMonth === month
                              ? "sortBtn-clicked"
                              : "sortBtn"
                          }
                          name={`${month}월`}
                          onclick={() => {
                            setShowConsultOption("");
                            setShowConsultMonth(month);
                          }}
                        />
                      </>
                    ))}
                  </li>
                )}
              </div>
            </>
          )}

          {/* 학생 상담부분 보여주기 */}
          <div className={`${classes["flex-wrap"]}`} style={{ width: "100%" }}>
            {onConsults?.map((consult) => (
              <li
                key={consult.id}
                id={consult.id}
                className={classes["bottom-content-li"]}
                style={{ minWidth: "240px", maxWidth: "540px" }}
              >
                {/* 상담의 id(yyyy-mm-dd) 시간:분 보여줌 */}
                <div className={classes["flex-ml-10"]}>
                  {`${consult.id.slice(0, 10)} ${consult.id.slice(10, 15)}`}
                </div>
                {/* 학생선택 안되었으면 학생이름 + 상담옵션 */}
                {/* 전담인데 학급이 선택되지 않은 상태면 학급도 보여주기 */}
                <div className={classes["fs-13"]}>{`${
                  nowIsSubject && clName === "" ? consult.clName : ""
                } ${
                  onStudent === "" ? `${consult.name}` : ""
                } 🙂 ${consult.option.slice(1)}`}</div>
                <hr className={classes["margin-15"]} />
                {/* 메모한 내용 */}
                <div className={classes["fs-13"]}>{consult.note}</div>
                {/* 첨부한 사진이나 음성파일 있으면 보여주기 */}
                {/* 이미지 / 녹음파일이 있으면 이미지 보여주기 */}
                {consult.attachedFileUrl && (
                  <div className={classes["margin-15"]}>
                    <img
                      className={classes["width-max400"]}
                      src={consult.attachedFileUrl}
                      height="auto"
                      alt="filePreview"
                      onError={imageOnError}
                    />
                    <audio
                      controls
                      className={classes["width-max400"]}
                      src={consult.attachedFileUrl}
                      onError={imageOnError}
                    ></audio>
                  </div>
                )}
              </li>
            ))}
            {/* 자료 없음 표시 */}
            {onConsults?.length === 0 && (
              <li className={classes["bottom-content-li"]}>
                * 학생의 상담기록이 없어요!
              </li>
            )}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default ManageConsult;
