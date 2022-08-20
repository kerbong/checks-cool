import classes from "./Header.module.css";
import HeaderMenu from "./HeaderMenu";
import Profile from "./Profile";

const Header = (props) => {
  const menu_items = document.querySelectorAll("ul")[0];

  const headerToggleHandler = () => {
    console.log(menu_items);
    menu_items.classList.toggle("active");
  };

  return (
    <>
      <nav className={classes.header}>
        <h2 className={classes.h2}>
          첵스- <br></br>초-코
        </h2>
        <ul className={classes["menu-items"]}>
          <HeaderMenu sector={"출결"} path={"attendance"} />
          <HeaderMenu sector={"상담"} path={"consulting"} />
          <HeaderMenu sector={"할일"} path={"todo"} />
          <HeaderMenu sector={"메모"} path={"memo"} />
          <HeaderMenu sector={"놀이"} path={"classgame"} />
        </ul>
        <ul className={classes.logInOut}>
          <Profile isLoggedIn={props.isLoggedIn} />
        </ul>
        <button
          href="#"
          className={classes["menu-list"]}
          onClick={headerToggleHandler}
        >
          하
        </button>
      </nav>
    </>
  );
};

export default Header;
