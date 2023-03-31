import { configureStore } from '@reduxjs/toolkit'
import Reducer from './reducer/reducer'

export const store = configureStore(
  {
    reducer:
    {
      action :  Reducer.reducer,
    },

    
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),

    devTools: true,

  })
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
