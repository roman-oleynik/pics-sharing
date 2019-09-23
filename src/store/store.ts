import {createStore, combineReducers} from 'redux';

import {loggedUserReducer} from '../reducers/loggedUserReducer';

let combinedReducer = combineReducers({
    loggedUser: loggedUserReducer
});

let store = createStore(combinedReducer);

export default store;
