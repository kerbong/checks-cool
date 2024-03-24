import React, { useState, useEffect } from "react";
import ManageEach from "./ManageEach";
import dayjs from "dayjs";
import { dbService, storageService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc } from "firebase/firestore";
import { useLocation } from "react-router";
import classes from "./ManageEach.module.css";
import Button from "components/Layout/Button";
import { utils, writeFile } from "xlsx";
import Swal from "sweetalert2";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
} from "firebase/storage";
import { FaCircleCheck, FaDownload } from "react-icons/fa6";

const ManageAttendance = (props) => {
  const [onStudent, setOnStudent] = useState("");
  const [clName, setClName] = useState("");
  const [attends, setAttends] = useState([]);
  const [onAttends, setOnAttends] = useState([]);
  const [showOnAttends, setShowOnAttends] = useState([]);
  const [onAttendsOption, setOnAttendsOption] = useState([]);
  const [showAttendOption, setShowAttendOption] = useState("");
  const [showAttendMonth, setShowAttendMonth] = useState("");
  const [showNoPaper, setShowNoPaper] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteChecked, setDeleteChecked] = useState([]);
  const [uploadDatas, setUploadDatas] = useState({});
  const [attendEdit, setAttendEdit] = useState(null);
  const { state } = useLocation();

  const nowYear = (date) => {
    let data_id = date?.length > 0 ? date : new Date();
    return dayjs(data_id).format("MM-DD") <= "02-15"
      ? String(+dayjs(data_id).format("YYYY") - 1)
      : dayjs(data_id).format("YYYY");
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

  const nowIsSubject = changeSubjectHandler(nowYear());

  //firestore에서 checkLists와 listMemo 둘다 받아서 저장해두기
  const getDatasFromDb = async () => {
    //checkLists 부분, 올해 자료만 저장하기
    setAttends([]);
    let attendRef = doc(dbService, "attend", props.userUid);
    const attendSnap = await getDoc(attendRef);

    //id가 이번학년도 인 자료만 저장해둠.
    onSnapshot(attendRef, (doc) => {
      if (attendSnap.exists()) {
        let newAtdDatas = [];

        doc.data()?.attend_data?.forEach((atd) => {
          if (!atd.id) {
            Object.values(atd)?.[0]?.forEach((clAtd) => {
              newAtdDatas.push({ ...clAtd, clName: Object.keys(atd)?.[0] });
            });
          } else {
            newAtdDatas.push(atd);
          }
        });

        newAtdDatas = newAtdDatas?.filter(
          (data) => nowYear(data.id.slice(0, 10)) === nowYear()
        );

        // //담임이면
        // if (!nowIsSubject) {
        //   new_attend = doc
        //     .data()
        //     ?.attend_data?.filter(
        //       (data) => nowYear(data.id.slice(0, 10)) === nowYear()
        //     );

        //   //전담이면
        // } else {
        //   //풀어서 데이터 넣어주기
        //   doc.data()?.attend_data?.forEach((clData) => {
        //     Object.values(clData)?.[0]?.forEach((attend) => {
        //       // 학급명 추가한 후에 하나씩 넣기
        //       attend.clName = Object.keys(clData)?.[0];
        //       new_attend.push(attend);
        //     });
        //   });
        // }

        setAttends([
          ...newAtdDatas.sort((a, b) =>
            a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1
          ),
        ]);
      }
    });
  };

  useEffect(() => {
    getDatasFromDb();
  }, [props.userUid]);

  //선택된 학생에 따라 정보를 필터해서 보여줌.
  useEffect(() => {
    setDeleteChecked([]);
    const optionSaveHandler = (datas) => {
      //총 정리한 부분에서 option만 따옴
      let new_datasOption = datas?.map((data) => data.option.slice(1));
      setOnAttendsOption(new_datasOption);
    };

    let new_onAttends = [];
    setShowAttendOption("");
    if (onStudent !== "") {
      //담임이면
      if (!nowIsSubject) {
        new_onAttends =
          attends
            ?.filter((attend) => attend.name === onStudent?.split(" ")?.[1])
            ?.sort((a, b) =>
              a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1
            ) || [];
        //전담이면
      } else {
        new_onAttends =
          attends
            ?.filter(
              (attend) =>
                attend.name === onStudent?.split(" ")?.[1] &&
                attend.clName === clName
            )
            ?.sort((a, b) =>
              a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1
            ) || [];
      }

      // 선택된 학생이 없을 경우
    } else {
      //담임이면
      if (!nowIsSubject) {
        new_onAttends = [...attends].sort((a, b) =>
          a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1
        );

        //전담이면
      } else {
        new_onAttends =
          attends
            ?.filter((attend) => attend.clName === clName)
            ?.sort((a, b) =>
              a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1
            ) || [];
      }
    }
    setOnAttends(new_onAttends);
    setShowOnAttends(new_onAttends);
    optionSaveHandler(new_onAttends);
  }, [onStudent, attends, clName]);

  useEffect(() => {
    setShowAttendMonth("");
    setShowAttendOption("");
  }, [clName]);

  useEffect(() => {
    //받아온 정보 { student: 학생번호 이름 , clName: 전담이면 반이름}
    let new_onStudent = state?.student;
    let new_clName = state?.clName;
    if (new_onStudent !== "" && new_onStudent) {
      setOnStudent(new_onStudent);
    }

    if (new_clName !== "") {
      setClName(new_clName);
    }
  }, [state]);

  //선택된 학생 정보  번호 한칸띄우고 이름
  const selectStudentHandler = (studentNumName) => {
    setOnStudent(studentNumName);
  };

  //출결 옵션을 선택하면.. 보여주는 걸 바꿔주기
  useEffect(() => {
    setShowAttendMonth("");
    setShowNoPaper(null);
    //전체보여주는 거면.. 그냥 모두
    if (showAttendOption === "") {
      setShowOnAttends(onAttends);
    } else {
      //월별 자료와 독립적으로 세팅되어야 해서..

      let new_showOnAttends = onAttends?.filter(
        (attend) => attend.option.slice(1) === showAttendOption
      );
      setShowOnAttends(new_showOnAttends);
    }
  }, [showAttendOption]);

  //달을 선택하면.. 보여주는 걸 바꿔주기
  useEffect(() => {
    //요약 자료와 독립적으로 세팅되어야 해서..
    setShowNoPaper(null);
    setShowAttendOption("");

    if (showAttendMonth === "") {
      setShowOnAttends(onAttends);
    } else {
      let new_showOnAttends = onAttends?.filter(
        (attend) => +attend.id.slice(5, 7) === showAttendMonth
      );
      setShowOnAttends(new_showOnAttends);
    }
  }, [showAttendMonth]);

  function sortByName(arr) {
    return arr.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  //서류 미제출 학생 걸러서 반환하는 함수
  const noPaperRequestStd = (arr, isOneCl) => {
    return arr?.filter((attend) => {
      if (isOneCl === "one" && showNoPaper !== attend.name) return false;

      if (isOneCl === "cl" && attend?.clName !== clName) return false;

      let showOn = false;
      // paper속성이 있는데 false인 경우,
      if (attend?.paper !== undefined) {
        if (!attend?.paper) {
          showOn = true;
        }
        // paper속성이 없는데 report 또는 request가 false인 경우
      } else {
        if (!attend?.request || !attend?.report) {
          showOn = true;
        }
      }

      return showOn;
    });
  };

  //서류 미제출 학생을 선택하면.. 보여주는 걸 바꿔주기
  useEffect(() => {
    if (showNoPaper === null) return;
    //설정 안되어 있으면
    setShowAttendMonth("");
    setShowAttendOption("");

    //서류 미제출 학생만 걸러내기
    let new_showOnAttends;

    //특정학생만 보여주기 이면..
    if (showNoPaper !== "") {
      new_showOnAttends = noPaperRequestStd(onAttends, "one");
    } else {
      new_showOnAttends = noPaperRequestStd(onAttends);
    }

    setShowOnAttends(sortByName(new_showOnAttends));
  }, [showNoPaper]);

  //선택되어 있는 학급 (전담의 경우)
  const nowClassNameHandler = (classname) => {
    setClName(classname);
  };

  //엑셀로 저장하기 함수
  const saveExcelHandler = () => {
    function removeLeadingZeros(str) {
      return str.replace(/^0+/, "");
    }

    const returnSheetDatas = (arr, paper) => {
      const new_datas = [];
      let filtered_datas =
        paper !== "paper"
          ? arr?.sort((a, b) =>
              a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1
            )
          : // 미제출 학생들만 모으는 거면
            sortByName(
              noPaperRequestStd(
                arr?.sort((a, b) =>
                  a.id.slice(0, 10) > b.id.slice(0, 10) ? 1 : -1
                )
              )
            );

      filtered_datas?.forEach((atd) => {
        let data = [
          +atd.num,
          atd.name,
          `${removeLeadingZeros(atd.id.slice(5, 7))}월`,
          `${removeLeadingZeros(atd.id.slice(8, 10))}일`,

          atd?.paper === undefined ? "-" : atd?.paper ? "제출" : "미제출",
          atd?.request === undefined ? "-" : atd?.request ? "제출" : "미제출",
          atd?.report === undefined ? "-" : atd?.report ? "제출" : "미제출",
          atd.option.slice(1),
          atd.note,
        ];
        if (nowIsSubject) {
          data.unshift(atd.clName);
        }
        new_datas.push(data);
      });

      if (!nowIsSubject) {
        new_datas.unshift([
          "번호",
          "이름",
          "날짜(월)",
          "날짜(일)",
          "서류제출",
          "신청서제출",
          "보고서제출",
          "출결옵션",
          "비고",
        ]);
      } else {
        new_datas.unshift([
          "반",
          "번호",
          "이름",
          "날짜(월)",
          "날짜(일)",
          "서류제출",
          "신청서제출",
          "보고서제출",
          "출결옵션",
          "비고",
        ]);
      }
      return new_datas;
    };

    const all_datas = returnSheetDatas(attends);

    //새로운 가상 엑셀파일 생성
    const book = utils.book_new();
    const attend_datas = utils.aoa_to_sheet(all_datas);
    //셀의 넓이 지정
    attend_datas["!cols"] = [
      { wpx: 30 },
      { wpx: 60 },
      { wpx: 50 },
      { wpx: 50 },
      { wpx: 60 },
      { wpx: 60 },
      { wpx: 60 },
      { wpx: 60 },
      { wpx: 100 },
    ];
    if (nowIsSubject) {
      attend_datas["!cols"].unshift({ wpx: 30 });
    }

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, attend_datas, "출결기록");

    //서류 미제출 학생만 따로 시트 만들기!!!

    const no_paper_datas = returnSheetDatas(attends, "paper");

    //
    const attend_nopaper_datas = utils.aoa_to_sheet(no_paper_datas);
    //셀의 넓이 지정
    attend_nopaper_datas["!cols"] = [
      { wpx: 30 },
      { wpx: 60 },
      { wpx: 50 },
      { wpx: 50 },
      { wpx: 60 },
      { wpx: 60 },
      { wpx: 100 },
    ];
    if (nowIsSubject) {
      attend_nopaper_datas["!cols"].unshift({ wpx: 30 });
    }

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, attend_nopaper_datas, "미제출");

    writeFile(
      book,
      `${nowYear()}학년도 출결기록(${dayjs().format("YYYY-MM-DD")}).xlsx`
    );
  };

  const upload_data = async (fixed_data) => {
    let attendRef = doc(dbService, "attend", props.userUid);
    await setDoc(attendRef, fixed_data);
  };

  useEffect(() => {
    setDeleteChecked([]);
    if (Object.keys(uploadDatas)?.length === 0) return;
    upload_data(uploadDatas);
  }, [uploadDatas]);

  //삭제함수
  const deleteHandler = async (allOrChecked) => {
    if (allOrChecked !== "all" && deleteChecked?.length === 0) return;
    if (onAttends?.length === 0) return;

    let new_del_ids = [...deleteChecked];
    let new_attends = [...attends];
    // 삭제하는 실제함수
    const deleteAttend = async (allOrChecked) => {
      // 전체 정보 받아오고, deleteChecked 있는거 제외해서 자료로 만들고 firebase저장 및 attends 상태에 저장.
      if (allOrChecked === "all") {
        new_attends = [];
        attends?.forEach((attend) => {
          if (attend.name !== onStudent?.split(" ")?.[1]) {
            new_attends.push(attend);
          } else {
            new_del_ids.push(attend.id);
          }
        });

        // 만약 특정 선택된 것들만 제거일 경우...
      } else {
        // deleteChecked에는 id만 저장되어 있음.
        new_attends = new_attends?.filter(
          (attend) => !deleteChecked.includes(attend.id)
        );
      }

      //혹시 storage에 저장된 해당날짜의 데이터 있으면 그것도 삭제하기
      try {
        new_del_ids?.forEach((del_id) => {
          let folder = `${props.userUid}/attend/${del_id}`;
          const listRef = ref(storageService, folder);

          listAll(listRef).then((res) => {
            res.items.forEach(async (itemRef) => {
              await deleteObject(
                ref(storageService, itemRef["_location"]["path"])
              );
            });
          });
        });
      } catch (error) {
        console.log(error);
      }

      //담임이면 바로 firestore에 업로드 가능해서, 전담만 추가 조절
      const fixed_data = { attend_data: new_attends };
      // console.log(fixed_data);
      setUploadDatas(fixed_data);

      // 상태 함수도.. 수정해줘야함..! setShowOnAttends랑 setOnAttends에는 onAttends에서 deletedChecked 제외한거 넣어주고,
    };

    //전체삭제인 경우
    if (allOrChecked === "all") {
      Swal.fire({
        icon: "warning",
        title: "전체 삭제할까요?",
        text: `${
          onStudent?.split(" ")?.[1]
        } 학생의 출결 기록을 모두 삭제할까요? 삭제 후에는 기록을 복구할 수 없습니다. 신중히 선택해주세요!`,
        confirmButtonText: "삭제",
        confirmButtonColor: "#85bd82",
        denyButtonText: "취소",
        showDenyButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Swal.fire("개발중", "기능 개발중입니다...", "info");
          setShowDelete(false);
          await deleteAttend("all");
        } else {
          return;
        }
      });
      //선택삭제인 경우
    } else {
      Swal.fire({
        icon: "warning",
        title: "선택 삭제할까요?",
        text: `${
          onStudent?.split(" ")?.[1]
        } 학생의 선택된 출결 기록을 삭제할까요? 삭제 후에는 기록을 복구할 수 없습니다. 신중히 선택해주세요!`,
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        denyButtonText: "취소",
        showDenyButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Swal.fire("개발중", "기능 개발중입니다...", "info");
          setShowDelete(false);

          await deleteAttend("checked");
        } else {
          return;
        }
      });
    }
  };

  //각 listMemo클릭하면 저장해두는 함수
  const deleteCheckedHandler = (atd) => {
    //기존에 존재하면 isExist true, 없었으면 false

    let isExist =
      deleteChecked?.filter((checked) => checked === atd.id)?.length > 0
        ? true
        : false;
    let new_data = [...deleteChecked];
    //같은게 있으면 제거해주고
    if (isExist) {
      new_data = new_data?.filter((checked) => checked !== atd.id);
      //새로운 거면 추가해주기
    } else {
      new_data?.push(atd.id);
    }
    setDeleteChecked(new_data);
  };

  //출결 수정 함수
  const attendHandler = async (what) => {
    // 서류 클릭했으면... 해당 자료의 서류 상태를 변경해서 저장
    if (what !== "delete") {
      let new_attends = [...attends];

      new_attends = new_attends?.map((attend) => {
        let new_attend = attend;
        if (attend.id === attendEdit.id) {
          new_attend[what] = !new_attend?.[what];
        }
        return new_attend;
      });

      const fixed_data = { attend_data: new_attends };
      setUploadDatas(fixed_data);
    } else if (what === "delete") {
      Swal.fire({
        title: "자료 삭제 확인",
        text: "출결 자료를 정말 삭제할까요? 삭제한 자료는 복구할 수 없습니다.",
        icon: "warning",
        confirmButtonText: "삭제",
        denyButtonText: "취소",
        showDenyButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setAttendEdit(null);
          let new_attends = [...attends];

          new_attends = new_attends?.filter(
            (attend) => attend.id !== attendEdit.id
          );

          // storage에서 있으면.. 삭제해야함.
          //혹시 storage에 저장된 해당날짜의 데이터 있으면 그것도 삭제하기
          try {
            let folder = `${props.userUid}/attend/${attendEdit.id}`;
            const listRef = ref(storageService, folder);

            listAll(listRef).then((res) => {
              res.items.forEach(async (itemRef) => {
                await deleteObject(
                  ref(storageService, itemRef["_location"]["path"])
                );
              });
            });
          } catch (error) {
            console.log(error);
          }

          const fixed_data = { attend_data: new_attends };
          // console.log(fixed_data);
          setUploadDatas(fixed_data);
        }
      });
    }
  };

  /** url과 파일 이름을 전달하면 다운받는 함수 */
  function handleFileDownload(downloadUrl, down_fileName) {
    fetch(downloadUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = down_fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        // 에러 처리
      });
  }

  const info_down = () => {
    Swal.fire(
      "다운로드중...",
      "모든 파일을 다운받고 있습니다. 해당 파일이 다운로드 되는 폴더는 기기/브라우저 설정마다 다를 수 있으니 확인해주세요! 문제가 지속될 경우 kerbong@gmail.com으로 알려주세요!",
      "info"
    );
  };

  const warn_noPaper = () => {
    Swal.fire(
      "서류 없음",
      "저장된 서류가 존재하지 않아요! 로그인 하신 계정을 확인해주시고, 파일을 업로드 한 것이 맞는지 확인해주세요. 문제가 지속될 경우 kerbong@gmail.com으로 알려주세요!",
      "warning"
    );
  };

  const warn_nonData = () => {
    Swal.fire(
      "서류 없음",
      "해당 날짜에 저장된 서류가 존재하지 않아요! 혹시 여러 날짜의 출결정보(기간으로 입력된) 인 경우, 해당 출결의 가장 처음 날짜에 데이터가 저장됩니다. 문제가 지속될 경우 kerbong@gmail.com으로 알려주세요!",
      "warning"
    );
  };

  /** 신청서나 보고서, 출결 서류 다운로드 하는 함수 */
  const downLoadImg = async (atd, what) => {
    //학생의 이름이 what으로 전달되어서 번호가 있으면
    try {
      let listRef;
      if (what === "all") {
        listRef = ref(storageService, `${props.userUid}/attend/`);

        listAll(listRef)
          .then(async (res) => {
            if (res.prefixes?.length === 0) {
              warn_noPaper();
              return;
            }

            let new_folder_ref;
            //출결 날짜+번호 + 시분  이 있는 출결 폴더
            res.prefixes?.forEach((fold) => {
              new_folder_ref = ref(
                storageService,
                `${props.userUid}/attend/${fold.name}`
              );

              listAll(new_folder_ref)
                .then(async (folder) => {
                  // 만약 데이터가 없으면..
                  if (folder.items?.length === 0) {
                    warn_nonData();
                    return;
                  }

                  info_down();

                  for (const itemRef of folder.items) {
                    const url = await getDownloadURL(
                      ref(storageService, itemRef["_location"]["path"])
                    );

                    if (url) {
                      let fileDateName =
                        itemRef?.fullPath?.split("attend/")?.[1];
                      let fileDate = fileDateName?.slice(0, 10);
                      let fileName = fileDateName?.split("/")?.[1];

                      handleFileDownload(url, fileDate + " " + fileName);
                    }
                  }
                })
                .catch((ref_err) => {
                  console.log(ref_err);
                });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        let now_stdNum = +what?.split(" ")?.[0];

        //현재 학생의 번호가 있는, 해당 학생의 모든 서류 다운 이면..
        if (!isNaN(+now_stdNum)) {
          listRef = ref(storageService, `${props.userUid}/attend/`);

          listAll(listRef)
            .then(async (res) => {
              if (res.prefixes?.length === 0) {
                warn_noPaper();
                return;
              }

              let new_folder_ref;
              let total = 0;
              //출결 날짜+번호 + 시분  이 있는 출결 폴더
              res.prefixes?.forEach((fold) => {
                //번호가 일치하지 않으면 패스..
                if (+fold.name?.split(" ")?.[0]?.slice(10) !== +now_stdNum) {
                  return;
                }

                new_folder_ref = ref(
                  storageService,
                  `${props.userUid}/attend/${fold.name}`
                );

                listAll(new_folder_ref)
                  .then(async (folder) => {
                    // 만약 데이터가 없으면..
                    if (folder.items?.length === 0) {
                      warn_nonData();
                      return;
                    }

                    info_down();

                    for (const itemRef of folder.items) {
                      const url = await getDownloadURL(
                        ref(storageService, itemRef["_location"]["path"])
                      );

                      if (url) {
                        let fileDateName =
                          itemRef?.fullPath?.split("attend/")?.[1];
                        let fileDate = fileDateName?.slice(0, 10);
                        let fileName = fileDateName?.split("/")?.[1];

                        handleFileDownload(url, fileDate + " " + fileName);
                        total += 1;
                      }
                    }
                  })
                  .catch((ref_err) => {
                    console.log(ref_err);
                  });
              });

              if (total === 0) {
                warn_noPaper();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          listRef = ref(storageService, `${props.userUid}/attend/${atd.id}`);

          listAll(listRef)
            .then(async (res) => {
              // 만약 데이터가 없으면..
              if (res.items?.length === 0) {
                warn_nonData();
                return;
              }

              info_down();

              for (const itemRef of res.items) {
                const url = await getDownloadURL(
                  ref(storageService, itemRef["_location"]["path"])
                );

                if (url) {
                  let fileDateName = itemRef?.fullPath?.split("attend/")?.[1];
                  let fileDate = fileDateName?.slice(0, 10);
                  let fileName = fileDateName?.split("/")?.[1];

                  handleFileDownload(url, fileDate + " " + fileName);
                }
              }
            })
            .catch((ref_err) => {
              console.log(ref_err);
            });
        }
      }
    } catch (error) {
      warn_noPaper();
    }
  };

  return (
    <div>
      {/* 학생 보여주는 부분 */}
      <ManageEach
        students={props.students}
        userUid={props.userUid}
        isSubject={props.isSubject}
        selectStudentHandler={selectStudentHandler}
        clName={clName}
        passStudent={onStudent}
        nowClassNameHandler={nowClassNameHandler}
      />

      {/* 학생 출결부분 보여주기 */}
      <ul className={`${classes["bottom-content-ul"]} ${classes["flex-wrap"]}`}>
        {/* 학생이 선택되었으면 */}
        {onStudent && (
          <div>
            <div className={classes["flex-wrap"]}>
              {/* 전체 출결 확인 출결옵션별 횟수 기록 */}
              <li
                className={classes["bottom-content-li"]}
                style={{ minWidth: "200px" }}
              >
                <div
                  className={classes["fs-22-bold"]}
                  style={onAttends?.length !== 0 ? { margin: "15px" } : {}}
                >
                  {onStudent}
                </div>
                {/* 개별학생 자료 다운 */}
                {onAttends?.length !== 0 && (
                  <>
                    <button
                      className={classes["search-btns"]}
                      onClick={() => downLoadImg(undefined, onStudent)}
                      title={`"${onStudent}" 으로 업로드 된 모든 서류를 다운합니다.`}
                      style={{ marginLeft: "15px", fontSize: "0.7rem" }}
                    >
                      <FaDownload /> 서류
                    </button>
                  </>
                )}
                <hr className={classes["margin-15"]} />
                {onAttends?.length === 0 ? (
                  <div
                    className={`${classes["fs-13"]} ${classes["margin-15"]}`}
                  >
                    개근입니다!
                  </div>
                ) : (
                  <div>
                    {/* 전체 버튼 */}
                    <Button
                      key={`whole`}
                      id={`whole`}
                      className={
                        showAttendOption === "" ? "sortBtn-clicked" : "sortBtn"
                      }
                      name={`전체(${onAttendsOption?.length})`}
                      onclick={() => {
                        setShowAttendOption("");
                      }}
                    />
                    {/* 옵션별 버튼 */}
                    {[...new Set(onAttendsOption)]?.map((option) => (
                      <Button
                        key={option}
                        id={option}
                        className={
                          showAttendOption === option
                            ? "sortBtn-clicked"
                            : "sortBtn"
                        }
                        name={`${option} (${
                          onAttendsOption?.filter((op) => op === option).length
                        })`}
                        onclick={() => {
                          setShowAttendOption(option);
                        }}
                      />
                    ))}
                  </div>
                )}
              </li>

              {/* 삭제버튼 모음.. 현재학생의 출결정보가 있을 때만 보여줌. */}
              {onAttends?.length > 0 && !nowIsSubject && (
                <li
                  className={classes["bottom-content-li"]}
                  style={{ minWidth: "100px" }}
                >
                  {/* <div className={classes["fs-9"]}>
                  * 수정은 생기부 페이지를 활용해주세요.
                </div> */}
                  {/* <hr className={classes["margin-15"]} /> */}

                  <div className={classes["flex-d-column"]}>
                    {/* 전체삭제버튼 */}
                    <Button
                      id={"attend-delete"}
                      className={"sortBtn"}
                      name={!showDelete ? "전체삭제" : "확인"}
                      style={{
                        backgroundColor: !showDelete ? "#da9a9a" : "#ff5a70",
                      }}
                      onclick={() => {
                        !showDelete
                          ? deleteHandler("all")
                          : deleteHandler("checked");
                      }}
                    />
                    {/* 삭제버튼 */}
                    <Button
                      id={"attend-delete"}
                      className={"sortBtn"}
                      name={showDelete ? "취소" : "선택삭제"}
                      style={{
                        backgroundColor: showDelete ? "gray" : "#da9a9a",
                      }}
                      onclick={() => {
                        // Swal.fire("개발중", "기능 개발중입니다...", "info");
                        //현재 삭제 가능인테 취소 누른거면.. 다시 비워둠.
                        if (showDelete) {
                          setDeleteChecked([]);
                          setShowDelete(false);
                        } else {
                          setShowDelete(true);
                        }
                      }}
                    />
                  </div>
                </li>
              )}
            </div>
            {showDelete && (
              <p style={{ color: "white" }}>
                * 삭제할 출결자료를 선택하시고 확인을 눌러주세요.
              </p>
            )}
            <div className={classes["btns-div"]} style={{ flexWrap: "wrap" }}>
              {/* 개별 출결기록 */}
              {showOnAttends?.map((attend) => (
                <li
                  key={`${attend.id}${clName ? clName : ""}`}
                  id={attend.id}
                  className={`${classes["bottom-content-li"]} ${
                    deleteChecked?.filter((checked) => checked === attend.id)
                      ?.length > 0
                      ? classes["list-clicked"]
                      : ""
                  }`}
                  onClick={() => {
                    if (!showDelete) {
                      if (attendEdit) {
                        setAttendEdit(null);
                      } else {
                        setAttendEdit(attend);
                      }
                    } else {
                      deleteCheckedHandler(attend);
                    }
                  }}
                  style={{ width: "260px", padding: "25px" }}
                >
                  {/* 출결의 id(yyyy-mm-dd)보여줌 */}
                  <div className={classes["flex-ml-10"]}>
                    {attend.id.slice(0, 10)}
                    {/* 서류 제출/미제출 아이콘 */}
                    {attend?.paper !== undefined && (
                      <span
                        title="업로드 된 서류 다운받기"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!attend?.paper) return;

                          downLoadImg(attend, "서류");
                        }}
                      >
                        {attend.paper ? (
                          <FaCircleCheck
                            size={25}
                            color={"#ff5a71"}
                            margin="0 10px"
                            cursor="help"
                          />
                        ) : (
                          <FaCircleCheck
                            size={25}
                            color={"#cacaca"}
                            margin="0 10px"
                          />
                        )}
                      </span>
                    )}
                    {/* request 신청서  */}
                    {attend?.request !== undefined && (
                      <Button
                        className={
                          attend?.request
                            ? "reqRepSub-btn-s-clicked"
                            : "reqRepSub-btn-s"
                        }
                        name={"신"}
                        title="업로드 된 서류 다운받기"
                        onclick={(e) => {
                          e.stopPropagation();
                          if (!attend?.request) return;
                          downLoadImg(attend, "신청서");
                        }}
                      />
                    )}

                    {/* report 보고서  */}
                    {attend?.report !== undefined && (
                      <Button
                        className={
                          attend?.report
                            ? "reqRepSub-btn-s-clicked"
                            : "reqRepSub-btn-s"
                        }
                        name={"보"}
                        title="업로드 된 서류 다운받기"
                        onclick={(e) => {
                          e.stopPropagation();
                          if (!attend?.report) return;

                          downLoadImg(attend, "보고서");
                        }}
                      />
                    )}
                  </div>
                  {/* 출결옵션 */}
                  <div className={classes["fs-13"]}>
                    {attend.option.slice(1)} * {attend.note || ""}
                  </div>
                  {/* 현재 클릭된 학생이면 */}

                  <div
                    className={`${classes["attendEdit-div"]} ${
                      attendEdit?.id === attend.id ? classes["show"] : ""
                    }`}
                  >
                    {/* paper속성 있으면 */}
                    {attend?.paper !== undefined && (
                      <button
                        className={classes["attend-edit-p"]}
                        onClick={() => {
                          attendHandler("paper");
                        }}
                      >
                        서류
                      </button>
                    )}
                    {/* request속성 있으면 */}
                    {attend?.request !== undefined && (
                      <button
                        className={classes["attend-edit-p"]}
                        onClick={() => {
                          attendHandler("request");
                        }}
                      >
                        신청서
                      </button>
                    )}
                    {/* report속성 있으면 */}
                    {attend?.report !== undefined && (
                      <button
                        className={classes["attend-edit-p"]}
                        onClick={() => {
                          attendHandler("report");
                        }}
                      >
                        보고서
                      </button>
                    )}
                    <button
                      className={classes["attend-edit-d"]}
                      onClick={(e) => {
                        e.stopPropagation();
                        attendHandler("delete");
                      }}
                    >
                      삭제
                    </button>
                    <button className={classes["attend-edit-c"]}>취소</button>
                  </div>
                </li>
              ))}
            </div>
            {/* 자료 없음 표시 */}
            {onAttends?.length === 0 && (
              <li className={classes["bottom-content-li"]}>
                * 학생의 출결기록이 없어요!
              </li>
            )}
          </div>
        )}

        {/* 학생이 선택되지 않으면.. 전체 정보를 보여주고 월별 정렬 등.. 버튼으로 보여주기 */}
        {onStudent === "" && (
          <div>
            {/* 정렬하는 버튼들... 전체랑.. 월별, 옵션별 보여주기 */}
            <div
              className={classes["flex-wrap"]}
              style={{ alignItems: "center" }}
            >
              {/* 전체 출결 확인 출결옵션별 횟수 기록 */}
              <li
                className={classes["bottom-content-li"]}
                style={{ minWidth: "350px" }}
              >
                <div className={classes["flex-center-ml-10"]}>
                  <span className={classes["fs-13-bold"]}>
                    {clName ? `출결 요약 (${clName})` : "우리반 출결 요약"}
                  </span>
                  &nbsp;&nbsp;
                  {/* 엑셀다운 버튼 */}
                  <button
                    className={classes["search-btns"]}
                    onClick={saveExcelHandler}
                    title="출결 데이터 엑셀파일로 저장하기"
                    style={{ fontSize: "0.7rem" }}
                  >
                    <FaDownload /> 엑셀
                  </button>
                </div>

                <hr className={classes["margin-15"]} />
                {onAttends?.length === 0 ? (
                  <div
                    className={`${classes["fs-13"]} ${classes["margin-15"]}`}
                  >
                    * 학급의 출결 자료가 없어요!
                  </div>
                ) : (
                  <div>
                    <div>
                      {/* 전체 버튼 */}
                      <Button
                        id={`whole`}
                        className={
                          showAttendOption === ""
                            ? "sortBtn-clicked"
                            : "sortBtn"
                        }
                        name={`전체(${onAttendsOption?.length})`}
                        onclick={() => {
                          setShowAttendOption("");
                        }}
                      />
                      {/* 옵션별 버튼 */}
                      {[...new Set(onAttendsOption)]?.map((option) => (
                        <Button
                          key={option}
                          id={option}
                          className={
                            showAttendOption === option
                              ? "sortBtn-clicked"
                              : "sortBtn"
                          }
                          name={`${option} (${
                            onAttendsOption?.filter((op) => op === option)
                              .length
                          })`}
                          onclick={() => {
                            setShowAttendOption(option);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </li>
              {/* 월별 데이터 보여주기 버튼 */}
              {onAttends?.length !== 0 && (
                <>
                  <li className={classes["bottom-content-li"]}>
                    <b>월별로 보기</b>
                    <hr className={classes["margin-15"]} />
                    {/* 전체 월 버튼 */}
                    <Button
                      id={`모든 달`}
                      className={
                        showAttendMonth === "" ? "sortBtn-clicked" : "sortBtn"
                      }
                      name={`모든 달 (${onAttends?.length})`}
                      onclick={() => {
                        setShowAttendMonth("");
                      }}
                    />
                    {/* 자료가 있는 달만 보여줌 */}
                    {/* 전담용은 clname으로 한번 거르고 */}
                    {(nowIsSubject
                      ? [
                          ...new Set(
                            attends
                              ?.filter((attend) => attend?.clName === clName)
                              ?.map((atd) => +atd.id.slice(5, 7))
                          ),
                        ]
                      : [...new Set(attends?.map((atd) => +atd.id.slice(5, 7)))]
                    )
                      ?.sort((a, b) => (a > b ? 1 : -1))
                      ?.map((month) => (
                        <>
                          {/* 월별 버튼 */}
                          <Button
                            key={`${month}월`}
                            id={`${month}월`}
                            className={
                              showAttendMonth === month
                                ? "sortBtn-clicked"
                                : "sortBtn"
                            }
                            name={`${month}월 (${
                              onAttends?.filter(
                                (attend) => +attend.id.slice(5, 7) === month
                              )?.length
                            })`}
                            onclick={() => {
                              setShowAttendMonth(month);
                            }}
                          />
                        </>
                      ))}
                  </li>

                  {/* 서류 미제출학생 보기 */}
                  <li className={classes["bottom-content-li"]}>
                    <div className={classes["flex-center-ml-10"]}>
                      <b style={{ whiteSpace: "nowrap" }}>서류 미제출</b>
                      <button
                        className={classes["search-btns"]}
                        onClick={() => downLoadImg(undefined, "all")}
                        title="업로드 된 모든 제출된 서류를 다운합니다."
                        style={{
                          marginLeft: "5px",
                          whiteSpace: "nowrap",
                          fontSize: "0.7rem",
                        }}
                      >
                        <FaDownload /> 서류
                      </button>
                    </div>
                    <hr className={classes["margin-15"]} />
                    {/* 전체 학생 버튼 */}
                    <Button
                      id={`전체학생`}
                      className={
                        showNoPaper === "" ? "sortBtn-clicked" : "sortBtn"
                      }
                      name={`전체`}
                      onclick={() => {
                        setShowNoPaper("");
                      }}
                    />
                    {/* 서류가 없는 학생만 보여줌 */}
                    {/* 전담용은 clname으로 한번 거르고 */}
                    {(nowIsSubject
                      ? [
                          ...new Set(
                            noPaperRequestStd(attends, "cl")?.map(
                              (atd) => atd.name
                            )
                          ),
                        ]
                      : [
                          ...new Set(
                            noPaperRequestStd(attends)?.map((atd) => atd.name)
                          ),
                        ]
                    )
                      ?.sort((a, b) => (a > b ? 1 : -1))
                      ?.map((name) => (
                        <>
                          {/* 학생이름 버튼 */}
                          <Button
                            key={`${name}`}
                            id={`noPaper-${name}`}
                            className={
                              showNoPaper === name
                                ? "sortBtn-clicked"
                                : "sortBtn"
                            }
                            name={`${name} (${
                              attends?.filter((attend) => {
                                let isNoPaper = false;
                                if (attend.name !== name) return isNoPaper;
                                if (
                                  attend?.paper !== undefined &&
                                  !attend?.paper
                                ) {
                                  isNoPaper = true;
                                } else {
                                  if (
                                    attend?.request !== undefined &&
                                    !attend?.request
                                  ) {
                                    isNoPaper = true;
                                  }
                                  if (
                                    attend?.report !== undefined &&
                                    !attend?.report
                                  ) {
                                    isNoPaper = true;
                                  }
                                }
                                return isNoPaper;
                              })?.length
                            })`}
                            onclick={() => {
                              setShowNoPaper(name);
                            }}
                          />
                        </>
                      ))}
                  </li>
                </>
              )}
            </div>
            <div
              className={classes["btns-div"]}
              style={{
                flexWrap: "wrap",
                justifyContent: showNoPaper !== null ? "flex-start" : "center",
              }}
            >
              {/* 학생 미선택 시 개별 출결기록 */}
              {showOnAttends?.map((attend, index) => (
                <>
                  {index > 0 &&
                    showNoPaper !== null &&
                    showOnAttends[index - 1]?.name !== attend.name && (
                      <div
                        key={attend.id + "div"}
                        style={{ flexBasis: "100%" }}
                      ></div>
                    )}
                  <li
                    key={attend.id}
                    id={attend.id}
                    className={classes["bottom-content-li"]}
                    style={{ width: "260px", padding: "25px" }}
                    onClick={() => {
                      if (attendEdit) {
                        setAttendEdit(null);
                      } else {
                        setAttendEdit(attend);
                      }
                    }}
                  >
                    {/* 출결의 id(yyyy-mm-dd)보여줌 */}
                    <div className={classes["btns-div"]}>
                      {/* 날짜보여줌 */}
                      {attend.id.slice(0, 10)}
                      &nbsp;&nbsp;
                      {/* 학생 이름 */}
                      {attend.name}
                      {/* 서류 제출/미제출 아이콘 */}
                      {attend?.paper !== undefined && (
                        <span
                          title="업로드 된 서류 다운받기"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!attend?.paper) return;

                            downLoadImg(attend, "서류");
                          }}
                        >
                          {attend.paper ? (
                            <FaCircleCheck
                              size={25}
                              color={"#ff5a71"}
                              margin="0 10px"
                              cursor="help"
                            />
                          ) : (
                            <FaCircleCheck
                              size={25}
                              color={"#cacaca"}
                              margin="0 10px"
                            />
                          )}
                        </span>
                      )}
                      {/* request 신청서  */}
                      {attend?.request !== undefined && (
                        <Button
                          className={
                            attend?.request
                              ? "reqRepSub-btn-s-clicked"
                              : "reqRepSub-btn-s"
                          }
                          name={"신"}
                          style={{ marginLeft: "10px" }}
                          title="업로드 된 서류 다운받기"
                          onclick={(e) => {
                            e.stopPropagation();
                            if (!attend?.request) return;

                            downLoadImg(attend, "신청서");
                          }}
                        />
                      )}
                      {/* report 보고서  */}
                      {attend?.report !== undefined && (
                        <Button
                          className={
                            attend?.report
                              ? "reqRepSub-btn-s-clicked"
                              : "reqRepSub-btn-s"
                          }
                          name={"보"}
                          title="업로드 된 서류 다운받기"
                          onclick={(e) => {
                            e.stopPropagation();
                            if (!attend?.report) return;
                            downLoadImg(attend, "보고서");
                          }}
                        />
                      )}
                    </div>
                    {/* 출결옵션 */}
                    <div className={classes["fs-13"]}>
                      {attend.option.slice(1)} * {attend.note || ""}
                    </div>
                    {/* 현재 클릭된 학생이면 */}

                    <div
                      className={`${classes["attendEdit-div"]} ${
                        attendEdit?.id === attend.id ? classes["show"] : ""
                      }`}
                    >
                      {/* paper속성 있으면 */}
                      {attend?.paper !== undefined && (
                        <button
                          className={classes["attend-edit-p"]}
                          onClick={() => {
                            attendHandler("paper");
                          }}
                        >
                          서류
                        </button>
                      )}
                      {/* request속성 있으면 */}
                      {attend?.request !== undefined && (
                        <button
                          className={classes["attend-edit-p"]}
                          onClick={() => {
                            attendHandler("request");
                          }}
                        >
                          신청서
                        </button>
                      )}
                      {/* report속성 있으면 */}
                      {attend?.report !== undefined && (
                        <button
                          className={classes["attend-edit-p"]}
                          onClick={() => {
                            attendHandler("report");
                          }}
                        >
                          보고서
                        </button>
                      )}
                      <button
                        className={classes["attend-edit-d"]}
                        onClick={(e) => {
                          e.stopPropagation();
                          attendHandler("delete");
                        }}
                      >
                        삭제
                      </button>
                      <button className={classes["attend-edit-c"]}>취소</button>
                    </div>
                  </li>
                </>
              ))}
            </div>
            {/* 자료 없음 표시 */}
            {onAttends?.length === 0 && (
              <li className={classes["bottom-content-li"]}>
                * 학생의 출결기록이 없어요!
              </li>
            )}
          </div>
        )}
      </ul>
    </div>
  );
};

export default ManageAttendance;
