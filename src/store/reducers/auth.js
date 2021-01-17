import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from './utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.authStart:
            return updatedObject(state, {error: null, loading: true});
           
        case actionTypes.authSuccess:
            return updatedObject(state, {
                token: action.tokenId,
                userId: action.userId,
                error: null,
                loading: false
            });
        case actionTypes.authFail:
            return updatedObject(state, {
                error: action.error,
                loading: false
            });
        default:
            return state;
    }

}

export default reducer;