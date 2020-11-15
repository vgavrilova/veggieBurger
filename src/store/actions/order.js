import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const burgerPurchaseSuccessAction = (orderId, orderData) => {
    return {
        type: actionTypes.purchaseBurgerSuccess,
        orderId: orderId,
        orderData: orderData
    };
};

export const burgerPurchaseFailAction = (error) => {
    return {
        type: actionTypes.purchaseBurgerFail,
        error: error
    };
};

export const isLoadingAction = () => {
    return {
        type: actionTypes.isLoading
    };
};
export const burgerPurchaseAction = (orderData) => {
    return dispatch => {
        dispatch(isLoadingAction());
        axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(burgerPurchaseSuccessAction(response.data.name, orderData))
        })
        .catch(err => {
            dispatch(burgerPurchaseFailAction(err))
        });

    };
};

