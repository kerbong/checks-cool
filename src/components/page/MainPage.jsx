import React from "react";
import Button from "../Layout/Button";

const MainPage = () => {
  return (
    <>
      <Button name={"출결"} path={"attendance"} />
      <Button name={"상담"} path={"consulting"} />
      <Button name={"할일"} path={"todo"} />
      <Button name={"기록"} path={"memo"} />
      <Button name={"놀이"} path={"classgame"} />
    </>
  );
};

export default MainPage;
