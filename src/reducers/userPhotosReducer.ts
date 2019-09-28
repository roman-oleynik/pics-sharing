import {GET_USER_DATA, 
    AUTHORIZE_USER, 
    ADD_CHILD, 
    GET_PHOTOS_DATA,
    ADD_CHILD_PHOTO, 
    LOG_OUT, 
    UserObject, 
    ActionObject,
    ChildPhoto
} from '../types/types';

export function userPhotosReducer(state: ChildPhoto[] | null = null, action: ActionObject): ChildPhoto[] | null {
    
    if (action.type === ADD_CHILD_PHOTO) {
        let newState = null;
        newState = action.body;
        return newState;
    } 
    // if (action.type === DELETE_CHILD_PHOTO) {
    //     let newState = null;
    //     newState = action.body;
    //     return newState;
    // } 
    if (action.type === LOG_OUT) {
        return null;
    } 
    if (action.type === GET_PHOTOS_DATA) {
        let newState = null;
        newState = action.body;
        return newState;
    } 

    return state;
}