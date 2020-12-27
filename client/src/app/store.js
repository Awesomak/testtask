import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "../features/weather/weatherSlice";

export default configureStore({
  reducer: {
    weather: weatherSlice,
  },
});
