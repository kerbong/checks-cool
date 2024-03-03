import React, { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import classes from "./StudentLiWithDelete.module.css";
import Swal from "sweetalert2";

import ocrImgExample from "../../assets/student/ocr-img-example.jpg";

const StudentInputByOcr = (props) => {
  const fileInfoInput = useRef(null);
  const [studentsByOcr, setstudentsByOcr] = useState(props.studentsInfo);

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
        //이미 세번 시도한 경우 에러메세지
        if (item.value > 10) {
          Swal.fire({
            icon: "error",
            title: "인식불가",
            text: "다른 선생님들을 위해서 하루에 10번까지만 OCR기능 활용이 가능합니다. 직접입력 / 엑셀파일 업로드 기능을 활용해주세요. 원활하지 못한 자동인식에 죄송하고, 배려 감사합니다! ",
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

    //구글 ocr 자료 분석실행
    const API_KEY = process.env.REACT_APP_GOOGLE_OCR_API_KEY;

    let first_sumNum = [];
    let sumName = [];
    let sumStudents = [];
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
        const ocrTexts = data.responses[0].fullTextAnnotation.text;

        // console.log(data.responses[0]);
        // 숫자가 아닌 것들 빈칸으로 만들었다가 지우고 배열로 만들기
        first_sumNum = ocrTexts
          .replace(/[^0-9]+/g, " ")
          .trim(" ")
          .split(" ");

        let sumNum = [];
        first_sumNum.forEach((num, num_index) => {
          // 이전 숫자와 연속성을 갖거나 다음 숫자와 연속성을 가지면 그대로 반환,
          if (
            +first_sumNum[num_index + 1] - 1 === +num ||
            +first_sumNum[num_index - 1] + 1 === +num
          ) {
            sumNum.push(num);
            // console.log("그대로 반환");
            // 이전과 다음 숫자의 연속성이 없으면 다음 숫자에서 이전 숫자 차이 변수로 지정
          } else {
            // console.log("수정 중");
            //일단 이전 숫자에 +1 을 해주고, 그 숫자가 다음 인덱스 숫자와 다르면 push 해주기

            let diffPrevNext = Math.abs(
              +first_sumNum[num_index + 1] - +first_sumNum[num_index - 1]
            );
            if (diffPrevNext >= 4) {
              // 다음값의 일의 자리수가 2이면 현재값을 다음값 -1로
              if (first_sumNum[num_index + 1].slice(1) === "2") {
                sumNum.push(String(+first_sumNum[num_index + 1] - 1));
                // 이전값에 +1 한게 다음값과 같지 않으면 추가
              } else if (
                String(+sumNum[num_index - 1] + 1) !==
                first_sumNum[num_index + 1]
              ) {
                sumNum.push(String(+sumNum[num_index - 1] + 1));
              }
              //만약 차이가 3이면... 숫자를 두개 만들어서 넣어주고,
            } else if (diffPrevNext === 3) {
              sumNum.push(String(+first_sumNum[num_index - 1] + 1));
              sumNum.push(String(+first_sumNum[num_index - 1] + 2));
              // 만약 이전 숫자와 다음 숫자 값의 차이가 2이면, 이전 숫자에 1더하면 되고
            } else if (diffPrevNext === 2) {
              sumNum.push(String(+first_sumNum[num_index - 1] + 1));
            }
          }
        });

        //한글이 아닌 것들 빈칸으로 만들었다가 한글배열로 만들기
        sumName = ocrTexts
          .replace(/[^ㄱ-ㅎ가-힣]+/g, " ")
          .trim(" ")
          .split(" ");

        //성별이나 다른 학급자료 등 잘린 자료가 있는경우 삭제하기..
        sumName = sumName?.filter(
          (name) =>
            // 한 글자가 아니고 4글자 이하인 것들만
            name.length !== 1 && name.length < 5
        );

        sumNum.forEach((num) => {
          let name = sumName.shift();
          //혹시 이름이 부족할 경우..
          if (name === undefined) {
            name = "재입력";
          }
          sumStudents.push({ num: num, name: name, woman: false });
        });

        setstudentsByOcr([...sumStudents]);
        props.setAddStudentsInfo([...sumStudents]);
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

  const actionImgCompress = async (fileSrc) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      //   압축 결과
      const compressedFile = await imageCompression(fileSrc, options);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        // 변환 완료!
        const base64data = reader.result;
        //구글image파일 ocr 하기
        googleImageOcrHandler(base64data.split(",")[1]);
      };
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "인식불가",
        text: "파일 변환과정에서 오류가 생겼어요. 문제가 반복되시면 kerbong@gmail.com으로 알려주세요!",
      });
      // console.log(error);
    }
  };

  const imageFileHandler = async (e) => {
    let input = e.target;
    // console.log(input.files[0]);
    if (input.files[0] !== undefined) {
      actionImgCompress(input.files[0]);
    } else {
      return;
    }
  };

  return (
    <>
      {!props.isSubject ? (
        <>
          <div className={classes["btn-div"]}>
            <>
              <label
                id="imageFileLabel"
                htmlFor="imageFile"
                className={classes["image-upload-btn"]}
              >
                <i className="fa-regular fa-file-image"></i> 업로드
              </label>
              <input
                type="file"
                id="imageFile"
                ref={fileInfoInput}
                onChange={imageFileHandler}
                style={{ display: "none" }}
                accept={".jpg,.jpeg"}
              />
            </>
          </div>
          <div className={classes["span-expain"]}>
            {studentsByOcr?.length === 0 && (
              <>
                <img src={ocrImgExample} alt="" />
              </>
            )}
            <hr className={classes["hr"]} />
            <span className={classes["span-title"]}>
              명렬표 이미지로 학생등록
            </span>
            <hr className={classes["hr"]} />

            <span>
              <span className={classes["span-highlight"]}>번호, 이름만</span>{" "}
              보이도록 명렬표 촬영하기
            </span>

            <span>
              업로드 버튼으로{" "}
              <span className={classes["span-highlight"]}>파일 불러오기!</span>
            </span>
            <span>
              성별 입력 및 내용확인 후
              <span className={classes["span-highlight"]}> 저장누르기</span>
            </span>

            <a
              href="https://kerbong.notion.site/50edba6218114a3e9a52981988c6db04"
              target="_blank"
              rel="noreferrer"
            >
              설명서 보러가기
            </a>
            <hr className={classes["hr"]} />
          </div>

          {studentsByOcr?.length !== 0 && (
            <div className={classes.studentListArea}>
              {studentsByOcr?.map((stu) => (
                <li
                  key={stu.num + stu.name}
                  id={stu.num}
                  className={classes.inputStudentLi}
                >
                  <span className={classes.studentNumName}>
                    {stu.num + " " + stu.name}
                  </span>
                </li>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className={classes["span-expain"]}>
          전담선생님은 엑셀업로드 / 직접 입력을 활용해주세요!
        </div>
      )}
    </>
  );
};

export default StudentInputByOcr;
