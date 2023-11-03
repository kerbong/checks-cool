import React, { useState, useEffect } from "react";

import { dbService } from "../../fbase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SimpleTimer from "./SimpleTimer";

import classes from "./SimpleTimer.module.css";

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

  const [currentTime, setCurrentTime] = useState(
    dayjs("2023-01-01 13:21:00").format("YYYY-MM-DD HH:mm:ss")
  );
  //현재교시
  const [nowOn, setNowOn] = useState(0);
  //다음교시까지 남은 초
  const [remainTime, setRemainTime] = useState(0);
  const [showLeftToNext, setShowLeftToNext] = useState(true);

  let navigate = useNavigate();

  let todayYyyymmdd = dayjs().format("YYYY-MM-DD");

  //firestore에서 오늘 시간표 관련 자료들 받아오기
  const getClassTimeTableFromDb = async () => {
    let classTableRef = doc(dbService, "classTimeTable", props.userUid);

    setTodayClassTable({
      id: "",
      classMemo: [],
    });

    setClassStart([]);

    let new_todayClassTable = {
      id: "",
      classMemo: CLASSLISTS?.map((cl) => {
        return { memo: "", classNum: cl, subject: "" };
      }),
    };

    onSnapshot(classTableRef, (doc) => {
      if (doc.exists()) {
        //교시별 시작시간 세팅하기
        setClassStart(doc?.data()?.classStart);

        //교시 항목 이름 세팅하기
        setClassTitles(doc?.data()?.classTitles);

        setCttDatas(doc?.data()?.datas);
        doc?.data()?.datas.forEach((d) => {
          //오늘 시간표 있으면 저장해두기
          //   if (d.id === todayYyyymmdd) {
          if (d.id === "2023-11-03") {
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
          "메인페이지에서 시간표를 저장한 후에 [제자랑] - [수업시간표] 페이지를 활용해주세요!  ** 기초시간표를 저장해두시면 편리합니다!",
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
    todayClassTable.classMemo?.forEach((clM) => {
      new_classSubjects.push(clM.subject);
    });
    setClassSubjects(new_classSubjects);
  }, [todayClassTable]);

  //현재 시각의 시간표 확인하기
  useEffect(() => {
    if (!classSubjects) return;

    classSubjects.forEach((sub, index) => {
      //해당시간 시작
      let start_time = dayjs(classStart[index]).format("HH:mm:ss");
      //해당시간 끝
      let end_time = dayjs(classStart[index]).add(40, "m").format("HH:mm:ss");
      //다음시간 시작
      let next_time;
      if (index + 1 === classSubjects.length) {
        next_time = dayjs(classStart[index]).add(41, "m").format("HH:mm:ss");
      } else {
        next_time = dayjs(classStart[index + 1]).format("HH:mm:ss");
      }
      //현재 시각
      let cur_time = dayjs(currentTime).format("HH:mm:ss");

      //현재 시각이 해당 교시의 시작 시간 보다 미래 && 다음 교시 시작 시간보다 과거
      if (cur_time > start_time && cur_time < next_time) {
        setNowOn(index);
        //만약 현재 시각이  현재 교시의 시작+ 40분보다 이후이면 현재는 쉬는시간..! 다음교시 - 현재시각 => 남은 시간으로 세팅
        // if (cur_time > end_time) {

        // 만약 마지막 교시면.. 현재 교시 끝나는 시각 - 현재시각 남은시간 세팅
        let remain_time;
        if (index + 1 === classSubjects.length) {
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

        //현재 수업중이면,
        // } else {
        //   //다음교시 시작 시간 보여주기 설정인경우
        //   if (showLeftToNext) {
        //     let remain_time = dayjs("2023-01-01" + end_time).diff(
        //       dayjs("2023-01-01" + cur_time),
        //       "seconds"
        //     );
        //     //다음교시 시작 시각 - 현재 시각 초 세팅
        //     setRemainTime(remain_time);
        //   } else {
        //     setRemainTime(0);
        //   }
        // }

        //
        setNowOn(index);
        // console.log(classStart);
        // console.log(classSubjects);
        // console.log(classTitles);
        // console.log("과목명", classSubjects[index]);
        // console.log("교시 시작", classStart[index]);
        // console.log("교시 타이틀", classTitles[index]);
      }
    });
  }, [classSubjects]);

  //   useEffect(() => {
  //     if (remainTime === 0) return;
  // console.log(remainTime);
  //   }, [remainTime]);

  return (
    <div className={classes["div"]}>
      <SimpleTimer remainTime={remainTime} />
      {/* 다음교시 보여주기 */}
      <div style={{ width: "30%" }}>
        <h3 className={classes["h3"]}>{classTitles[nowOn]}</h3>
        <h2 className={classes["h2"]}>{classSubjects[nowOn]}</h2>
      </div>
    </div>
  );
};

export default ClassTimeTable;
