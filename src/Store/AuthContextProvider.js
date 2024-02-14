import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./Auth-Context";
import { useNavigate } from "react-router-dom";
import ExpenseCtxProvider from "./ExpenseCtxProvider";

const AuthContextProvider = (props) => {
  const InitialToken = localStorage.getItem("token");
  const [token, settoken] = useState(InitialToken);
  const [Profile, setProfile] = useState({});

  const navigate = useNavigate();

  const IsLoggedIn = !!token;
  console.log(IsLoggedIn);

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
          alert("Login Succesfull");
          navigate("/profile");
        });
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
    return IsLoggedIn;
  }

  async function SignUp(user) {
    await fetch(
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
          navigate("/login");
        } else {
          res.json().then((data) => {
            alert(data.error.message);
          });
        }
      })
      .catch((error) => {
        console.log(error.massage);
      });
  }

  const Logout = () => {
    localStorage.removeItem("token");
    settoken(null);
  };

  async function UpdateProfile(Name, Url) {
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAsZH3qrDtweiZTyYzmdE34My1E-wKNW0A",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: Name,
          photoUrl: Url,
          // deleteAttribute: ["DISPLAY_NAME", "PHOTO_URL"],
          returnSecureToken: false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => console.log(data));
          alert("Update SuccesFully");
        } else {
          res.json().then((data) => {
            alert(data.error.message);
          });
        }
      })
      .catch((error) => {
        console.log(error.massage);
      });
  }

  // useEffect(() => {
  //   ProfileData();
  // }, []);

  // const ProfileData = async function () {
  //   await fetch(
  //     "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAsZH3qrDtweiZTyYzmdE34My1E-wKNW0A",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         idToken: token,
  //       }),
  //     }
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         res.json().then((data) => {
  //           console.log(data.users);
  //           console.log(data);
  //           setProfile(data.users[0]);
  //         });
  //       } else {
  //         res.json().then((data) => {
  //           // alert(data.error.message);
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.massage);
  //     });
  // };

  const context = {
    token: token,
    IsLoggedIn: IsLoggedIn,
    Profile: Profile,
    Login: Login,
    Logout: Logout,
    SignUp: SignUp,
    UpdateProfile: UpdateProfile,
  };
  return (
    <AuthContext.Provider value={context}>
      <ExpenseCtxProvider>{props.children}</ExpenseCtxProvider>
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
