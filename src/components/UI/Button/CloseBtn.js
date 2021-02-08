import React from "react";

import style from "./CloseBtn.module.css";

const closeBtn = (props) => (
  <button className={style.CloseBtn} onClick={props.clicked}>
    <i className="fas fa-times"></i>
  </button>
);

export default closeBtn;
