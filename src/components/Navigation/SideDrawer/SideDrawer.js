import React from "react";

import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import style from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
import CloseBtn from "../../UI/Button/CloseBtn";

const sideDrawer = (props) => {
  let sideDrawer = [style.SideDrawer, style.Close];
  if (props.show) {
    sideDrawer = [style.SideDrawer, style.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closed} />
      <div className={sideDrawer.join(" ")}>
        <CloseBtn clicked={props.closed} />
        <Logo height="12%" />
        <nav>
          <NavItems isLoggedIn={props.isLoggedIn} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
