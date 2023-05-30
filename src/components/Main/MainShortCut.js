import classes from "./MainShortCut.module.css";
import Button from "components/Layout/Button";

import Swal from "sweetalert2";

const KEY_EXPLAIN = [
  "오늘 날짜의 출결 추가",
  "제출ox 자료 추가",
  "개별기록 자료추가",
];

const MainShortCut = (props) => {
  const inputHandler = (e) => {
    e.preventDefault();
    let pressedKey = e.nativeEvent.data;
    console.log(e.nativeEvent);
    const regExp = /[^0-9a-zA-Z]/g;
    //혹시.. 백스페이스 같은거 누르면 그냥 기본 동작(기존  value자우기)을 알아서 하도록
    if (pressedKey === null) return;

    //혹시 숫자나 알파벳이 아닌경우 삭제
    if (regExp.test(pressedKey)) {
      e.target.value = e.target.value.replace(regExp, "");
      console.log(e.target.value);
      //무조건 소문자로 바꾸어서.. 문자 하나만 저장시킴.
    } else {
      e.target.value = pressedKey?.toLowerCase();
    }
  };

  //저장버튼 누르면, 실행됨
  const makeShortCutHandler = () => {
    let input0 = document.getElementById("input0")?.value;
    let input1 = document.getElementById("input1")?.value;
    let input2 = document.getElementById("input2")?.value;

    if (
      !input0 ||
      !input1 ||
      !input2 ||
      input0.trim() === "" ||
      input1.trim() === "" ||
      input2.trim() === ""
    ) {
      Swal.fire("저장 실패", "모든 단축키 값을 설정해주세요.", "warning");
      return;
    }

    //중복방지
    if (input0 === input1 || input0 === input2 || input1 === input2) {
      Swal.fire(
        "저장 실패",
        "단축키를 중복으로 설정하실 수 없어요. 중복된 단축키를 변경해주세요.",
        "warning"
      );
      return;
    }

    let data = [input0, input1, input2];
    localStorage.setItem("shortCutKey", JSON.stringify(data));
    props.saveShortCut(data);
    props.closeModal();
    // console.log(input0.current.value);
    // console.log(input1.current.value);
    // console.log(input2.current.value);
  };

  return (
    <div className={classes["div1"]}>
      <div className={classes["div2"]}>
        <span className={classes.closeBtn} onClick={props.closeModal}>
          <i className="fa-regular fa-circle-xmark"></i>
        </span>
        <h2 className={classes["header-area"]}>현재 브라우저의 단축키</h2>

        {/* 단축키 3개 그려주기 */}

        {props.shortCutKey?.map((item, index) => (
          <p className={classes["existed-area"]} key={index}>
            <span className={classes["span"]}>{KEY_EXPLAIN[index]} </span>
            👉
            <input
              type="text"
              //   ref={index === 0 ? input0 : index === 1 ? input1 : input2}
              id={"input" + index}
              defaultValue={item}
              className={classes["key"]}
              onChange={inputHandler}
              autoFocus
            />
          </p>
        ))}
        <p
          className={classes["existed-area"]}
          style={{ justifyContent: "center" }}
        >
          * 숫자와 영문자만 사용 가능
          <br />* 현재 브라우저에서만 적용됨
        </p>
        <Button
          className="checkList-button"
          name="저장"
          id={"save-todoPublicBtn"}
          onclick={() => {
            makeShortCutHandler();
          }}
        />
      </div>{" "}
    </div>
  );
};

export default MainShortCut;
