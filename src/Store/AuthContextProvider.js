import React, { useContext, useState } from "react";
import AuthContext from "./Auth-Context";

const AuthContextProvider = (props) => {
  const [token, settoken] = useState("");

  const IsLoggedIn = !!token;

  async function Login(user) {
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsZH3qrDtweiZTyYzmdE34My1E-wKNW0A",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res);
      if (res.ok === true) {
        res.json().then((data) => {
          console.log(data);
          localStorage.setItem("token", data.idToken);
          settoken(data.idToken);
          console.log("res");

          alert("Login Succesfull");
        });
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
    return IsLoggedIn;
  }

  const SignUp = (user) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsZH3qrDtweiZTyYzmdE34My1E-wKNW0A",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => console.log(data));
          alert("SignUp Succesfull");
        } else {
          res.json().then((data) => {
            alert(data.error.message);
          });
        }
      })
      .catch((error) => {
        console.log(error.massage);
      });
  };

  const context = {
    token: token,
    IsLoggedIn: IsLoggedIn,
    Login: Login,
    SignUp: SignUp,
  };
  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
