import React from "react";
import Profile from "../Components/Profile/Profile";
import ExpenseForm from "../Components/Expense/ExpenseForm";
import ExpenseList from "../Components/Expense/ExpenseList";
const Home = (props) => {
  return (
    <>
      <Profile isComplete={props.isComplete}></Profile>
      <ExpenseForm></ExpenseForm>
      <ExpenseList></ExpenseList>
    </>
  );
};
export default Home;
