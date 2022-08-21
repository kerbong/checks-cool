import React, { useContext, useState } from "react";

import classes from "./ConsultLists.module.css";

const ConsultLists = (props) => {
  const [consults, setConsults] = useState([]);
  const anyContext = useContext(props.ConsultContext);

  return <></>;
};

export default ConsultLists;
