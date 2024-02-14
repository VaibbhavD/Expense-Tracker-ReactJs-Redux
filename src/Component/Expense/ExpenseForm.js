import React, { useContext, useRef } from "react";
import ExpenseContext from "../../Store/ExpenseContext";
import ShowExpense from "./ShowExpense";

const ExpenseForm = () => {
  const AmountRef = useRef();
  const CategeoryRef = useRef();
  const DescriptionRef = useRef();

  const context = useContext(ExpenseContext);

  const SubmitEventmitHandler = (e) => {
    e.preventDefault();

    const Amount = AmountRef.current.value;
    const Categeory = CategeoryRef.current.value;
    const Description = DescriptionRef.current.value;

    const Expense = {
      Amount: Amount,
      Categeory: Categeory,
      Description: Description,
      id: Math.random(),
    };
    context.AddExpense(Expense);
  };

  return (
    <div class="w-screen mt-10 sm:mt-0 ">
      <div class="w-full md:grid-cols-3 md:gap-6 text-center mt-10">
        <h3 class="text-3xl font-medium leading-6 text-gray-900">
          Add Your Expenses
        </h3>
        <div class="w-1/2  md:mt-0 md:col-span-2 m-auto  ">
          <form onSubmit={SubmitEventmitHandler} class=" mt-10">
            <div class=" shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-gray-400 sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      for="Amount"
                      class="block text-lm font-medium text-gray-700"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      name="Amount"
                      id="Amount"
                      ref={AmountRef}
                      required
                      class="bg-gray-100 mt-3 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      for="state"
                      class="block text-lm font-medium text-gray-700"
                    >
                      Categeory
                    </label>
                    <select
                      type="text"
                      name="Categeory"
                      id="Categeory"
                      ref={CategeoryRef}
                      required
                      class="bg-gray-100 mt-3 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                      Categeory
                      <option value="food">Food</option>
                      <option value="Travel">Travel</option>
                      <option value="Bill">Bill</option>
                      <option value="Rent">Rent</option>
                    </select>
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2 ">
                    <label
                      for="postal_code"
                      class="block text-lm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="Des"
                      id="Des"
                      ref={DescriptionRef}
                      required
                      class="mt-3 p-1 bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div class="px-4 py-3  bg-gray-200 text-right sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
          <ShowExpense />
        </div>
      </div>
    </div>
  );
};
export default ExpenseForm;
