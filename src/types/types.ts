export const AUTHORIZE_USER = "AUTHORIZE_USER";

export interface UserObject {
    id: number,
    email: string,
    password: string // create types Email and Password later

}

export interface AOAuthorizeUser {
    type: typeof AUTHORIZE_USER,
    body: UserObject
}


export interface Store {
    activeUser: any
}