import React, { useEffect, useState } from "react";
import CheckInput from "./CheckInput";
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
  const [checkLists, setCheckLists] = useState([]);
  const [unSubmitStudents, setUnSubmitStudents] = useState([]);
  const [item, setItem] = useState([]);

  //firestore에서 해당 이벤트 자료 받아오기
  const getCheckListsFromDb = () => {
    let queryWhere = query(
      collection(dbService, "checkLists"),
      where("writtenId", "==", props.userUid)
    );

    onSnapshot(queryWhere, (snapShot) => {
      snapShot.docs.map((doc) => {
        const checkObj = {
          ...doc.data(),
          doc_id: doc.id,
        };

        return setCheckLists((prev) => {
          prev.forEach((prev_data, index) => {
            if (prev_data.doc_id === checkObj.doc_id) {
              prev.splice(index, 1);
            }
          });
          return [...prev, checkObj];
        });
      });
    });
  };

  useEffect(() => {
    getCheckListsFromDb();
  }, []);

  const saveCheckItemHandler = async (item, doc_id) => {
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
        const newCheckRef = doc(collection(dbService, "checkLists"));
        await setDoc(newCheckRef, save_item);
        //기존자료 수정
      } else {
        await setDoc(doc(dbService, "checkLists", doc_id), save_item);
      }
    };

    //같은 이름의 체크리스트 있는지 확인하고, 저장 묻기
    let regex = / /gi;
    let same_checkTitle = checkLists.filter(
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
    const new_checkLists = checkLists.filter(
      (list) => list.doc_id !== item.doc_id
    );
    setCheckLists([...new_checkLists]);
    await deleteDoc(doc(dbService, "checkLists", item.doc_id));
  };

  const setItemNull = () => {
    setItem([]);
  };

  return (
    <>
      {addCheckItem && (
        <Modal onClose={() => setAddCheckItem(false)}>
          <CheckInput
            students={props.students}
            onClose={() => setAddCheckItem(false)}
            saveCheckItemHandler={(item, doc_id) => {
              saveCheckItemHandler(item, doc_id);

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
        {checkLists &&
          checkLists.map((item) => (
            <li
              key={item.id}
              id={item.id}
              className={classes.checkLi}
              onClick={() => {
                setUnSubmitStudents(item.unSubmitStudents);
                setItem(item);
                setAddCheckItem(true);
              }}
            >
              <h2>{item.title}</h2>
              <p className={classes.checkP}>
                미제출 {item.unSubmitStudents.length} 명
              </p>
              <div className={classes.unsubmitArea}>
                {item.unSubmitStudents.map((stu) => (
                  <Button
                    name={stu.name}
                    id={"unSubmit" + stu.num}
                    key={"unSubmit" + stu.num}
                    className={"checkList-button"}
                  />
                ))}
              </div>
            </li>
          ))}
      </div>
    </>
  );
};

export default CheckLists;
