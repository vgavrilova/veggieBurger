import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "./utility";

const initialState = {
  ingredients: null,
  total: 5,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  tomato: 0.45,
  salad: 0.5,
  cheese: 0.8,
  vegBacon: 1.3,
  vegMeat: 2,
};

const reducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case actionTypes.setIngredients:
      newState = updatedObject(state, {
        ingredients: action.ingredients,
        total: 5,
        error: false,
        building: false,
      });
      break;

    case actionTypes.addIngredient:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      const updatedIngredients = updatedObject(
        state.ingredients,
        updatedIngredient
      );
      const updatedState = {
        ingredients: updatedIngredients,
        total: state.total + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
      newState = updatedObject(state, updatedState);
      break;

    case actionTypes.removeIngredient:
      if (action.ingredientName <= 0) {
        return;
      }
      const updatedIngr = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      };
      const updatedIngrs = updatedObject(state.ingredients, updatedIngr);
      const updatedSt = {
        ingredients: updatedIngrs,
        total: state.total - INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
      newState = updatedObject(state, updatedSt);
      break;

    case actionTypes.fetchIngredientsFailed:
      newState = updatedObject(state, { error: true });
      break;

    default:
      newState = state;
      break;
  }

  return newState;
};

export default reducer;
