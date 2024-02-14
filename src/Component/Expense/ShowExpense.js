import React, { useContext } from "react";
import ExpenseContext from "../../Store/ExpenseContext";

const ShowExpense = () => {
  const context = useContext(ExpenseContext);
  console.log(context.Expenses);

  return (
    <>
      <ul>
        {context.Expenses.map((expense) => {
          <li>
            {expense.Amount} {expense.Categeory} {expense.Description}
          </li>;
        })}
      </ul>
    </>
  );
};
export default ShowExpense;
