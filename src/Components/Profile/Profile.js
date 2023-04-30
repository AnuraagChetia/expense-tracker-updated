import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Profile.module.css";
import { useSelector } from "react-redux";
const Profile = (props) => {
  const isVerified = useSelector((state) => {
    return state.auth.isVerified;
  });
  const isComplete = useSelector((state) => {
    return state.auth.isComplete;
  });
  const verifyClickHandler = async () => {
    try {
      const idToken = localStorage.getItem("token");
      await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD6M77g5hyGAAfUwgTZiK0AFwn3M1o5cpc",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: idToken,
          }),
        }
      );
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Container fluid className={classes.container}>
        Welcome to expense tracker
        {isComplete && (
          <Link className={classes.span} to="/user">
            Your Profile
          </Link>
        )}
        {!isComplete && (
          <span className={classes.span}>
            Your profile is incomplete.
            <Link to="/user">Complete Now</Link>
          </span>
        )}
      </Container>
      {!isVerified && (
        <span className={classes.verified}>
          Your email is not verified.
          <Button variant="light" onClick={verifyClickHandler}>
            Click here to verify
          </Button>
        </span>
      )}
    </>
  );
};
export default Profile;
