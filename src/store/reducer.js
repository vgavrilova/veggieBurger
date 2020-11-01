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


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.addIngredient:

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }

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
                }
            };
        default:
            return state;        
    }
}


export default reducer;