import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { weatherApi } from "./api";

export const searchWeather = createAsyncThunk(
  "weather",
  async (queryParams, thunkAPI) => {
    try {
      const response = await weatherApi.getWeather(queryParams);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    data: null,
    pending: false,
    complete: false,
    error: null,
  },
  extraReducers: {
    [searchWeather.pending]: (state) => {
      state.pending = true;
    },
    [searchWeather.fulfilled]: (state, action) => {
      state.error = null;
      state.data = action.payload;
      state.pending = false;
      state.complete = true;
    },
    [searchWeather.rejected]: (state, action) => {
      state.error = action.payload;
      state.data = null;
      state.pending = false;
      state.complete = true;
    },
  },
});

export default counterSlice.reducer;
