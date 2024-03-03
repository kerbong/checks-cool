import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import Button from "components/Layout/Button";
import classes from "./FreeMemo.module.css";
import AttendCalendar from "components/Attendance/AttendCalendar";
import FreeMemoTitle from "./FreeMemoTitle";
import FreeMemoCategory from "./FreeMemoCategory";

function FreeMemoTableInput(props) {
  const [numRows, setNumRows] = useState(2);
  const [numCols, setNumCols] = useState(2);
  const [tableData, setTableData] = useState([]);
  const [tableOption, setTableOption] = useState([]);
  const [attendDate, setAttendDate] = useState(new Date());
  const [showCal, setShowCal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));
  const [edited, setEdited] = useState(props.item ? false : true);

  const [title, setTitle] = useState(props.item?.title || "");
  const [timeCalendar, setTimeCalender] = useState(false);
  const [category, setCategory] = useState(
    props.item ? props.item.category : ["all"]
  );
  const [showEditDeleteBtn, setShowEditDeleteBtn] = useState(false);

  // initialize table data
  useEffect(() => {
    const data = [];
    const option = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      const option_row = [];
      for (let j = 0; j < numCols; j++) {
        row.push("");
        option_row.push("string");
      }
      data.push(row);
      option.push(option_row);
    }
    setTableData(data);
    setTableOption(option);
  }, []);

  useEffect(() => {
    let weekDayNames = document.querySelector(".react-datepicker__day-names");
    let weekDayName = document.querySelectorAll(".react-datepicker__day-name");
    if (!weekDayNames || !weekDayName) return;
    weekDayNames.style.width = "95%";
    weekDayName[0].style.width = "14%";
    weekDayName[6].style.width = "14%";

    //달력의 width를 77퍼센트로 바꿔주기
    let datePickerCal = document.querySelector(".react-datepicker");
    datePickerCal.style.width = "75%";
    // let datePickerTime = document.querySelectorAll(
    //   ".react-datepicker__time-box"
    // );
    // datePickerTime[0].style.width = "100%";

    //타임박스 설정바꿔주기
  }, [showCal]);

  useEffect(() => {
    if (props.item) {
      let new_tableData = [];
      let new_tableOption = [];
      let dataArr = props.item.text?.data?.map((data) => {
        let new_data = data;
        if (Object.keys(data)?.length > 0 && typeof data === "object") {
          new_data = new Date(
            data?.seconds * 1000 + data?.nanoseconds / 1000000
          );
        }
        return new_data;
      });
      let optionArr = props.item.text?.option;
      let dataRow = +props.item.text?.rows;
      let dataCol = dataArr.length / dataRow;
      for (let i = 0; i < dataArr.length; i += dataCol) {
        new_tableData.push(dataArr.slice(i, i + dataCol));
        new_tableOption.push(optionArr.slice(i, i + dataCol));
      }
      setTableData(new_tableData);
      setTableOption(new_tableOption);
      setNumRows(dataRow);
      setNumCols(dataCol);
    }
  }, [props.item]);

  const handleRowAdd = () => {
    setNumRows(numRows + 1);

    const newRow = Array(numCols).fill("");
    const newOptionRow = Array(numCols).fill("string");
    const newData = [...tableData, newRow];
    const newOption = [...tableOption, newOptionRow];
    setTableData(newData);
    setTableOption(newOption);
  };

  const handleRowRemove = () => {
    if (numRows <= 1) return;

    setNumRows(numRows - 1);
    setTableData(tableData.slice(0, -1));
  };

  const handleColAdd = () => {
    setNumCols(numCols + 1);

    const data = tableData.map((row) => [...row, ""]);
    const option = tableOption.map((row) => [...row, "string"]);

    setTableData(data);
    setTableOption(option);
  };

  const handleColRemove = () => {
    if (numCols <= 1) return;

    setNumCols(numCols - 1);

    const data = tableData.map((row) => row.slice(0, -1));
    const option = tableOption.map((row) => row.slice(0, -1));

    setTableOption(option);
    setTableData(data);
  };

  //셀 내부의 인풋값이 바뀌면 데이터 수정
  const handleCellChange = (value, rowIndex, colIndex) => {
    const data = [...tableData];
    data[rowIndex][colIndex] = value;
    setTableData(data);
  };

  //셀 내부의 인풋값(날짜나 시각을 포함한)이 바뀌면 데이터 수정
  const attendDateValueHandler = (value, rowIndex, colIndex) => {
    setAttendDate(value);
    handleCellChange(value, rowIndex, colIndex);
  };

  //셀의 셀렉트 값이 바뀌면 옵션 수정
  const handleCellOptionChange = (value, rowIndex, colIndex) => {
    const op_data = [...tableOption];
    op_data[rowIndex][colIndex] = value;
    setTableOption(op_data);
    //문자로 바꾸면.. 데이터 값도 빈칸으로 바꿔줌. 에러 방지
    if (value === "string") {
      const t_data = [...tableData];
      t_data[rowIndex][colIndex] = "";
      setTableData(t_data);
    }
  };

  useEffect(() => {
    console.log(numRows);
  }, [numRows]);

  const handleSave = () => {
    // 자료검증, 타이틀, 텍스트 있는지
    if (title.trim().length === 0) {
      Swal.fire("저장 불가", `제목이 없네요! 제목을 입력해주세요.`, "warning");
      return;
    }

    //옵션 날짜는 선택되었는데 클릭 하지 않은 경우 저장불가
    let dateOrTimeNoValue = [];

    let new_tableOption = [];
    tableOption?.forEach((row, row_index) => {
      new_tableOption.push(...row);
      row.forEach((option, col_index) => {
        if (option !== "string") {
          if (tableData[row_index][col_index] === "") {
            dateOrTimeNoValue.push(
              `${row_index + 1}번줄 ${col_index + 1}번째 칸`
            );
          } else if (typeof tableData[row_index][col_index] !== "object") {
            dateOrTimeNoValue.push(
              `${row_index + 1}번줄 ${col_index + 1}번째 칸`
            );
          }
        } else {
          if (typeof tableData[row_index][col_index] === "object") {
            dateOrTimeNoValue.push(
              `${row_index + 1}번줄 ${col_index + 1}번째 칸`
            );
          }
        }
      });
    });
    if (dateOrTimeNoValue.length > 0) {
      Swal.fire(
        "저장 불가",
        `${dateOrTimeNoValue.join(
          ", "
        )}에 값을 직접 입력하거나 클릭해서 입력해주세요!`,
        "warning"
      );
      return;
    }

    let new_tableData = [];
    tableData?.forEach((row) => {
      new_tableData.push(...row);
    });

    //아무 값도 없을 때 저장 불가
    if (new_tableData.join("").length === 0) {
      Swal.fire(
        "저장 불가",
        `아무 내용도 입력되지 않았습니다. 입력창에 내용을 입력하신 후에 저장해주세요!`,
        "warning"
      );
      return;
    }

    let new_memo = {
      title,
      text: { data: new_tableData, option: new_tableOption, rows: numRows },
      category,
      id: dayjs().format("YYYY-MM-DD"),
    };

    //만약 기존 자료였던 경우 기존 이름 추가해서 보냄
    if (props.item) {
      new_memo.beforeTitle = props.item.title;
    }

    //기존자료 수정의 경우..
    //만약 기존 자료 수정의 경우.. beforeTitle 존재함, 그럴 경우 기존의 데이터는 삭제하고
    let isExist = false;
    let new_freeMemo = [];
    let newItem_index;
    if (new_memo.beforeTitle) {
      props.freeMemo?.forEach((item, index) => {
        if (item.title !== new_memo.beforeTitle) {
          new_freeMemo.push(item);
          //새로운 메모 제목이 기존 메모들 제목과 같으면
          if (item.title === new_memo.title) {
            isExist = true;
          }
        } else {
          new_freeMemo.push(new_memo);
          newItem_index = index;
        }
      });
      delete new_memo.beforeTitle;
    } else {
      props.freeMemo?.forEach((item) => {
        if (item.title === new_memo.title) {
          isExist = true;
        } else {
          new_freeMemo.push(item);
        }
      });
      new_freeMemo.push(new_memo);
      newItem_index = new_freeMemo.length - 1;
    }

    if (isExist) {
      Swal.fire(
        "제목 중복",
        `기존 자료에 동일한 제목의 메모가 존재합니다. 제목을 수정해주세요.`,
        "warning"
      );
      return;
    }

    let saveOrEdit = "저장";
    // 기존 자료 수정이면
    if (newItem_index !== new_freeMemo.length - 1) {
      saveOrEdit = "수정";
    }
    Swal.fire(
      `저장 완료`,
      `${new_memo.title} 메모가 ${saveOrEdit}되었습니다.`,
      "success"
    );

    setEdited(false);
    props.saveFreeMemoHandler(new_freeMemo);
  };

  //   삭제함수
  const deleteHandler = () => {
    // 기존타이틀로 삭제하기
    Swal.fire({
      icon: "warning",
      title: "삭제 할까요?",
      text: `현재 메모 (${props.item?.title}) 를 삭제할까요?`,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: true,
      denyButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        setEdited(false);
        props.deleteHandler(props.item?.title);
      } else {
        return;
      }
    });
  };

  const rowColBtns = (
    <>
      <div className={classes["btns-div"]}>
        아래로
        <button onClick={handleRowAdd} className={classes["rowColSetBtn"]}>
          {" "}
          추가
        </button>
        <button onClick={handleRowRemove} className={classes["rowColSetBtn"]}>
          {" "}
          삭제
        </button>
      </div>
      <div className={classes["btns-div"]}>
        오른쪽
        <button onClick={handleColAdd} className={classes["rowColSetBtn"]}>
          {" "}
          추가
        </button>
        <button onClick={handleColRemove} className={classes["rowColSetBtn"]}>
          {" "}
          삭제
        </button>
      </div>
      {/* 저장버튼 */}
      <Button
        name={"저장"}
        className={"freeMemo-saveDelete"}
        onclick={handleSave}
      />
      {/* 취소버튼 */}
      <Button
        name={"취소"}
        className={"freeMemo-saveDelete"}
        onclick={() => {
          if (props.item) {
            setEdited(false);
          } else {
            props.closeHandler();
          }
        }}
      />
    </>
  );

  //전체 표 , Cell 미리 그려주기
  const renderTable = () => {
    return (
      <table>
        <tbody>
          {tableData?.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className={classes["tr"]}>
              {row?.map((cell, colIndex) => {
                return (
                  <Cell
                    edited={edited}
                    key={`cell-${rowIndex}-${colIndex}`}
                    value={cell}
                    option={tableOption[rowIndex][colIndex] || "string"}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    item={
                      tableOption[rowIndex][colIndex] !== "string"
                        ? true
                        : false
                    }
                    onChange={handleCellChange}
                    setAttendDate={attendDateValueHandler}
                    setCurrentMonth={setCurrentMonth}
                    setShowCal={setShowCal}
                    onOptionChange={handleCellOptionChange}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  //   실제 렌더링되는 최종본..
  return (
    <div
      className={classes["freeMemo-li"]}
      onClick={() => {
        setShowEditDeleteBtn((prev) => !prev);
      }}
    >
      {/* 제목부분 */}
      <div className={classes["title-div"]}>
        <FreeMemoTitle
          itemTitle={props.item?.title}
          edited={edited}
          titleChangeHandler={(title) => setTitle(title)}
        />
      </div>

      {/* 카테고리 보여주는 부분 */}
      <div className={classes["category-btns"]}>
        <FreeMemoCategory
          edited={edited}
          exist_category={props.category}
          item={props.item}
          setCategoryHandler={(categ) => setCategory(categ)}
        />
      </div>

      {/* 줄 추가, 삭제, 저장버튼 부분 */}
      <div className={classes["flex-center-100"]}>{edited && rowColBtns}</div>
      {/* 셀이 렌더링 되는 부분 */}
      {renderTable()}
      {/* 저장 삭제 버튼 모음 */}
      <div>
        {edited ? (
          <>
            {/* 저장버튼 */}
            <Button
              name={"저장"}
              className={"freeMemo-saveDelete"}
              onclick={handleSave}
            />
            {/* 취소버튼 */}
            <Button
              name={"취소"}
              className={"freeMemo-saveDelete"}
              onclick={() => {
                if (props.item) {
                  setEdited(false);
                } else {
                  props.closeHandler();
                }
              }}
            />
          </>
        ) : (
          <>
            {showEditDeleteBtn && (
              <>
                <Button
                  name={"수정"}
                  className={"freeMemo-saveDelete"}
                  onclick={() => {
                    setEdited(true);
                  }}
                />
                {/* 삭제버튼 */}
                {props.item && (
                  <Button
                    name={"삭제"}
                    className={"freeMemo-saveDelete"}
                    onclick={() => {
                      deleteHandler();
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// 실제 각각의 셀 부분 코드
function Cell({
  value,
  option,
  rowIndex,
  colIndex,
  onChange,
  setAttendDate,
  setCurrentMonth,
  setShowCal,
  onOptionChange,
  edited,
  item,
}) {
  const [optionValue, setOptionValue] = useState(option);

  const handleValueChange = (e) => {
    let now_value = e.target.value;
    onChange(now_value, rowIndex, colIndex);
  };

  const getDateHandler = (date) => {
    setAttendDate(date, rowIndex, colIndex);
  };

  //달력에서 받은 month로 currentMonth변경하기
  const getMonthHandler = (month) => {
    setCurrentMonth(dayjs(month).format("YYYY-MM"));
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setOptionValue(value);
    onOptionChange(value, rowIndex, colIndex);
  };

  return (
    <td className={classes["td"]}>
      {edited && (
        <select
          value={optionValue}
          onChange={handleOptionChange}
          className={classes["select-center"]}
        >
          <option value="string">문자</option>
          <option value="date">날짜</option>
          <option value="time">시각</option>
          <option value="dateTime">날짜+시각</option>
        </select>
      )}
      {edited ? (
        optionValue === "string" ? (
          <input
            type="text"
            value={value}
            onChange={handleValueChange}
            className={classes["table-input"]}
          />
        ) : optionValue === "date" ? (
          <div
            className={classes["date"]}
            onClick={() => setShowCal((prev) => !prev)}
          >
            {" "}
            <AttendCalendar
              setStart={item ? value : false}
              filterNone={true}
              getDateValue={getDateHandler}
              getMonthValue={getMonthHandler}
              getYearValue={getMonthHandler}
              about="tableInput"
              tableDateChangeHandler={(date) =>
                onChange(date, rowIndex, colIndex)
              }
            />
          </div>
        ) : optionValue === "time" ? (
          <div
            className={classes["date"]}
            onClick={() => setShowCal((prev) => !prev)}
          >
            {" "}
            <AttendCalendar
              setStart={item ? value : false}
              filterNone={true}
              showJustTime={true}
              showTime={true}
              getDateValue={getDateHandler}
              getMonthValue={getMonthHandler}
              getYearValue={getMonthHandler}
              about="tableInput"
              tableDateChangeHandler={(date) =>
                onChange(date, rowIndex, colIndex)
              }
            />
          </div>
        ) : (
          <div
            className={classes["date"]}
            onClick={() => setShowCal((prev) => !prev)}
          >
            {" "}
            <AttendCalendar
              setStart={item ? value : false}
              filterNone={true}
              getDateValue={getDateHandler}
              getMonthValue={getMonthHandler}
              getYearValue={getMonthHandler}
              about="tableInput"
              showTime={true}
              tableDateChangeHandler={(date) =>
                onChange(date, rowIndex, colIndex)
              }
            />
          </div>
        )
      ) : (
        <div>
          {option === "dateTime"
            ? dayjs(value).format("YY년 M월 D일(ddd) A h:mm")
            : option === "date"
            ? dayjs(value).format("YY년 M월 D일(ddd)")
            : option === "time"
            ? dayjs(value).format("A h:mm")
            : value}
        </div>
      )}
    </td>
  );
}

export default FreeMemoTableInput;
