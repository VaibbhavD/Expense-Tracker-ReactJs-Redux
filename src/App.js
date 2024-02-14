import React, { useContext } from "react";
import "./App.css";
import SignUp from "./Component/Pages/SignUp";
import Login from "./Component/Pages/Login";
import Layout from "./Component/Pages/Layout";
import { Route, Routes } from "react-router-dom";
import Profile from "./Component/Pages/Profile";
import AuthContext from "./Store/Auth-Context";
import ForgetPass from "./Component/Pages/ForgetPass";
import ExpenseForm from "./Component/Expense/ExpenseForm";
import ExpensePage from "./Component/Expense/ExpensePage";

function App() {
  const context = useContext(AuthContext);

  return (
    <Layout>
      <main>
        <Routes>
          {!context.IsLoggedIn && <Route path="/login" element={<Login />} />}
          {context.IsLoggedIn && <Route path="/" element={<ExpensePage />} />}
          {context.IsLoggedIn && (
            <Route path="/profile" element={<Profile />} />
          )}
          {!context.IsLoggedIn && <Route path="/signup" element={<SignUp />} />}
          {!context.IsLoggedIn && (
            <Route path="/forget" element={<ForgetPass />} />
          )}
          {!context.IsLoggedIn && <Route path="*" element={<Login />} />}
        </Routes>
      </main>
    </Layout>
  );
}

export default App;
