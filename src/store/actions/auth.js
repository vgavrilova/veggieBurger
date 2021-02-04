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
    localStorage.removeItem('expDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
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
                const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expDate', expDate);
                localStorage.setItem('userId', res.data.localId);
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

export const authCheckStatus = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logoutAction());
        } else {
            const expDate = new Date(localStorage.getItem('expDate'));
            // login if the expiration date is greater that the current date
            if(expDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccessAction(token, userId));
                // get the difference in seconds
                // to logout
                dispatch(checkTimeout((expDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logoutAction());
            }
                
            
        }
        
    }
}