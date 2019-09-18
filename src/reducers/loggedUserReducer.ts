import {UserObject, AUTHORIZE_USER, ADD_CHILD_PHOTO} from '../types/types';

export function loggedUserReducer(state: any = null, action:any): any {
    if (action.type === AUTHORIZE_USER) {
        let newState = {};
        newState = action.body;
        return newState;
    } 
    if (action.type === ADD_CHILD_PHOTO) {
        let newState = {};
        newState = action.body;
        return newState;
    } 
    
    return state;
}