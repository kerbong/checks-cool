import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  const [width, setWidth] = useState("");
  const [divElement, setDivElement] = useState(null);

  useEffect(() => {
    // div 요소 선택

    setDivElement(document.getElementsByClassName("modal")[0]);
  }, []);

  //속성으로 전해지는 modal의 가로 세로 크기에 따라 가운데 정렬해주기
  useEffect(() => {
    if (!divElement) return;
    // div 요소 선택

    // contentWidth 계산
    const contentWidth = divElement.scrollWidth;
    // 화면 높이 계산
    const windowWidth = window.innerWidth;

    // 가운데 정렬을 위한 top 위치 계산
    const leftPosition = Math.max(0, ((windowWidth - contentWidth) / 2) * 1);

    // div 요소의 top 위치 설정
    setWidth(`${leftPosition}px`);
  }, [divElement]);

  return (
    <div
      className={`modal ${classes.modal} ${
        props.addStyle ? classes[props.addStyle] : ""
      }`}
      style={{
        ...(width !== "" ? { left: width } : {}),
      }}
    >
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay addStyle={props.addStyle}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
