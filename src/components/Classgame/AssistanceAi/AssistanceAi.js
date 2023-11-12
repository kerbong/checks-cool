import React, { useEffect, useState } from "react";
import Loading from "components/page/Loading";
import { dbService } from "../../../fbase";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

import OpenAI from "openai";

const AssistanceAi = (props) => {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openAi, setOpenAi] = useState(null);

  useEffect(() => {
    if (!props.message) return;
    setTweet(props.message?.trim());
  }, [props.message]);

  useEffect(() => {
    if (!tweet) return;
    callOpenAiApi();
  }, [tweet]);

  useEffect(() => {
    if (!openAi) return;
    responseCall();
  }, [openAi]);

  useEffect(() => {
    if (!sentiment) return;
    setIsLoading(false);
  }, [sentiment]);

  // 버튼누르면 api 요청해서 받아와서 물어보기..
  const callOpenAiApi = async () => {
    //로딩중이면 취소하기
    if (isLoading) return;

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

  const responseCall = async () => {
    setIsLoading(true);
    const completion = await openAi.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "주어진 내용으로 초등학생이 활동할 때 꼭 준비할 것들. 번호가 있는 알림장 형태로 '~하기'로 문장 끝내기",
        },
        { role: "user", content: tweet },
      ],
      model: "gpt-3.5-turbo-1106",
    });

    setSentiment(completion?.choices[0]?.message?.content);
  };

  function addLineBreaks(input) {
    const lines = input.split(" ");
    let result = "";
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].endsWith(".")) {
        result += lines[i] + "\n";
      } else {
        result += lines[i] + " ";
      }
    }
    return result;
  }

  return (
    // <div style={{ marginTop: "-50px" }}>
    <div>
      <h3>* Ai알림장이 작성되면 아래에 표시됩니다. (최대 15초 소요)</h3>
      {/* <span>
        (테스트중입니다. 기간 대비 과도한 금액이 청구되면..
        <br /> 사라집니다.. 혹시 작동하지 않으면 허용치 초과입니다!)
      </span>
      <br />
      <br /> */}

      {/* 직접 작성하기 */}
      {/* <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <textarea
          onChange={(e) => setTweet(e.target.value)}
          cols={50}
          rows={4}
          style={{ resize: "none", padding: "10px", borderRadius: "10px" }}
          placeholder={
            "물어보고 싶은 내용을 입력해주세요! (예) 6학년 학부모를 대상으로 친절한 학부모총회 안내장 써줘"
          }
        />
      </div> */}

      <div>
        {/* {!isLoading ? ( */}
        <>
          {/* <button
              onClick={callOpenAiApi}
              style={{
                padding: "15px",
                backgroundColor: "#e5c100",
                borderWidth: "0",
                borderRadius: "10px",
              }}
            >
              Open AI 비서에게 물어보기
            </button>
            <p></p>
            <p>
              * 더 많은 사용을 하시려면 직접 사이트를 방문해서 무료로
              활용해주세요!
            </p>
            <p>
              * 개발자는..누적 사용량에 따라 돈을 냅니다!!😭
              <a href="https://chat.openai.com/auth/login">Chat GPT</a>
            </p> */}
        </>
        {/* ) : (
          <>
            <Loading />
          </>
        )} */}

        {/* {isLoading && <Loading />} */}

        {sentiment !== "" ? (
          <div
            style={{
              padding: "25px",
              margin: "15px",
              borderRadius: "15px",
              backgroundColor: "lightgray",
              fontWeight: "200",
            }}
          >
            {" "}
            {addLineBreaks(sentiment)}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AssistanceAi;
