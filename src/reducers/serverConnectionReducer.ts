import { CONNECT_APP_TO_THE_SERVER, 
    AOConnectAppToTheServer,
    ServerConnectionStatus
} from '../types/types';

export function serverConnectionReducer(state: ServerConnectionStatus = ServerConnectionStatus.Connection, action: AOConnectAppToTheServer): ServerConnectionStatus {
    if (action.type === CONNECT_APP_TO_THE_SERVER) {
        return action.status
    } 
    return state;
}