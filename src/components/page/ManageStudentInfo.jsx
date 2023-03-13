import React, { useState, useEffect } from "react";
import ManageChangeBtns from "./ManageChangeBtns";
import ManageEach from "./ManageEach";

const ManageStudentInfo = (props) => {
  //선택된 학생 정보  번호 한칸띄우고 이름
  const selectStudentHandler = (studentNumName) => {
    console.log(studentNumName);
  };

  return (
    <div>
      {/* 학생 보여주는 부분 */}
      <ManageEach
        students={props.students}
        userUid={props.userUid}
        isSubject={props.isSubject}
        selectStudentHandler={selectStudentHandler}
      />

      {/* 버튼 모음 보여주기 */}
      <ManageChangeBtns />

      {/* 학생 관련 정보 보여주기 */}
      <div></div>
    </div>
  );
};

export default ManageStudentInfo;
