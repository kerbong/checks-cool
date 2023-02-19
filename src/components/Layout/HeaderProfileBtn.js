import React, { useEffect, useState } from "react";
import { authService } from "../../fbase";
import Button from "./Button";
import classes from "./HeaderMenu.module.css";
import { useNavigate } from "react-router-dom";

const HeaderProfileBtn = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  //드롭다운 후 4초 후에 해당 버튼이 클릭되거나 메뉴를 누르지 않아 상태 변경이 되지 않은 경우 상태 변경하기

  useEffect(() => {
    let timerId;
    if (showDropdown) {
      timerId = setTimeout(() => {
        setShowDropdown(false);
      }, 4000);
    }
    // 언마운트 되면 큐에 있던 셋타임아웃 지우기
    return () => clearTimeout(timerId);
  }, [showDropdown]);

  const logOutHandler = (e) => {
    authService.signOut();
    props.logOutHandler();
    setShowDropdown(false);
  };

  let navigate = useNavigate();

  const dropdownHandler = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <>
      <Button
        onclick={props.isLoggedIn && dropdownHandler}
        icon={
          props.isLoggedIn ? (
            <i className="fa-solid fa-user"></i>
          ) : (
            <i className="fa-regular fa-user"></i>
          )
        }
        name={props.isLoggedIn ? "On" : "-"}
        className="header-logInOut"
      />

      {props.isLoggedIn && (
        <ul
          className={`
            ${
              classes[
                showDropdown
                  ? "profile-dropdown-div"
                  : "profile-dropdown-div-hide"
              ]
            } 
            ${
              classes[
                props.menuOnHead
                  ? "profile-dropdown-ul"
                  : "profile-dropdown-ul-bottom"
              ]
            }`}
        >
          {/* email의 4번째 자리부터 *로 표시 */}
          <li className={classes["profile-dropdown-li"]}>
            {props.user.email.slice(0, 3) +
              props.user.email.split("@")[0].slice(3).replace(/./g, "*")}
          </li>
          <li
            className={classes["profile-dropdown-li"]}
            onClick={() => {
              navigate(`/${"notice"}`);
              setShowDropdown(false);
            }}
          >
            공지사항
          </li>
          <li
            className={classes["profile-dropdown-li"]}
            onClick={() => {
              navigate(`/${"profile"}`);
              setShowDropdown(false);
            }}
          >
            프로필 수정
          </li>

          <li
            className={classes["profile-dropdown-li"]}
            onClick={() => {
              props.setMenuHandler();
              setShowDropdown(false);
            }}
          >
            메뉴바 위치변경
          </li>
          <li
            className={classes["profile-dropdown-li"]}
            onClick={logOutHandler}
          >
            로그아웃
          </li>
        </ul>
      )}
    </>
  );
};

export default HeaderProfileBtn;
