import { createSlice } from "@reduxjs/toolkit";

const InitialToken = localStorage.getItem("token");

const AuthState = {
  token: InitialToken,
  IsLoggedin: !!InitialToken,
  email: "",
  DarkMode: false,
  Premium: false,
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
    DarkMode: (state) => {
      state.DarkMode = !state.DarkMode;
      console.log(state.DarkMode);
    },
    PremiumEnable: (state) => {
      state.Premium = true;
    },
  },
});

export const AuthAction = AuthSlice.actions;
const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
