import { useEffect, useState } from "react";
import ExpenseContext from "./ExpenseContext";

const ExpenseCtxProvider = (props) => {
  const [Expenses, setExpenses] = useState([]);

  async function AddExpense(item) {
    await fetch(
      "https://authentication-1db8c-default-rtdb.firebaseio.com/two.json",
      {
        method: "POST",
        body: JSON.stringify(item),
      }
    )
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then(
              (data) =>
                setExpenses((prev) => [...prev, { ...item, value: data.name }]),
              alert("Added Successfully !")
            );
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      })
      .catch((error) => alert(error.message));
    // setExpenses((prev) => [...prev, { ...item, value: keys }]);
  }

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    await fetch(
      "https://authentication-1db8c-default-rtdb.firebaseio.com/two.json"
    )
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data) {
              let temp = [];
              for (let key in data) {
                temp = [...temp, { ...data[key], value: key }];
              }
              setExpenses(temp);
            }
          });
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      })
      .catch((error) => console(error.message));
  };

  const RemoveExpense = (item) => {
    fetch(
      `https://authentication-1db8c-default-rtdb.firebaseio.com/two/${item.value}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          // alert("Expese Delete SuccessFully ! ");
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      })
      .catch((error) => alert(error.message));
    let temp = Expenses.filter((it) => it.Id !== item.Id);
    setExpenses(temp);
  };

  const context = {
    Expenses: Expenses,
    AddExpense: AddExpense,
    RemoveExpense: RemoveExpense,
    GetData: GetData,
  };

  return (
    <ExpenseContext.Provider value={context}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseCtxProvider;
