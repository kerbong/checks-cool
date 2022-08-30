import React, { useRef } from "react";
import { read, utils } from "xlsx";
import classes from "../Layout/FileForm.module.css";
import excelExample from "../../assets/excel-example.jpg";

import Button from "../Layout/Button";

const StudentExcelUpload = (props) => {
  const fileInfoInput = useRef(null);

  const excelFileHandler = (e) => {
    let input = e.target;
    if (input.files[0] !== undefined) {
      let reader = new FileReader();
      reader.onload = function () {
        let data = reader.result;
        let workBook = read(data, { type: "binary" });
        workBook.SheetNames.forEach(function (sheetName) {
          let rows = utils.sheet_to_json(workBook.Sheets[sheetName]);
          console.log(rows);
          let new_rows = rows.map((row) => ({
            num: row["번호"],
            name: row["이름"],
          }));
          props.studentsInfoHandler(new_rows);
        });
      };
      reader.readAsBinaryString(input.files[0]);
    } else {
      return;
    }
  };

  return (
    <div className={classes.excelUploadArea}>
      <div className={classes.excelUploadTop}>
        {props.studentsInfo.length === 0 && "아직 학생 자료가 없어요!"}
        <label
          id="excelFileLabel"
          htmlFor="excelFile"
          className={classes.fileUploadBtn}
          style={{
            height: "26px",
            width: "28px",
            padding: "12px",
            color: "#000000",
            backgroundColor: "#a66fc8b3",
          }}
        >
          1 <i className="fa-regular fa-file-excel"></i>
        </label>
        <input
          type="file"
          id="excelFile"
          ref={fileInfoInput}
          onChange={(e) => {
            excelFileHandler(e);
          }}
          style={{ display: "none" }}
          accept={".xls,.xlsx"}
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
      </div>

      {/* 학생자료 없을 때 설명 화면 */}
      {props.studentsInfo.length === 0 && (
        <div className={classes.example}>
          <img src={excelExample} alt="" className={classes.exampleImg} />
          <span>(예시)</span>
          <span>첫 줄에 번호, 이름이 입력된 </span>
          <span>엑셀 파일 추가(1) 후에 저장(2)을 눌러주세요.</span>
          <span className={classes.accent}>*저장(2)을 눌러야 반영됩니다!</span>
        </div>
      )}
    </div>
  );
};

export default StudentExcelUpload;
