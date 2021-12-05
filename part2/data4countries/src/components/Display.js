import React, { useEffect } from "react";
import CountryView from "./CountryView";

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
  let capital;

  useEffect(() => {
    provideCapital(capital);
  }, [provideCapital, capital]);

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
    capital = filteredItems[0].capital;
    output = <CountryView country={filteredItems[0]} weather={weather} />;
  }
  return output;
};

export default Display;
