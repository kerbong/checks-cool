import React, { useState, useEffect } from "react";
import Button from "../../Layout/Button";
import classes from "./SettingSeat.module.css";
import SeatTable from "./SeatTable";
import { dbService } from "../../../fbase";
import {
  collection,
  query,
  onSnapshot,
  where,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const SeatLists = (props) => {
  const [seatLists, setSeatLists] = useState([]);
  const [showEditor, setShowEditor] = useState("");
  const [dataYears, setDataYears] = useState([]);
  const [searchYear, setSearchYear] = useState(
    String(new Date().getFullYear())
  );
  const [items, setItems] = useState();

  const getSeatsFromDb = () => {
    let years = [];
    let queryWhere = query(
      collection(dbService, "seats"),
      where("writtenId", "==", props.userUid)
    );

    onSnapshot(queryWhere, (snapShot) => {
      setSeatLists([]);
      snapShot.docs.map((doc) => {
        let itemObj = {
          ...doc.data(),
          doc_id: doc.id,
        };
        years.push(doc.data().saveDate.slice(0, 4));
        if (doc.data().saveDate.slice(0, 4) !== searchYear) {
          return false;
        }

        return setSeatLists((prev) => [...prev, itemObj]);
      });
      setDataYears([...new Set(years)]);
    });
  };

  useEffect(() => {
    getSeatsFromDb();
  }, [searchYear]);

  const searchYearHandler = (e) => {
    const year = e.target.value;
    setSearchYear(year);
  };

  const sortList = (list) => {
    const sorted_lists = list.sort(function (a, b) {
      let a_date = `${a.id}`;
      let b_date = `${b.id}`;
      return new Date(a_date) - new Date(b_date);
    });
    return sorted_lists;
  };

  return (
    <div>
      <select
        className={classes["select"]}
        name="searchYear-selcet"
        defaultValue={searchYear}
        onChange={searchYearHandler}
      >
        <option value="" disabled>
          --년도--
        </option>
        {dataYears.map((year) => (
          <option value={year} key={year}>
            {year}년
          </option>
        ))}
      </select>
      <div>
        {seatLists &&
          sortList(seatLists).map((item) => (
            <li
              key={`${item.saveDate}${item.title}`}
              id={`${item.saveDate}${item.title}`}
              className={classes["list-li"]}
            >
              <span className={classes["list-date"]}> {item.saveDate}</span>

              <SeatTable
                rowColumn={item.rowColumn}
                students={[]}
                seatStudents={item.students}
                doc_id={item.doc_id}
                title={item.title}
                userUid={props.userUid}
              />
              <hr />
            </li>
          ))}
      </div>
    </div>
  );
};

export default SeatLists;
