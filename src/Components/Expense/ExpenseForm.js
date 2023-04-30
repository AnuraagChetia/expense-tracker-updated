import React from "react";
import { Button, Form } from "react-bootstrap";
import Input from "../UI/Input";
import { useRef } from "react";
// import ExpenseContext from "../../store/expense-context";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense-reducer";
const ExpenseForm = (props) => {
  const dispatch = useDispatch();
  // const expenseCtx = useContext(ExpenseContext);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    let updatedEmail;
    if (email) {
      updatedEmail = email.replace(/[^a-zA-Z ]/g, "");
    }
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const newExpense = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };
    // expenseCtx.addExpense(newExpense);
    const res = await fetch(
      `https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${updatedEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify(newExpense),
      }
    );
    let data = await res.json();
    dispatch(expenseActions.addExpense({ ...newExpense, id: data.name }));
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };

  return (
    <div className=" text-center justify-content-center align-items-center">
      <Form
        className="rounded p-4 p-sm-3 border border-primary w-sm-25 "
        style={{ margin: "3rem" }}
        onSubmit={formSubmitHandler}
      >
        <h1 style={{ marginBottom: "20px" }}>Add Expense</h1>
        <Input label="Amount" type="number" ref={amountRef} id="amount"></Input>
        <Input
          label="Description"
          type="text"
          ref={descriptionRef}
          id="description"
        ></Input>
        <Form.Select
          aria-label="Default select example"
          ref={categoryRef}
          id="category"
        >
          <option value="">Category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary </option>
        </Form.Select>
        <Button variant="primary" style={{ margin: "20px" }} type="submit">
          Add new expense
        </Button>
      </Form>
    </div>
  );
};
export default ExpenseForm;
