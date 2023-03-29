import { configureStore } from '@reduxjs/toolkit'
import Reducer from './reducer/reducer'

const store = configureStore(
  {
    reducer:
    {
      action :  Reducer.reducer,
    },

    
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),

    devTools: true,

  })

export default store