import {UserObject, AOAuthorizeUser, AUTHORIZE_USER} from '../types/types';

export function ACT_AUTHORIZE_USER(user: UserObject): AOAuthorizeUser {
    return {
        type: AUTHORIZE_USER,
        body: user
    }
}