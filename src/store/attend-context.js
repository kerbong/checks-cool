import React from "react";

const AttendContext = React.createContext({
  datas: [],
  addData: (data) => {},
  removeData: (id) => {},
});

export default AttendContext;
