import React from "react";

const AuthContext = React.createContext({
  token: "",
  IsLoggedIn: false,
  Login: (user) => {},
  Logout: () => {},
  SignUp: (user) => {},
  UpdateProfile: () => {},
});
export default AuthContext;
