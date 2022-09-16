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
    </div>
  );
};

export default MainPage;
