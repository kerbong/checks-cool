import React, { useRef, useState } from "react";
import Button from "../Layout/Button";
import imageCompression from "browser-image-compression";
import classes from "./StudentLiWithDelete.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const StudentInputByOcr = (props) => {
  const fileInfoInput = useRef(null);
  const [studentsByOcr, setstudentsByOcr] = useState(props.studentsInfo);
  const [count, setCount] = useState(0);
  const [today, setToday] = useState(new Date().getDate());

  // 네이버 ocr 실험
  const imageOcrHandler = async (img) => {
    if (new Date().getDate() !== today) {
      setCount(0);
      setToday(new Date());
    }

    if (count >= 2) {
      Swal.fire({
        icon: "error",
        title: "인식이 불가능해요",
        text: "하루 사용량을 초과하셨어요! 다른 방법을 활용해주세요",
        confirmButtonText: "확인",
        confirmButtonColor: "#85bd82",
        timer: 5000,
      });
      return;
    }

    const URL = process.env.REACT_APP_NAVER_OCR_APIGW_URL;
    const KEY = process.env.REACT_APP_NAVER_OCR_KEY;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-OCR-SECRET": KEY,
      },
    };
    let sumNum = [];
    let sumName = [];
    let sumStudents = [];
    await axios
      .post(
        URL,
        {
          version: "v2",
          requestId: "sample_id",
          timestamp: 0,
          lang: "ko",
          images: [
            {
              format: "jpeg",
              name: "sample_image",
              data: img,
            },
          ],
        },
        config
      )
      .then((res) => {
        res.data.images[0].fields.forEach((element) => {
          let inferText = element.inferText;
          //숫자가 아닌 문자의 경우
          if (isNaN(Number(inferText))) {
            sumName.push(inferText);
            //숫자인 경우
          } else {
            sumNum.push(inferText);
          }
        });
        sumNum.forEach((num) => {
          let name = sumName.shift();
          //혹시 이름이 부족할 경우..
          if (name === undefined) {
            name = "";
          }
          sumStudents.push({ num: num, name: name });
        });
        console.log(sumStudents);
        setstudentsByOcr([...sumStudents]);
        setCount((prev) => prev + 1);
        console.log(URL);
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
    console.log("압축 시작");

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      //   압축 결과
      const compressedFile = await imageCompression(fileSrc, options);
      console.log(compressedFile);
      // FileReader 는 File 혹은 Blob 객체를 이용하여, 파일의 내용을 읽을 수 있게 해주는 Web API
      //   quickStart(fileSrc);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        // 변환 완료!
        const base64data = reader.result;
        //image파일 ocr 하기
        imageOcrHandler(base64data.split(",")[1]);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const imageFileHandler = async (e) => {
    let input = e.target;
    console.log(input.files[0]);
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
            //   className={classes.fileUploadBtn}
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
        <span>
          1. 명렬표에서{" "}
          <span className={classes["span-highlight"]}>번호, 이름만</span>{" "}
          보이도록 촬영
        </span>

        <span>
          2. (1)번으로 불러오고{" "}
          <span className={classes["span-highlight"]}>(2)번 버튼</span>을 눌러서
        </span>
        <span>수정, 저장화면으로 이동하여 저장하기</span>
        <span>
          *<span className={classes["span-highlight"]}>하루에 한 번만</span>
          사용해주세요!
        </span>
      </div>

      {studentsByOcr.length !== 0 && (
        <div className={classes.studentListArea}>
          {studentsByOcr.map((stu) => (
            <li key={stu.num} id={stu.num} className={classes.inputStudentLi}>
              <span className={classes.studentNumName}>
                {stu.num + " " + stu.name}
              </span>
            </li>
          ))}
        </div>
      )}

      <span>
        * 문제가 지속되시면 kerbong@gmail.com으로 알려주세요. 최대한 빠르게
        해결해 드릴게요!
      </span>
    </>
  );
};

export default StudentInputByOcr;
