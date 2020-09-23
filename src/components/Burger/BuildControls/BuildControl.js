import React from 'react';

import style from './BuildControl.module.css';


const buildControl = (props) => (
    <div className={style.BuildControl}>
        <div className={style.Label}>{props.ingredientLabel}</div>
        <button 
            className={style.More} 
            onClick={props.addIngredient}
            ><i class="fas fa-plus"></i>
        </button>
        <button 
            className={style.Less} 
            onClick={props.removeIngredient}
            disabled={props.disabled}><i class="fas fa-minus"></i>
        </button>
    </div>

);


export default buildControl;