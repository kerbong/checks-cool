import React, { useState, useEffect } from "react";

import classes from "./SettingSeat.module.css";
import SeatTable from "./SeatTable";
import { dbService } from "../../../fbase";
import { doc, getDoc } from "firebase/firestore";

import dayjs from "dayjs";

//현재 학년도 정보
const setYear = (date) => {
  let data_id = date?.length > 0 ? date : new Date();
  return dayjs(data_id).format("MM-DD") <= "02-15"
    ? String(+dayjs(data_id).format("YYYY") - 1)
    : dayjs(data_id).format("YYYY");
};

const JustLists = (props) => {
  const [yearSeatLists, setYearSeatLists] = useState([]);

  const getSeatsFromDb = async () => {
    let seatsRef = doc(dbService, "seats", props.userUid);

    const docs = await getDoc(seatsRef);
    setYearSeatLists([]);
    if (docs.exists()) {
      const new_seats = [];

      docs?.data()?.seats_data?.forEach((data) => {
        //예시자료(비밀자료) 는 걸러줌!

        if (data.title.includes("-*-예시자료-*-")) return;

        //22.2.16~23.2.15까지 년도로 묶음
        let data_year = setYear(data.saveDate.slice(0, 10));

        let new_data = {};

        new_data = { ...data, yearGroup: data_year };

        new_seats.push(new_data);
      });

      setYearSeatLists([...new_seats]);
    }
  };

  useEffect(() => {
    getSeatsFromDb();
  }, []);

  const sortList = (list) => {
    const sorted_lists = list.sort(function (a, b) {
      let a_date = `${a.saveDate.slice(0, 10)}`;
      let b_date = `${b.saveDate.slice(0, 10)}`;
      return new Date(a_date) - new Date(b_date);
    });
    return sorted_lists;
  };

  return (
    <>
      <div>
        <h1 style={{ marginTop: "200px" }}>기존 자료 목록</h1>
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
                clName={item.clName}
                showJustLists={true}
              />
              <hr />
            </li>
          ))}
      </div>
    </>
  );
};

export default JustLists;
