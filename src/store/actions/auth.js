import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStartAction = () => {
    return {
        type: actionTypes.authStart
    };
};

export const authSuccessAction = (authData) => {
    return {
        type: actionTypes.authSuccess,
        authData: authData

    };
};

export const authFailAction = (err) => {
    return {
        type: actionTypes.authFail,
        error: err
    };
};

export const auth = (email, password, signup) => {
    return dispatch => {
        dispatch(authStartAction());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVZPhRTbBSLpnEia4mMTdIih9HVMMVkqw';
        if(!signup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVZPhRTbBSLpnEia4mMTdIih9HVMMVkqw';
        }
        axios.post(url, authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccessAction(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFailAction(err));
            });
    };
};