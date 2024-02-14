import React from "react";

const ExpenseContext = React.createContext({
  Expenses: [],
  AddExpense: () => {},
  RemoveExpense: () => {},
});
export default ExpenseContext;
