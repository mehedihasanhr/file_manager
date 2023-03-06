import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import { apiSlice } from './api/apiSlice'



export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),

    devTools: process.env.NODE_ENV !== 'production',
})