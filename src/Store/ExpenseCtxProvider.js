import { useEffect, useState } from "react";
import ExpenseContext from "./ExpenseContext";

const ExpenseCtxProvider = (props) => {
  const [Expenses, setExpenses] = useState([]);
  const [ex, setex] = useState({});

  const AddExpense = (item) => {
    setExpenses((prev) => [...prev, item]);
    fetch(
      "https://authentication-1db8c-default-rtdb.firebaseio.com/expens.json",
      {
        method: "POST",
        body: JSON.stringify(item),
      }
    )
      .then((res) => {
        if (res.ok) {
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    fetch(
      "https://authentication-1db8c-default-rtdb.firebaseio.com/expens.json"
    )
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data) {
              setExpenses(Object.values(data));
            }
          });
        } else {
          res.json().then((data) => {
            for (const key in data) {
              setex(Object.entries(data[key]));
            }
          });
        }
      })
      .catch((error) => console(error.message));
  }, []);

  console.log(ex);

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
