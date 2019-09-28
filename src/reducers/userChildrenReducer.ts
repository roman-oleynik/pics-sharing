import {GET_USER_DATA, AUTHORIZE_USER, ADD_CHILD, GET_CHILDREN_DATA, ADD_CHILD_PHOTO, LOG_OUT, Child, UserObject, ActionObject} from '../types/types';

export function userChildrenReducer(state: Child[] | null = null, action: ActionObject): Child[] | null {
    if (action.type === ADD_CHILD) {
        let newState = null;
        newState = action.body;
        return newState;
    } 
    if (action.type === GET_CHILDREN_DATA) {
        let newState = null;
        newState = action.body;
        return newState;
    } 
    if (action.type === LOG_OUT) {
        return null;
    } 
    return state;
}