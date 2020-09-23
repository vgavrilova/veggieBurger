import React from 'react';

import style from './BuildControls.module.css';
import BuildControl from './BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Veggie Bacon', type: 'vegBacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Pea Meat', type: 'vegMeat'}
];

const buildControls = (props) => (
    <div className={style.Controls}>
        {controls.map(control => 
            <BuildControl 
                key={control.label} 
                ingredientLabel={control.label} 
                addIngredient={() => props.addIngredient(control.type)}
                removeIngredient={() => props.removeIngredient(control.type)}
                disabled={props.disabled[control.type]}/>
                )}
    </div>
);


export default buildControls;