import {UserObject, AOAuthorizeUser, AOGetUser, AUTHORIZE_USER, GET_USER} from '../types/types';

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
// export function ACT_LOG_OUT(): AOLogOut {
//     return {
//         type: LOG_OUT
//     }
// }