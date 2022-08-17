import React from "react";

const ConsultContext = React.createContext({
  datas: [],
  addData: (data) => {},
  removeData: (id) => {},
});

export default ConsultContext;
