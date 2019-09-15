import {UserObject, AUTHORIZE_USER} from '../types/types';

export function loggedUserReducer(state: any = null, action:any): any {
    if (action.type === AUTHORIZE_USER) {
        let newState = {};
        newState = action.body;
        return newState;
    } 
    
    return state;
}