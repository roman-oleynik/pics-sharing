import {UserObject, AOAuthorizeUser, AOGetUser, AOAddChild, AOAddChildPhoto, AOLogOut, LOG_OUT, ADD_CHILD, AUTHORIZE_USER, GET_USER, ADD_CHILD_PHOTO} from '../types/types';

export function ACT_AUTHORIZE_USER(user: UserObject): AOAuthorizeUser {
    return {
        type: AUTHORIZE_USER,
        body: user
    }
}
export function ACT_GET_USER(user: UserObject): AOGetUser {
    return {
        type: GET_USER,
        body: user
    }
}
export function ACT_ADD_CHILD(user: UserObject): AOAddChild {
    return {
        type: ADD_CHILD,
        body: user
    }
}
export function ACT_ADD_CHILD_PHOTO(user: UserObject): AOAddChildPhoto {
    return {
        type: ADD_CHILD_PHOTO,
        body: user
    }
}
export function ACT_LOG_OUT(): AOLogOut {
    return {
        type: LOG_OUT
    }
}