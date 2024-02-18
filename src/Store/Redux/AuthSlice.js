import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const InitialToken = localStorage.getItem("token");

const AuthState = {
  token: InitialToken,
  IsLoggedin: !!InitialToken,
  email: "",
};

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: AuthState,
  reducers: {
    Login: (state, action) => {
      state.IsLoggedin = true;
    },
    Logout: (state, action) => {
      state.IsLoggedin = false;
    },
    Settoken: (state, action) => {
      state.token = action.payload;
    },
    Setemail: (state, action) => {
      state.email = action.payload;
    },
  },
});

const store = configureStore({
  reducer: AuthSlice.reducer,
});

export const AuthAction = AuthSlice.actions;

export default store;
