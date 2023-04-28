import React, { useContext } from "react";
import ExpenseContext from "../../store/expense-context";
import ExpenseItem from "./ExpenseItem";
import { ListGroup } from "react-bootstrap";
const ExpenseList = (props) => {
  const expenseCtx = useContext(ExpenseContext);
  return (
    <div>
      <h2>Your expenses</h2>
      <ListGroup as="ol" numbered>
        {expenseCtx.expenses.map((expense) => (
          <ExpenseItem
            amount={expense.amount}
            description={expense.description}
            category={expense.category}
            key={expense.description}
          ></ExpenseItem>
        ))}
      </ListGroup>
    </div>
  );
};
export default ExpenseList;
