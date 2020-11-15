import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    purchasing: false,
    purchased: false

};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.purchaseBurgerSuccess:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
        return {
            ...state,
            purchasing: false,
            orders: state.orders.concat(newOrder),
            purchased: true

        };
        case actionTypes.purchaseBurgerFail:
            return {
                ...state,
                purchasing: false

            };
        case actionTypes.isLoading:
            return {
                ...state,
                purchasing: true
    
            };
        case actionTypes.purchaseInit:
            return {
                ...state,
                purchased: false
    
            };
        default: 
            return state;
        }

};

export default reducer;