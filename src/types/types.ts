export const AUTHORIZE_USER = "AUTHORIZE_USER";
export const GET_USER = "GET_USER";

export interface Child {
    name: string,
    dateOfBirth: Date
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

export interface Store {
    loggedUser: UserObject,
    currentUser: UserObject
}