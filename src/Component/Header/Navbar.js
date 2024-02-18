import React, { useContext } from "react";
import AuthContext from "../../Store/ContextApi/Auth-Context";
import { Link, useNavigate } from "react-router-dom";
import { AuthAction } from "../../Store/Redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const context = useContext(AuthContext);
  const dispatch = useDispatch();
  const IsLoggedIn = useSelector((state) => state.Auth.IsLoggedin);
  const navigate = useNavigate();

  const LogoutHadler = () => {
    localStorage.removeItem("token");
    dispatch(AuthAction.Logout());
    navigate("/login");
  };

  return (
    <div class="flex bg-gray-800 text-white top-0 py-3 flex-wrap justify-around bg-silver">
      <h1 class="text-lg font-semibold">
        <Link to={"/"}>Todo app</Link>
      </h1>
      <ul class="flex gap-[40px] text-m cursor-pointer">
        {!IsLoggedIn && <Link to={"/login"}>login</Link>}
        {!IsLoggedIn && <Link to={"/signup"}>SignUp</Link>}
        {IsLoggedIn && <Link to={"/profile"}>Profile</Link>}
        {IsLoggedIn && <button onClick={LogoutHadler}> Logout </button>}
      </ul>
    </div>
  );
};
export default Navbar;
