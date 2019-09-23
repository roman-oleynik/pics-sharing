export const AUTHORIZE_USER = "AUTHORIZE_USER";
export const GET_USER = "GET_USER";
export const ADD_CHILD_PHOTO = "ADD_CHILD_PHOTO";
export const ADD_CHILD = "ADD_CHILD";
export const LOG_OUT = "LOG_OUT";

export interface ChildPhoto {
    id: string,
    src: string,
    createdAt: Date
}

export interface Child {
    id: string,
    name: string,
    dateOfBirth: Date,
    placeOfBirth: string,
    photos: ChildPhoto[]
}

export interface UserObject {
    id?: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    children: Child[]
}

export interface AOAuthorizeUser {
    type: typeof AUTHORIZE_USER,
    body: UserObject
}
export interface AOGetUser {
    type: typeof GET_USER,
    body: UserObject
}
export interface AOAddChild {
    type: typeof ADD_CHILD,
    body: UserObject
}
export interface AOAddChildPhoto {
    type: typeof ADD_CHILD_PHOTO,
    body: UserObject
}
export interface AOLogOut {
    type: typeof LOG_OUT
}

export type ActionObject = AOAuthorizeUser | AOGetUser | AOAddChild | AOAddChildPhoto | AOLogOut;

export interface Store {
    loggedUser: UserObject
}