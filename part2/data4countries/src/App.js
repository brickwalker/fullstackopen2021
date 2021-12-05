import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Display from "./components/Display";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [capital, setCapital] = useState("");
  const [weather, setWeather] = useState({});

  const handleFilter = (event) => setFilter(event.target.value);
  const showSingleCountry = (event) => {
    setFilter(event.target.previousSibling.data);
  };
  const provideCapital = (name) => setCapital(name);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  useEffect(() => {
    if (capital) {
      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
      axios.get(weatherUrl).then((response) => {
        setWeather({
          description: response.data.weather[0].description,
          imageUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          temperatureCelsius: response.data.main.temp,
          windKmph: response.data.wind.speed,
        });
      });
    }
  }, [capital]);

  return (
    <div>
      <Filter text={filter} onChange={handleFilter} />
      <Display
        items={countries}
        filter={filter}
        showSingleCountry={showSingleCountry}
        provideCapital={provideCapital}
        weather={weather}
      />
    </div>
  );
};

export default App;
