import React, { useRef } from "react";

const ForgetPass = () => {
  const EmailRef = useRef();

  const Submit = (e) => {
    e.preventDefault();

    const Email = EmailRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAsZH3qrDtweiZTyYzmdE34My1E-wKNW0A",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: Email,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        alert("Password Link Sent Your Email");
        EmailRef.current.value = "";
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  };

  return (
    <>
      <div class="bg-grey-lighter min-h-full flex flex-col mt-20">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <form
            onSubmit={Submit}
            class="bg-white px-6 py-8 rounded shadow-md text-black w-full"
          >
            <h3 class="mb-8 text-3xl text-center">Forget Your Password</h3>

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              ref={EmailRef}
              placeholder="Email"
              required
            />

            <button
              type="submit"
              class="w-full text-center py-3 rounded  bg-blue-600 hover:bg-blue-500 text-stone-50 font-bold hover:bg-green-dark focus:outline-none my-1"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ForgetPass;
