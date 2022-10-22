import classes from "./Header.module.css";
import HeaderMenu from "./HeaderMenu";
import HeaderProfileBtn from "./HeaderProfileBtn";
import mainLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = (props) => {
  let navigate = useNavigate();

  const logOutHandler = () => {
    props.logOutHandler();
  };

  const setMenuHandler = () => {
    props.setMenuHandler();
  };

  return (
    <>
      <nav className={classes[props.menuOnHead ? "header" : "header-bottom"]}>
        <h2 className={classes.h2}>
          <img
            src={mainLogo}
            alt=""
            className={classes.logoImg}
            onClick={() => navigate("/")}
          />
        </h2>
        <ul className={classes["menu-lists"]} id="menu-lists">
          <HeaderMenu
            icon={"fa-regular fa-address-book"}
            path={"attendance"}
            menuText={"출석"}
          />
          <HeaderMenu
            icon={"fa-regular fa-comments"}
            path={"consulting"}
            menuText={"상담"}
          />
          <HeaderMenu
            icon={"fa-regular fa-calendar-check"}
            path={"todo"}
            menuText={"일정"}
          />
          <HeaderMenu
            icon={"fa-regular fa-note-sticky"}
            path={"memo"}
            menuText={"메모"}
          />

          <HeaderMenu
            icon={"fa-solid fa-gamepad"}
            path={"classgame"}
            menuText={"잼잼"}
          />
        </ul>
        <ul className={classes.logInOut} id="logInOut">
          <HeaderProfileBtn
            isLoggedIn={props.isLoggedIn}
            user={props.user}
            logOutHandler={logOutHandler}
            setMenuHandler={setMenuHandler}
            menuOnHead={props.menuOnHead}
          />
        </ul>
      </nav>
    </>
  );
};

export default Header;
