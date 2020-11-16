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

export const burgerLoadingAction = () => {
    return {
        type: actionTypes.burgerLoading
    };
};
export const burgerPurchaseAction = (orderData) => {
    return dispatch => {
        dispatch(burgerLoadingAction());
        axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(burgerPurchaseSuccessAction(response.data.name, orderData))
        })
        .catch(err => {
            dispatch(burgerPurchaseFailAction(err))
        });

    };
};

export const purchaseInitAction = () => {
    return {
        type: actionTypes.purchaseInit
    };
};




export const fetchOrdersLoadingAction = () => {
    return {
        type: actionTypes.fetchOrdersLoading
    };
};

export const fetchOrdersSuccessAction = (orders) => {
    return {
        type: actionTypes.fetchOrdersSuccess,
        orders: orders
    };
};

export const fetchOrdersFailAction = (error) => {
    return {
        type: actionTypes.fetchOrdersFail,
        error: error
    };
};

export const fetchOrdersAction = () => {
    return dispatch => {
        dispatch(fetchOrdersLoadingAction());

        axios.get('/orders.json')
            .then(res => {
                // make an array of objects from the fetched data
                const fetchedOrders = [];
                for(let key in res.data){
                    // the data on firebase is saved under a specific key
                    // extract all property-value pairs of that key
                    // and save the key itself under the property 'key'
                    fetchedOrders.push({ 
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccessAction(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFailAction(err))
            }); 
    };

};
