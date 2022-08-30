import classes from "./Header.module.css";
import HeaderMenu from "./HeaderMenu";
import Profile from "./Profile";
import mainLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  let navigate = useNavigate();
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
          />
          <HeaderMenu
            className={"fa-regular fa-comments"}
            path={"consulting"}
          />
          <HeaderMenu
            className={"fa-regular fa-calendar-check"}
            path={"todo"}
          />
          <HeaderMenu className={"fa-regular fa-note-sticky"} path={"memo"} />
          <HeaderMenu className={"fa-solid fa-gamepad"} path={"classgame"} />
        </ul>
        <ul className={classes.logInOut} id="logInOut">
          <Profile isLoggedIn={props.isLoggedIn} />
        </ul>
      </nav>
    </>
  );
};

export default Header;
