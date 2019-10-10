export const AUTHORIZE_USER = "AUTHORIZE_USER";
export const GET_USER_DATA = "GET_USER_DATA";
export const GET_CHILDREN_DATA = "GET_CHILDREN_DATA";
export const EDIT_CHILD_DATA = "EDIT_CHILD_DATA";
export const GET_PHOTOS_DATA = "GET_PHOTOS_DATA";
export const ADD_CHILD_PHOTO = "ADD_CHILD_PHOTO";
export const ADD_CHILD = "ADD_CHILD";
export const LOG_OUT = "LOG_OUT";
export const CONNECT_APP_TO_THE_INTERNET = "CONNECT_APP_TO_THE_INTERNET";
export const CONNECT_APP_TO_THE_SERVER = "CONNECT_APP_TO_THE_SERVER";
export const DELETE_CHILD_PHOTO = "DELETE_CHILD_PHOTO";

export enum InternetConnectionStatus {
    Connected,
    Connection,
    Disconnected
}
  
export enum ServerConnectionStatus {
    Connected,
    Connection,
    Disconnected
}

export interface ChildPhoto {
    id: string,
    src: string,
    createdAt: Date,
    childItemId: string
}

export interface Child {
    id: string,
    name: string,
    dateOfBirth: Date,
    placeOfBirth: string,
    userId: string | undefined
}

export interface UserObject {
    id?: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export interface AOConnectAppToTheInternet {
    type: typeof CONNECT_APP_TO_THE_INTERNET,
    status: InternetConnectionStatus
}
export interface AOConnectAppToTheServer {
    type: typeof CONNECT_APP_TO_THE_SERVER,
    status: ServerConnectionStatus
}
export interface AOAuthorizeUser {
    type: typeof AUTHORIZE_USER,
    body: UserObject
}
export interface AOGetUserData {
    type: typeof GET_USER_DATA,
    body: UserObject
}
export interface AOGetChildrenData {
    type: typeof GET_CHILDREN_DATA,
    body: Child[]
}
export interface AOEditChildData {
    type: typeof EDIT_CHILD_DATA,
    body: Child
}
export interface AOGetPhotosData {
    type: typeof GET_PHOTOS_DATA,
    body: ChildPhoto[]
}
export interface AOAddChild {
    type: typeof ADD_CHILD,
    body: Child
}
export interface AOAddChildPhoto {
    type: typeof ADD_CHILD_PHOTO,
    body: ChildPhoto
}
export interface AODeleteChildPhoto {
    type: typeof DELETE_CHILD_PHOTO,
    body: ChildPhoto
}
export interface AOLogOut {
    type: typeof LOG_OUT
}

export type ActionObject = AOEditChildData | AODeleteChildPhoto | AOConnectAppToTheInternet | AOConnectAppToTheServer | AOAuthorizeUser | AOGetPhotosData | AOGetChildrenData | AOGetUserData | AOAddChild | AOAddChildPhoto | AOLogOut;

export interface Store {
    hasInternetConnection: InternetConnectionStatus,
    hasServerConnection: ServerConnectionStatus,
    loggedUser: UserObject,
    userChildren: Child[],
    userPhotos: ChildPhoto[]
}