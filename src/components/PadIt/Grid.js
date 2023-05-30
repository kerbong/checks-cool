import React from "react";

const Grid = ({ children, columns }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: 10,
        width: "95%",
        margin: "100px auto",
        justifyItems: "center",
        alignItems: "start",
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
