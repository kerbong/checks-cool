import React from "react";
import Modal from "../Layout/Modal";
import classes from "./ExampleModal.module.css";

const ExampleModal = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <span onClick={props.onClose} className={classes.xmark}>
        <i className="fa-regular fa-circle-xmark"></i>
      </span>
      <div>{props.text}</div>
      <div className={classes["img-div"]}>
        <img src={props.imgSrc} className={classes.img} alt="exampleGif" />
      </div>
      <div>{props.bottomText}</div>
    </Modal>
  );
};

export default ExampleModal;
