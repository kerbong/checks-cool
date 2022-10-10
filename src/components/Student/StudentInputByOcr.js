import React, { useRef } from "react";
import Button from "../Layout/Button";
import imageCompression from "browser-image-compression";

import axios from "axios";
// import fs from "fs";

const StudentInputByOcr = (props) => {
  const fileInfoInput = useRef(null);

  // 네이버 ocr 실험
  const imageOcrHandler = async (img) => {
    const URL = process.env.REACT_APP_NAVER_OCR_APIGW_URL;
    const KEY = process.env.REACT_APP_NAVER_OCR_KEY;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-OCR-SECRET": KEY,
      },
    };
    let timestamp = new Date().getTime();
    let sumText = "";

    axios
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
              data: img.split(",")[1],
              //   data: img,
            },
          ],

          enableTableDetection: true,
        },
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
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
        console.log(base64data.split(",")[1]);

        //image파일 ocr 하기
        imageOcrHandler(base64data);
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
      <label
        id="imageFileLabel"
        htmlFor="imageFile"
        //   className={classes.fileUploadBtn}
        style={{
          height: "26px",
          width: "28px",
          padding: "12px",
          color: "#000000",
          backgroundColor: "#a66fc8b3",
        }}
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
      <Button
        className="student-save"
        name={
          <>
            2 <i className="fa-regular fa-floppy-disk"></i>
          </>
        }
        onclick={props.uploadStudentsInfo}
      />
    </>
  );
};

export default StudentInputByOcr;
