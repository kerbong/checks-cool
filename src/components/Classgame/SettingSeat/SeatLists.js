import React, { useState, useEffect } from "react";
import Button from "../../Layout/Button";
import classes from "./SettingSeat.module.css";
import SeatTable from "./SeatTable";
import { dbService } from "../../../fbase";
import { onSnapshot, doc } from "firebase/firestore";

const SeatLists = (props) => {
  const [seatLists, setSeatLists] = useState([]);
  const [yearSeatLists, setYearSeatLists] = useState([]);
  // const [showEditor, setShowEditor] = useState("");
  const [dataYears, setDataYears] = useState([]);
  const [changeData, setChangeData] = useState("");

  const getSeatsFromDb = () => {
    let seatsRef = doc(dbService, "seats", props.userUid);

    onSnapshot(seatsRef, (doc) => {
      setSeatLists([]);
      const new_seats = [];
      const years = [];
      doc?.data()?.seats_data?.forEach((data) => {
        //22.3.1~23.2.28까지 년도로 묶음
        let data_year = data.saveDate.slice(0, 4);
        let data_month = data.saveDate.slice(5, 7);
        let new_data = {};
        if (+data_month >= 3) {
          years.push(data_year);
          //자료에 년도를 yearGroup으로 추가해둠
          new_data = { ...data, yearGroup: data_year };
        } else if (+data_month <= 1) {
          let fixed_year = String(+data_year - 1);
          years.push(fixed_year);
          new_data = { ...data, yearGroup: fixed_year };
        }
        new_seats.push(new_data);
      });
      //학년도를 저장해둠.
      setDataYears([...new Set(years)]);
      setSeatLists([...new_seats]);
    });
  };

  useEffect(() => {
    getSeatsFromDb();
  }, [changeData]);

  useEffect(() => {
    setYearGroupHandler("");
    setYearGroupHandler(changeData);
  }, [seatLists]);

  //년도를 기준으로 출결기록 세팅하기(셀렉트 옵션 선택시 실행되는 함수)
  const setYearGroupHandler = (year_group) => {
    const list = seatLists.filter((data) => data.yearGroup === year_group);
    setYearSeatLists([...list]);
  };

  const sortList = (list) => {
    const sorted_lists = list.sort(function (a, b) {
      let a_date = `${a.saveDate.slice(0, 10)}`;
      let b_date = `${b.saveDate.slice(0, 10)}`;
      return new Date(a_date) - new Date(b_date);
    });
    return sorted_lists.reverse();
  };

  return (
    <>
      <select
        className={classes["select"]}
        name="searchYear-selcet"
        defaultValue={""}
        onChange={(e) => setYearGroupHandler(e.target.value)}
      >
        <option value="" defaultChecked>
          --학년도--
        </option>
        {dataYears.map((year) => (
          <option value={year} key={year}>
            {year}학년도
          </option>
        ))}
      </select>
      <div className={classes["listSpace-div"]}></div>
      <hr />
      <div>
        {yearSeatLists &&
          sortList(yearSeatLists).map((item) => (
            <li
              key={`${item.saveDate}`}
              id={`${item.saveDate}`}
              className={classes["list-li"]}
            >
              <span className={classes["list-date"]}>
                {" "}
                {item.saveDate.slice(0, 10)}
              </span>

              <SeatTable
                rowColumn={item.rowColumn}
                students={[]}
                seatStudents={item.students}
                isExist={true}
                title={item.title}
                userUid={props.userUid}
                saveDate={item.saveDate}
                changeData={(year) => {
                  setChangeData(year);
                }}
                clName={item.clName}
              />
              <hr />
            </li>
          ))}
      </div>
    </>
  );
};

export default SeatLists;
