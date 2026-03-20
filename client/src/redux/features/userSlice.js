"use client"
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  admin: null,
  user:null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      state.admin = user.admin
      state.user = user;
    },
    restoreSession: (state) => {
      const userCookie=Cookies.get('user')

      const user=userCookie?JSON.parse(userCookie):null;
      const admin = user?.admin

      state.user = user;
      state.admin = admin;
    },
    logout: (state) => {
      localStorage.clear()
      state.user = null;
      state.admin=null;
    }
  }
});

export const { setUser,restoreSession, logout} = userSlice.actions;
export default userSlice.reducer;