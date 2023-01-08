import React, { useEffect, useState, useRef } from "react";
import CheckInput from "./CheckInput";
import ListMemoInput from "./ListMemoInput";
import Modal from "../Layout/Modal";

import Button from "../Layout/Button";
import classes from "./CheckLists.module.css";
import Swal from "sweetalert2";

import { dbService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { utils, writeFile } from "xlsx";

const CheckLists = (props) => {
  const [addCheckItem, setAddCheckItem] = useState(false);
  const [addListMemo, setAddListMemo] = useState(false);
  const [checkLists, setCheckLists] = useState([]);
  const [nowOnCheckLists, setNowOnCheckLists] = useState([]);
  const [listMemo, setListMemo] = useState([]);
  const [nowOnListMemo, setNowOnListMemo] = useState([]);
  const [unSubmitStudents, setUnSubmitStudents] = useState(props.students);
  const [item, setItem] = useState([]);
  const [dataYears, setDataYears] = useState([]);

  const checkListsYear = useRef();
  const listMemoYear = useRef();

  const sortList = (list) => {
    const sorted_lists = list.sort(function (a, b) {
      let a_date = `${a.id}`;
      let b_date = `${b.id}`;
      return new Date(a_date) - new Date(b_date);
    });
    return sorted_lists.reverse();
  };

  //firestore에서 해당 이벤트 자료 받아오기
  const getDatasFromDb = () => {
    let docRef;
    if (props.about === "checkLists") {
      docRef = doc(dbService, "checkLists", props.userUid);

      onSnapshot(docRef, (doc) => {
        const new_checkLists = [];
        const years = [];
        doc?.data()?.checkLists_data?.forEach((data) => {
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
          new_checkLists.push(new_data);
        });
        //학년도 저장 및 체크리스트기록 저장
        setDataYears([...new Set(years)]);
        setCheckLists([...new_checkLists]);
      });
    } else if (props.about === "listMemo") {
      docRef = doc(dbService, "listMemo", props.userUid);

      onSnapshot(docRef, (doc) => {
        const new_listMemo = [];
        const years = [];
        doc?.data()?.listMemo_data?.forEach((data) => {
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
          new_listMemo.push(new_data);
        });
        //학년도 저장 및 체크리스트기록 저장
        setDataYears([...new Set(years)]);
        setListMemo([...new_listMemo]);
      });
    }
  };

  useEffect(() => {
    getDatasFromDb();
  }, []);

  //처음 보여줄 학년도 설정(올해 자료있으면 보여줌)
  useEffect(() => {
    let new_date = new Date();
    //학년도 설정
    let new_year = new_date.getFullYear();
    if (new_date.getMonth() + 1 <= 2) {
      new_year -= 1;
    }
    //데이터 중에 현재 학년도와 같은 데이터가 있으면 바로 보여줌.
    let this_year_data = dataYears?.filter((year) => year === String(new_year));
    if (this_year_data?.length > 0) {
      searchYearHandler(this_year_data[0]);
      props.about === "checkLists"
        ? (checkListsYear.current.value = this_year_data[0])
        : (listMemoYear.current.value = this_year_data[0]);
    }
  }, [dataYears]);

  const saveItemHandler = async (item) => {
    //자료 저장할 떄 실제로 실행되는 함수
    const dataSaved = async () => {
      Swal.fire({
        icon: "success",
        title: "자료가 저장되었어요.",
        text: "5초 후에 창이 사라집니다.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });

      //checkList 일경우
      if (item.unSubmitStudents) {
        //checklists자료 받아오기
        const newCheckRef = doc(dbService, "checkLists", props.userUid);
        const checkListsSnap = await getDoc(newCheckRef);
        if (checkListsSnap.exists()) {
          //현재 저장되는 자료와 중복되는거 제외하고 거기에 새 자료 추가함
          let new_datas = [
            ...checkListsSnap
              .data()
              .checkLists_data.filter((checkList) => checkList.id !== item.id),
          ];
          new_datas.push(item);
          await setDoc(newCheckRef, {
            checkLists_data: new_datas,
          });
          // 전체 데이터도 추가하기
          setCheckLists((prev) => {
            let new_datas = [...prev];
            let data_index = undefined;
            prev.forEach((data, index) => {
              if (data.id === item.id) {
                data_index = index;
              }
            });

            if (data_index === undefined) {
              new_datas.push(item);
            } else {
              new_datas[data_index] = item;
            }
            return new_datas;
          });
          //현재 보여주고 있는 학년도 자료에서 삭제하고 다시 추가
          setNowOnCheckLists((prev) => {
            let new_datas = [...prev];
            let data_index = undefined;
            prev.forEach((data, index) => {
              if (data.id === item.id) {
                data_index = index;
              }
            });
            if (data_index === undefined) {
              new_datas.push(item);
            } else {
              new_datas[data_index] = item;
            }
            return new_datas;
          });
          //처음 자료를 저장하는 경우
        } else {
          await setDoc(newCheckRef, { checkLists_data: [item] });
          setCheckLists([...item]);
          setNowOnCheckLists([...item]);
        }

        //listMemo일 경우
      } else {
        //checklists자료 받아오기
        const newListMemoRef = doc(dbService, "listMemo", props.userUid);
        const listMemoSnap = await getDoc(newListMemoRef);
        if (listMemoSnap.exists()) {
          //현재 저장되는 자료와 중복되는거 제외하고 거기에 새 자료 추가함
          let new_datas = [
            ...listMemoSnap
              .data()
              .listMemo_data.filter((memo) => memo.id !== item.id),
          ];
          new_datas.push(item);
          await setDoc(newListMemoRef, {
            listMemo_data: new_datas,
          });

          // 전체 데이터도 추가하기
          setListMemo((prev) => {
            let new_datas = [...prev];
            let data_index = undefined;
            prev.forEach((data, index) => {
              if (data.id === item.id) {
                data_index = index;
              }
            });

            if (data_index === undefined) {
              new_datas.push(item);
            } else {
              new_datas[data_index] = item;
            }
            return new_datas;
          });
          //현재 보여주고 있는 학년도 자료에서 삭제하고 다시 추가
          setNowOnListMemo((prev) => {
            let new_datas = [...prev];
            let data_index = undefined;
            prev.forEach((data, index) => {
              if (data.id === item.id) {
                data_index = index;
              }
            });
            if (data_index === undefined) {
              new_datas.push(item);
            } else {
              new_datas[data_index] = item;
            }
            return new_datas;
          });
        } else {
          await setDoc(newListMemoRef, { listMemo_data: [item] });
          setListMemo([...item]);
          setNowOnListMemo([...item]);
        }
      }
    }; // 자료 저장 실행 함수 끝

    let datas;
    if (item.unSubmitStudents) {
      datas = [...checkLists];
    } else {
      datas = [...listMemo];
    }
    //같은 이름의 체크리스트 있는지 확인하고, 저장 묻기
    let regex = / /gi;
    let same_checkTitle = datas.filter(
      (list) => list.title.replace(regex, "") === item.title.replace(regex, "")
    );

    //동일한 이름의 체크리스트가 있을 경우 묻기
    if (same_checkTitle.length > 0) {
      Swal.fire({
        title: "자료를 저장/수정할까요?",
        text: `"${item.title}"로 동일한 이름의 체크리스트가 이미 존재합니다.`,
        showDenyButton: true,
        confirmButtonText: "저장/수정",
        confirmButtonColor: "#db100cf2",
        denyButtonColor: "#85bd82",
        denyButtonText: `취소`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        //저장버튼 누르면
        if (result.isConfirmed) {
          dataSaved();
          //취소누르면 그냥 반환
        } else {
          return;
        }
      });
    } else {
      dataSaved();
    }
  };

  const removeData = async (item) => {
    //checkLists 에서 중복되는거 없애기(순서가 중요함..! firestore전에)
    let new_datas;
    if (item.unSubmitStudents) {
      new_datas = checkLists.filter((list) => list.id !== item.id);
      setCheckLists([...new_datas]);
      setNowOnCheckLists([
        ...nowOnCheckLists.filter((list) => list.id !== item.id),
      ]);
      await setDoc(doc(dbService, "checkLists", props.userUid), {
        checkLists_data: new_datas,
      });
      //listMemo 에서 중복되는거 없애기(순서가 중요함..! firestore전에)
    } else {
      new_datas = listMemo.filter((list) => list.id !== item.id);
      setListMemo([...new_datas]);
      setNowOnListMemo([
        ...nowOnListMemo.filter((list) => list.id !== item.id),
      ]);
      await setDoc(doc(dbService, "listMemo", props.userUid), {
        listMemo_data: new_datas,
      });
    }
  };

  const setItemNull = () => {
    setItem([]);
  };

  const searchYearHandler = (value) => {
    const year_group = value;
    if (props.about === "checkLists") {
      let list = [...checkLists]?.filter(
        (data) => data.yearGroup === year_group
      );
      setNowOnCheckLists(list);
    } else {
      let list = [...listMemo]?.filter((data) => data.yearGroup === year_group);
      setNowOnListMemo(list);
    }
  };

  //엑셀로 저장하기 함수
  const saveExcelHandler = () => {
    const book = utils.book_new();
    // console.log(listMemo);
    listMemo.forEach((memo) => {
      const new_datas = [];
      memo.data.forEach((stud) => {
        let data = [stud.student_num, stud.student_name, stud.memo];
        new_datas.push(data);
      });
      new_datas.unshift(["번호", "이름", "기록내용"]);
      //새로운 가상 엑셀파일 생성
      const listMemo_datas = utils.aoa_to_sheet(new_datas);
      //셀의 넓이 지정
      listMemo_datas["!cols"] = [{ wpx: 40 }, { wpx: 150 }];
      //시트에 작성한 데이터 넣기
      utils.book_append_sheet(book, listMemo_datas, `${memo.title}`);
    });

    writeFile(book, `개별기록(${listMemoYear.current.value}학년도).xlsx`);
  };

  return (
    <>
      {props.about === "checkLists" && (
        <>
          {addCheckItem && (
            <Modal onClose={() => setAddCheckItem(false)}>
              <CheckInput
                students={props.students}
                onClose={() => setAddCheckItem(false)}
                saveItemHandler={(item) => {
                  saveItemHandler(item);

                  setAddCheckItem(false);
                }}
                unSubmitStudents={
                  item.length !== 0 ? unSubmitStudents : props.students
                }
                item={item}
                removeData={removeData}
                setItemNull={setItemNull}
              />
            </Modal>
          )}
          <select
            style={{
              position: "absolute",
              width: "80px",
              left: "15px",
              marginTop: "5px",
            }}
            name="searchYear-selcet"
            ref={checkListsYear}
            defaultValue={""}
            onChange={(e) => searchYearHandler(e.target.value)}
          >
            <option value="">--학년도--</option>
            {dataYears.map((year) => (
              <option value={year} key={year}>
                {year}학년도
              </option>
            ))}
          </select>
          <div>
            <Button
              name={"추가하기"}
              id={"add-checkItemBtn"}
              className={"add-event-button"}
              onclick={() => {
                setUnSubmitStudents([]);
                setAddCheckItem(true);
              }}
            />
          </div>

          <div>
            {/* 제출 미제출 체크리스트들 보여주기 */}
            {nowOnCheckLists &&
              sortList(nowOnCheckLists).map((item) => (
                <li
                  key={item.id}
                  id={item.id}
                  className={classes.checkLi}
                  onClick={() => {
                    setUnSubmitStudents(item.unSubmitStudents);
                    setItem([]);
                    setItem(item);
                    setAddCheckItem(true);
                  }}
                >
                  <span className={classes["listMemo-date"]}>
                    {" "}
                    {item.id.slice(0, 10)}
                  </span>
                  <h2 className={classes["listMemo-title"]}>{item.title}</h2>
                  <p className={classes.checkP}>
                    {item.unSubmitStudents.length !== 0
                      ? `미제출(${item.unSubmitStudents.length})`
                      : "😎 모두 제출했네요!"}
                  </p>
                  <div className={classes.unsubmitArea}>
                    {item.unSubmitStudents.map((stu) => (
                      <Button
                        key={item.id + stu.num}
                        name={stu.name}
                        id={item.title + stu.num}
                        className={"checkList-button"}
                      />
                    ))}
                  </div>
                </li>
              ))}
          </div>
        </>
      )}

      {props.about === "listMemo" && (
        <>
          {addListMemo && (
            <Modal
              addStyle={"addOverflow"}
              onClose={() => setAddListMemo(false)}
            >
              <ListMemoInput
                students={props.students}
                onClose={() => setAddListMemo(false)}
                saveItemHandler={(item) => {
                  saveItemHandler(item);
                  setAddListMemo(false);
                }}
                item={item}
                removeData={removeData}
                setItemNull={setItemNull}
              />
            </Modal>
          )}

          <div className={classes["listMemoBtn-div"]}>
            <select
              className={classes["listMemo-select"]}
              ref={listMemoYear}
              name="searchYear-selcet"
              defaultValue={""}
              onChange={(e) => searchYearHandler(e.target.value)}
            >
              <option value="">--학년도--</option>
              {dataYears.map((year) => (
                <option value={year} key={year}>
                  {year}학년도
                </option>
              ))}
            </select>
            <Button
              name={"추가하기"}
              id={"add-listMemoBtn"}
              className={"add-event-button"}
              onclick={() => {
                setItem([]);
                setAddListMemo(true);
              }}
            />
            <Button
              name={"엑셀저장"}
              id={"save-listMemoBtn"}
              className={"add-event-button"}
              onclick={saveExcelHandler}
            />
          </div>
          <div>
            {/* 명렬표에서 입력한 자료들도 보여주기 */}
            {nowOnListMemo &&
              sortList(nowOnListMemo).map((item) => (
                <li
                  key={item.id}
                  id={item.id}
                  className={classes.checkLi}
                  onClick={() => {
                    setItem([]);
                    setItem(item);
                    setAddListMemo(true);
                  }}
                >
                  <span className={classes["listMemo-date"]}>
                    {" "}
                    {item.id.slice(0, 10)}
                  </span>
                  <h2 className={classes["listMemo-title"]}>{item.title}</h2>
                  <p className={classes.checkP}>
                    {"미입력 ("}
                    {
                      props.students.filter(
                        (stu) =>
                          !item.data
                            .map((data) => data.student_num)
                            .includes(stu.num)
                      ).length
                    }
                    {")"}
                  </p>
                  <p className={classes.checkP}>
                    {/* 미입력 학생들 보여주기 */}
                    {props.students

                      .filter(
                        (stu) =>
                          !item.data
                            .map((data) => data.student_num)
                            .includes(stu.num)
                      )
                      .map((data) => (
                        <Button
                          key={item.id + data.num}
                          id={item.id + data.num}
                          name={data.name}
                          className={"checkList-button"}
                        />
                      ))}
                  </p>
                </li>
              ))}
          </div>
        </>
      )}
      {
        <>
          <p>
            * 입력한 자료가 안 보이면 메뉴를 다시 클릭해주시거나 다시
            로그인해주세요!
          </p>

          <p>
            * 문제가 지속되시면 kerbong@gmail.com으로 알려주세요. 최대한 빠르게
            해결해 드릴게요!
          </p>
        </>
      }
    </>
  );
};

export default CheckLists;
