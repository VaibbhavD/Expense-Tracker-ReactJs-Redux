import { createSlice } from "@reduxjs/toolkit";

const InitialExpense = { Expenses: [] };

const ExpenseSlice = createSlice({
  name: "Expensee",
  initialState: InitialExpense,
  reducers: {
    AddExpense: (state, action) => {
      state.Expenses = [...state.Expenses, action.payload];
    },
    RemoveExpense: (state, action) => {
      state.Expenses = action.payload;
    },
    GetData: (state, action) => {
      state.Expenses = action.payload;
    },
  },
});
export const ExpenseAction = ExpenseSlice.actions;

const ExpenseReducer = ExpenseSlice.reducer;
export default ExpenseReducer;
