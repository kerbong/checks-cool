import React, { useState, useEffect } from "react";
import classes from "./Club.module.css";
import dayjs from "dayjs";
import { v4 } from "uuid";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import { dbService } from "fbase";

const Club = (props) => {
  const [editInd, setEditInd] = useState("");
  const [isClicked, setIsClicked] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [descValue, setDescValue] = useState("");

  /** 클럽 내용을 추가 수정 삭제하는 함수 */
  const clubHandler = async (e, what, ex_id) => {
    e.preventDefault();
    let clubName = nameValue?.trim();

    let new_clubLists;
    if (what === "delete") {
      new_clubLists = [...props.clubLists]?.filter((cl) => cl?.id !== ex_id);
    } else {
      //새로 저장인데 동아리가 6개면 추가 불가능
      if (what === "save" && props.clubLists?.length === 6) {
        Swal.fire(
          "저장실패!",
          "동아리는 최대 6개까지 저장하고 활용할 수 있습니다! 기존 동아리를 수정/삭제 한 후에 사용해주세요.",
          "warning"
        );
        return;
      }

      const new_club = {
        name: clubName,
        id: !ex_id ? dayjs().format("YYYY-MM-DDHH:mm:ss") : ex_id,
        userUid: v4(),
        desc: descValue?.trim() || "",
      };

      // 새거면 기존꺼 다 넣기, 기존꺼 수정이면 기존꺼에서 현재 id인거 제외한거
      new_clubLists = !ex_id
        ? [...props.clubLists]
        : [...props.clubLists]?.filter((cl) => cl.id !== ex_id);

      let isExistName = new_clubLists?.filter(
        (cl) => cl.name === new_club.name
      );

      if (isExistName?.length > 0) {
        Swal.fire(
          "동아리명 중복!",
          "중복된 동아리 이름이 존재합니다! 이름을 수정해주세요!",
          "warning"
        );
        return;
      }

      new_clubLists.push(new_club);
    }

    Swal.fire(
      `${what === "delete" ? "삭제" : !ex_id ? "저장" : "수정"}완료!`,
      `동아리의 내용이 ${
        what === "delete" ? "삭제" : !ex_id ? "저장" : "수정"
      } 되었습니다.`,
      "success"
    );

    await setDoc(doc(dbService, "club", props.userUid), {
      club_lists: new_clubLists,
    });

    setEditInd("");
    setIsClicked("");
    setNameValue("");
    setDescValue("");
  };

  const changeHandler = (e) => {
    if (e.target.name === "name") {
      setNameValue(e.target.value);
    } else if (e.target.name === "desc") {
      setDescValue(e.target.value);
    }
  };

  useEffect(() => {
    if (editInd === "") return;

    setNameValue(props.clubLists?.[editInd]?.name);
    setDescValue(props.clubLists?.[editInd]?.desc);
  }, [editInd]);

  /** 동아리 추가하는 함수 */
  // const addClubHandler = async (e, ex_id) => {
  //   e.preventDefault();

  //   let clubName = nameValue?.trim();
  //   if (clubName.length === 0) return;

  //   const new_club = {
  //     name: clubName,
  //     id: !ex_id ? dayjs().format("YYYY-MM-DDHH:mm:ss") : ex_id,
  //     userUid: v4(),
  //     desc: descValue?.trim() || "",
  //   };

  //   // 새거면 기존꺼 다 넣기, 기존꺼 수정이면 기존꺼에서 현재 id인거 제외한거
  //   let new_clubLists = !ex_id
  //     ? [...props.clubLists]
  //     : [...props.clubLists]?.filter((cl) => cl.id !== ex_id);

  //   let isExistName = new_clubLists?.filter((cl) => cl.name === new_club.name);

  //   if (isExistName?.length > 0) {
  //     Swal.fire(
  //       "동아리명 중복!",
  //       "중복된 동아리 이름이 존재합니다! 이름을 수정해주세요!",
  //       "warning"
  //     );
  //     return;
  //   }

  //   new_clubLists.push(new_club);

  //   await setDoc(doc(dbService, "club", props.userUid), {
  //     club_lists: new_clubLists,
  //   });
  // };

  return (
    <div className={classes["whole-div"]}>
      <div className={classes["inner-div"]}>
        {/* 타이틀 부분 */}
        <div className={classes["flex-cen"]}>
          <div className={classes["title"]}>동아리 목록</div>
          {/* <div className={classes["title-sub"]}>
      * [제자랑]-[자리표]에 저장된 자리표
    </div> */}
        </div>

        {/* 가로줄 */}
        <hr style={{ margin: "20px 15px" }} />
        {/* 동아리 추가 버튼 보여주기 */}
        <button
          onClick={() => setEditInd("new")}
          className={classes["attend-edit-p"]}
        >
          +
        </button>
        {/* 동아리 추가하는 공간 */}
        {editInd === "new" && (
          <form
            className={classes["club-ul"]}
            onSubmit={(e) => clubHandler(e, "save")}
          >
            <span>새 동아리 이름</span>
            <input
              type="text"
              name="name"
              onChange={changeHandler}
              className={classes["nameInput"]}
              value={nameValue}
            />
            <span>새 동아리 설명</span>
            <input
              type="text"
              name="desc"
              className={classes["descInput"]}
              onChange={changeHandler}
              value={descValue}
            />
            <div className={classes["edit-div"]}>
              <button
                onClick={(e) => clubHandler(e, "save")}
                className={classes["attend-edit-p"]}
              >
                저장
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditInd("");
                  setNameValue("");
                  setDescValue("");
                }}
                className={classes["attend-edit-c"]}
              >
                취소
              </button>
            </div>
          </form>
        )}

        {/* 동아리 목록 보여주기 */}
        <ul
          className={classes["club-ul"]}
          style={{ flexDirection: "row", flexWrap: "wrap" }}
        >
          {props.clubLists?.map((club, ind) => (
            <li
              key={ind}
              //현재 클릭한 거면...club-li-clicked
              className={classes["club-li"]}
              onClick={() => {
                if (isClicked === ind) {
                  // 수정, 삭제 하는 버튼 보이도록
                  setIsClicked("");
                } else {
                  setIsClicked(ind);
                }
              }}
            >
              <div className={classes["club-id"]}>{club.id.slice(0, 10)}</div>
              <div className={classes["club-title"]}>
                {editInd !== ind ? (
                  <>
                    <div>{club.name}</div>
                    <div>{club.desc}</div>
                  </>
                ) : (
                  <form
                    className={classes["club-ul"]}
                    onSubmit={(e) => clubHandler(e, "edit", club.id)}
                  >
                    <span>동아리 이름</span>
                    <input
                      type="text"
                      name="name"
                      onChange={changeHandler}
                      className={classes["nameInput"]}
                      value={nameValue}
                    />
                    <span>동아리 설명</span>
                    <input
                      type="text"
                      name="desc"
                      className={classes["descInput"]}
                      onChange={changeHandler}
                      value={descValue}
                    />
                    <div className={classes["edit-div"]}>
                      <button
                        onClick={(e) => clubHandler(e, "edit", club.id)}
                        className={classes["attend-edit-p"]}
                      >
                        수정
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setEditInd("");
                          setNameValue("");
                          setDescValue("");
                        }}
                        className={classes["attend-edit-c"]}
                      >
                        취소
                      </button>
                    </div>
                  </form>
                )}
              </div>
              {/* clicked면.. 수정 삭제 버튼 보이기 */}
              <div
                className={`${classes["edit-div"]} ${
                  isClicked === ind && editInd === ""
                    ? classes["show"]
                    : classes["hide"]
                }`}
              >
                {/* 수정 */}

                <button
                  className={classes["attend-edit-p"]}
                  onClick={() => {
                    setEditInd(ind);
                  }}
                >
                  수정
                </button>

                <button
                  className={classes["attend-edit-d"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    clubHandler(e, "delete", club?.id);
                  }}
                >
                  삭제
                </button>
                <button
                  className={classes["attend-edit-c"]}
                  onClick={() => {
                    setEditInd("");
                    setIsClicked("");
                    setNameValue("");
                    setDescValue("");
                  }}
                >
                  취소
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Club;
