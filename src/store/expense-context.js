import { createContext, useCallback, useEffect, useState } from "react";

const ExpenseContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  deleteExpense: () => {},
  loginFetch: () => {},
});
const email = localStorage.getItem("email");
let updatedEmail;
if (email) {
  updatedEmail = email.replace(/[^a-zA-Z ]/g, "");
}
export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const fetchData = useCallback(async () => {
    const res = await fetch(
      `https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${updatedEmail}.json`
    );
    let expenses;
    if (res.ok) {
      expenses = await res.json();
    }
    if (expenses != null) {
      const keys = Object.keys(expenses);

      keys.forEach((key) => {
        setExpenses((prevExpense) => {
          return [...prevExpense, { ...expenses[key], id: key }];
        });
      });
    } else {
      setExpenses([]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addExpenseHandler = async (expense) => {
    // console.log({ ...expense, name: "hello" });

    console.log(updatedEmail);
    const res = await fetch(
      `https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${updatedEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          amount: expense.amount,
          description: expense.description,
          category: expense.category,
        }),
      }
    );
    console.log(res);
    let data = await res.json();
    console.log(data);
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { ...expense, id: data.name }];
    });
    console.log(expenses);
  };
  const deleteExpenseHandler = async (id) => {
    console.log(id);
    await fetch(
      `https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,
      { method: "DELETE", headers: { "Content-Type": "application/json" } }
    );
    fetchData();
  };
  const loginFetchHandler = (email) => {
    fetchData(email);
  };
  const contextValue = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    loginFetch: loginFetchHandler,
  };
  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContext;
