import React, { useRef } from "react";
import Button from "../Layout/Button";
import imageCompression from "browser-image-compression";
import axios from "axios";
// import vision from "@google-cloud/vision";

const StudentInputByOcr = (props) => {
  const fileInfoInput = useRef(null);

  //   const quickStart = async (file) => {
  //     const client = new vision.ImageAnnotatorClient();

  //     const [result] = await client.labelDetection(file);
  //     const labels = result.labelAnnotations;
  //     console.log("Labels. ");
  //     console.log(labels);
  //     // labels.forEach((label) => console.log(label.description));
  //   };

  const imageOcrHandler = async (img) => {
    const URL = process.env.NAVER_OCR_APIGW_URL;
    // const URL =
    //   "https://a4929zexaf.apigw.ntruss.com/custom/v1/18557/6d58ba3626b8ecce640f3a4a64775e2dcc85d6813b60f59583d9a3f8f1ce75e7/general";
    // const KEY = `${process.env.NAVER_OCR_KEY}=`;
    const KEY = `"${process.env.NAVER_OCR_KEY}"`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-OCR-SECRET": KEY,
      },
    };
    let timestamp = new Date().getTime();

    await axios
      .post(
        URL,
        {
          images: [
            {
              name: "sample_image",
              format: "jpg",
              //   data: img.split(",")[1],
              data: img,
            },
          ],
          lang: "ko",
          requestId: "sample_id",
          enableTableDetection: true,
          timestamp: timestamp,
          version: "v1",
        },
        config
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.images[0]);
        console.log(res.data.images[0].fields);
      })
      .catch((error) => console.log(error));

    // const data = {
    //   version: "V1",
    //   // 요청을 구분하기 위한 ID, 사용자가 정의
    //   requestId: "sample_id",
    //   // # 현재 시간값
    //   lang: "ko",
    //   timestamp: 0,
    //   images: [
    //     {
    //       name: "sample_image",
    //       format: "jpeg",
    //       data: img.split(",")[1],
    //     },
    //   ],
    //   enableTableDetection: true,
    // };

    // await fetch(URL, {
    //   method: "POST", // POST

    //   body: JSON.stringify(data),
    // }).then((res) => console.log(res.json()));
    // .then((res) => console.log(res.images[0].fields));
    //   .then((res) => res.json())
    //   .then((json) => console.log(json));
    // let resData = await res.json();
    // console.log(resData);
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

      // FileReader 는 File 혹은 Blob 객체를 이용하여, 파일의 내용을 읽을 수 있게 해주는 Web API
      //   quickStart(compressedFile);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        // 변환 완료!
        const base64data = reader.result;
        console.log(base64data);

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
