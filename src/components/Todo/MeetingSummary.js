import React, { useState, useEffect } from "react";
import classes from "./MeetingSummary.module.css";
import { dbService, storageService } from "../../fbase";
import { onSnapshot, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Modal from "components/Layout/Modal";
import MeetingSumItem from "./MeetingSumItem";
import Swal from "sweetalert2";
import { utils, writeFile } from "xlsx";
import dayjs from "dayjs";

const MeetingSummary = (props) => {
  const [summary, setSummary] = useState([]);
  const [nowOnSummary, setNowOnSummary] = useState([]);
  const [showSum, setShowSum] = useState("");
  const [newMeetSum, setNewMeetSum] = useState(false);

  let roomInfo = localStorage.getItem("todoPublicRoom");
  if (roomInfo === null) {
    roomInfo = "--";
  }

  //회의자료 받아오기
  const getMeetingSumDb = async () => {
    let meetingSumRef;
    if (props.showPublicEvent) {
      meetingSumRef = doc(dbService, "todo", "MeetSum" + roomInfo);
    } else {
      meetingSumRef = doc(dbService, "todo", "MeetSum" + props.userUid);
    }
    const meetSumSnap = await getDoc(meetingSumRef);
    // 자료가 존재하면
    setSummary([]);
    if (meetSumSnap.exists()) {
      onSnapshot(meetingSumRef, (doc) => {
        let new_summary = [];
        // 2월~1월까지를 학년도로 보고 자료날짜와 달력 날짜 비교해서 자료 저장
        doc.data().meetSum_data?.forEach((data) => {
          let data_year =
            data?.id?.slice(5, 7) <= 1
              ? String(+data?.id?.slice(0, 4) - 1)
              : data?.id?.slice(0, 4);
          let current_year =
            props.currentMonth?.slice(5, 7) <= 1
              ? String(+props.currentMonth?.slice(0, 4) - 1)
              : props.currentMonth?.slice(0, 4);
          if (data_year === current_year) {
            new_summary.push(data);
          }
        });

        setSummary([...new_summary]);
        // setSummary([...doc.data().meetSum_data]);
      });
    } else {
      setSummary([]);
    }
  };

  useEffect(() => {
    getMeetingSumDb();
  }, [props.showPublicEvent]);

  //달이 바뀌면 해당 달에 기록한 정보만 보여주기
  useEffect(() => {
    let nowMonthData = summary?.filter(
      (sum) => sum.id.slice(0, 7) === props.currentMonth
    );
    setNowOnSummary([...nowMonthData]);
  }, [props.currentMonth, summary]);

  //새로운 회의 저장 로직
  const addMeetSumHandler = async (data) => {
    Swal.fire({
      icon: "success",
      title: "저장 성공",
      text: `${props.showPublicEvent ? "공용 " : "개인 "}회의록에 [${
        data.title
      }] 성공적으로 작성되었습니다.`,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: false,
      timer: 5000,
    });

    //firestore에 저장
    let meetingSumRef;
    if (props.showPublicEvent) {
      meetingSumRef = doc(dbService, "todo", "MeetSum" + roomInfo);
    } else {
      meetingSumRef = doc(dbService, "todo", "MeetSum" + props.userUid);
    }
    //기존 자료 목록 받아오고 거기에 추가하기

    let existData = [data];
    const meetSumDoc = await getDoc(meetingSumRef);
    if (meetSumDoc.exists()) {
      meetSumDoc?.data()?.meetSum_data?.forEach((data) => existData.push(data));
    }

    await setDoc(meetingSumRef, { meetSum_data: existData });

    //혹시 기존 자료가 없을 경우 summary에 강제로 추가해주기
    if (summary.length === 0) {
      setSummary([data]);
    }

    setNewMeetSum(false);
  };

  //회의록 삭제함수
  const deleteHandler = async (id, title, url) => {
    let remainData = summary?.filter((data) => data.id !== id);

    let meetingSumRef;
    if (props.showPublicEvent) {
      meetingSumRef = doc(dbService, "todo", "MeetSum" + roomInfo);
    } else {
      meetingSumRef = doc(dbService, "todo", "MeetSum" + props.userUid);
    }

    Swal.fire({
      icon: "success",
      title: "삭제 성공",
      text: `[${title}] 이 ${
        props.showPublicEvent ? "공용 " : "개인 "
      }회의록에서 삭제되었습니다.`,
      confirmButtonText: "확인",
      confirmButtonColor: "#85bd82",
      showDenyButton: false,
      timer: 5000,
    });
    //모달 닫기
    setShowSum("");

    //자료 업데이트
    await setDoc(meetingSumRef, { meetSum_data: remainData });

    //사진 파일 있었으면 저장했던 파일 삭제
    if (url !== "") {
      await deleteObject(ref(storageService, url));
    }
    // 전체 서머리 업데이트
    setSummary(remainData);
  };

  //전체회의 내용 엑셀로 저장하기
  const saveMeetSumExcel = () => {
    // summary가 없으면 저장하지 않기
    if (summary.length === 0) {
      return;
    }

    const new_datas = [];
    summary.forEach((data) => {
      let new_data = [data.id, data.title, data.result, data.file, data.text];

      new_datas.push(new_data);
    });

    new_datas.unshift([
      "기록시각(년-월-일 시:분)",
      "회의제목",
      "회의결과",
      "첨부파일 링크주소",
      "회의내용",
    ]);

    //새로운 가상 엑셀파일 생성
    const book = utils.book_new();
    const meetSum_datas = utils.aoa_to_sheet(new_datas);
    //셀의 넓이 지정
    meetSum_datas["!cols"] = [
      { wpx: 100 },
      { wpx: 150 },
      { wpx: 200 },
      { wpx: 100 },
      { wpx: 100 },
    ];

    //시트에 작성한 데이터 넣기
    utils.book_append_sheet(book, meetSum_datas, "회의기록");

    writeFile(
      book,
      `${props.showPublicEvent ? "공용 " : "개인 "}회의기록(${dayjs().format(
        "YYYY-MM-DD"
      )}).xlsx`
    );
  };

  //개별 회의록 수정 함수
  const editHandler = async (new_data) => {
    //일단 전체 회의록에서 제거하고 다시 추가하기(id는 같음.)
    let edited_data = []; //새로 업로드할 데이터
    let exist_data; //기존 데이터
    summary.forEach((data) => {
      if (data.id !== new_data.id) {
        edited_data.push(data);
      } else {
        exist_data = data;
      }
    });
    console.log(edited_data);

    let meetingSumRef;
    if (props.showPublicEvent) {
      meetingSumRef = doc(dbService, "todo", "MeetSum" + roomInfo);
    } else {
      meetingSumRef = doc(dbService, "todo", "MeetSum" + props.userUid);
    }

    edited_data.push(new_data);
    console.log(edited_data);

    //모달 닫기
    setShowSum("");

    //자료 업데이트
    await updateDoc(meetingSumRef, { meetSum_data: edited_data });

    //사진 파일이 전과 달라졌으면 기존에 저장했던 파일 삭제
    if (new_data.file !== exist_data.file) {
      await deleteObject(ref(storageService, exist_data.file));
    }
    // 전체 서머리 업데이트
    setSummary(edited_data);
  };

  return (
    <div>
      {/* {개별 회의록 클릭 시 보여줄 모달} */}
      {showSum !== "" && (
        <Modal onClose={() => setShowSum("")}>
          <MeetingSumItem
            item={nowOnSummary?.filter((data) => data?.id === showSum)[0]}
            showSumClose={() => setShowSum("")}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            userUid={props.userUid}
          />
        </Modal>
      )}

      {/* {개별 회의록 추가 클릭 시 보여줄 모달} */}
      {newMeetSum && (
        <Modal onClose={() => setNewMeetSum(false)}>
          <MeetingSumItem
            showPublicEvent={props.showPublicEvent}
            addMeetSumHandler={addMeetSumHandler}
            showSumClose={() => setNewMeetSum(false)}
            userUid={props.userUid}
          />
        </Modal>
      )}

      {/* 회의록 리스트 부분 */}
      <div className={classes["title-div"]}>
        <h1 className={`${classes["m-10"]} ${classes["title"]}`}>
          {props.showPublicEvent ? "공용 " : "개인 "}회의록
        </h1>
        {/* 추가버튼 */}
        <button
          onClick={() => {
            setNewMeetSum(true);
          }}
          className={`${classes["add-btn"]}`}
        >
          <i className="fa-solid fa-plus"></i>
        </button>

        {/* 엑셀저장 버튼 */}
        {/* 자료가 있을 때만 보여줌 */}
        {summary.length > 0 && (
          <button
            onClick={() => {
              saveMeetSumExcel();
            }}
            className={`${classes["excel-save"]}`}
          >
            엑셀저장
          </button>
        )}
      </div>
      <div>
        {nowOnSummary?.map((data) => (
          <li
            key={data.id}
            className={classes["li"]}
            onClick={() => {
              setShowSum(data.id);
            }}
          >
            <div>
              {data.id}
              <h2>{data.title}</h2>
            </div>
            <div className={classes["content"]}>👉 {data.result}</div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default MeetingSummary;
