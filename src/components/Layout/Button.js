import classes from "./Button.module.css";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
  let navigate = useNavigate();
  let clickHandler;
  if (props.path) {
    clickHandler = () => navigate(`/${props.path}`);
  } else if (props.onclick) {
    clickHandler = props.onclick;
  }

  return (
    <>
      <button
        id={props.id}
        className={classes[props.className]}
        onClick={clickHandler}
        style={props.style}
        title={props.title}
      >
        {props.icon}
        {props.name}
      </button>
    </>
  );
};

export default Button;
