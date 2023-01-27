import React, { useState } from "react";
import StudentBtn from "../Student/StudentBtn";

import classes from "./CheckLists.module.css";
import Button from "../Layout/Button";

import Swal from "sweetalert2";

const CheckInput = (props) => {
  const [checkTitle, setCheckTitle] = useState(
    props.item ? props.item.title : ""
  );
  const [students, setStudents] = useState(props.students);

  const [unSubmitStudents, setUnSubmitStudents] = useState(
    props.unSubmitStudents
  );
  const [submitStudents, setSubmitStudents] = useState(
    students?.filter(
      (stu1) => !unSubmitStudents?.some((stu2) => stu1.num === stu2.num)
    )
  );

  const changeUnSubmitStudents = (studentInfo) => {
    let new_unSubmitStudents;
    let new_submitStudents;
    let existedUnsubmit =
      unSubmitStudents.filter((stu) => stu.num === studentInfo.num).length !==
      0;
    //안낸 사람에 있으면 제거
    if (existedUnsubmit) {
      new_unSubmitStudents = unSubmitStudents.filter(
        (stu) => stu.num !== studentInfo.num
      );
      new_submitStudents = submitStudents.concat(studentInfo);
      //안낸 사람에 없으면 추가
    } else {
      new_unSubmitStudents = unSubmitStudents.concat(studentInfo);
      new_submitStudents = submitStudents.filter(
        (stu) => stu.num !== studentInfo.num
      );
    }
    //번호순으로 정렬하기
    new_unSubmitStudents.sort((a, b) => a.num - b.num);
    new_submitStudents.sort((a, b) => a.num - b.num);

    setUnSubmitStudents([...new_unSubmitStudents]);
    setSubmitStudents([...new_submitStudents]);
  };

  const saveCheckItem = () => {
    if (checkTitle) {
      const tiemStamp = () => {
        let today = new Date();
        today.setHours(today.getHours() + 9);
        return today.toISOString().replace("T", " ").substring(0, 19);
      };

      let item_id;
      //기존의 아이템인 경우 기존 아이디 쓰고
      if (props?.item?.id) {
        item_id = props.item.id;
      } else {
        item_id = tiemStamp();
      }

      const new_checkItem = {
        title: checkTitle,
        unSubmitStudents,
        id: item_id,
        // fixOrNew,
      };

      //전담일경우 학급만 추가로 저장
      if (props.isSubject) {
        new_checkItem["clName"] = props.clName;
      }

      props.saveItemHandler(new_checkItem);
      props.onClose();
      props.setItemNull();
    } else {
      Swal.fire({
        icon: "error",
        title: "정보가 부족해요!",
        text: "체크리스트 제목을 입력해주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return;
    }
  };

  const delCheckItem = (item) => {
    Swal.fire({
      title: "자료를 지울까요?",
      text: `${item.title} 체크리스트를 삭제할까요?`,
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

        props.removeData(item);
        props.onClose();
        props.setItemNull();
      }
    });
  };
  const changeSubmitHandler = () => {
    let new_unSubmitStudents = JSON.parse(JSON.stringify(unSubmitStudents));
    setUnSubmitStudents([...submitStudents]);
    setSubmitStudents((prev) => [...new_unSubmitStudents]);

    //바꾸기 버튼 수정 필요함...
  };

  console.log(students);

  return (
    <>
      <div className={classes.div}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveCheckItem();
          }}
        >
          {props.item.title ? (
            <h2>{checkTitle}</h2>
          ) : (
            <input
              type="text"
              placeholder="제목"
              value={checkTitle || ""}
              onChange={(e) => setCheckTitle(e.target.value)}
              className={classes.checkTitle}
            />
          )}
        </form>

        <span
          className={classes.closeBtn}
          onClick={() => {
            props.onClose();
            props.setItemNull();
          }}
        >
          <i className="fa-regular fa-circle-xmark"></i>
        </span>
      </div>
      <div>
        <h3 className={classes.h3}> 미 제 출 </h3>
        <div className={classes.div}>
          {unSubmitStudents &&
            unSubmitStudents.map((stu) => (
              <StudentBtn
                className={"checklist-student"}
                name={stu.name}
                key={stu.num}
                num={stu.num}
                onShowOption={() => {
                  let studentInfo = { num: stu.num, name: stu.name };
                  changeUnSubmitStudents(studentInfo);
                }}
              />
            ))}
        </div>
        <div className={classes.upDownDiv}>
          <span className={classes.upDownDivHr}>
            <hr className={classes.hr} />
          </span>
          <span>
            {/* 제출 미제출 한번에 교체하는 버튼 */}
            <Button
              icon={<i className="fa-solid fa-arrows-up-down"></i>}
              id={"add-checkItemBtn"}
              className={"change-submit-button"}
              onclick={changeSubmitHandler}
            />
          </span>
          <span className={classes.upDownDivHr}>
            <hr className={classes.hr} />
          </span>
        </div>
        <h3 className={classes.h3}> 제 출 </h3>

        <div className={classes.div}>
          {submitStudents?.map((stu) => (
            <StudentBtn
              className={"checklist-student"}
              name={stu.name}
              key={stu.num}
              num={stu.num}
              onShowOption={() => {
                let studentInfo = { num: stu.num, name: stu.name };
                changeUnSubmitStudents(studentInfo);
              }}
            />
            /* 여기에 reducer함수 실행해서.. students 배열에서 상태 바꾸기 온클릭 함수에 해당함  */
          ))}
        </div>

        <Button
          name={"저장"}
          id={"add-checkItemBtn"}
          className={"save-checkItem-button"}
          onclick={() => {
            if (props.students?.length === 0 || props.students === undefined) {
              Swal.fire({
                icon: "error",
                title: "저장에 실패했어요!",
                text: "메뉴의 곰돌이를 눌러서 학생명부를 먼저 입력해주세요.",
                confirmButtonText: "확인",
                confirmButtonColor: "#85bd82",
                timer: 5000,
              });
            } else {
              saveCheckItem();
            }
          }}
        />
        {props.item.id && (
          <Button
            name={"삭제"}
            id={"del-checkItemBtn"}
            className={"del-checkItem-button"}
            onclick={() => {
              delCheckItem(props.item);
              props.setItemNull();
            }}
          />
        )}
      </div>
    </>
  );
};

export default CheckInput;
