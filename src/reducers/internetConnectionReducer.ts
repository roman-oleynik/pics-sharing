import { EDIT_INTERNET_CONNECTION_STATUS, 
    AOConnectAppToTheInternet,
    InternetConnectionStatus
} from '../types/types';

export function internetConnectionReducer(state: InternetConnectionStatus = InternetConnectionStatus.Connection, action: AOConnectAppToTheInternet): InternetConnectionStatus {
    if (action.type === EDIT_INTERNET_CONNECTION_STATUS) {
        return action.status
    } 
    return state;
}