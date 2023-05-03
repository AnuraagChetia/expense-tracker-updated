import React, { useEffect } from "react";
import Profile from "../Components/Profile/Profile";
import ExpenseForm from "../Components/Expense/ExpenseForm";
import ExpenseList from "../Components/Expense/ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExpenses } from "../store/expense-reducer";
import Premium from "../Components/Premium/Premium";
const Home = (props) => {
  const dispatch = useDispatch();
  const exp = useSelector((state) => {
    return state.expenses.expenses;
  });
  const totalExpense = useSelector((state) => {
    return state.expenses.totalExpense;
  });
  useEffect(() => {
    dispatch(fetchAllExpenses());
  }, [dispatch]);

  return (
    <>
      <Profile isComplete={props.isComplete}></Profile>
      {totalExpense > 10000 && <Premium></Premium>}
      <ExpenseForm></ExpenseForm>
      <ExpenseList expenses={exp}></ExpenseList>
    </>
  );
};
export default Home;
