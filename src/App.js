import React, { useContext } from "react";
import "./App.css";
import SignUp from "./Component/Pages/SignUp";
import Login from "./Component/Pages/Login";
import Layout from "./Component/Pages/Layout";
import { Route, Router, Routes } from "react-router-dom";
import Profile from "./Component/Pages/Profile";
import AuthContext from "./Store/Auth-Context";

function App() {
  const context = useContext(AuthContext);

  return (
    <Layout>
      <main>
        <Routes>
          {context.IsLoggedIn && (
            <Route path="/profile" element={<Profile />} />
          )}
          {!context.IsLoggedIn && (
            <Route path="/login" element={<Login />} exact />
          )}
          {!context.IsLoggedIn && <Route path="/signup" element={<SignUp />} />}
          {!context.IsLoggedIn && <Route path="*" element={<Login />} />}
        </Routes>
      </main>
    </Layout>
  );
}

export default App;
