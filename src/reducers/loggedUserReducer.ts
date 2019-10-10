import {GET_USER_DATA, AUTHORIZE_USER, LOG_OUT, UserObject, ActionObject} from '../types/types';

export function loggedUserReducer(state: UserObject | null = null, action: ActionObject): UserObject | null {
    if (action.type === AUTHORIZE_USER) {
        let newState = null;
        newState = action.body;
        return newState;
    }
    if (action.type === LOG_OUT) {
        return null;
    } 
    if (action.type === GET_USER_DATA) {
        let newState = null;
        newState = action.body;
        return newState;
    } 

    return state;
}