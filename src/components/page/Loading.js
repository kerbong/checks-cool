import React from "react";
import classes from "./Loading.module.css";
import Spinner from "../../assets/Spinner250px.gif";

const Loading = () => {
  return (
    <div id="background" className={classes["background"]}>
      <div className={classes["text"]}>잠시만 기다려주세요.</div>
      <img src={Spinner} alt="로딩중" width="10%" />
    </div>
  );
};

export default Loading;
