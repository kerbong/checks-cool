import React, { useState, useEffect } from "react";
import classes from "./CheckLists.module.css";
import BudgetInput from "./BudgetInput";
import Swal from "sweetalert2";

const BudgetList = (props) => {
  const [budget, setBudget] = useState({});
  const [remain, setRemain] = useState(props.budget.totalAmount || 0);
  const [showEdit, setShowEdit] = useState("");
  const [showEditBtns, setShowEditBtns] = useState("");

  useEffect(() => {
    setBudget(props.budget);
  }, [props.budget]);

  useEffect(() => {
    let usedAmount = 0;
    budget?.useLists?.forEach((list) => (usedAmount += list.amount));
    let remainAmount = budget.totalAmount - usedAmount;

    setRemain(remainAmount);
  }, [budget]);

  const numberComma = (num) => {
    return num?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //삭제 함수, budget내용을 업데이트 하고 그걸 props로 보냄
  const deleteHandler = (list) => {
    let new_budget = { ...budget };
    let new_useLists = new_budget.useLists.filter(
      (data) => data.title + data.date !== list.title + list.date
    );

    new_budget.useLists = [...new_useLists];

    Swal.fire({
      icon: "question",
      title: "품목 삭제 확인",
      text: `[  ${list.date} / ${list.title} / ${numberComma(
        list.amount
      )}원 ] 의 품목을 삭제할까요?`,
      showDenyButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      //저장버튼 누르면
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "자료가 삭제되었어요.",
          text: "5초 후에 창이 사라집니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });
        props.deleteHandler(new_budget);
        //취소누르면 그냥 반환
      } else {
        return;
      }
    });
  };

  return (
    <div>
      {Object.keys(budget).length > 0 && (
        <>
          <div>
            {/* 예산 기본정보 */}
            <div>
              <div className={classes["budgetList-sum"]}>
                <div className={classes["budgetList-dateNote"]}>
                  <span>사용기한 : {budget.until}</span>

                  <span>
                    비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;고 :{" "}
                    {budget.note || "없음"}
                  </span>
                </div>
                <div className={classes["budgetList-desc"]}>
                  <span>
                    <p>총</p> {numberComma(budget.totalAmount)}원
                  </span>
                  <span>
                    <p>사용</p> {numberComma(budget.totalAmount - remain)}원
                  </span>

                  <span className={classes["remain-p"]}>
                    <p>남음</p> {numberComma(remain)}원
                  </span>
                </div>
              </div>
            </div>
            {/* 예산 사용목록 */}
            <ul className={classes["budgetList-ul"]}>
              {budget?.useLists?.map((list) =>
                //현재 수정중인 예산이 아니면 기본 태그로 보여주고
                showEdit !== list.title ? (
                  <li
                    key={list.date + list.title}
                    className={classes["budgetList-li"]}
                    onClick={() => {
                      if (showEditBtns === "") {
                        setShowEditBtns(list.title);
                      } else {
                        setShowEditBtns("");
                      }
                    }}
                  >
                    <span className={classes["budgetList-title"]}>
                      {/* 예산등록날짜 */}
                      <span className={classes["budgetList-date"]}>
                        {list.date}
                      </span>
                      <span>
                        {/* 예산품목명 */}
                        <b>{list.title}</b>
                        {/* 수정버튼 */}
                        {showEditBtns === list.title && (
                          <div className={classes["budgetListEdit-div"]}>
                            <button
                              className={classes["budgetList-edit"]}
                              onClick={() => setShowEdit(list.title)}
                            >
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                            {/* 삭제버튼 */}
                            <button
                              className={classes["budgetList-delete"]}
                              onClick={() => {
                                deleteHandler(list);
                              }}
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        )}
                      </span>
                    </span>

                    <hr style={{ margin: "15px" }} />
                    <span className={classes["budgetList-title"]}>
                      <div className={classes["budgetList-desc"]}>
                        {/* 사이트 */}
                        <span>{list.site}</span>
                        {/* 개당가격 */}
                        <span>{numberComma(list.each)}원</span>
                        {/* 개당얼마 */}
                        <span>{list.count}개</span>
                        {/* 총액 */}
                        <span>총 {numberComma(list.amount)}원</span>
                      </div>
                      {list.note && (
                        <div className={classes["budgetList-note"]}>
                          * {list.note}
                        </div>
                      )}
                    </span>
                  </li>
                ) : (
                  <BudgetInput
                    about={"edit"}
                    budget={list}
                    key={"edit" + list.title}
                    cancleHandler={() => setShowEdit("")}
                  />
                )
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetList;
