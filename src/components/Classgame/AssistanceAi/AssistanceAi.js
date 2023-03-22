import React, { useState } from "react";
import Loading from "components/page/Loading";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const AssistanceAi = () => {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callOpenAiApi = async () => {
    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "full summarizing",
        },
        { role: "user", content: tweet },
      ],
      //   prompt: tweet,
      temperature: 0.7,
      max_tokens: 200,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    setIsLoading(true);

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setSentiment(data.choices[0].message.content); // Positive or negative
        setIsLoading(false);
      });
  };
  return (
    <div style={{ marginTop: "-50px" }}>
      <h2>비서에게 물어봐요😎</h2>
      <span>
        (테스트중입니다. 기간 대비 과도한 금액이 청구되면.. 사라질 서비스...)
      </span>
      <h3>
        갑자기 궁금한 게 생기시면 물어보세요!
        <br />* 답변까지는 5초 전후가 소요됩니다.
      </h3>

      <div>
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
