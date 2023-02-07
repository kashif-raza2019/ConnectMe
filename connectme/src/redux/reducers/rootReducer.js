import { combineReducers } from 'redux';
import  loginReducer  from './loginReducer';
import roomsReducer from './roomsReducer';
import socketReducer from './socketReducer';

export const rootReducer = combineReducers({
    // Add reducers here
    loginReducer,
    roomsReducer,
    socketReducer,
});