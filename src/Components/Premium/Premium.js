import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../store/theme-reducer";
import { fetchAllExpenses } from "../../store/expense-reducer";
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

  let expensesData = [];
  const downloadExpenses = async () => {
    const data = await dispatch(fetchAllExpenses());
    // console.log(data.payload.expensesArr);
    data.payload.expensesArr.forEach((item) => {
      expensesData.push([item.amount, item.category, item.description]);
    });
    const creatingCSV = expensesData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([creatingCSV]);
    const csvUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", csvUrl);
    link.setAttribute("download", "myExpenses.csv");
    link.click();
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
      <Button onClick={downloadExpenses}>Download expenses</Button>
    </>
  );
};
export default Premium;
