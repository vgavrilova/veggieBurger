import React from "react";
import PropTypes from "prop-types";

import style from "./BurgerIngredient.module.css";

const burgerIngredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={style.BreadBottom}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={style.BreadTop}>
          <div className={style.Seeds1}></div>
          <div className={style.Seeds2}></div>
        </div>
      );
      break;
    case "vegMeat":
      ingredient = <div className={style.VegMeat}></div>;
      break;
    case "cheese":
      ingredient = <div className={style.Cheese}></div>;
      break;
    case "vegBacon":
      ingredient = <div className={style.VegBacon}></div>;
      break;
    case "salad":
      ingredient = <div className={style.Salad}></div>;
      break;
    case "tomato":
      ingredient = <div className={style.Tomato}></div>;
      break;
    default:
      ingredient = null;
      break;
  }
  return ingredient;
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default burgerIngredient;
