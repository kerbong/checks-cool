import React, { useRef, useState } from "react";
import Button from "../Layout/Button";
import imageCompression from "browser-image-compression";
import classes from "./StudentLiWithDelete.module.css";
import Swal from "sweetalert2";

import imageOcrExample from "../../assets/student/image-ocr-example.jpg";

const StudentInputByOcr = (props) => {
  const fileInfoInput = useRef(null);
  const [studentsByOcr, setstudentsByOcr] = useState(props.studentsInfo);

  //구글ocr
  const googleImageOcrHandler = async (base64Img) => {
    const API_KEY = process.env.REACT_APP_GOOGLE_OCR_API_KEY;

    let sumNum = [];
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

        console.log(data.responses[0]);
        // 숫자가 아닌 것들 빈칸으로 만들었다가 지우고 배열로 만들기
        sumNum = ocrTexts
          .replace(/[^0-9]+/g, " ")
          .trim(" ")
          .split(" ")
          .sort((a, b) => a - b);
        //한글이 아닌 것들 빈칸으로 만들었다가 배열로 만들기
        sumName = ocrTexts
          .replace(/[^ㄱ-ㅎ가-힣]+/g, " ")
          .trim(" ")
          .split(" ");

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
      console.log(error);
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
      <div>
        <>
          <label
            id="imageFileLabel"
            htmlFor="imageFile"
            className={classes["image-upload-btn"]}
          >
            1 <i className="fa-regular fa-file-image"></i>
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
        <Button
          className="student-save"
          name={
            <>
              2 <i className="fa-solid fa-circle-arrow-up"></i>
            </>
          }
          onclick={() => props.setAddStudentsInfo(studentsByOcr)}
        />
      </div>
      <div className={classes["span-expain"]}>
        {studentsByOcr.length === 0 && (
          <>
            <img src={imageOcrExample} alt="" />
          </>
        )}
        <hr className={classes["hr"]} />
        <span className={classes["span-title"]}>명렬표 이미지로 학생등록</span>
        <hr className={classes["hr"]} />

        <span>
          <span className={classes["span-highlight"]}>번호, 이름만</span>{" "}
          보이도록 명렬표 촬영 및 자르기
        </span>

        <span>
          1번 버튼으로 파일 불러와서{" "}
          <span className={classes["span-highlight"]}>내용 확인!</span>
        </span>
        <span>
          2번 버튼으로 번호와 이름
          <span className={classes["span-highlight"]}> 수정/저장</span>
        </span>
        <hr className={classes["hr"]} />
        <span className={classes["span-small"]}>
          * 인쇄된 파일을 촬영하면 인식률이 높아집니다.
          <br />
          * 화면 왼쪽 상단의 보라색 [학생등록]
          <br />
          버튼을 누르시면 예시를 보실 수 있어요!
        </span>
        <hr className={classes["hr"]} />
      </div>

      {studentsByOcr.length !== 0 && (
        <div className={classes.studentListArea}>
          {studentsByOcr.map((stu) => (
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
  );
};

export default StudentInputByOcr;
