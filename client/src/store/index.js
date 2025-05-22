import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import surveysReducer from "./slices/surveySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    surveys: surveysReducer,
  },
});