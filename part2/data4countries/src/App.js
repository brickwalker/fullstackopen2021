import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilter = (event) => setFilter(event.target.value);
  const showSingleCountry = (event) => {
    setFilter(event.target.previousSibling.data);
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <div>
      <Filter text={filter} onChange={handleFilter} />
      <Display
        items={countries}
        filter={filter}
        showSingleCountry={showSingleCountry}
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

const Display = ({ items, filter, showSingleCountry }) => {
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
    output = <CountryView country={filteredItems[0]} />;
  }
  return output;
};

const CountryView = ({ country }) => {
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
    </div>
  );
};

export default App;
