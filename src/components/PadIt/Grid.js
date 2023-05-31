import React from "react";

const Grid = ({ children, columns, styles }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: 10,
        width: "95%",
        margin: "40px auto",
        justifyItems: "center",
        alignItems: "start",
        height: "max-content",
        ...styles,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
