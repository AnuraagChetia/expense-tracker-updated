import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  isComplete: false,
  isVerified: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    verify(state) {
      state.isVerified = true;
    },
    complete(state) {
      state.isComplete = true;
    },
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
