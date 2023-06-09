import React, { useRef, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-reducer";
// import { fetchAllExpenses } from "../../store/expense-reducer";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [forgetMode, setForgetMode] = useState(false);

  const switchModeHandler = () => {
    setisLogin((prevState) => !prevState);
    setForgetMode(false);
  };
  const switchToForgetPassword = () => {
    setisLogin((prevState) => !prevState);
    setForgetMode((prevState) => !prevState);
  };

  const verifyCheck = async (token) => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD6M77g5hyGAAfUwgTZiK0AFwn3M1o5cpc",
      { method: "POST", body: JSON.stringify({ idToken: token }) }
    );
    let data;
    if (res.ok) {
      data = await res.json();
      if (data.users[0].emailVerified) {
        dispatch(authActions.verify());
        localStorage.setItem("verify", true);
      }
    }
  };

  const forgetPasswordHandler = async () => {
    const enteredEmail = emailInputRef.current.value;
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD6M77g5hyGAAfUwgTZiK0AFwn3M1o5cpc",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      let enteredConfirmPassword = "";
      if (!isLogin) {
        enteredConfirmPassword = confirmPasswordInputRef.current.value;
      }

      let url;

      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6M77g5hyGAAfUwgTZiK0AFwn3M1o5cpc";
      } else if (
        enteredConfirmPassword &&
        enteredConfirmPassword === enteredPassword
      ) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6M77g5hyGAAfUwgTZiK0AFwn3M1o5cpc";
      } else {
        alert("Password does not match");
      }

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data;

      if (res.ok) {
        data = await res.json();
        localStorage.setItem("email", enteredEmail);
      } else {
        let errorMessage = "Authentication failed!";
        throw new Error(errorMessage);
      }
      const token = data.idToken;
      verifyCheck(token);

      dispatch(authActions.login(token));
      navigate("/home");

      const profileRes = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD6M77g5hyGAAfUwgTZiK0AFwn3M1o5cpc",
        {
          method: "POST",
          body: JSON.stringify({ idToken: token }),
          headers: { "Content-type": "application/json" },
        }
      );
      let userData;
      if (profileRes.ok) {
        userData = await profileRes.json();
      }
      const user = userData.users[0];
      if (user.displayName && user.photoUrl) {
        dispatch(
          authActions.setData({
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoUrl,
          })
        );
        dispatch(authActions.complete());
        props.profileCompleteCheck(user.displayName, user.photoUrl);
        localStorage.setItem("displayName", user.displayName);
        localStorage.setItem("photoUrl", user.photoUrl);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className=" d-flex justify-content-center align-items-center">
      <Form
        className="rounded p-4 p-sm-3 border border-primary w-sm-25"
        style={{ margin: "3rem" }}
        onSubmit={formSubmitHandler}
      >
        <FormGroup>
          {!forgetMode && (
            <>
              <h1>{isLogin ? "Login" : "Signup"}</h1>
              <Input
                label="Email address"
                type="email"
                placeholder="name@example.com"
                text="We will never share your email with anyone else."
                ref={emailInputRef}
              ></Input>

              <Input
                label="Password"
                type="password"
                placeholder="Password"
                ref={passwordInputRef}
              ></Input>
              {!isLogin && (
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Password"
                  ref={confirmPasswordInputRef}
                ></Input>
              )}
              <Button
                variant="primary"
                type="submit"
                className="col-md-12 text-center"
              >
                {isLogin ? "Login" : "Signup"}
              </Button>
              {isLogin && (
                <Button
                  type="button"
                  variant="danger"
                  className="col-md-12 text-center mt-2"
                  onClick={switchToForgetPassword}
                >
                  Forget Password?
                </Button>
              )}
            </>
          )}

          {forgetMode && (
            <>
              <h3>Enter the email with which you have registered</h3>
              <Input
                label="Enter email"
                type="email"
                placeholder="name@example.com"
                ref={emailInputRef}
              />
              <Button
                variant="secondary"
                type="button"
                className="col-md-12 text-center"
                onClick={forgetPasswordHandler}
              >
                Send link
              </Button>
            </>
          )}

          <Button
            className="col-md-12 text-center mt-2"
            variant="warning"
            type="button"
            onClick={switchModeHandler}
          >
            {isLogin ? "Create new account" : " Have an account? Login"}
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};
export default Login;
