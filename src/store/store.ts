import {createStore, combineReducers} from 'redux';

import {loggedUserReducer} from '../reducers/loggedUserReducer';
import {currentUserReducer} from '../reducers/currentUserReducer';

let combinedReducer = combineReducers({
    loggedUser: loggedUserReducer,
    currentUser: currentUserReducer
});

let store = createStore(combinedReducer);

export default store;
