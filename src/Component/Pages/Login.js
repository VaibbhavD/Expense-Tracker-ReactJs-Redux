import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../Store/Auth-Context";
import Profile from "./Profile";

const Login = () => {
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const context = useContext(AuthContext);

  const Submit = (e) => {
    e.preventDefault();
    console.log("hi");

    const Email = EmailRef.current.value;
    const Password = PasswordRef.current.value;

    const user = {
      email: Email,
      password: Password,
      returnSecureToken: false,
    };
    const res = context.Login(user);
    EmailRef.current.value = "";
    PasswordRef.current.value = "";
  };

  return (
    <>
      {context.IsLoggedIn && <Profile />}
      <div class="bg-grey-lighter min-h-screen flex flex-col">
        {!context.IsLoggedIn && (
          <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <form
              onSubmit={Submit}
              class="bg-white px-6 py-8 rounded shadow-md text-black w-full"
            >
              <h1 class="mb-8 text-3xl text-center">Login</h1>

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

              <button
                type="submit"
                class="w-full text-center py-3 rounded  bg-blue-600 hover:bg-blue-500 text-stone-50 font-bold hover:bg-green-dark focus:outline-none my-1"
              >
                Login
              </button>
            </form>
            <div class="text-grey-dark mt-6">
              Don't have a Account?
              <a
                class="no-underline border-b border-blue text-blue"
                href="../login/"
              >
                Sign Up
              </a>
              .
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Login;
