import React, { useContext, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Profile.module.css";
import AuthContext from "../../store/auth-context";
const Profile = (props) => {
  const authCtx = useContext(AuthContext);
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
      // let data;
      // if (res.ok) {
      //   data = await res.json();
      // }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
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
      {!authCtx.isVerified && (
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
