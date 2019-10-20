import { EDIT_SERVER_CONNECTION_STATUS, 
    AOConnectAppToTheServer,
    ServerConnectionStatus
} from '../types/types';

export function serverConnectionReducer(state: ServerConnectionStatus = ServerConnectionStatus.Connection, action: AOConnectAppToTheServer): ServerConnectionStatus {
    if (action.type === EDIT_SERVER_CONNECTION_STATUS) {
        return action.status
    } 
    return state;
}