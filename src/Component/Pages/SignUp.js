import React, { useContext, useRef } from "react";
import AuthContext from "../../Store/ContextApi/Auth-Context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUp = () => {
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const RePasswordRef = useRef();
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const darkmode = useSelector((state) => state.Auth.DarkMode);

  const Submit = async (e) => {
    e.preventDefault();
    console.log("hi");

    const Email = EmailRef.current.value;
    const Password = PasswordRef.current.value;
    const RePassword = RePasswordRef.current.value;

    if (Password === RePassword) {
      const user = {
        email: Email,
        password: Password,
        returnSecureToken: true,
      };
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

      EmailRef.current.value = "";
      PasswordRef.current.value = "";
      RePasswordRef.current.value = "";
    } else {
      alert("Password Dosent Match !");
    }
  };

  return (
    <div
      className={`w-screen min-h-svh ${darkmode ? "bg-black" : "bg-stone-200"}`}
    >
      <div class="bg-grey-lighter flex flex-col ">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-20">
          <form
            onSubmit={Submit}
            class={`bg-white px-6 py-8 rounded shadow-md text-black w-full ${
              darkmode ? "bg-stone-100" : ""
            }`}
          >
            <h1 class="mb-8 text-3xl text-center font-bold">Sign up</h1>

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              ref={EmailRef}
              placeholder="Email"
              required
            />

            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              ref={PasswordRef}
              placeholder="Password"
              min={7}
              required
            />
            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              ref={RePasswordRef}
              placeholder="Confirm Password"
              min={7}
              required
            />

            <button
              type="submit"
              class="w-full text-center py-3 rounded  bg-blue-600 hover:bg-blue-500 text-stone-50 font-bold hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>
          </form>
          <div class={`text-grey-dark mt-6 ${darkmode ? "text-stone-50" : ""}`}>
            Already have an account?
            <Link
              class="no-underline border-b border-blue text-blue"
              to={"/login"}
            >
              Log in
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
