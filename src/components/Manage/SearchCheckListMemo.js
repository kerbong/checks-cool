import React, { useState, useEffect, useRef } from "react";
import classes from "../page/ManageEach.module.css";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import CompareListMemoTable from "./CompareListMemoTable";

const SearchCheckListMemo = (props) => {
  const [allCheckListMemo, setAllCheckListMemo] = useState([]);
  const [onAllCheckListMemo, setOnAllCheckListMemo] = useState([]);
  const [compareCheckListMemo, setCompareCheckListMemo] = useState([]);
  const [showCompareCheckListMemo, setShowCompareCheckListMemo] =
    useState(false);
  const [searchWord, setSearchWord] = useState("");

  const searchRef = useRef();

  const nowIsSubject = props.nowIsSubject;

  useEffect(() => {
    if (props.allCheckListMemo?.length === 0) return;
    setAllCheckListMemo(props.allCheckListMemo);
    setOnAllCheckListMemo(props.allCheckListMemo);
  }, [props.allCheckListMemo]);

  //검색부분 함수
  const searchWordHandler = () => {
    let word = searchRef.current.value;
    setSearchWord(word);
  };

  //초기화 함수
  const resetHandler = () => {
    if (compareCheckListMemo?.length === 0) return;

    Swal.fire({
      icon: "warning",
      title: "초기화 할까요?",
      text: "선택했던 항목들을 모두 선택 취소할까요?",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: true,
      denyButtonText: "취소",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setCompareCheckListMemo([]);
      } else {
        return;
      }
    });
  };

  //검색하는 단어가 입력되면.. 전체 자료에서 해당하는 게 있는 것들만 보여주기
  useEffect(() => {
    //검색이 빈칸이면 전체 보여주고
    if (searchWord === "") {
      setOnAllCheckListMemo([...allCheckListMemo]);
    } else {
      //해당 단어를 포함하고 있으면.. 그걸 다 보여줌
      let new_onAllListMemo = allCheckListMemo?.filter((memo) =>
        memo.title.includes(searchWord)
      );
      setOnAllCheckListMemo([...new_onAllListMemo]);
    }
  }, [searchWord]);

  //검색이 끝나고 완료를 클릭하면 실행되는 함수
  useEffect(() => {
    if (!showCompareCheckListMemo) return;

    // 선택한 비교자료들을 화면에 보여주기
  }, [showCompareCheckListMemo]);

  //각 listMemo클릭하면 저장해두는 함수
  const compareCheckListMemoHandler = (memo) => {
    //기존에 존재하면 isExist true, 없었으면 false
    let isExist =
      compareCheckListMemo?.filter((list) => list.id === memo.id)?.length > 0
        ? true
        : false;
    let new_data = [...compareCheckListMemo];
    //같은게 있으면 제거해주고
    if (isExist) {
      new_data = new_data?.filter((list) => list.id !== memo.id);
      //새로운 거면 추가해주기
    } else {
      new_data?.push(memo);
    }
    // id를 기준으로 정렬해서 넣기
    // 담임이면 날짜기준, 전담이면.. 날짜기준 후에 반별기준으로 다시
    if (!nowIsSubject) {
      setCompareCheckListMemo(new_data.sort((a, b) => (a.id > b.id ? 1 : -1)));
    } else {
      let sorted_id = new_data.sort((a, b) => (a.id > b.id ? 1 : -1));

      setCompareCheckListMemo(
        sorted_id?.sort((a, b) => (a.clName > b.clName ? 1 : -1))
      );
    }
  };

  //화면의 table 요소를 excel 파일로 만들기
  const tableToExcelHandler = () => {
    let fileName = `${
      props.about === "listMemo" ? "개별기록" : "제출/미제출"
    } 비교(${dayjs().format("YYYY-MM-DD")}).xlsx`;
    let wb = utils.table_to_book(document.getElementById("listTable"), {
      sheet: `${props.about === "listMemo" ? "개별기록" : "제출/미제출"} 비교`,
    });
    writeFile(wb, fileName);
  };

  return (
    <>
      {/* 비교하는 화면이 아니면 */}
      {!showCompareCheckListMemo ? (
        <>
          <h2 className={classes["fs-15"]}>
            전체학생 {props.about === "listMemo" ? "개별기록" : "제출/미제출"}{" "}
            모아보기🪄
          </h2>
          <h4 style={{ color: "white" }}>
            * 검색 후 여러 자료를 선택(클릭)하시고
            <br />
            완료를 눌러주세요.(pc추천) <br />
          </h4>
          {/* 검색창 */}

          <input
            type="text"
            ref={searchRef}
            placeholder="제목 검색"
            onChange={searchWordHandler}
            className={classes["search-title"]}
          />
          {/* 완료버튼 */}
          <button
            onClick={() => setShowCompareCheckListMemo(true)}
            className={classes["search-btns"]}
          >
            완료
          </button>

          {/* 초기화버튼 */}
          <button onClick={resetHandler} className={classes["search-btns"]}>
            초기화
          </button>
          {/* 선택한 자료 타이틀만 보여주기 */}
          <div className={classes["bottom-content-li"]}>
            <h3 className={classes["margin-15"]}>
              선택된 자료{" "}
              {compareCheckListMemo?.length > 0 &&
                `(${compareCheckListMemo?.length})`}
            </h3>
            <div
              className={classes["flex-center"]}
              style={{ flexWrap: "wrap" }}
            >
              {compareCheckListMemo?.map((list) => (
                <div
                  key={"compare" + list.id}
                  className={classes["clicked-title"]}
                >
                  <b>{list?.clName && list.clName + ")"}</b> {list.title}
                </div>
              ))}
            </div>
          </div>

          {/* 전체 자료 보여지는 부분 */}
          <div className={`${classes["flex-wrap"]}`} style={{ width: "100%" }}>
            {onAllCheckListMemo?.map((memo) => (
              <li
                key={memo.id}
                id={memo.id}
                className={`${classes["bottom-content-li"]} ${
                  compareCheckListMemo?.filter((list) => list.id === memo.id)
                    ?.length > 0
                    ? classes["list-clicked"]
                    : ""
                }`}
                style={{ width: "200px" }}
                onClick={() => {
                  compareCheckListMemoHandler(memo);
                }}
              >
                {memo.id}
                <br />
                <b>{memo.clName || ""}</b>
                <h3>{memo.title}</h3>
              </li>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* 비교하는 화면이면 */}
          <button
            onClick={() => {
              setCompareCheckListMemo([]);
              setShowCompareCheckListMemo(false);
            }}
            className={classes["search-btns"]}
          >
            비교닫기
          </button>
          <button
            onClick={tableToExcelHandler}
            className={classes["search-btns"]}
          >
            <i className="fa-solid fa-download"></i> 현재자료 엑셀저장
          </button>
          <CompareListMemoTable
            about={props.about}
            listMemo={compareCheckListMemo}
            students={props.students}
            isSubject={nowIsSubject}
          />
        </>
      )}
    </>
  );
};

export default SearchCheckListMemo;
