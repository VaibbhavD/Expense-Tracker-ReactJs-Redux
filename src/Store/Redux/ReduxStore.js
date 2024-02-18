import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import ExpenseReducer from "./ExpenseSlice";

const store = configureStore({
  reducer: { Auth: AuthReducer, Expense: ExpenseReducer },
});

export default store;
