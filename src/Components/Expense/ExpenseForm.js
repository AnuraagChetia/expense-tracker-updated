import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import Input from "../UI/Input";
import { useRef } from "react";
import ExpenseContext from "../../store/expense-context";
const ExpenseForm = (props) => {
  const expenseCtx = useContext(ExpenseContext);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const newExpense = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };
    expenseCtx.addExpense(newExpense);
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
