import React from "react";
import ExpenseItem from "./ExpenseItem";
import { ListGroup } from "react-bootstrap";

const ExpenseList = (props) => {
  return (
    <div>
      <h2>Your expenses</h2>
      <ListGroup as="ol" numbered>
        {props.expenses.map((expense) => (
          <ExpenseItem
            amount={expense.amount}
            description={expense.description}
            category={expense.category}
            id={expense.key}
            key={expense.description}
          ></ExpenseItem>
        ))}
      </ListGroup>
    </div>
  );
};
export default ExpenseList;
