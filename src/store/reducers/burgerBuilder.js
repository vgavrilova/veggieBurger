import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    total: 5,
    error: false
};


const INGREDIENT_PRICES = {
    tomato: 0.45,
    salad: 0.5,
    cheese: 0.8,
    vegBacon: 1.3,
    vegMeat: 2
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.setIngredients: 
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case actionTypes.addIngredient:

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                    
                },
                total: state.total + INGREDIENT_PRICES[action.ingredientName]

            };
        case actionTypes.removeIngredient:
            if(action.ingredientName <= 0){
                return;
            }
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                total: state.total - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.fetchIngredientsFailed:
            return {
                ...state,
                error: true
            };
        default:
            return state;        
    }
}


export default reducer;