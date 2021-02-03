import React from 'react';

import style from './BuildControls.module.css';
import BuildControl from './BuildControl';

const controls = [
    {label: 'Tomato', type: 'tomato'},
    {label: 'Salad', type: 'salad'},
    {label: 'Veggie Bacon', type: 'vegBacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Pea Meat', type: 'vegMeat'}
];

const buildControls = (props) => (
    <div className={style.Controls}>
        <p className={style.para}>Current Price: <strong>{props.price.toFixed(2)} $</strong></p>
        {controls.map(control => 
            <BuildControl 
                key={control.label} 
                ingredientLabel={control.label} 
                addIngredient={() => props.addIngredient(control.type)}
                removeIngredient={() => props.removeIngredient(control.type)}
                disabled={props.disabled[control.type]}/>
                )}
        
        <button 
            className={style.checkoutBtn} 
            disabled={!props.purchaseable}
            onClick={props.btnClicked}
            >{props.isLoggedin ? 'Checkout' : 'Please Login To Continue!'}</button>        
    </div>
);


export default buildControls;