import React, { useState, useEffect } from "react";

import AttendCalendar from "components/Attendance/AttendCalendar";

import dayjs from "dayjs";
import Swal from "sweetalert2";
import axios from "axios";
import { load } from "cheerio";

const selectList1 = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인청광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
  "강원특별자치도",
];
const selectList2 = [
  {
    name: "서울특별시",
    list: [
      "강동송파교육지원청",
      "강서양천교육지원청",
      "강남서초교육지원청",
      "동작관악교육지원청",
      "성동광진교육지원청",
      "성북강북교육지원청",
      "동부교육지원청",
      "서부교육지원청",
      "남부교육지원청",
      "북부교육지원청",
      "중부교육지원청",
    ],
  },
];
// const selectList2 = {"서울특별시":[ "강동송파교육지원청", "강서양천교육지원청", "강남서초교육지원청", "동작관악교육지원청", "성동광진교육지원청", "성북강북교육지원청", "동부교육지원청", "서부교육지원청", "남부교육지원청", "북부교육지원청", "중부교육지원청"], "부산광역시", "대구광역시", "인청광역시", "광주광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도", "강원특별자치도"}

const Crawling = (props) => {
  const [firstSelect, setFirstSelect] = useState("");
  const [secondSelect, setSecondSelect] = useState("");
  const [attendDate, setAttendDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("YYYY-MM"));
  const [pageTitles, setPageTitles] = useState([]);

  useEffect(() => {
    console.log(selectList2.filter((each) => each.name === firstSelect)?.[0]);
  }, [firstSelect]);

  //크롤링 할 때 1년 미만까지만 되도록..!
  useEffect(() => {
    if (attendDate?.[1] === null) return;

    if (dayjs(attendDate?.[1]).diff(attendDate?.[0], "day") > 364) {
      Swal.fire(
        "검색기간 초과",
        "검색기간은 최대 1년입니다. 날짜를 수정해주세요!",
        "warning"
      );

      return;
    }
  }, [attendDate]);

  const getDateHandler = (date) => {
    setAttendDate(date);
  };

  //달력에서 받은 month로 currentMonth변경하기
  const getMonthHandler = (month) => {
    setCurrentMonth(dayjs(month).format("YYYY-MM"));
  };

  const fetchData = async (e) => {
    e.preventDefault();
    console.log("하이");
    const url =
      "https://www.open.go.kr/com/tema/temaSrhList.do?topictype=00012"; // 크롤링할 웹사이트의 URL
    const response = await axios.get(url).catch((err) => console.log(err));
    const $ = load(response.data);
    //초중고 설정 클릭
    $("#chk00").click();
    //기간 설정
    $("input[name='startDate'][id^=dp]").value = dayjs(attendDate[0]).format(
      "YYYY-MM-DD"
    );
    $("input[name='endDate'][id^=dp]").value = dayjs(attendDate[1]).format(
      "YYYY-MM-DD"
    );
    //기관설정
    const supporter = await axios.get(
      "https://www.open.go.kr/com/instt/insttSearchPop.do"
    );
    const $2 = load(supporter.data);
    $2(`li[name="${firstSelect + secondSelect}"] > a`).click();
    // document.querySelector('li[name="경기도광주하남교육지원청"]').querySelector('a').click()
    $2(".btn_area_center > .btn_ok").click();
    // document.querySelector('.btn_area_center').querySelector('.btn_ok').click()
    $("#v1").value = "50";
    // document.getElementById('v1').value = "50"
    //검색버튼 클릭
    $("#searchBtn")
      .click()
      .then(() => {
        console.log($("ul"));
        // $('ul').forEach((liTag)=> {
        //     liTag.
        // })
      });

    // const title = $("title").text();
    // setPageTitle(title);
  };

  return (
    <form onSubmit={(e) => fetchData(e)}>
      {/* 기간설정하기 */}
      {/* <input type="text" placeholder='.'/> */}

      {/* 시도 셀렉트 */}
      <select
        onChange={(e) => {
          setFirstSelect(e.target.value);
        }}
      >
        <option value="" defaultChecked>
          -시&도-
        </option>
        {selectList1.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>

      {/* 개별교육청 셀렉트 */}
      <select
        onChange={(e) => {
          setSecondSelect(e.target.value);
        }}
      >
        <option value="" defaultChecked>
          -교육청-
        </option>
        {firstSelect !== "" &&
          selectList2
            .filter((each) => each.name === firstSelect)?.[0]
            ?.list?.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
      </select>

      {/* 검색할 주제, 내용 */}
      <input type="text" placeholder="찾고 싶은 내용을 입력해주세요." />

      {/* 검색기간, 최대 1년 */}
      <div
      // className={classes["date"]}
      >
        {" "}
        <AttendCalendar
          getDateValue={getDateHandler}
          about={"attendance"}
          getMonthValue={getMonthHandler}
          getYearValue={getMonthHandler}
        />
      </div>
      <div
      //   className={classes["datepick-explain"]}
      >
        {props.about === "attendance" && "*시작 날짜와 끝 날짜를 선택해주세요!"}
      </div>

      <input
        type="submit"
        value="정보공개사이트에서 크롤링해오기"
        onClick={fetchData}
      />
    </form>
  );
};

export default Crawling;
