import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const FadeLayout = (props) => {
  return (
    <div
      className={`${classes.fadeModal} ${
        props.addStyle ? classes[props.addStyle] : ""
      }`}
    >
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const FadeInOut = (props) => {
  const portalElement = document.getElementById(props.elementId);
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <FadeLayout addStyle={props.addStyle}>{props.children}</FadeLayout>,
        portalElement
      )}
    </Fragment>
  );
};

export default FadeInOut;
