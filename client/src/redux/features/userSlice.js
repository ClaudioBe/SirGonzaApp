"use client"
import { createSlice } from '@reduxjs/toolkit';

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

      //para que persistan los datos en el local storage del usuario
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("admin", JSON.stringify(user.admin));
    },
    restoreSession: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const admin = JSON.parse(localStorage.getItem("admin"));

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