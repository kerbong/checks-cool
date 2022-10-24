import React from "react";
import Modal from "../Layout/Modal";

const ExampleModal = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <img src={props.imgSrc} width="100%" max-height="80vh" alt="exampleGif" />
    </Modal>
  );
};

export default ExampleModal;
