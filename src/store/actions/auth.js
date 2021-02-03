import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStartAction = () => {
    return {
        type: actionTypes.authStart
    };
};

export const authSuccessAction = (token, userId) => {
    return {
        type: actionTypes.authSuccess,
        tokenId: token,
        userId: userId

    };
};

export const authFailAction = (err) => {
    return {
        type: actionTypes.authFail,
        error: err
    };
};

export const logoutAction = () =>{
    return {
        type: actionTypes.authLogOut
    }
};

export const checkTimeout = (expirationTime) => {
    return dispatch => {
        // setTimeout gets ms
        setTimeout(() => {
            dispatch(logoutAction());
        }, expirationTime * 1000);
    };
};

export const authAction = (email, password, signup) => {
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
                dispatch(authSuccessAction(res.data.idToken, res.data.localId));
                dispatch(checkTimeout(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFailAction(err.response.data.error));
            });
    };
};

export const setAuthPath = (path) => {
    return {
        type: actionTypes.setAuthPath,
        path: path
    }

}