import React, { useContext } from "react";
import "./App.css";
import SignUp from "./Component/Pages/SignUp";
import Login from "./Component/Pages/Login";
import Layout from "./Component/Pages/Layout";
import { Route, Routes } from "react-router-dom";
import Profile from "./Component/Pages/Profile";
import ForgetPass from "./Component/Pages/ForgetPass";
import ExpensePage from "./Component/Expense/ExpensePage";
import { useSelector } from "react-redux";

function App() {
  const IsLoggedIn = useSelector((state) => state.IsLoggedin);

  return (
    <Layout>
      <main>
        <Routes>
          {!IsLoggedIn && <Route path="/login" element={<Login />} />}
          {IsLoggedIn && <Route path="/" element={<ExpensePage />} />}
          {IsLoggedIn && <Route path="/profile" element={<Profile />} />}
          {!IsLoggedIn && <Route path="/signup" element={<SignUp />} />}
          {!IsLoggedIn && <Route path="/forget" element={<ForgetPass />} />}
          {!IsLoggedIn && <Route path="*" element={<Login />} />}
        </Routes>
      </main>
    </Layout>
  );
}

export default App;
