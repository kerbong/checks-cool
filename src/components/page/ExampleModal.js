import React from "react";
import Modal from "../Layout/Modal";
import classes from "./ExampleModal.module.css";

const ExampleModal = (props) => {
  return (
    <Modal onClose={props.onClose} addStyle={props.addStyle}>
      <span onClick={props.onClose} className={classes.xmark}>
        <i className="fa-regular fa-circle-xmark"></i>
      </span>
      <div>{props.title}</div>
      <hr style={{ margin: "20px 15px" }} />

      <div className={classes["img-div"]}>
        {props.imgSrc && (
          <img src={props.imgSrc} className={classes.img} alt="exampleGif" />
        )}
      </div>
      <div>{props.text}</div>
      <div>{props.bottomText}</div>
    </Modal>
  );
};

export default ExampleModal;
