import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../Store/Auth-Context";
import VerifyEmail from "./EmailVerify";

const Profile = () => {
  const [enable, setenable] = useState(false);
  const [profile, setprofile] = useState({});
  const context = useContext(AuthContext);
  const NameRef = useRef();
  const UrlRef = useRef();

  useEffect(() => {
    ProfileData();
  }, []);

  const ProfileData = async function () {
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAsZH3qrDtweiZTyYzmdE34My1E-wKNW0A",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: context.token,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data.users);
            console.log(data);
            setprofile(data.users[0]);
          });
        } else {
          res.json().then((data) => {
            // alert(data.error.message);
          });
        }
      })
      .catch((error) => {
        console.log(error.massage);
      });
  };

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
          {profile.displayName && (
            <b
              className="cursor-pointer hover:text-red-500"
              onClick={Showprofile}
            >
              Profile
            </b>
          )}
          {!profile.displayName && !profile.photoUrl && (
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
      <main className=" w-1/2 flex justify-center m-auto mt-10 p-5">
        <div className="w-full border-2 p-5">
          <div className="flex justify-center w-full p-3 ">
            <h3 className="w-1/2 text-left">Contact Details</h3>
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
                className="border-2 border-black rounded-md"
                placeholder={profile.displayName}
                ref={NameRef}
                required
              />
            </div>
            <div className="flex gap-3">
              <label htmlFor="name">Profile Photo</label>
              <input
                type="url"
                className="border-2 border-black rounded-md"
                placeholder={profile.photoUrl}
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
        <VerifyEmail />
      </main>
    </div>
  );
};
export default Profile;
