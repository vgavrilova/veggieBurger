import React from 'react';
import style from './OrderSum.module.css';


const orderSum = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(el => {
    return  <li key={el}>
                <span style={{textTransform: 'capitalize'}}>{el}</span>
                : {props.ingredients[el]}
            </li>
    });


    return (

        <div className={style.Sum}>
            <h3>Your Order</h3>
            <p>An amazing veggie burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Proceed to checkout?</p>
            
        </div>

    );

};


export default orderSum;