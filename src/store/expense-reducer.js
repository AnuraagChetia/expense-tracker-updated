import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const email = localStorage.getItem("email");
let updatedEmail;
if (email) {
  updatedEmail = email.replace(/[^a-zA-Z ]/g, "");
}

const initialExpenseState = {
  expenses: [],
  totalExpense: 0,
};

const deleteExpenseHandler = async (id) => {
  console.log(id);
  await fetch(
    `https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${updatedEmail}/${id}.json`,
    { method: "DELETE", headers: { "Content-Type": "application/json" } }
  );
};

export const fetchAllExpenses = createAsyncThunk("expenseFetch", () => {
  let expensesArr = [];
  let totalExpense = 0;
  return fetch(
    `https://movieapp-d6140-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${updatedEmail}.json`
  ).then((res) =>
    res.json().then((data) => {
      if (data != null) {
        const keys = Object.keys(data);
        keys.forEach((key) => {
          expensesArr.push({ ...data[key], key });
          totalExpense = totalExpense + parseInt(data[key].amount);
          // console.log(totalExpense);
        });
        // console.log("fetched");
      }
      // console.log(expensesArr);
      return { expensesArr, totalExpense };
    })
  );
});

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      console.log(action.payload);
      console.log(state);
      state.expenses = state.expenses.push(action.payload);
    },
    deleteExpense(state, action) {
      deleteExpenseHandler(action.payload);
      // state.expenses = fetch();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllExpenses.fulfilled, (state, action) => {
      state.expenses = action.payload.expensesArr;
      state.totalExpense = action.payload.totalExpense;
    });
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
