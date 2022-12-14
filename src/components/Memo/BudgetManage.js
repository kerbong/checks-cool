import React, { useState, useEffect, useRef } from "react";
import { dbService } from "../../fbase";
import {
  setDoc,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import classes from "./CheckLists.module.css";
import BudgetInput from "./BudgetInput";
import BudgetListInput from "./BudgetListInput";
import BudgetList from "./BudgetList";

const BudgetManage = (props) => {
  const [budgets, setBudgets] = useState([]);
  const [budgetLists, setBudgetLists] = useState([]);
  const [budgetNameLists, setBudgetNameLists] = useState([]);
  const [dataYears, setDataYears] = useState([]);
  const [nowOnBudget, setNowOnBudget] = useState([]);
  const [showInput, setShowInput] = useState(false);

  const budgetSelectRef = useRef();
  const budgetYearRef = useRef();

  const getYyyymmdd = (date) => {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  };

  //firestore에서 해당 이벤트 자료 받아오기
  const getBudgetsFromDb = async () => {
    //db에서 todo DB가져오고 작성자가 현재 유저와 동일한지 확인하고 events에 추가하기
    setBudgets([]);
    let budgetRef = doc(dbService, "budgets", props.userUid);
    let budgetSnap = await getDoc(budgetRef);

    if (budgetSnap.exists()) {
      onSnapshot(budgetRef, (doc) => {
        const years = [];
        let budgets = [];

        //셀렉트에 넣을 올해 자료들 이름 모으기
        doc?.data()?.budgets_data?.forEach((budget) => {
          let budget_year = budget.until.slice(0, 4);
          //예산은 년도를 중심으로 자료 모으기
          years.push(budget_year);
          budgets.push(budget);
        });
        //학년도 정보를 추가한 예산자료모음
        setBudgets([...budgets]);
        //학년도 저장
        setDataYears([...new Set(years)]);
      });
    }
  };

  useEffect(() => {
    getBudgetsFromDb();
  }, []);

  //처음 보여줄 학년도 설정(올해 자료있으면 보여줌)
  useEffect(() => {
    //학년도 설정
    let new_year = new Date().getFullYear();
    //데이터 중에 현재 학년도와 같은 데이터가 있으면 바로 보여줌.
    let this_year_data = dataYears?.filter((year) => year === String(new_year));
    if (this_year_data?.length > 0) {
      searchYearHandler(this_year_data[0]);
    }
  }, [dataYears]);

  //년도 선택하면 실행되는 함수
  const searchYearHandler = (value) => {
    const year_group = value;
    //올해 자료만 모으고
    let list = budgets?.filter(
      (budget) => budget.until.slice(0, 4) === year_group
    );
    //올해 자료만...
    setBudgetLists([...list]);
    //년도 선택하면 예산 선택되었던거 초기화
    // budgetSelectRef.current.value = "";
  };

  // 년도가 선택되어서 년도의 자료(budgetLists)가 세팅되면, 년도의 예산 이름 세팅하기
  useEffect(() => {
    setBudgetNameLists([...budgetLists.map((budget) => budget.budget_name)]);
  }, [budgetLists]);

  //년도 이름 자료가 변경되면 다시설정!
  useEffect(() => {
    selectBudgetHandler(budgetSelectRef.current.value);
  }, [budgetNameLists]);

  //예산이름 선택하면 실행되는 함수
  const selectBudgetHandler = (value) => {
    const budget_name = value;
    let list = [...budgetLists]?.filter(
      (data) => data.budget_name === budget_name
    );
    if (list.length > 0) {
      setNowOnBudget(list[0]);
    } else {
      setNowOnBudget({});
    }
  };

  //firestore에 예산 품목 저장하기
  const saveBudgetHandler = async (item) => {
    let budgetRef = doc(dbService, "budgets", props.userUid);

    //nowOnBudget의 자료를 업데이트 해야함.
    let new_budgets = [...budgets];
    let new_onBudget = { ...nowOnBudget };
    //인덱스 찾아서 저장하기
    let budget_index;
    new_budgets.forEach((budget, index) => {
      if (budget.budget_name === nowOnBudget.budget_name) {
        budget_index = index;
      }
    });

    new_onBudget.useLists.push(item);
    new_budgets[budget_index] = new_onBudget;
    setBudgets([...new_budgets]);

    await updateDoc(budgetRef, { budgets_data: new_budgets });
  };

  //firestore에 새로운 예산 저장하기
  const saveNewBudgetHandler = async (item) => {
    let budgetRef = doc(dbService, "budgets", props.userUid);

    //새로운 예산 추가
    let new_budgets = [...budgets];

    new_budgets.push(item);

    //만약 처음 예산을 입력한 경우 데이터 받아온 것처럼 년도 세팅해주기, 년도를 세팅해야 모든 자료가 적용, 렌더링 가능
    if (new_budgets.length === 1) {
      //학년도 저장
      setDataYears([item.until.slice(0, 4)]);
    }

    setBudgets([...new_budgets]);
    searchYearHandler(item.until.slice(0, 4));
    selectBudgetHandler(item.budget_name);
    await setDoc(budgetRef, { budgets_data: new_budgets });
    // getBudgetsFromDb();
  };

  //예산 품목 삭제 함수, 받은 예산budget 내용을 업데이트
  const deleteHandler = async (budget) => {
    //기존에 들어있던 예산 전체 삭제
    let new_budgets = budgets.filter(
      (data) =>
        data.budget_name + data.until !== budget.budget_name + budget.until
    );
    //예산 품목이 제거된 예산 데이터 다시 넣기
    new_budgets.push(budget);
    setBudgets([...new_budgets]);
    searchYearHandler(budget.until.slice(0, 4));
    selectBudgetHandler(budget.budget_name);
    await setDoc(doc(dbService, "budgets", props.userUid), {
      budgets_data: [...new_budgets],
    });
  };

  return (
    <div>
      <div className={classes["budgetMenu-div"]}>
        {/* 년도 선택 */}
        <select
          className={classes["year-select"]}
          name="searchYear-selcet"
          ref={budgetYearRef}
          defaultValue={""}
          onChange={(e) => searchYearHandler(e.target.value)}
        >
          <option value="">--년도--</option>
          {dataYears.map((year) => (
            <option value={year} key={"budget" + year}>
              {year}년도
            </option>
          ))}
        </select>
        {/* 예산 선택하는 셀렉트 태그 */}
        <select
          className={classes["budget-select"]}
          ref={budgetSelectRef}
          name="budget-selcet"
          defaultValue={""}
          onChange={(e) => selectBudgetHandler(e.target.value)}
        >
          <option value="">--예산명--</option>
          {budgetNameLists.map((name) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
        </select>

        {/* +버튼으로.. 예산이 선택되지 않은 상태에서는 예산추가를, 예산이 선택된 상태에서는 품목 추가를 가능하게 함. */}
        <button
          className={classes["budget-add"]}
          onClick={() => {
            setShowInput((prev) => !prev);
          }}
        >
          {showInput ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <i className="fa-solid fa-plus"></i>
          )}
        </button>
      </div>
      {/* 예산목록 입력 */}
      {showInput && budgetSelectRef.current.value === "" && (
        <BudgetListInput
          saveBudgetHandler={(item) => {
            saveNewBudgetHandler(item);
            setShowInput(false);
          }}
        />
      )}

      {/* 예산사용 바로입력 */}
      {showInput && budgetSelectRef.current.value !== "" && (
        <BudgetInput
          saveBudgetHandler={(item) => {
            saveBudgetHandler(item);
            setShowInput(false);
          }}
        />
      )}
      {/* 지금까지 사용한 예산목록 */}
      <BudgetList
        budget={nowOnBudget}
        deleteHandler={(budget) => deleteHandler(budget)}
      />
    </div>
  );
};

export default BudgetManage;
