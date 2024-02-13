import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../Store/Auth-Context";
import VerifyEmail from "./EmailVerify";

const Profile = () => {
  const [enable, setenable] = useState(false);
  const context = useContext(AuthContext);
  const NameRef = useRef();
  const UrlRef = useRef();

  console.log();

  const Showprofile = () => {
    setenable((prev) => !prev);
  };

  const SubmitHandler = () => {
    const Name = NameRef.current.value;
    const Url = UrlRef.current.value;

    context.UpdateProfile(Name, Url);
  };

  return (
    <div>
      <div className=" h-4 flex p-3">
        <h3 className="w-1/2 text-left">Welcome For visit Our WebSite</h3>
        <p className="w-1/2 text-right">
          {context.Profile.displayName && (
            <b
              className="cursor-pointer hover:text-red-500"
              onClick={Showprofile}
            >
              Profile
            </b>
          )}
          {!context.Profile.displayName && !context.Profile.photoUrl && (
            <>
              Your Profile is incomplete,
              <b
                className="cursor-pointer hover:text-red-500"
                onClick={Showprofile}
              >
                Complete Now
              </b>
            </>
          )}
        </p>
      </div>
      {!enable && <VerifyEmail />}
      {enable && (
        <main className=" w-1/2 flex justify-center m-auto mt-10 p-5">
          <div className="w-full border-2 p-5">
            <div className="flex justify-center w-full p-3 ">
              <p className="w-1/2 text-left">Contact Details</p>
              <div className="w-1/2 flex justify-end">
                <button className="p-2 rounded-md border-2 border-red-600">
                  Cancel
                </button>
              </div>
            </div>
            <form className="p-5 flex gap-10">
              <div className="flex gap-3">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  className="border-2 border-black"
                  placeholder={context.Profile.displayName}
                  ref={NameRef}
                  required
                />
              </div>
              <div className="flex gap-3">
                <label htmlFor="name">Profile Photo</label>
                <input
                  type="url"
                  className="border-2 border-black"
                  placeholder={context.Profile.photoUrl}
                  ref={UrlRef}
                  required
                />
              </div>
            </form>
            <div className="p-5">
              <button
                className="bg-red-400 p-2 border-white rounded-md"
                onClick={SubmitHandler}
              >
                Update
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
export default Profile;
