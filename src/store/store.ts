import {createStore, combineReducers} from 'redux';

import {activeUserReducer} from '../reducers/activeUserReducer';

let combinedReducer = combineReducers({
    activeUser: activeUserReducer
});

let store = createStore(combinedReducer);

export default store;
