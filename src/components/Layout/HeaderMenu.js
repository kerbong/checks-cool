import classes from "./HeaderMenu.module.css";
import { useNavigate } from "react-router-dom";

const HeaderMenu = (props) => {
  let navigate = useNavigate();
  let path = props.path;
  return (
    <>
      <li className={classes.li} onClick={path && (() => navigate(`/${path}`))}>
        {props.sector}
      </li>
    </>
  );
};

export default HeaderMenu;
