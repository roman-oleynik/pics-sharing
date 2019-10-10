import {ADD_CHILD, EDIT_CHILD_DATA, GET_CHILDREN_DATA, LOG_OUT, Child, ActionObject} from '../types/types';

export function userChildrenReducer(state: Child[] | null = null, action: ActionObject): Child[] | null {
    if (action.type === ADD_CHILD) {
        let newState = [...state as Child[]]
        newState = [...state as Child[], action.body];
        return newState;
    } else if (action.type === EDIT_CHILD_DATA) {
        let newState = [...state as Child[]];
        const newStateWithoutChangedChild = newState.filter((child: Child) => {
            return child.id !== action.body.id;
        });
        newState = [...newStateWithoutChangedChild, action.body];
        return newState;
    } else if (action.type === GET_CHILDREN_DATA) {
        let newState = null;
        newState = action.body;
        return newState;
    } else if (action.type === LOG_OUT) {
        return null;
    } else {
        return state;
    }
}