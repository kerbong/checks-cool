import React, { useState, useEffect, useRef } from "react";
import classes from "./MobileMain.module.css";
import Button from "components/Layout/Button";
import { useNavigate } from "react-router-dom";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { dbService, storageService } from "fbase";

import dayjs from "dayjs";
import OpenAI from "openai";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";

import weekOfYear from "dayjs/plugin/weekOfYear"; // 주차를 계산하기 위한 모듈
import weekday from "dayjs/plugin/weekday"; // 요일을 계산하기 위한 모듈
import ExampleModal from "./ExampleModal";
import AttendCalendar from "components/Attendance/AttendCalendar";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import Input from "components/Layout/Input";

dayjs.extend(weekOfYear);
dayjs.extend(weekday);
dayjs.locale("ko");

const MobileMain = (props) => {
  const [isLeft, setIsLeft] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [nowOcr, setNowOcr] = useState("");
  const [voiceWhat, setVoiceWhat] = useState("");
  const [voiceText, setVoiceText] = useState("");
  const [ocrResult, setOcrResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openAi, setOpenAi] = useState(null);
  const [gptAnswer, setGptAnswer] = useState("");
  const [nowYearStd, setNowYearStd] = useState([]);
  const [newRequestData, setNewRequestData] = useState(null);
  const [finalData, setFinalData] = useState(null);
  const [dates, setDates] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const [isSubject, setIsSubject] = useState(false);

  const fileInput = useRef();
  const navigate = useNavigate();

  const nowYear = () => {
    return +dayjs().format("MM") <= 2
      ? String(+dayjs().format("YYYY") - 1)
      : dayjs().format("YYYY");
  };

  useEffect(() => {
    changeSubjectHandler();
  }, [props.isSubject]);

  useEffect(() => {
    if (!props.students) return;

    let new_nowYearStd = props.students?.filter(
      (yearStd) => Object.keys(yearStd)[0] === nowYear()
    )?.[0]?.[nowYear()];
    setNowYearStd(new_nowYearStd);
  }, [props.students]);

  const handleButtonClick = (e) => {
    if (fileInput.current) {
      fileInput.current.click();
    }
    let now = e.target.title;
    setNowOcr(now);
  };

  // 버튼누르면 api 요청해서 받아와서 물어보기..
  const callOpenAiApi = async () => {
    //로딩중이면 취소하기
    if (isLoading || openAi) return;
    //이미 openai 불러왔어도 취소

    //firebase에 저장해두고 물어보기
    let aiApiRef = doc(
      dbService,
      "apis",
      process.env.REACT_APP_OPENAPI_DOCNAME
    );

    const aiApiDoc = await getDoc(aiApiRef);

    if (aiApiDoc.exists()) {
      const API_KEY = aiApiDoc.data().open_ai_api;
      const openai = new OpenAI({
        apiKey: API_KEY, // defaults to process.env["OPENAI_API_KEY"]
        dangerouslyAllowBrowser: true,
      });

      setOpenAi(openai);
    }
  };

  //구글ocr
  const googleImageOcrHandler = async (base64Img) => {
    //먼저 하루에 3번 가능한 ocr횟수를 넘었는지 확인하기
    //로컬스토리지에 새로운 데이터 저장하기
    const newLocalData = () => {
      const item = {
        value: 1,
        dataWhen: new Date().getDate(),
      };
      localStorage.setItem(
        process.env.REACT_APP_OCR_LOCAL,
        JSON.stringify(item)
      );
    };

    //로컬에 저장된 밸류 가져오기
    let ocrTry = localStorage.getItem(process.env.REACT_APP_OCR_LOCAL) || "";
    //로컬스토리지에서 기존에 저장된 데이터가 있으면
    if (ocrTry.length > 0) {
      //데이터를 가져와서
      const item = JSON.parse(ocrTry);
      //오늘 자료가 아니면
      if (new Date().getDate() !== item.dataWhen) {
        newLocalData();

        //오늘 자료면
      } else {
        //이미 시도한 경우 에러메세지
        if (item.value > 100) {
          Swal.fire({
            icon: "error",
            title: "인식불가",
            text: "불편드려 죄송합니다. 다른 선생님들을 위해서 하루에 100번까지만 OCR기능 활용이 가능합니다. 배려 감사합니다! ",
          });
          return false;
          //세번까지는 안했으면 횟수 추가해서 스토리지에 저장하기
        } else {
          item.value += 1;
          localStorage.setItem(
            process.env.REACT_APP_OCR_LOCAL,
            JSON.stringify(item)
          );
        }
      }

      // 자료가 없는 경우
    } else {
      newLocalData();
    }

    //학생이 입력되지 않은 경우, 학생 입력 부분으로.. 이동시키기.
    if (nowOcr === "상담" || nowOcr === "출결") {
      //학생 정보가 없으면,
      if (nowYearStd?.length === 0) {
        Swal.fire({
          icon: "error",
          title: "설정필요",
          text: "이번학년도 학생 정보가 없어요! [확인] 버튼을 눌러서 학생명부 입력 화면으로 이동해주세요.",
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
    }

    /** 분석에 필요없는 내용 없애서 토큰 줄이기!! */
    function replaceNewLines(text) {
      const lines = text.split("\n");
      const filteredLines = lines.filter(
        (line) =>
          !line.includes("합니다") &&
          !line.includes("주세요") &&
          !line.includes("예)") &&
          !line.includes("예시") &&
          !line.includes("학교장") &&
          !line.includes("결재") &&
          !line.includes("교무") &&
          !line.includes("전결") &&
          !line.includes("※") &&
          !line.includes("귀하") &&
          !line.includes("구체적") &&
          !line.includes("바랍니다") &&
          !line.includes("됩니다")
      );
      return filteredLines.join("").replace(/\n/g, "");
    }

    //구글 ocr 자료 분석실행
    const API_KEY = process.env.REACT_APP_GOOGLE_OCR_API_KEY;

    const URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
    await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64Img,
            },
            features: [{ type: "TEXT_DETECTION" }],
          },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const ocrTexts = replaceNewLines(
          data.responses[0].fullTextAnnotation.text
        );

        console.log(ocrTexts);
        setOcrResult(ocrTexts);

        // 숫자가 아닌 것들 빈칸으로 만들었다가 지우고 배열로 만들기
      })

      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "인식이 불가능해요",
          text: "오류가 생겨서 인식에 실패했어요! 다른 방법을 활용하시거나 메일로 연락주세요!",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        })
      );
  };

  /** open ai로 출결 관련 서류 제출할 때 ocrText분석해서 보여줄 부분. */
  const responseCall = async (ocrText, prompt) => {
    const completion = await openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt,
        },
        { role: "user", content: ocrText },
      ],
      model: "gpt-3.5-turbo-1106",
      temperature: 0.2,
    });

    //[학생이름, 날짜, 목적지, 연락처] 담긴 배열
    console.log(completion?.choices[0]?.message?.content);
    const data = parseTextToDataArr(completion?.choices[0]?.message?.content);

    //날짜 세팅하기
    setDates(extractDates(data?.[1]));
    setNewRequestData(data);

    setIsLoading(false);
  };

  /** 텍스트를 줄 단위로 분할하여 체험학습 신청서 = [학생이름, 신청날짜, 목적지, 보호자 연락처] / 체험학습 보고서 = [학생이름, 신청날짜] / 그외 서류 = [학생이름, 신청날짜, 제목 및 사유]로 만들어서 반환하는 함수  */
  function parseTextToDataArr(text) {
    // 텍스트를 줄 단위로 분할하여 배열로 저장
    const lines = text.split("\n");

    // 데이터를 저장할 배열 생성
    const dataArr = [];
    let studentInfo;

    // 각 줄을 반복하면서 데이터 추출
    lines.forEach((line, line_index) => {
      // 콜론(:)을 기준으로 key와 value로 분리 하는데 혹시 콜론이 없이 1. 김민준 이런식으로 결과값이 나오면.. 띄어쓰기로 구분.

      //   콜론이 있으면 1. 학생이름: 김민준
      if (line?.includes(":")) {
        const [k, value] = line?.split(":");
        if (k?.includes("1")) {
          // 같거나 가장 유사한 학생 이름 찾기
          const std = findSimilarName(value?.trim(), nowYearStd);
          studentInfo = [std.num, std.name];

          dataArr?.push(std.name);
        } else {
          // key와 value의 앞뒤 공백 제거 후 저장
          dataArr?.push(value?.trim());
        }
        //콜론이 없으면 1. 김민준
      } else {
        let now_num = String(line_index + 1) + ".";
        const [_num, _value] = line?.split(now_num);
        //이름만... 유사한 학생 찾고
        if (line_index === 0) {
          // 같거나 가장 유사한 학생 이름 찾기
          const std = findSimilarName(_value?.trim(), nowYearStd);
          studentInfo = [std.num, std.name];

          dataArr?.push(std.name);
        } else {
          dataArr?.push(_value.trim());
        }
      }
    });

    // 만약... 체험학습 신청서면
    let new_data = {
      num: studentInfo[0],
      name: studentInfo[1],
      option: "1현장체험",
    };
    // 만약... 체험학습 신청서면 [학생이름, 날짜]

    if (dataArr?.length === 4) {
      new_data["request"] = true;
      new_data["report"] = false;
      //   그외 서류면 [학생이름, 날짜, 사유와 출결옵션]
    } else if (dataArr?.length === 2) {
      new_data["request"] = false;
      new_data["report"] = true;
      //   그외 서류면 [학생이름, 날짜, 사유와 출결옵션]
    } else if (dataArr?.length === 3) {
      new_data["paper"] = true;
    }

    setFinalData(new_data);

    return dataArr;
  }

  /** 문자열유사도(유사한 학생이름) 계산해서 반환하는 함수 */
  function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = [];

    for (let i = 0; i <= m; i++) {
      dp[i] = [];
      dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
      dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + 1
          );
        }
      }
    }

    return dp[m][n];
  }

  /** 비슷한 이름 찾는 함수 */
  function findSimilarName(ocrName, students) {
    let bestMatchStd = null;
    let minDistance = Infinity;

    students.forEach((std) => {
      const distance = levenshteinDistance(ocrName, std.name);

      if (distance < minDistance) {
        minDistance = distance;
        bestMatchStd = std;
      }
    });

    return bestMatchStd;
  }

  /** gpt가 분석한 결과를 swal로 보여주고, 확인해서 저장하는 함수. */
  const checkGptAnswer = async (gptAnswer) => {
    // 직접 모달 띄워서, 거기에 input태그 넣어주기. default값으로 넣어주고, 확인하고 수정해서 저장할 수 있도록 만들기.
  };

  /** 압축하는 */
  const compress = async (image) => {
    try {
      const options = {
        maxSizeMb: 1.2,
        maxWidthOrHeight: 1000,
      };
      return await imageCompression(image, options);
    } catch (e) {
      console.log(e);
    }
  };

  /** 해당학년도의 전담여부 확인해서 설정하는 함수 */
  const changeSubjectHandler = () => {
    let isSubject;
    if (props.isSubject) {
      isSubject = props.isSubject?.filter(
        (yearData) => Object.keys(yearData)[0] === nowYear()
      )?.[0]?.[nowYear()];
    }
    setIsSubject(isSubject);
  };

  /** 상담자료 firebase와 storage에 저장하는 함수 */
  const saveConsult = async (data) => {
    const response = await uploadString(
      ref(storageService, `${props.userUid}/${v4()}`),
      data.attachedFileUrl,
      "data_url"
    );
    //firestore에 저장할 url받아오기
    let fileUrl = await getDownloadURL(response.ref);

    let new_data = { ...data, attachedFileUrl: fileUrl };

    const consultRef = doc(dbService, "consult", props.userUid);
    //상담자료 받아오기
    const consultSnap = await getDoc(consultRef);
    if (consultSnap.exists()) {
      //현재 저장되는 자료와 중복되는거 제외하고 거기에 새 자료 추가함

      let new_datas = [
        ...consultSnap
          .data()
          .consult_data?.filter((consult) => consult.id !== new_data.id),
      ];

      new_datas.push(new_data);

      await setDoc(consultRef, {
        consult_data: new_datas,
      });
    } else {
      await setDoc(consultRef, { consult_data: [new_data] });
    }
  };

  /** ocr로 상담 내용 분석한 후에, 학생이름 고르는 input 보여주는 swal */
  const showConsultStdSwal = async (atdSelect) => {
    let new_nowYearStd = [...nowYearStd];
    let now_cl;

    //   전담이면.. 학급 선택 후 학생 선택가능
    if (isSubject) {
      let clNames = {};
      nowYearStd?.forEach((cl) => {
        clNames[Object.keys(cl)] = Object.keys(cl);
      });

      Swal.fire({
        title: "학급 선택",
        input: "select",
        inputOptions: {
          ...clNames,
        },
        inputPlaceholder: "== 선택 ==",
        showCancelButton: true,
        confirmButtonText: "선택",
        cancelButtonText: "취소",
      }).then((res) => {
        let clName = res?.value;
        now_cl = clName;
        console.log(now_cl);

        nowYearStd?.forEach((cl) => {
          if (Object.keys(cl)[0] === clName) {
            new_nowYearStd = Object.values(cl)[0];
          }
        });
      });
    }

    let options = {};
    new_nowYearStd.forEach((std) => {
      options[std.name] = std.name;
    });

    Swal.fire({
      title: "학생 이름 선택",
      input: "select",
      inputOptions: {
        ...options,
      },
      inputPlaceholder: "== 선택 ==",
      showCancelButton: true,
      confirmButtonText: "선택",
      cancelButtonText: "취소",
    }).then((res) => {
      let stdName = res?.value;
      console.log(stdName);
      //출결 옵션 상태가 아니면, (상담이면)
      if (!atdSelect) {
        if (stdName) {
          const student = new_nowYearStd.filter((st) => st.name === stdName)[0];

          const data = {
            num: student.num,
            name: student.name,
            id: dayjs().format("YYYY-MM-DDHH:mm") + student.num,
            option: "2교우관계",
            note: ocrResult,
            attachedFileUrl: attachedFile,
            related: [],
          };

          if (isSubject) {
            data["clName"] = now_cl;
          }
          saveConsult(data);
        }
      } else {
        if (stdName) {
          const student = new_nowYearStd.filter((st) => st.name === stdName)[0];

          let new_finalData = {
            ...finalData,
            num: student.num,
            name: student.name,
          };
          let new_requestData = [...newRequestData];
          new_requestData[0] = student.name;
          setNewRequestData(new_requestData);
          setFinalData(new_finalData);
        }
      }
    });
  };

  useEffect(() => {
    if (ocrResult === "") return;

    if (nowOcr === "출결") {
      //체험학습 신청서의 경우,
      if (
        ocrResult.includes("체험") &&
        ocrResult.includes("학습") &&
        ocrResult.includes("신청서")
      ) {
        responseCall(
          ocrResult,
          `이렇게 ocr로 인식한 text가 있는데 이 내용을 자세히 분석해봐. 그리고 신청날짜에 있는 날짜와 기간을 고려해서 아래의 질문에 대한 답변만 해줘. 추가적인 설명 필요없어.
        1.학생이름
        2.신청날짜(기간)
        3.목적지
        4.보호자 혹은 인솔자 전화번호`
        );

        // 체험학습 보고서
      } else if (
        ocrResult.includes("체험") &&
        ocrResult.includes("학습") &&
        ocrResult.includes("보고서")
      ) {
        //보고서의 날짜를 알아야 다음 로직 진행
        console.log(ocrResult);
        responseCall(
          ocrResult,
          `이렇게 ocr로 인식한 text가 있는데 이 내용을 자세히 분석해봐. 그리고 체험학습 날짜(혹은 기간)을 고려해서 아래의 질문에 대한 답변만 해줘. 추가적인 설명 필요없어.
          1.학생이름
          2.신청날짜(기간)
          `
        );

        // 출결중..
      } else {
        //보고서의 날짜를 알아야 다음 로직 진행
        console.log(ocrResult);
        responseCall(
          ocrResult,
          `이렇게 ocr로 인식한 text가 있는데 이 내용을 자세히 분석해봐. 그리고 신청날짜에 있는 날짜와 기간을 고려해서 아래의 질문에 대한 답변만 해줘. 아래의 3번 서류 제목은 "OO으로 인한 (질병결석/경조사/인정결석/조퇴/지각/기타결석)"으로 만들어줘. 추가적인 설명 필요없어.
          1.학생이름
          2.신청날짜(기간)
          3.서류제목(예시 "감기로 인한 질병결석")
          `
        );
      }
    } else if (nowOcr === "상담") {
      // 학생 이름 고르기 Swal 보여주기.
      // 전담이면, 학급먼저 고르기
      showConsultStdSwal(ocrResult);
    }
  }, [ocrResult]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    callOpenAiApi();
    // 이후에는 선택된 파일 혹은 이미지를 ocr로 처리하기
    setIsLoading(true);

    const reader = new FileReader();
    const compressedImage = await compress(file);

    reader.readAsDataURL(compressedImage);
    reader.onloadend = (e) => {
      // 변환 완료!
      const base64data = reader.result;
      setAttachedFile(e.currentTarget.result);
      //구글image파일 ocr 하기
      googleImageOcrHandler(base64data.split(",")[1]);
    };
  };

  const handleVoiceButtonClick = (e) => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("음성 인식 API를 지원하지 않는 브라우저입니다.");
      return;
    }

    let newRecognition = !recognition
      ? new window.webkitSpeechRecognition()
      : recognition;
    if (!recognition) {
      newRecognition.lang = "ko-KR";
      newRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        // console.log(transcript);
        //말을 시작하고 끝나면 자동으로 멈추기.
        newRecognition.stop();
        setIsListening(false);
        setVoiceText(transcript);
      };
      setRecognition(newRecognition);

      //   newRecognition.onstart = () => {
      //     console.log("음성 인식 시작");
      //   };
    }

    if (isListening) {
      //   console.log("이제 멈춰!");
      newRecognition.stop();
      setIsListening(false);
    } else {
      //   console.log("이제 시작!");

      newRecognition?.start();
      setIsListening(true);
    }
  };

  const xForFileBtn = (name) => {
    return (
      <Button
        name={name}
        className={"mobileMain-x"}
        onclick={handleButtonClick}
        title={name}
      />
    );
  };

  const xForVoiceBtn = (name) => {
    return (
      <Button
        name={isListening && voiceWhat === name ? "중지" : name}
        icon={
          isListening && voiceWhat === name ? (
            <i className="fa-solid fa-microphone-slash"></i>
          ) : (
            <i className="fa-solid fa-microphone"></i>
          )
        }
        title={name}
        className={"mobileMain-x"}
        onclick={(e) => {
          setVoiceWhat(name);
          handleVoiceButtonClick(e);
        }}
        style={isListening && voiceWhat === name ? { color: "red" } : {}}
      />
    );
  };

  const saveSwal = (forWhat) => {
    return Swal.fire({
      title: "저장완료!",
      html: `${forWhat}에<br/> 내용이 저장되었습니다!<br/>(3초후 자동 닫힘)`,
      timer: 3000,
      icon: "success",
      confirmButtonText: "확인",
    });
  };

  const errorSwal = () => {
    return Swal.fire(
      "저장실패!",
      "반복적으로 저장이 실패할 경우 kerbong@gmail.com으로 증상을 설명해주세요!",
      "warning"
    );
  };

  /** 할일을 저장해주는 함수 */
  const saveTodayMemo = async (text) => {
    let todoRef = doc(dbService, "memo", props.userUid);
    let todoSnap = await getDoc(todoRef);
    let new_todoList = [...todoSnap?.data()?.memoTodo];

    // 띄어쓰기 기준으로 잘라봤을 때, 중요 / 긴급 라는 말이 들어있으면..  emg에 true
    let new_emg = text
      ?.split(" ")
      ?.filter((word) => word.includes("중요") || word.includes("긴급"));

    new_todoList.unshift({
      id: +(new_todoList.length + 1),
      text,
      checked: false,
      emg: new_emg?.length > 0 ? true : false,
    });
    try {
      const new_data = { memoTodo: new_todoList };
      await setDoc(todoRef, new_data);

      saveSwal("할일 목록");
    } catch (error) {
      errorSwal();
    }

    setVoiceText("");
    setVoiceWhat("");

    // console.log(new_todoList);
    // console.log(new_data);
  };

  function convertWeekdayToNumber(weekday) {
    const weekdays = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    return weekdays.indexOf(weekday);
  }

  /** 3월 4일에 축구대회 참가 3교시 =>{date: 2024-03-04 , text: 축구대회 참가, note: 3교시@} 반환함수 */
  const extractDate = (text) => {
    const datePattern = /(\d{1,2})월 (\d{1,2})일/g;
    const dayPattern = /(\d{1,2})일/g;
    const periodPattern = /(\d{1,2})교시에?/g;
    const nextMonthPattern = /다음 달|다음달/g;
    // const thisMonthPattern = /이번 달|이번달/g;
    const weekDayPattern =
      /(다음 주|다음주|이번주|이번 주|다음 달|다음달|이번 달|이번달) (\S요일)/g;

    let date;
    let dateMatch;
    let dayMatch;
    let periodMatch;
    let weekDayMatch;

    if ((dateMatch = datePattern.exec(text))) {
      date = dayjs(`${dayjs().year()}-${dateMatch[1]}-${dateMatch[2]}`);
      text = text.replace(dateMatch[0], "").trim();
    } else if ((dayMatch = dayPattern.exec(text))) {
      date = dayjs().date(dayMatch[1]);
      text = text.replace(dayMatch[0], "").trim();
    } else if ((weekDayMatch = weekDayPattern.exec(text))) {
      const weekOffset = weekDayMatch[1] === "다음주" ? 1 : 0;
      const dayOffset = convertWeekdayToNumber(weekDayMatch[2]);
      date = dayjs()
        .startOf("week")
        .add(weekOffset, "week")
        .add(dayOffset, "day");
      text = text.replace(weekDayMatch[0], "").trim();
    } else {
      date = dayjs();
    }

    if (nextMonthPattern.test(text)) {
      date = date.add(1, "month");
      text = text.replace(nextMonthPattern, "").trim();
    }

    let note = "";
    while ((periodMatch = periodPattern.exec(text))) {
      note += `${periodMatch[1]}교시 `;
      text = text.replace(periodMatch[0], "").trim();
    }

    date = date.format("YYYY-MM-DD");

    const returnData = {
      new_date: date,
      new_text: text.trim(),
      new_note: note.trim()?.length > 0 ? note.trim() + "@" : "",
    };
    // console.log(returnData);
    return returnData;
  };

  /** 일정을 저장해주는 함수 */
  const saveCalendarTodo = async (text) => {
    let todoRef = doc(dbService, "todo", props.userUid);
    let todoSnap = await getDoc(todoRef);
    let new_todoEvents = todoSnap?.data()?.todo_data || [];

    let splitText = text?.split(" ");
    let eventName;
    let id = dayjs().format("YYYY-MM-DD");
    let note = "";
    let option = "2자체행사";

    const { new_date, new_text, new_note } = extractDate(text);

    id = new_date;
    eventName = new_text;
    note = new_note;

    splitText?.forEach((word) => {
      // 날짜 관련 단어 확인하기, 기본 오늘, 내일, 모레 = 내일모레
      if (word.includes("오늘")) {
        id = dayjs().format("YYYY-MM-DD");
      } else if (word.includes("내일")) {
        id = dayjs().add(1, "d").format("YYYY-MM-DD");
      } else if (word.includes("모레" || "내일모레")) {
        id = dayjs().add(2, "d").format("YYYY-MM-DD");
      }

      //
    });

    const new_data = {
      id: id + eventName,
      eventName,
      note,
      option,
    };

    try {
      new_todoEvents.push(new_data);

      await setDoc(todoRef, { todo_data: new_todoEvents });
      //   console.log(new_todoEvents);
      saveSwal("메모 일정");
    } catch (error) {
      errorSwal();
    }

    setVoiceText("");
    setVoiceWhat("");

    // console.log(new_todoList);
    // console.log(new_data);
  };

  useEffect(() => {
    if (voiceText === "") return;
    let what = voiceWhat;
    let text = voiceText;

    if (what === "할일") {
      // 내용 그대로.. 할일에 저장해줌.
      saveTodayMemo(text);
    } else if (what === "일정") {
      saveCalendarTodo(text);
    }
  }, [voiceText]);

  const getDateHandler = (date) => {
    setDates(date);
  };

  const checkDayOfWeekAlert = () => {
    Swal.fire({
      icon: "error",
      title: "저장에 실패했어요!",
      html: "토 / 일요일은 저장이 불가능합니다. <br>날짜를 확인, 변경해주세요",
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
    });
  };

  /** 저장하는 함수, 변수에 따라 다른 로직 적용 */
  const saveAtdHandler = async (what) => {
    let start;
    let end;

    //시작날짜와 끝날짜가 다를 경우
    if (dates?.[1] !== null) {
      [start, end] = dates;
      //같은 경우
    } else {
      start = dates?.[0];
      end = dates?.[0];
    }
    //만약 시작날짜와 끝날짜가 같고 주말이면 저장하지 않기
    if (start.getDay() === 0 || start.getDay() === 6) {
      checkDayOfWeekAlert();
      return;
    }

    //주말 제외한 날짜만 모아두기
    let weekDayEvents = [];
    let curDate = start;
    let new_data_id;
    // 이미지 파일, 서류는 첫날짜에만 저장하도록...
    let start_id =
      dayjs(start).format("YYYY-MM-DD") +
      finalData.num +
      " " +
      dayjs().format("HH:mm");
    let new_option = "2질병결석";

    //날짜가 하루일 때를 분리하지 않으면 아마도.. 얕은 복사라 start와 end가 모두 1일씩 같이 늘어나서 while문이 무한실행
    if (start === end) {
      let selectDate = dayjs(start).format("YYYY-MM-DD");
      new_data_id = selectDate + finalData.num + " " + dayjs().format("HH:mm");
      weekDayEvents.push(new_data_id);
    } else {
      while (curDate <= end) {
        //주말(index 6 = 토, index 0 = 일)이면 저장안되도록!
        if (curDate.getDay() === 0 || curDate.getDay() === 6) {
          curDate.setDate(curDate.getDate() + 1);
        } else {
          let selectDate = dayjs(curDate).format("YYYY-MM-DD");
          new_data_id =
            selectDate + finalData.num + " " + dayjs().format("HH:mm");

          weekDayEvents.push(new_data_id);

          curDate.setDate(curDate.getDate() + 1);
        }
      }
    }

    //출결 데이터 받아오기
    const atdRef = doc(dbService, "attend", props.userUid);
    const atdDoc = await getDoc(atdRef);
    let new_attendEvents = [...atdDoc?.data()?.attend_data];

    //체험학습 신청서의 경우
    if (what === "request") {
      //저장가능한 날짜 중에 이미 저장된 데이터 있는지 확인하고 저장하기, 새로 시간을 저장하므로.. 동일한 데이터 있을 수도 있음. 날짜와 번호, 출결옵션이 같으면 동일 자료로 인식.

      weekDayEvents.forEach((data_id) => {
        let existAttend = new_attendEvents?.filter(
          (event) =>
            event.id.slice(0, 11) === data_id.slice(0, 11) &&
            event.option === "1현장체험"
        );
        //같은 날에 저장된 다른 자료가 없으면
        if (existAttend.length === 0) {
          //새로운 리스트에 추가해두기
          new_attendEvents.push({
            ...finalData,
            note: newRequestData[2] + newRequestData[3],
            id: data_id,
          });
        } else {
          new_attendEvents = new_attendEvents?.map((event) => {
            let new_event = event;
            if (
              event.id.slice(0, 11) === data_id.slice(0, 11) &&
              event.option === "1현장체험"
            ) {
              new_event["request"] = true;
            }
            return new_event;
          });
        }
      });

      //   체험학습 보고서 저장하기 [학생이름, 날짜]
    } else if (what === "report") {
      weekDayEvents.forEach((data_id) => {
        let existAttend = new_attendEvents?.filter(
          (event) =>
            event.id.slice(0, 11) === data_id.slice(0, 11) &&
            event.option === "1현장체험"
        );

        //같은 날에 저장된 다른 자료가 없으면
        if (existAttend.length === 0) {
          //새로운 리스트에 추가해두기
          new_attendEvents.push({
            ...finalData,
            note: "",
            id: data_id,
          });

          //같은 날에 저장된 동일한 옵션의 출결 자료가 있으면, 보고서 부분만 트루로 설정하기.
        } else {
          new_attendEvents = new_attendEvents?.map((event) => {
            let new_event = event;
            if (
              event.id.slice(0, 11) === data_id.slice(0, 11) &&
              event.option === "1현장체험"
            ) {
              new_event["report"] = true;
              //   //이미 있는 자료이므로.. 첫 날짜의 id를 변경
              //   start_id = event.id;
            }
            return new_event;
          });
        }
      });

      //   질병결석/인정결석/기타결석/경조사/조퇴/지각
    } else {
      if (what.includes("결석")) {
        if (what.includes("질병")) {
          new_option = "2질병결석";
        } else if (what.includes("인정")) {
          new_option = "5인정결석";
        } else if (what.includes("기타")) {
          new_option = "6기타결석";
        }
      } else if (what.includes("조퇴")) {
        new_option = "7조퇴";
      } else if (what.includes("지각")) {
        new_option = "8지각";
      } else if (what.includes("경조사")) {
        new_option = "4경조사";
      }

      weekDayEvents.forEach((data_id) => {
        let existAttend = new_attendEvents?.filter(
          (event) =>
            event.id.slice(0, 11) === data_id.slice(0, 11) &&
            event.option === new_option
        );

        //같은 날에 저장된 다른 자료가 없으면
        if (existAttend.length === 0) {
          //새로운 리스트에 추가해두기
          new_attendEvents.push({
            ...finalData,
            note: what || "",
            id: data_id,
            option: new_option,
          });

          //같은 날에 저장된 동일한 옵션의 출결 자료가 있으면, 보고서 부분만 트루로 설정하기.
        } else {
          new_attendEvents = new_attendEvents?.map((event) => {
            let new_event = event;
            if (
              event.id.slice(0, 11) === data_id.slice(0, 11) &&
              event.option === new_option
            ) {
              new_event["paper"] = true;
            }
            return new_event;
          });
        }
      });
    }

    // 저장할 자료들이 추가된 리스트를 업로드하기
    //   console.log(new_attendEvents);
    await setDoc(doc(dbService, "attend", props.userUid), {
      attend_data: new_attendEvents,
    });
    saveSwal("출결");
    //신청서 데이터도 스토리지에 업로드하기.
    let address =
      what === "request"
        ? `${props.userUid}/attend/${start_id}/request`
        : what === "report"
        ? `${props.userUid}/attend/${start_id}/report`
        : `${props.userUid}/attend/${start_id}/${new_option?.slice(1)}`;

    await uploadString(ref(storageService, address), attachedFile, "data_url");

    // ocr 관련 초기화.
    setNewRequestData(null);
    setDates(null);
    setOcrResult("");
  };

  useEffect(() => {
    if (newRequestData === null) {
      setFinalData(null);
      setOcrResult("");
    }
  }, [newRequestData]);

  //**  "2022년 9월 12일부터 2022년 9월 14일까지 (3일간)" 이런 기간을 받아서.. [시작날짜, 끝날짜]로 반환해주는 함수 */
  function extractDates(dateString) {
    // 시작하는 날짜와 끝나는 날짜를 추출하기 위한 정규 표현식 패턴
    const pattern = /\d{4}년 \d{1,2}월 \d{1,2}일/g;

    // 정규 표현식을 사용하여 날짜 문자열 추출
    const dates = dateString.match(pattern);

    // 날짜 형식을 "YYYY-MM-DD"로 변환하여 반환
    const formattedDates = dates.map((date) => {
      const [year, month, day] = date.match(/\d+/g);
      return new Date(
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      );
    });

    return formattedDates;
  }

  //날짜 폰트 두껍게
  useEffect(() => {
    const dateBtn = document.getElementById("custom-input");
    if (!dateBtn) return;
    dateBtn.style.fontWeight = "bold";
  }, []);

  return (
    <div className={classes["main"]}>
      {/* 체험학습 신청서 내용 확인 모달 */}
      {newRequestData !== null && (
        <ExampleModal
          onClose={() => {
            setNewRequestData(null);
          }}
          title={
            newRequestData?.length === 4
              ? "체험학습 신청서 내용확인"
              : newRequestData?.length === 2
              ? "체험학습 보고서 내용 확인"
              : newRequestData?.length === 3
              ? newRequestData[2]
              : ""
          }
          addStyle={""}
          text={
            <>
              <div>
                <span>학생이름(클릭해서 수정)</span>
                <br />
                <span
                  style={{ fontWeight: "bold", margin: "10px" }}
                  onClick={() => showConsultStdSwal(true)}
                >
                  {newRequestData[0]}
                </span>
              </div>
              <br />

              <div className={classes["dates-div"]}>
                <span>날짜(클릭해서 수정)</span>
                <span style={{ margin: "10px" }}>
                  <AttendCalendar
                    setStart={dates?.[0] || new Date()}
                    setEnd={dates?.[1] || dates?.[0] || new Date()}
                    getDateValue={getDateHandler}
                    about={"attendance"}
                    getMonthValue={() => {}}
                  />
                </span>
              </div>
              {/* gpt 해석 내용 모달의 사유 */}
              {newRequestData?.length === 3 && (
                <div>
                  <span>사유</span>
                  <br />
                  <span style={{ fontWeight: "bold", margin: "10px" }}>
                    <Input
                      className={"gptResult-input"}
                      getValue={true}
                      getValueHandler={(e) => {
                        let new_reason = e.target.value;
                        let new_requestData = [...newRequestData];
                        new_requestData[2] = new_reason;
                        setNewRequestData(new_requestData);
                      }}
                      defaultValue={newRequestData[2]}
                      input={{
                        type: "text",
                      }}
                    />
                  </span>
                </div>
              )}

              {/* gpt 해석 내용 모달의 목적지 */}
              {newRequestData?.length === 4 && (
                <div>
                  <span>목적지</span>
                  <br />
                  <span style={{ fontWeight: "bold", margin: "10px" }}>
                    <Input
                      className={"gptResult-input"}
                      getValue={true}
                      getValueHandler={(e) => {
                        let new_destination = e.target.value;
                        let new_requestData = [...newRequestData];
                        new_requestData[2] = new_destination;
                        setNewRequestData(new_requestData);
                      }}
                      defaultValue={newRequestData[2]}
                      input={{
                        type: "text",
                      }}
                    />
                  </span>
                </div>
              )}

              <br />

              {newRequestData?.length === 4 && (
                <div>
                  <span>보호자 연락처</span>
                  <br />
                  <span style={{ fontWeight: "bold", margin: "10px" }}>
                    <Input
                      className={"gptResult-input"}
                      getValue={true}
                      getValueHandler={(e) => {
                        let new_phone = e.target.value;
                        let new_requestData = [...newRequestData];
                        new_requestData[3] = new_phone;
                        setNewRequestData(new_requestData);
                      }}
                      defaultValue={newRequestData[3]}
                      input={{
                        type: "text",
                      }}
                    />
                  </span>
                </div>
              )}

              <br />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  name={"취소"}
                  className={"mobileMain-x"}
                  onclick={() => {
                    setNewRequestData(null);
                  }}
                />
                <Button
                  name={"저장"}
                  className={"mobileMain-x"}
                  onclick={() => {
                    let whatOption =
                      newRequestData?.length === 4
                        ? "request"
                        : newRequestData?.length === 2
                        ? "report"
                        : newRequestData?.length === 3
                        ? newRequestData[2]
                        : "";
                    saveAtdHandler(whatOption);
                  }}
                />
              </div>
            </>
          }
        />
      )}

      {/* 나중에.. 좋은 이미지로 채워질 공간, */}
      <div className={classes["img-div"]}>
        {!isListening && "테스트 중입니다."}
        {/* 일정 듣는중 */}
        {isListening && voiceWhat === "일정" && (
          <div>
            <br />
            <b>[메모] - [일정] 음성등록</b>
            <br />
            <br />
            <b>예)</b> '3월 8일 4교시 1학기 회장부회장 선거'
            <br />
            <br />
            <b>예)</b> '이번주 금요일 오후 3시 <br />
            과학실에서 교직원회의'
          </div>
        )}
        {/* 할일 듣는중 */}
        {isListening && voiceWhat === "할일" && (
          <div>
            <br />
            <b>[메모] - [할일] 음성등록</b>
            <br />
            <br />
            <b>예)</b> '3시까지 학생명부파일 제출'
            <br />
            <br />
            <b>예)</b> '독서록 제출 안내'
          </div>
        )}
        {/*ocr 분석 대기중 */}
        {isLoading && (
          <div className={classes["wating-div"]}>
            <span
              className={
                ocrResult === ""
                  ? classes["wating-span-now"]
                  : classes["wating-span"]
              }
            >
              텍스트 인식중
              <br />
              *최대 5초 소요
            </span>
            <span>&nbsp;&nbsp; 👉🏼 &nbsp;&nbsp;</span>
            <span
              className={
                ocrResult !== ""
                  ? classes["wating-span-now"]
                  : classes["wating-span"]
              }
            >
              GPT 파일 분석중
              <br />
              *최대 10초 소요
            </span>
          </div>
        )}
      </div>
      {/* 이미지 파일 혹은 카메라 촬영 */}
      <input
        type="file"
        accept="image/*;capture=camera"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={handleFileChange}
      />

      <Button
        name={"PC 메인화면"}
        className={"mobileMain-2x"}
        onclick={() => navigate(`/main`)}
      />

      {/* 처음 세팅, 오른손 잡이용 */}
      {!isLeft && (
        <>
          {/* 왼쪽으로 몰기 */}
          <Button
            name={"왼쪽으로 옮기기 👈🏼"}
            className={"mobileMain-move"}
            onclick={() => setIsLeft(true)}
          />
          {xForVoiceBtn("일정")}
          {xForVoiceBtn("할일")}

          {/* 일단 비워두기 */}
          <Button
            name={""}
            className={"mobileMain-x"}
            style={{ backgroundColor: "inherit" }}
          />
          {xForFileBtn("상담")}
          {!isSubject && xForFileBtn("출결")}
        </>
      )}

      {/* 왼손 잡이용 */}
      {isLeft && (
        <>
          {xForVoiceBtn("할일")}
          {xForVoiceBtn("일정")}

          {/* 오른쪽으로 몰기 */}
          <Button
            name={"오른쪽으로 옮기기 👉🏼"}
            className={"mobileMain-move"}
            onclick={() => setIsLeft(false)}
          />
          {!isSubject && xForFileBtn("출결")}
          {xForFileBtn("상담")}

          {/* 일단 비워두기 */}
          <Button
            name={""}
            className={"mobileMain-x"}
            style={{ backgroundColor: "inherit" }}
          />
        </>
      )}
    </div>
  );
};

export default MobileMain;
