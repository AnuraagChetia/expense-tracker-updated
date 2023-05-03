import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense-reducer";
const ExpenseItem = (props) => {
  const dispatch = useDispatch();
  const deleteHandler = (e) => {
    dispatch(expenseActions.removeExpense(props.description));
  };

  const editHandler = (e) => {
    const amount = document.getElementById("amount");
    const description = document.getElementById("description");
    const category = document.getElementById("category");
    amount.value = props.amount;
    description.value = props.description;
    category.value = props.category;
    deleteHandler(e);
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
