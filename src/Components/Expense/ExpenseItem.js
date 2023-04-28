import React from "react";
import { ListGroupItem } from "react-bootstrap";
const ExpenseItem = (props) => {
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
    </ListGroupItem>
  );
};
export default ExpenseItem;
