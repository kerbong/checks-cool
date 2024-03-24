import classes from "./Header.module.css";
import HeaderMenu from "./HeaderMenu";
import { useEffect, useState } from "react";
import HeaderProfileBtn from "./HeaderProfileBtn";
import { useNavigate } from "react-router-dom";
import {
  FaCookieBite,
  FaGamepad,
  FaRegAddressBook,
  FaRegCompass,
  FaRegNoteSticky,
} from "react-icons/fa6";

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
    if (where === "consulting" || where === "checkListMemo") {
      setNowOn("attendance");
    } else if (
      where === "manageAttendance" ||
      where === "manageConsult" ||
      where === "manageCheckListMemo" ||
      where === "manageStudent"
    ) {
      setNowOn("manageAttendance");
    } else if (where === "todo") {
      setNowOn("memo");
    } else {
      setNowOn(where);
    }
  }, [window.location.href]);

  return (
    <>
      <nav
        className={classes[props.menuOnHead ? "header" : "header-bottom"]}
        id="header-menu"
      >
        <h2 className={classes.h2}>
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt=""
            className={classes.logoImg}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </h2>
        <ul className={classes["menu-lists"]} id="menu-lists">
          <HeaderMenu
            icon={<FaRegAddressBook />}
            path={"attendance"}
            menuText={"생기부"}
            isClub={"main"}
            nowOn={nowOn}
          />
          <HeaderMenu
            icon={<FaRegCompass />}
            path={"manageAttendance"}
            menuText={"조회"}
            isClub={"main"}
            nowOn={nowOn}
          />
          <HeaderMenu
            icon={<FaRegNoteSticky />}
            path={"memo"}
            menuText={"메모"}
            isClub={props.isClub}
            nowOn={nowOn}
          />

          <HeaderMenu
            icon={<FaCookieBite />}
            path={"weteacher"}
            menuText={"교사랑"}
            isClub={props.isClub}
            nowOn={nowOn}
          />
          <HeaderMenu
            icon={<FaGamepad />}
            path={"classgame"}
            from={""}
            menuText={"제자랑"}
            isClub={"main"}
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
            isClub={props.isClub}
            clubLists={props.clubLists}
            isClubIndex={(ind) => props.isClubIndex(ind)}
          />
        </ul>
      </nav>
    </>
  );
};

export default Header;
