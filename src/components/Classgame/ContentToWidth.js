import React, { useState } from "react";
import { FaRepeat } from "react-icons/fa6";

const ContentToWidth = () => {
  const [isWidth, setIsWidth] = useState(false);

  const toWidthHandler = () => {
    if (isWidth) {
      //가로면 다시 세로로
      document.documentElement.style.setProperty("transform", "");
      document.documentElement.style.setProperty("transform-origin", "top");
      document.documentElement.style.setProperty("position", "absolute");
      document.documentElement.style.setProperty("top", 0);
      document.documentElement.style.setProperty("left", 0);
      document.documentElement.style.setProperty("width", "100vw");
      document.documentElement.style.setProperty("height", "100vh");
    } else {
      //세로면 다시 가로로
      document.documentElement.style.setProperty("transform", "rotate(-90deg)");
      document.documentElement.style.setProperty(
        "transform-origin",
        "top left"
      );
      document.documentElement.style.setProperty("position", "absolute");
      document.documentElement.style.setProperty("top", "100%");
      document.documentElement.style.setProperty("left", 0);
      document.documentElement.style.setProperty("width", "100vh");
      document.documentElement.style.setProperty("height", "100vw");
    }
    setIsWidth((prev) => !prev);
  };

  return (
    <button onClick={toWidthHandler}>
      <FaRepeat />
    </button>
  );
};

export default ContentToWidth;
