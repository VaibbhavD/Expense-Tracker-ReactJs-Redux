import React, { useContext, useEffect } from "react";
import ExpenseTotal from "./ExpenseTotal";
import ExpenseContext from "../../Store/ContextApi/ExpenseContext";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseAction } from "../../Store/Redux/ExpenseSlice";

const ShowExpense = (props) => {
  const context = useContext(ExpenseContext);
  const Expenses = useSelector((state) => state.Expense.Expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://authentication-1db8c-default-rtdb.firebaseio.com/two.json")
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data) {
              let temp = [];
              for (let key in data) {
                temp = [...temp, { ...data[key], value: key }];
              }
              dispatch(ExpenseAction.GetData(temp));
            }
          });
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      })
      .catch((error) => console(error.message));
  }, []);

  const RemoveHandler = (expense) => {
    fetch(
      `https://authentication-1db8c-default-rtdb.firebaseio.com/two/${expense.value}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("Expese Delete SuccessFully ! ");
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      })
      .catch((error) => alert(error.message));

    let temp = Expenses.filter((it) => it.Id !== expense.Id);
    dispatch(ExpenseAction.RemoveExpense(temp));
  };

  return (
    <>
      <div class="w-full h-full flex justify-center pt-8">
        <div class="w-1/2 h-1/2 p-3 bg-gray-100">
          <div class="text-center ">
            <h1 class="text-3xl font-medium">Expenses</h1>
          </div>
          <div class="mt-4 w-full text-center h-80 overflow-auto ">
            {Expenses === 0 && <h1> No Expense </h1>}
            <ul>
              {Expenses.map((expense) => (
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
      <div className="h-full w-full flex justify-center ">
        <ExpenseTotal />
      </div>
    </>
  );
};
export default ShowExpense;
