import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const addIngredientAction = (ingName) => {
    return {
        type: actionTypes.addIngredient,
        ingredientName: ingName
    };
};

export const removeIngredientAction = (ingName) => {
    return {
        type: actionTypes.removeIngredient,
        ingredientName: ingName
    };
};

const setIngredientsAction = (ingredients) => {
    return {
        type: actionTypes.setIngredients,
        ingredients: ingredients
    };
};

const fetchIngredientsFailedAction = () => {
    return {
        type: actionTypes.fetchIngredientsFailed
    };
};

// dispatch an action after getting the data from the firebase
export const initIngredientsAction = () => {
        
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredientsAction(response.data))
            })
            .catch(err => {
                dispatch(fetchIngredientsFailedAction())
            });

    };
};