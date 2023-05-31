import React, { forwardRef } from "react";
import classes from "./PadIt.module.css";

const Item = forwardRef(
  ({ withOpacity, isDragging, style, data, isTeacher, ...props }, ref) => {
    const inlineStyles = !isNaN(+data.id)
      ? {
          opacity: withOpacity ? "0.5" : "1",
          transformOrigin: "50% 50%",
          height: "auto",
          //   height: `${Math.max(200, data.text.length * 3)}px`,
          //   minHeight: "200px",
          width: "250px",
          borderRadius: "10px",
          padding: "20px 10px",
          cursor: isDragging ? "grabbing" : "grab",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: isDragging
            ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
            : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
          transform: isDragging ? "scale(1.15)" : "scale(1)",
          ...style,
        }
      : {
          width: "250px",
          borderRadius: "10px",
          padding: "20px 10px",
          ...style,
          backgroundColor: "#ffffff",
        };

    const truncateText = (text, maxLength) => {
      if (text?.length > maxLength) {
        return text?.substring(0, maxLength) + "...";
      }
      return text;
    };

    const truncatedText = truncateText(data?.text, 50); // Adjust the maximum length as needed

    return (
      <div ref={ref} style={inlineStyles} {...props}>
        {!isNaN(+data.id) ? (
          <div
            className={classes["flex-col-center"]}
            style={{ width: "90%", height: "auto" }}
          >
            {/* 패드 메모 제목 */}
            <span className={classes["fs-14rem"]}>{data.title}</span>
            {/* (교사만 보임) 패드 메모 입력날짜 */}
            {isTeacher && (
              <span className={classes["date"]}>{data.createdAt}</span>
            )}
            {/* 구분선 */}
            <hr style={{ width: "100%", margin: "20px 5px" }} />
            {/* 패드 메모 내용 */}
            <span>{truncatedText}</span>
          </div>
        ) : (
          <div
            className={classes["flex-col-center"]}
            style={{ width: "90%" }}
          ></div>
        )}
      </div>
    );
  }
);

export default Item;
