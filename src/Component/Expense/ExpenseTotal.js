import React from "react";
import { useSelector } from "react-redux";

const ExpenseTotal = () => {
  const Expenses = useSelector((state) => state.Expense.Expenses);

  const total = Expenses.reduce((sum, arr) => sum + Number(arr.Amount), 0);

  return (
    <p className="w-1/2 h-12 text-right text-lg font-bold flex justify-center space-x-2 px-4 bg-gray-100">
      <p className="flex justify-center m-auto">
        <button
          type="button"
          className="text-center"
          class={`${
            total > 10000
              ? "inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-lm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
              : "inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-lm font-medium rounded-md text-white bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
          }`}
        >
          Premium
        </button>

        <p className="ml-2 text-sm m-auto">
          (Access While Expenses Over Rs.10000)
        </p>
      </p>
      <p className="text-center m-auto mr-10 ">Total Amount is Rs. {total}</p>
    </p>
  );
};
export default ExpenseTotal;
