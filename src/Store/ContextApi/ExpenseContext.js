import React from "react";

const ExpenseContext = React.createContext({
  Expenses: [],
  AddExpense: () => {},
  RemoveExpense: () => {},
  GetData: () => {},
});
export default ExpenseContext;
