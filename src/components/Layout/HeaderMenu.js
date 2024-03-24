import Swal from "sweetalert2";
import classes from "./HeaderMenu.module.css";
import { useNavigate } from "react-router-dom";

const HeaderMenu = (props) => {
  let navigate = useNavigate();
  let path = props.path;

  const clickHandler = () => {
    if (props.isClub !== "main" && props.isClub !== "") {
      Swal.fire(
        "사용불가",
        `${props.menuText} 탭은 담임/전담버전 에서만 사용이 가능합니다. [메뉴바] - 프로필 (가장우측 사람모양) 에서 '담임/전담버전'을 클릭해주세요.`,
        "warning"
      );
      return;
    } else if (path) {
      navigate(`/${path}`, { from: props.from });
    }
  };

  return (
    <>
      <li
        className={
          classes[
            props.isClub !== "main" && props.isClub !== ""
              ? "non-li"
              : props.nowOn !== path
              ? "li"
              : "liClicked"
          ]
        }
        onClick={clickHandler}
      >
        {props.icon}
        <span className={classes.menuText}>{props.menuText}</span>
      </li>
    </>
  );
};

export default HeaderMenu;
