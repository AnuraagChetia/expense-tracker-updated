import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenseList",
  initialState: {
    expenses: [],
    totalExpense: 0,
  },
  reducers: {
    replaceExpense(state, action) {
      state.expenses = action.payload.expenses;
      state.totalExpense = action.payload.totalExpense;
    },
    addExpense(state, action) {
      const newExpense = {
        amount: parseInt(action.payload.amount),
        category: action.payload.category,
        description: action.payload.description,
      };
      state.expenses.push(newExpense);
      state.totalExpense = state.totalExpense + parseInt(action.payload.amount);
    },
    removeExpense(state, action) {
      state.expenses = state.expenses.filter((item) => {
        return item.description !== action.payload;
      });
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
