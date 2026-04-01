import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { appointmentApi } from "./services/appointmentApi";
import userReducer from './features/userSlice'
import { notificationsApi } from "./services/notificationsApi";

export const store= configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [appointmentApi.reducerPath]:appointmentApi.reducer,
        [notificationsApi.reducerPath]:notificationsApi.reducer,
        user:userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(appointmentApi.middleware,userApi.middleware,notificationsApi.middleware),
})