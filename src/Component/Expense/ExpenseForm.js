import React, { useContext, useRef, useState } from "react";
import ExpenseContext from "../../Store/ContextApi/ExpenseContext";
import ShowExpense from "./ShowExpense";
import { ExpenseAction } from "../../Store/Redux/ExpenseSlice";
import { useDispatch, useSelector } from "react-redux";

const ExpenseForm = () => {
  const AmountRef = useRef();
  const CategeoryRef = useRef();
  const DescriptionRef = useRef();
  const [update, setupdate] = useState(false);
  const dispatch = useDispatch();
  const darkmode = useSelector((state) => state.Auth.DarkMode);

  const context = useContext(ExpenseContext);

  const SubmitEventmitHandler = async (e) => {
    e.preventDefault();

    const Amount = AmountRef.current.value;
    const Categeory = CategeoryRef.current.value;
    const Description = DescriptionRef.current.value;

    const Expense = {
      Amount: Amount,
      Categeory: Categeory,
      Description: Description,
      Id: Math.random(),
    };
    await fetch(
      "https://authentication-1db8c-default-rtdb.firebaseio.com/two.json",
      {
        method: "POST",
        body: JSON.stringify(Expense),
      }
    )
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then(
              (data) =>
                dispatch(
                  ExpenseAction.AddExpense({ ...Expense, value: data.name })
                ),
              alert("Added Successfully !")
            );
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      })
      .catch((error) => alert(error.message));
  };

  const [EditExp, setEdiExp] = useState({});

  const Edit = (expense) => {
    setEdiExp(expense);
    setupdate(true);
    AmountRef.current.value = expense.Amount;
    CategeoryRef.current.value = expense.Categeory;
    DescriptionRef.current.value = expense.Description;
  };
  console.log(EditExp);

  const UpdateHandler = () => {
    context.Expenses.map((item) => {
      if (item.Id === EditExp.Id) {
        item =
          ({ ...item },
          (item.Amount = AmountRef.current.value),
          (item.Categeory = CategeoryRef.current.value),
          (item.Description = DescriptionRef.current.value));
        setEdiExp(item);
      }
    });
    fetch(
      `https://authentication-1db8c-default-rtdb.firebaseio.com/two/${EditExp.value}.json`,
      {
        method: "PUT",
        body: JSON.stringify(EditExp),
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("Expese Edit SuccessFully ! ");
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      })
      .catch((error) => alert(error.message));

    AmountRef.current.value = "";
    CategeoryRef.current.value = "";
    DescriptionRef.current.value = "";
    setupdate(false);
  };

  const Cancel = () => {
    setupdate(false);
    AmountRef.current.value = "";
    CategeoryRef.current.value = "";
    DescriptionRef.current.value = "";
  };

  return (
    <div class={`  ${darkmode ? "bg-black " : "bg-stone-200 text-black"}`}>
      <div class="w-screen pt-4">
        <div class="w-full md:grid-cols-3 md:gap-6 text-center ">
          <h3 class="text-3xl font-medium leading-6 text-gray-900">
            Add Your Expenses
          </h3>
          <div class="w-1/2  md:mt-0 md:col-span-2 m-auto -mb-10 ">
            <form onSubmit={SubmitEventmitHandler} class=" mt-5">
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
                        for="Categeory"
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
                        for="Des"
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
                <div class="px-4 py-3  bg-gray-300 text-right sm:px-6">
                  {!update && (
                    <button
                      type="submit"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  )}
                  {update && (
                    <>
                      <button
                        type="button"
                        onClick={Cancel}
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lm font-medium rounded-md text-white bg-red-500 hover:bg-green-700-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={UpdateHandler}
                        class="mx-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lm font-medium rounded-md text-white bg-green-500 hover:bg-green-700-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Update
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ShowExpense Edit={Edit} />
    </div>
  );
};
export default ExpenseForm;
