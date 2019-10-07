import { CONNECT_APP_TO_THE_INTERNET, 
    AOConnectAppToTheInternet,
    InternetConnectionStatus
} from '../types/types';

export function internetConnectionReducer(state: InternetConnectionStatus = InternetConnectionStatus.Connection, action: AOConnectAppToTheInternet): InternetConnectionStatus {
    if (action.type === CONNECT_APP_TO_THE_INTERNET) {
        return action.status
    } 
    return state;
}