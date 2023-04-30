import { createSlice } from "@reduxjs/toolkit";

const email = localStorage.getItem("email");
let updatedEmail;
if (email) {
  updatedEmail = email.replace(/[^a-zA-Z ]/g, "");
}

const initialExpenseState = {
  expenses: [],
};

const deleteExpenseHandler = async (id) => {
  console.log(id);
  await fetch(
    `https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${updatedEmail}/${id}.json`,
    { method: "DELETE", headers: { "Content-Type": "application/json" } }
  );
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      state.expenses = action.payload;
    },
    deleteExpense(state, action) {
      deleteExpenseHandler(action.payload);
      // state.expenses = fetch();
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
