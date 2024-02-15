import React, { useContext, useEffect } from "react";
import ExpenseContext from "../../Store/ExpenseContext";

const ShowExpense = (props) => {
  const context = useContext(ExpenseContext);
  useEffect(() => {
    context.GetData();
  }, []);
  console.log(context.Expenses);

  const RemoveHandler = (expense) => {
    context.RemoveExpense(expense);
  };

  return (
    <>
      <div class="w-full h-full flex justify-center  pt-8">
        <div class="w-1/2  p-3 bg-gray-100">
          <div class="text-center ">
            <h1 class="text-3xl font-medium">Expenses</h1>
          </div>
          <div class="mt-8 w-full text-center ">
            {context.Expenses.length === 0 && <h1> No Expense </h1>}
            <ul>
              {context.Expenses.map((expense) => (
                <li class="p-2 rounded-lg w-full bg-gray-300 mb-2">
                  <div class="flex align-middle flex-row justify-between">
                    <div class="p-2">{expense.Categeory}</div>
                    <div class="p-2">
                      <p class="text-lg  ">{expense.Description}</p>
                    </div>
                    <div class="p-2">
                      <p class="text-lg  ">Rs.{expense.Amount}</p>
                    </div>
                    <button class="flex text-red-500 border-2 border-red-500 p-2 rounded-lg">
                      <button onClick={() => RemoveHandler(expense)}>
                        Remove
                      </button>
                    </button>
                    <button class="flex text-red-500 border-2 border-red-500 p-2 rounded-lg">
                      <button onClick={() => props.Edit(expense)}>Edit</button>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShowExpense;
