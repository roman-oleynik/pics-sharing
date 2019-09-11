export const AUTHORIZE_USER = "AUTHORIZE_USER";
export const GET_USER = "GET_USER";

export interface UserObject {
    id?: string,
    email: string,
    password: string // create types Email and Password later

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
    activeUser: UserObject,
    currentUser: UserObject
}