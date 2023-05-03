import { expenseActions } from "./expense-reducer";

const email = localStorage.getItem("email");
let updatedEmail;
if (email) {
  updatedEmail = email.replace(/[^a-zA-Z ]/g, "");
}

export const sendCartData = (expense) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${updatedEmail}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            items: expense.data,
            totalQuantity: expense.totalExpense,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      alert(error.message);
    }
  };
};

export const fetchExpenseData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${updatedEmail}.json`
      );

      if (!response.ok) {
        throw new Error("Could not fetch expense data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      let expenseData = await fetchData();
      let expenses = [];
      let totalExpense = 0;
      if (expenseData !== null) {
        expenses = expenseData.expenses;
        totalExpense = expenseData.totalExpense;
      }

      dispatch(
        expenseActions.replaceExpense({
          expenses: expenses || [],
          totalExpense: totalExpense,
        })
      );
    } catch (error) {
      alert(error.message);
    }
  };
};
