import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../store/theme-reducer";
const Premium = (props) => {
  const dispatch = useDispatch();
  const [premium, setPremium] = useState(false);
  const dark = useSelector((state) => state.theme.darkTheme);
  const activatePremiumHandler = () => {
    setPremium(true);
  };
  const themeToggleHandler = () => {
    dispatch(themeActions.toggleTheme());
  };


  
  return (
    <>
      {!premium && (
        <Button className="m-4" onClick={activatePremiumHandler}>
          Activate Premium
        </Button>
      )}
      {premium && (
        <>
          <Button className="m-4" onClick={themeToggleHandler}>
            {!dark ? "Dark" : "Light"}
          </Button>
        </>
      )}
      
    </>
  );
};
export default Premium;
