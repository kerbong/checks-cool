import React, { useState, useEffect } from "react";

import { dbService } from "../../fbase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SimpleTimer from "./SimpleTimer";

import classes from "./SimpleTimer.module.css";
import TimerInput from "./TimerInput";

const CLASSLISTS = [
  "아침",
  "1교시",
  "2교시",
  "3교시",
  "4교시",
  "점심",
  "5교시",
  "6교시",
  "방과후",
  "준비물",
];

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const ClassTimeTable = (props) => {
  //전체 수업시간표 자료
  const [cttDatas, setCttDatas] = useState([]);
  //오늘 자료만 저장해두기
  const [todayClassTable, setTodayClassTable] = useState({});
  //수업 시작 시간 저장해두기
  const [classStart, setClassStart] = useState([]);
  //수업 교시 이름 목록 (1교시, 2교시..)
  const [classTitles, setClassTitles] = useState(CLASSLISTS);
  //수업 교시별 교과 목록
  const [classSubjects, setClassSubjects] = useState([]);
  // 수업 교시별 메모 목록
  const [classMemo, setClassMemo] = useState([]);

  const [currentTime, setCurrentTime] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );
  //현재교시
  const [nowOn, setNowOn] = useState(null);
  //다음교시까지 남은 초
  const [remainTime, setRemainTime] = useState(0);
  const [showLeftToNext, setShowLeftToNext] = useState(true);
  const [subjectV, setSubjectV] = useState("");

  let navigate = useNavigate();

  let todayYyyymmdd = dayjs().format("YYYY-MM-DD");

  //firestore에서 오늘 시간표 관련 자료들 받아오기
  const getClassTimeTableFromDb = async () => {
    let classTableRef = doc(dbService, "classTimeTable", props.userUid);

    setTodayClassTable({
      id: "",
      classMemo: [],
    });

    let new_todayClassTable = {
      id: "",
      classMemo: CLASSLISTS?.map((cl) => {
        return { memo: "", classNum: cl, subject: "" };
      }),
    };

    onSnapshot(classTableRef, (doc) => {
      setClassStart([]);
      if (doc.exists()) {
        //교시별 시작시간 세팅하기
        setClassStart(doc?.data()?.classStart);

        //교시 항목 이름 세팅하기
        setClassTitles(doc?.data()?.classTitles);

        setCttDatas(doc?.data()?.datas);
        doc?.data()?.datas.forEach((d) => {
          //오늘 시간표 있으면 저장해두기
          //   if (d.id === todayYyyymmdd) {
          if (d.id === todayYyyymmdd) {
            setTodayClassTable(d);
            //없으면 기본값으로...?
          } else {
            setTodayClassTable(new_todayClassTable);
          }
        });

        // 아예 새롭게 처음이면
      } else {
        Swal.fire(
          "시간표 저장필요",
          "메인페이지에서 시간표를 저장한 후에 [제자랑] - [준비타이머] 페이지를 활용해주세요!  ** 기초시간표를 저장해두시면 편리합니다!",
          "warning"
        );
        navigate(`/`);
      }
    });
  };

  useEffect(() => {
    getClassTimeTableFromDb();
  }, []);

  useEffect(() => {
    if (Object.values(todayClassTable)?.length === 0) return;
    let new_classSubjects = [];
    let new_classMemo = [];
    todayClassTable.classMemo?.forEach((clM) => {
      new_classSubjects.push(clM.subject);
      new_classMemo.push(clM.memo);
    });
    setClassMemo(new_classMemo);
    setClassSubjects(new_classSubjects);
  }, [todayClassTable]);

  //현재 시각의 시간표 확인하기
  useEffect(() => {
    if (classStart?.length === 0) return;

    classStart.forEach((sub, index) => {
      //해당시간 시작
      let start_time = dayjs(classStart[index]).format("HH:mm:ss");
      //해당시간 끝
      let end_time = dayjs(classStart[index]).add(40, "m").format("HH:mm:ss");
      //다음시간 시작

      let next_time;
      if (index + 1 === classStart.length) {
        next_time = dayjs(classStart[index]).add(41, "m").format("HH:mm:ss");
      } else {
        next_time = dayjs(classStart[index + 1]).format("HH:mm:ss");
      }
      //현재 시각
      let cur_time = dayjs(currentTime).format("HH:mm:ss");

      //현재 시각이 해당 교시의 시작 시간 보다 미래 && 다음 교시 시작 시간보다 과거
      if (cur_time > start_time && cur_time < next_time) {
        //만약 현재 시각이  현재 교시의 시작+ 40분보다 이후이면 현재는 쉬는시간..! 다음교시 - 현재시각 => 남은 시간으로 세팅
        // if (cur_time > end_time) {

        // 만약 마지막 교시면.. 현재 교시 끝나는 시각 - 현재시각 남은시간 세팅
        let remain_time;

        if (index + 1 === classStart.length) {
          remain_time = dayjs("2023-01-01" + end_time).diff(
            dayjs("2023-01-01" + cur_time),
            "seconds"
          );
        } else {
          remain_time = dayjs("2023-01-01" + next_time).diff(
            dayjs("2023-01-01" + cur_time),
            "seconds"
          );
        }

        setRemainTime(+remain_time);

        setNowOn(index);

        // setSubjectV()
        return;
      }
    });
  }, [classStart]);

  const changeHandler = (e) => {
    setSubjectV(e.target.value?.trim());
  };

  return (
    <>
      <div className={classes["div"]}>
        <SimpleTimer remainTime={remainTime} />
        {/* 다음교시 보여주기 */}
        <div className={classes["nextCl"]}>
          <h3 className={classes["h3"]}>
            {classTitles?.[nowOn + 1] || "다음교시"}
          </h3>
          <h2 className={classes["h2"]}>
            {nowOn && classSubjects?.[nowOn + 1]}
            {(!nowOn || !classSubjects[nowOn + 1]) && (
              <input
                type="text"
                className={classes["sub-input"]}
                placeholder="직접입력"
                vlaue={subjectV}
                onChange={changeHandler}
              />
            )}
          </h2>
        </div>
      </div>
      <div>
        <TimerInput classMemo={classMemo?.[nowOn + 1]} />
      </div>
    </>
  );
};

export default ClassTimeTable;
