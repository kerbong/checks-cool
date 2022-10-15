import React, { useRef } from "react";
import { read, utils } from "xlsx";
import classes from "./StudentLiWithDelete.module.css";
import excelExample from "../../assets/excel-example.jpg";

import Button from "../Layout/Button";
import Swal from "sweetalert2";

const StudentExcelUpload = (props) => {
  const fileInfoInput = useRef(null);

  const excelFileHandler = (e) => {
    let input = e.target;
    if (input.files[0] !== undefined) {
      let reader = new FileReader();
      reader.onload = function () {
        try {
          let data = reader.result;
          let workBook = read(data, { type: "binary" });
          workBook.SheetNames.forEach(function (sheetName) {
            let rows = utils.sheet_to_json(workBook.Sheets[sheetName]);
            // console.log(rows);
            let new_rows = rows.map((row) => ({
              num: row["번호"],
              name: row["이름"],
            }));
            props.studentsInfoHandler(new_rows);
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "업로드 실패!",
            html: "번호, 이름 행의 철자가 정확한지 확인해주세요!",
            confirmButtonText: "확인",
            confirmButtonColor: "#85bd82",
          });
        }
      };
      reader.readAsBinaryString(input.files[0]);
    } else {
      return;
    }
  };

  return (
    <div className={classes.excelUploadArea}>
      <div className={classes.excelUploadTop}>
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

      <div className={classes.example}>
        {/* 학생자료 없을 때 설명 화면 */}
        {props.studentsInfo.length === 0 && (
          <img src={excelExample} alt="" className={classes.exampleImg} />
        )}

        <hr className={classes["hr"]} />
        <span>
          <span className={classes.accent}>번호, 이름</span>이 입력된 엑셀 파일
          추가(1)
        </span>
        <hr className={classes["hr"]} />
        <span>
          <span className={classes.accent}>저장(2)</span>을 누르면 반영됩니다.
        </span>
        <span>* 수정은 "직접 입력"을 활용해주세요.</span>
        <hr className={classes["hr"]} />
        <span>
          pc로 업로드가 더 편리합니다!
          <br />
          (kerbong.github.io/checks-cho-ok)
        </span>

        <hr className={classes["hr"]} />
      </div>
    </div>
  );
};

export default StudentExcelUpload;
