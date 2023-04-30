import React, { useEffect, useRef } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import Input from "../UI/Input";
import { useSelector } from "react-redux";
const User = (props) => {
  const nameRef = useRef();
  const photoUrlRef = useRef();
  const isComplete = useSelector((state) => {
    return state.auth.isComplete;
  });
  useEffect(() => {
    if (isComplete) {
      nameRef.current.value = props.displayName;
      photoUrlRef.current.value = props.photoUrl;
    }
  }, [props.displayName, props.photoUrl, isComplete]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const enteredName = nameRef.current.value;
    const enterdPhotoUrl = photoUrlRef.current.value;
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD6M77g5hyGAAfUwgTZiK0AFwn3M1o5cpc",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: enteredName,
          photoUrl: enterdPhotoUrl,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    // let data;
    if (res.ok) {
      // data = await res.json();
      console.log("User completed profile");
    } else {
      let errorMessage = "Authentication failed!";
      throw new Error(errorMessage);
    }
  };
  return (
    <div className="  justify-content-center align-items-center">
      <Form
        className="rounded p-4 p-sm-3 border border-primary"
        style={{ margin: "3rem" }}
        onSubmit={formSubmitHandler}
      >
        <FormGroup>
          <h1>
            Contact Detail{" "}
            <Button variant="danger" style={{ float: "right" }}>
              Cancel
            </Button>
          </h1>
          <h3>Name:</h3>
          <Input label="Name" type="text" ref={nameRef}></Input>
          <h3>Profile Photo Url:</h3>
          <Input
            label="Profile Photo URL"
            type="text"
            ref={photoUrlRef}
          ></Input>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};
export default User;
