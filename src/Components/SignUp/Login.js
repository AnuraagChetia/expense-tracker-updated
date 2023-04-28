import React, { useRef, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
const Login = (props) => {
  const switchModeHandler = () => {
    setisLogin((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
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
      // console.log(res);
      let data;

      if (res.ok) {
        data = await res.json();
        console.log(
          isLogin
            ? "User has successfully logged in"
            : "User has successfully signed up."
        );
      } else {
        let errorMessage = "Authentication failed!";
        throw new Error(errorMessage);
      }
      const token = data.idToken;
      // console.log(token);
      authCtx.login(token);
      // console.log(data);
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
      const user = userData.users;
      if (user[0].displayName && user[0].photoUrl) {
        props.profileCompleteCheck(user[0].displayName, user[0].photoUrl);
        localStorage.setItem("displayName", user[0].displayName);
        localStorage.setItem("photoUrl", user[0].photoUrl);
      }
      // console.log(user);
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
            >
              Forget Password?
            </Button>
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
