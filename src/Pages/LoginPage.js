import React from "react";
import Login from "../Components/SignUp/Login";
const LoginPage = (props) => {
  return <Login profileCompleteCheck={props.profileCompleteCheck}></Login>;
};
export default LoginPage;
