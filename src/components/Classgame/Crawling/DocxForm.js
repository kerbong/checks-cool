import React, { useState, useEffect } from "react";
import { onSnapshot, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../../../fbase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

import Swal from "sweetalert2";

import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import saveAs from "file-saver";

import dayjs from "dayjs";

import classes from "./HwpControl.module.css";
import Modal from "components/Layout/Modal";
// import FormVarType from "./FormVarType";
import { send } from "emailjs-com";

const FOR_WHAT = ["atAdd", "atReport", "absence"];

const DocxForm = (props) => {
  const [atAddFile, setAtAddFile] = useState(null);
  const [atReportFile, setAtReportFile] = useState(null);
  const [absenceFile, setAbsenceFile] = useState(null);
  const [uploadDone, setUploadDone] = useState([]);

  const [atAddKeys, setAtAddKeys] = useState([]);
  const [atReportKeys, setAtReportKeys] = useState([]);
  const [absenceKeys, setAbsenceKeys] = useState([]);

  //   const [atAddValues, setAtAddValues] = useState([]);
  //   const [atReportValues, setAtReportValues] = useState([]);
  //   const [absenceValues, setAbsenceValues] = useState([]);

  const [schoolFormRef, setSchoolFormRef] = useState([]);
  const [downFileDate, setDownFileDate] = useState("");

  //   const [showWhat, setShowWhat] = useState("");
  const [formDone, setFormDone] = useState("");

  //학교 양식 모달 설정
  const [showModal, setShowModal] = useState(true);
  //파일 입력 양식 모달 설정
  //   const [showVarModal, setShowVarModal] = useState(false);

  //   useEffect(() => {
  //     if (!uploadDone) return;
  //     let date = dayjs().format("YYYY-MM-DD HH:MM");
  //     if (!atAddFile) {
  //       downloadFile(date, FOR_WHAT[0]);
  //     }
  //     if (!atReportFile) {
  //       downloadFile(date, FOR_WHAT[1]);
  //     }
  //     if (!absenceFile) {
  //       downloadFile(date, FOR_WHAT[2]);
  //     }
  //     // 파일 업로드 시 파일 다운로드
  //   }, [uploadDone]);

  const checkFormUploaded = async () => {
    const doneRef = doc(dbService, "attendCheck", "00formUploaded");

    const doneRef_doc = await getDoc(doneRef);

    const is_done = doneRef_doc?.data()?.lists?.[props.school];
    setFormDone(is_done);
    if (is_done === "done") {
      // setSaveBtnText("업로드 완료")
      //하위 폴더 모두를 가져옴.
      const fileListsRef = ref(storageService, `${props.school}/attendCheck/`);

      listAll(fileListsRef).then((res) => {
        let ref_names = [];

        res.prefixes.forEach((folderRef) => {
          // 폴더이름(날짜 2023-03-06 스타일)
          ref_names.push(folderRef.name);
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        setSchoolFormRef(ref_names);
      });
    } else if (is_done === "uploaded") {
      console.log("개발자 승인 요청중...");
    } else {
      console.log("새로운 학교");
    }
  };

  //학교기초정보 저장한 후에, 혹시 학교 데이터가 있으면 불러와서 넣어둠.
  useEffect(() => {
    if (!props.lastStep) return;

    checkFormUploaded();
  }, [props.lastStep]);

  /** 학교의 신청서 양식 날짜ref를 기준으로 자료 불러오기 */
  const getSchoolFormByDate = (dateRef) => {
    setDownFileDate(dateRef);
    downloadFile(dateRef, FOR_WHAT[0]);
    downloadFile(dateRef, FOR_WHAT[1]);
    downloadFile(dateRef, FOR_WHAT[2]);
  };

  useEffect(() => {
    if (atAddKeys?.length === 0) return;
    console.log(atAddKeys);
  }, [atAddKeys]);
  useEffect(() => {
    if (atReportKeys?.length === 0) return;
    console.log(atReportKeys);
  }, [atReportKeys]);
  useEffect(() => {
    if (absenceKeys?.length === 0) return;
    console.log(absenceKeys);
  }, [absenceKeys]);

  //학교의 신청서 양식 날짜ref 가 저장되면, 사용자에게 어떤거 불러올지 물어보기
  //   useEffect(() => {
  //     if (schoolFormRef?.length === 0) return

  //     Swal.fire({
  //         title: "학교 양식 불러오기?",
  //         html: `다른 선생님이 저장하신 정보가 있어요.<br/>
  //         ${schoolFormRef}`,
  //         icon: "question",
  //         showDenyButton: "true",
  //         denyButtonText: "취소",
  //         confirmButtonText: "확인",
  //         confirmButtonColor: "#006B5F",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           setStudentsConfirm(true);
  //         }
  //       });
  //   },[schoolFormRef])

  // Firebase Storage에 파일 업로드
  const uploadFile = async (file, forWhat) => {
    let date = dayjs().format("YYYY-MM-DD HH:MM");
    await uploadBytes(
      ref(
        storageService,
        `${props.school}/attendCheck/${date}/${forWhat}.hwpx`
      ),
      file
    )
      .then(() => {
        let new_uploadDone = uploadDone?.filter((upDone) => upDone !== forWhat);

        new_uploadDone.push(forWhat);
        setUploadDone(new_uploadDone);
      })
      .catch((error) => {
        Swal.fire(
          "업로드 실패",
          "파일 업로드에 실패했습니다. 새로고침 후 진행해보세요. 문제가 지속되시면 kerbong@gmail.com으로 알려주세요.",
          "error"
        );
      });
  };

  const handleFileChange = async (event, forWhat) => {
    // 만약 해당 학교에 이미 양식 업로드 후 변경 신청을 한 게 있으면 알려줌!
    if (formDone !== "") {
      Swal.fire({
        title: "업로드 할까요?",
        text: `이미 해당 학교에 양식을 업로드하고 신청한 기록이 있어요! 양식 변경에는 2~3일이 소요됩니다. 계속 업로드 할까요?`,
        showDenyButton: true,
        confirmButtonText: "계속",
        confirmButtonColor: "#db100cf2",
        denyButtonColor: "#85bd82",
        denyButtonText: `취소`,
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedFile = event.target.files[0];
          if (selectedFile !== undefined) {
            let reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
              const fileData = new Uint8Array(
                finishedEvent.currentTarget.result
              );
              uploadFile(fileData, forWhat);
            };
            //이게 중요함! readAsDataURL로 하면 오류남.
            reader.readAsArrayBuffer(selectedFile);
          }
        }
      });
    }
  };

  /** 중복인거 제외해서 반환하는 함수 */
  function removeDuplicates(array) {
    return Array.from(new Set(array));
  }

  const downloadFile = async (date, forWhat) => {
    try {
      const fileRef = ref(
        storageService,
        `${props.school}/attendCheck/${date}/${forWhat}.docx`
      );

      const url = await getDownloadURL(fileRef);
      if (!url) return;

      const response = await fetch(url);
      const content = await response.arrayBuffer();

      // Blob 객체 생성
      const blob = new Blob([content]);

      // File 객체 생성
      const newFile = new File([blob], "attendForm.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      if (forWhat === FOR_WHAT[0]) {
        setAtAddFile(newFile);
      } else if (forWhat === FOR_WHAT[1]) {
        setAtReportFile(newFile);
      } else if (forWhat === FOR_WHAT[2]) {
        setAbsenceFile(newFile);
      }

      // 파일 내부에 있는 {학생이름} 과 같은 태그의 key값 (학생이름) 들을 모으는 과정

      //만약 처음 파일을 업로드해서 다운받는, 세팅하고 있는 중이면 변수를 보여주고 설정해야함.

      const reader = new FileReader(newFile);

      reader.onerror = function (event) {
        console.error("파일 읽기 오류:", event.target.error);
      };

      reader.onloadend = function (event) {
        const content = event.target.result;
        console.log(content);
        // content를 사용하여 docxtemplater 작업 수행
        const zip = new PizZip(content);
        let keys = [];

        const options = {
          // This is how docxtemplater is configured by default
          parser: function (tag) {
            // 선생님들이 만든 키 값만 저장하기..!!
            keys.push(tag);
          },
        };

        new Docxtemplater(zip, options);

        // 작업 완료 후에 keys 배열을 확인
        if (forWhat === FOR_WHAT[0]) {
          setAtAddKeys(removeDuplicates(keys));
        } else if (forWhat === FOR_WHAT[1]) {
          setAtReportKeys(removeDuplicates(keys));
        } else if (forWhat === FOR_WHAT[2]) {
          setAbsenceKeys(removeDuplicates(keys));
        }
      };

      reader.readAsArrayBuffer(newFile);
    } catch (error) {
      console.log(error);
    }
  };

  /** 데이터를 파일의 {} 부분에 자동으로 넣는 함수 */
  const makeFileAdapted = async (data, whatFile) => {
    let file =
      whatFile === FOR_WHAT[0]
        ? atAddFile
        : whatFile === FOR_WHAT[1]
        ? atReportFile
        : absenceFile;
    const reader = new FileReader(file);

    const outputPromise = new Promise((resolve, reject) => {
      reader.onerror = function (event) {
        console.error("파일 읽기 오류:", event.target.error);
        reject(event.target.error);
      };

      reader.onloadend = function (event) {
        const content = event.target.result;
        console.log(content);
        // content를 사용하여 docxtemplater 작업 수행
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip);

        // try {
        //   doc.render(data);
        // } catch (error) {
        //   // 오류 처리
        //   console.log(error);
        //   reject(error);
        // }

        const output = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        console.log(output);
        resolve(output);
      };
      reader.readAsArrayBuffer(file);
    });

    try {
      const output = await outputPromise;
      return output;
    } catch (error) {
      // 다운로드 오류 처리
      console.error(error);
      return null;
    }
  };

  /** 저장하는 함수인데, 두번째 인자로 FOR_WHAT에 있는 문자열 보내주기  */
  const saveFile = async (user_data, forWhat, date) => {
    let fileName =
      forWhat === FOR_WHAT[0]
        ? `현장체험학습 신청서(${date}).docx`
        : forWhat === FOR_WHAT[1]
        ? `현장체험학습 보고서(${date}).docx`
        : `결석계(${date}).docx`;

    downloadFile(date, FOR_WHAT[0]).then(async () => {
      await makeFileAdapted(user_data, forWhat).then((output) => {
        //양식 파일 저장하기
        saveAs(output, fileName);
      });
    });
  };

  /** 모든 파일을 업로드한 후에 설정저장" 버튼을 통해 firestore에 문서 만들기! */
  const allFileUpHandler = async () => {
    if (uploadDone?.length < 2) {
      Swal.fire(
        "신청 실패",
        "현장체험학습 신청서보고서 / 결석계 파일 모두 업로드 되어야 합니다! 오류가 지속될 경우 kerbong@gmail.com으로 파일을 직접 보내주세요!",
        "warning"
      );
    } else {
      let today_done = localStorage.getItem("formUpload");

      if (today_done === dayjs().format("YYYY-MM-DD")) {
        Swal.fire(
          "신청 실패",
          "양식 파일 변경이 이미 신청되었습니다! 문제가 지속될 경우 kerbong@gmail.com으로 파일을 직접 보내주세요!",
          "warning"
        );
        return;
      }

      const doneRef = doc(dbService, "attendCheck", "00formUploaded");

      const doneDoc = await getDoc(doneRef);

      const new_doneDoc = doneDoc.data().lists;
      new_doneDoc[props.school] = "uploaded";

      await setDoc(doneRef, { lists: new_doneDoc });

      try {
        let templateParams = {
          from_name: props.userUid + ")" + props.email,
          to_name: "말랑한 거봉 운영자님",
          message: "현장체험학습 양식 업로드",
          title: props.school,
        };

        //개발자 이메일로 내용 보내기
        await send(
          process.env.REACT_APP_EMAILJS_SERVICEID,
          process.env.REACT_APP_EMAILJS_TEMPLATEID,
          templateParams,
          process.env.REACT_APP_EMAILJS_INIT
        );

        Swal.fire(
          "신청 성공!",
          "업로드된 양식을 데이터 처리에 알맞게 수정하는 데에 2~3일이 소요됩니다. 진행 상황을 가입하신 email로 알려드릴게요!",
          "success"
        );

        localStorage.setItem("formUpload", dayjs().format("YYYY-MM-DD"));
      } catch (error) {
        Swal.fire(
          "신청 실패",
          "문서 수정 및 업로드에 실패했습니다. 오류가 지속될 경우 kerbong@gmail.com으로 파일을 직접 보내주세요!",
          "warning"
        );
      }
    }
  };

  //   const valuesHandler = (what) => {
  //     setShowWhat(what);
  //     setShowVarModal(true);
  //   };

  return (
    <>
      {/* 학교양식파일이 있을때 보여줄 mmodal */}
      {schoolFormRef?.length !== 0 && showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={`${classes["flex-column"]}`}>
            <h2
              className={classes["m20"]}
              style={{ textAlign: "center", fontSize: "1.7rem" }}
            >
              저장된 학교 자료 목록
            </h2>
            <h3 style={{ fontWeight: "300" }}>
              * 학교의 다른 선생님이 업로드하신 날짜 목록입니다.
            </h3>
            <h3 style={{ fontWeight: "300" }}>
              * 클릭하시면 해당날짜의 양식이 다운, 설정됩니다.
            </h3>
            <div>
              {schoolFormRef?.length !== 0
                ? schoolFormRef?.map((date, index) => (
                    <button
                      className={classes["btn"]}
                      style={{
                        margin: "20px 8px",
                        backgroundColor:
                          downFileDate === date ? "#073832" : "#006b5f",
                      }}
                      key={index}
                      onClick={() => getSchoolFormByDate(date)}
                    >
                      {date}
                    </button>
                  ))
                : "저장된 학교 자료가 없습니다."}
            </div>
          </div>
        </Modal>
      )}

      {/* 각 양식파일 변수들의 value type 설정하는 모달
      {showVarModal && (
        <Modal onClose={() => setShowVarModal(false)}>
          <FormVarType
            formKeys={
              showWhat === "atAdd"
                ? atAddKeys
                : showWhat === "atReport"
                ? atReportKeys
                : absenceKeys
            }
            formValues={
              showWhat === "atAdd"
                ? atAddValues
                : showWhat === "atReport"
                ? atReportValues
                : absenceValues
            }
          />
        </Modal>
      )} */}

      {/*  */}

      <h2 className={classes["h2"]}>파일 양식 설정하기(3/3)</h2>

      {/* 이전단계 학교 업로드파일 설정저장버튼 */}
      <div className={classes["flex-wrap"]}>
        {/* 이전 단계로 버튼 */}
        <button
          onClick={() => props.beforeLastStep()}
          className={classes["btn"]}
          style={{ width: "300px", margin: "0 0 20px 0" }}
        >
          이전단계
        </button>

        {/* 학교양식 확인 버튼 */}
        <button
          onClick={() => setShowModal(true)}
          className={classes["btn"]}
          style={{ width: "300px", margin: "0 0 20px 0" }}
        >
          저장된 학교 자료
        </button>

        {/* 설정 저장하기 버튼 */}

        <button
          onClick={() => allFileUpHandler()}
          className={classes["btn"]}
          style={{ width: "300px", margin: "0 0 20px 0" }}
        >
          양식 변경 신청
        </button>
      </div>

      {downFileDate !== "" && (
        <div>* 현재 {downFileDate} 양식을 사용중 입니다.</div>
      )}
      {/* 학교자료 확인하기 버튼 만들기.. modal연동 */}

      {/* 양식들 보여주는 부분 */}
      <div className={classes["flex-wrap"]}>
        {FOR_WHAT?.map((what) => {
          // 양식 파일 업로드할 때는.. 파일 올리는거 두개만 보여줌.
          if (schoolFormRef?.length === 0 && what === "atReport") return null;

          let whatFile =
            what === "atAdd"
              ? atAddFile
              : what === "atReport"
              ? atReportFile
              : absenceFile;

          let whatTitle =
            what === "atAdd"
              ? "현장체험학습 신청서"
              : what === "atReport"
              ? "현장체험학습 보고서"
              : "결석계";

          if (schoolFormRef?.length === 0 && what === "atAdd") {
            whatTitle = "현장체험학습 신청서 보고서";
          }

          return (
            <div className={classes["card"]} key={what}>
              <span style={{ margin: "10px 0 20px 0" }}>{whatTitle}</span>
              <div style={{ margin: "10px" }}>
                {/* 다운로드 버튼 */}
                {whatFile && (
                  <button
                    onClick={() => saveFile({}, what, downFileDate)}
                    className={classes["fileUpLabel"]}
                    title={"현재 파일 다운"}
                  >
                    다운로드 <i className="fa-solid fa-download"></i>
                  </button>
                )}

                {/* 업로드 버튼 */}
                <label
                  className={classes["fileUpLabel"]}
                  title={"새 파일 업로드"}
                >
                  업로드 <i className="fa-solid fa-upload"></i>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="application/vnd.hancom.hwp,
                    application/haansofthwp,
                    application/x-hwp,
                    application/vnd.hancom.hwpx,
                    application/haansofthwpx,"
                    onChange={(e) => handleFileChange(e, what)}
                  />
                </label>

                {/* 양식 파일을 업로드하고, 변수값이 설정되면
                {whatKeys?.length !== 0 && (
                  <button
                    onClick={() => valuesHandler(what)}
                    className={classes["fileUpLabel"]}
                    style={{ backgroundColor: "#d0acaceb" }}
                  >
                    학부모 입력 설정
                  </button>
                )} */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DocxForm;
