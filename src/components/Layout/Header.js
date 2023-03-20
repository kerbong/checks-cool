import classes from "./Header.module.css";
import HeaderMenu from "./HeaderMenu";
import { useEffect, useState } from "react";
import HeaderProfileBtn from "./HeaderProfileBtn";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const [nowOn, setNowOn] = useState("");
  let navigate = useNavigate();

  const logOutHandler = () => {
    props.logOutHandler();
  };

  const setMenuHandler = () => {
    props.setMenuHandler();
  };

  useEffect(() => {
    let whereHref = window.location.href.split("/");
    let where = whereHref[whereHref.length - 1];
    if (where === "consulting") {
      setNowOn("attendance");
    } else {
      setNowOn(where);
    }
  }, [window.location.href]);

  return (
    <>
      <nav className={classes[props.menuOnHead ? "header" : "header-bottom"]}>
        <h2 className={classes.h2}>
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt=""
            className={classes.logoImg}
            onClick={() => navigate("/")}
          />
        </h2>
        <ul className={classes["menu-lists"]} id="menu-lists">
          <HeaderMenu
            icon={"fa-regular fa-address-book"}
            path={"attendance"}
            menuText={"생기부"}
            nowOn={nowOn}
          />
          <HeaderMenu
            icon={"fa-regular fa-compass"}
            path={"manageStudent"}
            menuText={"조회"}
            nowOn={nowOn}
          />
          <HeaderMenu
            icon={"fa-regular fa-calendar-check"}
            path={"todo"}
            menuText={"일정"}
            nowOn={nowOn}
          />
          <HeaderMenu
            icon={"fa-regular fa-note-sticky"}
            path={"memo"}
            menuText={"메모"}
            nowOn={nowOn}
          />

          <HeaderMenu
            icon={"fa-solid fa-gamepad"}
            path={"classgame"}
            from={""}
            menuText={"잼잼"}
            nowOn={nowOn}
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
