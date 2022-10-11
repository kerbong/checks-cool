import React, { useEffect, useState } from "react";
import CheckInput from "./CheckInput";
import ListMemoInput from "./ListMemoInput";
import Modal from "../Layout/Modal";

import Button from "../Layout/Button";
import classes from "./CheckLists.module.css";
import Swal from "sweetalert2";

import { dbService } from "../../fbase";
import {
  collection,
  query,
  onSnapshot,
  where,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const CheckLists = (props) => {
  const [addCheckItem, setAddCheckItem] = useState(false);
  const [addListMemo, setAddListMemo] = useState(false);
  const [checkLists, setCheckLists] = useState([]);
  const [listMemo, setListMemo] = useState([]);
  const [unSubmitStudents, setUnSubmitStudents] = useState([]);
  const [item, setItem] = useState([]);

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
    let queryWhere;

    if (props.about === "checkLists") {
      queryWhere = query(
        collection(dbService, "checkLists"),
        where("writtenId", "==", props.userUid)
      );

      onSnapshot(queryWhere, (snapShot) => {
        snapShot.docs.map((doc) => {
          const itemObj = {
            ...doc.data(),
            doc_id: doc.id,
          };
          return setCheckLists((prev) => {
            prev.forEach((prev_data, index) => {
              if (prev_data.doc_id === itemObj.doc_id) {
                prev.splice(index, 1);
              }
            });
            return [...prev, itemObj];
          });
        });
      });
    } else if (props.about === "listMemo") {
      queryWhere = query(
        collection(dbService, "listMemo"),
        where("writtenId", "==", props.userUid)
      );

      onSnapshot(queryWhere, (snapShot) => {
        snapShot.docs.map((doc) => {
          const itemObj = {
            ...doc.data(),
            doc_id: doc.id,
          };

          return setListMemo((prev) => {
            prev.forEach((prev_data, index) => {
              if (prev_data.doc_id === itemObj.doc_id) {
                prev.splice(index, 1);
              }
            });
            return [...prev, itemObj];
          });
        });
      });
    }
  };

  useEffect(() => {
    getDatasFromDb();
  }, []);

  const saveItemHandler = async (item, doc_id) => {
    const tiemStamp = () => {
      let today = new Date();
      today.setHours(today.getHours() + 9);
      return today.toISOString().replace("T", " ").substring(0, 19);
    };

    const save_item = {
      ...item,
      id: tiemStamp(),
      writtenId: props.userUid,
    };

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
      //새로운 자료
      if (doc_id === undefined) {
        //checkList 일경우
        if (item.unSubmitStudents) {
          const newCheckRef = doc(collection(dbService, "checkLists"));
          await setDoc(newCheckRef, save_item);
          //listMemo일 경우
        } else {
          const newMemoRef = doc(collection(dbService, "listMemo"));
          await setDoc(newMemoRef, save_item);
        }

        //기존자료 수정
      } else {
        //checkList 일경우
        if (item.unSubmitStudents) {
          await setDoc(doc(dbService, "checkLists", doc_id), save_item);
          //listMemo일 경우
        } else {
          await setDoc(doc(dbService, "listMemo", doc_id), save_item);
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
      new_datas = checkLists.filter((list) => list.doc_id !== item.doc_id);
      setCheckLists([...new_datas]);
      await deleteDoc(doc(dbService, "checkLists", item.doc_id));
    } else {
      new_datas = listMemo.filter((list) => list.doc_id !== item.doc_id);
      setListMemo([...new_datas]);
      await deleteDoc(doc(dbService, "listMemo", item.doc_id));
    }
  };

  const setItemNull = () => {
    setItem([]);
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
                saveItemHandler={(item, doc_id) => {
                  saveItemHandler(item, doc_id);

                  setAddCheckItem(false);
                }}
                unSubmitStudents={unSubmitStudents}
                item={item}
                removeData={removeData}
                setItemNull={setItemNull}
              />
            </Modal>
          )}

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
            {checkLists &&
              sortList(checkLists).map((item) => (
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
                saveItemHandler={(item, doc_id) => {
                  saveItemHandler(item, doc_id);
                  setAddListMemo(false);
                }}
                item={item}
                removeData={removeData}
                setItemNull={setItemNull}
              />
            </Modal>
          )}
          <div>
            <Button
              name={"추가하기"}
              id={"add-listMemoBtn"}
              className={"add-listMemo-button"}
              onclick={() => {
                setItem([]);
                setAddListMemo(true);
              }}
            />
          </div>
          <div>
            {/* 명렬표에서 입력한 자료들도 보여주기 */}
            {listMemo &&
              sortList(listMemo).map((item) => (
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
