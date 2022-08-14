import React, { useContext } from "react";
import AttendContext from "../../App";

const AttendTotal = () => {
  const attendCtx = useContext(AttendContext);
  console.log(attendCtx);
  return <div>AttendTotal</div>;
};

export default AttendTotal;
