import classes from "./HeaderMenu.module.css";
import { useNavigate } from "react-router-dom";

const HeaderMenu = (props) => {
  let navigate = useNavigate();
  let path = props.path;
  console.log(path);
  console.log(props.nowOn);

  return (
    <>
      <li
        className={classes[props.nowOn !== path ? "li" : "liClicked"]}
        onClick={path && (() => navigate(`/${path}`, { from: props.from }))}
      >
        <i className={props.icon}></i>
        <span className={classes.menuText}>{props.menuText}</span>
      </li>
    </>
  );
};

export default HeaderMenu;
