import React, { useEffect } from "react";
import Profile from "../Components/Profile/Profile";
import ExpenseForm from "../Components/Expense/ExpenseForm";
import ExpenseList from "../Components/Expense/ExpenseList";
import { useAsync } from "react-async";
import { useState } from "react";

const email = localStorage.getItem("email");
let updatedEmail;
if (email) {
  updatedEmail = email.replace(/[^a-zA-Z ]/g, "");
}
const fetchExpenses = async ({ updatedEmail }, { signal }) => {
  const res = await fetch(
    `https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${updatedEmail}.json`
  );
  if (!res.ok) throw new Error(res.status);
  return res.json();
};
let expensesArr = [];

const Home = (props) => {
  const [expenses, setExpenses] = useState([]);

  const { data, error } = useAsync({ promiseFn: fetchExpenses, updatedEmail });

  if (data != null) {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      expensesArr.push({ ...data[key], key });
    });
  }
  if (error) {
    alert(error.message);
  }
  useEffect(() => {
    setExpenses(expensesArr);
  }, []);

  return (
    <>
      <Profile isComplete={props.isComplete}></Profile>
      <ExpenseForm></ExpenseForm>
      <ExpenseList expenses={expenses}></ExpenseList>
    </>
  );
};
export default Home;
