import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        cheese: 0,
        salad: 0,
        tomato: 0,
        vegBacon: 0,
        vegMeat: 0
    },
    total: 5
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
        default:
            return state;        
    }
}


export default reducer;