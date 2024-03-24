import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import FormVarType from "components/Classgame/Crawling/FormVarType";
import { FaUpload } from "react-icons/fa6";

const Admin = (props) => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [formKeys, setFormKeys] = useState([]);
  const [formTypes, setFormTypes] = useState([]);
  const [nowOnFile, setNowOnFile] = useState("");

  useEffect(() => {
    if (props.userUid === process.env.REACT_APP_KERBONG) {
      setIsAdmin(true);
    } else {
      Swal.fire("접근 실패", "개발자 전용 페이지 입니다!", "warning");
    }
  }, [props.userUid]);

  const fileHandler = (e, forWhat) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFormKeys([]);
    setNowOnFile("");

    const reader = new FileReader(selectedFile);

    reader.onerror = function (event) {
      console.error("파일 읽기 오류:", event.target.error);
    };

    reader.onloadend = function (event) {
      const content = event.target.result;
      console.log(content);
      // content를 사용하여 docxtemplater 작업 수행
      const zip = new PizZip(content);
      let keys = [];

      const options = {
        // This is how docxtemplater is configured by default
        parser: function (tag) {
          // 선생님들이 만든 키 값만 저장하기..!!
          keys.push(tag);
        },
      };

      new Docxtemplater(zip, options);
      console.log(keys);
      setFormKeys(keys);
      setNowOnFile(forWhat);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  const saveKeyTypeHandler = (formValues, schoolClass) => {
    console.log(formValues);
    console.log(schoolClass);
    let lessInfo = false;
    if (schoolClass?.length === 0) return;
    formValues?.forEach((fv) => {
      if (fv.type === "select" && !fv.option) {
        lessInfo = true;
      } else if (fv.type === "") {
        lessInfo = true;
      }
    });

    if (lessInfo) return;
  };

  return (
    <div>
      {isAdmin && (
        <>
          <div>
            <label title={"새 파일 업로드"}>
              atAdd업로드 <FaUpload />
              <input
                type="file"
                style={{ display: "none" }}
                accept=".docx, .doc"
                onChange={(e) => fileHandler(e, "atAdd")}
              />
            </label>
          </div>

          <div>
            <label title={"새 파일 업로드"}>
              atReport업로드 <FaUpload />
              <input
                type="file"
                style={{ display: "none" }}
                accept=".docx, .doc"
                onChange={(e) => fileHandler(e, "atReport")}
              />
            </label>
          </div>

          <div>
            <label title={"새 파일 업로드"}>
              absence업로드 <FaUpload />
              <input
                type="file"
                style={{ display: "none" }}
                accept=".docx, .doc"
                onChange={(e) => fileHandler(e, "absence")}
              />
            </label>
          </div>
          <FormVarType formKeys={formKeys} saveKeyType={saveKeyTypeHandler} />
        </>
      )}
    </div>
  );
};

export default Admin;
