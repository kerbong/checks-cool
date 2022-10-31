import React, { useState } from "react";
import classes from "./SettingSeat.module.css";
import RowColumn from "./RowColumn";

const SettingSeat = () => {
  const [tableSetting, setTableSetting] = useState(false);

  return <>{!tableSetting && <RowColumn />}</>;
};

export default SettingSeat;
