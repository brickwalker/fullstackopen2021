import React, { useState, useEffect } from "react";
import axios from "axios";

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

const Filter = ({ text, onChange }) => {
  return (
    <div>
      <label>
        find countries <input value={text} onChange={onChange} />
      </label>
    </div>
  );
};

const Display = ({
  items,
  filter,
  showSingleCountry,
  provideCapital,
  weather,
}) => {
  const filteredItems = [
    ...items.filter((item) =>
      item.name.common.toLowerCase().includes(filter.toLowerCase())
    ),
  ];

  let output;
  if (filteredItems.length === 0 || filter.length === 0) {
    output = <div>Use above field to find countries.</div>;
  } else if (filteredItems.length > 10) {
    output = <div>Too many matches, specify another filter.</div>;
  } else if (filteredItems.length > 1) {
    output = (
      <div>
        <ul>
          {filteredItems.map((filteredItem) => (
            <li key={filteredItem.name.common}>
              {filteredItem.name.common}
              <button onClick={showSingleCountry}>show</button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    // Where only one match
    provideCapital(filteredItems[0].capital);
    output = <CountryView country={filteredItems[0]} weather={weather} />;
  }
  return output;
};

const CountryView = ({ country, weather }) => {
  let languagesArray = [];
  for (const key in country.languages) {
    languagesArray.push(country.languages[key]);
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {languagesArray.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      <h2>Weather in {country.capital}</h2>
      <p><strong>{weather.description}</strong></p>
      <img src={weather.imageUrl} alt={weather.description} />
      <p><strong>temperature: </strong>{weather.temperatureCelsius} C&deg;</p>
      <p><strong>wind: </strong>{weather.windKmph} km/h</p>
    </div>
  );
};

export default App;
