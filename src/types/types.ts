export interface UserObject {
    id: number,
    email: string,
    password: string // create types Email and Password later

}

export type AppState = any; // change the type any

export interface Store {
    AppState: AppState
}