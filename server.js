const express = require("express");
const axios = require("axios");
const cors = require("cors");

const getFromArray = (arr, num) => {
  return arr[(num + arr.length) % arr.length].main.temp;
};

const generateTemp = (arr, i) => {
  return (
    (getFromArray(arr, i) +
      ((getFromArray(arr, i - 1) +
        getFromArray(arr, i - 2) +
        getFromArray(arr, i - 3)) /
        3) *
        (1 - i * 0.02) +
      ((getFromArray(arr, i + 1) +
        getFromArray(arr, i + 2) +
        getFromArray(arr, i + 3)) /
        3) *
        i *
        0.02) /
    2
  );
};

const getTemperature = (arr) => {
  let t = Array(arr.length)
    .fill(0)
    .map((_, i) => ({
      date: getDate(arr[arr.length - 1].dt + (i + 1) * 10800),
      temp: Number(generateTemp(arr, i).toFixed(2)),
    }));

  return [
    ...arr.map((e) => ({ date: getDate(e.dt), temp: e.main.temp })),
    ...t,
  ];
};

const getDate = (val) => {
  return new Date(val * 1000).toDateString();
};

const app = express();
app.use(cors());

// Use Routes
app.get("/api/weather", async (req, res) => {
  let { location } = req.query;
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=bad46dfee1ae1125ec4faf31e63449de`
    )
    .then(({ data }) => {
      res.json(getTemperature(data.list));
    })
    .catch((error) => {
      res.status(404).json(error.response.data);
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
