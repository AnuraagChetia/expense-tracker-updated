import React, { useContext } from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import ExpenseContext from "../../store/expense-context";
const ExpenseItem = (props) => {
  const expenseCtx = useContext(ExpenseContext);
  const deleteHandler = () => {
    expenseCtx.deleteExpense(props.id);
  };
  const editHandler = () => {
    const amount = document.getElementById("amount");
    const description = document.getElementById("description");
    const category = document.getElementById("category");
    amount.value = props.amount;
    description.value = props.description;
    category.value = props.category;
    deleteHandler();
    // props.refs.amountRef.current.value = props.amount;
  };
  return (
    <ListGroupItem
      as="li"
      variant="info"
      action
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold"> ${props.amount}</div>
        {props.description} {props.category}
      </div>
      <Button variant="warning" className="mx-1" onClick={editHandler}>
        Edit
      </Button>
      <Button variant="danger" className="mx-1" onClick={deleteHandler}>
        Delete
      </Button>
    </ListGroupItem>
  );
};
export default ExpenseItem;
