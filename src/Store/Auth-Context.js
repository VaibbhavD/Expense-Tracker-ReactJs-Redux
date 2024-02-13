import React from "react";

const AuthContext = React.createContext({
  token: "",
  IsLoggedIn: false,
  Login: (user) => {},
  SignUp: (user) => {},
});
export default AuthContext;
