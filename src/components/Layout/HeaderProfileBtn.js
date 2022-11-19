import React, { useState } from "react";
import { authService } from "../../fbase";
import Button from "./Button";
import classes from "./HeaderMenu.module.css";
import { useNavigate } from "react-router-dom";

const HeaderProfileBtn = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  //드롭다운 후 5초 후에 해당 버튼이 클릭되거나 메뉴를 누르지 않아 상태 변경이 되지 않은 경우 상태 변경하기
  // const dropdownAutoHide = setTimeout(() => {
  //   setShowDropdown(false);
  //   return 0;
  // }, 5000);

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
      {/* {!showDropdown && clearTimeout(dropdownAutoHide)} */}
      {/* {showDropdown
        ? () => dropdownAutoHide
        : () => {
            for (let i = 0; i < dropdownAutoHide; i++) {
              clearTimeout(i);
            }
          }} */}

      {props.isLoggedIn && showDropdown && (
        <div className={classes["profile-dropdown-div"]}>
          <ul
            className={
              classes[
                props.menuOnHead
                  ? "profile-dropdown-ul"
                  : "profile-dropdown-ul-bottom"
              ]
            }
          >
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
        </div>
      )}
    </>
  );
};

export default HeaderProfileBtn;
