import {createStore, combineReducers} from 'redux';

import {activeUserReducer} from '../reducers/activeUserReducer';
import {currentUserReducer} from '../reducers/currentUserReducer';

let combinedReducer = combineReducers({
    activeUser: activeUserReducer,
    currentUser: currentUserReducer
});

let store = createStore(combinedReducer);

export default store;
