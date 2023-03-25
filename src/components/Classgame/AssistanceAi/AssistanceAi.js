import React, { useState } from "react";
import Loading from "components/page/Loading";
import { dbService } from "../../../fbase";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const AssistanceAi = () => {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 버튼누르면 api 요청해서 받아와서 물어보기..
  const callOpenAiApi = async () => {
    //firebase에 저장해두고 물어보기
    let aiApiRef = doc(dbService, "apis", "apifromkerbonggmail");

    const aiApiDoc = await getDoc(aiApiRef);
    const API_KEY = aiApiDoc.data().open_ai_api;

    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "최대한 요약해서 초등교사에게 설명",
        },
        { role: "user", content: tweet },
      ],
      //   prompt: tweet,
      temperature: 0.7,
      max_tokens: 300,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    setIsLoading(true);
    //15초 이후에 대답 없으면 취소
    let timer;
    const cancelSwalHandler = () => {
      timer = setTimeout(() => {
        Swal.fire(
          "요청 실패",
          "답변시간이 초과되어 요청이 실패했습니다! 다른 질문을 준비해주세요!",
          "warning"
        );
        setIsLoading(false);
      }, 15000);
    };
    cancelSwalHandler();

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setSentiment(data?.choices?.[0]?.message?.content); // Positive or negative
        setIsLoading(false);
        //답변 완료 시 타이머 해제
        clearTimeout(timer);
      })
      .catch((error) => {
        // console.log(error);
        setIsLoading(false);
      });
  };
  return (
    <div style={{ marginTop: "-50px" }}>
      <h2>비서에게 물어봐요😎</h2>

      <h3>
        갑자기 궁금한 게 생기시면 물어보세요!
        <br />* 최대 15초가 소요됩니다.
      </h3>
      <span>
        (테스트중입니다. 기간 대비 과도한 금액이 청구되면..
        <br /> 사라집니다.. 혹시 작동하지 않으면 허용치 초과입니다!)
      </span>
      <br />
      <br />
      <div
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
      </div>
      <div>
        {!isLoading ? (
          <>
            <button
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
            </p>
            {sentiment !== "" ? <h3> {sentiment}</h3> : null}
          </>
        ) : (
          <>
            <Loading />
          </>
        )}
      </div>
    </div>
  );
};

export default AssistanceAi;
