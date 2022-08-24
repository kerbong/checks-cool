import React, { useContext, useEffect, useState } from "react";

import classes from "./ConsultLists.module.css";

const ConsultLists = (props) => {
  const [consults, setConsults] = useState([]);
  const anyContext = useContext(props.context);

  useEffect(() => {
    if (anyContext) {
      anyContext.datas.map((data) => setConsults((prev) => prev.concat(data)));
    }
  }, [anyContext]);

  return (
    <>
      {consults &&
        consults.map((consult) => (
          <li key={consult.id}>
            {consult.student_name} | {consult.option.slice(1)} | {consult.note}{" "}
            |{" "}
          </li>
        ))}
    </>
  );
};

export default ConsultLists;
