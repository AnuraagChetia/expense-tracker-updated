import { createContext, useCallback, useEffect, useState } from "react";

const ExpenseContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  deleteExpense: () => {},
});
export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const fetchData = useCallback(async () => {
    const res = await fetch(
      "https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
    );
    let expenses;
    if (res.ok) {
      expenses = await res.json();
    }

    Object.values(expenses).forEach((expense) =>
      setExpenses((prevExpenses) => {
        return [...prevExpenses, expense];
      })
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addExpenseHandler = async (expense) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, expense];
    });
    await fetch(
      "https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
      {
        method: "POST",
        body: JSON.stringify({
          amount: expense.amount,
          description: expense.description,
          category: expense.category,
        }),
      }
    );
  };
  const deleteExpenseHandler = () => {};
  const contextValue = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContext;
