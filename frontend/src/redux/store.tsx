"use client";


import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import Reducer from './reducer/reducer'
import authReducer from './reducer/authReducer'
import numReducer from './reducer/numReducer';
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit';


const reducers = combineReducers({
  action: Reducer.reducer,
  auth: authReducer,
  numbers : numReducer.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['action', 'auth', 'numbers']

};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore(
  {
    reducer: persistedReducer,
    // {
    //   action: Reducer.reducer,
    //   auth: authReducer,
    //   numbers : numReducer.reducer
    // },



    
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),

    devTools: true,

  })
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
