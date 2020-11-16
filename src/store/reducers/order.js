import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
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
            loading: false,
            orders: state.orders.concat(newOrder),
            purchased: true

        };
        case actionTypes.purchaseBurgerFail:
            return {
                ...state,
                loading: false

            };
        case actionTypes.burgerLoading:
            return {
                ...state,
                loading: true
    
            };
        case actionTypes.purchaseInit:
            return {
                ...state,
                purchased: false
    
            };
        case actionTypes.fetchOrdersLoading:
            return {
                ...state,
                loading: true
    
            };
        case actionTypes.fetchOrdersSuccess:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        case actionTypes.fetchOrdersFail:
            return {
                ...state,
                loading: false
            };
        default: 
            return state;
        }

};

export default reducer;