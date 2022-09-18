import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import classes from "./ConsultLists.module.css";
import Button from "components/Layout/Button";
import ConsultEdit from "./ConsultEdit";

const ConsultLists = (props) => {
  const [consults, setConsults] = useState([]);
  const [showEditor, setShowEditor] = useState("");

  const anyContext = useContext(props.context);

  function sortDate(consult, upOrDown) {
    const sorted_consults = consult.sort(function (a, b) {
      let a_date = `${a.id.slice(0, 10)} ${a.id.slice(10, 15)}`;
      let b_date = `${b.id.slice(0, 10)} ${b.id.slice(10, 15)}`;
      return new Date(a_date) - new Date(b_date);
    });

    if (upOrDown === "up") {
      sorted_consults.reverse();
    }

    return sorted_consults;
  }

  useEffect(() => {
    if (anyContext) {
      let sorted_datas = sortDate(anyContext.datas, "up");
      setConsults([...sorted_datas]);
    }
  }, [anyContext]);

  const deleteConsult = (consult) => {
    Swal.fire({
      title: "자료를 지울까요?",
      text: `${consult.id.slice(0, 10)} | ${
        consult.student_name
      } | ${consult.option.slice(1)}`,
      showDenyButton: true,
      confirmButtonText: "삭제",
      confirmButtonColor: "#db100cf2",
      denyButtonColor: "#85bd82",
      denyButtonText: `취소`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "자료가 삭제되었어요.",
          text: "5초 후에 창이 사라집니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#85bd82",
          timer: 5000,
        });

        anyContext.removeData(consult.id, consult.attachedFileUrl);
      }
    });
  };

  const editConsult = (consult) => {
    setShowEditor(consult.id);
  };

  const yearMonthDay = (yyyymmdd) => {
    const year = yyyymmdd.split("-")[0];
    const month = yyyymmdd.split("-")[1].replace(/(^0+)/, "");
    const day = yyyymmdd.split("-")[2].replace(/(^0+)/, "");
    return year + "년 " + month + "월 " + day + "일  ";
  };

  return (
    <>
      {consults &&
        consults.map((consult) => (
          <div key={consult.id}>
            <li key={consult.id} className={classes.listArea} id={consult.id}>
              {showEditor === consult.id ? (
                <ConsultEdit
                  selectOption={props.selectOption}
                  consult={consult}
                  cancelEditor={() => setShowEditor("")}
                  context={props.context}
                />
              ) : (
                <div key={consult.id + "item"}>
                  <div className={classes.nameArea}>
                    <span className={classes.nameIcon}>
                      <i className="fa-regular fa-id-badge"></i>
                    </span>
                    <p className={classes.consultDate}>
                      {yearMonthDay(consult.id.slice(0, 10))}
                    </p>
                    <span className={classes.nameSpan} id={"1" + consult.id}>
                      {`${consult.student_name} | ${consult.option.slice(1)}`}
                    </span>
                  </div>
                  {/* 이미지가 있으면 이미지 보여주기 */}
                  {consult.attachedFileUrl && (
                    <div className={classes.fileArea}>
                      <img
                        src={consult.attachedFileUrl}
                        width="100%"
                        max-height="20vh"
                        alt="filePreview"
                      />
                    </div>
                  )}
                  {/* 상담 비고 등록한 부분 있으면 보여주기 */}
                  <div className={classes.noteArea}>
                    <span className={classes.noteTextArea}>
                      {consult.note ? consult.note : "'기록이 없습니다.'"}
                    </span>

                    <span className={classes.editDeleteArea}>
                      <Button
                        id={"edit" + consult.id}
                        className="consultEditBtn"
                        onclick={() => {
                          editConsult(consult);
                        }}
                        icon={<i className="fa-solid fa-pencil"></i>}
                      />
                      <Button
                        id={"delete" + consult.id}
                        className="consultEditBtn"
                        onclick={() => {
                          deleteConsult(consult);
                        }}
                        icon={<i className="fa-solid fa-trash-can"></i>}
                      />
                    </span>
                  </div>
                </div>
              )}
            </li>
          </div>
        ))}
    </>
  );
};

export default ConsultLists;
