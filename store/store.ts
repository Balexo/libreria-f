import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
  },
  devTools: process.env.USER_NODE_ENV !== "production",
});
