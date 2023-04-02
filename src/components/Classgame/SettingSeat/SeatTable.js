import React, { useState, useEffect } from "react";
import classes from "./SettingSeat.module.css";
import Swal from "sweetalert2";
import Button from "../../Layout/Button";
import { dbService } from "../../../fbase";
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const saveErrorSwal = (text) => {
  Swal.fire({
    icon: "error",
    title: "저장실패",
    text: text,
    confirmButtonText: "확인",
    confirmButtonColor: "#85bd82",
    timer: 5000,
  });
};

const getDateHandler = (date) => {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
};

const imageUrls = [
  "미니언즈박수",
  "강아지너야너",
  "강아지점프",
  "개놀람1",
  "개놀람2",
  "개박수",
  "곰돌축하",
  "양떼박수",
  "캐릭터들예스",
  "하이파이브새",
];

const SeatTable = (props) => {
  const [genderEmptySeat, setGenderEmptySeat] = useState(false);
  const [nowSeatGender, setNowSeatGender] = useState([
    +props.rowColumn?.split("-")?.[0] * +props.rowColumn?.split("-")?.[1],
    0,
    +props.rowColumn?.split("-")?.[0] * +props.rowColumn?.split("-")?.[1],
  ]);
  const [tableRow, setTableRow] = useState(
    props.rowColumn?.split("-")[0] || ""
  );
  const [tableColumn, setTableColumn] = useState(
    props.rowColumn?.split("-")[1] || ""
  );
  const [items, setItems] = useState();
  const [itemsFront, setItemsFront] = useState();
  const [tempStudent, setTempStudent] = useState({});
  const [tempBeforeName, setTempBeforeName] = useState("");
  const [switchStudent, setSwitchStudent] = useState({});
  const [students, setStudents] = useState(props.students || []);
  const [isNewPair, setIsNewPair] = useState(true);
  const [allSeats, setAllSeats] = useState([]);
  const [seatLists, setSeatLists] = useState(null);
  const [pairStudents, setPairStudents] = useState([]);
  const [randomJustStudent, setRandomJustStudent] = useState(true);
  const [pickSeatAll, setPickSeatAll] = useState("");
  const [seeFromBack, setSeeFromBack] = useState(true);

  let navigate = useNavigate();

  //자리에 성별 설정을 true로 만들기 seatList거나, 비밀자료인 경우
  useEffect(() => {
    if (props.isExist) {
      setGenderEmptySeat(true);
    }
    if (props.secretSeat?.genderEmptySeat?.length > 0) {
      setGenderEmptySeat(true);
    }
  }, [props.isExist, props.secretSeat]);

  useEffect(() => {
    //비밀자료 아니면 작동안함
    if (!props.secretSeat) return;

    //아직, 렌더링 되지 않은 상태면 반환
    if (items?.length === 0 || !items) return;

    //자리에 학생이름이 이미 들어있어도 작동안함.
    let allSeats = document.querySelectorAll(".item");
    let isInitState = true;
    allSeats?.forEach((seat) => {
      if (isNaN(+seat?.innerText)) {
        isInitState = false;
      }
    });
    if (!isInitState) return;

    let isWorked = false;
    let showSecretHandler = (e) => {
      //+를 누르면 저장되었던 예시자료 이어할지 물어보기 이어한다고 하면, 자리에 학생들 넣어주기
      //한번 일단 선택해서 넣으면 이벤트리스너 해제하기. 혹은 작동하지 않도록 하기
      if (isWorked) return;
      if (e.keyCode === 107) {
        Swal.fire({
          icon: "warning",
          title: "예시자료 불러오기",
          text: "저장된 예시자료를 불러와서 이어할까요?",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          showDenyButton: true,
          denyButtonText: "취소",
        }).then((result) => {
          if (result.isConfirmed) {
            let new_students = [...students];
            let lastStudent = {};
            //자리에 비밀,예시자료 학생들 넣기
            allSeats?.forEach((item, index) => {
              let now_studentName = props.secretSeat?.students?.[index];
              item.innerText = now_studentName;
              if (!isNaN(+now_studentName)) return;
              new_students = new_students?.filter((stu) => {
                if (stu.name === now_studentName) {
                  lastStudent = stu;
                }
                return stu.name !== now_studentName;
              });
              // 마지막 학생을 템프에 넣기
              setTempStudent(lastStudent);
              setTempBeforeName(now_studentName);
            });
            // 자료에 있던 학생 빼고 남은학생 설정하기
            setStudents(new_students);
            isWorked = true;
          }
        });
      }
    };
    document.addEventListener("keydown", showSecretHandler);

    return () => document.removeEventListener("keydown", showSecretHandler);
  }, [items]);

  useEffect(() => {
    let noSetGender = false;
    students.forEach((stu) => {
      if (!stu.hasOwnProperty("woman")) {
        noSetGender = true;
      }
    });

    //성별 설정이 없는경우
    if (noSetGender) {
      Swal.fire({
        icon: "error",
        title: "설정필요",
        text: "학생들의 성별정보가 설정되지 않았습니다. [확인] 버튼을 눌러서 학생명부 화면으로 이동해주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        showDenyButton: false,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate(`/student-manage`);
        }
      });
    }
  }, []);

  useEffect(() => {
    //
    //   가로의 칸 column 과 세로의 줄 row를 곱하고 그 개수만큼 item을 만들어서 칸을 만들어줌.
    let itemsNumArray = [...Array(+tableRow * +tableColumn)]?.map(
      (v, i) => i + 1
    );

    let data_month;
    let data_year;
    let dataYear_students;
    //기존 자료인 경우 학생 자료 받아와서.. 성별 넣어주기
    if (props.saveDate) {
      data_month = props.saveDate.slice(5, 7);
      data_year = props.saveDate.slice(0, 4);
      //학년도 세팅한 후에 (1월까지)
      if (+data_month <= 1) {
        data_year = String(+data_year - 1);
      }
      //받아온 전체 학생 자료에서 현재 학년도 학생 자료만 만들어 주기
      dataYear_students = props?.wholeStudents?.filter(
        (yearStd) => Object.keys(yearStd)[0] === data_year
      )?.[0]?.[data_year];

      if (props.clName) {
        dataYear_students = dataYear_students?.filter(
          (cl) => Object.keys(cl)[0] === props.clName
        )?.[0]?.[props.clName];
      }
    }

    setItems(
      itemsNumArray?.map((item) => (
        <div
          key={`table-${item}`}
          className={`${classes["item"]} item ${
            classes[
              dataYear_students?.filter(
                (stu) => stu.name === props.seatStudents[+item - 1]
              )?.[0]?.woman && "existWoman"
            ]
          } ${props.secretSeat?.genderEmptySeat?.[+item - 1]}`}
          id={
            props.title?.length > 0
              ? `table-${props.title}-${item}`
              : `table-${item}`
          }
          onClick={(e) => itemAddStudentHandler(e)}
        >
          {" "}
          {props.seatStudents?.length > 0
            ? props.seatStudents[+item - 1]
            : item}{" "}
        </div>
      ))
    );
    document
      .getElementById(props.title || "newSeats")
      .style.setProperty("--columns", tableColumn);
    document
      .getElementById(props.title || "newSeats")
      .style.setProperty("--rows", tableRow);
  }, [genderEmptySeat]);

  useEffect(() => {
    let new_students = [...students];

    //새로운 자리 데이터 추가할 때만 중복되는거 살펴봄.
    if (!props.isExist) {
      if (seatLists?.length > 0) {
        seatLists?.forEach((list) => {
          // 만약.. 가로에 앉는 학생 수가 홀수면.. 짝에 포함시키지 않음!
          if (+list.rowColumn.split("-")[1] % 2 !== 0) return;
          // 제목에 제외' 를 포함시킬 경우... 짝에 포함시키지 않음!
          if (list.title.includes("@")) return;

          list.students.forEach((stu_name, list_index) => {
            //학생들 중에 먼저 현재 학생 찾고
            let nowStudent = new_students?.filter(
              (student) => student.name === stu_name
            )[0];

            //만약 빈칸(숫자)으로 저장되었을 경우
            if (nowStudent === undefined) return;
            //현재 학생에 pair키가 없으면 키,값을 배열로 만들어두고
            if (!nowStudent?.hasOwnProperty("pair")) {
              nowStudent["pair"] = [];
            }
            //짝수면 다음학생 인덱스로 가져와서 짝에 추가하기
            if (list_index % 2 === 0) {
              //현재학생의 속성 pair, 했던 짝에 추가하기
              nowStudent["pair"].push(list.students[list_index + 1]);
            } else {
              //홀수면 이전학생 인덱스로 가져와서 짝에 추가하기
              nowStudent["pair"].push(list.students[list_index - 1]);
            }
            nowStudent["pair"] = [...new Set(nowStudent["pair"])];
            // console.log(nowStudent);
            //새로운 학생 목록에 추가하기
          });
          setPairStudents([...new_students]);
        });
      } else {
        setPairStudents([...new_students]);
      }
    }
  }, [seatLists]);

  const getSeatsFromDb = () => {
    let seatsRef = doc(dbService, "seats", props.userUid);
    setAllSeats([]);
    onSnapshot(seatsRef, (doc) => {
      const all_seats = [];

      doc?.data()?.seats_data?.forEach((data) => {
        //저장할 때 사용할 전체 자료 저장
        all_seats.push(data);
      });
      //데이터 저장에 쓸 전체 자리표
      setAllSeats([...all_seats]);
    });
  };

  useEffect(() => {
    getSeatsFromDb();
  }, []);

  // useEffect(() => {
  //   setTitleValue(props.title);
  // }, [props.title]);

  useEffect(() => {
    setSeatLists([]);
    //현재학년도 세팅
    let now_date = getDateHandler(new Date());
    let now_year = now_date.slice(0, 4);
    let now_month = now_date.slice(5, 7);
    if (+now_month <= 1) {
      now_year = String(+now_year - 1);
    }

    const new_seats = [];
    allSeats.forEach((data) => {
      // let now_years
      let data_month = data.saveDate.slice(5, 7);
      let data_year = data.saveDate.slice(0, 4);

      if (+data_month <= 1) {
        data_year = String(+data_year - 1);
      }

      //현재 학년도와 자료의 년도가 일치하면
      if (now_year === data_year) {
        new_seats.push(data);
      }
    });

    //비교에 쓸 현재학년도 자리표
    setSeatLists([...new_seats]);
  }, [allSeats]);

  //뽑기함수 실행전, 번호가 가능한지 확인하는 함수
  //뽑기함수 실행 전 남, 혹은 여뽑기인 경우 확인하는 함수
  const randomIsPossible = (isWoman) => {
    let isPossible = true;
    let new_students = [...students];

    //전체뽑기인경우는 함수 실행하지 않음
    let exist = new_students?.filter((stu) => stu.woman === isWoman);
    //뽑을 수 있는 학생이 없으면
    if (exist.length === 0) {
      isPossible = false;
    }

    return isPossible;
  };

  //뽑힌 학생 자리 배치 했는지 확인
  const selectSeatCheck = () => {
    if (Object.keys(tempStudent).length === 0 || tempStudent === undefined) {
      return true;
    }
    let new_students = [...students];
    let existItems = document.querySelectorAll(".item");
    let selectedSeats = 0;
    existItems.forEach((item) => {
      if (isNaN(+item.innerText)) {
        selectedSeats += 1;
      }
    });

    if (selectedSeats + new_students.length === props.students.length) {
      return true;
    }
  };

  //뽑기 함수, 뽑힌 학생을 뽑아서 temp에 저장함
  const randomSeatHandler = (isWoman) => {
    let selectedStudent = {};
    let pair_students = [...pairStudents];
    let new_students = [...students];
    let gender_students = [];
    //성별에 따라 새로운 배열 만들고
    gender_students = new_students?.filter((stu) => stu.woman === isWoman);
    if (isWoman === "all") {
      gender_students = new_students;
    }

    // //비밀자료에 있는 학생들은 제외해줌!
    // if (props.secretSeat) {
    //   gender_students = gender_students?.filter(
    //     (std) => !props.secretSeat?.students.includes(std.name)
    //   );
    // }

    //남뽑기 여뽑기 기준 새로운 로직
    //남 혹은 여학생에서 학생 랜덤 뽑기
    const selectRnStudent = () => {
      //만약 비밀자료가 있는데, 비밀자료에서 비어있는 자리의 학생을 뽑을 때, 비밀자료에 포함된 학생을 제외한 학생들 중에서 뽑아야 함
      if (props.secretSeat) {
        gender_students = gender_students?.filter(
          (std) => !props.secretSeat?.students?.includes(std.name)
        );
        console.log(gender_students);
      }

      let randNum = Math.floor(Math.random() * gender_students.length);

      return gender_students[randNum];
    };

    //만약 비밀자료에 있는 학생들을 제외하고 모든 학생이 뽑혀버리면.. 비밀자료의 남은 학생들 자리에 넣기!
    // let secretPickDone = false;
    // let selectedSecretStd = {};
    // if (gender_students.length === 0 && props.secretSeat) {
    //   gender_students = new_students?.filter((stu) => stu.woman === isWoman);
    //   if (isWoman === "all") {
    //     gender_students = new_students;
    //   }
    //   selectedSecretStd = selectRnStudent();

    //   setTempBeforeName(selectedSecretStd.name);
    //   new_students = new_students?.filter(
    //     (stu) => stu.name !== selectedSecretStd.name
    //   );

    //   selectedSwal(selectedSecretStd.num, selectedSecretStd.name);

    //   setStudents([...new_students]);
    //   setTempStudent({ ...selectedSecretStd });
    //   secretPickDone = true;
    // }

    // if (secretPickDone) return selectedSecretStd;

    //학생을 옵션에 맞게 뽑고tempname에 이름 저장하고 학생목록에서 뽑힌 학생 제거하는 함수
    const removePickStudent = () => {
      //남뽑기 여뽑기 로직뉴뉴뉴
      const getRnStudent = () => {
        let randomStudent = selectRnStudent();
        //짝 정보를 포함한 그 학생의 정보
        selectedStudent = pair_students?.filter(
          (stu) => stu.name === randomStudent.name
        )[0];
      };

      //selectedStudent에 랜덤 학생 넣기
      getRnStudent();

      //비밀모드면.. 무시하기
      let isDuplicate = 0;
      //만약 새로운짝 옵션상태고 짝을 했던 경우 다시 뽑기
      while (isNewPair && selectedStudent?.pair?.includes(tempBeforeName)) {
        isDuplicate += 1;
        if (new_students.length === 1) break;
        if (isDuplicate > 20) break;
        getRnStudent();
      }

      setTempBeforeName(selectedStudent.name);

      new_students = new_students?.filter(
        (stu) => +stu.num !== +selectedStudent.num
      );
    };

    while (Object.keys(selectedStudent).length === 0) {
      removePickStudent();
    }

    selectedSwal(selectedStudent.num, selectedStudent.name);

    setStudents([...new_students]);
    setTempStudent({ ...selectedStudent });
    return selectedStudent;
  };

  //자리를 누르면 실행되는 함수
  const itemAddStudentHandler = (event) => {
    let clickedSeat = event.target;
    let existItems = clickedSeat.parentNode.childNodes;
    let selectedSeats = 0;

    // 자리에 성별 세팅하기
    if (!genderEmptySeat) {
      //여자, 혹은 empty가 없으면 남자
      //1번클릭 여자, 2번 클릭 empty, 3번클릭 남자
      // 남자자리 였으면
      if (
        !clickedSeat.classList.contains("woman") &&
        !clickedSeat.classList.contains("empty")
      ) {
        clickedSeat.classList.add("woman");
        //여자였으면
      } else if (clickedSeat.classList.contains("woman")) {
        clickedSeat.classList.remove("woman");
        clickedSeat.classList.add("empty");

        //empty 빈자리 였으면
      } else if (clickedSeat.classList.contains("empty")) {
        clickedSeat.classList.remove("empty");
      }

      // 자리와 우리반 성별, 전체 학생수가 같은지 확인하기
      let all_seat = document.querySelectorAll(".item");
      let now_seatMan = 0;
      let now_seatWoman = 0;
      let now_seatEmpty = 0;

      all_seat.forEach((seatTag) => {
        if (seatTag.classList.contains("woman")) {
          now_seatWoman += 1;
        } else if (seatTag.classList.contains("empty")) {
          now_seatEmpty += 1;
        } else {
          now_seatMan += 1;
        }
      });

      setNowSeatGender([now_seatMan, now_seatWoman, now_seatEmpty]);

      // 성별 세팅이 완료된 경우면.. 자리바꾸고,
    } else {
      //빈자리는 바꾸기 불가
      if (clickedSeat.classList.contains("empty")) return;

      existItems.forEach((item) => {
        //학생 이름이 저장되어 있으면
        if (isNaN(+item.innerText)) {
          selectedSeats += 1;
        }
      });
      // console.log(students.length);

      setStudents((prev) => {
        //남은학생
        let new_students = [...prev];

        //이미저장된 기존 자료이거나
        // 전체학생 - 안뽑힌학생 = 뽑힌자리 인 경우 뽑힌 학생 모두가 자리배치가 끝나 있으면 자리 바꾸기

        if (
          props?.isExist ||
          selectedSeats === props.students.length - new_students.length
        ) {
          let clickedName = clickedSeat.innerText;
          let clickedItemId = clickedSeat.getAttribute("id");
          let clickedItemWoman = clickedSeat.classList.contains("woman")
            ? true
            : false;

          // 선택된 학생이 없으면 선택하고
          setSwitchStudent((prev_stu) => {
            if (Object.keys(prev_stu).length === 0) {
              //선택한 학생의 박스 테두리를 초록색으로 설정하기
              //선택된 학생이 없으면자리가 숫자면.. 선택하지 않기
              // if (!isNaN(+clickedName)) return { ...{} };
              clickedSeat.style.borderWidth = "3px";
              clickedSeat.style.borderColor = "#46a046";
              return {
                ...{
                  name: clickedName,
                  id: clickedItemId,
                  woman: clickedItemWoman,
                },
              };
              //선택된 학생이 있으면 현재 학생과 스위치!
            } else {
              if (prev_stu.woman && !clickedSeat.classList.contains("woman"))
                return {
                  ...{
                    name: clickedName,
                    id: clickedItemId,
                    woman: clickedItemWoman,
                  },
                };
              if (!prev_stu.woman && clickedSeat.classList.contains("woman"))
                return {
                  ...{
                    name: clickedName,
                    id: clickedItemId,
                    woman: clickedItemWoman,
                  },
                };

              clickedSeat.innerText = prev_stu.name;
              document.getElementById(prev_stu.id).innerText = clickedName;
              clickedSeat.style.borderWidth = "3px";
              clickedSeat.style.borderColor = "#46a046";
              return { ...{} };
            }
          });
          //그냥 뽑힌 학생 자리에 새롭게 넣는거..!!
        } else {
          //비어있는 자리가 아니면 빼고
          if (isNaN(+clickedSeat.innerText)) {
            return [...prev];
          }

          //비어 있는 자리에 학생이름 넣어주기
          let existItems = document.querySelectorAll(".item");

          setTempStudent((temp) => {
            let student = { ...temp };

            //혹시 현재 뽑힌 학생이 다른 곳에 이름이 미리 들어가 있으면 번호로 다시 바꿈
            // 만약, 현재 학생의 성별과 다른 성별의 자리를 선택하려고 하면 안눌림
            if (student.woman && !clickedSeat.classList.contains("woman"))
              return { ...temp };
            if (!student.woman && clickedSeat.classList.contains("woman"))
              return { ...temp };

            existItems.forEach((item) => {
              if (item.innerText === student.name) {
                item.style.backgroundColor = "#ffffff";
                item.innerText = item.getAttribute("id").slice(6);
              }
            });

            //임시 학생이 뽑혀있는 경우에만 해당 칸에 이름 넣기
            if (Object.keys(student).length !== 0) {
              clickedSeat.innerText = student.name;
              clickedSeat.style.backgroundColor = "#d4e8dcbd";
            }

            return { ...temp };
          });
        }

        return [...prev];
      });
    }
  };

  const errorSwal = (text) => {
    Swal.fire({
      icon: "error",
      title: "뽑기 실패",
      text: text,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });
  };

  const selectedSwal = (num, name) => {
    // Math.random() *
    let randomImgNum = Math.floor(Math.random() * imageUrls.length);
    let backdropUrl =
      process.env.PUBLIC_URL + `/gif/${imageUrls[randomImgNum]}.gif`;

    Swal.fire({
      title: `${num}번 ${name}`,
      width: 600,
      padding: "3em",
      color: "#312b76",
      background: `#fff`,
      backdrop: `
        #00087ba1
            url(${backdropUrl})
            left top
            no-repeat
          `,
      timer: 3000,
    });
  };

  //뽑기 버튼 누르면 실행되는 전체 흐름
  const randomPickHandler = (isWoman) => {
    if (!selectSeatCheck()) {
      errorSwal(`뽑힌 "${tempStudent.name}" 학생의 자리를 선택해주세요!`);
      return false;
    }
    // 전체뽑기가 아닌 경우에만
    if (isWoman === true || isWoman === false) {
      if (!randomIsPossible(isWoman)) {
        //기존 숫자 로직
        // setStartNum(students[0].num);
        // setEndNum(students[0].num);
        // errorSwal("범위의 모든 학생이 뽑혔어요! 범위를 새로 설정해주세요!");

        //여뽑기 혹은 남뽑기로 불가능한 경우
        errorSwal(`모든 ${isWoman ? "여" : "남"}학생이 뽑혔어요! `);

        return false;
      }
    }

    randomSeatHandler(isWoman);
  };

  //알아서 뽑고 알아서 자리에 넣어주는 함수
  const pickAndSeatHandler = (isWoman) => {
    const randomNum = (b) => {
      return Math.floor(Math.random() * Number(b));
    };

    //자리결정해서 이름 넣기 함수
    const seatHandler = (name, isWoman) => {
      //혹시 비밀자료로 이미 선점된 학생이면 해당 자리에 바로 넣기
      let isDone = false;
      props.secretSeat?.students?.forEach((std, index) => {
        if (std === name) {
          let seat = document.getElementById(`table-${index + 1}`);
          seat.innerText = name;
          seat.style.backgroundColor = "#d4e8dcbd";
          isDone = true;
        }
      });
      //기존자리 정해진 학생이고 자리 정해서 넣었으면
      if (isDone) return;

      //빈자리 뺀 자리만 넣어주기
      let existItems = [];
      document.querySelectorAll(".item").forEach((item) => {
        if (!item.classList.contains("empty")) {
          existItems.push(item);
        }
      });
      let new_existItems = [];
      //전체뽑기가 아니면 각 성별 자리만 모아줌
      if (isWoman !== "all") {
        existItems.forEach((item) => {
          if (isWoman) {
            if (item.classList.contains("woman")) {
              new_existItems.push(item);
            }
          } else if (!isWoman) {
            if (!item.classList.contains("woman")) {
              new_existItems.push(item);
            }
          }
        });
        existItems = new_existItems;
      }
      // 만약... isWoman이 treu, false 하나면.. 남은 자리를 변경하기!

      let leftSeats = [];

      //아직 학생 없는 숫자만 있는 자리들
      existItems.forEach((item) => {
        // 혹시 비밀자료로.. 미리 선점된 자리가 있으면 그거 제외하고 고르기(id는 1부터 시작)
        let itemIndex = +item.id.split("-")[1];
        if (
          props.secretSeat &&
          isNaN(+props.secretSeat?.students?.[itemIndex - 1])
        )
          return;

        //자리가 아직 숫자면
        if (!isNaN(+item.innerText)) {
          leftSeats.push(item);
        }
      });
      //랜덤으로 하나 골라서 이름 넣기
      let randomSeat = leftSeats[randomNum(leftSeats.length)];
      randomSeat.innerText = name;
      randomSeat.style.backgroundColor = "#d4e8dcbd";
    };

    //뽑힌 모든 학생의 자리가 결정되었으면 새로 학생뽑고
    if (selectSeatCheck()) {
      //번호 범위에서 가능하지 않으면
      // 전체뽑기가 아닌 경우에만
      if (isWoman === true || isWoman === false) {
        if (!randomIsPossible(isWoman)) {
          errorSwal(`모든 ${isWoman ? "여" : "남"}학생이 뽑혔어요! `);

          return false;
        }
      }

      //학생 뽑아서 temp에 저장함
      randomSeatHandler(isWoman);

      setTempStudent((prev) => {
        seatHandler(prev.name, isWoman);
        return { ...prev };
      });
    }
  };

  //자리표 저장함수
  const saveSeatsHandler = async () => {
    let items_students = [];
    let selectedSeats = 0;
    document
      .getElementById(
        props.title?.length > 0 ? `items-${props.title}-div` : "items-div"
      )
      .childNodes.forEach((item) => {
        if (isNaN(+item.innerText)) {
          selectedSeats += 1;
        }
        items_students.push(item.innerText);
      });

    //새로운 자료 저장할 때 아직 자리 배치 안한 경우
    if (
      selectedSeats !== props.students.length &&
      props.isExist === undefined
    ) {
      saveErrorSwal("마지막으로 뽑힌 학생의 자리를 배치해주세요.");

      return;
    }
    // console.log(items_students);
    // console.log(props.rowColumn);
    const title = document.getElementById(
      !props.title ? "title-input" : `title-input${props.title}`
    );
    if (title.value.trim().length === 0) {
      saveErrorSwal("제목을 입력해주세요.");

      return;
    }

    //하루에 최대 5개까지만 저장 가능함.
    let saved_today = 0;
    let saved_month = 0;
    //새로운 자료면 오늘날짜, 기존 자료면 기존 날짜로 저장
    let today_yyyymmdd = !props.title
      ? getDateHandler(new Date())
      : props.saveDate.slice(0, 10);

    seatLists?.forEach((list) => {
      //날짜가 같은 경우
      if (list.saveDate.slice(0, 10) === today_yyyymmdd)
        return (saved_today += 1);
      //월이 같은 경우
      if (list.saveDate.slice(0, 7) === today_yyyymmdd.slice(0, 7))
        return (saved_month += 1);
    });

    //기존자료가 아니고
    if (saved_today >= 5 && props.isExist === undefined) {
      saveErrorSwal(
        `하루에 최대 5개 까지만 자리표 저장이 가능해요! 불필요한 자료가 있다면 삭제해주세요!`
      );
      return;
    }

    if (saved_month >= 10 && props.isExist === undefined) {
      saveErrorSwal(
        `한 달에 최대 10개 까지만 자리표 저장이 가능해요! 불필요한 자료가 있다면 삭제해주세요!`
      );
      return;
    }

    const data = {
      students: items_students,
      title: title.value,
      rowColumn: props.rowColumn,
      saveDate: today_yyyymmdd + title.value,
    };

    // 전담인경우 학급명을 추가해서 저장.
    if (props.nowClassName) {
      data["clName"] = props.nowClassName;
    }

    Swal.fire({
      icon: "success",
      title: "저장완료",
      text: `${title.value} 자리표가 저장되었어요.`,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      timer: 5000,
    });

    const existRef = doc(dbService, "seats", props.userUid);
    let new_allSeats = [...allSeats];
    //기존자료면 업데이트
    if (props.isExist) {
      //기존자료 자리만 변경후 저장이면(제목이 바뀌면 새로운 자료로 취급)
      const existData = new_allSeats?.filter(
        (seat) => seat.saveDate === data.saveDate
      );
      if (existData.length > 0) {
        //기존 자료를 제거하고
        new_allSeats = new_allSeats?.filter(
          (seat) => seat.saveDate !== data.saveDate
        );
        // 제목이 바뀌어서 복사본일 경우, 기존 자료의 인풋창의 내용을 기존에 받아온 item.title 값으로 넣어줌.
      } else {
        title.value = props.title;
      }
      //새 자료 추가하기
      new_allSeats.push(data);

      //현재학년도 세팅
      let now_year = data.saveDate.slice(0, 4);
      let now_month = data.saveDate.slice(5, 7);
      if (+now_month <= 1) {
        now_year = String(+now_year - 1);
      }
      props.changeData(now_year);
      //새로운 자리표 추가 중이면
    } else {
      new_allSeats.push(data);
    }
    setAllSeats([...new_allSeats]);
    await setDoc(existRef, { seats_data: new_allSeats });

    //만약 새로운 자료 추가인 경우 처음화면으로 되돌아가기
    if (props.title === undefined) {
      props.addNewCancel();
    }
  };

  //자리표 데이터 삭제 함수
  const delteSeatsHandler = () => {
    const deleteDocHandler = async () => {
      let new_allSeats = allSeats?.filter(
        (seat) => seat.saveDate !== props.saveDate
      );
      setAllSeats([...new_allSeats]);
      await setDoc(doc(dbService, "seats", props.userUid), {
        seats_data: new_allSeats,
      });
      //현재학년도 세팅
      let now_year = props.saveDate.slice(0, 4);
      let now_month = props.saveDate.slice(5, 7);
      if (+now_month <= 1) {
        now_year = String(+now_year - 1);
      }
      props.changeData(now_year);
    };

    Swal.fire({
      icon: "question",
      title: "삭제할까요?",
      text: `저장된 자리표 데이터를 삭제할까요?.`,
      showDenyButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteDocHandler();
      }
    });
  };

  //학생들 성별에 따라 배경 색 바꿔주기 함수
  const coloringGender = () => {
    let existItems = document.querySelectorAll(".item");
    //학생 이름이 들어가 있는 자리들
    existItems.forEach((item) => {
      if (!isNaN(+item.innerText)) {
        return false;
      } else {
        //여학생이면
        if (
          props.students?.filter((stu) => stu.name === item.innerText)[0].woman
        ) {
          item.style.backgroundColor = "#dcc32985";
        } else {
          item.style.backgroundColor = "#ffffff";
        }
      }
    });
  };

  useEffect(() => {
    let timer;
    if (students.length > 0) {
      //한번에 모든 학생 뽑는 로직이면.. gender면 한 성별 먼저 다 뽑기 mix면 1번부터 그냥 성별 상관없이 쭉
      if (pickSeatAll === "gender") {
        //이전에 뽑힌 학생성별 계속 뽑기
        timer = setTimeout(() => {
          pickAndSeat("gender", tempStudent.woman);
        }, 3500);
        // 성별 상관없이 1번부터 쭉 뽑을 경우
      } else if (pickSeatAll === "mix") {
        timer = setTimeout(() => {
          pickAndSeat("mix", "all");
        }, 3500);
      }

      // 학생이 다 뽑히고 나면 pickSeatAll 설정 초기화
      // 남, 여 학생 성별에 따라 색 다르게 보여주기
    } else {
      setPickSeatAll("");
    }

    return () => clearTimeout(timer);
  }, [students]);

  //넣어준 성별의 학생 뽑아서(없으면 반대성별뽑아서) temp에 저장함 consider = gender, mix  isWoman = true false
  const pickAndSeat = (consider, isWoman) => {
    //빈자리 뺀 자리만 넣어주기
    let existItems = [];
    document.querySelectorAll(".item").forEach((item) => {
      if (!item.classList.contains("empty")) {
        existItems.push(item);
      }
    });

    //각 옵션 자리 중에서 안에 숫자가 들어있는 첫번째 꺼 고르는 함수
    const getLeftFirstSeat = (isWoman) => {
      let new_existItems = [];

      existItems.forEach((item) => {
        if (isWoman === "all") {
          if (!isNaN(+item.innerText)) {
            new_existItems.push(item);
            return false;
          }
        } else if (isWoman === true) {
          if (item.classList.contains("woman") && !isNaN(+item.innerText)) {
            new_existItems.push(item);
            return false;
          }
        } else if (!isWoman) {
          if (!item.classList.contains("woman") && !isNaN(+item.innerText)) {
            new_existItems.push(item);
            return false;
          }
        }
      });

      return new_existItems[0];
    };

    //숫자가 가장 작은 빈자리에 이름 넣기인데 consider = gender면... isWoman 속성에 따라 남은 자리 중에 해당 성별 자리 고르기, consider = mix 면 그냥 남은 자리 중 처음꺼.

    //아직 학생 없는 숫자만 있는 자리들 중에 consider가 mix 면
    let firstSeat;

    const seatHandler = (name) => {
      firstSeat.innerText = name;
      firstSeat.style.backgroundColor = "#d4e8dcbd";
    };

    let isSecretNameExist = false;
    //만약 비밀, 예비자료로 자리에 이미 학생이 세팅되어 있으면.. 바로 넣고 함수 종료하기! ()

    if (props.secretSeat) {
      if (isWoman === "all") {
        firstSeat = getLeftFirstSeat(isWoman);
      } else if (isWoman === true || isWoman === false) {
        if (randomIsPossible(isWoman)) {
          firstSeat = getLeftFirstSeat(isWoman);
        } else {
          firstSeat = getLeftFirstSeat(!isWoman);
        }
      }
      //가장 앞자리 골라서 이름 넣기
      //비밀자료 index+1에서 해당 값이 가장 앞자리의 innerText에..
      props.secretSeat?.students?.forEach((stdNameOrNum, index) => {
        //비밀자료의 인덱스와 현재 자리의 인덱스가 같고 비밀자리표의 현재자리가 사람이름이면 자리에 이름 넣어주고,
        if (index + 1 === +firstSeat.id.split("-")[1] && isNaN(+stdNameOrNum)) {
          //비밀자료의 인덱스와 현재 자리가 일치하면, 이름 넣어줌
          firstSeat.innerText = stdNameOrNum;
          firstSeat.style.backgroundColor = "#d4e8dcbd";
          //이름이 일치하면 함수 뒷부분 실행하지 않음.
          isSecretNameExist = true;

          setTempBeforeName(stdNameOrNum);
          let selectedStudent = {};
          let new_students = [...students];
          new_students = new_students?.filter((stu) => {
            if (stu.name === stdNameOrNum) {
              selectedStudent = { ...stu };
            }
            return stu.name !== stdNameOrNum;
          });

          selectedSwal(selectedStudent.num, selectedStudent.name);

          setStudents([...new_students]);
          setTempStudent({ ...selectedStudent });
          // seatHandler(selectedStudent.name);
          return;
        } else {
        }
      });
    }

    if (isSecretNameExist) return;

    // 한성별 쭉일경우
    let selecStu;
    if (isWoman === true || isWoman === false) {
      if (randomIsPossible(isWoman)) {
        firstSeat = getLeftFirstSeat(isWoman);
        selecStu = randomSeatHandler(isWoman);
      } else {
        firstSeat = getLeftFirstSeat(!isWoman);
        selecStu = randomSeatHandler(!isWoman);
      }
      // 1번부터 쭉일경우
    } else if (isWoman === "all") {
      //남은 자리 중 처음자리의 성별을 알아낸 후, woman이 있으면 여자 뽑고, 없으면 남자 뽑기
      firstSeat = getLeftFirstSeat("all");
      if (firstSeat.classList.contains("woman")) {
        firstSeat = getLeftFirstSeat(true);
        randomSeatHandler(true);
      } else {
        firstSeat = getLeftFirstSeat(false);
        randomSeatHandler(false);
      }
    }
    //자리에 넣음
    setTempStudent((prev) => {
      seatHandler(prev.name);
      return { ...prev };
    });

    return selecStu;
  };

  //자리까지 뽑는데 계속 이어서 한 번만 클릭하면 모두 뽑히는 함수
  const randomAllHandler = (consider, isWoman) => {
    //consider가 gender면 남/여 학생 번갈아 뽑아서 남은 자리의 번호 순서대로 쭉 남은 학생이 없을 때까지 반복함.

    //남자먼저 혹은 여자먼저 다 뽑기
    if (consider === "gender") {
      //여기서 한번 뽑아두고, useEffect로 students 변화를 받아서, pickSeatAll state가 gender 혹은 mix면.. 학생을 뽑고 앉히는걸 시킴 => sudents 줄어듬 => useEffect실행됨 => 반복..

      pickAndSeat("gender", isWoman);
    } else if (consider === "mix") {
      pickAndSeat("mix", "all");
    }
  };

  //자리표 보는 기준 바꾸는 함수
  const changeSeeFromHandler = () => {
    //기존에 버튼을 눌렀던 적이 없으면 새롭게 itemsFromt를 만들고 아니면 seeFromBack만 바꾸기
    if (!itemsFront) {
      let items_students = [];

      document
        .getElementById(`items-${props.title}-div`)
        .childNodes.forEach((item) => {
          items_students.unshift(item.innerText);
        });

      // console.log(items_students);
      // console.log(props.rowColumn);

      let data_month;
      let data_year;
      let dataYear_students;
      //학생 자료 받아와서.. 성별 넣어주기
      data_month = props.saveDate.slice(5, 7);
      data_year = props.saveDate.slice(0, 4);
      //학년도 세팅한 후에 (1월까지)
      if (+data_month <= 1) {
        data_year = String(+data_year - 1);
      }
      //받아온 전체 학생 자료에서 현재 학년도 학생 자료만 만들어 주기
      dataYear_students = props?.wholeStudents?.filter(
        (yearStd) => Object.keys(yearStd)[0] === data_year
      )?.[0]?.[data_year];

      if (props.clName) {
        dataYear_students = dataYear_students?.filter(
          (cl) => Object.keys(cl)[0] === props.clName
        )?.[0]?.[props.clName];
      }
      // console.log(dataYear_students);

      setItemsFront(
        items_students?.map((stu, index) => (
          <div
            key={`table-${stu}`}
            className={`${classes["item"]} item ${
              classes[
                dataYear_students?.filter(
                  (student) => student.name === stu
                )?.[0]?.woman && "existWoman"
              ]
            }`}
            id={`table-${props.title}-${index + 1}`}
            onClick={(e) => itemAddStudentHandler(e)}
          >
            {" "}
            {stu}{" "}
          </div>
        ))
      );

      document
        .getElementById(props.title)
        .style.setProperty("--columns", tableColumn);
      document
        .getElementById(props.title)
        .style.setProperty("--rows", tableRow);
    }

    setSeeFromBack((prev) => !prev);
  };

  //비밀 저장함수..(이어하기) 다 안뽑혀도 저장 가능함.
  const secretSaveHandler = async () => {
    if (props.isExist) return;

    Swal.fire({
      icon: "warning",
      title: "저장 확인",
      text: `예시자료로 저장하시겠어요? (기존 예시자료가 있으면 덮어쓰기 됩니다.)`,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: true,
      denyButtonText: "취소",
    }).then((result) => {
      //저장 계속 진행하면
      if (result.isConfirmed) {
        savingSecretData();
      } else {
        return;
      }
    });

    const savingSecretData = async () => {
      let items_students = [];
      let items_gender = [];

      document
        .getElementById(
          props.title?.length > 0 ? `items-${props.title}-div` : "items-div"
        )
        .childNodes.forEach((item) => {
          items_students.push(item.innerText);
          let genEmpty = "";
          if (item.classList.contains("empty")) {
            genEmpty = "empty";
          } else if (item.classList.contains("woman")) {
            genEmpty = "woman";
          }
          items_gender.push(genEmpty);
        });

      const data = {
        students: items_students,
        title: "-*-예시자료-*-",
        rowColumn: tableRow + "-" + tableColumn,
        saveDate: dayjs().format("YYYY-MM-DD"),
        genderEmptySeat: items_gender,
      };

      // 전담인경우 학급명을 추가해서 저장.
      if (props.nowClassName) {
        data["clName"] = props.nowClassName;
      }

      Swal.fire({
        icon: "success",
        title: "저장완료",
        text: `비밀저장(예시자리표) 가 저장되었어요.`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });

      const existRef = doc(dbService, "seats", props.userUid);
      let new_allSeats = [...allSeats];
      // 일단 비밀저장할 경우.. 기존 예시자료 지우고, 추가함
      new_allSeats = new_allSeats.filter(
        (seat) => seat.title !== "-*-예시자료-*-"
      );
      new_allSeats.push(data);

      setAllSeats([...new_allSeats]);
      await setDoc(existRef, { seats_data: new_allSeats });

      //처음화면으로 되돌아가기
      props.addNewCancel();
    };
  };

  return (
    <div id={props.title || "newSeats"}>
      {genderEmptySeat && (
        <button className={classes["secret"]} onClick={secretSaveHandler}>
          비밀버튼
        </button>
      )}
      {/* 자리뽑기 끝이면 보여지는 부분 */}
      {students.length === 0 && (
        <div className={classes["title-div"]}>
          {/* 전담의 경우 반 정보 보여주기 */}
          {props.clName && (
            <span className={classes["clname-span"]}>{props.clName}</span>
          )}
          {/* 제목 입력창 */}
          <input
            className={classes["title-input"]}
            id={`title-input${props.title || ""}`}
            type="text"
            placeholder={"제목"}
            defaultValue={props.title || ""}
          />

          <Button
            name={"저장"}
            onclick={() => {
              if (!seeFromBack) {
                saveErrorSwal(
                  "학생기준 보기 (칠판이 화면 위쪽에 있는 상태) 에서만 저장이 가능합니다!"
                );
                return;
              }
              saveSeatsHandler();
            }}
            className={"settingSeat-btn"}
          />
          {props.title?.length > 0 && (
            <>
              <Button
                name={"삭제"}
                onclick={() => delteSeatsHandler()}
                className={"settingSeat-btn"}
              />
            </>
          )}
        </div>
      )}

      {/* 기존자리에서 보일 설명 */}
      {props.title?.length > 0 && (
        <div>
          <div>
            <p>* 자리만 바꾸시면 수정하여 저장됩니다.</p>
            <p>* 제목을 변경하고 저장하시면 새로 저장됩니다.</p>
          </div>

          {/* 교사기준, 학생기준보기 변경 버튼 */}
          <div>
            <Button
              name={seeFromBack ? "교사기준" : "학생기준"}
              onclick={changeSeeFromHandler}
              className={"settingSeat-btn"}
            />
          </div>
        </div>
      )}

      {!props.isExist && (
        <button
          className={classes["seatsAdd-btn"]}
          onClick={() => {
            props.addNewCancel();
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}

      {/* 자리에 성별 세팅할 때 보여주는 설명, 버튼 */}
      {!genderEmptySeat && (
        <>
          <p>
            {" "}
            <button className={classes["op1"]}></button> &nbsp;남
            &nbsp;&nbsp;&nbsp; <button className={classes["op2"]}></button>
            &nbsp; 여 &nbsp;&nbsp;&nbsp;{" "}
            <button className={classes["op3"]}></button>&nbsp; 빈자리
            <br />
            👉 자리클릭 시 변경
          </p>
          {/* 일치하면 자리성별 세팅완료 버튼 나옴 */}
          {nowSeatGender?.[0] ===
            students?.filter((std) => !std.woman)?.length &&
          nowSeatGender?.[1] === students?.filter((std) => std.woman)?.length &&
          +nowSeatGender?.[0] + +nowSeatGender?.[1] === students?.length ? (
            <Button
              name={"자리 성별세팅 완료"}
              onclick={() => setGenderEmptySeat(true)}
              className={"settingSeat-btn"}
            />
          ) : (
            <>
              <p>
                남학생 <b>{students?.filter((std) => !std.woman)?.length}</b>
                &nbsp;&nbsp;&nbsp; 여학생{" "}
                <b>{students?.filter((std) => std.woman)?.length}</b>
                &nbsp;&nbsp;&nbsp; 전체학생 <b>{students?.length}</b>
              </p>
              <p>
                남학생 자리 <b>{nowSeatGender?.[0] || students?.length}</b>
                &nbsp;&nbsp;&nbsp; 여학생 자리 <b>{nowSeatGender?.[1] || 0}</b>
                &nbsp;&nbsp;&nbsp; 전체 자리&nbsp;
                <b>{+nowSeatGender?.[0] + +nowSeatGender?.[1]}</b>
              </p>
            </>
          )}
        </>
      )}

      {genderEmptySeat && (
        <>
          {/* 자리뽑기가 진짜 시작되면 보여지는 자리 위 세팅 부분 */}
          <div className={classes["mt--25"]}>
            {students.length > 0 ? (
              <>
                남은학생 ({students.length})
                <div className={classes["remain-student-div"]}>
                  {students?.map((stu) => (
                    <span
                      key={stu.name}
                      className={classes["remain-student"]}
                      onClick={() => {
                        //선택한 학생의 자리 배치 확인
                        if (!selectSeatCheck()) {
                          errorSwal(
                            `뽑힌 "${tempStudent.name}" 학생의 자리를 선택해주세요!`
                          );
                          return false;
                        }
                        let new_students = [...students];
                        setStudents([
                          ...new_students?.filter(
                            (student) => +student.num !== +stu.num
                          ),
                        ]);
                        setTempStudent(stu);
                      }}
                    >
                      {stu.num}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className={classes["remain-student-div"]}>
                {props.title ? (
                  ""
                ) : (
                  <>
                    <p>자리뽑기가 끝났어요!</p>
                    <p>
                      <Button
                        name={"여학생 자리만 색칠하기"}
                        onclick={coloringGender}
                        className={"settingSeat-btn"}
                      />
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {students.length > 0 && (
            <>
              <div className={classes["remain-student-div"]}>
                <div className={classes["randomPickBtn-div"]}>
                  누구랑&nbsp;
                  <Button
                    id="newPairBtn"
                    onclick={() => {
                      setIsNewPair(true);
                    }}
                    className={
                      isNewPair
                        ? `switch-random-btn-selected`
                        : `switch-random-btn`
                    }
                    name={"새로운짝"}
                  />
                  <Button
                    id="newPairBtn"
                    onclick={() => {
                      setIsNewPair(false);
                    }}
                    className={
                      !isNewPair
                        ? `switch-random-btn-selected`
                        : `switch-random-btn`
                    }
                    name={"인생랜덤"}
                  />
                </div>

                <div className={`${classes["randomPickBtn-div"]}`}>
                  어떻게&nbsp;
                  <Button
                    id="justStudent"
                    onclick={() => {
                      setRandomJustStudent(true);
                    }}
                    className={
                      randomJustStudent
                        ? `switch-random-btn-selected`
                        : `switch-random-btn`
                    }
                    name={"학생만"}
                  />
                  <Button
                    id="stuPlusSeat"
                    onclick={() => {
                      setRandomJustStudent(false);
                    }}
                    className={
                      !randomJustStudent
                        ? `switch-random-btn-selected`
                        : `switch-random-btn`
                    }
                    name={"학생+자리"}
                  />
                </div>
              </div>
              <div className={classes["remain-student-div"]}>
                <>
                  <div className={classes["randomPickBtn-div"]}>
                    {!randomJustStudent && "랜덤자리 한명씩"}
                    <Button
                      id="randomWomanPickBtn"
                      onclick={() =>
                        randomJustStudent
                          ? randomPickHandler(true)
                          : pickAndSeatHandler(true)
                      }
                      className={"settingSeat-btn"}
                      name="여학생"
                    />
                    <Button
                      id="randomManPickBtn"
                      onclick={() =>
                        randomJustStudent
                          ? randomPickHandler(false)
                          : pickAndSeatHandler(false)
                      }
                      className={"settingSeat-btn"}
                      name="남학생"
                    />
                    <Button
                      id="randomPickBtn"
                      onclick={() =>
                        randomJustStudent
                          ? randomPickHandler("all")
                          : pickAndSeatHandler("all")
                      }
                      className={"settingSeat-btn"}
                      name="성별랜덤"
                    />
                  </div>

                  {/* 자리까지 뽑기 버전에서만 가능한 전체 뽑기, 1번자리부터 순서대로 들어감! */}
                  {!randomJustStudent && (
                    <div className={classes["randomPickBtn-div"]}>
                      한번에
                      <Button
                        id="randomMan_WoPickBtn"
                        onclick={() => {
                          setPickSeatAll("mix");
                          randomAllHandler("mix", "all");
                        }}
                        className={"settingSeat-btn"}
                        name="1번부터"
                      />
                      <Button
                        id="randomWo_manPickBtn"
                        onclick={() => {
                          setPickSeatAll("gender");
                          randomAllHandler("gender", true);
                        }}
                        className={"settingSeat-btn"}
                        name="여자먼저"
                      />
                      <Button
                        id="randomAllPickBtn"
                        onclick={() => {
                          setPickSeatAll("gender");
                          randomAllHandler("gender", false);
                        }}
                        className={"settingSeat-btn"}
                        name="남자먼저"
                      />
                      {/* <Button
                        id="randomAllPickBtn"
                        onclick={() => {
                          setPickSeatAll("mix");
                          randomAllHandler("mix");
                        }}
                        className={"settingSeat-btn"}
                        name="아무데나"
                      /> */}
                    </div>
                  )}
                </>
              </div>
            </>
          )}

          {students.length > 0 && (
            <div className={classes["temp-name"]}>
              <div>
                <span>✋ </span>
                {tempStudent.name}
              </div>
            </div>
          )}
        </>
      )}

      {/* 초기세팅.. 뒤에서 볼때면 칠판이 자리 뒤에 */}
      {seeFromBack && (
        <div className={classes["blackboard-area"]}>
          <span className={classes["blackboard"]}>칠 판</span>
        </div>
      )}

      <div
        className={classes[`items-container`]}
        id={props.title?.length > 0 ? `items-${props.title}-div` : "items-div"}
      >
        {seeFromBack ? items : itemsFront}
      </div>

      {/* 교사용으로 앞에서 볼때면 칠판이 앞에 */}
      {!seeFromBack && (
        <div className={classes["blackboard-area"]}>
          <span className={classes["blackboard"]}>칠 판</span>
        </div>
      )}
    </div>
  );
};

export default SeatTable;
