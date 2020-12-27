import axios from "axios";

const Http = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export const weatherApi = {
  getWeather(queryParams) {
    return Http.get("weather", { params: queryParams });
  },
};
