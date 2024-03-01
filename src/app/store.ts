import { configureStore } from '@reduxjs/toolkit'
import episodeFilterReducer from '../features/episodeFilter/episodeFilterSlice'
import episodePaginationReducer from '../features/episodePagination/episodePaginationSlice' 
import characterFilterReducer from '../features/characterFilter/characterFilterSlice'
import characterPaginationReducer from '../features/characterPagination/characterPaginationSlice' 
import api from './api'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    episodeFilter: episodeFilterReducer,
    episodePagination: episodePaginationReducer,
    characterFilter: characterFilterReducer,
    characterPagination: characterPaginationReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({}).concat([api.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;