import React from 'react';
import style from './OrderSum.module.css';
import Button from '../../UI/Button/Button';
import CloseBtn from '../../UI/Button/CloseBtn';

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
            <CloseBtn className={style.CloseBtn} clicked={props.cancel}/>
            <h3>Your Order</h3>
            <p>An amazing veggie burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total: {props.price.toFixed(2)} $</strong></p> 
            <p>Proceed to checkout?</p>
            <Button clicked={props.cancel} btnType="Danger">Cancel</Button>
            <Button clicked={props.continue} btnType="Success">Continue</Button>
        </div>

    );

};


export default orderSum;