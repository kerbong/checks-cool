import React, { useState } from "react";
import { authService } from "../../fbase";
import Button from "./Button";
import classes from "./HeaderMenu.module.css";
import { useNavigate } from "react-router-dom";

const HeaderProfileBtn = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const logOutHandler = (e) => {
    authService.signOut();
    setShowDropdown(false);
  };
  let navigate = useNavigate();
  const dropdownAutoHide = setTimeout(() => {
    setShowDropdown(false);
  }, 5000);

  return (
    <>
      <Button
        onclick={() => {
          props.isLoggedIn &&
            setShowDropdown((prev) => {
              clearTimeout(dropdownAutoHide);
              return !prev;
            });
        }}
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
      {!showDropdown && clearTimeout(dropdownAutoHide)}
      {showDropdown && dropdownAutoHide}
      {props.isLoggedIn && showDropdown && (
        <div className={classes["profile-dropdown-div"]}>
          <ul className={classes["profile-dropdown-ul"]}>
            <li
              className={classes["profile-dropdown-li"]}
              onClick={() => {
                navigate(`/${"profile"}`);
                setShowDropdown(false);
                clearTimeout(dropdownAutoHide);
              }}
            >
              {props.user.email}
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
