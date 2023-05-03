import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: "",
  isComplete: false,
  isVerified: false,
  isLoggedIn: false,
  email: "",
  name: "",
  photo: "",
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
    setData(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.displayName;
      state.photo = action.payload.photoUrl;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
