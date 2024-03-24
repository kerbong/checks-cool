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

import { PiDogFill } from "react-icons/pi";
import { FaExchangeAlt, FaRegPlusSquare } from "react-icons/fa";
import {
  FaChair,
  FaChevronLeft,
  FaChevronRight,
  FaClipboardCheck,
  FaCrown,
  FaGear,
  FaGift,
  FaHeart,
  FaHeartCircleMinus,
  FaHeartCirclePlus,
  FaHouse,
  FaPlus,
  FaRegCalendarDays,
  FaRegCircleXmark,
  FaRegComments,
  FaRegFloppyDisk,
  FaRegFolderOpen,
  FaRegSquareCheck,
  FaShuffle,
  FaUser,
  FaUsersRectangle,
  FaXmark,
} from "react-icons/fa6";
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

const importAll = (r) => r.keys().map(r);
const CHARACTERS = Array.from(
  new Set(
    importAll(
      require.context(
        "../../assets/characters",
        false,
        /^((?!@2x|@3x).)*\.png$/
      )
    )
  )
);

const IMAGES = [
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
  const [showWindow, setShowWindow] = useState(false);
  const [giftItem, setGiftItem] = useState("");
  const [gifts, setGifts] = useState([]);
  const [giftName, setGiftName] = useState("");
  const [giftScore, setGiftScore] = useState(1);
  const [giftClass, setGiftClass] = useState("");
  const [randomPick, setRandomPick] = useState("");
  // 뽑힌 학생의 인덱스
  const [selectedStudent, setSelectedStudent] = useState(null);
  // 학생 뽑기 시작 상태를 관리하는 state
  const [isDrawing, setIsDrawing] = useState("");
  // 발표한 학생들 인덱스 모아두는 배열
  const [doneStds, setDoneStds] = useState([]);
  const [nowSelected, setNowSelected] = useState("");
  //개별 점수 한번에 주는 학생 인덱스 모아두는 배열
  const [clickedStds, setClickedStds] = useState([]);

  const autoSaveGroupDatas = useRef(null);
  const selectRef = useRef();
  const menuRef = useRef();
  const timerId = useRef(null); // useRef를 사용하여 타이머 ID 저장
  const delayCount = useRef(0);
  // 뽑혔던 학생들 저장하는 배열
  const selectedStds = useRef([]);

  /**모둠뽑기 부분 로직! */
  const groupPickHandler = (groupOrPerson) => {
    // 모둠뽑기인데 모둠 설정 없으면
    if (groupOrPerson === "group" && groupInfo?.length === 0) {
      Swal.fire(
        "모둠없음!",
        "설정된 모둠이 없어서 모둠 뽑기가 불가능해요! 먼저 화면 우측 상단의 설정 버튼을 눌러서 모둠을 생성해주세요."
      );
      return;
      // 존재하는 뽑기 결과가 있으면
    } else if (selectedStds?.current?.length > 0) {
      Swal.fire({
        title: "뽑기 결과 초기화",
        html: `기존에 존재하던 뽑기 결과를 초기화 하고 새로 뽑기를 시작할까요?<br/> <b>** 되돌리기 불가능!!</b>`,
        showDenyButton: true,
        confirmButtonText: "초기화",
        confirmButtonColor: "#db100cf2",
        denyButtonColor: "#85bd82",
        denyButtonText: `취소`,
        icon: "warning",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          selectedStds.current = [];
          setDoneStds([]);
          setSelectedStudent(null);
          clearTimeout(timerId.current);

          setRandomPick(groupOrPerson);
        }
      });
      //새로시작하면...
    } else {
      clearTimeout(timerId.current);
      setRandomPick(groupOrPerson);
    }
  };

  const doneStdsHandler = (ind) => {
    //있던거면 지워주기
    if (doneStds?.includes(ind)) {
      setDoneStds((prev) => prev?.filter((stdInd) => stdInd !== ind));

      // 없던거면 추가하기
    } else {
      setDoneStds((prev) => [...prev, ind]);
    }
  };

  // 학생 뽑기 버튼(한번에 한명만) 클릭 핸들러
  const handleDrawStudent = (isOneAll) => {
    // 모둠뽑기인데 모둠 설정 없으면
    if (randomPick === "group" && groupInfo?.length === 0) {
      Swal.fire(
        "모둠없음!",
        "설정된 모둠이 없어서 모둠 뽑기가 불가능해요! 먼저 화면 우측 상단의 설정 버튼을 눌러서 모둠을 생성해주세요."
      );
      return;
      // 존재하는 뽑기 결과가 있으면
    }
    setIsDrawing(isOneAll);
  };

  function selectStudent(isOneAll) {
    if (isDrawing === "") return;

    // 빈자리를 제외한  stdLength와 뽑힌 학생의 length가 같으면 실행취소!
    let stdLength =
      randomPick === "person"
        ? nowDatas?.students?.filter((std) => isNaN(+std))?.length
        : groupInfo?.length;

    if (stdLength <= selectedStds.current?.length) {
      delayCount.current = 0; // delayCount 리셋
      clearTimeout(timerId.current);
      setIsDrawing("");
      return;
    }

    let randomIndex =
      randomPick === "person"
        ? Math.floor(Math.random() * nowDatas?.students.length)
        : Math.floor(Math.random() * groupInfo?.length);
    // 학생자리가 숫자면... 다시뽑기! + 이미 뽑혔던 학생이면... 다시뽑기!

    if (randomPick === "person") {
      // 다시뽑는 로직.
      while (
        !isNaN(+nowDatas?.students?.[randomIndex]) ||
        selectedStds.current.includes(randomIndex)
      ) {
        randomIndex = Math.floor(Math.random() * nowDatas.students.length);
      }
    } else {
      while (selectedStds.current.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * groupInfo?.length);
      }
    }

    setSelectedStudent(randomIndex);

    let delay = 200 + delayCount.current * 80; // delayCount의 현재 값을 사용
    delayCount.current += 1; // delayCount 값을 업데이트

    let stdGroupLength = isOneAll === "one" ? 12 : 5;

    if (delayCount.current >= stdGroupLength) {
      if (isOneAll === "one") {
        // 학생 뽑혔음!!
        delayCount.current = 0; // delayCount 리셋
        clearTimeout(timerId.current);
        setIsDrawing("");
        //뽑힌 학생들 인덱스에 추가
        selectedStds.current = [...selectedStds.current, randomIndex];
        setNowSelected(randomPick);

        let stdName;
        if (randomPick === "person") {
          stdName = nowDatas?.students?.[randomIndex];
        } else if (!groupInfo?.[randomIndex]?.groupName?.includes("모둠")) {
          stdName = groupInfo?.[randomIndex]?.groupName + "모둠";
        } else {
          stdName = groupInfo?.[randomIndex]?.groupName;
        }

        Swal.fire({
          title: `${stdName} 당첨!!`,
          html:
            randomPick === "person"
              ? `<img src="${
                  characters?.filter((st) => st?.name === stdName)?.[0]?.url ||
                  CHARACTERS[0]
                }" alt="" class="${classes["swal-image"]}"/>`
              : "🎉✨🎊",
          showDenyButton: false,
          confirmButtonText: "확인",
        });

        //다 뽑기상태면 all
      } else {
        //전체 뽑기면.. 뽑힌 학생들 인덱스에 추가하고 다시 초기화해서 시작하기
        //뽑힌 학생들 인덱스에 추가
        selectedStds.current = [...selectedStds.current, randomIndex];
        setNowSelected(randomPick);
        delayCount.current = 0; // delayCount 리셋
        clearTimeout(timerId.current);
        timerId.current = setTimeout(() => selectStudent(isOneAll), delay);
      }
    } else {
      timerId.current = setTimeout(() => selectStudent(isOneAll), delay);
    }
  }

  useEffect(() => {
    if (isDrawing === "") return;

    selectStudent(isDrawing);

    // 컴포넌트 unmount 시에 타이머를 clear한다.
    return () => clearTimeout(timerId.current);
  }, [isDrawing]);

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
      icon: "warning",
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
        gifts: gifts,
      });

      // 자료 저장되었음을 알려주는... 클릭필요없는 검은색 반투명의 작은 모달 띄워주기
      setShowWindow(true);
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
    console.log(stdPoints);
    console.log(groupIndex);

    if (!nowDatas?.id || groupDatas?.length === 0) return;

    // 이전에 예약된 저장 작업이 있다면 취소
    if (autoSaveGroupDatas.current) {
      clearTimeout(autoSaveGroupDatas.current);
    }

    // 새로운 저장 작업 예약
    autoSaveGroupDatas.current = setTimeout(() => {
      autoSaveGroupDatas.current = null; // 저장 작업 예약 해제
      autoSave();
    }, 3200);

    // 컴포넌트가 언마운트되거나 의존성이 변경되면 저장 작업 예약 취소
    return () => {
      if (autoSaveGroupDatas.current) {
        clearTimeout(autoSaveGroupDatas.current);
      }
    };
  }, [groupIndex, groupInfo, stdPoints, nowDatas, characters]);

  useEffect(() => {
    if (tableRow === "" || tableColumn === "") return;

    let allDiv = document.getElementById("seats-div");

    allDiv.style.setProperty("--columns", tableColumn);

    allDiv.style.setProperty("--rows", tableRow);
  }, [tableRow, tableColumn]);

  useEffect(() => {
    let pointDiv = document.getElementById("points-group");
    if (groupInfo?.length === 0) return;
    let group_num = groupInfo?.length;
    pointDiv.style.setProperty("--groupColumns", group_num);
  }, [groupInfo]);

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
          //숫자인경우... 배경색 기본값으로
          if (!isNaN(+name)) {
            document.getElementById(name).style.backgroundColor = "#e1e1e1";
            //학생인 경우 배경색 원래대로
          } else {
            let bg_color =
              groupInfo?.[groupIndex?.[stdInd]]?.color ||
              GROUP_BGCOLOR[groupIndex?.[stdInd]];
            document.getElementById(name).style.backgroundColor = bg_color;
          }
        }

        //없던 학생이름이면.. 자리 바꾸고 비우기
      } else {
        // 클릭이 둘다 숫자(빈자리) 였으면 그냥 비워주고 끝내기
        if (!isNaN(+changeStd) && !isNaN(+name)) {
          // 자리색 다시.. 원래대로
          document.getElementById(name).style.backgroundColor = "#e1e1e1";
          document.getElementById(changeStd).style.backgroundColor = "#e1e1e1";

          setChangeStd("");

          return;
        }

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
          // 만약 둘 중 하나가 숫자(빈자리)면 그룹인덱스도 수정해줘야 함.
          if (!isNaN(+changeStd) || !isNaN(+name)) {
            let new_groupIndex = [];

            groupIndex?.forEach((gi, gi_ind) => {
              let new_gi = gi;
              if (gi_ind === nowStd_ind) {
                new_gi = groupIndex[changeStd_ind];
              } else if (gi_ind === changeStd_ind) {
                new_gi = groupIndex[nowStd_ind];
              }
              new_groupIndex.push(new_gi);
            });

            console.log(new_groupIndex);

            setGroupIndex(new_groupIndex);

            setChangeStd("");
            return;
          }
        }

        document.getElementById(name).style.backgroundColor = "#E9CBB7";

        setTimeout(() => {
          if (!isNaN(+name)) {
            changeStd_color = "#e1e1e1";
          }
          if (!isNaN(+changeStd)) {
            nowStd_color = "#e1e1e1";
          }
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
      //숫자로 된 빈자리면 작동 안함
      if (!isNaN(+name)) return;
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
      //숫자로 된 빈자리면 작동 안함
      if (!isNaN(+name)) return;
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
      // 현재 아무것도 아닌 상태일때, 학생클릭하면.. 개인점수 한 번에 주기 버튼 생김!
    } else {
      // 만약 클릭된 자리가.. 그냥 빈자리 숫자면 작동하지 않도록!!
      if (!isNaN(+name)) return;

      if (clickedStds?.includes(+stdInd)) {
        setClickedStds((prev) => prev?.filter((p) => p !== +stdInd));
      } else {
        setClickedStds((prev) => [...prev, +stdInd]);
      }
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
    let data_id = nowDatas?.id?.slice(0, 10);
    let now_isSubject = changeSubjectHandler(nowYear(data_id));
    setIsSubject(now_isSubject);

    if (now_isSubject && nowDatas?.clName) {
      setNowClassName(nowDatas?.clName);
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

        setGifts([...doc?.data()?.gifts]);
      });
    }
  };

  //모둠화면 데이터 받아오기
  useEffect(() => {
    getGroupModeDatas();
  }, [props.userUid]);

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
  }, [showSeatsList, props.userUid]);

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

    // 추가하는 거면 중복이름인지 확인하고 추가하기
    if (selectedGrInd?.length === 0) {
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
          "모둠이름이 이미 존재하네요! 이름을 확인해주세요.",
          "warning"
        );
        return;
      }

      new_groupInfo.push(new_g);

      setGroupInfo(new_groupInfo);

      //수정이면(selectedGrInd 있으면) 해당 인덱스 그룹의 이름만 바꿔서 저장하기
    } else {
      let new_groupInfo = [...groupInfo];
      new_groupInfo[selectedGrInd].groupName = groupName;
      setGroupInfo(new_groupInfo);
    }

    setSelectedGrInd("");

    // 인풋창의 모둠이름 value 삭제
    setGroupName("");
  };

  /** 그룹 제거하기 */
  const delGroupInfo = (e, index) => {
    e.preventDefault();
    if (selectedGrInd?.length === 0) return;
    // 만약 그룹인덱스 배열에 해당 그룹의 인덱스가 존재하면... 삭제해주기
    Swal.fire({
      title: "모둠을 삭제할까요?",
      html: `선택된 모둠을 삭제할까요?<br/>해당모둠과 관련 모든 정보가 삭제됩니다.<br/><br/><b>** 되돌리기 불가능!!</b>`,
      showDenyButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
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

        setGroupName("");
        setSelectedGrInd("");
      }
    });
  };

  /** 그룹데이터 최종 저장. groupMode에 저장. */
  const saveGroupDatas = () => {
    //이거 제목이랑 같이 사용하는 state라.. 미리 빈칸으로 만들어주고, 모둠화면 데이터 제목으로 재사용..
    setGroupName("");
    //아예 모둠이 없으면.. 바로 저장하기

    if (groupInfo?.length === 0) {
      Swal.fire({
        title: "모둠설정 없이 저장",
        html: `모둠설정 없이 저장하여 사용하시겠어요? (모둠 보상 기능 사용불가! 저장하신 후에 화면 우측 상단의 기어 버튼으로 설정 가능)`,
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
      groupIndex?.filter(
        (gi, gi_ind) => gi === "" && isNaN(nowDatas?.students?.[gi_ind])
      )?.length !== 0
    ) {
      // 만약 모둠은 있는데, 모둠설정이 ""인, 모둠설정이 안된 학생이 있으면 swal알림
      // 만약 숫자만 있으면.. 모둠 설정 안되어도 됨.

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
      "모둠화면에 등록된 자료가 없어요!  [+] 클릭 후 [new+]  or [from의자] 로 자료를 만들어주세요.",
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
      gifts: gifts,
    }).then(() => {
      setNowDatas(new_groupData);
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

    //전체 자리를 기준으로..  남는 자리가 있으면 해당 자리를 숫자로 채워주기
    let wholeSeats = +tableRow * +tableColumn;
    now_students = Array.from({ length: wholeSeats }, (v, i) => {
      let new_std = +i + 1;
      if (now_students?.[i] !== undefined) {
        new_std = now_students?.[i];
      }
      return new_std;
    });

    // console.log(now_students);

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
    if (what === "heart-minus-stds") {
      let new_stdPoints = [...stdPoints];
      clickedStds?.forEach((cl_std_ind) => {
        // let std_point = new_stdPoints[cl_std_ind];
        // if (std_point > 0) {
        new_stdPoints[cl_std_ind] -= 1;
        // }
      });
      setStdPoints(new_stdPoints);
    } else if (what === "heart-plus-stds") {
      let new_stdPoints = [...stdPoints];
      clickedStds?.forEach((cl_std_ind) => {
        new_stdPoints[cl_std_ind] += 1;
      });
      setStdPoints(new_stdPoints);
    } else if (what === "honey-plus") {
      let new_groupInfo = [...groupInfo];
      new_groupInfo[std_ind].grPoints += 1;

      setGroupInfo(new_groupInfo);
    } else if (what === "honey-minus") {
      let new_groupInfo = [...groupInfo];

      // if (new_groupInfo[std_ind].grPoints > 0) {
      new_groupInfo[std_ind].grPoints -= 1;
      setGroupInfo(new_groupInfo);
      // }
    } else if (what === "heart-plus") {
      let new_stdPoints = [...stdPoints];
      new_stdPoints[std_ind] += 1;
      setStdPoints(new_stdPoints);
    } else if (what === "heart-minus") {
      let new_stdPoints = [...stdPoints];
      // let std_point = new_stdPoints[std_ind];
      // if (std_point > 0) {
      new_stdPoints[std_ind] -= 1;
      setStdPoints(new_stdPoints);
      // }
    }
  };

  /** 학생 개인 점수의 등수 1~5등까지 보여주기 */
  const stdRank1to5 = (st_ind, isGroup) => {
    let now_point = !isGroup ? stdPoints[st_ind] : groupInfo[st_ind]?.grPoints;

    // 점수가 0이면 안보이게
    if (now_point === 0) return;

    let sumGroup = !isGroup
      ? [...stdPoints]
      : [...groupInfo]?.map((gr) => gr.grPoints);

    const sum = sumGroup.reduce((acc, curr) => {
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

    const sortedArray = sumGroup.sort((a, b) => b - a); // 배열을 내림차순으로 정렬
    const targetIndex = sortedArray.indexOf(now_point); // 대상 값의 인덱스 찾기
    let rank = targetIndex + 1; // 인덱스를 등수로 변환하여 1을 더함

    let crown;

    if (rank === 1) {
      if (!isGroup) {
        crown = (
          <FaCrown
            size={35}
            color="#ffe300"
            className={classes["std-crown"]}
            style={{ top: "-31%", left: "1%" }}
          />
        );
      } else {
        crown = (
          <GiHoneypot
            size={!menuRight ? 72 : 65}
            color="#ffe300"
            className={classes["std-crown"]}
            style={
              !menuRight
                ? { top: "-84%", left: "20%" }
                : { top: "-60%", right: "-10%", left: "auto" }
            }
          />
        );
      }
    } else if (rank <= 5) {
      if (!isGroup) {
        crown = (
          <FaCrown size={25} color="#ffe300" className={classes["std-crown"]} />
        );
      } else {
        crown = (
          <GiHoneypot
            size={!menuRight ? 57 : 42}
            color="#e8c909"
            className={classes["std-crown"]}
            style={
              !menuRight
                ? { top: "-68%", left: "25%" }
                : { top: "-30%", left: "60%" }
            }
          />
        );
      }
    } else {
      if (!isGroup) {
        crown = (
          <FaCrown
            size={25}
            color="lightgray"
            className={classes["std-crown"]}
          />
        );
      } else {
        crown = (
          <GiHoneypot
            size={!menuRight ? 45 : 33}
            color="#e6e6e6"
            className={classes["std-crown"]}
            style={
              !menuRight
                ? { top: "-56%", left: "33%" }
                : { top: "-20%", left: "65%" }
            }
          />
        );
      }
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
          className={
            !isGroup
              ? classes["std-rank"]
              : !menuRight
              ? classes["gr-rank"]
              : classes["gr-rank-left"]
          }
          style={
            rank === 1
              ? !isGroup
                ? { fontSize: "16px" }
                : !menuRight
                ? { fontSize: "25px", top: "-36%" }
                : { fontSize: "25px", top: "-25%" }
              : {}
          }
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
      return a_date < b_date ? 1 : -1;
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
  }, [menuFunc, props.userUid]);

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
        setUnSubmitStudents([]);
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

  //저장되었음을 알리는 모달
  useEffect(() => {
    if (showWindow) {
      const timeoutId = setTimeout(() => {
        setShowWindow(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [showWindow]);

  /** 보상 목록에 수정하는 함수 */
  const saveGiftsHandler = async (new_datas) => {
    const groupRef = doc(dbService, "groupMode", props.userUid);

    await setDoc(groupRef, {
      groupDatas: groupDatas,
      characters: characters,
      gifts: new_datas,
    });
  };

  /** 모둠 개인보상 추가하는 함수 */
  const giftSubmitHandler = (e) => {
    e.preventDefault();

    if (giftClass === "" || giftName?.trim() === "" || giftScore === 0) {
      Swal.fire(
        "저장 실패!",
        "보상의 종류 | 보상의 이름 | 보상의 점수 3 가지를 모두 입력해주세요!",
        "warning"
      );
      return;
    }

    if (isNaN(+giftScore)) {
      Swal.fire("저장 실패!", "점수는 숫자만 입력이 가능합니다.", "warning");
      return;
    }

    // 마이너스는 불가능함..
    if (1 > +giftScore) {
      Swal.fire(
        "저장 실패!",
        "보상 점수(보상을 구입할 때 필요한 점수)는 +만 가능합니다.",
        "warning"
      );
      return;
    }

    let new_gift = {
      class: giftClass,
      name: giftName?.trim(),
      score: +giftScore,
    };

    let new_gifts = [...gifts];
    //이름과 분류가 같은 게 있으면 안됨.(선택된 보상이 없고)
    if (
      selectedGrInd === "" &&
      new_gifts?.length > 0 &&
      new_gifts?.filter(
        (g) => g.name === new_gift.name && g.class === new_gift.class
      )?.length > 0
    ) {
      Swal.fire(
        "저장 실패!",
        "보상의 종류와 이름 두 항목이 같은 데이터가 존재합니다!",
        "warning"
      );
      return;
      // 새로운 자료면 그냥 추가
    } else if (selectedGrInd === "") {
      new_gifts.push(new_gift);
      saveGiftsHandler(new_gifts);
      // 기존 자료 수정이면 인덱스 제외후 추가
    } else if (selectedGrInd !== "") {
      new_gifts.splice(+selectedGrInd, 1, new_gift);
      saveGiftsHandler(new_gifts);
      resetGift();
    }
  };

  /** 보상 목록 삭제하는 함수, 받아온 인덱스 목록 지워주기 */
  const delGiftHandler = (ind) => {
    let new_gifts = [...gifts];
    new_gifts = new_gifts?.filter((g, g_ind) => g_ind !== +ind);

    saveGiftsHandler(new_gifts);
    resetGift();
  };

  /** 선택취소, 삭제 후 보상을 원상태로 돌리는 함수 */
  const resetGift = () => {
    setSelectedGrInd("");
    setGiftName("");
    setGiftScore(1);
    setGiftClass("");
  };

  /** 점수로 보상 구입하는 함수! */
  const shoppingGift = (what, name, score) => {
    Swal.fire({
      title:
        what === "group"
          ? "모둠보상 구입!"
          : what === "person"
          ? "개인보상 구입!"
          : "캐릭터 변경!",
      html:
        what !== "character"
          ? `<b>[${name} 항목] 을 [${score}] 에</b> 구입할까요?<br/> <b>** 되돌리기 불가능!!</b>`
          : `<img  src="${name}" alt="" style="width: 80%" /> <br/><b>${nowDatas?.students?.[selectedGrInd]} 학생 캐릭터를 변경할까요?</b> `,
      showDenyButton: true,
      confirmButtonText: what !== "character" ? "구입" : "변경",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
      icon: what !== "character" ? "warning" : "",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // 모둠 보상 구입
        if (what === "group") {
          let new_groupInfo = [];
          groupInfo?.forEach((ginfo, ind) => {
            if (ind === +selectedGrInd) {
              new_groupInfo.push({
                ...ginfo,
                grPoints: ginfo.grPoints - score,
              });
            } else {
              new_groupInfo.push({ ...ginfo });
            }
          });
          setGroupInfo(new_groupInfo);

          // 개인 보상 구입
        } else if (what === "person") {
          let new_stdPoints = [...stdPoints];
          new_stdPoints[+selectedGrInd] =
            +new_stdPoints[+selectedGrInd] - score;

          setStdPoints(new_stdPoints);
          // 캐릭터 변경
        } else {
          let new_characters = [...characters];
          new_characters = new_characters?.map((stdChrac) => {
            let new_stdChrac = stdChrac;
            if (stdChrac.name === nowDatas?.students?.[selectedGrInd]) {
              new_stdChrac.url = name;
            }
            return new_stdChrac;
          });
          setCharacters(new_characters);
        }
      }
    });
  };

  /** 모든 캐릭터/뽑힌 학생 초기화 */
  const resetChOrStds = (chOrStd) => {
    Swal.fire({
      title:
        chOrStd === "ch"
          ? "캐릭터 초기화!"
          : randomPick === "preson"
          ? "뽑힌 학생 초기화!"
          : "뽑힌 모둠 초기화!",
      html: `${
        chOrStd === "ch"
          ? "모든 학생의 캐릭터를"
          : randomPick === "preson"
          ? "뽑힌 학생 목록을"
          : "뽑힌 모둠 목록을"
      } 초기화 합니다! <br/><b>초기화할까요?</b> `,
      showDenyButton: true,
      confirmButtonText: "초기화",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        if (chOrStd === "ch") {
          let new_characters = [...characters]?.map((stdChrac) => {
            return { ...stdChrac, url: "" };
          });
          setCharacters(new_characters);
        } else {
          selectedStds.current = [];
          setDoneStds([]);
          setSelectedStudent(null);
        }
      }
    });
  };

  const getChacterImgSrc = (std) => {
    let imgSrc = characters?.filter((crt) => crt?.name === std)?.[0]?.url;
    let nowLocation = window?.location?.href;
    //접속주소가 checks-cool이면, imgsrc에도 있어야 함.
    if (imgSrc?.length > 0) {
      //현재 접속은 checkscool인데, 저장된 주소가 checkscool이 아니면
      if (
        nowLocation?.includes("checks-cool") &&
        !imgSrc?.includes("checks-cool")
      ) {
        imgSrc = "/checks-cool" + imgSrc;

        // 현재 접속은 checkscool이 아닌데, 저장 주소가 checkscool이면
      } else if (
        !nowLocation?.includes("checks-cool") &&
        imgSrc?.includes("checks-cool")
      ) {
        imgSrc = imgSrc.split("checks-cool")?.[1];
      }
    } else {
      imgSrc = CHARACTERS[0];
    }

    return imgSrc;
  };

  const groupPointsHtml = () => {
    return (
      <div
        className={
          !menuRight ? classes["points-group"] : classes["menu-left-div"]
        }
        id="points-group"
      >
        {groupInfo?.map((gr, gr_ind) => (
          <motion.div
            initial="_downY"
            animate="originXY"
            transition="dur5"
            variants={MOTION_VAR}
            key={gr_ind}
            className={classes["gr-div"]}
            style={
              menuFunc === "뽑기" &&
              randomPick === "group" &&
              (gr_ind === selectedStudent ||
                selectedStds?.current?.includes(gr_ind))
                ? { backgroundColor: "yellow" }
                : {
                    backgroundColor: gr?.color || GROUP_BGCOLOR[gr_ind],
                  }
            }
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
            {/* 그룹랭킹과 왕관 */}
            {stdRank1to5(gr_ind, true)}
            {/* 모둠이름 : 점수*/}
            {gr?.groupName?.includes("모둠")
              ? gr?.groupName
              : gr?.groupName + "모둠"}{" "}
            : {gr?.grPoints}
          </motion.div>
        ))}
      </div>
    );
  };

  const clickAllStds = () => {
    let stds = [];
    nowDatas?.students?.forEach((st, st_ind) => {
      if (!isNaN(+st)) return;
      stds.push(st_ind);
    });
    //현재 모두 클릭중이면... 로직 멈춤.
    if (stds?.length === clickedStds?.length) return;
    //아니면 모두 선택해줌.
    setClickedStds(stds);
  };

  //  전체 html그리는 return 부분
  return (
    <div className={classes["div"]}>
      {/* 저장되었음을 알리는 modal */}
      {showWindow && (
        <motion.div
          initial="_downY"
          animate="originXY"
          transition="dur5"
          variants={MOTION_VAR}
          className={classes["window"]}
        >
          자료가 수정/저장되었어요!
        </motion.div>
      )}

      {/* 보상 설정하는 modal */}
      {giftItem === "setting" && (
        <Modal
          onClose={() => {
            setGiftItem("");
            resetGift();
          }}
        >
          <span
            onClick={() => {
              setGiftItem("");
              resetGift();
            }}
          >
            <FaRegCircleXmark className={classes.xmark} />
          </span>
          {/* 타이틀 부분 */}
          <div className={classes["flex-cen"]}>
            <div className={classes["title"]}>개인 / 모둠 보상 관리하기</div>
            <div className={classes["title-sub"]}>
              * 개인보상 &nbsp;
              <span
                className={`${classes["todoOption"]} ${classes["op1"]}`}
              ></span>{" "}
              &nbsp;&nbsp;&nbsp; 모둠보상 &nbsp;
              <span
                className={`${classes["todoOption"]} ${classes["op2"]}`}
              ></span>
            </div>
            <div className={classes["title-sub"]}>
              * 보상 클릭 시 "수정/삭제 가능"
            </div>
          </div>

          {/* 가로줄 */}
          <hr style={{ margin: "20px 15px" }} />

          {/* 보상 목록 보여주기 */}
          <div
            className={classes["seat-ul"]}
            style={{
              justifyContent: "center",
              width: "100%",
              alignItems: "baseline",
            }}
          >
            {/* 보상 추가하기 */}
            <form
              className={classes["flex-start-35"]}
              onSubmit={giftSubmitHandler}
              style={{ alignItems: "normal" }}
            >
              <div className={classes["seat-ul"]}>
                <Button
                  name={"개인보상"}
                  onclick={(e) => {
                    e.preventDefault();
                    setGiftClass("person");
                  }}
                  className={"groupPage-btn"}
                  style={
                    giftClass === "person"
                      ? { fontSize: "20px", fontWeight: "bold" }
                      : { backgroundColor: "#334a52a3" }
                  }
                />
                <Button
                  name={"모둠보상"}
                  onclick={(e) => {
                    e.preventDefault();
                    setGiftClass("group");
                  }}
                  className={"groupPage-btn"}
                  style={
                    giftClass === "group"
                      ? { fontSize: "20px", fontWeight: "bold" }
                      : { backgroundColor: "#334a52a3" }
                  }
                />
              </div>
              <div className={classes["giftAdd-div"]}>
                &nbsp;&nbsp;보상 이름
                <input
                  className={classes["groupName-input"]}
                  type="text"
                  value={giftName}
                  onChange={(e) => setGiftName(e.target.value)}
                  placeholder="보상 이름"
                  style={{
                    width: "70%",
                    maxWidth: "200px",
                  }}
                />
              </div>
              <div className={classes["giftAdd-div"]}>
                &nbsp;&nbsp;보상 획득점수
                <input
                  className={classes["groupName-input"]}
                  type="number"
                  min="1"
                  max="50"
                  step="1"
                  value={giftScore}
                  onChange={(e) => setGiftScore(e.target.value?.trim())}
                  style={{ width: "60px" }}
                />
              </div>

              <div className={classes["giftAdd-div"]}>
                {/* 보상 아이템 추가/수정 버튼 */}
                <Button
                  name={selectedGrInd === "" ? "추가" : "수정"}
                  onclick={giftSubmitHandler}
                  className={"groupPage-add"}
                />

                {/* 선택된 항목이 있을 때 보일 삭제 / 선택 취소 버튼 */}
                {selectedGrInd !== "" && (
                  <>
                    <Button
                      name={"삭제"}
                      onclick={() => {
                        delGiftHandler(selectedGrInd);
                      }}
                      className={"groupPage-add"}
                    />
                    <Button
                      name={"선택취소"}
                      onclick={() => {
                        resetGift();
                      }}
                      style={{ backgroundColor: "rgba(51, 74, 82, 0.64)" }}
                      className={"groupPage-add"}
                    />
                  </>
                )}
              </div>
            </form>

            <ul
              className={classes["seat-ul"]}
              style={{ width: "55%", paddingLeft: "0" }}
            >
              {gifts?.map((gift, ind) => (
                <li
                  key={ind}
                  className={classes["seat-li"]}
                  onClick={() => {
                    setSelectedGrInd(ind);
                    setGiftName(gift.name);
                    setGiftScore(gift.score);
                    setGiftClass(gift.class);
                  }}
                  style={
                    gift.class === "group"
                      ? {
                          backgroundColor: "#cebfd5",
                          width: "auto",
                          maxWidth: "145px",
                        }
                      : {
                          backgroundColor: "#d2e395",
                          width: "auto",
                          maxWidth: "145px",
                        }
                  }
                >
                  <div className={classes["seat-id"]}>
                    {gift.class === "group" ? "모둠" : "개인"}{" "}
                  </div>
                  <div className={classes["seat-title"]}>{gift.name}</div>
                  <div
                    className={classes["seat-ul"]}
                    style={{ fontSize: "15px" }}
                  >
                    {Array(gift.score)?.fill(
                      <span className={classes["gift-icon"]}>
                        {gift.class === "group" ? (
                          <GiHoneypot
                            size={25}
                            color="#ffe300"
                            style={{
                              filter:
                                "drop-shadow(2px 1px 1px rgba(46, 0, 0, 1))",
                            }}
                          />
                        ) : (
                          <FaHeart
                            color="#d90f30"
                            filter="drop-shadow(2px 1px 1px rgba(46, 0, 0, 1))"
                            marginLeft="3px"
                          />
                        )}
                      </span>
                    )}{" "}
                    ({gift.score})
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}

      {/* 그룹 보상 주는 modal */}
      {giftItem === "group" && (
        <Modal
          onClose={() => {
            setGiftItem("");
            resetGift();
          }}
        >
          <span
            onClick={() => {
              setGiftItem("");
              resetGift();
            }}
          >
            <FaRegCircleXmark className={classes.xmark} />
          </span>
          {/* 타이틀 부분 */}
          <div className={classes["flex-cen"]}>
            <div className={classes["title"]}>모둠점수로 쇼핑하기</div>

            <div className={classes["title-sub"]}>* 모둠 선택 => 보상 선택</div>
          </div>

          {/* 가로줄 */}
          <hr style={{ margin: "20px 15px" }} />

          {/*모둠목록   보상목록 */}
          <div
            className={classes["seat-ul"]}
            style={{
              justifyContent: "center",
              width: "100%",
              alignItems: "baseline",
            }}
          >
            {/* 모둠 목록 보여주기 */}
            <ul
              className={classes["seat-ul"]}
              style={{
                width: "36%",
                padding: "15px",
                justifyContent: "center",
              }}
            >
              <div className={classes["sec-title"]}>모둠목록</div>
              {groupInfo?.map((gr, gr_ind) => (
                <li
                  key={gr_ind}
                  className={classes["gr-list-div"]}
                  onClick={() => {
                    if (+selectedGrInd === +gr_ind) {
                      setSelectedGrInd("");
                    } else {
                      setSelectedGrInd(gr_ind);
                    }
                  }}
                  style={
                    +selectedGrInd === +gr_ind
                      ? {
                          backgroundColor: gr?.color || GROUP_BGCOLOR[gr_ind],
                          fontWeight: "bold",
                          fontSize: "20px",
                          padding: "18px 13px",
                          border: "solid",
                        }
                      : {
                          backgroundColor: gr?.color || GROUP_BGCOLOR[gr_ind],
                        }
                  }
                >
                  {gr?.groupName?.includes("모둠")
                    ? gr?.groupName
                    : gr?.groupName + "모둠"}{" "}
                  : {gr?.grPoints}
                </li>
              ))}{" "}
            </ul>

            {/* 모둠상품 목록만 보여주기 */}
            <ul
              className={classes["seat-ul"]}
              style={{
                width: "55%",
                paddingLeft: "0",
                justifyContent: "center",
              }}
            >
              <div className={classes["sec-title"]}>보상 목록</div>
              {gifts?.map((gift, ind) => {
                if (gift.class !== "group") return null;

                return (
                  <li
                    key={ind}
                    className={classes["seat-li"]}
                    onClick={() => {
                      if (selectedGrInd === "") {
                        Swal.fire(
                          "선택 불가!",
                          "먼저 모둠을 선택한 후에 보상을 선택해주세요!",
                          "warning"
                        );
                        return;
                      } else {
                        // 점수가 더 낮으면 구입불가
                        if (
                          +groupInfo?.[+selectedGrInd]?.grPoints < +gift.score
                        ) {
                          Swal.fire(
                            "점수 부족!",
                            "필요한 점수가 부족하여 보상을 구입할 수 없어요.",
                            "warning"
                          );
                          return;
                        } else {
                          shoppingGift("group", gift.name, gift.score);
                        }
                      }
                    }}
                    style={{
                      backgroundColor: "#cebfd5",
                      width: "auto",
                      maxWidth: "145px",
                    }}
                  >
                    <div className={classes["seat-title"]}>{gift.name}</div>
                    <div
                      className={classes["seat-ul"]}
                      style={{ fontSize: "15px" }}
                    >
                      {Array.from({ length: gift.score }, (_, index) => (
                        <span key={index} className={classes["gift-icon"]}>
                          <FaHeart
                            color="#d90f30"
                            filter="drop-shadow(2px 1px 1px rgba(46, 0, 0, 1))"
                            marginLeft="3px"
                          />
                        </span>
                      ))}{" "}
                      ({gift.score})
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Modal>
      )}

      {/* 개인 보상 주는 modal */}
      {giftItem === "person" && (
        <Modal
          onClose={() => {
            setGiftItem("");
            resetGift();
          }}
        >
          <span
            onClick={() => {
              setGiftItem("");
              resetGift();
            }}
          >
            <FaRegCircleXmark className={classes.xmark} />
          </span>
          {/* 타이틀 부분 */}
          <div className={classes["flex-cen"]}>
            <div className={classes["title"]}>개인점수로 쇼핑하기</div>

            <div className={classes["title-sub"]}>* 학생 선택 => 보상 선택</div>
          </div>

          {/* 가로줄 */}
          <hr style={{ margin: "20px 15px" }} />

          {/*학생목록   보상목록 */}
          <div
            className={classes["seat-ul"]}
            style={{
              justifyContent: "center",
              width: "100%",
              alignItems: "baseline",
            }}
          >
            {/* 학생 목록 보여주기 */}
            <ul
              className={classes["seat-ul"]}
              style={{
                width: "38%",
                padding: "15px",
                justifyContent: "center",
              }}
            >
              <div className={classes["sec-title"]}>학생목록</div>
              {nowDatas?.students?.map((std, st_ind) => {
                // 숫자면.. 빈자리면 안보여주기
                if (!isNaN(+std)) return null;

                return (
                  <li
                    key={st_ind}
                    className={classes["std-div"]}
                    onClick={() => {
                      if (selectedGrInd !== "" && +selectedGrInd === +st_ind) {
                        setSelectedGrInd("");
                      } else {
                        setSelectedGrInd(st_ind);
                      }
                    }}
                    style={
                      selectedGrInd !== "" && +selectedGrInd === +st_ind
                        ? {
                            backgroundColor: GROUP_BGCOLOR[4],
                            fontWeight: "bold",
                            fontSize: "18px",
                            border: "solid",
                          }
                        : {}
                    }
                  >
                    {std}({stdPoints?.[st_ind]})
                  </li>
                );
              })}{" "}
            </ul>

            {/* 개인상품 목록만 보여주기 */}
            <ul
              className={classes["seat-ul"]}
              style={{
                width: "55%",
                paddingLeft: "0",
                justifyContent: "center",
              }}
            >
              <div className={classes["sec-title"]}>보상 목록</div>
              {gifts?.map((gift, ind) => {
                if (gift.class === "group") return null;

                return (
                  <li
                    key={ind}
                    className={classes["seat-li"]}
                    onClick={() => {
                      if (selectedGrInd === "") {
                        Swal.fire(
                          "선택 불가!",
                          "먼저 학생을 선택한 후에 보상을 선택해주세요!",
                          "warning"
                        );
                        return;
                      } else {
                        // 점수가 더 낮으면 구입불가
                        if (+stdPoints?.[+selectedGrInd] < +gift.score) {
                          Swal.fire(
                            "점수 부족!",
                            "필요한 점수가 부족하여 보상을 구입할 수 없어요.",
                            "warning"
                          );
                          return;
                        } else {
                          shoppingGift("person", gift.name, gift.score);
                        }
                      }
                    }}
                    style={{
                      backgroundColor: "#d2e395",
                      width: "auto",
                      maxWidth: "145px",
                    }}
                  >
                    <div
                      className={classes["seat-title"]}
                      key={"giftName" + ind}
                    >
                      {gift.name}
                    </div>
                    <div
                      className={classes["seat-ul"]}
                      style={{ fontSize: "15px" }}
                    >
                      {Array(gift.score)?.fill(
                        <span className={classes["gift-icon"]}>
                          <FaHeart
                            color="#d90f30"
                            filter="drop-shadow(2px 1px 1px rgba(46, 0, 0, 1))"
                            marginLeft="3px"
                          />
                        </span>
                      )}{" "}
                      ({gift.score})
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Modal>
      )}

      {/* 캐릭터 변경하는 modal */}
      {giftItem === "characterChange" && (
        <Modal
          onClose={() => {
            setGiftItem("");
            resetGift();
          }}
        >
          <span
            onClick={() => {
              setGiftItem("");
              resetGift();
            }}
          >
            <FaRegCircleXmark className={classes.xmark} />
          </span>
          {/* 타이틀 부분 */}
          <div className={classes["flex-cen"]}>
            <div className={classes["title"]}>캐릭터 변경하기</div>

            <div className={classes["title-sub"]}>
              * 개인/모둠 보상으로 설정하여 캐릭터를 변경해보세요.
            </div>
            <div className={classes["title-sub"]}>
              * 학생 선택 => 캐릭터 선택
            </div>
          </div>

          {/* 가로줄 */}
          <hr style={{ margin: "20px 15px" }} />

          {/*학생목록   보상목록 */}
          <div
            className={classes["seat-ul"]}
            style={{
              justifyContent: "center",
              width: "100%",
              alignItems: "baseline",
            }}
          >
            {/* 학생 목록 보여주기 */}
            <ul
              className={classes["seat-ul"]}
              style={{
                width: "38%",
                padding: "15px",
                justifyContent: "center",
              }}
            >
              <div className={classes["sec-title"]}>학생목록</div>
              {nowDatas?.students?.map((std, st_ind) => {
                // 숫자면.. 빈자리면 안보여주기
                if (!isNaN(+std)) return null;

                return (
                  <li
                    key={st_ind}
                    className={classes["std-div"]}
                    onClick={() => {
                      if (selectedGrInd !== "" && +selectedGrInd === +st_ind) {
                        setSelectedGrInd("");
                      } else {
                        setSelectedGrInd(st_ind);
                      }
                    }}
                    style={
                      selectedGrInd !== "" && +selectedGrInd === +st_ind
                        ? {
                            backgroundColor: GROUP_BGCOLOR[4],
                            fontWeight: "bold",
                            fontSize: "18px",
                            border: "solid",
                          }
                        : {}
                    }
                  >
                    {std}
                  </li>
                );
              })}{" "}
              <div
                className={classes["sec-title"]}
                style={{ marginTop: "25px" }}
              >
                <Button
                  name={"캐릭터 초기화"}
                  onclick={() => resetChOrStds("ch")}
                  className={"groupPage-add"}
                />
              </div>
            </ul>

            {/* 캐릭터 목록 보여주기 */}
            <ul
              className={classes["seat-ul"]}
              style={{
                width: "55%",
                paddingLeft: "0",
                justifyContent: "center",
              }}
            >
              <div className={classes["sec-title"]}>캐릭터 목록</div>

              {CHARACTERS?.map((image, index) => (
                <li
                  key={index}
                  className={classes["seat-li"]}
                  onClick={() => {
                    if (selectedGrInd === "") {
                      Swal.fire(
                        "선택 불가!",
                        "먼저 학생을 선택한 후에 캐릭터를 선택해주세요!",
                        "warning"
                      );
                      return;
                    } else {
                      // let new_img = window.location.href.includes("checks-cool")
                      //   ? image.split("checks-cool")?.[1]
                      //   : image;

                      shoppingGift("character", image);
                    }
                  }}
                  style={{
                    position: "relative",
                    width: "80px",
                    height: "100px",
                  }}
                >
                  <img
                    src={image}
                    className={classes["character"]}
                    alt={`character${index}`}
                  />{" "}
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}

      {/* 자리표 이쓰면 목록 보여주기 */}
      {showSeatsList && seatLists?.length !== 0 && (
        <Modal onClose={() => setShowSeatsList(false)}>
          <span onClick={() => setShowSeatsList(false)}>
            <FaRegCircleXmark className={classes.xmark} />
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
            <span onClick={() => setShowGroupList(false)}>
              <FaRegCircleXmark className={classes.xmark} />
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
                    setGroupMakingStep(MAKE_STEP[0]);
                  }}
                >
                  <div className={classes["seat-id"]}>
                    {gd?.id?.slice(0, 10)}
                  </div>
                  <div className={classes["seat-title"]}>
                    {gd?.clName ? gd?.clName + ")" : ""}&nbsp;&nbsp;{gd?.title}
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
            <span onClick={() => setShowRowCol(false)}>
              <FaRegCircleXmark className={classes.xmark} />
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
            <span onClick={() => setShowTitleInputModal(false)}>
              <FaRegCircleXmark className={classes.xmark} />
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
                      className={classes["groupName-input"]}
                      value={nowClassName}
                      style={{ height: "auto", padding: "10px" }}
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
          <span onClick={() => setAddOrLoad("")}>
            <FaRegCircleXmark className={classes.xmark} />
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
                  icon={<FaRegCalendarDays />}
                  onclick={() => {
                    setClickedStds([]);
                    setMenuFunc("출결");
                  }}
                  style={menuRight ? { width: "92px" } : {}}
                />
                <Button
                  name="&nbsp; 제출"
                  className={"groupPage-btn"}
                  icon={<FaRegSquareCheck />}
                  onclick={() => {
                    setClickedStds([]);
                    setMenuFunc("제출");
                  }}
                  style={menuRight ? { width: "92px" } : {}}
                />
                <Button
                  name="&nbsp; 개별"
                  className={"groupPage-btn"}
                  icon={<FaClipboardCheck />}
                  onclick={() => {
                    setClickedStds([]);
                    setMenuFunc("개별");
                  }}
                  style={menuRight ? { width: "92px" } : {}}
                />
                <Button
                  name="&nbsp; 상담"
                  className={"groupPage-btn"}
                  icon={<FaRegComments />}
                  onclick={() => {
                    setClickedStds([]);
                    setMenuFunc("상담");
                  }}
                  style={menuRight ? { width: "92px" } : {}}
                />
                <Button
                  name="&nbsp; 보상"
                  className={"groupPage-btn"}
                  icon={<FaGift />}
                  onclick={() => {
                    setClickedStds([]);
                    setMenuFunc("보상");
                  }}
                  style={menuRight ? { width: "92px" } : {}}
                />
                <Button
                  name="&nbsp; 뽑기"
                  className={"groupPage-btn"}
                  icon={<FaShuffle />}
                  onclick={() => {
                    setClickedStds([]);
                    setMenuFunc("뽑기");
                  }}
                  style={menuRight ? { width: "92px" } : {}}
                />
                {/*  */}
                <div className={classes["autoSave-expl"]}>
                  * 자료 변경 시<br /> 3초 후 자동저장
                </div>

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
                        icon={<FaRegFolderOpen />}
                        className={"groupPage-btn"}
                        onclick={() => setAddOrLoad("load")}
                      />
                    </>
                  )}

                {/* 보상일 때 보여질 버튼들 */}
                {menuFunc === "보상" && (
                  <>
                    <Button
                      icon={<FaUsersRectangle />}
                      title="모둠보상 주기"
                      name="&nbsp;보상"
                      className={"groupPage-btn"}
                      onclick={() => {
                        if (groupInfo?.length === 0) {
                          Swal.fire(
                            "모둠없음!",
                            "설정된 모둠이 없어서 모둠보상 주기가 불가능해요! 먼저 화면 우측 상단의 설정 버튼을 눌러서 모둠을 생성해주세요."
                          );
                          return;
                        }
                        setGiftItem("group");
                      }}
                      style={menuRight ? { width: "95px" } : {}}
                    />
                    <Button
                      icon={<FaUser />}
                      name="&nbsp;보상"
                      title="개별보상 주기"
                      className={"groupPage-btn"}
                      onclick={() => setGiftItem("person")}
                      style={menuRight ? { width: "95px" } : {}}
                    />
                    <Button
                      name="&nbsp;관리"
                      icon={<FaGift />}
                      title="(개인/모둠) 보상 관리하기"
                      className={"groupPage-btn"}
                      onclick={() => setGiftItem("setting")}
                      style={menuRight ? { width: "95px" } : {}}
                    />
                    <Button
                      name="&nbsp;캐릭터"
                      icon={<PiDogFill />}
                      title="캐릭터 변경하기"
                      className={"groupPage-btn"}
                      onclick={() => setGiftItem("characterChange")}
                      style={menuRight ? { width: "95px" } : {}}
                    />
                  </>
                )}

                {/* 뽑기일때 보여질 버튼들 */}
                {menuFunc === "뽑기" && (
                  <>
                    {/* 아직 모둠/ 개인 선택하지 않은 상태 */}
                    {randomPick === "" && (
                      <>
                        <span className={classes["pickSpan"]}>뽑기</span>
                        <Button
                          icon={<FaUsersRectangle />}
                          title="모둠의 순서를 정하는 뽑기"
                          name="&nbsp;모둠"
                          style={{ justifyContent: "space-between" }}
                          className={"groupPage-btn"}
                          onclick={() => groupPickHandler("group")}
                        />
                        <Button
                          icon={<FaUser />}
                          title="개인별 순서를 정하는 뽑기"
                          style={{ justifyContent: "space-between" }}
                          name="&nbsp;개별"
                          className={"groupPage-btn"}
                          onclick={() => groupPickHandler("person")}
                        />
                      </>
                    )}

                    {/* 랜덤뽑기에서 개인 혹은 모둠 뽑기 상태 */}
                    {randomPick !== "" && (
                      <>
                        <span className={classes["pickSpan"]}>
                          {randomPick === "person" ? "개별 뽑기" : "모둠 뽑기"}
                        </span>
                        {/* 한번에 */}
                        <Button
                          icon={<FaUsersRectangle />}
                          title="버튼을 누르면 한 번에 모든 순서가 보여요!"
                          name="한번에"
                          className={"groupPage-btn"}
                          style={{
                            width: "100px",
                            justifyContent: "space-between",
                          }}
                          onclick={() => handleDrawStudent("all")}
                        />
                        <Button
                          icon={<FaUser />}
                          style={{
                            width: "100px",
                            justifyContent: "space-between",
                          }}
                          title={
                            randomPick === "person"
                              ? "버튼을 누르면 한명씩 뽑혀요!"
                              : "버튼을 누르면 한 모둠씩 뽑혀요!"
                          }
                          name={randomPick === "person" ? "한명씩" : "한모둠"}
                          className={"groupPage-btn"}
                          onclick={() => handleDrawStudent("one")}
                        />
                      </>
                    )}
                  </>
                )}

                <Button
                  name="&nbsp; 취소"
                  className={"groupPage-btn"}
                  icon={<FaRegCircleXmark />}
                  onclick={() => {
                    if (menuFunc !== "뽑기") {
                      setMenuFunc("");
                      setAddOrLoad("");
                    } else if (randomPick === "") {
                      setMenuFunc("");
                      setAddOrLoad("");
                      clearTimeout(timerId.current);
                      setSelectedStudent(null);
                    } else {
                      clearTimeout(timerId.current);

                      setRandomPick("");
                      setIsDrawing("");
                      setSelectedStudent(null);
                    }
                  }}
                  style={menuRight ? { width: "95px" } : {}}
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
                icon={<FaPlus />}
                onclick={() => {
                  setSettingWhat("");
                  setClickedStds([]);
                  setNewFrom("allNew");
                }}
                className={"groupPage-btn"}
              />
              {/* 목록보기 */}
              <Button
                title="기존목록"
                icon={<FaRegFolderOpen />}
                onclick={() => {
                  setNewFrom("");
                  setClickedStds([]);
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
                    from &nbsp;
                    <FaChair />
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
                icon={<FaXmark />}
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
                icon={<FaXmark />}
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
          {groupMakingStep === MAKE_STEP[0] &&
            menuFunc === "" &&
            clickedStds?.length === 0 && (
              <div
                className={classes["header-title"]}
                style={!menuRight ? { marginTop: "70px" } : {}}
              >
                <span className={classes["title-span"]}>
                  {nowDatas?.id?.slice(0, 10)}
                </span>
                {nowDatas?.title}
              </div>
            )}

          {/* 학생을 클릭하면 보일 .. 한번에 점수 올리는 버튼  */}
          {groupMakingStep === MAKE_STEP[0] &&
            menuFunc === "" &&
            clickedStds?.length !== 0 && (
              <div
                className={classes["header-clicked-title"]}
                style={!menuRight ? { marginTop: "70px" } : {}}
              >
                <Button
                  title="모든학생 선택하기"
                  name="&nbsp;모두선택"
                  icon={<FaRegSquareCheck />}
                  onclick={() => clickAllStds()}
                  className={"groupPage-btn"}
                  style={{ width: "110px" }}
                />
                <Button
                  title="클릭했던 학생들 초기화"
                  name="&nbsp;초기화"
                  icon={<VscDebugRestart />}
                  onclick={() => setClickedStds([])}
                  className={"groupPage-btn"}
                  style={{ width: "100px" }}
                />
                선택학생 한 번에
                <span
                  className={classes["plus-all"]}
                  onClick={() => {
                    grPointsHandler("heart-plus-stds");
                  }}
                >
                  <FaHeartCirclePlus />
                </span>
                <span
                  className={classes["minus-all"]}
                  onClick={() => {
                    grPointsHandler("heart-minus-stds");
                  }}
                >
                  <FaHeartCircleMinus />
                </span>
              </div>
            )}

          {groupMakingStep === MAKE_STEP[0] && menuFunc === "출결" && (
            <>
              <div
                className={classes["header-title"]}
                style={!menuRight ? { marginTop: "70px" } : {}}
              >
                출결자료 등록하기
              </div>
              <div>* 자료를 등록할 학생을 클릭해주세요.</div>
            </>
          )}

          {groupMakingStep === MAKE_STEP[0] &&
            selectedStds?.current?.length > 0 && (
              <>
                <div
                  style={
                    !menuRight && menuFunc === "뽑기"
                      ? { marginTop: "70px" }
                      : {}
                  }
                  className={classes["picked-div"]}
                >
                  {/* 뽑힌 학생이 존재하면, 초기화 버튼도 보여주기. */}

                  <Button
                    title="뽑기 초기화"
                    name="&nbsp;뽑기 초기화"
                    icon={<VscDebugRestart />}
                    onclick={() => resetChOrStds("std")}
                    className={"groupPage-btn"}
                    style={{ display: "inline" }}
                  />

                  {selectedStds?.current?.map((stInd, ind) => (
                    <span
                      key={ind}
                      className={classes["pickStd-span"]}
                      onClick={() => doneStdsHandler(ind)}
                      style={
                        doneStds?.includes(ind)
                          ? { textDecorationLine: "line-through" }
                          : {}
                      }
                    >
                      <span className={classes["random-order"]}>
                        {ind + 1}번{" "}
                      </span>
                      {nowSelected === "person"
                        ? nowDatas?.students?.[stInd]
                        : groupInfo?.[stInd]?.groupName?.includes("모둠")
                        ? groupInfo?.[stInd].groupName
                        : groupInfo?.[stInd].groupName + "모둠"}
                    </span>
                  ))}
                  {/* 설명 */}
                  <span
                    className={classes["pickStd-span"]}
                    style={{ fontSize: "14px", backgroundColor: "inherit" }}
                  >
                    *클릭하면 취소선
                  </span>
                </div>
              </>
            )}

          {groupMakingStep === MAKE_STEP[0] &&
            (menuFunc === "제출" || menuFunc === "개별") && (
              <>
                <div
                  className={classes["header-title"]}
                  style={!menuRight ? { marginTop: "70px" } : {}}
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
                      icon={<FaRegFloppyDisk />}
                      className={"groupPage-btn"}
                      onclick={saveCheckList}
                    />
                    <Button
                      name={window.innerWidth < 1100 ? "" : <>&nbsp; 취소</>}
                      className={"groupPage-btn"}
                      icon={<FaRegCircleXmark />}
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
                style={!menuRight ? { marginTop: "70px" } : {}}
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
              <div className={classes["header-title"]}>모둠 추가/삭제/수정</div>
              <motion.form
                initial="_downY"
                animate="originXY"
                transition="dur5"
                variants={MOTION_VAR}
                className={classes["seat-ul"]}
              >
                <input
                  className={classes["groupName-input"]}
                  type="text"
                  placeholder="'모둠'을 제외한 모둠명"
                  onChange={(e) => setGroupName(e.target?.value)}
                  value={groupName}
                />
                <Button
                  name={selectedGrInd?.length === 0 ? "추가" : "수정"}
                  onclick={(e) => addGroupHandler(e)}
                  className={"groupPage-btn"}
                  style={{ fontSize: "15px", borderRadius: "40px" }}
                />

                <Button
                  name={"삭제"}
                  onclick={(e) => delGroupInfo(e, selectedGrInd)}
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
                  * 모둠클릭 => 학생클릭 👉🏼 <FaRegFloppyDisk /> 클릭
                </div>
                {groupInfo?.length === 0 && (
                  <div>
                    * 모둠없이 사용하시려면 <FaRegFloppyDisk /> 클릭
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
                    icon={<FaChevronLeft />}
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
                      <FaChevronRight />
                    ) : (
                      <FaRegFloppyDisk />
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
                    title="새창) 첵스쿨 열기"
                    icon={<FaHouse />}
                    onclick={() =>
                      window.open(
                        window.location.href?.split("groupPage")?.[0],
                        "_blank"
                      )
                    }
                    className={"groupPage-btn"}
                  />
                  <Button
                    title="설정보기"
                    icon={<FaGear />}
                    onclick={() => {
                      setClickedStds([]);
                      setSettingWhat("on");
                    }}
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
                    icon={<FaXmark />}
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
                    name="&nbsp; 취소"
                    icon={<FaRegCircleXmark />}
                    title="취소"
                    onclick={() => {
                      setSettingWhat("");
                      setGroupName("");
                      setSelectedGrInd("");
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
                    onclick={() => {
                      //기존자료면... 클릭하면, grInd에 세팅해두기
                      if (selectedGrInd !== ind) {
                        setSelectedGrInd(ind);
                        setGroupName(gInfo.groupName);
                      } else {
                        setSelectedGrInd("");
                        setGroupName("");
                      }
                    }}
                    className={"group-btn"}
                    style={{
                      backgroundColor: gInfo?.color || GROUP_BGCOLOR?.[ind],
                    }}
                  />
                </span>
              ))}
            </div>

            <motion.div
              initial="_downY"
              animate="originXY"
              transition="dur5"
              variants={MOTION_VAR}
            >
              {groupInfo?.length === 0 ? (
                <div>
                  * 모둠설정 없이 사용하시려면 오른쪽 <FaChevronRight /> 버튼
                  클릭
                </div>
              ) : (
                <div className={classes["group-edit"]}>
                  * 수정) 모둠 클릭 => 모둠명 변경 => [수정] 클릭
                  <br />* 삭제) 모둠 클릭 => [삭제] 클릭
                </div>
              )}
            </motion.div>
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

      {/* 모둠 점수 보여주기 - 왼쪽 */}
      {groupInfo?.length !== 0 && menuRight && groupPointsHtml()}

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
              className={
                isNaN(std)
                  ? classes["item"]
                  : groupMakingStep !== MAKE_STEP[2]
                  ? classes["empty-item"]
                  : classes["empty-item-color"]
              }
              id={std}
              style={
                clickedStds?.includes(+ind)
                  ? { backgroundColor: "yellow" }
                  : menuFunc === "뽑기" &&
                    randomPick === "person" &&
                    (ind === selectedStudent ||
                      selectedStds.current?.includes(ind))
                  ? { backgroundColor: "yellow" }
                  : menuFunc !== "제출"
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
              {/* 자료가 완성된 상태고, 호버할때만 보일... 하트 +,- */}
              {nowDatas?.stdPoints?.length > 0 &&
                hoveredIndex === String("item" + ind) &&
                settingWhat !== "자리변경" &&
                settingWhat !== "모둠수정" &&
                menuFunc === "" &&
                isNaN(std) && (
                  <>
                    <div
                      className={classes["plus"]}
                      onClick={(e) => {
                        //배경의 클릭이벤트 버블링 막기
                        e.stopPropagation();
                        grPointsHandler("heart-plus", ind);
                      }}
                    >
                      <FaHeartCirclePlus />
                    </div>
                    <div
                      className={classes["minus"]}
                      onClick={(e) => {
                        //배경의 클릭이벤트 버블링 막기
                        e.stopPropagation();
                        grPointsHandler("heart-minus", ind);
                      }}
                    >
                      <FaHeartCircleMinus />
                    </div>
                  </>
                )}

              {/* 개인점수, 랭킹이 높으면 보여주기 */}
              {nowDatas?.stdPoints?.length > 0 && menuFunc === "" && (
                <>
                  {hoveredIndex !== String("item" + ind) && (
                    <>
                      {/* 개인랭킹과 왕관 */}

                      {stdRank1to5(ind)}
                    </>
                  )}

                  {/* 개인점수와 하트, 문자일 때만 보임 */}
                  {isNaN(std) && (
                    <div className={classes["std-point"]}>
                      <FaHeart
                        color="#d90f30"
                        filter="drop-shadow(2px 1px 1px rgba(46, 0, 0, 1))"
                        size={10}
                      />
                      &nbsp;&nbsp;
                      {stdPoints[ind]}
                    </div>
                  )}
                </>
              )}

              {/* 캐릭터 */}
              {/*  학생 이름 */}
              <div
                className={
                  menuFunc === "개별" && addOrLoad === "add"
                    ? classes["listStyle-item"]
                    : classes["std-name"]
                }
                style={
                  menuFunc === "개별" && !isNaN(std) ? { display: "none" } : {}
                }
              >
                {isNaN(std) && (
                  <img
                    className={
                      hoveredIndex !== String("item" + ind)
                        ? classes["character"]
                        : classes["now-character"]
                    }
                    src={getChacterImgSrc(std)}
                    alt=""
                  >
                    {/* {CHARACTERS[ind + randNum]} */}
                  </img>
                )}
                {/* 학생이름, 개별기록에서 숫자면 안보여줌 */}
                <span>{std}</span>
              </div>

              {/* 개별기록 입력일때만 보이는, textarea 태그 */}
              {menuFunc === "개별" && addOrLoad === "add" && isNaN(std) && (
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
      {/* 모둠 점수 보여주기 - 아래쪽 */}
      {groupInfo?.length !== 0 && !menuRight && (
        <div className={classes["points-div"]}>{groupPointsHtml()}</div>
      )}
      {/* 자동저장 안내 */}
    </div>
  );
};

export default GroupPage;
