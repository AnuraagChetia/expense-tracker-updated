import React from "react";
import Profile from "../Components/Profile/Profile";
const Home = (props) => {
  return (
    <>
      <Profile isComplete={props.isComplete}></Profile>
    </>
  );
};
export default Home;
