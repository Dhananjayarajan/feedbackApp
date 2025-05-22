import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSurveys = createAsyncThunk(
  "surveys/fetchSurveys",
  async () => {
    const res = await axios.get("/api/surveys");
    return res.data;
  }
);

export const submitSurvey = createAsyncThunk(
  "surveys/submitSurvey",
  async ({ values, navigate }) => {
    const res = await axios.post("/api/surveys", values);
    navigate("/surveys");
    return res.data;
  }
);

const surveySlice = createSlice({
  name: "surveys",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSurveys.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default surveySlice.reducer;
