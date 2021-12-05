import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilter = (event) => setFilter(event.target.value);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <div>
      <Filter text={filter} onChange={handleFilter} />
      <Display items={countries} filter={filter} />
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

const Display = ({ items, filter }) => {
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
            <li key={filteredItem.name.common}>{filteredItem.name.common}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    // Where only one match
    let languagesArray = [];
    for (const key in filteredItems[0].languages) {
      languagesArray.push(filteredItems[0].languages[key]);
    }
    output = (
      <div>
        <h2>{filteredItems[0].name.common}</h2>
        <p>capital {filteredItems[0].capital}</p>
        <p>population {filteredItems[0].population}</p>
        <h2>languages</h2>
        <ul>
          {languagesArray.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={filteredItems[0].flags.png}
          alt={`flag of ${filteredItems[0].name.common}`}
        />
      </div>
    );
  }
  return output;
};

export default App;
