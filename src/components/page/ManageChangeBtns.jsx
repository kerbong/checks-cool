import React, { useEffect, useState } from "react";
import Button from "components/Layout/Button";
import { useNavigate } from "react-router-dom";
import classes from "./ManageEach.module.css";

const ManageChangeBtns = (props) => {
  const [nowOn, setNowOn] = useState("");
  const [onStudent, setOnStudent] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    let where = window.location.href.split("/");
    setNowOn(where[where.length - 1]);
    console.log(nowOn);
  }, [window.location.href]);

  useEffect(() => {
    if (props.onStudent !== "") {
      setOnStudent(props.onStudent);
    }
  }, [props.onStudent]);

  return (
    <div className={classes["btns-div"]}>
      <Button
        name={"정보"}
        className={
          nowOn !== "manageStudent" ? "manageBtn" : "manageBtn-clicked"
        }
        onclick={() => navigate(`/manageStudent`, { state: onStudent })}
      />
      <Button
        name={"출결"}
        className={
          nowOn !== "manageAttendance" ? "manageBtn" : "manageBtn-clicked"
        }
        onclick={() =>
          navigate(`/manageAttendance`, { state: props.onStudent })
        }
      />
      <Button
        name={"상담"}
        className={
          nowOn !== "manageConsult" ? "manageBtn" : "manageBtn-clicked"
        }
        onclick={() => navigate(`/manageConsult`, { state: props.onStudent })}
      />

      <Button
        name={"제출/개별"}
        className={
          nowOn !== "manageCheckListMemo" ? "manageBtn" : "manageBtn-clicked"
        }
        onclick={() =>
          navigate(`/manageCheckListMemo`, { state: props.onStudent })
        }
      />
    </div>
  );
};

export default ManageChangeBtns;
