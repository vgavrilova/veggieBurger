import React from "react";

// a globally available js object
const showSideBar = React.createContext({
  show: () => {},
});

export default showSideBar;
