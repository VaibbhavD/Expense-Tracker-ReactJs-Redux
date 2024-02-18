import React, { useContext } from "react";
import AuthContext from "../../Store/ContextApi/Auth-Context";
import { Link, useNavigate } from "react-router-dom";
import { AuthAction } from "../../Store/Redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import DarkModeBtn from "./DarkModeBtn";

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
    <div class="flex bg-gray-600 text-white top-0 py-3  bg-silver">
      <h1 class="text-lg font-semibold text-center w-1/2">
        <Link to={"/"}>Expense TracKeR</Link>
      </h1>
      <ul class="flex gap-[40px] text-lm font-bold cursor-pointer justify-end w-1/2 mr-12 text-base">
        <DarkModeBtn />
        {!IsLoggedIn && <Link to={"/login"}>Login</Link>}
        {!IsLoggedIn && <Link to={"/signup"}>SignUp</Link>}
        {IsLoggedIn && <Link to={"/profile"}>Profile</Link>}
        {IsLoggedIn && <Link to={"/"}>Dashboard</Link>}
        {IsLoggedIn && <button onClick={LogoutHadler}> Logout </button>}
      </ul>
    </div>
  );
};
export default Navbar;
