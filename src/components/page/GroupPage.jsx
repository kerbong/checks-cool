import React, { useState, useEffect, useRef } from "react";
import { GiHoneypot } from "react-icons/gi";
import classes from "./GroupPage.module.css";
import Button from "components/Layout/Button";
import { dbService } from "fbase";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import Modal from "components/Layout/Modal";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import ClassTableBasic from "./ClassTableBasic";
import { FaExchangeAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { BiSolidColorFill } from "react-icons/bi";

/** 그룹 설정하는 단계: 0시작전, 1rowCol설정, 2학생배치, 3그룹이름설정, 4그룹-학생매칭  */
const MAKE_STEP = ["", "makeSeat", "seatStd", "makeGroupName", "chooseGroup"];

const MOTION_VAR = {
  _upY: { opacity: 0, y: -20 },
  _downY: { opacity: 0, y: 20 },
  originXY: { opacity: 1, y: 0, x: 0 },

  dur5: { duration: 5 },
  _left30X: { opacity: 0, x: -30 },
  _left100X: { opacity: 0, x: -100 },
  _left130X: { opacity: 0, x: -130 },
};

const GROUP_BGCOLOR = [
  "#ffc9e8",
  "#9cb5e2",
  "#ed143d78",
  "#1d8b0073",
  "#ff8c008c",
  "#8b14ff66",
  "darkkhaki",
  "#24b2c59e",
  "blanchedalmond",
  "#69d3ff",
  "#8080809e",
  "#d6ffc9",
  "#ffc9c9",
  "#ec39bb87",
  "#c9e2ff",
];

const GroupPage = (props) => {
  const [newFrom, setNewFrom] = useState("");
  const [showSeatsList, setShowSeatsList] = useState(false);
  const [showGroupList, setShowGroupList] = useState(false);
  const [showRowCol, setShowRowCol] = useState(false);
  const [settingWhat, setSettingWhat] = useState("");
  const [tableRow, setTableRow] = useState("");
  const [tableColumn, setTableColumn] = useState("");
  const [groupDatas, setGroupDatas] = useState([]);

  const [nowDatas, setNowDatas] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [seatLists, setSeatLists] = useState([]);

  const [groupIndex, setGroupIndex] = useState([]);
  const [groupInfo, setGroupInfo] = useState([]);
  const [groupMakingStep, setGroupMakingStep] = useState(MAKE_STEP[0]);
  const [changeStd, setChangeStd] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedGrInd, setSelectedGrInd] = useState("");
  const [showTitleInputModal, setShowTitleInputModal] = useState(false);
  const [isSubject, setIsSubject] = useState(false);
  const [nowClassName, setNowClassName] = useState("");
  const [nowStudents, setNowStudents] = useState([]);
  const [stdPoints, setStdPoints] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const selectRef = useRef();

  /** 전달받는 id있으면 있는날짜 기준, 없으면 없는 기준으로 년도 반환 */
  const nowYear = (date) => {
    let data_id = date?.length > 0 ? date : new Date();
    return dayjs(data_id).format("MM-DD") <= "02-15"
      ? String(+dayjs(data_id).format("YYYY") - 1)
      : dayjs(data_id).format("YYYY");
  };

  /** 전달된 id가 있으면 해당 id(2023-11-16) 년도의 학생을 반환하는 함수 */
  const nowYearStudents = (id) => {
    let now_year = nowYear(id);
    //현재학년도 자료만 입력가능하고,, 불러오기
    let now_students = props?.students?.filter(
      (yearStd) => String(Object.keys(yearStd)[0]) === now_year
    )?.[0]?.[now_year];
    return now_students;
  };

  useEffect(() => {
    if (!props.students) return;
    setNowStudents(nowYearStudents());
  }, [props.students]);

  //해당학년도의 전담여부 확인해서 설정하는 함수
  const changeSubjectHandler = (data_year) => {
    let isSubject;
    if (props.isSubject) {
      isSubject = props.isSubject?.filter(
        (yearData) => Object.keys(yearData)[0] === data_year
      )?.[0]?.[data_year];
    }
    return isSubject;
  };

  useEffect(() => {
    if (tableRow === "" || tableColumn === "") return;

    let allDiv = document.getElementById("seats-div");

    allDiv.style.setProperty("--columns", tableColumn);

    allDiv.style.setProperty("--rows", tableRow);
  }, [tableRow, tableColumn]);

  /** 학생을 클릭하면 실행됨. groupMakingStep가 2학생배치 중이면 자리 이동할 수 있게.  */
  const groupIndexHandler = (name, stdInd) => {
    // 만약.. 현재 그룹설정 단계가 학생바꾸기이면..
    if (groupMakingStep === MAKE_STEP[2]) {
      //저장된 학생 없으면 추가
      if (changeStd === "") {
        setChangeStd(name);
        // 현재 클릭한 학생의 배경색 바꿔주기

        document.getElementById(name).style.backgroundColor = "#E9CBB7";

        //이미 존재하고 있으면.. 다시 비우기
      } else if (changeStd === name) {
        setChangeStd("");
        //현재 클릭한 학생의 배경색 원래 흰색으로
        document.getElementById(name).style.backgroundColor = "white";
        //없던 학생이름이면.. 자리 바꾸고 비우기
      } else {
        let new_nowDatas = nowDatas;
        let new_students = [];
        nowDatas?.students?.forEach((std) => {
          let new_std = std;
          if (changeStd.includes(std)) {
            new_std = name;
          } else if (std === name) {
            new_std = changeStd;
          }
          new_students.push(new_std);
        });
        new_nowDatas.students = new_students;

        document.getElementById(name).style.backgroundColor = "#E9CBB7";
        setTimeout(() => {
          setNowDatas(new_nowDatas);
          document.getElementById(name).style.backgroundColor = "white";
          document.getElementById(changeStd).style.backgroundColor = "white";
        }, 2000);

        setChangeStd("");
      }
      // 현재 학생- 모둠 매칭상황이면
    } else if (groupMakingStep === MAKE_STEP[4]) {
      // 학생의 모둠인덱스 groupIndex에 값이 없으면 현재 클릭된 모둠의 인덱스를 학생의 인덱스에 넣어주기(있어도 덮어씌움) (현재랑 똑같을 때만..제거!)
      let new_groupIndex = [...groupIndex];
      let now_groupInd = new_groupIndex[+stdInd];
      if (now_groupInd === selectedGrInd) {
        new_groupIndex[+stdInd] = "";
      } else {
        new_groupIndex[+stdInd] = selectedGrInd;
      }
      setGroupIndex(new_groupIndex);

      //
    } else {
      console.log("학생 클릭");
    }
  };

  //   seats 자리뽑기에서 데이터 가져오면, 실행되는 함수
  useEffect(() => {
    if (nowDatas?.length === 0) return;

    //이게 있으면...저장된, 받아온자료라는 뜻!
    if (nowDatas?.stdPoints?.length > 0) {
      setGroupIndex(nowDatas?.groupIndex);
      setGroupInfo(nowDatas?.groupInfo);
      setNowClassName(nowDatas?.clName);
      setStdPoints(nowDatas?.stdPoints);
      let data_id = nowDatas?.id?.slice(0, 10);
      let now_isSubject = changeSubjectHandler(nowYear(data_id));
      setIsSubject(now_isSubject);

      let rowCol = nowDatas.rowColumn.split("-");
      setTableRow(rowCol?.[0]);
      setTableColumn(rowCol?.[1]);
      //   students가 모두 있어야 ...진행됨.
    } else if (
      nowDatas?.students?.length > 0 &&
      nowDatas?.rowColumn?.length > 0
    ) {
      // 학생들 수만큼 length 가진 배열 만들기
      setGroupIndex(
        Array.from({ length: nowDatas?.students?.length }, () => "")
      );
      //캐릭터스 배열 만들기
      let new_characters = nowDatas?.students?.map((std) => {
        return { name: std, url: "" };
      });
      setCharacters(new_characters);

      let rowCol = nowDatas?.rowColumn.split("-");
      setTableRow(rowCol?.[0]);
      setTableColumn(rowCol?.[1]);

      setGroupMakingStep(MAKE_STEP[2]);
      Swal.fire(
        "학생자리 확인",
        "자리를 바꿀 두 명을 순서대로 클릭하면 자리를 바꿀 수 있어요. 자리가 완성되면 다음 버튼을 눌러주세요.",
        "info"
      );
    }
  }, [nowDatas]);

  /** 모둠화면 데이터 받아오기,, 그룹데이터와 캐릭터데이터 */
  const getGroupModeDatas = async () => {
    const groupRef = doc(dbService, "groupMode", props.userUid);
    const now_doc = await getDoc(groupRef);
    if (now_doc.exists()) {
      onSnapshot(groupRef, (doc) => {
        setCharacters([...doc?.data()?.characters]);
        setGroupDatas([...doc?.data()?.groupDatas]);
      });
    }
  };

  //모둠화면 데이터 받아오기
  useEffect(() => {
    getGroupModeDatas();
  }, []);

  useEffect(() => {
    if (groupMakingStep === MAKE_STEP[3]) {
      // 선택됐던 학생이 있으면 배경색 원래대로
      if (changeStd !== "") {
        document.getElementById(changeStd).style.backgroundColor = "white";
        setChangeStd("");
      }
    }
  }, [groupMakingStep]);

  //모둠화면의 데이터 받아와진 경우, 가장 최신의 데이터 현재 데이터로 설정하기.
  useEffect(() => {
    if (groupDatas?.length === 0) return;
    //현재 자료가 설정된 경우... 최신으로 바꾸지 않음
    if (nowDatas?.length !== 0) return;

    let latestGroupData = groupDatas[0]; // 초기값으로 첫 번째 객체를 최신 객체로 설정
    let latestTimestamp = new Date(latestGroupData.id).getTime(); // 첫 번째 객체의 timestamp 값

    for (let i = 1; i < groupDatas.length; i++) {
      const currentGroupData = groupDatas[i];
      const currentTimestamp = new Date(currentGroupData.id).getTime();

      // 현재 객체의 timestamp와 최신 객체의 timestamp를 비교하여 최신 객체를 업데이트
      if (currentTimestamp > latestTimestamp) {
        latestGroupData = currentGroupData;
        latestTimestamp = currentTimestamp;
      }
    }

    // console.log(latestGroupData);

    setNowDatas(latestGroupData);
  }, [groupDatas]);

  /** 저장된 자리표 불러와서 최신순으로 정렬해서 저장해두기 */
  const getSeatsFromDb = async () => {
    let seatsRef = doc(dbService, "seats", props.userUid);
    const seatsDoc = await getDoc(seatsRef);

    if (!seatsDoc.exists()) {
      showNoSeatLists();
      return;
    }
    onSnapshot(seatsRef, (doc) => {
      let new_seats = [];

      doc?.data()?.seats_data?.forEach((data) => {
        //예시자료(비밀자료) 는 걸러줌!

        if (data.title.includes("-*-예시자료-*-")) return;

        new_seats.push(data);
      });

      //날짜 기준 최신순으로 정렬하기.
      new_seats = new_seats.sort((a, b) =>
        a?.saveDate?.slice(0, 10) < b?.saveDate?.slice(0, 10) ? 1 : -1
      );

      //   console.log(new_seats);
      setSeatLists(new_seats);
    });
  };

  //모둠화면 데이터 받아오기
  useEffect(() => {
    if (!showSeatsList) return;

    getSeatsFromDb();
  }, [showSeatsList]);

  /** 저장된 자리 데이터 없으면 보여줄 swal */
  const showNoSeatLists = () => {
    Swal.fire(
      "자리 데이터 없음",
      "저장된 자리 데이터가 없습니다! [제자랑] - [자리뽑기] 에 자리뽑기 데이터가 있는지 확인해주세요.",
      "warning"
    );
  };

  /** 화면  상단 가운데 있는.. 모둠추가 버튼, 중복검사 후 수정 후 groupInfo에 객체만들어서 저장하고 인풋값 초기화  */
  const addGroupHandler = (e) => {
    e.preventDefault();

    // 빈칸이거나 띄어쓰기만 있으면 저장불가.
    if (groupName?.trim()?.length === 0) {
      Swal.fire(
        "모둠추가 실패",
        "빈칸으로 모둠이름을 설정할 수 없어요! 이름을 확인해주세요.",
        "warning"
      );
      return;
    }

    // 수정하는 거면,
    let new_g = {
      groupName: groupName?.trim(),
      grPoints: 0,
      color: "",
    };

    let new_groupInfo = [...groupInfo];
    let nameExist = false;

    groupInfo?.forEach((ginfo) => {
      if (ginfo.groupName === new_g.groupName) {
        nameExist = true;
      }
    });

    if (nameExist) {
      Swal.fire(
        "모둠이름 중복!",
        "모둠이름이 이미 존재해서 추가에 실패했어요! 이름을 확인해주세요.",
        "warning"
      );
      return;
    }

    new_groupInfo.push(new_g);

    setGroupInfo(new_groupInfo);
    setSelectedGrInd(null);

    // 인풋창의 모둠이름 value 삭제
    setGroupName("");
  };

  /** 그룹 제거하기 */
  const delGroupInfo = (index) => {
    let new_gInfo = groupInfo.filter((g, ind) => ind !== index);
    setGroupInfo(new_gInfo);
  };

  /** 그룹데이터 최종 저장. groupMode에 저장. */
  const saveGroupDatas = () => {
    //이거 제목이랑 같이 사용하는 state라.. 미리 빈칸으로 만들어주고, 모둠화면 데이터 제목으로 재사용..
    setGroupName("");
    //아예 모둠이 없으면.. 바로 저장하기

    if (groupInfo?.length === 0) {
      Swal.fire({
        title: "모둠설정 없이 저장",
        html: `모둠설정 없이 저장하여 사용하시겠어요? (모둠 보상 기능 사용불가! 저장하신 후에 화면 우측 상단의 <i class="fa-solid fa-gear"></i> 버튼으로 설정 가능)`,
        showDenyButton: true,
        confirmButtonText: "저장",
        confirmButtonColor: "#db100cf2",
        denyButtonColor: "#85bd82",
        denyButtonText: `취소`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setShowTitleInputModal(true);
        }
        return;
      });
    } else if (
      groupInfo?.length !== 0 &&
      groupIndex?.filter((gi) => gi === "")?.length !== 0
    ) {
      // 만약 모둠은 있는데, 모둠설정이 ""인, 모둠설정이 안된 학생이 있으면 swal알림

      Swal.fire(
        "모둠배정 필요",
        "모든 학생의 모둠이 설정되지 않았어요. 책상 색깔이 흰색인(미배정) 학생의 모둠을 배정해주세요!",
        "warning"
      );
      return;
      //모둠 있고, 모든 학생 설정되면 제목 입력창 보이도록
    } else {
      setShowTitleInputModal(true);
    }
  };

  useEffect(() => {
    if (!showTitleInputModal || !showRowCol) return;

    let data_id = "";
    //모둠화면 자료가 존재하던거면..
    if (nowDatas?.id) {
      data_id = nowDatas?.id?.slice(0, 10);
    }
    let now_isSubject = changeSubjectHandler(nowYear(data_id));
    setIsSubject(now_isSubject);

    // 데이터 저장 모달 보여주기. 제목:   . isSubject면 입력창 보여주고 clName 있으면 넣어주고, 없으면 선택가능한 select태그 입력완료하면 저장..!!!
  }, [showTitleInputModal, showRowCol]);

  const noGroupListSwal = () => {
    Swal.fire(
      "자료가 없어요!",
      "모둠화면에 등록된 자료가 없어요! '새로 만들기'에서 '처음부터' or '자리표 가져오기'로 자료를 만들어주세요.",
      "warning"
    );
    setShowGroupList(false);
  };

  //학급 선택시 실행되는 함수
  const selectClassHandler = () => {
    let className = selectRef.current.value;
    // console.log(className);
    setNowClassName(className);
  };

  /** 최종적으로 그룹데이터 제목, 학급명 받아서 저장하는 함수 */
  const saveGroupTitleCl = async (e) => {
    e.preventDefault();

    // 그룹네임 = 제목이 없거나, 전담인데 학급이 없으면.. 저장불가
    if (groupName?.trim()?.length === 0 || (isSubject && nowClassName === "")) {
      Swal.fire(
        "저장불가!",
        !isSubject
          ? "제목이 없어서 저장에 실패했어요. 제목을 입력해주세요."
          : "제목과 학급이 있어야 저장이 가능해요!",
        "warning"
      );
      return;
    }

    let new_groupData = {
      title: groupName?.trim(),
      clName: !isSubject ? "" : nowClassName,
      rowColumn: tableRow + "-" + tableColumn,
      id: dayjs().format("YYYY-MM-DD HH:mm"),
      students: nowDatas?.students,
      stdPoints: Array.from({ length: nowDatas?.students?.length }, () => 0),
      groupIndex: groupIndex,
      groupInfo: groupInfo,
    };

    let new_groupDatas = [];
    const groupRef = doc(dbService, "groupMode", props.userUid);
    const now_doc = await getDoc(groupRef);
    //기존 자료 있으면... 추가
    if (now_doc.exists()) {
      new_groupDatas = [...now_doc?.data()?.groupDatas];
    }
    new_groupDatas.unshift(new_groupData);

    // console.log(new_groupDatas);
    // console.log(characters);

    await setDoc(groupRef, {
      groupDatas: new_groupDatas,
      characters: characters,
    });

    setGroupName("");
    setShowTitleInputModal(false);
    // 저장이 끝나면 초기로 세팅 돌리기..
    setGroupMakingStep(MAKE_STEP[0]);
  };

  /** 모둠관련 모든 데이터 초기화 해주는 함수 */
  const resetOrigin = () => {
    setGroupIndex([]);
    setGroupInfo([]);
    setNowClassName("");
    setStdPoints([]);
  };

  /** 새로만들기에서.. 가로 세로줄 설정끝나고 저장버튼 누르면.. 올해 학생들 번호순으로 nowDatas에 세팅해주기. */
  const studentsSeatNew = (e) => {
    e.preventDefault();
    //전담이면.. 학급 선택해야함..
    if (isSubject && nowClassName === "") return;

    //students에서 이름만..
    let now_students = !isSubject
      ? nowStudents
      : nowStudents?.filter(
          (clSt) => Object.keys(clSt)?.[0] === nowClassName
        )?.[0]?.[nowClassName];

    now_students = now_students?.map((stdObj) => `${stdObj.name}`);

    setNowDatas({
      rowColumn: tableRow + "-" + tableColumn,
      students: now_students,
    });
  };

  /** 처음부터 새로만들기 함수 */
  const startNewHandler = () => {
    if (nowStudents?.length === 0) {
      Swal.fire(
        "설정불가",
        "먼저 학생명부에 학생을 등록해주세요! [곰돌이(메인화면)] - [학생명부] 에서 학생을 먼저 등록해주세요.",
        "warning"
      );
      return;
    }

    //   info로 ... 자리뽑기가 편함을 안내
    Swal.fire(
      "자리뽑기 추천",
      "책상배치를 수동으로 설정하시려면, [제자랑]-[자리뽑기]로 저장한 후에 '+'버튼, 'from자리뽑기' 버튼으로 불러와주세요.",
      "info"
    );

    setNewFrom("");
    setTableColumn("");
    setTableRow("");
    setNowDatas([]);
    setShowRowCol(true);
  };

  /** 그룹에 꿀땅 혹은 개별점수 누르면 점수 반영되는 함수 */
  const grPointsHandler = (what, std_ind) => {
    if (what === "honey-plus") {
      let new_groupInfo = [...groupInfo];
      new_groupInfo[groupIndex[std_ind]].grPoints += 1;
      setGroupInfo(new_groupInfo);
    } else if (what === "honey-minus") {
      let new_groupInfo = [...groupInfo];
      if (new_groupInfo[groupIndex[std_ind]] > 0) {
        new_groupInfo[groupIndex[std_ind]].grPoints -= 1;
        setGroupInfo(new_groupInfo);
      }
    } else if (what === "heart-plus") {
      let new_stdPoints = [...stdPoints];
      new_stdPoints[std_ind] += 1;
      setStdPoints(new_stdPoints);
    } else if (what === "heart-minus") {
      let new_stdPoints = [...stdPoints];
      let std_point = new_stdPoints[std_ind];
      if (std_point > 0) {
        new_stdPoints[std_ind] -= 1;
        setStdPoints(new_stdPoints);
      }
    }
  };

  return (
    <div className={classes["div"]}>
      {/* 자리표 이쓰면 목록 보여주기 */}
      {showSeatsList && seatLists?.length !== 0 && (
        <Modal onClose={() => setShowSeatsList(false)}>
          <span
            onClick={() => setShowSeatsList(false)}
            className={classes.xmark}
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </span>
          {/* 타이틀 부분 */}
          <div className={classes["flex-cen"]}>
            <div className={classes["title"]}>저장된 자리표 목록</div>
            <div className={classes["title-sub"]}>
              * [제자랑]-[자리표]에 저장된 자리표
            </div>
          </div>

          {/* 가로줄 */}
          <hr style={{ margin: "20px 15px" }} />

          {/* 자리표 목록 보여주기 */}
          <ul className={classes["seat-ul"]}>
            {seatLists?.map((seat, ind) => (
              <li
                key={ind}
                className={classes["seat-li"]}
                onClick={() => {
                  // 기존 데이터들 초기화.
                  resetOrigin();
                  setNowDatas(seat);
                  setShowSeatsList(false);
                }}
              >
                <div className={classes["seat-id"]}>
                  {seat.saveDate.slice(0, 10)}
                </div>
                <div className={classes["seat-title"]}>{seat.title}</div>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {/* 기존 모둠화면 목록이 없으면 */}
      {showGroupList && groupDatas?.length === 0 && noGroupListSwal()}

      {/* 기존 모둠화면 목록이 있으면 보여주기 */}
      {showGroupList && groupDatas?.length !== 0 && (
        <>
          <Modal onClose={() => setShowGroupList(false)}>
            <span
              onClick={() => setShowGroupList(false)}
              className={classes.xmark}
            >
              <i className="fa-regular fa-circle-xmark"></i>
            </span>
            {/* 타이틀 부분 */}
            <div className={classes["flex-cen"]}>
              <div className={classes["title"]}>기존 모둠화면 목록</div>
              <div className={classes["title-sub"]}>
                * 모둠화면으로 구성되어 저장된 자료입니다. (자리표와 다름)
              </div>
            </div>

            {/* 가로줄 */}
            <hr style={{ margin: "20px 15px" }} />

            {/* 모둠화면 목록 보여주기 */}
            <ul className={classes["seat-ul"]}>
              {groupDatas?.map((gd, ind) => (
                <li
                  key={ind}
                  className={classes["seat-li"]}
                  onClick={() => {
                    // 기존 데이터들 초기화.
                    resetOrigin();
                    setNowDatas(gd);
                    setShowGroupList(false);
                  }}
                >
                  <div className={classes["seat-id"]}>
                    {gd?.id?.slice(0, 10)}
                  </div>
                  <div className={classes["seat-title"]}>
                    {gd?.clName || ""}&nbsp;&nbsp;{gd?.title}
                  </div>
                </li>
              ))}
            </ul>
          </Modal>
        </>
      )}

      {/* 처음부터 새로 만들기 rowCol 모달 */}
      {showRowCol && (
        <>
          <Modal onClose={() => setShowRowCol(false)} addStyle={"shortcut"}>
            <span
              onClick={() => setShowRowCol(false)}
              className={classes.xmark}
            >
              <i className="fa-regular fa-circle-xmark"></i>
            </span>
            {/* 타이틀 부분 */}
            <div className={classes["flex-cen"]}>
              <div className={classes["title"]}>가로 * 세로 설정</div>
              <div className={classes["title-sub"]}>
                * 책상배치를 정해주세요
              </div>
            </div>

            {/* 가로줄 */}
            <hr style={{ margin: "20px 15px" }} />

            <div
              className={classes["header-center"]}
              style={{ flexDirection: "column" }}
            >
              {/* 가로, 세로 */}
              <form
                onSubmit={(e) => studentsSeatNew(e)}
                className={classes["seatsDiv-div"]}
                style={{ margin: "10px" }}
              >
                <div className={classes["seat-li"]}>
                  <div className={classes["seat-id"]}>가로</div>

                  <input
                    className={classes["groupName-input"]}
                    type="number"
                    placeholder="가로줄"
                    onChange={(e) => setTableColumn(e.target?.value)}
                    value={tableColumn}
                    style={{ width: "70px" }}
                  />
                </div>
                <div className={classes["seat-li"]}>
                  <div className={classes["seat-id"]}>세로</div>

                  <input
                    className={classes["groupName-input"]}
                    type="number"
                    placeholder="세로줄"
                    onChange={(e) => setTableRow(e.target?.value)}
                    value={tableRow}
                    style={{ width: "70px" }}
                  />
                </div>

                {/* 전담일 경우 학급명 선택 */}
                {isSubject && (
                  <div className={classes["seat-li"]}>
                    <div className={ClassTableBasic["seat-id"]}>
                      학급 선택하기
                    </div>
                    <select
                      ref={selectRef}
                      onChange={selectClassHandler}
                      className={classes["class-select"]}
                      value={nowClassName}
                    >
                      <option value="">--학급--</option>
                      {nowStudents?.map((cl) => (
                        <option key={Object.keys(cl)} value={Object.keys(cl)}>
                          {Object.keys(cl)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </form>
              <Button
                name="저장"
                onclick={(e) => {
                  studentsSeatNew(e);
                  // 학생번호순 배치하기
                  setShowRowCol(false);
                }}
                className={"groupMode-saveBtn"}
              />
              <Button
                name="취소"
                onclick={() => {
                  setTableColumn("");
                  setTableRow("");
                  setShowRowCol(false);
                }}
                className={"groupMode-saveBtn"}
                style={{ backgroundColor: "#a4a4a4" }}
              />
            </div>
          </Modal>
        </>
      )}

      {/* 저장할 때 제목과 학급 선택하는... */}
      {showTitleInputModal && (
        <>
          <Modal
            onClose={() => setShowTitleInputModal(false)}
            addStyle={"shortcut"}
          >
            <span
              onClick={() => setShowTitleInputModal(false)}
              className={classes.xmark}
            >
              <i className="fa-regular fa-circle-xmark"></i>
            </span>
            {/* 타이틀 부분 */}
            <div className={classes["flex-cen"]}>
              <div className={classes["title"]}>모둠데이터 저장하기</div>
              <div className={classes["title-sub"]}>
                {!isSubject
                  ? "* 제목을 입력해주세요"
                  : "* 제목을 입력하시고, 학급을 선택해주세요"}
              </div>
            </div>

            {/* 가로줄 */}
            <hr style={{ margin: "20px 15px" }} />

            <div
              className={classes["header-center"]}
              style={{ flexDirection: "column" }}
            >
              {/* 제목 */}
              <form
                onSubmit={(e) => saveGroupTitleCl(e)}
                className={classes["seat-li"]}
              >
                <div className={classes["seat-id"]}>제목</div>

                <input
                  className={classes["groupName-input"]}
                  type="text"
                  placeholder="저장될 제목"
                  onChange={(e) => setGroupName(e.target?.value)}
                  value={groupName}
                />

                {/* 전담일 경우 학급명 선택 */}
                {isSubject && (
                  <div className={classes["seat-li"]}>
                    <div className={ClassTableBasic["seat-id"]}>
                      학급 선택하기
                    </div>
                    <select
                      ref={selectRef}
                      onChange={selectClassHandler}
                      className={classes["class-select"]}
                      value={nowClassName}
                    >
                      <option value="">--학급--</option>
                      {nowStudents?.map((cl) => (
                        <option key={Object.keys(cl)} value={Object.keys(cl)}>
                          {Object.keys(cl)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </form>
              <Button
                name="저장"
                onclick={(e) => saveGroupTitleCl(e)}
                className={"groupMode-saveBtn"}
              />
              <Button
                name="취소"
                onclick={() => setShowTitleInputModal(false)}
                className={"groupMode-saveBtn"}
                style={{ backgroundColor: "#a4a4a4" }}
              />
            </div>
          </Modal>
        </>
      )}

      {/* 헤더의.. 버튼들 div */}
      <div className={classes["headBtns-div"]}>
        {/* 왼쪽에 배치될 새로/ 목록 버튼 */}
        <div className={classes["newList-div"]}>
          {newFrom === "" && (
            <motion.div
              initial="_upY"
              animate="originXY"
              transition="dur5"
              variants={MOTION_VAR}
            >
              {/* 새로만들기 */}

              <Button
                title="새로만들기"
                icon={<i className="fa-regular fa-plus"></i>}
                onclick={() => setNewFrom("allNew")}
                className={"groupPage-btn"}
              />
              {/* 목록보기 */}
              <Button
                title="기존목록"
                icon={<i className="fa-regular fa-folder-open"></i>}
                onclick={() => {
                  setNewFrom("");
                  setShowGroupList(true);
                }}
                className={"groupPage-btn"}
              />
            </motion.div>
          )}

          {newFrom === "allNew" && (
            <motion.div
              initial="_downY"
              animate="originXY"
              transition="dur5"
              variants={MOTION_VAR}
            >
              {/* 처음부터 */}
              <Button
                name="new+"
                onclick={startNewHandler}
                className={"groupPage-btn"}
              />
              {/* 자리표가져오기 */}
              <Button
                title="자리뽑기 데이터 가져오기"
                icon={
                  <>
                    from <i className="fa-sharp fa-solid fa-chair"></i>
                  </>
                }
                onclick={() => {
                  setNewFrom("");
                  setShowSeatsList(true);
                }}
                className={"groupPage-btn"}
              />
              {/* 취소 */}
              <Button
                title="취소"
                icon={<i className="fa-solid fa-xmark"></i>}
                onclick={() => setNewFrom("")}
                className={"groupPage-btn-cancle"}
              />
            </motion.div>
          )}

          {newFrom === "groupList" && (
            <>
              {/* 취소 */}
              <Button
                title="취소"
                icon={<i className="fa-solid fa-xmark"></i>}
                onclick={() => setNewFrom("")}
                className={"groupPage-btn-cancle"}
              />
            </>
          )}
        </div>

        {/* 자리설정단계에서.. 모둠이름 설정단계면 input창, 그룹 목록 보여주기 */}
        <div
          className={classes["header-center"]}
          style={{ flexDirection: "column" }}
        >
          {groupMakingStep === MAKE_STEP[0] && <div>업데이트 중...</div>}

          {groupMakingStep === MAKE_STEP[2] && (
            <>
              <motion.div
                initial="_downY"
                animate="originXY"
                transition="dur5"
                variants={MOTION_VAR}
              >
                <div className={classes["header-title"]}>학생자리 바꾸기</div>
                <div>* 두 명 순서대로 클릭!</div>
              </motion.div>
            </>
          )}

          {groupMakingStep === MAKE_STEP[3] && (
            <>
              <motion.div
                initial="_downY"
                animate="originXY"
                transition="dur5"
                variants={MOTION_VAR}
              >
                <div className={classes["header-title"]}>모둠 설정하기</div>
                {groupInfo?.length === 0 && (
                  <div>
                    * 모둠설정 없이 사용하시려면 오른쪽{" "}
                    <i className="fa-solid fa-chevron-right"></i> 버튼 클릭
                  </div>
                )}
              </motion.div>

              <motion.form
                initial="_downY"
                animate="originXY"
                transition="dur5"
                variants={MOTION_VAR}
                className={classes["seat-ul"]}
                onSubmit={(e) => addGroupHandler(e)}
              >
                <input
                  className={classes["groupName-input"]}
                  type="text"
                  placeholder="모둠이름"
                  onChange={(e) => setGroupName(e.target?.value)}
                  value={groupName}
                />
                <Button
                  name="추가"
                  onclick={(e) => addGroupHandler(e)}
                  className={"groupPage-btn"}
                  style={{ fontSize: "15px", borderRadius: "40px" }}
                />
              </motion.form>
            </>
          )}
          {groupMakingStep === MAKE_STEP[4] && (
            <>
              <motion.div
                initial="_downY"
                animate="originXY"
                transition="dur5"
                variants={MOTION_VAR}
              >
                <div className={classes["header-title"]}>모둠 배정하기</div>
                <div>
                  * 모둠클릭 => 학생클릭 👉🏼{" "}
                  <i className="fa-regular fa-floppy-disk"></i> 클릭
                </div>
                <div>
                  * 모둠없이 사용하시려면{" "}
                  <i className="fa-regular fa-floppy-disk"></i> 클릭
                </div>
              </motion.div>
            </>
          )}
        </div>

        {!nowDatas?.id && (
          <div
            className={classes["header-center"]}
            style={{ justifyContent: "flex-end" }}
          >
            {/* 화면 상단 우측 모둠자료를 구성하는데 쓰이는 버튼, 모둠설정  등 */}
            {/* 그룹 만드는 중이면 보일... 이전 버튼 */}
            {groupMakingStep !== MAKE_STEP[0] &&
              groupMakingStep !== MAKE_STEP[1] && (
                <motion.span
                  initial="_downY"
                  animate="originXY"
                  transition="dur5"
                  variants={MOTION_VAR}
                >
                  <Button
                    title="이전"
                    icon={<i className="fa-solid fa-chevron-left"></i>}
                    onclick={() => {
                      let now;
                      MAKE_STEP?.forEach((step, ind) => {
                        if (step === groupMakingStep) {
                          now = ind;
                          if (ind === 0) return;
                        }
                      });
                      if (now === 0) return;
                      setGroupMakingStep(MAKE_STEP[now - 1]);
                    }}
                    className={"groupPage-btn"}
                  />
                </motion.span>
              )}

            {/* 그룹 만드는 중이면 보일... 다음 버튼 */}
            {groupMakingStep !== MAKE_STEP[0] && (
              <motion.span
                initial="_downY"
                animate="originXY"
                transition="dur5"
                variants={MOTION_VAR}
              >
                <Button
                  title={groupMakingStep !== MAKE_STEP[4] ? "다음" : "저장"}
                  icon={
                    groupMakingStep !== MAKE_STEP[4] ? (
                      <i className="fa-solid fa-chevron-right"></i>
                    ) : (
                      <i className="fa-regular fa-floppy-disk"></i>
                    )
                  }
                  onclick={() => {
                    let now;
                    MAKE_STEP?.forEach((step, ind) => {
                      if (step === groupMakingStep) {
                        now = ind;
                      }
                    });
                    if (now === 4) {
                      //그룹만들기 끝나면 저장하는 함수 실행
                      saveGroupDatas();
                    } else {
                      setGroupMakingStep(MAKE_STEP[now + 1]);
                    }
                  }}
                  className={"groupPage-btn"}
                />
              </motion.span>
            )}
          </div>
        )}

        {/* id가 있는 저장된 자료면 */}
        {nowDatas?.id && (
          <>
            {/* 오른쪽에 배치될 모둠설정 버튼 */}
            <div
              className={classes["newList-div"]}
              style={{ justifyContent: "flex-end" }}
            >
              {/* 모둠설정 */}
              {settingWhat === "" && (
                <motion.div
                  initial="_upY"
                  animate="originXY"
                  transition="dur5"
                  variants={MOTION_VAR}
                  className={classes["newList-div"]}
                >
                  <Button
                    name=" 모둠설정"
                    icon={<i className="fa-solid fa-gear"></i>}
                    onclick={() => setSettingWhat("on")}
                    className={"groupPage-btn"}
                  />
                </motion.div>
              )}
              {settingWhat === "on" && (
                <motion.div
                  initial="_downY"
                  animate="originXY"
                  transition="dur5"
                  variants={MOTION_VAR}
                  className={classes["newList-div"]}
                >
                  {/* 설정on이면  */}
                  <Button
                    name={<FaExchangeAlt />}
                    title="자리변경"
                    onclick={() => setSettingWhat("자리변경")}
                    className={"groupPage-btn"}
                  />
                  <Button
                    name={<BiSolidColorFill />}
                    title="모둠 수정"
                    onclick={() => setSettingWhat("모둠수정")}
                    className={"groupPage-btn"}
                  />
                  <Button
                    name={<BiEdit />}
                    title="모둠명 변경"
                    onclick={() => setSettingWhat("모둠명변경")}
                    className={"groupPage-btn"}
                  />
                  <Button
                    title="취소"
                    icon={<i className="fa-solid fa-xmark"></i>}
                    onclick={() => setSettingWhat("")}
                    className={"groupPage-btn-cancle"}
                  />
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>

      {/* 모둠이름 목록 보여주기 */}
      <div
        className={classes["header-center"]}
        style={{ flexDirection: "column" }}
      >
        {groupMakingStep === MAKE_STEP[3] && (
          <>
            <div>
              {groupInfo?.map((gInfo, ind) => (
                <span key={ind}>
                  <Button
                    name={gInfo.groupName}
                    onclick={() => delGroupInfo(ind)}
                    className={"group-btn"}
                    style={{
                      backgroundColor: gInfo?.color || GROUP_BGCOLOR?.[ind],
                    }}
                  />
                </span>
              ))}
            </div>

            {groupInfo?.length > 0 && <div>* 모둠 클릭하면 삭제!</div>}
          </>
        )}

        {/* 학생 배정단계면.. 클릭하면 index저장해두고, 학생 지정가능하도록. */}
        {groupMakingStep === MAKE_STEP[4] && (
          <div>
            {groupInfo?.map((gInfo, ind) => (
              <span key={ind}>
                <Button
                  name={gInfo.groupName}
                  onclick={() => setSelectedGrInd(ind)}
                  className={"group-btn"}
                  style={
                    selectedGrInd === ind
                      ? {
                          fontSize: "20px",

                          fontWeight: "bold",
                          backgroundColor: gInfo?.color || GROUP_BGCOLOR?.[ind],
                          border: "solid 4px",
                          maxHeight: "85px",
                          padding: "16px 26px",
                        }
                      : {
                          backgroundColor: gInfo?.color || GROUP_BGCOLOR?.[ind],
                        }
                  }
                />
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={classes["seatsDiv-div"]}>
        {/* 실제 학생들 자리가 보여질 부분 */}
        <div className={classes["seats-div"]} id={"seats-div"}>
          {nowDatas?.students?.map((std, ind) => (
            <motion.div
              initial="_downY"
              animate="originXY"
              transition="dur5"
              variants={MOTION_VAR}
              key={ind}
              className={classes["item"]}
              id={std}
              style={
                groupIndex?.[ind] !== ""
                  ? {
                      backgroundColor:
                        groupInfo?.[groupIndex?.[ind]]?.color ||
                        GROUP_BGCOLOR[groupIndex?.[ind]],
                    }
                  : {}
              }
              onClick={() => groupIndexHandler(std, ind)}
              onMouseEnter={() => handleMouseEnter(ind)}
              onMouseLeave={handleMouseLeave}
            >
              {/* 자료가 완성된 상태고, 호버할때만 보일... 꿀당+,-  하트 +,- */}
              {nowDatas?.title?.length > 0 && hoveredIndex === ind && (
                <>
                  <div
                    className={classes["honey-plus"]}
                    onClick={() => grPointsHandler("honey-plus", ind)}
                  >
                    <GiHoneypot />+
                  </div>
                  <div
                    className={classes["honey-minus"]}
                    onClick={() => grPointsHandler("honey-minus", ind)}
                  >
                    <GiHoneypot />-
                  </div>
                  <div
                    className={classes["heart-plus"]}
                    onClick={() => grPointsHandler("heart-plus", ind)}
                  >
                    <i className="fa-solid fa-heart-circle-plus"></i>
                  </div>
                  <div
                    className={classes["heart-minus"]}
                    onClick={() => grPointsHandler("heart-minus", ind)}
                  >
                    <i className="fa-solid fa-heart-circle-minus"></i>
                  </div>
                </>
              )}

              {std}
            </motion.div>
          ))}
        </div>
      </div>
      <div className={classes["points-div"]}></div>
    </div>
  );
};

export default GroupPage;
