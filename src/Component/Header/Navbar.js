import React, { useContext } from "react";
import AuthContext from "../../Store/Auth-Context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const context = useContext(AuthContext);

  return (
    <div class="flex bg-gray-800 text-white top-0 py-3 flex-wrap justify-around bg-silver">
      <h1 class="text-lg font-semibold">Todo app</h1>
      <ul class="flex gap-[40px] text-m cursor-pointer">
        {!context.IsLoggedIn && <Link to={"/login"}>login</Link>}
        {!context.IsLoggedIn && <Link to={"/signup"}>SignUp</Link>}
        {context.IsLoggedIn && <Link to={"/profile"}>Profile</Link>}
        {context.IsLoggedIn && (
          <Link to={"/login"}>
            <button onClick={() => context.Logout()}> Logout </button>
          </Link>
        )}
      </ul>
    </div>
  );
};
export default Navbar;
