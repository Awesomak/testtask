import React, { useState } from "react";
import { searchWeather } from "../features/weather/weatherSlice";
import { useDispatch } from "react-redux";

const Search = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchHandler = () => {
    if (search) dispatch(searchWeather({ country: search }));
  };

  return (
    <div>
      <input
        type="text"
        onChange={inputHandler}
        value={search}
        placeholder="Type city"
      />
      <button
        className={`button${!search ? " disabled" : ""}`}
        onClick={searchHandler}
      >
        search
      </button>
    </div>
  );
};

export default Search;
