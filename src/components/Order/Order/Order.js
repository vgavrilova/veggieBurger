import React from "react";

import style from "./Order.module.css";

const order = (props) => {
  // **** AN ALTERNATIVE: ****
  // const ingredients = [];

  // for(let ingredientName in props.ingredients){
  //     ingredients.push({
  //         name: ingredientName,
  //         amount: props.ingredients[ingredientName]
  //     });
  // }

  // let igOutput = ingredients.map(ig => {
  //     return <span key={ig.name}>{ig.name} ({ig.amount})</span>
  // })

  const ingredients = Object.keys(props.ingredients).map((igKey) => {
    return (
      <span
        style={{
          display: "inline-block",
          margin: "0 8px",
          textTransform: "capitalize",
          padding: "5px",
          border: "1px solid #ccc",
        }}
        key={igKey}
      >
        {igKey} ({props.ingredients[igKey]})
      </span>
    );
  });

  return (
    <div className={style.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>{props.total.toFixed(2)}$</strong>
      </p>
    </div>
  );
};

export default order;
