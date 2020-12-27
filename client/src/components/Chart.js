import React from "react";
import { BarChart, XAxis, YAxis, Bar } from "recharts";
import { useSelector } from "react-redux";

const Chart = () => {
  const { data, error } = useSelector((state) => state.weather);
  return (
    <div>
      {data ? (
        <BarChart width={1000} height={600} data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Bar type="monotone" dataKey="temp" fill="#37ff00" />
        </BarChart>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Chart;
