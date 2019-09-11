import {UserObject, GET_USER} from '../types/types';

export function currentUserReducer(state: any = null, action:any) { //
    if (action.type === GET_USER) {
        let newState = {...state};
        newState = action.body;
        return newState;
    }
    return state;
}