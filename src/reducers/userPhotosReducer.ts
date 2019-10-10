import { DELETE_CHILD_PHOTO,
    GET_PHOTOS_DATA,
    ADD_CHILD_PHOTO, 
    LOG_OUT, 
    ActionObject,
    ChildPhoto
} from '../types/types';

export function userPhotosReducer(state: ChildPhoto[] = [], action: ActionObject): ChildPhoto[] {
    
    if (action.type === ADD_CHILD_PHOTO) {
        let newState = [...state, action.body];
        return newState;
    } 
    if (action.type === DELETE_CHILD_PHOTO) {
        const stateCopy = [...state as ChildPhoto[]];
        const newState = stateCopy.filter((photo: ChildPhoto) => photo.id !== action.body.id)
        return newState;
    } 
    if (action.type === LOG_OUT) {
        return [];
    } 
    if (action.type === GET_PHOTOS_DATA) {
        let newState = [];
        newState = action.body;
        return newState;
    } 

    return state;
}