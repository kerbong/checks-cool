import React, { useRef, useState } from "react";
import { read, utils } from "xlsx";
import classes from "./StudentLiWithDelete.module.css";
import Swal from "sweetalert2";
import Button from "../Layout/Button";
import excelExample from "../../assets/student/excel_gender_example.jpg";

const StudentExcelUpload = (props) => {
  const [excelUploaded, setExcelUploaded] = useState(false);
  const fileInfoInput = useRef(null);

  const expl_1 = props.isSubject
    ? `<span class=${classes.accent}>반별 시트</span>에 <span class=${classes.accent}>번호 성별 이름</span>을 입력한<br/> 엑셀파일을 업로드 해주세요`
    : `<span class=${classes.accent}> 번호, 성별, 이름</span>이 입력된 엑셀파일 추가`;
  const expl_2 = `<span class=${classes.accent}>저장</span> 을 누르시면 반영됩니다.`;
  const expl_3 = `<span class=${classes["explain"]}>   * 수정이 필요하시면 저장하신 후에<br/> <b> [직접] </b>을 활용해주세요.  <br />* pc 업로드가 편리합니다! 👉 bit.ly/첵스쿨 </span>`;

  const excelFileHandler = (e) => {
    let input = e.target;
    if (input.files[0] !== undefined) {
      let reader = new FileReader();
      reader.onload = function () {
        try {
          let data = reader.result;
          let workBook = read(data, { type: "binary" });

          //전담인지 판단해서 로직 다르게 설정
          if (props.isSubject) {
            let wholeClass = [];
            workBook.SheetNames.forEach(function (sheetName) {
              let classInfo = {};
              let rows = utils.sheet_to_json(workBook.Sheets[sheetName]);
              // console.log(rows);
              let new_rows = rows?.map((row) => ({
                num: String(row["번호"]),
                name: String(row["이름"] || row["성명"]),
                woman: String(row["성별"]) === "남" ? false : true,
              }));

              let hasUndefined = false;
              new_rows.forEach((stu) => {
                if (
                  stu.num === undefined ||
                  stu.name === undefined ||
                  stu.woman === undefined
                ) {
                  hasUndefined = true;
                }
              });

              if (hasUndefined) {
                Swal.fire({
                  icon: "error",
                  title: "업로드 실패!",
                  html: "번호, 이름, 성별 문자의 철자가 정확한지, 문자 앞/뒤에 띄어쓰기는 없는지, 비어있는 칸이나 줄은 없는지 확인해주세요! 문제가 지속되면 kerbong@gmail.com 으로 알려주세요!",
                  confirmButtonText: "확인",
                  confirmButtonColor: "#85bd82",
                });
                return;
              }

              classInfo[sheetName] = [...new_rows];
              wholeClass.push({ ...classInfo });
            });
            setExcelUploaded(true);
            props.studentsInfoHandler(wholeClass);

            //담임일 경우 시트가 하나!
          } else {
            workBook.SheetNames.forEach(function (sheetName) {
              let rows = utils.sheet_to_json(workBook.Sheets[sheetName]);
              // console.log(rows);
              let new_rows = rows?.map((row) => ({
                num: String(row["번호"]),
                name: String(row["이름"] || row["성명"]),
                woman: String(row["성별"]) === "남" ? false : true,
              }));

              let hasUndefined = false;
              new_rows.forEach((stu) => {
                if (
                  stu.num === undefined ||
                  stu.name === undefined ||
                  stu.woman === undefined
                ) {
                  hasUndefined = true;
                }
              });

              if (hasUndefined) {
                Swal.fire({
                  icon: "error",
                  title: "업로드 실패!",
                  html: "번호, 이름, 성별 문자의 철자가 정확한지, 문자 앞/뒤에 띄어쓰기는 없는지, 비어있는 칸이나 줄은 없는지 확인해주세요! 문제가 지속되면 kerbong@gmail.com 으로 알려주세요!",
                  confirmButtonText: "확인",
                  confirmButtonColor: "#85bd82",
                });
                return;
              }
              setExcelUploaded(true);
              props.studentsInfoHandler(new_rows);
            });
          }
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
          className={
            excelUploaded
              ? `${classes.excelfileUploadBtnUploaded}`
              : `${classes.excelfileUploadBtn}`
          }
        >
          엑셀파일 업로드 <i className="fa-regular fa-file-excel"></i>
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
        {/* 전체 저장버튼 전담버전에서는 나오지 않도록*/}
        {!props.isSubject && (
          <Button
            className={excelUploaded ? "student-save-uploaded" : "student-save"}
            name={
              <>
                {excelUploaded && "클릭! "}
                <i className="fa-regular fa-floppy-disk"></i>
              </>
            }
            onclick={props.uploadStudentsInfo}
          />
        )}
      </div>

      <div className={classes.example}>
        {/* 학생자료 없을 때 설명 화면 */}
        {props.studentsInfo?.length === 0 && (
          <img src={excelExample} alt="" className={classes.exampleImg} />
        )}
        <hr className={classes["hr"]} />
        <span className={classes["span-title"]}>엑셀파일로 학생업로드</span>

        <hr className={classes["hr"]} />
        <span dangerouslySetInnerHTML={{ __html: expl_1 }}></span>
        <span dangerouslySetInnerHTML={{ __html: expl_2 }}></span>
        <button
          className={
            excelUploaded
              ? `${classes.excelfileUploadBtnUploaded}`
              : `${classes.excelfileUploadBtn}`
          }
        >
          <a
            href={
              !props.isSubject
                ? "https://docs.google.com/uc?export=download&id=1tdHVIke3tlak2xCvIV_GAj0UcRRSIjjZ"
                : "https://docs.google.com/uc?export=download&id=1Wgk9DPx-wPl04ZhOsq0yjn0UePJwavD9"
            }
            className={classes["a-link"]}
          >
            양식파일 다운
          </a>
        </button>
        <hr className={classes["hr"]} />
        <span dangerouslySetInnerHTML={{ __html: expl_3 }}></span>
        <hr className={classes["hr"]} />
      </div>
    </div>
  );
};

export default StudentExcelUpload;
