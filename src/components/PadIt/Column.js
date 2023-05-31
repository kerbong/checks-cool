import React from "react";

const Column = ({ id, children }) => {
  return (
    <div>
      <h2>Column {id}</h2>
      <ul>{children}</ul>
    </div>
  );
};

export default Column;
