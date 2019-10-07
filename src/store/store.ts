import {createStore, combineReducers} from 'redux';

import {loggedUserReducer} from '../reducers/loggedUserReducer';
import {userChildrenReducer} from '../reducers/userChildrenReducer';
import {userPhotosReducer} from '../reducers/userPhotosReducer';
import {internetConnectionReducer} from '../reducers/internetConnectionReducer';
import {serverConnectionReducer} from '../reducers/serverConnectionReducer';

let combinedReducer = combineReducers({
    hasInternetConnection: internetConnectionReducer,
    hasServerConnection: serverConnectionReducer,
    loggedUser: loggedUserReducer,
    userChildren: userChildrenReducer,
    userPhotos: userPhotosReducer
});

let store = createStore(combinedReducer);

export default store;
