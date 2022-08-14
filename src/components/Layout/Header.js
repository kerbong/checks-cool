import classes from "./Header.module.css";
import HeaderMenu from "./HeaderMenu";

const Header = (props) => {
  return (
    <>
      <nav className={classes.header}>
        <h2 className={classes.h2}>
          첵스- <br></br>초-코
        </h2>
        <ul className={classes.ul}>
          <HeaderMenu sector={"출결"} path={"attendance"} />
          <HeaderMenu sector={"상담"} path={"consulting"} />
          <HeaderMenu sector={"할일"} path={"todo"} />
          <HeaderMenu sector={"메모"} path={"memo"} />
          <HeaderMenu sector={"놀이"} path={"classgame"} />
        </ul>
      </nav>
    </>
  );
};

export default Header;
