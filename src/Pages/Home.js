import React, { useEffect } from "react";
import Profile from "../Components/Profile/Profile";
import ExpenseForm from "../Components/Expense/ExpenseForm";
import ExpenseList from "../Components/Expense/ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import Premium from "../Components/Premium/Premium";
import { fetchExpenseData } from "../store/expense-actions";
import { Button } from "react-bootstrap";
let isInitial = true;

const email = localStorage.getItem("email");
let updatedEmail;
if (email) {
  updatedEmail = email.replace(/[^a-zA-Z ]/g, "");
}
let expensesData = [];

const Home = (props) => {
  const dispatch = useDispatch();
  const exp = useSelector((state) => state.expenses);
  const totalExpense = useSelector((state) => state.expenses.totalExpense);
  const changed = useSelector((state) => state.expenses.changed);

  useEffect(() => {
    dispatch(fetchExpenseData());
  }, [dispatch]);

  useEffect(() => {
    const sendCartData = async () => {
      const response = await fetch(
        `https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${updatedEmail}.json`,
        {
          method: "PUT",
          body: JSON.stringify(exp),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      alert(error.message);
    });
  }, [exp, dispatch, changed]);

  const downloadExpenses = async () => {
    // console.log(data.payload.expensesArr);
    exp.expenses.forEach((item) => {
      expensesData.push([item.amount, item.category, item.description]);
    });
    const creatingCSV = expensesData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([creatingCSV]);
    const csvUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", csvUrl);
    link.setAttribute("download", "myExpenses.csv");
    link.click();
  };

  return (
    <>
      <Profile isComplete={props.isComplete}></Profile>

      <Button className="m-4" onClick={downloadExpenses}>
        Download expenses
      </Button>

      {totalExpense > 10000 && <Premium></Premium>}

      <ExpenseForm></ExpenseForm>

      <ExpenseList></ExpenseList>
    </>
  );
};
export default Home;
