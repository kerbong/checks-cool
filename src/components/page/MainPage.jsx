import React from "react";
import Button from "../Layout/Button";

const MainPage = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Button
        name={"출결"}
        path={"attendance"}
        className="big-menu"
        icon={<i className="fa-regular fa-address-book"></i>}
      />
      <Button
        name={"상담"}
        path={"consulting"}
        className="big-menu"
        icon={<i className="fa-regular fa-comments"></i>}
      />
      <Button
        name={"일정"}
        path={"todo"}
        className="big-menu"
        icon={<i className="fa-regular fa-calendar-check"></i>}
      />
      <Button
        name={"기록"}
        path={"memo"}
        className="big-menu"
        icon={<i className="fa-regular fa-note-sticky"></i>}
      />
      <Button
        name={"놀이"}
        path={"classgame"}
        className="big-menu"
        icon={<i className="fa-solid fa-gamepad"></i>}
      />
      <Button
        name={"명단"}
        path={"student-manage"}
        className="big-menu"
        icon={<i className="fa-solid fa-user-plus"></i>}
      />
      <p>*처음오시면 먼저 학생명단을 입력해주세요!</p>
      <p>*메뉴의 곰돌이를 누르면 현재 화면으로 오실 수 있어요!</p>
    </div>
  );
};

export default MainPage;
