import React, { useState, useEffect } from "react";

import classes from "./SettingSeat.module.css";
import SeatTable from "./SeatTable";
import { dbService } from "../../../fbase";
import { onSnapshot, doc } from "firebase/firestore";
import dayjs from "dayjs";

const SeatLists = (props) => {
  const [seatLists, setSeatLists] = useState([]);
  const [yearSeatLists, setYearSeatLists] = useState([]);
  // const [showEditor, setShowEditor] = useState("");
  const [dataYears, setDataYears] = useState([]);
  const [changeData, setChangeData] = useState("");

  //학년도 설정함수
  const setYear = (date) => {
    let data_id = date?.length > 0 ? date : new Date();
    return dayjs(data_id).format("MM-DD") <= "02-15"
      ? String(+dayjs(data_id).format("YYYY") - 1)
      : dayjs(data_id).format("YYYY");
  };

  const getSeatsFromDb = () => {
    let seatsRef = doc(dbService, "seats", props.userUid);

    setSeatLists([]);
    onSnapshot(seatsRef, (doc) => {
      const new_seats = [];
      const years = [];
      doc?.data()?.seats_data?.forEach((data) => {
        //예시자료(비밀자료) 는 걸러줌!

        if (data.title.includes("-*-예시자료-*-")) return;

        //22.2.16~23.2.15까지 년도로 묶음
        let fixed_year = setYear(data.saveDate.slice(0, 10));

        let new_data = { ...data, yearGroup: fixed_year };

        years.push(fixed_year);
        new_seats.push(new_data);
      });

      //학년도를 저장해둠.
      setDataYears([...new Set(years)]);
      setSeatLists([...new_seats]);
    });
  };

  useEffect(() => {
    getSeatsFromDb();
  }, [changeData, props.userUid]);

  useEffect(() => {
    setYearGroupHandler("");
    setYearGroupHandler(changeData);
  }, [seatLists]);

  //년도를 기준으로 출결기록 세팅하기(셀렉트 옵션 선택시 실행되는 함수)
  const setYearGroupHandler = (year_group) => {
    const list = seatLists?.filter((data) => data.yearGroup === year_group);
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
        {dataYears?.map((year) => (
          <option value={year} key={year}>
            {year}학년도
          </option>
        ))}
      </select>
      <div className={classes["listSpace-div"]}></div>
      <hr />
      <div>
        {yearSeatLists &&
          sortList(yearSeatLists)?.map((item) => (
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
                wholeStudents={props.wholeStudents}
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
                showJustLists={false}
                menuOnHead={props.menuOnHead}
              />
              <hr />
            </li>
          ))}
      </div>
    </>
  );
};

export default SeatLists;
