import { useState } from "react";
import ExpenseContext from "./ExpenseContext";

const ExpenseCtxProvider = (props) => {
  const [Expenses, setExpenses] = useState([]);

  const AddExpense = (item) => {
    console.log(item);
    setExpenses((prev) => [...prev, item]);
  };

  const RemoveExpense = (item) => {
    Expenses.filter((it) => it.id !== item.id);
  };

  const context = {
    Expenses: Expenses,
    AddExpense: AddExpense,
    RemoveExpense: RemoveExpense,
  };

  return (
    <ExpenseContext.Provider value={context}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseCtxProvider;
