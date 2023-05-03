import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import expenseReducer from "./expense-reducer";
import themeReducer from "./theme-reducer";
const store = configureStore({
  reducer: { auth: authReducer, expenses: expenseReducer, theme: themeReducer },
});
export default store;
