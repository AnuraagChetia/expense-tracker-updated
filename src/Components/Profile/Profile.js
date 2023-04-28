import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Profile.module.css";
const Profile = (props) => {
  return (
    <Container fluid className={classes.container}>
      Welcome to expense tracker
      {props.isComplete && (
        <Link className={classes.span} to="/user">
          Your Profile
        </Link>
      )}
      {!props.isComplete && (
        <span className={classes.span}>
          Your profile is incomplete.
          <Link to="/user">Complete Now</Link>
        </span>
      )}
    </Container>
  );
};
export default Profile;
