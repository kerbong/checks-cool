import React, { useState, useEffect, useRef, useCallback } from "react";
import { GiHoneypot } from "react-icons/gi";
import classes from "./GroupPage.module.css";
import Button from "components/Layout/Button";
import { dbService, storageService } from "fbase";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import Modal from "components/Layout/Modal";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import ClassTableBasic from "./ClassTableBasic";

import { FaExchangeAlt } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { ImMakeGroup } from "react-icons/im";
import { IoPersonSharp } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

import Attendance from "components/Attendance/Attendance";
import attendanceOption from "../../attendanceOption";
import consultingOption from "../../consultingOption";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { v4 } from "uuid";
import Input from "components/Layout/Input";

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

const CHARACTERS = [
  "🍿",
  "🍞",
  "🍟",
  "🍔",
  "🍕",
  "🍗",
  "🍰",
  "🍬",
  "🍫",
  "🍡",
  "🍇",
  "🍉",
  "🍒",
  "🍓",
  "🍎",
  "🥑",
  "🥕",
  "🌰",
  "🍋",
  "🫐",
  "🍩",
  "🥗",
  "🌭",
  "🍧",
  "🫛",
  "🥦",
  "🥨",
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
  const [randNum, setRandNum] = useState(0);
  const [menuRight, setMenuRight] = useState(true);
  const [menuFunc, setMenuFunc] = useState("");
  const [clickedStd, setClickedStd] = useState("");
  const [addOrLoad, setAddOrLoad] = useState("");
  const [checkListDataAll, setCheckListDataAll] = useState([]);
  const [checkListData, setCheckListData] = useState(null);
  const [unSubmitStudents, setUnSubmitStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const autoSaveGroupDatas = useRef(null);
  const selectRef = useRef();
  const menuRef = useRef();

  const handleMouseEnter = (what, index) => {
    setHoveredIndex(String(what + index));
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  //화면 사이즈가 변경되면.. 시간표의 기본 세팅을 열림으로 바꿔주기.
  const resizeHandler = useCallback(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1400) {
        setMenuRight(true);
        if (menuRef?.current) {
          menuRef.current.style.left = "auto";
        }
      } else {
        setMenuRight(false);
        if (menuRef?.current) {
          let menu_width = menuRef?.current?.offsetWidth;
          //   console.log(menuRef?.current?.offsetWidth);
          menuRef.current.style.left =
            (window.innerWidth - menu_width) / 2 + "px";
        }
      }
    });
  }, []);

  // 윈도우 창의 크기에 따라 시간표 보여주기 기능 true로 바꾸기
  useEffect(() => {
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const charactersRanNum = +Math.round(Math.random() * CHARACTERS?.length);

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

  //모둠점수 초기화
  const grPointsZero = () => {
    if (groupInfo?.length === 0) return;
    Swal.fire({
      title: "모둠점수 초기화!",
      html: `모둠점수를 0점으로 초기화 할까요?<br/> <b>** 되돌리기 불가능!!</b>`,
      showDenyButton: true,
      confirmButtonText: "저장",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let new_groupInfo = [];
        groupInfo?.forEach((ginfo) => {
          new_groupInfo.push({ ...ginfo, grPoints: 0 });
        });
        setGroupInfo(new_groupInfo);
        setSettingWhat("");
      }
    });
  };

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

  const autoSave = async () => {
    let new_groupData = {
      title: nowDatas?.title,
      clName: nowDatas?.clName,
      rowColumn: nowDatas?.rowColumn,
      id: nowDatas?.id,
      students: nowDatas?.students,
      stdPoints: stdPoints,
      groupIndex: groupIndex,
      groupInfo: groupInfo,
    };

    let new_groupDatas = [];

    try {
      const groupRef = doc(dbService, "groupMode", props.userUid);
      const now_doc = await getDoc(groupRef);
      //기존 자료 있으면... id가 같은거 있으면 찾아서 교체하기
      if (now_doc.exists()) {
        [...now_doc?.data()?.groupDatas].forEach((dt) => {
          let new_dt = dt;
          if (dt.id === nowDatas?.id) {
            new_dt = new_groupData;
          }
          new_groupDatas.push(new_dt);
        });
      } else {
        new_groupDatas.push(new_groupData);
      }

      await setDoc(groupRef, {
        groupDatas: new_groupDatas,
        characters: characters,
      });

      // 자료 저장되었음을 알려주는... 클릭필요없는 검은색 반투명의 작은 모달 띄워주기
    } catch (error) {
      Swal.fire(
        "저장실패!",
        "자료 수정/저장에 실패했어요! 인터넷 연결상태를 확인해주세요. 문제가 지속되면 kerbong@gmail.com 혹은 [교사랑]-[이거해요]로 알려주세요!",
        "warning"
      );
    }
  };

  // 무언가 요소가 변하면, 2초 후에 저장하는 함수.
  useEffect(() => {
    if (!nowDatas?.id || groupDatas?.length === 0) return;

    // 이전에 예약된 저장 작업이 있다면 취소
    if (autoSaveGroupDatas.current) {
      clearTimeout(autoSaveGroupDatas.current);
    }

    // 새로운 저장 작업 예약
    autoSaveGroupDatas.current = setTimeout(() => {
      autoSaveGroupDatas.current = null; // 저장 작업 예약 해제
      autoSave();
    }, 2800);

    // 컴포넌트가 언마운트되거나 의존성이 변경되면 저장 작업 예약 취소
    return () => {
      if (autoSaveGroupDatas.current) {
        clearTimeout(autoSaveGroupDatas.current);
      }
    };
  }, [groupIndex, groupInfo, stdPoints, nowDatas]);

  useEffect(() => {
    if (tableRow === "" || tableColumn === "") return;

    let allDiv = document.getElementById("seats-div");

    allDiv.style.setProperty("--columns", tableColumn);

    allDiv.style.setProperty("--rows", tableRow);
  }, [tableRow, tableColumn]);

  /** 학생을 클릭하면 실행됨. groupMakingStep가 2학생배치 중이면 자리 이동할 수 있게.  */
  const stdClickHandler = (name, stdInd) => {
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
        // 만약.. id가 없는, 기존 자료가 아니면
        if (!nowDatas?.id) {
          //현재 클릭한 학생의 배경색 원래 흰색으로
          document.getElementById(name).style.backgroundColor = "white";
          // 기존 자료에서 자리바꾸기면, 배경색을 바꿔줘야함.
        } else {
          let bg_color =
            groupInfo?.[groupIndex?.[stdInd]]?.color ||
            GROUP_BGCOLOR[groupIndex?.[stdInd]];
          document.getElementById(name).style.backgroundColor = bg_color;
        }

        //없던 학생이름이면.. 자리 바꾸고 비우기
      } else {
        // 기존모둠 인덱스
        let changeStd_ind = 0;
        let nowStd_ind = 0;

        let new_nowDatas = nowDatas;
        let new_students = [];
        nowDatas?.students?.forEach((std, st_ind) => {
          let new_std = std;
          if (std === changeStd) {
            changeStd_ind = st_ind;
            new_std = name;
          } else if (std === name) {
            nowStd_ind = st_ind;
            new_std = changeStd;
          }
          new_students.push(new_std);
        });
        new_nowDatas.students = new_students;

        // 만약.. id가 있는, 기존 자료면 그룹인덱스 배열도 변경해주기
        let changeStd_color = "white";
        let nowStd_color = "white";
        if (nowDatas?.id) {
          changeStd_color =
            groupInfo?.[groupIndex?.[changeStd_ind]]?.color ||
            GROUP_BGCOLOR[groupIndex?.[changeStd_ind]];

          nowStd_color =
            groupInfo?.[groupIndex?.[nowStd_ind]]?.color ||
            GROUP_BGCOLOR[groupIndex?.[nowStd_ind]];

          //개별 포인트 순서도 바꿔주기

          let new_stdPoints = [];

          stdPoints?.forEach((p, p_ind) => {
            let new_p = p;
            if (p_ind === nowStd_ind) {
              new_p = stdPoints[changeStd_ind];
            } else if (p_ind === changeStd_ind) {
              new_p = stdPoints[nowStd_ind];
            }
            new_stdPoints.push(+new_p);
          });

          setStdPoints(new_stdPoints);

          //그룹 인덱스도 수정 안해도 됨. 자리의 모둠설정 자체는 동일함. 학생만 자리를 바꿈.
        }

        document.getElementById(name).style.backgroundColor = "#E9CBB7";

        setTimeout(() => {
          setNowDatas(new_nowDatas);
          document.getElementById(name).style.backgroundColor = changeStd_color;
          document.getElementById(changeStd).style.backgroundColor =
            nowStd_color;
        }, 2000);

        setChangeStd("");
      }
      // 현재 학생- 모둠 매칭상황이면
    } else if (groupMakingStep === MAKE_STEP[4]) {
      // 학생의 모둠인덱스 groupIndex에 값이 없으면 현재 클릭된 모둠의 인덱스를 학생의 인덱스에 넣어주기(있어도 덮어씌움) (현재랑 똑같을 때만..제거!)

      if (selectedGrInd === "") return;

      let new_groupIndex = [...groupIndex];
      let now_groupInd = new_groupIndex[+stdInd];

      if (now_groupInd === selectedGrInd) {
        new_groupIndex[+stdInd] = "";
      } else {
        new_groupIndex[+stdInd] = selectedGrInd;
      }
      setGroupIndex(new_groupIndex);

      //
    } else if (menuFunc === "출결" || menuFunc === "상담") {
      // 이름만 보내는 게 아니라, "1 김민수" 형태로 설정하기
      let stData = filteredStudents?.filter(
        (stObj) => stObj.name === name
      )?.[0];

      //   만약 학생이 존재하지 않으면
      if (!stData) {
        Swal.fire(
          "학생 오류!",
          "선택한 학생이 현재 학년도에 존재하지 않아요! [메인화면]-[학생명부]를 확인해주세요!",
          "warning"
        );
        return;
        // 존재하면 "1 김민수" 처럼 세팅하기.
      } else {
        setClickedStd(stData.num + " " + stData.name);
      }
      //   제출에서 add 즉, 추가 혹은 기존자료 수정  중에 클릭하면
    } else if (menuFunc === "제출" && addOrLoad === "add") {
      let new_unSubmitStudents = [...unSubmitStudents];
      // 미제출 학생에 있었으면 제외, 없었으면 추가
      if (unSubmitStudents?.filter((st) => st.name === name)?.length > 0) {
        new_unSubmitStudents = new_unSubmitStudents?.filter(
          (st) => st.name !== name
        );
      } else {
        let stData = filteredStudents?.filter(
          (stObj) => stObj.name === name
        )?.[0];

        new_unSubmitStudents.push(stData);
      }
      setUnSubmitStudents(new_unSubmitStudents);
    } else if (menuFunc === "개별" && addOrLoad === "add") {
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
    // 만약 그룹인덱스 배열에 해당 그룹의 인덱스가 존재하면... 삭제해주기
    if (groupIndex?.length > 0) {
      let new_groupIndex = [];
      groupIndex?.forEach((gind) => {
        let new_gind = gind;
        if (gind === index) {
          new_gind = "";
        } else if (gind > index) {
          new_gind -= 1;
        }
        new_groupIndex.push(new_gind);
      });
      setGroupIndex(new_groupIndex);
    }

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
    let now_students = filteringStds();

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
      new_groupInfo[std_ind].grPoints += 1;

      setGroupInfo(new_groupInfo);
    } else if (what === "honey-minus") {
      let new_groupInfo = [...groupInfo];

      if (new_groupInfo[std_ind].grPoints > 0) {
        new_groupInfo[std_ind].grPoints -= 1;
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

  /** 그룹설정 변경되는거 관리하기 */
  //   const saveGroupSettingHandler = () => {
  //     if (settingWhat === "자리변경") {
  //       //   setGroupMakingStep(MAKE_STEP[2]);
  //     } else if (settingWhat === "모둠수정") {
  //       //   setGroupMakingStep(MAKE_STEP[3]);
  //     }
  //   };

  /** 학생 개인 점수의 등수 1~5등까지 보여주기 */
  const stdRank1to5 = (st_ind) => {
    let now_point = stdPoints[st_ind];

    const sum = stdPoints.reduce((acc, curr) => {
      // 현재 값이 빈 문자열인 경우 0으로 처리하여 더함
      if (
        typeof curr === "number" ||
        (typeof curr === "string" && curr.trim() !== "")
      ) {
        return acc + Number(curr);
      }
      return acc;
    }, 0);

    if (sum === 0) return;

    const sortedArray = [...stdPoints].sort((a, b) => b - a); // 배열을 내림차순으로 정렬
    const targetIndex = sortedArray.indexOf(now_point); // 대상 값의 인덱스 찾기
    let rank = targetIndex + 1; // 인덱스를 등수로 변환하여 1을 더함

    let crown;

    if (rank === 1) {
      crown = (
        <FaCrown
          size={32}
          color="#ffe300"
          className={classes["std-crown"]}
          style={{ top: "-30%", left: "2%" }}
        />
      );
    } else if (rank <= 5) {
      crown = (
        <FaCrown size={25} color="#ffe300" className={classes["std-crown"]} />
      );
    } else {
      crown = (
        <FaCrown size={25} color="lightgray" className={classes["std-crown"]} />
      );
    }

    // 중복된 점수 처리
    // const duplicates = sortedArray.filter((score) => score === now_point);
    // if (duplicates.length > 1) {
    //   rank = "공동 " + rank;
    // }

    return (
      <>
        {crown}
        <div
          className={classes["std-rank"]}
          style={rank === 1 ? { fontSize: "16px" } : {}}
        >
          {rank}
        </div>
      </>
    );
  };

  /** 전담여부 판단해서 현재 학급의 학생만 필터링해서 반환해주는 함수 */
  const filteringStds = () => {
    let now_students = !isSubject
      ? nowStudents
      : nowStudents?.filter(
          (clSt) => Object.keys(clSt)?.[0] === nowClassName
        )?.[0]?.[nowClassName];

    return now_students;
  };

  const sortList = (list) => {
    const sorted_lists = list.sort(function (a, b) {
      let a_date = `${a.id}`;
      let b_date = `${b.id}`;
      return new Date(a_date) - new Date(b_date);
    });
    return sorted_lists;
  };

  /** 체크리스트 혹은 리스트메모 기존 자료 다운받아오는 로직 */
  const getCheckListsDataHandler = async (what) => {
    const dataRef = doc(dbService, what, props.userUid);

    onSnapshot(dataRef, (dataDoc) => {
      setCheckListDataAll([]);
      setCheckListDataAll(sortList([...dataDoc?.data()?.[what + "_data"]]));
    });
  };

  /** 메뉴바의 기능들을 실행하는  / 출결 개별 상담 제출 / 중에서 */
  useEffect(() => {
    if (menuFunc === "") return;

    let now_students = filteringStds();
    setFilteredStudents(now_students);

    setUnSubmitStudents(now_students);

    // 기존 자료 목록 다운로드..!
    if (menuFunc === "제출") {
      getCheckListsDataHandler("checkLists");
    } else if (menuFunc === "개별") {
      getCheckListsDataHandler("listMemo");
    }
  }, [menuFunc]);

  /** 만약 제출 혹은 개별기록의 기존 자료를 선택하면, unSubmitStudents를 세팅해줌. */
  useEffect(() => {
    if (!checkListData) return;
    setGroupName(checkListData?.title);
    if (menuFunc === "제출") {
      setUnSubmitStudents(
        checkListData?.unSubmitStudents?.sort((a, b) => +a.num - +b.num)
      );
    } else if (menuFunc === "개별") {
    }
  }, [checkListData]);

  const saveCheckListMemo = () => {
    if (menuFunc === "제출") {
    } else if (menuFunc === "개별") {
    }
  };

  /** 상담자료 저장하기 로직 */
  const addDataHandler = async (data) => {
    let fileUrl = "";
    //파일 있으면 storage에 저장하기, 업데이트하면서 파일을 바꾸지 않는 경우 패스!
    if (data.attachedFileUrl !== "") {
      //storage에 저장
      //음성녹음인 경우
      if (data.attachedFileUrl instanceof Object) {
        const upAndDownUrl = async (audio_file) => {
          const response = await uploadBytes(
            ref(storageService, `${props.userUid}/${v4()}`),
            audio_file,
            { contentType: "audio/mp4" }
          );
          //firestore에 저장할 url받아오기
          return await getDownloadURL(response.ref);
        };

        fileUrl = await upAndDownUrl(data.attachedFileUrl);

        //이미지파일인 경우
      } else {
        const response = await uploadString(
          ref(storageService, `${props.userUid}/${v4()}`),
          data.attachedFileUrl,
          "data_url"
        );
        //firestore에 저장할 url받아오기
        fileUrl = await getDownloadURL(response.ref);
      }
    }
    //firebase에 firestore에 업로드, 데이터에서 같은게 있는지 확인
    let new_data = {
      ...data,
      attachedFileUrl: fileUrl,
    };

    let data_year = nowYear(data.id.slice(0, 10));
    //전담일 경우 학급만 추가하기
    if (changeSubjectHandler(data_year)) {
      new_data = {
        ...new_data,
        clName: nowClassName === "" ? new_data.clName : nowClassName,
      };
    }
    if (new_data?.yearGroup) {
      delete new_data.yearGroup;
    }

    const consultRef = doc(dbService, "consult", props.userUid);
    //상담자료 받아오기
    const consultSnap = await getDoc(consultRef);
    //만약 저장된 자료가 있었으면
    if (consultSnap.exists()) {
      //현재 저장되는 자료와 중복되는거 제외하고 거기에 새 자료 추가함

      let new_datas = [...consultSnap.data().consult_data];

      new_datas.push(new_data);
      await setDoc(consultRef, {
        consult_data: new_datas,
      });
    } else {
      await setDoc(consultRef, { consult_data: [new_data] });
    }
  };

  /** 제출 혹은 개별자료 저장하는 함수 */
  const saveCheckList = async () => {
    // 제목 없으면 저장불가.
    let title = groupName?.trim();

    if (title?.length === 0) {
      Swal.fire("제목 없음!", "제목을 입력해주세요!", "warning");
      return;
    }

    let what;
    let new_data = {
      id: checkListData?.id || dayjs().format("YYYY-MM-DD HH:mm:ss"),
      title: groupName,
      yearGroup: nowYear(checkListData?.id?.slice(0, 10)),
    };
    if (menuFunc === "제출") {
      what = "checkLists";

      new_data.unSubmitStudents = unSubmitStudents;
    } else if (menuFunc === "개별") {
      what = "listMemo";

      // {name: num: memo: } 로 데이터 있는 학생 자료만 추가하기
      new_data.data = checkListData.data;
    }

    if (isSubject) {
      new_data.clName = checkListData?.clName || nowClassName;
    }

    const dataRef = doc(dbService, what, props.userUid);
    const dataDoc = await getDoc(dataRef);

    let new_datas = [];
    //기존 자료 있으면
    if (dataDoc.exists()) {
      //checkListData에 id가 있으면(기존자료), 수정. 없으면 추가해주기
      new_datas = [...dataDoc?.data()?.[what + "_data"]];
      if (checkListData?.id?.length > 0) {
        new_datas = new_datas?.map((dt) => {
          let new_dt = dt;
          if (dt.id === checkListData?.id) {
            new_dt = new_data;
          }
          return new_dt;
        });
      } else {
        new_datas.push(new_data);
      }

      // 기존 자료 없으면
    } else {
      new_datas.push(new_data);
    }

    // console.log({
    //   [what + "_data"]: new_datas,
    // });

    //저장하고 나서, checkListData에 세팅해주기! (저장하고 나면 기존자료로 세팅되어야함.)
    await setDoc(dataRef, {
      [what + "_data"]: new_datas,
    }).then(() => {
      setCheckListData(new_data);
      Swal.fire("저장완료!", "자료가 저장되었어요.", "success");
    });
  };

  /** 미제출 제출 한번에 바꾸는 함수 */
  const changeSubmitHandler = () => {
    let new_unSubmitStudents = [...filteredStudents]?.filter((stu) => {
      return !unSubmitStudents.some(
        (st) => st.name === stu.name && st.num === stu.num
      );
    });
    setUnSubmitStudents(new_unSubmitStudents);
  };

  /** 제출ox에서 취소하는 함수. */
  const checkListCancleHandler = () => {
    Swal.fire({
      title: "자료 입력 취소",
      html: `자료 입력을 취소하고 돌아갈까요? <br/><b>** 현재 입력하던 자료는 저장되지 않습니다!!/<b>`,
      showDenyButton: true,
      confirmButtonText: "입력취소",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `계속하기`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setMenuFunc("");
        setUnSubmitStudents([...filteredStudents]);
        setCheckListData(null);
        setAddOrLoad("");
        setGroupName("");
      }
    });
  };

  /** textarea 값변화하면 실행될 함수. */
  const getValueHandler = (e, name) => {
    let stData = filteredStudents?.filter((stObj) => stObj.name === name)?.[0];

    let new_checkListData = { ...checkListData };
    let new_data = new_checkListData?.data || [];
    if (new_data?.length > 0) {
      new_data = new_data?.filter(
        (dt) => dt.name !== name && dt.memo?.trim()?.length > 0
      );
    }

    new_data.push({ num: stData.num, name: stData.name, memo: e.target.value });
    new_checkListData.data = new_data;

    setCheckListData(new_checkListData);
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

      {/* 학생 클릭하면... 출결 나오기! */}
      {clickedStd !== "" && menuFunc === "출결" && (
        <Attendance
          onClose={() => setClickedStd("")}
          who={clickedStd}
          date={new Date()}
          selectOption={attendanceOption}
          userUid={props.userUid}
          isSubject={isSubject}
          about="attendance"
        />
      )}

      {/* 학생 클릭하면... 상담 나오기! */}
      {clickedStd !== "" && menuFunc === "상담" && (
        <Attendance
          onClose={() => setClickedStd("")}
          who={clickedStd}
          students={filteringStds()}
          date={new Date()}
          selectOption={consultingOption}
          addData={addDataHandler}
          about="consulting"
          userUid={props.userUid}
          isSubject={true}
        />
      )}

      {/* 제출 혹은 개별기록 불러오기면.. 모달로 선택하는 부분, */}
      {(menuFunc === "제출" || menuFunc === "개별") && addOrLoad === "load" && (
        <Modal onClose={() => setAddOrLoad("")}>
          <span onClick={() => setAddOrLoad("")} className={classes.xmark}>
            <i className="fa-regular fa-circle-xmark"></i>
          </span>
          {/* 타이틀 부분 */}
          <div className={classes["flex-cen"]}>
            <div className={classes["title"]}>
              {menuFunc === "제출" ? "제출ox" : "개별기록"} 목록
            </div>
            <div className={classes["title-sub"]}>
              *{" "}
              {menuFunc === "제출"
                ? "[생기부]-[제출ox]"
                : "[생기부]-[개별기록]"}
              에 저장된 자료목록
            </div>
          </div>

          {/* 가로줄 */}
          <hr style={{ margin: "20px 15px" }} />

          {/* 자리표 목록 보여주기 */}
          <ul className={classes["seat-ul"]}>
            {checkListDataAll?.map((list, ind) => (
              <li
                key={ind}
                className={classes["seat-li"]}
                onClick={() => {
                  //   현재 데이터 설정하고, add화면으로!
                  setCheckListData(list);
                  setAddOrLoad("add");
                }}
              >
                <div className={classes["seat-id"]}>{list.id.slice(0, 10)}</div>
                <div className={classes["seat-title"]}>{list.title}</div>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {/* 오른쪽 메뉴 디브.. 출결 제출 등... 기능버튼 모음 */}
      {nowDatas?.id &&
        groupMakingStep === MAKE_STEP[0] &&
        settingWhat === "" && (
          <div
            className={
              menuRight ? classes["menu-div"] : classes["menu-top-div"]
            }
            ref={menuRef}
            style={
              (menuFunc === "제출" || menuFunc === "개별") &&
              addOrLoad === "add"
                ? { opacity: 0 }
                : { opacity: 1 }
            }
          >
            {menuFunc === "" ? (
              <>
                <Button
                  name="&nbsp; 출결"
                  className={"groupPage-btn"}
                  icon={
                    <i
                      className="fa-regular fa-calendar-days"
                      aria-hidden="true"
                    ></i>
                  }
                  onclick={() => {
                    setMenuFunc("출결");
                  }}
                />
                <Button
                  name="&nbsp; 제출"
                  className={"groupPage-btn"}
                  icon={
                    <i
                      className="fa-regular fa-square-check"
                      aria-hidden="true"
                    ></i>
                  }
                  onclick={() => {
                    setMenuFunc("제출");
                  }}
                />
                <Button
                  name="&nbsp; 개별"
                  className={"groupPage-btn"}
                  icon={
                    <i
                      className="fa-solid fa-clipboard-check"
                      aria-hidden="true"
                    ></i>
                  }
                  onclick={() => {
                    setMenuFunc("개별");
                  }}
                />
                <Button
                  name="&nbsp; 상담"
                  className={"groupPage-btn"}
                  icon={
                    <i
                      className="fa-regular fa-comments"
                      aria-hidden="true"
                    ></i>
                  }
                  onclick={() => {
                    setMenuFunc("상담");
                  }}
                />

                {/* 메뉴 기능 중에 하나가 선택된 상태면 */}
              </>
            ) : (
              <>
                {/* 제출이나 개별기록의 경우, 저장버튼 만들어주기 */}
                {(menuFunc === "제출" || menuFunc === "개별") &&
                  addOrLoad === "" && (
                    <>
                      <Button
                        name="new+"
                        title="자료 추가하기"
                        className={"groupPage-btn"}
                        onclick={() => setAddOrLoad("add")}
                      />
                      <Button
                        name="&nbsp; 열기"
                        title="자료 가져오기"
                        icon={<i className="fa-regular fa-folder-open"></i>}
                        className={"groupPage-btn"}
                        onclick={() => setAddOrLoad("load")}
                      />
                    </>
                  )}
                <Button
                  name="&nbsp; 취소"
                  className={"groupPage-btn"}
                  icon={<i className="fa-regular fa-circle-xmark"></i>}
                  onclick={() => {
                    setMenuFunc("");
                    setAddOrLoad("");
                  }}
                />
              </>
            )}
          </div>
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
              className={classes["newList-div"]}
            >
              {/* 새로만들기 */}

              <Button
                title="새로만들기"
                icon={<i className="fa-regular fa-plus"></i>}
                onclick={() => {
                  setSettingWhat("");
                  setNewFrom("allNew");
                }}
                className={"groupPage-btn"}
              />
              {/* 목록보기 */}
              <Button
                title="기존목록"
                icon={<i className="fa-regular fa-folder-open"></i>}
                onclick={() => {
                  setNewFrom("");
                  setSettingWhat("");
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
              className={classes["newList-div"]}
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
                    from &nbsp;<i className="fa-sharp fa-solid fa-chair"></i>
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
          {groupMakingStep === MAKE_STEP[0] && menuFunc === "" && (
            <div
              className={classes["header-title"]}
              style={window.innerWidth < 1400 ? { marginTop: "70px" } : {}}
            >
              <span className={classes["title-span"]}>
                {nowDatas?.id?.slice(0, 10)}
              </span>
              {nowDatas?.title}
            </div>
          )}

          {groupMakingStep === MAKE_STEP[0] && menuFunc === "출결" && (
            <>
              <div
                className={classes["header-title"]}
                style={window.innerWidth < 1400 ? { marginTop: "70px" } : {}}
              >
                출결자료 등록하기
              </div>
              <div>* 자료를 등록할 학생을 클릭해주세요.</div>
            </>
          )}

          {groupMakingStep === MAKE_STEP[0] &&
            (menuFunc === "제출" || menuFunc === "개별") && (
              <>
                <div
                  className={classes["header-title"]}
                  style={window.innerWidth < 1400 ? { marginTop: "70px" } : {}}
                >
                  {menuFunc === "제출"
                    ? "제출ox 등록하기"
                    : "개별기록 등록하기"}
                </div>
                {addOrLoad !== "" && (
                  <div className={classes["header-center"]}>
                    {/* 제출 add상태, 즉 새로운 자료 혹은 수정상황이면..  */}
                    {menuFunc === "제출" && (
                      <Button
                        title={"미제출 <=> 제출"}
                        icon={<MdOutlinePublishedWithChanges />}
                        className={"groupPage-btn"}
                        onclick={changeSubmitHandler}
                      />
                    )}

                    <input
                      type="text"
                      placeholder="제목"
                      id={"title-input"}
                      value={groupName || ""}
                      onChange={(e) => setGroupName(e.target.value)}
                      className={classes["groupName-input"]}
                    />
                    <Button
                      name={window.innerWidth < 1100 ? "" : <>&nbsp; 저장</>}
                      icon={<i className="fa-regular fa-floppy-disk"></i>}
                      className={"groupPage-btn"}
                      onclick={saveCheckList}
                    />
                    <Button
                      name={window.innerWidth < 1100 ? "" : <>&nbsp; 취소</>}
                      className={"groupPage-btn"}
                      icon={<i className="fa-regular fa-circle-xmark"></i>}
                      onclick={() => {
                        checkListCancleHandler();
                      }}
                    />
                  </div>
                )}
                {addOrLoad === "add" && menuFunc === "제출" && (
                  <div className={classes["header-center"]}>
                    미제출 ({unSubmitStudents?.length})
                  </div>
                )}
              </>
            )}

          {groupMakingStep === MAKE_STEP[0] && menuFunc === "상담" && (
            <>
              <div
                className={classes["header-title"]}
                style={window.innerWidth < 1400 ? { marginTop: "70px" } : {}}
              >
                상담자료 등록하기
              </div>
              <div>* 자료를 등록할 학생을 클릭해주세요.</div>
            </>
          )}

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
                {groupInfo?.length === 0 && (
                  <div>
                    * 모둠없이 사용하시려면{" "}
                    <i className="fa-regular fa-floppy-disk"></i> 클릭
                  </div>
                )}
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
                      if (now === 3) {
                        setGroupName("");
                      }
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
                    title="설정보기"
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
                    name={
                      <>
                        <IoPersonSharp size={14} />

                        <FaExchangeAlt size={10} />
                        <IoPersonSharp size={14} />
                      </>
                    }
                    title="학생 자리변경"
                    onclick={() => {
                      setSettingWhat("자리변경");
                      setGroupMakingStep(MAKE_STEP[2]);
                    }}
                    className={"groupPage-btn"}
                  />
                  <Button
                    name={"group"}
                    icon={<FaRegEdit />}
                    title="모둠명 변경"
                    onclick={() => {
                      setSettingWhat("모둠명변경");
                      setGroupMakingStep(MAKE_STEP[3]);
                    }}
                    className={"groupPage-btn"}
                  />
                  <Button
                    icon={<ImMakeGroup />}
                    title="모둠자리 수정"
                    onclick={() => {
                      setSettingWhat("모둠수정");
                      setGroupMakingStep(MAKE_STEP[4]);
                    }}
                    className={"groupPage-btn"}
                  />
                  <Button
                    name={"score"}
                    icon={<VscDebugRestart />}
                    title="모둠점수 초기화"
                    onclick={() => {
                      grPointsZero();
                    }}
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
              {(settingWhat === "자리변경" ||
                settingWhat === "모둠수정" ||
                settingWhat === "모둠명변경") && (
                <motion.div
                  initial="_downY"
                  animate="originXY"
                  transition="dur5"
                  variants={MOTION_VAR}
                  className={classes["newList-div"]}
                >
                  <Button
                    name={<i className="fa-regular fa-floppy-disk"></i>}
                    title="저장"
                    onclick={() => {
                      setSettingWhat("");
                      setGroupMakingStep(MAKE_STEP[0]);
                      //   saveGroupSettingHandler();
                    }}
                    className={"groupPage-btn"}
                  />
                  <Button
                    name={<i className="fa-regular fa-circle-xmark"></i>}
                    title="취소"
                    onclick={() => {
                      setSettingWhat("");
                      setGroupMakingStep(MAKE_STEP[0]);
                    }}
                    className={"groupPage-btn"}
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

            {groupInfo?.length > 0 && <div>* 모둠 이름을 클릭하면 삭제!</div>}
          </>
        )}

        {/* 학생 배정단계면.. 클릭하면 index저장해두고, 학생 지정가능하도록. */}
        {groupMakingStep === MAKE_STEP[4] && (
          <div>
            {groupInfo?.map((gInfo, ind) => (
              <span key={ind}>
                <Button
                  name={gInfo.groupName}
                  onclick={() => {
                    if (selectedGrInd === ind) {
                      setSelectedGrInd("");
                    } else {
                      setSelectedGrInd(ind);
                    }
                  }}
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
                menuFunc !== "제출"
                  ? groupIndex?.[ind] !== ""
                    ? {
                        backgroundColor:
                          groupInfo?.[groupIndex?.[ind]]?.color ||
                          GROUP_BGCOLOR[groupIndex?.[ind]],
                      }
                    : {}
                  : //   제출이고 add(자료 입력 / 수정) 상태면...
                  addOrLoad === "add" &&
                    unSubmitStudents?.filter((st) => st.name === std)?.length >
                      0
                  ? { backgroundColor: "whitesmoke" }
                  : {
                      backgroundColor:
                        groupInfo?.[groupIndex?.[ind]]?.color ||
                        GROUP_BGCOLOR[groupIndex?.[ind]],
                    }
              }
              onClick={() => stdClickHandler(std, ind)}
              onMouseEnter={() => handleMouseEnter("item", ind)}
              onMouseLeave={handleMouseLeave}
            >
              {/* 자료가 완성된 상태고, 호버할때만 보일... 꿀당+,-  하트 +,- */}
              {nowDatas?.title?.length > 0 &&
                hoveredIndex === String("item" + ind) &&
                settingWhat !== "자리변경" &&
                settingWhat !== "모둠수정" &&
                menuFunc === "" && (
                  <>
                    <div
                      className={classes["plus"]}
                      onClick={() => grPointsHandler("heart-plus", ind)}
                    >
                      <i className="fa-solid fa-heart-circle-plus"></i>
                    </div>
                    <div
                      className={classes["minus"]}
                      onClick={() => grPointsHandler("heart-minus", ind)}
                    >
                      <i className="fa-solid fa-heart-circle-minus"></i>
                    </div>
                  </>
                )}

              {/* 개인점수, 랭킹이 높으면 보여주기 */}
              {nowDatas?.title?.length > 0 &&
                hoveredIndex !== String("item" + ind) &&
                menuFunc === "" && (
                  <>
                    <div className={classes["std-point"]}>
                      {stdPoints[ind]}
                      <i
                        className="fa-solid fa-heart fa-sm"
                        style={{
                          color: "#d90f30",
                          filter: "drop-shadow(2px 1px 1px rgba(46, 0, 0, 1))",
                          marginLeft: "3px",
                        }}
                      ></i>
                    </div>

                    {/* 개인랭킹과 왕관 */}

                    {stdRank1to5(ind)}
                  </>
                )}

              {/* 캐릭터 */}
              {/*  학생 이름 */}
              <div
                className={
                  menuFunc === "개별" && addOrLoad === "add"
                    ? classes["listStyle-item"]
                    : ""
                }
              >
                {CHARACTERS[ind + randNum]}
                {std}
              </div>

              {/* 개별기록 입력일때만 보이는, textarea 태그 */}
              {menuFunc === "개별" && addOrLoad === "add" && (
                <Input
                  id={"textarea" + std}
                  myKey={"textarea" + std}
                  className={"memo-section"}
                  label="inputData"
                  input={{
                    type: "textarea",
                  }}
                  getValue={true}
                  getValueHandler={(e) => getValueHandler(e, std)}
                  defaultValue={
                    // //자료가 있으면 length가 undefined가 나오고 없으면 0이 나옴. 자료 있을 때만 저장되어 있던거 보여주기
                    checkListData?.data?.filter(
                      (data) => data.name === std
                    )?.[0]?.memo || ""
                  }
                  startheight={"25px"}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {/* 모둠 점수 보여주기 */}
      {groupInfo?.length !== 0 && (
        <div className={classes["points-div"]}>
          <div className={classes["points-group"]}>
            <GiHoneypot
              size={60}
              color="#e8c909"
              style={{ filter: "drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))" }}
            />
            {groupInfo?.map((gr, gr_ind) => (
              <div
                key={gr_ind}
                className={classes["gr-div"]}
                style={{
                  backgroundColor: gr?.color || GROUP_BGCOLOR[gr_ind],
                }}
                onMouseEnter={() => handleMouseEnter("group", gr_ind)}
                onMouseLeave={handleMouseLeave}
              >
                {hoveredIndex === String("group" + gr_ind) && (
                  <>
                    {/* 점수 +, - 버튼 */}

                    <div
                      className={classes["plus"]}
                      onClick={() => grPointsHandler("honey-plus", gr_ind)}
                    >
                      +
                    </div>
                    <div
                      className={classes["minus"]}
                      onClick={() => grPointsHandler("honey-minus", gr_ind)}
                    >
                      -
                    </div>
                  </>
                )}
                {/* 왕관.. 1,2,3 */}
                {gr?.groupName} : {gr?.grPoints}
              </div>
            ))}
            <GiHoneypot
              size={60}
              color="#e8c909"
              style={{ filter: "drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupPage;
