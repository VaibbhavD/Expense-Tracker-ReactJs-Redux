import React, { useRef } from "react";

const SignUp = () => {
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const RePasswordRef = useRef();

  const Submit = (e) => {
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

            EmailRef.current.value = "";
            PasswordRef.current.value = "";
            RePasswordRef.current.value = "";
          } else {
            res.json().then((data) => {
              alert(data.error.message);
            });
          }
        })
        .catch((error) => {
          console.log(error.massage);
        });
    } else {
      alert("Password Dosent Match !");
    }
  };

  return (
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={Submit}
          class="bg-white px-6 py-8 rounded shadow-md text-black w-full"
        >
          <h1 class="mb-8 text-3xl text-center">Sign up</h1>

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
        <div class="text-grey-dark mt-6">
          Already have an account?
          <a
            class="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};
export default SignUp;
