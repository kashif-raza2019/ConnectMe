import {legacy_createStore} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {persistStore} from 'redux-persist';
import {rootReducer} from './rootReducer';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['loginReducer', 'roomsReducer', 'socketReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(persistedReducer);

export const persistor = persistStore(store);