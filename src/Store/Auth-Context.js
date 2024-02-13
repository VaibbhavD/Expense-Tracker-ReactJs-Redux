import React from "react";

const AuthContext = React.createContext({
  token: "",
  IsLoggedIn: false,
  Profile: {},
  Login: (user) => {},
  SignUp: (user) => {},
  UpdateProfile: () => {},
});
export default AuthContext;
