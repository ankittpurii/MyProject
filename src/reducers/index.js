import PersistReducer from './PersistReducer'
import LoadingReducer from './LoadingReducer'

import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    storage: AsyncStorage,
    key: "persistedReducer",
    version: 1,
};

export default combineReducers({
    LoadingReducer: LoadingReducer,
    persistedReducer: persistReducer(persistConfig, PersistReducer)
})