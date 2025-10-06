import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { appointmentApi } from "./services/appointmentApi";
import userReducer from './features/userSlice'

export const store= configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [appointmentApi.reducerPath]:appointmentApi.reducer,
        user:userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(appointmentApi.middleware,userApi.middleware),
})