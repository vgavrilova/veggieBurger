import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import style from './CheckoutSum.module.css';


const checkoutSum = (props) => {
    return (
        <div className={style.CheckoutSum}>
            <h1>Your VeggieBurger is coming to you!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>Cancel</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>Continue</Button>
            
        </div>
    );
};


export default checkoutSum;