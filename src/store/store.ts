import {createStore, combineReducers} from 'redux';

import {loggedUserReducer} from '../reducers/loggedUserReducer';
import {userChildrenReducer} from '../reducers/userChildrenReducer';
import {userPhotosReducer} from '../reducers/userPhotosReducer';

let combinedReducer = combineReducers({
    loggedUser: loggedUserReducer,
    userChildren: userChildrenReducer,
    userPhotos: userPhotosReducer
});

let store = createStore(combinedReducer);

export default store;
