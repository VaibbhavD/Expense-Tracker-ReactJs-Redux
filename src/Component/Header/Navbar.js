import React, { useContext } from "react";
import AuthContext from "../../Store/Auth-Context";

const Navbar = () => {
  const context = useContext(AuthContext);

  return (
    <div class="flex bg-gray-800 text-white top-0 py-3 flex-wrap justify-around bg-silver">
      <h1 class="text-lg font-semibold">Todo app</h1>
      <ul class="flex gap-[40px] text-m">
        <li>Home</li>
        <li>product</li>
        <li>about</li>
        <li>contact</li>
        <li>
          <button onClick={() => context.Logout()}> Logout </button>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
