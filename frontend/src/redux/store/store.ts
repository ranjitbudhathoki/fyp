import { configureStore } from "@reduxjs/toolkit";
import { authReducer, updateUser } from "../slice/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export { store, updateUser };
