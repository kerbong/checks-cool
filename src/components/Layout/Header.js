import classes from "./Header.module.css";
import HeaderMenu from "./HeaderMenu";
import HeaderProfileBtn from "./HeaderProfileBtn";
import mainLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  let navigate = useNavigate();

  const logOutHandler = () => {
    props.logOutHandler();
  };

  return (
    <>
      <nav className={classes.header}>
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
            className={"fa-regular fa-address-book"}
            path={"attendance"}
            menuText={"출석부"}
          />
          <HeaderMenu
            className={"fa-regular fa-comments"}
            path={"consulting"}
            menuText={"금쪽상담소"}
          />
          <HeaderMenu
            className={"fa-regular fa-calendar-check"}
            path={"todo"}
            menuText={"일정달력"}
          />
          <HeaderMenu
            className={"fa-regular fa-note-sticky"}
            path={"memo"}
            menuText={"메모장모음"}
          />

          <HeaderMenu
            className={"fa-solid fa-gamepad"}
            path={"classgame"}
            menuText={"잼잼"}
          />
        </ul>
        <ul className={classes.logInOut} id="logInOut">
          <HeaderProfileBtn
            isLoggedIn={props.isLoggedIn}
            user={props.user}
            logOutHandler={logOutHandler}
          />
        </ul>
      </nav>
    </>
  );
};

export default Header;
