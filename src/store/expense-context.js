import { createContext, useState } from "react";

const ExpenseContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  deleteExpense: () => {},
});
export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
    //   console.log(expense);
      return [...prevExpenses, expense];
    });
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
