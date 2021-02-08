import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "./utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case actionTypes.purchaseBurgerSuccess:
      const newOrder = updatedObject(action.orderData, { id: action.orderId });
      newState = updatedObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      });
      break;

    case actionTypes.purchaseBurgerFail:
      newState = updatedObject(state, { loading: false });
      break;

    case actionTypes.burgerLoading:
      newState = updatedObject(state, { loading: true });
      break;

    case actionTypes.purchaseInit:
      newState = updatedObject(state, { purchased: false });
      break;

    case actionTypes.fetchOrdersLoading:
      newState = updatedObject(state, { loading: true });
      break;

    case actionTypes.fetchOrdersSuccess:
      newState = updatedObject(state, {
        orders: action.orders,
        loading: false,
      });
      break;

    case actionTypes.fetchOrdersFail:
      newState = updatedObject(state, { loading: false });
      break;

    // DELETE CASE?
    // delete an order from the redux global state
    // and then post the orders via axios
    default:
      newState = state;
      break;
  }

  return newState;
};

export default reducer;
