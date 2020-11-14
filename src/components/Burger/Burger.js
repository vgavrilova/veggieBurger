import React from 'react';

import style from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    // extract keys from the object in a state
    // and create an array of them depending on the number of ingredients there
    // igKey is an ingredient, i.e. cheese, salad
    // props.ingredients[igKey] shows the value of the keys
    let ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            // map through every item of the same type
            // i.e. cheese: 2 --> [...Array(props.ingredients[2])]  --> it will be iterated
            // returns the exact type of an ingredient and the number it occurs in the object
            return [...Array(props.ingredients[igKey])].map((_, index) => {
                return <BurgerIngredient key={igKey + index} type={igKey} />;
            });
            
        })
        // takes a callback as the first argument with a previous and the next value
        // the second argument is the initial value of the reduced value --> here [] 
        // returns the values of inner arrays --> concatenation of previous and the current array
        // i.e cheese: 1, salad: 2 => [ch , s , s s ] => length = 3
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (ingredients.length === 0){
        ingredients = <p>Please start adding ingredients!</p>
    }

    //console.log(ingredients);  
    return (
        <div className={style.Burger}>
            <BurgerIngredient type="bread-top"/>
            {ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );

}


export default burger;