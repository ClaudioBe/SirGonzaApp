"use client"
import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../services/userApi';
import Cookies from 'js-cookie';

const initialState = {
  admin: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    restoreSession: (state) => {
      const userCookie = Cookies.get('user');
      const user = userCookie ? JSON.parse(userCookie) : null;
      const admin = user?.admin;

      state.user = user;
      state.admin = admin;
    }
  },
  extraReducers: (builder) => {
    builder
      // ESCUCHA EL LOGOUT exitoso
      .addMatcher(
        userApi.endpoints.logOut.matchFulfilled,
        (state) => {
          state.user = null;
          state.admin = null;
        }
      )
      // ESCUCHA EL LOGIN exitoso 
      .addMatcher(
        userApi.endpoints.logIn.matchFulfilled,
        (state, action) => {
          // Tomo los datos del payload que envió el Back
          const user = action.payload; 
          const admin = user?.admin; 

          state.user = user;
          state.admin = admin;
        }
      );
  }
});

export const { restoreSession } = userSlice.actions;
export default userSlice.reducer;
