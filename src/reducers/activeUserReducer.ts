import {UserObject, AUTHORIZE_USER} from '../types/types';

export function activeUserReducer(state: any = null, action:any) { //
    if (action.type === AUTHORIZE_USER) {
        let newState = {};
        newState = action.body;
        return newState;
    }
    return state;
}