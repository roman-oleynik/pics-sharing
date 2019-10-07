import {
    UserObject, 
    Child,
    AOAuthorizeUser, 
    AOGetUserData, 
    AOGetPhotosData, 
    AOGetChildrenData, 
    AOAddChild, 
    AOAddChildPhoto,
    AOConnectAppToTheInternet,
    AOConnectAppToTheServer,
    AOLogOut, 
    LOG_OUT, 
    ADD_CHILD, 
    AUTHORIZE_USER, 
    ADD_CHILD_PHOTO, 
    GET_USER_DATA, 
    GET_CHILDREN_DATA,
    GET_PHOTOS_DATA,
    CONNECT_APP_TO_THE_INTERNET,
    CONNECT_APP_TO_THE_SERVER,
    ChildPhoto,
    InternetConnectionStatus, 
    ServerConnectionStatus
} from '../types/types';

export function ACT_CONNECT_APP_TO_THE_INTERNET(status: InternetConnectionStatus): AOConnectAppToTheInternet {
    return {
        type: CONNECT_APP_TO_THE_INTERNET,
        status
    }
}
export function ACT_CONNECT_APP_TO_THE_SERVER(status: ServerConnectionStatus): AOConnectAppToTheServer {
    return {
        type: CONNECT_APP_TO_THE_SERVER,
        status
    }
}
export function ACT_AUTHORIZE_USER(user: UserObject): AOAuthorizeUser {
    return {
        type: AUTHORIZE_USER,
        body: user
    }
}
export function ACT_GET_USER_DATA(user: UserObject): AOGetUserData {
    return {
        type: GET_USER_DATA,
        body: user
    }
}
export function ACT_GET_CHILDREN_DATA(children: Child[]): AOGetChildrenData {
    return {
        type: GET_CHILDREN_DATA,
        body: children
    }
}
export function ACT_GET_PHOTOS_DATA(photos: ChildPhoto[]): AOGetPhotosData {
    return {
        type: GET_PHOTOS_DATA,
        body: photos
    }
}
export function ACT_ADD_CHILD(children: Child[]): AOAddChild {
    return {
        type: ADD_CHILD,
        body: children
    }
}
export function ACT_ADD_CHILD_PHOTO(photo: ChildPhoto[]): AOAddChildPhoto {
    return {
        type: ADD_CHILD_PHOTO,
        body: photo
    }
}
// export function ACT_DELETE_CHILD_PHOTO(user: UserObject): AODeleteChildPhoto {
//     return {
//         type: DELETE_CHILD_PHOTO,
//         body: user
//     }
// }
export function ACT_LOG_OUT(): AOLogOut {
    return {
        type: LOG_OUT
    }
}