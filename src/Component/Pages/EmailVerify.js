import React, { useContext } from "react";
import { useSelector } from "react-redux";

const VerifyEmail = () => {
  const token = useSelector((state) => state.Auth.token);

  async function VerifyHandler() {
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAsZH3qrDtweiZTyYzmdE34My1E-wKNW0A",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then((data) => console.log(data))
            .then(alert("Your Email has Verify Succesfully !"));
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div className=" absolute mt-10 top-96 flex justify-center">
      <button
        type="button"
        onClick={VerifyHandler}
        className="p-2 rounded-md border-2 bg-blue-500 text-white border-blue-500"
      >
        Verify Email
      </button>
    </div>
  );
};
export default VerifyEmail;
